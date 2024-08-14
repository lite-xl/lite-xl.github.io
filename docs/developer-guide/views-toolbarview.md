---
description: Learn to extend a View in Lite XL for extra functionality.
---

![Screenshot of a ToolBarView example][screenshot-toolbarview]

A toolbar is a GUI component that allows mouse-driven activation of commands by pressing buttons.

## Creating a plugin

Before reading further, it may be useful to refresh Lua basics by reading the [Lua manual][learning-lua].

...

## Check if the plugin directory exists

To begin with, we add some code that retrieves information like folder paths of plugins and fonts.

```lua
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

## Create the view

Next we create an instance of our custom toolbar View, make it inherit the ToolbarView super-constructor, 
specify the desired icon font and assign the icons to their respective commands.

```lua
local ToolBar = ToolbarView:extend()

function ToolBar:new()
  ToolBar.super.new(self)
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

## Add the view

Now we insert the toolbar into Lite XL and make it extendable by other plugins with `local toolbar = require "plugins.toolbar"`.

```lua
toolbar.example_toolbar_view = ToolBar()
-- TreeView is split along the up direction and the ToolbarView is added at the bottom
-- {y = true} indicates that the ToolBarView size should be fixed along the y axis
toolbar.example_toolbar_node = TreeView.node.b:split("up", toolbar.example_toolbar_view, {y = true})
return toolbar
```

## Create a custom icon font

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

## Complete Example

The following is an example of a very simple toolbar with a custom icon font:
```lua
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

local ToolBar = ToolbarView:extend()

function ToolBar:new()
  ToolBar.super.new(self)
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
