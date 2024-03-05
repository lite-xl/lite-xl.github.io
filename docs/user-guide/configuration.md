---
description: Learn how to configure Lite XL — configure fonts, themes and other options.
---

## Location

Lite XL searches a list of paths to store user configuration, known as `USERDIR`.
The first path that is available will be used.

1. `(path to lite-xl.exe)/user`
2. `$LITE_USERDIR`
3. `$XDG_CONFIG_HOME/lite-xl`
4. `$HOME/.config/lite-xl`

On Windows, `$HOME` will be replaced with `$USERPROFILE`.

## User Module

Lite XL is mainly configured through the user module.
The user module is a Lua script run by Lite XL during startup, before plugins are loaded.
Thus, you can change configuration options, bind shortcut keys, load color schemes,
change the fonts among other things.

To modify the user module, you can run the command `core:open-user-module`.
You can also modify the file `USERDIR/init.lua` directly.
Lite XL will reload the file on file change.

## Project Module

The project module is an optional module which is loaded from the current
project's directory when Lite XL is started. Project modules can be useful for
things like adding custom commands for project-specific build systems, or
loading project-specific plugins.

The project module is loaded when the editor starts,
after the user module is loaded but before plugins are loaded.

To modify project module, you can run the command `core:open-project-module`.
The command will create a project module if it does not exist.

## Settings GUI

Since Lite XL v2.1.0, we started bundling the settings plugin.
This plugin provides a GUI to configure Lite XL.

!!! warning
    You mustn't set the same configuration option in the user module
    and the Settings GUI **at the same time**.
    This can result in undefined behavior.

## Fonts

Lite XL comes with [JetBrains Mono][1] and [Fira Sans][2] by default.
JetBrains Mono is used for the editor itself while Fira Sans is used for other UI elements.

To change the fonts used by the editor, you can change the
variable `style.font` and `style.code_font`.
These variables are responsible for the UI font and code
font respectively.

To load a font, you can use `renderer.font.load()`.
This function allows you to load a font file as long as
it is supported by FreeType.
The function takes in the path to the font file and
the pixel size of the font.

When displaying text with multiple languages, multiple
fonts are often required.
Lite XL supports fallback fonts by using the function
`renderer.font.group()`.
This function takes in a table of fonts loaded by
`renderer.font.load()`.
Lite XL will attempt to render fonts based on the order
the fonts are added to the table.

=== "User Module"

    For this example, we'll load [Noto Sans Mono][3], which is
    located in `/usr/share/fonts/noto/NotoSansMono-Regular.ttf`
    and set it as our code font.

    ```lua
    local style = require "core.style"
    -- SCALE is the pixel scaling required for the current DPI setup.
    -- This converts the font size from points to pixels.
    style.code_font = renderer.font.load("/usr/share/fonts/noto/NotoSansMono-Regular.ttf", 15 * SCALE)
    ```

    Next, we'll also load [Noto Sans SC][4], which is located
    in `/usr/share/fonts/noto-cjk/NotoSansCJK-Regular.ttc` and use
    it as fallback.

    ```lua
    local style = require "core.style"
    -- do not ever do style.code_font = { style.code_font, ... }
    -- style.code_font can be a font group and lite-xl does not
    -- support nested font groups!
    style.code_font = renderer.font.group {
      renderer.font.load("/usr/share/fonts/noto/NotoSansMono-Regular.ttf", 15 * SCALE),
      renderer.font.load("/usr/share/fonts/noto-cjk/NotoSansCJK-Regular.ttc", 15 * SCALE)
    }
    ```

    !!! tip
        Lite XL does not support using a specfific face in a
        TrueType collection (.ttc) file.
        Only the first face can be used.

=== "Settings GUI"

    To change the code font, navigate to the "Core" tab and expand the "Editor" section.
    The first entry should be a list of code fonts used by the editor.
    ![The fonts option under the Editor section][5]{ loading=lazy }

    To add a new font, click the "Add" button.
    A font selector will be shown.
    ![Font selector][6]{ loading=lazy }

    To choose a font, press the "Mono" button and select a font from the list.
    The "All" button allows you to select non-monospace fonts.

    A demo text will be shown at the textbox on the top of the selector.
    To change the antialiasing settings of the font, click on the dropdown to the left.
    To change the hinting settings of the font, click on the dropdown to the right.
    The changes will be reflected automatically on the preview window.
    Press "Save" to add the font or "Cancel" to go back.

    If you have more than one fonts set up, you can change
    the fallback order by pressing the "‹" and "›" buttons.
    ![The buttons to change font ordering][7]{ loading=lazy }

## Keyboard shortcuts

Keyboard shortcuts are managed by the `core.keymap` module.
This module maps keyboard shortcuts to one or more commands,
where each command has a predicate that determine whether it can be run.

For a list of default keyboard shortcuts, check out these pages:

- [non-macOS platforms (Windows, Linux, etc.)][8]
- [macOS][9]

### Adding a keyboard shortcut

To add keyboard shortcuts, you can use `keymap.add()`.

=== "User Module"

    For example, to bind ++ctrl+m++ to move the cursor backwards and then upwards, do:

    ```lua
    local keymap = require "core.keymap"
    keymap.add {
      ["ctrl+m"] = "doc:move-to-previous-char"
    }
    keymap.add {
      ["ctrl+m"] = "doc:move-to-previous-line"
    }
    ```

    Lite XL will automatically execute both commands in the order that they're added.

    Alternatively, to override a keyboard shortcut completely,
    add `true` on the second parameter of `keybind.add()`.

    ```lua
    local keymap = require "core.keymap"
    keymap.add {
      ["ctrl+m"] = "doc:move-to-previous-char"
    }
    keymap.add({
      ["ctrl+m"] = "doc:move-to-previous-line"
    }, true)
    ```

    This will cause Lite XL to only run `core:move-to-previous-line` when ++ctrl+m++ is pressed.

=== "Settings UI"

    Navigate to the "Keybindings" tab.
    ![The keybindings tab][10]{ loading=lazy }

    Scroll until you find the entry containing the command you want to bind to and click on it.
    In recent versions of the Settings plugin, you can also
    search for commands with the text box on top.
    In this example, we'll pick `doc:move-to-previous-char`.

    To add a keybind, press the "Add" and press the key combination that you want to bind to.
    Afterwards, press "Save".
    ![The dialog to assign keyboard shortcuts][11]{ loading=lazy }

    If the keyboard shortcut is set properly,
    you will see the updated keyboard shortcut
    on the "Bindings" section at the right.
    ![The keybind tab with changed keybinds][12]{ loading=lazy }

    To replace previous keyboard shortcuts,
    simply delete any existing keyboard shortcut
    via the "Remove" button, then re-add it.

### Removing a keyboard shortcut

To remove an existing keyboard shortcut, you can use `keymap.unbind()`.

=== "User Module"

    In this example, we will unbind ++ctrl+m++.

    ```lua
    local keymap = require "core.keymap"
    keymap.unbind("ctrl+m", "doc:move-to-previous-line")
    keymap.unbind("ctrl+m", "doc:move-to-previous-char")
    ```

    This will unbind the two commands from ++ctrl+m++.

    Alternatively, to unbind all commands from ++ctrl+m++,
    you can omit the second parameter to `keymap.unbind()`.

    ```lua
    local keymap = require "core.keymap"
    keymap.unbind("ctrl+m", "doc:move-to-previous-line")
    keymap.unbind("ctrl+m", "doc:move-to-previous-char")
    ```

=== "Settings UI"

    Navigate to the "Keybindings" tab.
    ![Screenshot showing the keybindings tab][12]{ loading=lazy }

    Scroll until you find the entry containing the command you want to bind to and click on it.
    In recent versions of the Settings plugin, you can also search for commands with the text box on top.
    In this example, we pick `doc:move-to-previous-char`.

    To remove a keyboard shortcut, select the shortcut you want to remove and press the "Remove" button.
    Afterwards, press the "Save" button to save the changes.
    ![Screenshot showing the keybind changer][13]{ loading=lazy }

## Themes

The default theme is a dark theme.
Themes are implemented as plugins that changes the styling variables of Lite XL.

This can be changed with `core.reload_module()` and loading the appropriate theme file.

=== "User Module"

    To load the theme `summer`, add `core.reload_module "colors.summer"`.

    ```lua
    core.reload_module "color.summer"
    ```

=== "Settings GUI"

    Navigate to the "Colors" tab.

    ![The Colors tab][14]{ loading=lazy }

    Select your desired theme.
    The colors should apply immediately.

## Other options

There are a lot of configuration options that can be modified.
A list of these options can be found in [`data/core/config.lua`][15],
but we'll list a few common ones here.

### Indentation

To change the indentation size and type, set `config.indent_size`
and `config.tab_type` respectively.

```lua
local config = require "core.config"
config.indent_size = 4 -- set indentation to 4
config.tab_type =      -- "soft" for spaces, "hard" for tabs
```

### Window decoration

If you're on platforms such as Wayland where window decoration may be client drawn,
you can set `config.borderless` to `true`.
This will let Lite XL draw its own window decoration.

```lua
local config = require "core.config"
-- enable custom window borders
config.borderless = true
```

### Project files limit

When opening large directories, Lite XL will often complain about reaching the project file limit.
This is because Lite XL becomes slower when it needs to index these files on startup.

If your filesystem has good performance, you can increase this limit
by setting `config.max_project_files` to something else.
The default value is 2000.

```lua
local config = require "core.config"
-- set max project files to 5000
config.max_project_files = 5000
```

### Ignoring files

Lite XL does not index certain files and directories by default, such as
version control and executables.
This can be modified by changing `config.ignore_files`.
This value is a table of Lua patterns.
For directories, the pattern ends with a forward slash (`/`).
For files, the pattern ends with the end anchor (`$`).

```lua
local config = require "core.config"
-- ignore .data/
table.insert(config.ignore_files, "^%.data/")
```

### Caret

You can disable or change the blinking rate of the caret.

```lua
local config = require "core.config"
config.disable_blink = true -- disable caret blinking
config.blink_period = 0.4 -- change caret blink rate
```

### FPS (Frame rate)

The default frame rate is set to 60.
If this causes an issue, you can set it via `config.fps`.

```lua
local config = require "core.config"
-- set FPS to 30
config.fps = 30
```

### Transitions

You can disable any animations/transitions by setting `config.transitions` to `false`.
To disable individual transitions, you can set any member of
`config.disabled_transitions` to `true`.

```lua
local config = require "core.config"
-- disable all transitions
config.transitions = false
-- disable commandview and scroll transitions
config.disabled_transitions = {
  commandview = true,
  scroll = true
}
```

To change the animation rate, set `config.animation_rate`.

```lua
local config = require "core.config"
-- slow down the animations to half speed
config.animation_rate = 0.5
```

### Other options

??? Abstract "A quick reference of other options."
    | Options                   | Description
    | -------                   | -----------
    | `max_log_items`           | Maximum number of log items to store before discarding them.
    | `message_timeout`         | Time (seconds) to show each message on the StatusView.
    | `mouse_wheel_scroll`      | Number of pixels per "scroll".
    | `animate_drag_scroll`     | Enable smooth scrolling.
    | `force_scrollbar_status`  | Always expand (`"expanded"`) or hide (`"contracted"`) the scrollbar.
    | `file_size_limit`         | File size limit (MB) before Lite XL refuses to load it.
    | `symbol_pattern`          | Lua pattern used by Lite XL to find symbols.
    | `non_word_chars`          | A pattern used to find non-word characters.
    | `undo_merge_timeout`      | Time (seconds) before Lite XL merges edits to form a single undo step.
    | `max_undos`               | Number of undo to store per document.
    | `max_tabs`                | Number of tabs to show before overflowing.
    | `always_show_tabs`        | If true, always show tabs even if only one file is open.
    | `highlight_current_line`  | Highlights the current line.
    | `line_height`             | The spacing between each line.
    | `keep_newline_whitespace` | If true, removes any line that only contains whitespace (space, tabs, etc.)
    | `line_limit`              | An **advisory** limit for characters per line.
    | `tab_close_button`        | Shows or hides the tab close button for each tab.
    | `max_clicks`              | Maximum number of clicks you can perform in the editor.

## Plugins

Since the user and project module loads before any plugins, you can configure
or disable any plugins in the user and project modules.
Plugins obtain their configuration from a table in the `config.plugins` table.
You can add code to user module that modifies the table.

To disable a plugin, you need to set the associated `config.plugins` entry to `false`.
This tells Lite XL to not load the plugin on startup.
It will not load nor unload the plugin from the current instance.

??? note "Some plugins may have options to enable/disable themselves."
    This allows the plugins to be loaded and toggled without a restart.

=== "User Module"

    In this example, we'll enable the `drawwhitespace` plugin
    and set it to only draw whitespaces in the selected text.

    ```lua
    local config = require "core.config"
    config.plugins.drawwhitespace = {
      show_selected_only = true
    }
    ```

    To disable the plugin, simply assign `config.plugins.drawwhitespace` to `false`.

    ```lua
    local config = require "core.config"
    config.plugins.drawwhitespace = false
    ```

=== "Settings GUI"

    Navigate to the "Plugins" tab.

    In this tab, you will find many sections dedicated to each plugin,
    as well as an "Installed" section where you can enable/disable the plugins.

    To enable the `drawwhitespace` plugin, expand the "Installed" section
    and enable the corresponding plugin.

    ![The Installed section][16]{ loading=lazy }

    To modify the configuration for a plugin, expand the relevant section.
    The changes will apply automatically.
    ![Settings for drawwhitespace][17]{ loading=lazy }


[1]:  https://www.jetbrains.com/lp/mono/
[2]:  https://fonts.google.com/specimen/Fira+Sans
[3]:  https://fonts.google.com/noto/specimen/Noto+Sans+Mono
[4]:  https://fonts.google.com/noto/specimen/Noto+Sans+SC
[5]:  ../assets/user-guide/settings/fonts/font-option.png
[6]:  ../assets/user-guide/settings/fonts/font-selector.png
[7]:  ../assets/user-guide/settings/fonts/font-order.png
[8]:  ../user-guide/keymap.md
[9]:  ../user-guide/macos-keymap.md
[10]: ../assets/user-guide/settings/keybinds/keybinds.png
[11]: ../assets/user-guide/settings/keybinds/keybind-selector.png
[12]: ../assets/user-guide/settings/keybinds/keybinds-after.png
[13]: ../assets/user-guide/settings/keybinds/keybind-selector-after.png
[14]: ../assets/user-guide/settings/colors.png
[15]: https://github.com/lite-xl/lite-xl/blob/master/data/core/config.lua
[16]: ../assets/user-guide/settings/plugins/installed.png
[17]: ../assets/user-guide/settings/plugins/options.png
