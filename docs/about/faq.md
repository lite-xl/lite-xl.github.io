---
description: A list of frequently-asked questions about Lite XL.
---

# FAQ

## Why Lite XL?

Lite XL is a fork of [lite], an amazing text editor by [rxi].
Francesco forked lite to add sub-pixel font rendering,
which significantly improves how text looks but brings in
huge dependencies ([FreeType] and [AGG]) and complicates text rendering.
This change was [rejected] by rxi as lite values simplicity.

Eventually, more and more features are added to Lite XL while
lite is considered feature complete and only allows bug fixes.
Lite XL grew to have slightly different API than lite to support
various use cases, such as multiline editing, regular expressions
and subsyntaxes.

## Where to find plugins and install them?

You can find a list of plugins at our [plugin repository].

To install them, you can use [LPM].
Check out the guide [here] for more instructions.

## Is there an easier way to configure Lite XL without learning Lua?

Yes, since [v2.1.0] we provide an extended package with
additional plugins which provides a GUI for configuring Lite XL.
The packages are prefixed with `lite-xl-(version)-addons`
(e.g. `lite-xl-v2.1.0-addons-windows-x86_64.zip`).

## Can I get smart autocompletion (Intellisense/LSP)?

Check out the [LSP] plugin.

## Where is the integrated terminal?

You can install [lite-xl-terminal].

## Tabs and indent size?

In your user config (the cog icon in the file tree):

```lua
config.tab_type = "soft" -- soft for spaces, hard for real tabs (\t)
config.indent_size = 4   -- 4 spaces
```

## How to enable line wrapping?

Since [v2.1.0], you can enable line wrapping by pressing F10.
Before v2.1.0, only hard wrapping is supported via [autowrap].

## How to bind commands to keys?

```lua
local keymap = require "core.keymap"
keymap.add { ["ctrl+escape"] = "core:quit" }
```

## How to unbind commands for certain keys?

```lua
-- the second parameter lets you override commands for certain keys
-- in this case it maps it to nothing
keymap.add({ ["ctrl+escape"] = {} }, true)
```

## How to get commands for those keybinds?

You can search for commands in the command palette.

For each command, replace the spaces with dashes.

For example: `Core: Find Command` → `core:find-command`

## Lite XL doesn't look right on my monitor!

This is a known issue with Lite XL as it uses [SDL2],
which has issues inferring the correct DPI on different platforms.
Common symptoms are:

### Text too large / small

This issue is caused by Lite XL defaulting to the scale factor of 1.
You can change the default scale with the `scale` plugin,
which comes bundled with all Lite XL installations.

The `scale` plugin support scaling only the code editor or all UI elements.
To change this setting, you can use the following steps:

=== "User Module"

    The `scale` plugin reads the mode and default scale in `config.plugins.scale` on startup.
    In your user module, add the following lines:

    ```lua
    config.plugins.scale.mode = "ui"
    config.plugins.scale.default_scale = 2
    ```

=== "Settings GUI"

    To change the scale, navigate to the "Plugins" tab and expand the "Scale" section.
    Select "Everything" for the "Mode" dropdown and choose a default scaling factor
    that suits your monitor.
    The changes will apply on editor restart.

    ![scale plugin settings]{ loading=lazy }

=== "Environment Variable"

    The `LITE_SCALE` environment variable can be used to set the scaling factor
    for testing purposes.

    ```sh
    LITE_SCALE=1.25 lite-xl
    ```

### Text is blurry

This issue is commonly faced on Windows with displays of different scaling factors,
and the main display has a lower scaling factor than the other.
This is because Lite XL is only [system API aware] instead of per-monitor DPI aware.

Currently, there are no fixes for this issue.
It will be fixed when Lite XL eventually adopts SDL3 and handles DPI changes correctly.

## What version of Lua does Lite XL use?

Lua 5.4, since [v2.1.0], released in late 2022.

Lite XL used Lua 5.2 before [v2.1.0].

## Vim mode?

You need to [vibe].


[lite]:                  https://github.com/rxi/lite
[rxi]:                   https://github.com/rxi/lite
[FreeType]:              https://freetype.org/
[AGG]:                   https://agg.sourceforge.net/antigrain.com/index.html
[rejected]:              https://github.com/rxi/lite/issues/145#issuecomment-643636679
[plugin repository]:     https://github.com/lite-xl/lite-xl-plugins
[LPM]:                   https://github.com/lite-xl/lite-xl-plugin-manager
[here]:                  ../user-guide/managing-plugins.md
[v2.1.0]:                https://github.com/lite-xl/lite-xl/releases/tag/v2.1.0
[LSP]:                   https://github.com/lite-xl/lite-xl-lsp
[lite-xl-terminal]:      https://github.com/adamharrison/lite-xl-terminal
[autowrap]:              https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/autowrap.lua?raw=1
[Pragtical]:             https://pragtical.dev
[vibe]:                  https://github.com/eugenpt/lite-xl-vibe
[SDL2]:                  https://github.com/libsdl-org/SDL/tree/SDL2
[Settings GUI]:          https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/settings.lua?raw=1
[scale plugin settings]: ../assets/user-guide/settings/plugins/scale.png
[system API aware]:      https://learn.microsoft.com/en-us/windows/win32/hidpi/high-dpi-desktop-application-development-on-windows#dpi-awareness-mode