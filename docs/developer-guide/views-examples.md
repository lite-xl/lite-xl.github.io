---
description: Learn about the most used custom view examples of Lite XL.
---

## Example: ToolbarView

brief introduction

![Screenshot of a ToolBarView example][screenshot-toolbarview]

### Creating a plugin

```lua
-- mod-version:3 -- lite-xl 2.1
```

This is required to specify Lite XL version compatibility.

The instructions that begin with `require` add necessary libraries.

```lua
local toolbar = common.merge({
  -- plugin configuration options go here
}, config.plugins.build)
```

The code above contains the (optional) configuration options of the plugin.

The `get_plugin_directory()` function gets the plugin folder path and tells the 
plugin where to find the icon font.
The iteration code is used to check if every folder detected by `get_plugin_directory()` 
actually exists and if the folder doesn't exist, a `nil` value is returned.

`local ToolBar = ToolbarView:extend()` is used to create a new custom View and make it 
inherit ToolbarView.

```lua
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

The code above creates an instance of our custom Toolbar view, inherits the ToolbarView super-constructor, 
specifies the desired icon font and assigns the icons to their respective commands.

`toolbar.example_toolbar_view = ToolBar()` saves the toolbar in an exported table, to allow any plugin to require it, thus accessing the bar.

```lua
toolbar.example_toolbar_node = TreeView.node.b:split("up", toolbar.example_toolbar_view, {y = true})
```

This instruction splits the `TreeView` according to the `up` direction, adds the `toolbar.example_toolbar_view` and fixes its size along the y axis.

`return toolbar` returns the toolbar table to Lite XL.

To prepare a simple icon font with Fontello, you can do the following:

1. Go to [Fontello](https://fontello.com/)
2. Drag and drop the desired icons in the light-gray rectangle in the middle of the page, or 
upload your own svg files
3. Use `mouse-left-click` to select the icons you want to include in the font
4. Press on the `Customize Codes` tab on the top-left of the page and copy each icon glyph and 
paste it into the corresponding place in the `toolbar_commands` table
5. Specify the icon font name in the white text input field in the top right
6. Press the big red button in the top right corner of the page to create and download the icon font

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
}, config.plugins.build)

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
