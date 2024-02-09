---
description: Install Lite XL and configure it for your use.
---

## Install

Official builds of Lite XL can be obtained from [GitHub releases].
Alternatively, many package managers also provide Lite XL for installation.
Finally, you can build Lite XL and install it directly.

- [Install from Releases]
- [Install from Package Managers]
- [Building and Installing]

## Getting Started

Once you've installed Lite XL, it should work out-of-the-box.
Here are some tips and tricks to customize and improve your Lite XL
experience on various platforms.

## Plugins

Lite XL can be extended via plugins written in Lua or C.
In fact, plugins are a core part of Lite XL's approach to adding features
— features not strictly necessary for text editing should be added as plugins.

Here are a list of plugins that most users would want:

| Plugin               | Use case
| ------               | --------
| [align_carets]       | Align text on multiple carets and selections
| [autoinsert]         | Automatically insert closing brackets and quotes
| [autosave]           | Automatically saves the file when it is modified
| [bracketmatch]       | Highlight matching brackets
| [editorconfig]       | EditorConfig support for Lite XL
| [ephemeral_tabs]     | Ephemeral tabs (previewing files without creating multiple tabs)
| [gitdiff_highlight]  | Git diff gutter
| [indentguide]        | Indent guides
| [lint+]              | Linter support
| [litepresence]       | Discord rich presence
| [lsp]                | Language Server support for Lite XL
| [lspkind]            | Completion menu kind/type icons for Lite XL LSP
| [minimap]            | Minimap
| [selectionhighlight] | Highlight code that matches the selection
| [settings]           | Settings GUI for Lite XL (requires the [widget] plugin)
| [widgets]            | Widget toolkit for Lite XL. Needed for [lsp] and [settings].

## Portable application

Lite XL stores user configuration in the OS-specific configuration directory.
This directory is also known as `USERDIR`.

These paths are checked to determine `USERDIR`:

1. `<directory_to_lite-xl_binary>/user`
2. `$LITE_USERDIR`
3. `$XDG_CONFIG_HOME/lite-xl`
4. `$HOME/.config/lite-xl` or `$USERPROFILE/.config/lite-xl` on Windows

In order to create a portable installation of Lite XL,
you can create a `user` directory where the executable resides.
Lite XL will then store configuration data in that directory.

## Further reading

You may be interested on these topics:

- [Introduction] — A introduction to various Lite XL features and concepts.
- [Configuration] — A guide on how to configure Lite XL.
- [Plugins] — An introduction to plugin management.

These are advanced topics that are useful for power users or plugin developers:

- [Creating Syntaxes] — A guide on how to add support for new languages.
- [Creating Themes] — A tutorial on how to write themes for Lite XL.
- [Custom commands] — A guide on how to add custom functionalities to Lite XL.
- [Keyboard shortcuts] — A guide on how to manage keyboard shortcuts.
- [Simple plugin] — A tutorial on writing a simple plugin.
- [Classes and Objects] — An explaination on how Lite XL implements OOP in Lua.
- [Documents] — A guide on how to access and manipulate opened Documents.
- [Views] — A guide on how to create and manage user interfaces.
- [Regular expressions] — A guide on how to use regular expressions in Lite XL.
- [Child processes] — A guide on how to start and manage child processes.



[Install from Releases]:         ./install-from-releases.md
[Install from Package Managers]: ./install-from-package-managers.md
[Building and Installing]:       ./building.md
[align_carets]:                  https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/align_carets.lua?raw=1
[autoinsert]:                    https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/autoinsert.lua?raw=1
[autosave]:                      https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/autosave.lua?raw=1
[bracketmatch]:                  https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/bracketmatch.lua?raw=1
[editorconfig]:                  https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/editorconfig
[ephemeral_tabs]:                https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/ephemeral_tabs.lua?raw=1
[gitdiff_highlight]:             https://github.com/vincens2005/lite-xl-gitdiff-highlight
[indentguide]:                   https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/indentguide.lua?raw=1
[lint+]:                         https://github.com/liquid600pgm/lintplus
[litepresence]:                  https://github.com/TorchedSammy/Litepresence
[lsp]:                           https://github.com/lite-xl/lite-xl-lsp
[lspkind]:                       https://github.com/TorchedSammy/lite-xl-lspkind
[minimap]:                       https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/minimap.lua?raw=1
[selectionhighlight]:            https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/selectionhighlight.lua?raw=1
[settings]:                      https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/settings.lua?raw=1
[widgets]:                       https://github.com/lite-xl/lite-xl-widgets
[Introduction]:                  ../user-guide/introduction.md
[Configuration]:                 ../user-guide/configuration.md
[Plugins]:                       ../user-guide/plugins.md
[Creating Syntaxes]:             ../developer-guide/creating-syntaxes.md
[Creating Themes]:               ../developer-guide/creating-themes.md
[Custom commands]:               ../developer-guide/commands.md
[Keyboard shortcuts]:            ../developer-guide/managing-keyboard-shortcuts.md
[Classes and Objects]:           ../developer-guide/classes-and-objects.md
[Documents]:                     ../developer-guide/documents.md
[Views]:                         ../developer-guide/views.md
[Simple plugin]:                 ../developer-guide/simple-plugin.md
[Regular expressions]:           ../developer-guide/using-regular-expressions.md
[Child processes]:               ../developer-guide/child-processes.md
