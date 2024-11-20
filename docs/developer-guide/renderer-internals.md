---
description: Learn how Lite XL makes immediate-mode rendering fast and efficient.
---

Lite XL is ubiquitous among other text editors as it uses an immediate-mode rendering
approach instead of conventional retained-mode rendering methods.
The immediate-mode approach allows the user to draw primitives on the screen directly,
per-frame, by inserting draw operations into a queue.
This is opposed to retained-mode rendering, where a complete object model is kept for
each primitive, and the client cleverly determines what to render and what not to render.

Lite XL allows the users to arbitrarily draw shapes and text in the order that they should
be presented — bottom to top where the bottom primitives can be occluded by ones on the top.
The following sequence is run "per-frame" to render the user interface.

- `renderer.begin_frame()` is called.
- Draw calls are made via `renderer.draw_text()`, `renderer.draw_rect()`, etc.
- `renderer.end_frame()` is called.
- The primitives are rendered on the screen.

## Cached Software Rendering

Lite XL inherits the cached software rendering used in [lite][1].
The term is coined by [rxi][2] in one of his [write-up][3] of the same title.
The approach provides an abstraction over dirty rectangles and is especially efficient
for applications where the UI changes a little between frames.
The application redraws the entire frame while the renderer figures out regions that
actually had to be redrawn, which reduces CPU time spent on rendering.

Lite XL implements a **command buffer**, **hash grid**, and a **renderer**.
The command buffer is a queue that stores a list of draw commands,
while the hash grid is used to store the difference between consecutive frames.
The renderer is used to draw the primitives on the screen.
The command buffer and hash grid implementation resides in `#!bash src/rencache.{h,c}`
while the renderer implementation is in `#!bash src/renderer.{h,c}`.
The high-level Lua API that uses these implementations are in `src/api/renderer.c`.

### Command Buffer

You can find the following definition in `src/renwindow.h`:

```c title="src/renwindow.h"
struct RenWindow {
  SDL_Window *window;
  uint8_t *command_buf;
  size_t command_buf_idx;
  size_t command_buf_size;
  float scale_x;
  float scale_y;
#ifdef LITE_USE_SDL_RENDERER
  SDL_Renderer *renderer;
  SDL_Texture *texture;
  RenSurface rensurface;
#endif
};
```

The RenWindow struct defines a bunch of data that is needed to keep track of SDL windows.
Among those data is `command_buf`, `command_buf_idx` and `command_buf_size`.
You may wonder why the command buffer is stored as a pointer to a byte array,
but the following definition from `src/rencache.c` should reveal why:

```c title="src/rencache.c"
#define CMD_BUF_RESIZE_RATE 1.2
#define CMD_BUF_INIT_SIZE (1024 * 512)
#define COMMAND_BARE_SIZE offsetof(Command, command)

enum CommandType { SET_CLIP, DRAW_TEXT, DRAW_RECT };

typedef struct {
  enum CommandType type;
  uint32_t size;
  /* Commands *must* always begin with a RenRect
  ** This is done to ensure alignment */
  RenRect command[];
} Command;

typedef struct {
  RenRect rect;
} SetClipCommand;

typedef struct {
  RenRect rect;
  RenColor color;
  RenFont *fonts[FONT_FALLBACK_MAX];
  float text_x;
  size_t len;
  int8_t tab_size;
  char text[];
} DrawTextCommand;

typedef struct {
  RenRect rect;
  RenColor color;
} DrawRectCommand;
```

The `Command` struct represents the base type for all other commands.
It contains the type of the command, the size of the command and a variable-sized field
containing a subtype of `Command` such as `DrawTextCommand`.
`SetClipCommand`, `DrawTextCommand` and `DrawRectCommand` are all subclasses of
`Command` (very loosely though, since C does not support object-oriented programming).
Instead of making `Command` a union of `SetClipCommand`, `DrawTextCommand` and `DrawRectCommand`,
we use `offsetof` and `alignof` operators introduced in C11 to determine the alignment
between different draw commands.
This approach allows us to store draw operations efficiently as unions has the size of its largest member.

#### Pushing to The Command Buffer

When calling the `renderer.draw_text()` in Lua, `rencache_draw_text()` is called in the C side.
The function calculates the bounding box of the text being rendered,
and stores it into the command buffer.

```c title="src/rencache.c"
double rencache_draw_text(RenWindow *window_renderer, RenFont **fonts, const char *text, size_t len, double x, int y, RenColor color)
{
  int x_offset;
  double width = ren_font_group_get_width(fonts, text, len, &x_offset);
  RenRect rect = { x + x_offset, y, (int)(width - x_offset), ren_font_group_get_height(fonts) };
  if (rects_overlap(last_clip_rect, rect)) {
    int sz = len + 1;
    DrawTextCommand *cmd = push_command(window_renderer, DRAW_TEXT, sizeof(DrawTextCommand) + sz);
    if (cmd) {
      memcpy(cmd->text, text, sz);
      cmd->color = color;
      memcpy(cmd->fonts, fonts, sizeof(RenFont*)*FONT_FALLBACK_MAX);
      cmd->rect = rect;
      cmd->text_x = x;
      cmd->len = len;
      cmd->tab_size = ren_font_group_get_tab_size(fonts);
    }
  }
  return x + width;
}
```

The function allocates sufficient space to store the parameters, including the string to render,
with a suitable alignment for the system that Lite XL runs on.
Older versions of Lite XL will skip the draw call if the command buffer is full,
but recent versions of Lite XL will attempt to enlarge the command buffer before doing so.

Once space is allocated, the bounding box of the text is calculated and stored into the buffer,
along with the text content and starting coordinates.
Coincidentally, this function illustrates one of the limitations of Lite XL's rendering system,
where the font width calculation is often redundant (in Lua and in here).

When `renderer.end_frame()` is called, the commands inside the buffer is used to populate
the hash grid, and to perform a render pass.
When everything is complete, `window->command_buf_idx` is set to 0 to clear the command buffer.

### Hash Grid

The hash grid is responsible for storing the changes between consecutive frames.
As its name implies, the hash grid does not store actual pixel data,
but hashes of the pixel data in a grid.
The following definitions in `src/rencache.c` is clear on how the hash grids are stored:

```c title="src/rencache.c"
#define CELLS_X 80
#define CELLS_Y 50
#define CELL_SIZE 96

static unsigned cells_buf1[CELLS_X * CELLS_Y];
static unsigned cells_buf2[CELLS_X * CELLS_Y];
static unsigned *cells_prev = cells_buf1;
static unsigned *cells = cells_buf2;
static RenRect rect_buf[CELLS_X * CELLS_Y / 2];
static RenRect screen_rect;
static RenRect last_clip_rect;
```

Lite XL divides the screen into squares of 96 pixels each, and stores the hash for each square.
But, that is actually not quite what Lite XL does.
Consider the following code:

```c title="src/rencache.c"
static void update_overlapping_cells(RenRect r, unsigned h) {
  int x1 = r.x / CELL_SIZE;
  int y1 = r.y / CELL_SIZE;
  int x2 = (r.x + r.width) / CELL_SIZE;
  int y2 = (r.y + r.height) / CELL_SIZE;

  for (int y = y1; y <= y2; y++) {
    for (int x = x1; x <= x2; x++) {
      int idx = cell_idx(x, y);
      hash(&cells[idx], &h, sizeof(h));
    }
  }
}

void rencache_end_frame(RenWindow *window_renderer) {
/* update cells from commands */
  Command *cmd = NULL;
  RenRect cr = screen_rect;
  while (next_command(window_renderer, &cmd)) {
    /* cmd->command[0] should always be the Command rect */
    if (cmd->type == SET_CLIP) { cr = cmd->command[0]; }
    RenRect r = intersect_rects(cmd->command[0], cr);
    if (r.width == 0 || r.height == 0) { continue; }
    unsigned h = HASH_INITIAL;
    hash(&h, cmd, cmd->size);
    update_overlapping_cells(r, h);
  }

  /* push rects for all cells changed from last frame, reset cells */
  int rect_count = 0;
  int max_x = screen_rect.width / CELL_SIZE + 1;
  int max_y = screen_rect.height / CELL_SIZE + 1;
  for (int y = 0; y < max_y; y++) {
    for (int x = 0; x < max_x; x++) {
      /* compare previous and current cell for change */
      int idx = cell_idx(x, y);
      if (cells[idx] != cells_prev[idx]) {
        push_rect((RenRect) { x, y, 1, 1 }, &rect_count);
      }
      cells_prev[idx] = HASH_INITIAL;
    }
  }
  // rest of the code goes here...
}
```

We can clearly see that the code actually hashes the command instead of pixel data.
The hashed command is saved to grid cells that were affected.
The grid cells were then compared to determine the regions that needed to be redrawn.

After the frame has been drawn, the hash grids for the current and previous frames are
swapped to prepare for the next frame.

### Renderer

After the regions are determined, the commands are used to call the renderer to render
primitives to the screen.

```c title="src/rencache.c"
for (int i = 0; i < rect_count; i++) {
  /* draw */
  RenRect r = rect_buf[i];
  ren_set_clip_rect(window_renderer, r);

  cmd = NULL;
  while (next_command(window_renderer, &cmd)) {
    SetClipCommand *ccmd = (SetClipCommand*)&cmd->command;
    DrawRectCommand *rcmd = (DrawRectCommand*)&cmd->command;
    DrawTextCommand *tcmd = (DrawTextCommand*)&cmd->command;
    switch (cmd->type) {
      case SET_CLIP:
        ren_set_clip_rect(window_renderer, intersect_rects(ccmd->rect, r));
        break;
      case DRAW_RECT:
        ren_draw_rect(&rs, rcmd->rect, rcmd->color);
        break;
      case DRAW_TEXT:
        ren_font_group_set_tab_size(tcmd->fonts, tcmd->tab_size);
        ren_draw_text(&rs, tcmd->fonts, tcmd->text, tcmd->len, tcmd->text_x, tcmd->rect.y, tcmd->color);
        break;
    }
  }
}
```

Primitives outside the current clip rectangle does not get rendered.
Although the code still goes through the command buffer for each updated region,
the renderer call itself were basically no-ops on unmodified regions due to the clip rectangle.
Moreover, updated regions are passed to `SDL_UpdateWindowSurfaceRects()`,
which prevents SDL from copying unmodified regions of the buffer to the screen.

## Rendering Text and Rectangles

Lite XL uses a very simple renderer that directly manipulates pixel data,
instead of leveraging higher-level graphics library such as Cairo and Skia.
The renderer is only capable of drawing rectangles and text.

### Rectangles

Drawing a rectangle is trivial, as it only requires copying pixels for N amount of times.
Lite XL doesn't attempt to implement this pixel-copying loop by itself,
instead it uses `SDL_FillRect()` (and `SDL_BlitScaled()` when the rectangle is not transparent),
which is heavily optimized by SDL.

### Text

Drawing text is slightly more complicated.
Lite XL rasterizes each glyph (a graphical representation of a character) with FreeType,
and then stores the bitmap and dimensions inside a font object.
When `renderer.draw_text()` is called, the glyph bitmap and dimensions are retrieved,
and the bitmap is copied to the output according to the parameters and dimensions.

The text renderer received a [major overhaul][4] which improved performance.
Previously, Lite XL stored glyph bitmaps and dimensions in a hash table mapped by
Unicode codepoints, which is inefficient as there can be as many as 1,114,111 valid Unicode codepoints,
while the [OpenType standard][7] only allowed 65,536 glyphs per font.
Many font operations also require interacting with glyph IDs instead of codepoints, which made it inflexible.
Other than that, the renderer will render 256 glyphs when only one glyph is required,
which has a significant performance impact on non-Latin fonts (CJK fonts).
Testing has shown that loading a file with CJK characters [can take seconds][5].

The current renderer maintains two hash tables called GlyphMap and CharMap respectively.
CharMap maps Unicode codepoints to glyph IDs, while GlyphMap maps glyph IDs to glyph bitmaps and dimensions.
This reduces memory required to store the glyphs as glyph IDs are 16-bit unsigned integers,
and we only need to store 65,536 glyph bitmap slots.
It also allows us to remap certain codepoints to other glyphs, but this has not been done in practice.
The following snippet illustrates the data structures for storing font data.

```c title="src/renderer.c"
// approximate number of glyphs per atlas surface
#define GLYPHS_PER_ATLAS 256
// some padding to add to atlas surface to store more glyphs
#define FONT_HEIGHT_OVERFLOW_PX 6
#define FONT_WIDTH_OVERFLOW_PX 6

// maximum unicode codepoint supported (https://stackoverflow.com/a/52203901)
#define MAX_UNICODE 0x10FFFF
// number of rows and columns in the codepoint map
#define CHARMAP_ROW 128
#define CHARMAP_COL (MAX_UNICODE / CHARMAP_ROW)

// the maximum number of glyphs for OpenType
#define MAX_GLYPHS 65535
// number of rows and columns in the glyph map
#define GLYPHMAP_ROW 128
#define GLYPHMAP_COL (MAX_GLYPHS / GLYPHMAP_ROW)

// number of subpixel bitmaps
#define SUBPIXEL_BITMAPS_CACHED 3

typedef enum {
  EGlyphNone = 0,
  EGlyphLoaded = (1 << 0L),
  EGlyphBitmap = (1 << 1L),
  // currently no-op because blits are always assumed to be dual source
  EGlyphDualSource = (1 << 2L),
} ERenGlyphFlags;

// metrics for a loaded glyph
typedef struct {
  unsigned short atlas_idx, surface_idx;
  unsigned int x1, y0, y1, flags;
  int bitmap_left, bitmap_top;
  float xadvance;
} GlyphMetric;

// maps codepoints -> glyph IDs
typedef struct {
  unsigned int *rows[CHARMAP_ROW];
} CharMap;

// a bitmap atlas with a fixed width, each surface acting as a bump allocator
typedef struct {
  SDL_Surface **surfaces;
  unsigned int width, nsurface;
} GlyphAtlas;

// maps glyph IDs -> glyph metrics
typedef struct {
  // accessed with metrics[bitmap_idx][glyph_id / nrow][glyph_id - (row * ncol)]
  GlyphMetric *metrics[SUBPIXEL_BITMAPS_CACHED][GLYPHMAP_ROW];
  // accessed with atlas[bitmap_idx][atlas_idx].surfaces[surface_idx]
  GlyphAtlas *atlas[SUBPIXEL_BITMAPS_CACHED];
  size_t natlas, bytesize;
} GlyphMap;

typedef struct RenFont {
  FT_Face face;
  CharMap charmap;
  GlyphMap glyphs;
  // other info...
} RenFont;
```

When a character is requested, the glyph finds the glyph ID of the codepoint with
`FT_Get_Char_Index()` and caches the result in the CharMap.
The CharMap allows fast lookup of what glyphs are available in a font,
and is used to implement font fallback.

The glyph ID is used to look up the metrics, which will be loaded with `FT_Load_Glyph()`
if it is not cached.
Lite XL stores multiple "stages" of metrics, the first one being only the X advance.
The X advance can be calculated from the glyph outline and doesn't require rasterization.
This is useful when the user only wants to know the width of a string,
frequently used in `View:update()` calls.

If the user requires the bitmap, then the renderer renders it with `FT_Render_Glyph()`.
When subpixel rendering is enabled, the renderer renders 3 variations of the glyph,
shifted by 1 subpixel.
The rendered glyph bitmap can either be 24-bit RGB, 8-bit monochrome or grayscale,
or potentially a [32-bit RGBA][6] bitmap.
Space is allocated in the atlas for the specified bitmap type and height, and the bitmap
is copied into the atlas.
The atlas ID and index, top-left and bottom-right coordinates,
along with other glyph information are recorded.

When the glyph bitmap and dimensions are loaded, it can be used to render text on the screen.
The renderer loops through each codepoint in the input string and loads the glyphs
corresponding to the codepoint.
If the codepoint is found, the renderer will return the glyph bitmap and dimension.
If a font does not have glyphs for the codepoint, the renderer will look for other fonts
(if a `FontGroup` was passed into the renderer) for the glyph.

If none of the fonts specified have the glyph, the renderer will attempt to get the
"fallback" character (usually displayed as blank squares with a cross);
and if that doesn't exist either, the White Square character (`U+25A1`).
Finally, if none of the glyphs are available, the renderer simply draws a rectangle in place.

The glyph bitmap is copied to the screen with the following formula:

```c title="src/renderer.c"
r = (color.r * src.r * color.a + dst.r * (65025 - src.r * color.a) + 32767) / 65025;
g = (color.g * src.g * color.a + dst.g * (65025 - src.g * color.a) + 32767) / 65025;
b = (color.b * src.b * color.a + dst.b * (65025 - src.b * color.a) + 32767) / 65025;
```

The formula performs dual-source blending to properly blend the foreground, background
and text color.

!!! note "Author's Note"
    As of today (20/11/2024), I have no idea what the formula does.
    It is modified in [lite-xl#619][8] and there are no description of where the magic
    numbers in the formula come from.
    The closest match I can find is the following formula from [this blog post][9]:
    ```glsl
    // convert the vertex colour to linear space
    vec4 v_colour_linear = pow4(v_colour, inv_gamma);

    // convert the background colour to linear space
    vec4 v_background_colour_linear = pow4(v_background_colour, inv_gamma);

    // blend
    float r = tex_col.r * v_colour_linear.r + (1.0 - tex_col.r) * v_background_colour_linear.r;
    float g = tex_col.g * v_colour_linear.g + (1.0 - tex_col.g) * v_background_colour_linear.g;
    float b = tex_col.b * v_colour_linear.b + (1.0 - tex_col.b) * v_background_colour_linear.b;

    // gamma encode the result
    gl_FragColor = pow4(vec4(r, g, b, tex_col.a), gamma);
    ```


[1]: https://github.com/rxi/lite
[2]: https://github.com/rxi
[3]: https://rxi.github.io/cached_software_rendering.html
[4]: https://github.com/lite-xl/lite-xl/pull/1845
[5]: https://github.com/lite-xl/lite-xl/pull/1845#issue-2387413408
[6]: https://github.com/lite-xl/lite-xl/pull/1860
[7]: https://learn.microsoft.com/en-us/typography/opentype/spec/cmap#format-4-segment-mapping-to-delta-values
[8]: https://github.com/lite-xl/lite-xl/pull/619
[9]: https://www.puredevsoftware.com/blog/2019/01/22/sub-pixel-gamma-correct-font-rendering/