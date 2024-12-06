---
description: Learn to extend a View in Lite XL for extra functionality.
---

### What is ToolbarView?

ToolbarView provides a generic toolbar above the existing one in Lite XL.
A toolbar is a GUI component that allows mouse-driven activation of commands by pressing buttons.

### What does the plugin do?

The plugin allows users to create their own toolbars with custom icons and functionality.
For example, the toolbar can be configured for Git operations, which is shown below.

![Screenshot of a ToolbarView example][screenshot-toolbarview]

### Create a plugin

Before reading further, it may be useful to refresh Lua basics by reading the [Lua manual][learning-lua].

Now let's start writing the plugin.
Create a directory called `toolbar` in `USERDIR/plugins`.
`USERDIR` usually corresponds to `~/.config/lite-xl` on Linux and macOS,
and `%USERPROFILE/.config/lite-xl` on Windows.

Inside the directory, create a file called `init.lua`.
Add `#!lua -- mod-version:3` to the first line of the file to indicate
the versions of Lite XL supported by the plugin.

### Get plugin directory

We add some code that retrieves information like folder paths of plugins and fonts.

```lua title="USERDIR/plugins/toolbar/init.lua"
local function get_plugin_directory()
  local paths = {
    USERDIR .. PATHSEP .. "plugins" .. PATHSEP .. "toolbar",
    DATADIR .. PATHSEP .. "plugins" .. PATHSEP .. "toolbar"
  }
  for i, v in ipairs(paths) do
    -- Check if folder exists
    if system.get_file_info(v) then
      return v
    end
  end
  return nil
end
```

The `get_plugin_directory()` function is needed as we may load icon fonts from the plugin
directory itself.
Lua does not provide the path of the current file (e.g. `__filename` and `__dirname` in Node.js),
so we have to improvise and hard-code the path.
For this reason, the code will not work if the plugin is saved as `USERDIR/plugins/toolbar.lua`,
even if Lite XL could load the plugin.

### Create the view

Next we create an instance of our custom toolbar view, make it inherit the ToolbarView super-constructor, 
specify the desired icon font and assign the icons to their respective commands.

```lua title="USERDIR/plugins/toolbar/init.lua"
local Toolbar = ToolbarView:extend()

function Toolbar:new()
  Toolbar.super.new(self)
  self.toolbar_font = renderer.font.load(get_plugin_directory() .. PATHSEP .. "toolbar.ttf", style.icon_big_font:get_size())
  self.toolbar_commands = {
    {symbol = "A", command = "core:open-log"},
    {symbol = "B", command = "core:new-doc"},
    {symbol = "C", command = ""},
    {symbol = "D", command = ""},
    {symbol = "E", command = ""},
    {symbol = "F", command = ""},
  }
end
```

You can add existing commands inside the empty fields or write your own.

### Add the view

Now we insert the toolbar into Lite XL and make it extendable by other plugins with
`#!lua local toolbar = require "plugins.toolbar"`.

```lua title="USERDIR/plugins/toolbar/init.lua"
toolbar.example_toolbar_view = Toolbar()
-- TreeView is split along the up direction and the ToolbarView is added at the bottom
-- {y = true} indicates that the ToolbarView size should be fixed along the y axis
toolbar.example_toolbar_node = TreeView.node.b:split("up", toolbar.example_toolbar_view, {y = true})
return toolbar
```

### Create a custom icon font

The last step is preparing a simple icon font with Fontello; to do this, you must do the following:

1. Go to [Fontello][fontello]
2. Drag and drop the desired icons in the light-gray rectangle in the middle of the page: ![Drag & Drop][drag-n-drop]

3. Select the icons you want to include in the font
4. Press on the `Customize Codes` tab on the top-left of the page and copy each icon glyph and 
paste it into the corresponding place in the `toolbar_commands` table (the example contains letters, so replace those letters with the corresponding glyphs)

    ![Customize Codes][customize-codes]

5. Specify the icon font name in the white text input field in the top right
6. Press the rectangular red button with `Download webfont` in the top right corner of the page to create and download the icon font: 

    ![Red Button][red-button]

### The code

The following is an example of a very simple toolbar with a custom icon font:

```lua title="USERDIR/plugins/toolbar/init.lua"
-- mod-version:3 -- lite-xl 2.1

local config = require "core.config"
local common = require "core.common"
local style = require "core.style"
local TreeView = require "plugins.treeview"
local ToolbarView = require "plugins.toolbarview"

local function get_plugin_directory()
  local paths = {
    USERDIR .. PATHSEP .. "plugins" .. PATHSEP .. "toolbar",
    DATADIR .. PATHSEP .. "plugins" .. PATHSEP .. "toolbar"
  }
  for i, v in ipairs(paths) do
    if system.get_file_info(v) then
      return v
    end
  end
  return nil
end

local Toolbar = ToolbarView:extend()

function Toolbar:new()
  Toolbar.super.new(self)
  self.toolbar_font = renderer.font.load(get_plugin_directory() .. PATHSEP .. "toolbar.ttf", style.icon_big_font:get_size())
  self.toolbar_commands = {
    {symbol = "A", command = "core:open-log"},
    {symbol = "B", command = "core:new-doc"},
    {symbol = "C", command = ""},
    {symbol = "D", command = ""},
    {symbol = "E", command = ""},
    {symbol = "F", command = ""},
  }
end

toolbar.example_toolbar_view = Toolbar()
toolbar.example_toolbar_node = TreeView.node.b:split("up", toolbar.example_toolbar_view, {y = true})

return toolbar
```


[screenshot-toolbarview]: ../../assets/screenshots/views/toolbarview.png
[drag-n-drop]:            ../../assets/screenshots/views/drag-n-drop.png
[red-button]:             ../../assets/screenshots/views/red-button.png
[customize-codes]:        ../../assets/screenshots/views/customize-codes.png
[learning-lua]:           https://www.lua.org/pil/contents.html
[fontello]:               https://fontello.com/
