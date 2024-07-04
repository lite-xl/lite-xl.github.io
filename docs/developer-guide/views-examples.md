---
description: Learn to extend a View in Lite XL for extra functionality.
---

## Example: ToolbarView

brief introduction

![Screenshot of a ToolBarView example][screenshot-toolbarview]

### Creating a plugin

Before reading further, it may be useful to refresh Lua basics by reading the [Lua manual][learning-lua].

### Adding configuration settings

WIP: write some setting option examples

WIP: explain why we merge the tables

```lua
local toolbar = common.merge({
  -- plugin configuration options go here
}, config.plugins.toolbar)
```

### Checking if the plugin directory exists

The code below is used to check if every folder detected by `get_file_info()` 
actually exists and if it doesn't, a `nil` value is returned.

```lua
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
```

### Creating the view

The code below creates an instance of our custom Toolbar View, inherits the ToolbarView super-constructor, 
specifies the desired icon font and assigns the icons to their respective commands.

```lua
local ToolBar = ToolbarView:extend()

function ToolBar:new()
  ToolBar.super.new(self)
  self.toolbar_font = renderer.font.load(get_plugin_directory() .. PATHSEP .. "toolbar.ttf", style.icon_big_font:get_size())
  self.toolbar_commands = {
    {symbol = "", command = "core:open-log"},
    {symbol = "", command = "core:new-doc"},
    {symbol = "", command = ""},
    {symbol = "", command = ""},
    {symbol = "", command = ""},
    {symbol = "", command = ""},
  }
end
```

`local ToolBar = ToolbarView:extend()` is used to create a new custom View and make it 
inherit ToolbarView.

The `renderer.font.load` function assigns the icon font to the View.

The `get_plugin_directory()` function gets the plugin folder path.

### Adding the view

The code below saves the toolbar in an exported table, to allow any plugin to require it, thus accessing the bar.

```lua
toolbar.example_toolbar_view = ToolBar()
```

The code below splits the `TreeView` according to the `up` direction, adds the `toolbar.example_toolbar_view` and fixes its size along the Y-axis.

```lua
toolbar.example_toolbar_node = TreeView.node.b:split("up", toolbar.example_toolbar_view, {y = true})
```

`return toolbar` returns the toolbar table to whatever function called it.

### Creating a custom icon font

To prepare a simple icon font with Fontello, you can do the following:

1. Go to [Fontello][fontello]
2. Drag and drop the desired icons in the light-gray rectangle in the middle of the page: ![Drag & Drop][drag-n-drop]

3. Select the icons you want to include in the font
4. Press on the `Customize Codes` tab on the top-left of the page and copy each icon glyph and 
paste it into the corresponding place in the `toolbar_commands` table

    ![Customize Codes][customize-codes]

5. Specify the icon font name in the white text input field in the top right
6. Press the rectangular red button with `Download webfont` in the top right corner of the page to create and download the icon font: 

    ![Red Button][red-button]

### Example

The following is an example of a very simple toolbar with a custom icon font:
```lua
-- mod-version:3 -- lite-xl 2.1

local config = require "core.config"
local common = require "core.common"
local style = require "core.style"
local TreeView = require "plugins.treeview"
local ToolbarView = require "plugins.toolbarview"

local toolbar = common.merge({
  -- plugin configuration options go here
}, config.plugins.toolbar)

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

local ToolBar = ToolbarView:extend()

function ToolBar:new()
  ToolBar.super.new(self)
  self.toolbar_font = renderer.font.load(get_plugin_directory() .. PATHSEP .. "toolbar.ttf", style.icon_big_font:get_size())
  self.toolbar_commands = {
    {symbol = "", command = "core:open-log"},
    {symbol = "", command = "core:new-doc"},
    {symbol = "", command = ""},
    {symbol = "", command = ""},
    {symbol = "", command = ""},
    {symbol = "", command = ""},
  }
end

toolbar.example_toolbar_view = ToolBar()
toolbar.example_toolbar_node = TreeView.node.b:split("up", toolbar.example_toolbar_view, {y = true})

return toolbar
```

[screenshot-toolbarview]: ../assets/screenshots/views/toolbarview.png
[drag-n-drop]: ../assets/screenshots/views/drag-n-drop.png
[red-button]: ../assets/screenshots/views/red-button.png
[customize-codes]: ../assets/screenshots/views/customize-codes.png
[learning-lua]: https://www.lua.org/pil/contents.html
[fontello]: https://fontello.com/
