# Simple Plugin

### What is Simple?
Simple is a very basic plugin written with the intention of introducing developers
who are new to Lite XL to the process of writing plugins for the editor.

### What does the plugin do?
The plugin displays a message (that is taken as input from the user) at the top
right corner of the editor window. It also allows the user to toggle
the visibility of the message.

### I can't write Lua!
If you come from other programming languages, take a look at [Lua cheatsheet][1].
If you're new to programming, you can read [this][2].

### Format of the tutorial
The code contains comments detailing what most (if not all)
of the code in the file does.


### The code :
```lua
-- mod-version:3

-- you MUST put mod-version:x on the first line of your plugin
-- mod-version usually maps to lite-xl releases (eg. mod-version: 2 == lite-xl 2.0)
-- lite-xl won't load the plugin if the mod-version mismatches

-----------------------------------------------------------------------
-- NAME       : Simple
-- DESCRIPTION: A simple guide on how to make your first Lite XL plugin
-- AUTHOR     : Ashwin Godbole (aelobdog)
-- GOALS      : To render some text inside the editor
-----------------------------------------------------------------------
-- Disclaimer :
-- I am not a lua developer, and my knowledge about writing plugins for
-- Lite XL is very limited. This file serves the purpose of helping the
-- reader get started with plugin development for Lite XL, and therefore
-- demonstrates only some very basic features. For more complex plugin
-- development, be sure to check out the source code of some other
-- plugins after going through this file.
-----------------------------------------------------------------------
-- Before we start writing any code for the plugin, we must import the
-- required modules from the "core" package.

-- the "core" module
local core = require "core"

-- the "command" module will help us register commands for our plugin.
local command = require "core.command"

-- the "style" module will allow us to use styling options
local style = require "core.style"

-- the "config" module will be used to store certain things like colors
-- and functions
local config = require "core.config"

-- the "keymap" module will allow us to set keybindings for our commands
local keymap = require "core.keymap"

-- since we want to modify RootView, we'll need to require it first
local RootView = require "core.rootview"

-----------------------------------------------------------------------
-- per-plugin config must stay in config.plugins.(plugin name)
config.plugins.simple = {}

-- colors are just three or four comma separated values (RGBA) (range 0 - 255)
-- put inside of '{ }'. We will add our color to the config module.
config.plugins.simple.text_color = {200, 140, 220} -- or use `{ common.color "#C88CDC" }`
-----------------------------------------------------------------------
-- Let's create a function to calculate the coordinates of our text.
-- While we're at it, let's add our function to the `config` module.
-- We'll take the message we want to display as the argument to the
-- function to determine the x and y coordinates of the text.

function config.plugins.simple.get_text_coordinates(message)
   -- For this plugin, we want to display the text on the top right
   -- corner of the screen. For this, we need to know the editor's width
   -- and height.

   -- The current font's size can be obtained from the "style" module.
   -- The editor's dimensions can be obtained by
   --   1. WIDTH  : core.root_view.size.x
   --   2. HEIGHT : core.root_view.size.y

   local message_width = style.code_font:get_width(message.." ")
   local font_height = style.code_font:get_size()
   local x = core.root_view.size.x - message_width
   local y = font_height / 2

   return x, y
end
-----------------------------------------------------------------------
-- Let's now get to actually drawing the text inside the editor.
-- In order to "inject" our own code to draw text,
-- we'll need to save the original draw function
-- We'll save `RootView.draw` to a variable we call `parent_draw`

local parent_draw = RootView.draw

-- Now let's overload the original definition of `draw` in RootView
-- by redefining the function.

function RootView:draw()
   -- We call the parent's function to keep the editor functional...
   -- obviously we must still draw all the other stuff !
   -- So we call the `parent_draw` function before doing anything else.
   parent_draw(self)

   -- we'll add an option to toggle the message on and off. let's use a
   -- boolean variable to keep track of whether we want to display the
   -- message or not.
   if config.plugins.simple.show_my_message then
      -- We'll be getting the message to display as input from the user
      -- later. We'll store that user input in `config.plugins.simple.hw_message`.
      -- (NOTE: this variable does not come in-built in lite-xl;
      --        it is a variable that we will define later.)

      -- let's store the value of config.plugins.simple.hw_message in a local variable
      -- `message` in case config.plugins.simple.hw_message we set the message to
      -- "message not set yet!"
      local message

      if config.plugins.simple.hw_message then
          message = config.plugins.simple.hw_message
      else
          message = "Message not set yet !"
      end

      -- let's get the coordinates for our text
      local x, y = config.plugins.simple.get_text_coordinates(message)

      -- let's finally draw the text to the window !
      -- the draw_text function from `renderer` is an important function
      -- as it is used to display any and all text inside of the editor
      -- window
      renderer.draw_text(style.code_font, message, x, y, config.plugins.simple.text_color)
   end
end
-----------------------------------------------------------------------
-- Let's allow the user to turn the message on and off
-- we'll write a function to flip our "show" boolean variable.

local function toggle_helloworld()
   config.plugins.simple.show_my_message = not config.plugins.simple.show_my_message
end
-----------------------------------------------------------------------
-- Finally, let's add the toggle function to the command list so that
-- we can call it from the C-S-p command panel. Let's add one command
-- to toggle the visibility of the message on and off and one to get
-- the user's message and then display it.

command.add(nil, {
   -- Toggle the visibility of the message
   ["simple:toggle"] = toggle_helloworld,

   -- Set and show the message
   -- This is the way to get user input through the command bar.
   -- `core.command_view:enter` takes 2 arguments:
   --    * the prompt to display before taking input
   --    * a function that takes the "input" as its argument
   -- (NOTE: here the variable we are reading input into is `text`)
   ["simple:setshow"] = function()
      core.command_view:enter("Test to display", {
         submit = function(text)
            config.plugins.simple.hw_message = text
            config.plugins.simple.show_my_message = true
         end
      })
   end
})
-----------------------------------------------------------------------
-- Just for fun, let's assign our commands their own keybindings.
-- Here, we assign the keybinding the same string(its name) as the one
-- that we set while creating the command
keymap.add {
   ["alt+s"] = "simple:setshow",
   ["alt+t"] = "simple:toggle",
}
```

### Further reading
- [Lite: An Implementation Overview][3], an excellent post by rxi that stays mostly relevant to lite-xl.
- [API overview][4], where some of the APIs are explained.


[1]: https://devhints.io/lua
[2]: https://www.lua.org/pil
[3]: https://rxi.github.io/lite_an_implementation_overview.html
[4]: /en/tutorials/api-overview
