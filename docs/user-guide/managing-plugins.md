---
description: Learn to manage plugins manually or via a plugin manager.
---

Lite XL implements many features as plugins.
By default, Lite XL comes with a few built-in plugins for essential features such as [treeview]
and [workspace], while the [Addons package] provides more.
All plugins can be found at the [plugin repository][lite-xl/lite-xl-plugins].

!!! note
    These plugins are contributed by the community.
    Support is provided on a voluntary basis.

## Location

Plugins that come bundled with Lite XL are stored in `DATADIR/plugins`.
`DATADIR` is the directory where Lite XL's Lua code is stored.

On macOS, `DATADIR` is always the application resources directory.
On other platforms, Lite XL checks whether `lite-xl.exe` is inside a directory called `bin`.
If true, Lite XL will set `DATADIR` as `(path to lite-xl.exe)/../share/lite-xl`.
This is similar to how most programs are structured on Unix-based platforms.
Otherwise, Lite XL sets `DATADIR` as `(path to lite-xl.exe)/data`.

User plugins should be installed into `USERDIR/plugins`.
`USERDIR` is the directory where user configuration is stored.

## Plugin Managers

[lpm] is the de-facto plugin manager for Lite XL.
It is similar to `apt` and `dnf` which provides a command-line interface to manage plugins.
[Miq] is an alternative declarative plugin manager that allow users to declare a list of plugins
that should be loaded, and install / updates them all at once.
Both plugin managers operate on [manifest files] which contains plugin metadata and install instructions.

These two plugin managers use vastly different ways of plugin management, 
so please consult the documentation for each plugin manager for exact instructions.

## Installing plugins

=== "lpm"

    To install a plugin with lpm, use `lpm plugin install`.
    For example, to install lsp, run:

    ```sh
    $ lpm plugin install lsp
    ```

    This will install/update the lsp plugin.

    To install themes or libraries, you can use `lpm color install`
    and `lpm library install` respectively.

=== "Miq"

    To install a plugin with Miq, you need to specify the list of plugins to install
    in `config.plugins.miq.plugins`.

    ```lua
    local config = require "core.config"
    config.plugins.miq.plugins = {
      -- this allows Miq to manage itself
      'TorchedSammy/Miq',

      -- install lsp
      'lite-xl/lite-xl-lsp',
    }
    ```

    Afterwards, you can run the command `miq:install` to install the plugins.

=== "Manually"

    To install a plugin manually without using plugin managers such as lpm or Miq,
    you need to locate the `USERDIR` directory in your system.
    This directory is usually located in the following locations:
    
    - Linux / Unix-based systems: `~/.config/lite-xl`
    - Winodws: `C:/Users/<username>/.config/lite-xl`
    - macOS: `/Users/<username>/.config/lite-xl`

    Open `USERDIR` in a file manager / shell of your preference and navigate to the `plugins` folder.
    Copy the plugin file / directory into the `plugins` folder, and restart Lite XL.

    **Different plugins may have different installation instructions.**
    **You must consult the installation instructions for each plugin.**

## Updating plugins

=== "lpm"

    To update plugins with lpm, run `lpm upgrade`.

    ```
    $ lpm upgrade
    ```

    This will update all the plugins to their latest versions.

=== "Miq"

    To update plugins with Miq, run `miq:update` in Lite XL.

=== "Manually"

    To update a plugin manually, you can download the latest version
    and replace the files in the `USERDIR/plugins`.
    **Do not update plugins installed by lpm or Miq manually.**

## Uninstalling plugins

=== "lpm"

    To uninstall a plugin, run `lpm plugin uninstall`.
    For instance, to uninstall lsp, run:

    ```sh
    $ lpm plugin uninstall lsp
    ```

    Uninstalling themes and libraries can be done with `lpm color uninstall`
    and `lpm library uninstall` respectively.

=== "Miq"

    **Uninstalling plugins in Miq is currently not supported.**

=== "Manually"

    To uninstall a plugin manually, simply delete the corresponding file / directory
    from `USERDIR/plugins`. **Do not uninstall plugins managed by lpm manually**.

## Recommended plugins

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
| [search_ui]          | Provides a better UI for searching text, based on [widget].
| [selectionhighlight] | Highlight code that matches the selection
| [settings]           | Settings GUI for Lite XL (requires the [widget] plugin)
| [terminal]           | Integrated terminal in Lite XL.
| [widgets]            | Widget toolkit for Lite XL. Needed for [lsp] and [settings].

## Feature / Plugin Requests

If no plugins provide the features you wanted, you can request them in the [issue tracker].
Plugin developers occasionally browse the issue tracker for requests and implement them.

Alternatively, you can take the opportunity to implement the feature yourself,
based on our [documentation] and existing plugins.


[treeview]:                https://github.com/lite-xl/lite-xl/blob/master/data/plugins/treeview.lua
[workspace]:               https://github.com/lite-xl/lite-xl/blob/master/data/plugins/workspace.lua
[Addons package]:          ../setup/getting-started.md#base-and-addons-packages
[lite-xl/lite-xl-plugins]: https://github.com/lite-xl/lite-xl-plugins
[lpm]:                     https://github.com/lite-xl/lite-xl-plugin-manager
[Miq]:                     https://github.com/TorchedSammy/Miq
[manifest files]:          https://github.com/lite-xl/lite-xl-plugin-manager/blob/master/SPEC.md
[align_carets]:            https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/align_carets.lua?raw=1
[autoinsert]:              https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/autoinsert.lua?raw=1
[autosave]:                https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/autosave.lua?raw=1
[bracketmatch]:            https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/bracketmatch.lua?raw=1
[editorconfig]:            https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/editorconfig
[ephemeral_tabs]:          https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/ephemeral_tabs.lua?raw=1
[gitdiff_highlight]:       https://github.com/vincens2005/lite-xl-gitdiff-highlight
[indentguide]:             https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/indentguide.lua?raw=1
[lint+]:                   https://github.com/liquid600pgm/lintplus
[litepresence]:            https://github.com/TorchedSammy/Litepresence
[lsp]:                     https://github.com/lite-xl/lite-xl-lsp
[lspkind]:                 https://github.com/TorchedSammy/lite-xl-lspkind
[minimap]:                 https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/minimap.lua?raw=1
[search_ui]:               https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/search_ui.lua?raw=1
[selectionhighlight]:      https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/selectionhighlight.lua?raw=1
[settings]:                https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/settings.lua?raw=1
[terminal]:                https://github.com/adamharrison/lite-xl-terminal.git
[widgets]:                 https://github.com/lite-xl/lite-xl-widgets
[issue tracker]:           https://github.com/lite-xl/lite-xl-plugins/issues
[documentation]:           ../developer-guide/index.md
