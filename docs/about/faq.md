---
description: A list of frequently-asked questions.
---

# FAQ

#### Is there an easier way to configure Lite XL without learning Lua?

Yes, since [v2.1.0] we provide an extended package with
additional plugins which provides a GUI for configuring Lite XL.
The packages are prefixed with `lite-xl-(version)-addons`
(e.g. `lite-xl-v2.1.0-addons-windows-x86_64.zip`).

#### Can I get smart autocompletion (intellisense/LSP)?

Check out the [lsp] plugin.

#### Where is the integrated terminal?

Work is being done on [lite-xl-terminal] and [lite-xl-tmt].
Both plugins have their own supported features and bugs,
so you should try both out and see which one works for you.

#### Tabs and indent size?

In your user config (the cog icon in the file tree):

```lua
config.tab_type = "soft" -- soft for spaces, hard for real tabs (\t)
config.indent_size = 4   -- 4 spaces
```

#### How to enable line wrapping?

Since [v2.1.0], you can enable line wrapping by pressing F10.
Before v2.1.0, only hard wrapping is supported via [autowrap].

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

For each command, replace the spaces on the right side with dashes.

For example: `Core: Find Command` → `core:find-command`

#### What version of Lua does Lite XL use?

Lua 5.4 since v2.1.0 and Lua 5.4.2 before v2.1.0.
There's some activity around using LuaJIT instead (which is 5.1)
but it can provide some Lua 5.2 compatibility.
[Ongoing work][master-luajit-branch] is being done to
maintain compatibility between LuaJIT and Lua 5.4,
but this is not officially supported.

#### Vim mode?

You need to [vibe].


[v2.1.0]:               https://github.com/lite-xl/lite-xl/releases/tag/v2.1.0
[lsp]:                  https://github.com/lite-xl/lite-xl-lsp
[lite-xl-terminal]:     https://github.com/benjcollins/lite-xl-terminal
[lite-xl-tmt]:          https://github.com/ColonelPhantom/lite-xl-tmt
[autowrap]:             https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/autowrap.lua?raw=1
[master-luajit-branch]: https://github.com/lite-xl/lite-xl/pull/880
[vibe]:                 https://github.com/eugenpt/lite-xl-vibe
[plugin repository]:    https://github.com/lite-xl/lite-xl-plugins
[align_carets]:         https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/align_carets.lua?raw=1
[autoinsert]:           https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/autoinsert.lua?raw=1
[autosave]:             https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/autosave.lua?raw=1
[bracketmatch]:         https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/bracketmatch.lua?raw=1
[editorconfig]:         https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/editorconfig
[ephemeral_tabs]:       https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/ephemeral_tabs.lua?raw=1
[fontconfig]:           https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/fontconfig.lua?raw=1
[gitdiff_highlight]:    https://github.com/vincens2005/lite-xl-gitdiff-highlight
[indentguide]:          https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/indentguide.lua?raw=1
[lint+]:                https://github.com/liquid600pgm/lintplus
[litepresence]:         https://github.com/TorchedSammy/Litepresence
[lspkind]:              https://github.com/TorchedSammy/lite-xl-lspkind
[minimap]:              https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/minimap.lua?raw=1
[selectionhighlight]:   https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/selectionhighlight.lua?raw=1
[settings]:             https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/settings.lua?raw=1
[widgets]:              https://github.com/lite-xl/lite-xl-widgets
