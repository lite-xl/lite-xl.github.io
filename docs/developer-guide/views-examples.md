---
description: Learn about the most used custom view examples of Lite XL.
---

brief intro

## Toolbar View

brief code explanation

code example (no custom commands):
```lua
-- mod-version:3 -- lite-xl 2.1

local core = require "core"
local config = require "core.config"
local common = require "core.common"
local style = require "core.style"
local TreeView = require "plugins.treeview"
local ToolbarView = require "plugins.toolbarview"

local exampletoolbarview = common.merge({
}, config.plugins.build)

local function get_plugin_directory()
  local paths = {
    USERDIR .. PATHSEP .. "plugins" .. PATHSEP .. "example-toolbar",
    DATADIR .. PATHSEP .. "plugins" .. PATHSEP .. "example-toolbar"
  }
  for i, v in ipairs(paths) do
    if system.get_file_info(v) then
      return v
    end
  end
  return nil
end

local ExampleToolBarView = ToolbarView:extend()

function ExampleToolBarView:new()
  ExampleToolBarView.super.new(self)
  self.toolbar_font = renderer.font.load(get_plugin_directory() .. PATHSEP .. "toolbar.ttf", style.icon_big_font:get_size())
  self.toolbar_commands = {
    {symbol = "", command = "core:open-log"},
    {symbol = "", command = ""},
    {symbol = "", command = ""},
    {symbol = "", command = ""},
    {symbol = "", command = ""},
    {symbol = "", command = ""},
  }
end

exampletoolbarview.example_toolbar_view = ExampleToolBarView()
local node = core.root_view:get_active_node()
exampletoolbarview.example_toolbar_node = TreeView.node.b:split("up", exampletoolbarview.example_toolbar_view, {y = true})

return exampletoolbarview
```

expl 1: required files

expl 2: plugin configuration

expl 3: get_plugin_directory

expl 4: `ToolbarView` extension

expl 5: ?

expl 6: ?

### How to create a custom icon font for the toolbar

