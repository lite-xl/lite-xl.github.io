---
description: Learn in detail how to add and manage keyboard shortcuts
              in Lite XL.
---

Mouse clicks, wheel and keyboard events are handled by
`core.keymap` before it was passed to other parts of the editor.
The keymap holds the state of various keys, including the modifiers
(`keymap.modkeys`) and runs a command when it's appropriate.
The keymap holds a map of key combinations to commands (`keymap.map`)
and a map of commands to key combinations (`keymap.reverse_map`).

## Keyboard shortcut format

The string is split into parts delimited by `+` and
each part of the split string is treated as a key.
For the list of valid keys, check out [SDL's documentation][1] (the "Key Name" column).

For mouse buttons, the format is as follows:

`[nclicks][type]click`

`nclicks` is the number of clicks and defaults to 1 when not specified.
`type` is optional and can be one of `l`, `r`, `m`, `x` and `y`.
These letters correspond to left, right middle, mouse 4 and
mouse 5.
By default, `type` is set to `l`.

!!! note
    Lite XL does not support consecutive keystrokes, such as `ctrl+k ctrl+b`.

**Examples:**

```lua
-- bind core:find-command to ctrl+k
keymap.add { ["ctrl+k"] = "core:find-command" }

-- bind core:find-command to clicking middle mouse
keymap.add { ["mclick"] = "core:find-command" }

-- bind core:find-command to double clicking right mouse
keymap.add { ["2mclick"] = "core:find-command" }
```

## Adding Keyboard Shortcuts

Ways to add keyboard shortcuts were already discussed in the user guide.
To add keyboard shortcuts programmatically, use `keymap.add()`.

```lua
-- a composite type for commands
local type Commands = string | {string}

function keymap.add(map: {string: Commands}, overwrite: boolean): () end
```

`keymap.add()` takes in a table of keyboard shortcuts and the commands
for each keyboard shortcut.
If the second parameter `overwrite` is true, then the commands
will be replaced instead of appended.

**Example:**

```lua
local keymap = require "core.keymap"

-- bind alt + ijkl to move the cursor
keymap.add {
  ["alt+j"] = "doc:move-to-previous-char",
  ["alt+l"] = "doc:move-to-next-char",
  ["alt+i"] = "doc:move-to-previous-line",
  ["alt+k"] = "doc:move-to-next-line",
}

-- you can also bind a keybind to execute multiple actions
keymap.add {
  ["ctrl+c"] = ["doc:move-to-next-line", "doc:move-to-next-word"]
}

-- you can also overwrite current keybind
-- override up for down
keymap.add({
  ["down"] = "doc:move-to-previous-line",
  ["up"] = "doc:move-to-next-line",
}, true)
```

## Removing a Keyboard Shortcut

To remove a keyboard shortcut, you can use `keymap.unbind()`.

```lua
function keymap.unbind(shortcut: string, command?: string): () end
```

The function accepts a keyboard shortcut and optionally a command to unbind.
If a command is specified, the function will unbind that command
from the key.
Otherwise, it will unbind all commands from the shortcut.

## Getting Keyboard Shortcuts

To get all the keyboard shortcuts associated with a command, use
`keymap.get_binding()` or `keymap.get_bindings()`.

```lua
function keymap.get_binding(cmd: string): string... end

function keymap.get_bindings(cmd: string): {string} end
```

Both functions accept a command and returns the keyboard
shortcuts associated to it.
However, `keymap.get_bindings()` returns a table instead
of a list of values.

## Overriding the Keymap

If your plugin need to override the keymap for extra functionality
(e.g. redirecting keyboard shortcuts to a terminal), you
can override `keymap.on_key_pressed()`, `keymap.on_mouse_wheel()`,
`keymap.on_mouse_pressed()` and `keymap.on_key_released()`.

```lua
function keymap.on_key_pressed(key: string, ...: any): boolean end

function keymap.on_mouse_wheel(delta_y: number,
                                delta_x: number,
                                ...: any): boolean end

function keymap.on_mouse_pressed(button: string,
                                  x: number,
                                  y: number,
                                  clicks: number): boolean end

function keymap.on_key_released(key: string): () end
```

`keymap.on_key_pressed()` accepts the key that is being pressed.
The other values are reserved for internal usage and should be
passed as-is.

`keymap.on_mouse_wheel()` accepts the X and Y delta — the number
of "steps" scrolled on the mouse wheel.
Other values are reserved for internal usage and should be passed
as-is.

`keymap.on_mouse_pressed()` accepts the type of button being pressed,
the coordinates where the button is pressed and the number of
consecutive clicks.

`keymap.on_key_released()` accepts the key that is released.

`keymap.on_key_pressed()`, `keymap.on_mouse_wheel()` and
`keymap.on_mouse_pressed()` returns a boolean that signals
if the event is being handled.
If the function returns true, then the event is considered
handled and will not be propagated further.
You must handle this condition if you decide to override
any of these functions.

??? warning "Since v2.1.0, text composition events (IME) should be taken into consideration when handling key events."
    In recent versions of Lite XL, text composition/input events
    has been added to support IMEs.
    When text input is enabled, you may receive a key down event
    and a text input event.
    You need to consider how to handle these new events too.

**Example:**

```lua
local keymap = require "core.keymap"

-- a simple function that logs your keypresses
local keymap_on_key_pressed = keymap.on_key_pressed
function keymap.on_key_pressed(key, ...)
  local handled = keymap_on_key_pressed(self, key, ...)
  print(key, "Pressed!")
end

local ime = require "core.ime"

-- to handle IME text composition events, you need to
-- check the ime.editing value.
-- If this value is true, text is being composited.
-- You might want to ignore the keypresses.
function keymap.on_key_pressed(key, ...)
  -- on Linux this behavior is not observed so it can
  -- be skipped
  if PLATFORM ~= "Linux" and ime.editing then return false end
  local handled = keymap_on_key_pressed(self, key, ...)
  print(key, "Pressed!")
end
```

[1]: https://wiki.libsdl.org/SDL2/SDL_Keycode
