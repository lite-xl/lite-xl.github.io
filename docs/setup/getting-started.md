---
description: Install Lite XL and configure it for your use.
---

# Getting Started

Setting up Lite XL is easy and takes about 2 MB of internet bandwidth.
Lite XL comes in `.zip` or `.tar.gz` packages depending on the platform.

Lite XL also ships packages with extra plugins, marked with `addons`.
These packages provide better out-of-the-box experience.

## Install

Installing Lite XL is usually as simple as downloading the package and extracting it.
However, here are some platform-specific installation instructions.

- [Windows]
- [Linux]
- [macOS]

## Portable application

Lite XL stores user configuration in the OS-specific configuration directory.
This directory is colloquially known as `USERDIR`.

The following sequence of paths are used as `USERDIR`.

1. `<directory_to_lite-xl_binary>/user`
2. `$LITE_USERDIR`
3. `$XDG_CONFIG_HOME/lite-xl`
4. `$HOME/.config/lite-xl` or `$USERPROFILE/.config/lite-xl` on Windows

As such, if the user wants to create a portable installation of Lite XL
that does not depend on OS-specific configuration directories,
they must create a `user` directory in the directory where `lite-xl` executable
resides.
This will cause Lite XL to write user configuration to the correct directory.

Alternatively, users can also set the `LITE_USERDIR` environment variable to
achieve the same thing.

## Plugins

Lite XL is made extensible via plugins.
In fact, most of Lite XL's features comes from plugins; the core is kept simple and
feature are added via plugins if possible.

Lite XL comes with a set of plugins and users can install more on their own.
Here are common plugins that most users install:


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


## Further reading

You may be interested on these topics:

- [Introduction] — A introduction to various Lite XL features and concepts.
- [Configuration] — A guide on how to configure Lite XL.
- [Plugins] — An introduction to plugin management.

These are advanced topics that are useful for power users or plugin developers:

- [Creating Themes] — A tutorial on how to write themes for Lite XL.
- [Creating Syntaxes] — A guide on how to add support for new languages.
- [Simple plugin] — A tutorial on writing a simple plugin.
- [Regular expressions] — A guide on how to use regular expressions in Lite XL.
- [Child processes] — A guide on how to start and manage child processes.



[Windows]:              windows.md
[Linux]:                linux.md
[macOS]:                macos.md
[align_carets]:         https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/align_carets.lua?raw=1
[autoinsert]:           https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/autoinsert.lua?raw=1
[autosave]:             https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/autosave.lua?raw=1
[bracketmatch]:         https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/bracketmatch.lua?raw=1
[editorconfig]:         https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/editorconfig
[ephemeral_tabs]:       https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/ephemeral_tabs.lua?raw=1
[gitdiff_highlight]:    https://github.com/vincens2005/lite-xl-gitdiff-highlight
[indentguide]:          https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/indentguide.lua?raw=1
[lint+]:                https://github.com/liquid600pgm/lintplus
[litepresence]:         https://github.com/TorchedSammy/Litepresence
[lsp]:                  https://github.com/lite-xl/lite-xl-lsp
[lspkind]:              https://github.com/TorchedSammy/lite-xl-lspkind
[minimap]:              https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/minimap.lua?raw=1
[selectionhighlight]:   https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/selectionhighlight.lua?raw=1
[settings]:             https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/settings.lua?raw=1
[widgets]:              https://github.com/lite-xl/lite-xl-widgets
[Introduction]:         ../../user-guide/introduction
[Configuration]:        ../../user-guide/configuration
[Plugins]:              ../../user-guide/plugins
[Creating Themes]:      ../developer-guide/creating-themes
[Creating Syntaxes]:    ../developer-guide/creating-syntaxes
[Simple plugin]:        ../developer-guide/simple-plugin
[Regular expressions]:  ../developer-guide/regular-expressions
[Child processes]:      ../developer-guide/child-processes