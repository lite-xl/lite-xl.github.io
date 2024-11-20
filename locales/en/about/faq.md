# FAQ

#### Can I get smart autocompletion (intellisense/LSP)?

Check out the [LSP] plugin.

#### Where is the integrated terminal?

You can try [lite-xl-terminal].

#### Tabs and indent size?

In your user config (the cog icon in the file tree):

```lua
config.tab_type = "soft" -- soft for spaces, hard for real tabs (\t)
config.indent_size = 4   -- 4 spaces
```

#### How to bind commands to keys?

```lua
local keymap = require "core.keymap"
keymap.add { ["ctrl+escape"] = "core:quit" }
```

#### How to unbind commands for certain keys?

```lua
-- the second parameter lets you override commands for certain keys
-- in this case it maps it to nothing
keymap.add({ ["ctrl+escape"] = {} }, true)
```

#### How to get commands for those keybinds?

You can search for commands in the command palette.

For each command, replace the spaces in the right side with dashes.

For example: `Core: Find Command` → `core:find-command`

#### What version of Lua does Lite XL use?

Lua 5.4.

#### Plugin recommendations

Just in case you don't want to comb through our [plugin repository][1],
these are a list of plugins that just makes Lite XL a lot more pleasant.

| Plugin               | Use case
| ---                  | ---
| [autoinsert]         | Automatically insert closing brackets and quotes
| [bracketmatch]       | Highlight matching brackets
| [ephemeral_tabs]     | Ephemeral tabs (previewing files without creating multiple tabs)
| [gitdiff_highlight]  | Git diff gutter
| [lint+]              | Linter support
| [minimap]            | Minimap
| [selectionhighlight] | Highlight code that matches the selection
| [lite-xl-discord]    | Discord rich presence |

#### Where's feature X? How about Y?

You can get more info in the [Features page](/en/about/features).


[LSP]:                https://github.com/lite-xl/lite-xl-lsp
[lite-xl-terminal]:   https://github.com/adamharrison/lite-xl-terminal
[autoinsert]:         https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/autoinsert.lua?raw=1
[bracketmatch]:       https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/bracketmatch.lua?raw=1
[ephemeral_tabs]:     https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/ephemeral_tabs.lua?raw=1
[gitdiff_highlight]:  https://github.com/vincens2005/lite-xl-gitdiff-highlight
[lint+]:              https://github.com/liquid600pgm/lintplus
[minimap]:            https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/minimap.lua?raw=1
[selectionhighlight]: https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/selectionhighlight.lua?raw=1
[lite-xl-discord]:    https://github.com/vincens2005/lite-xl-discord

[1]: https://github.com/lite-xl/lite-xl-plugins
