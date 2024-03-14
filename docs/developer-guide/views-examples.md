---
description: Learn about the most used custom view examples of Lite XL.
---

The toolbar is ...

## Toolbar View

### Step by step tutorial
expl 1: required files
expl 2: plugin configuration
expl 3: get_plugin_directory
expl 4: `ToolbarView` extension
expl 5: `ToolbarView` constructor
expl 6: drawing call
expl 7: splitting a view to add the new view
expl 8: explain the `return toolbar` instruction

### Complete plugin example
The following is an example of a very simple toolbar with custom icons:
```lua
-- mod-version:3 -- lite-xl 2.1

local config = require "core.config"
local common = require "core.common"
local style = require "core.style"
local TreeView = require "plugins.treeview"
local ToolbarView = require "plugins.toolbarview"

local toolbar = common.merge({
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
