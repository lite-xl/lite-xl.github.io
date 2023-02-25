---
description: Learn to manage plugins manually or via a plugin manager.
---

Lite XL implements many features as plugins.
By default, Lite XL bundles a few plugins to provide some features
editors would usually have.
There is also a `addons` package which comes with all plugins.

Extra plugins can be found at [the plugin repository][lite-xl/lite-xl-plugins].

!!! note
    These plugins are contributed by the community.

## Location

Plugins that come bundled with Lite XL is usually stored in
`DATADIR/plugins`.

On macOS, `DATADIR` is always the application resources directory.

On other platforms, Lite XL checks whether the program
is installed according to Unix Filesystem Hierarchy Standard.
If that is true,
then `DATADIR` will be `<path-to-exe>/../share/lite-xl`.

Otherwise, `DATADIR` will be `<path-to-exe>/data`.

User plugins should be installed into `USERDIR/plugins`.

## Plugin managers

Recently, we've standardized various aspects of the plugin
repository so that plugin managers can be built to install
and manage plugins.

Currently, there are two plugin managers made for Lite XL —
[lpm] and [Miq].

lpm is a plugin manager more akin to distro package managers
such as `apt` and `dnf`.
It also provides a GUI for installing plugins.
Miq is a declarative plugin manager that allows user to declare
plugins and install/update them all at once.

These two plugin managers use vastly different ways of
plugin management, so please consult the main page for
each plugin manager for exact instructions.

## Installing plugins

To install a plugin, simply drag the related plugin file into
`USERDIR/plugins`.

??? warning "For plugins that comes in a folder, please consult specific instructions for each plugin."
    Historically, Lite XL does not enforce a specific file structure
    for these types of plugins.
    Old plugins may not have a `init.lua` file, which is used by
    Lua to find a plugin.
    In this case, you need to follow their install instructions.

=== "lpm"

    To install a plugin with lpm, use `lpm plugin install`.
    For example, to install lsp, run:

    ```sh
    $ lpm plugin install lsp
    ```

    This will install/update the lsp plugin.

    To install themes or libraries, you can use
    `lpm color install` and `lpm library install` respectively.

=== "Miq"

    To install a plugin with Miq, you need to specify the list
    of plugins to install in `config.plugins.miq.plugins`.

    ```lua
    local config = require "core.config"
    config.plugins.miq.plugins = {
      -- this allows Miq to manage itself
      'TorchedSammy/Miq',

      -- install lsp
      'lite-xl/lite-xl-lsp',
    }
    ```

    Afterwards, you can run the command `miq:install` to install
    the plugins.

## Updating plugins

To update a plugin, you'll need to re-download them.
For plugins hosted as separate git repositories, you can simply
pull new updates.

If you have a plugin manager installed, updating plugins should
be easier.

=== "lpm"

    To update plugins with lpm, run `lpm upgrade`.

    ```
    $ lpm upgrade
    ```

    This will update all the plugins to their latest versions.

=== "Miq"

    To update plugins with Miq, run "miq:update".

## Uninstalling plugins

To remove a plugin, simply delete the associated file/directory.

=== "lpm"

    To uninstall a plugin, run `lpm plugin uninstall`.
    For instance, to uninstall lsp, run:

    ```sh
    $ lpm plugin uninstall lsp
    ```

    Uninstalling themes and libraries can be done with
    `lpm color uninstall` and `lpm library uninstall` respectively.

=== "Miq"

    **Uninstalling plugins in Miq is currently not supported.**


[lite-xl/lite-xl-plugins]: https://github.com/lite-xl/lite-xl-plugins
[lpm]:                     https://github.com/lite-xl/lite-xl-plugin-manager
[Miq]:                     https://github.com/TorchedSammy/Miq