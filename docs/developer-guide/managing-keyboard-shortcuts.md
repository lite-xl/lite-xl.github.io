Mouse clicks, wheel and keyboard events are handled by
`core.keymap` before it was passed to other parts of the editor.
The keymap holds the state of various keys, including the modifiers
(`keymap.modkeys`) and runs a command when it's appropriate.
The keymap holds a map of key combinations to commands (`keymap.map`)
and a map of commands to key combinations (`keymap.reverse_map`).

### Keyboard shortcut format

The string is split into parts delimited by `+` and
each part of the split string is treated as a key.
For the list of valid keys, check out [SDL's documentation][8].
For mouse buttons, the format is as follows:

`[nclicks][type]click`

`nclicks` is the number of clicks and defaults to 1 when not specified.
`type` is optional and can be one of `l`, `r`, `m`, `x` and `y`.
These letters correspond to left, right middle, mouse 4 and
mouse 5.
By default, `type` is set to `l`.

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