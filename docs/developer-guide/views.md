---
description: Learn about Views, one of the core concepts for building UIs in Lite XL.
---

Lite XL has the concept of Views and Nodes.
Views in Lite XL is organized into binary tree, with each leaf
node containing one or more Views.
A branch can either split vertically or horizontally.

A View is a UI component used to display content to the end user.
As such, a View contains methods for event handling, state management
and rendering.

## Creation

A View can be created by extending the `View` class.
The `View` class contains many important states and provides
convenience methods for handling events.

After that, you can create instances of Views and add them
to a Node.

For example, we'll create a View called `HelloView`.

```lua
-- mod-version:3
local core = require "core"
local command = require "core.command"
local common = require "core.common"
local style = require "core.style"

local View = require "core.view"

local HelloView = View:extend()
function HelloView:new()
  -- This is the constructor for HelloView.
  -- Here, we'll call View's constructor to initialize
  -- some important states.
  HelloView.super.new(self)
  -- This can be "session" or "application"
  -- If you specify "application", then the View will
  -- not be closed when the user performs "root:close-all".
  -- The user must explicitly close this View.
  self.context = "session"
  self.caption = "Hello world!"
end

function HelloView:get_name()
  -- Returns the display name of the View.
  -- If tabs are enabled, this will be displayed as the tab title.
  return "Hello!"
end

-- Add a command to create a View.
command.add(nil, {
  ["hello:hello"] = function()
    -- We'll get the current active node and add a view to it.
    -- This will usually create a new tab.
    core.root_view:get_active_node():add_view(HelloView())
  end
})
```

Currently, this plugin will do nothing.
You won't see anything because the View doesn't have a draw
function.

## Size, position and scrolling

A View can be thought of as a stencil on canvas.
Everything drawn within the View dimension will be shown to the user,
while everything drawn outside of the View are discarded.
This ties into how Lite XL handles scrolling — the canvas is moved
around instead of the stencil.

The size of a View (the stencil) is stored in
`View.size.x` and `View.size.y`.
These are the size of the stencil following our analogy.
The size of the canvas is computed by calling
`View:get_scrollable_size()` and `View:get_h_scrollable_size()`.
These methods can return a value larger than the View size to
enable scrolling or very huge numbers that represents an infinitely
scrollable View.

The position of the View relative to the window is stored in `View.position`.
Following our analogy, these values represent where to place the stencil.
In reality, these values are rarely used directly as values
returned by `View:get_content_offset()` is more useful.

If a View is scrollable, you should set `View.scrollable` to `true` 
and override `View:get_scrollable_size()`
and `View:get_h_scrollable_size()`.
You should also call `View:draw_scrollbar()` in your draw method
to render Lite XL's scrollbar for convenience.

When a View is scrollable, `View:get_content_offset()` can be used
to determine where to start drawing.
This method returns starting X and Y coordinates, which may be negative
to represent hidden content above the View; or larger View size to
represent hidden content after the View.

The scroll state of the View is stored in `View.scroll`.
This table contains the X and Y offset when the view is scrolled.
To simulate scrolling, you can change the value of `View.scroll.to.x` or
`View.scroll.to.y`.
A positive value will scroll right / down while a negative value
scrolls left / up.
Alternatively, you may change `View.scroll.x` or `View.scroll.y`
directly.

In our example, we'll implement horizontal and vertical scrolling.
The surface size is double our View size.

```lua
-- mod-version:3
local core = require "core"
local command = require "core.command"
local common = require "core.common"
local style = require "core.style"

local View = require "core.view"

local HelloView = View:extend()
function HelloView:new()
  -- This is the constructor for HelloView.
  -- Here, we'll call View's constructor to initialize
  -- some important states.
  HelloView.super.new(self)
  -- set a caption that we'll use later
  self.caption = "Hello world!"
  self.scrollable = true
end

function HelloView:get_name()
  -- Returns the display name of the View.
  -- If tabs are enabled, this will be displayed as the tab title.
  return "Hello!"
end

function HelloView:get_scrollable_size()
  -- the "actual" height of the View
  return 2 * self.size.y
end

function HelloView:get_h_scrollable_size()
  -- the "actual" width of the View
  return 2 * self.size.x
end

function HelloView:draw()
  -- You should call this to avoid overdrawing
  -- previous content.
  self:draw_background(style.background)
  -- Draw the scrollbar
  self:draw_scrollbar()
end

-- Add a command to create a View.
command.add(nil, {
  ["hello:hello"] = function()
    -- We'll get the current active node and add a view to it.
    -- This will usually create a new tab.
    core.root_view:get_active_node():add_view(HelloView())
  end
})
```

You should end up with a View that is scrollable but has nothing
in it.
We're going to draw something in the next section.

## Rendering

The most important method of a view is `View:render()`. 
This function is called when Lite XL wants to render something.

As mentioned before, you can draw anywhere on the screen,
but only the contents within the View is shown to the user.
This is implemented by `Node.draw()` setting the clip rectangle
to the dimensions of the View.

In our example, we're going to draw the caption we've set in
the constructor.

```lua
-- mod-version:3
local core = require "core"
local command = require "core.command"
local common = require "core.common"
local style = require "core.style"

local View = require "core.view"

local HelloView = View:extend()
function HelloView:new()
  -- This is the constructor for HelloView.
  -- Here, we'll call View's constructor to initialize
  -- some important states.
  HelloView.super.new(self)
  -- set a caption that we'll use later
  self.caption = "Hello world!"
  self.scrollable = true
end

function HelloView:get_name()
  -- Returns the display name of the View.
  -- If tabs are enabled, this will be displayed as the tab title.
  return "Hello!"
end

function HelloView:get_scrollable_size()
  -- the "actual" height of the View
  return 2 * self.size.y
end

function HelloView:get_h_scrollable_size()
  -- the "actual" width of the View
  return 2 * self.size.x
end

function HelloView:draw()
  -- You should call this to avoid overdrawing
  -- previous content.
  self:draw_background(style.background)
  -- Get the top-left corner of the View
  local x, y = self:get_content_offset()
  -- We'll use view.size here so that looks centered
  -- At the start.
  local w, h = self.size.x, self.size.y
  -- Draw the caption with common.draw_text().
  -- This function provides some utilities such as alignment
  -- over renderer.draw_text().
  common.draw_text(style.font, style.text, self.caption, "center", x, y, w, h)
  -- Draw the scrollbar
  self:draw_scrollbar()
end

-- Add a command to create a View.
command.add(nil, {
  ["hello:hello"] = function()
    -- We'll get the current active node and add a view to it.
    -- This will usually create a new tab.
    core.root_view:get_active_node():add_view(HelloView())
  end
})
```

You should end up with some text drawn in the center of the screen.
In the next section, we'll make it more interesting.

!!! warning "Never draw anything outside the render method."
		The render method is called after `renderer.begin_frame()`.
		Any draw calls before this function will be discarded.

## Events

Views have several methods to handle events.
Events are usually propagated from the top (`RootView`) to the bottom.
Event handlers are usually called `on_<event_name>` except `update`.
You can override these methods to provide your own handler logic.
Some events require you to return `true` to indicate that the
event is handled and should not be propagated further.

### Periodic updates

The `update` event is sent right before Lite XL redraws its UI.
You can use this event to perform some state management among other
things.
The handler is called without arguments and should return nothing.

In our example, let's extend `HelloView` by displaying the number of seconds
elapsed since Lite XL started.

```lua
-- mod-version:3
local core = require "core"
local command = require "core.command"
local common = require "core.common"
local style = require "core.style"

local View = require "core.view"

local HelloView = View:extend()
function HelloView:new()
  -- This is the constructor for HelloView.
  -- Here, we'll call View's constructor to initialize
  -- some important states.
  HelloView.super.new(self)
  -- set a caption that we'll use later
  self.caption = "Hello world!"
  self.scrollable = true
end

function HelloView:get_name()
  -- Returns the display name of the View.
  -- If tabs are enabled, this will be displayed as the tab title.
  return "Hello!"
end

function HelloView:get_scrollable_size()
  -- the "actual" height of the View
  return 2 * self.size.y
end

function HelloView:get_h_scrollable_size()
  -- the "actual" width of the View
  return 2 * self.size.x
end

function HelloView:update()
  -- Update some important View states.
  HelloView.super.update(self)
  -- system.get_time() returns the number of seconds since Lite XL started.
  self.caption = string.format("Time elapsed: %.2f", system.get_time())
  -- This tells Lite XL that we want to constantly redraw.
  core.redraw = true
end

function HelloView:draw()
  -- You should call this to avoid overdrawing
  -- previous content.
  self:draw_background(style.background)
  -- Get the top-left corner of the View
  local x, y = self:get_content_offset()
  -- We'll use view.size here so that looks centered
  -- At the start.
  local w, h = self.size.x, self.size.y
  -- Draw the caption with common.draw_text().
  -- This function provides some utilities such as alignment
  -- over renderer.draw_text().
  common.draw_text(style.font, style.text, self.caption, "center", x, y, w, h)
  -- Draw the scrollbar
  self:draw_scrollbar()
end

-- Add a command to create a View.
command.add(nil, {
  ["hello:hello"] = function()
    -- We'll get the current active node and add a view to it.
    -- This will usually create a new tab.
    core.root_view:get_active_node():add_view(HelloView())
  end
})
```

!!! tips "Try commenting out `core.redraw = true` in the update method."
    This will cause the timer to freeze as soon as there's no input.
    `View:update()` is only called when Lite XL wants to update the content;
    it will not be called when nothing is changed.

### Mouse

The keymap is the go-to way for handling mouse events with keystrokes.
However, if you want to have more control over mouse events, you
can override `View:on_mouse_moved()`, `View:on_mouse_pressed()`,
`View:on_mouse_released()` and `View:on_mouse_wheel()`.

```lua
function View:on_mouse_moved(x: number,
                              y: number,
                              dx: number,
                              dy: number): boolean end

function View:on_mouse_pressed(button: MouseButton,
                              	x: number,
                              	y: number,
                              	clicks: number): boolean end

function View:on_mouse_released(button: MouseButton,
                                x: number,
                                y: number): nil end

function View:on_mouse_wheel(y: number, x: number): boolean end
```

`View:on_mouse_moved()` accepts the X and Y coordinates of the mouse
and the X and Y difference from the mouse's last position.

`View:on_mouse_pressed()` accepts the button pressed, the X and Y coordinates
where the button is pressed and the number of clicks (from 1 to 3).

`View:on_mouse_released()` accepts the same arguments as `View:on_mouse_pressed()`
except the number of clicks.

`View:on_mouse_wheel()` accepts the number of steps scrolled vertically
and horizontally.

All of these methods except `View:on_mouse_released()` returns
a boolean indicating that the event is handled.

In our example, we'll implement dragging the text around the view.

```lua
-- mod-version:3
local core = require "core"
local command = require "core.command"
local common = require "core.common"
local style = require "core.style"

local View = require "core.view"

local HelloView = View:extend()
function HelloView:new()
  -- This is the constructor for HelloView.
  -- Here, we'll call View's constructor to initialize
  -- some important states.
  HelloView.super.new(self)
  -- Set a caption that we'll use later
  self:set_caption "Hello world!"
  -- Position of the caption relative to View
  self.caption_pos = { x = 0, y = 0 }
  -- Position of cursor relative to caption
  self.cursor_pos = { x = 0, y = 0 }
  -- True if the user is dragging the caption
  self.hold = false
  self.scrollable = true
end

function HelloView:get_name()
  -- Returns the display name of the View.
  -- If tabs are enabled, this will be displayed as the tab title.
  return "Hello!"
end

function HelloView:get_caption_size()
  -- getter method for caption size
  return self.caption_w, self.caption_h
end

function HelloView:set_caption(caption)
  -- setter method for caption
  self.caption_w = style.font:get_width(caption)
  self.caption_h = style.font:get_height()
  self.caption = caption
end

function HelloView:get_scrollable_size()
  -- the "actual" height of the View
  return 2 * self.size.y
end

function HelloView:get_h_scrollable_size()
  -- the "actual" width of the View
  return 2 * self.size.x
end

function HelloView:get_caption_bounding_box()
  local x1, y1 = self:get_content_offset()
  x1, y1 = x1 + self.caption_pos.x, y1 + self.caption_pos.y
  local x2, y2 = x1 + self.caption_w, y1 + self.caption_h
  return x1, y1, x2, y2
end

function HelloView:on_mouse_pressed(button, x, y, clicks)
  -- Skip if the event is already handled
  if HelloView.super.on_mouse_pressed(self, button, x, y, clicks) then return true end
  local x1, y1, x2, y2 = self:get_caption_bounding_box()
  if x >= x1 and y >= y1 and x <= x2 and y <= y2 then
    -- Store cursor position relative to caption
    self.cursor_pos.x, self.cursor_pos.y = x - x1, y - y1
    self.hold = true
    return true
  end
  return false
end

function HelloView:on_mouse_moved(x, y, dx, dy)
  -- Skip if the event is already handled
  if HelloView.super.on_mouse_moved(self, x, y, dx, dy) then return true end
  if self.hold then
    -- Normalize cursor position to top left corner of the caption
    x, y = x - self.cursor_pos.x, y - self.cursor_pos.y
    -- Get the position relative to View
    local vx, vy = self:get_content_offset()
    local vw, vh = self:get_h_scrollable_size() - self.caption_w, self:get_scrollable_size() - self.caption_h
    self.caption_pos.x, self.caption_pos.y = common.clamp(x - vx, 0, vw), common.clamp(y - vy, 0, vh)
  end
end

function HelloView:on_mouse_released(...)
  HelloView.super.on_mouse_released(self, ...)
  self.hold = false
end

function HelloView:update()
  -- Update some important View states.
  HelloView.super.update(self)
  -- system.get_time() returns the number of seconds since Lite XL started.
  self:set_caption(string.format("Time elapsed: %.2f", system.get_time()))
  -- This tells Lite XL that we want to constantly redraw.
  core.redraw = true
end

function HelloView:draw()
  -- You should call this to avoid overdrawing
  -- previous content.
  self:draw_background(style.background)
  -- Get the top-left corner of the View
  local x, y = self:get_content_offset()
  -- Calculate the absolute position of the caption
  x, y = x + self.caption_pos.x, y + self.caption_pos.y
  -- We're using renderer.draw_text() as we don't need the alignment
  -- goodies anymore.
  -- Note the different order of arguments.
  renderer.draw_text(style.font, self.caption, x, y, style.text)
  -- Draw the scrollbar
  self:draw_scrollbar()
end

-- Add a command to create a View.
command.add(nil, {
  ["hello:hello"] = function()
    -- We'll get the current active node and add a view to it.
    -- This will usually create a new tab.
    core.root_view:get_active_node():add_view(HelloView())
  end
})
```

We've used `on_mouse_pressed()`, `on_mouse_moved()` and `on_mouse_released()`
method to track the cursor and draw the caption at the correct position.
Note that `View:get_scrollable_size()` and `View:get_h_scrollable_size()` is
used to compute the surface size.
The text can now be dragged around.

### Text Input

To receive text input events, you must override `View:supports_text_input()` 
and return `true`, then override `View:on_text_input()` and handle events.

Additionally, if you wish to handle IME composition events as well, you can
override `View:on_ime_text_editing()`.
Most text editors uses this event to show a preview of the text being composed.

```lua
function View:on_text_input(text: string): nil end
function View:on_ime_text_editing(text: string,
                                  start: number,
                                  length: number): nil end
```

`View:on_text_input()` accepts a string containing the text entered and returns nothing.

`View:on_ime_text_editing()` accepts the text being composited, the start of current
composition selection and the length of said selection.
Generally, this event is emitted until the user finalizes the composition, then
`on_text_input()` will be emitted followed by an empty `on_ime_text_editing` event.

For instance, for inputting the text "hello" with a Pinyin IME:

```
on_ime_text_editing: "和", 3, 0
on_ime_text_editing: "合理", 6, 0
on_ime_text_editing: "hell", 3, 0
on_ime_text_editing: "hello", 3, 0
on_text_input: "hello"
on_ime_text_editing: "", 0, 0
```

Let's implement rudimentary text input in our example.

In our example, we'll add support for text input and IME composition.

```lua
--mod-version:3
local core = require "core"
local command = require "core.command"
local common = require "core.common"
local ime = require "core.ime"
local keymap =require "core.keymap"
local style = require "core.style"

local View = require "core.view"

local HelloView = View:extend()
function HelloView:new()
  -- This is HelloView's constructor.
  -- You must call the super constructor to initialize important state data.
  HelloView.super.new(self)
  -- The position of the caption relative to the view
  self.caption_pos = { x = 0, y = 0 }
  -- The offset of the cursor from the top left corner of the caption
  -- when it is held
  self.cursor_offset = { x = 0, y = 0 }
  -- The caption and its pixel width
  self.caption = ""
  self.caption_w = style.font:get_width(self.caption)
  -- IME text composition state
  self.composition = { text = "", start = 0, length = 0 }
  self.hold = false
end

function HelloView:on_mouse_moved(px, py, dx, dy)
  -- If the super method already handled the event, we shouldn't handle it.
  -- This is important for scrollbar handling if view is scrollable.
  if HelloView.super.on_mouse_moved(self, px, py, dx, dy) then return true end
  -- If we're not holding down mouse we should ignore the event
  if not self.hold then return end
  
  -- Correct the mouse position to behave as if the cursor was placed on the
  -- top-left corner of the caption.
  -- Without this, the caption will "jump" towards the cursor.
  px, py = px - self.cursor_offset.x, py - self.cursor_offset.y
  
  -- Calculate the bounding rectangle of the Viee
  local x1, y1 = self:get_content_offset()
  -- Here, the bounding rectangle is shrunk by the size of the caption.
  -- This prevents the caption from clipping out of the view.
  local x2, y2 = self.size.x - self.caption_w, self.size.y - style.font:get_height()
  
  -- Set the position of the caption relative to the view.
  self.caption_pos.x, self.caption_pos.y = common.clamp(px - x1, 0, x2), common.clamp(py - y1, 0, y2)
  return true
end

function HelloView:on_mouse_pressed(button, px, py, clicks)
  -- If the super method handled the event we should skip our own handler.
  if HelloView.super.on_mouse_pressed(self, button, px, py, clicks) then return true end
  
  -- the bounding box of the caption
  local x1, y1 = self:get_content_offset()
  x1, y1 = x1 + self.caption_pos.x, y1 + self.caption_pos.y
  local x2, y2 = x1 + self.caption_w, y1 + style.font:get_height()
  
  if px >= x1 and py >= y1 and px <= x2 and py <= y2 then
    -- Save the cursor position relative to the caption
    self.cursor_offset.x, self.cursor_offset.y = px - x1, py - y1
    self.hold = true
  end
  return true
end

function HelloView:on_mouse_released(...)
  HelloView.super.on_mouse_released(self, ...)
  self.hold = false
end

function HelloView:supports_text_input()
  -- tell Lite XL that we support text input
  return true
end

function HelloView:on_text_input(text)
  -- Append text to the caption and recalculate the width
  self.caption = self.caption .. text
  self.caption_w = style.font:get_width(self.caption)
end

function HelloView:on_ime_text_editing(text, start, length)
  -- Store composition state
  self.composition = { text = text, start = start, length = length }
end

function HelloView:update()
  -- You should do state management in this method.
  -- If you override this method, you must call the super method.
  HelloView.super.update(self)
  
  if self.composition.text ~= "" then
    -- We need to tell the system where to put the IME window.
    -- Get the bounding box of the selected composition text
    local ime_selection_text = self.composition.text:usub(self.composition.start, self.composition.length)
    local ime_not_selected = self.composition.text:usub(1, self.composition.start - 1)
    local x, y = self:get_content_offset()
    x, y = x + self.caption_pos.x + style.font:get_width(ime_not_selected), y + self.caption_pos.y
    -- Set the position of the IME window
    ime.set_location(x, y, style.font:get_width(ime_selection_text), style.font:get_height())
  end
end

function HelloView:draw()
  -- In here, we did not call self.super.draw(self) because we're extending View.
  -- View's draw() method does nothing.
  -- Instead, we'll call self:draw_background() to draw the background.
  -- If you don't call this, you'll overdraw previous content.
  self:draw_background(style.background)
  -- get the x and y offset of the View.
  -- Since a view can be anywhere within a window, you must use this x and y
  -- offset to ensure that you're drawing inside your View.
  -- Otherwise, you will draw on other Views and the content can get obscured.
  local x, y = self:get_content_offset()
  x, y = x + self.caption_pos.x, y + self.caption_pos.y
  -- Here, we switch to renderer.draw_text() because we don't need to align
  -- the text anymore.
  -- Note the different order of arguments.
  x = renderer.draw_text(style.font,
  self.caption,
  x, y,
  style.text)
  
  local caret_pos = x
  if self.composition.text ~= "" then
    -- Draw the composition text
    local xadvance = renderer.draw_text(style.font,
                                        self.composition.text,
                                        x, y,
                                        style.text)
    -- Draw an underline to indicate that this is a composition and not actual text.
    renderer.draw_rect(x, y + style.font:get_height() - 2, xadvance - x, 2, style.accent)
    -- The caret may appear in the middle of the composition.
    -- The start parameter is the offset of the text where the selection starts, so we'll
    -- use it to place the caret.
    x = x + style.font:get_width(self.composition.text:usub(1, self.composition.start))
  end
  -- draw the caret.
  renderer.draw_rect(x, y, 2, style.font:get_height(), style.caret)
end


-- add a command to create a View.
command.add(nil, {
  ["hello:hello"] = function()
    -- we'll get the current active node and add a view to it.
    -- it will create a new tab.
    core.root_view:get_active_node():add_view(HelloView())
  end,
})

-- add a command to delete caption text from the back
command.add(HelloView, {
  ["hello:delete-char"] = function()
    -- we use string.usub to account for unicode multi-byte characters
    core.active_view.caption = core.active_view.caption:usub(1, -2)
  end
})

-- bind the delete command to backspace
keymap.add {
  ["backspace"] = "hello:delete-char"
}
```

There's a lot more to text editing than simply appending and removing text.
This is just a simple example to acquaint you with how Lite XL handle
events.
