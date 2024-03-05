---
description: Learn how to configure Language Servers to support Intellisense in Lite XL.
---

Many text editors support "Intellisense" (error reporting, smart autocompletion, formatting, linting)
out-of-the-box with a language server client.
[Language Server Protocol] is a protocol developed by Microsoft to facilitate creating tooling that 
are separate from editors — unlike in a traditional IDE where tooling is directly integrated into the editor.

Lite XL does not provide a language server client, but the functionality is available via the [LSP] plugin.
In this article, we will discuss how to properly set up language servers for use with the plugin.

## Installation

The LSP plugin can be installed like any other Lite XL plugins.

The LSP plugin depends on the [widget] and optionally [lint+] and [lsp_snippets] plugin for rendering UI elements.
When installing the plugin manually, you must also install these plugins as well.

=== "lpm"

    To install LPM via the command line, run:
    ```sh
    $ lpm plugin install lsp
    ```

=== "Miq"

    To install LSP via Miq, add `lite-xl/lite-xl-lsp` into your `config.plugins.miq.plugins`:

    ```lua
    local config = require "core.config"
    config.plugins.miq.plugins = {
    -- this allows Miq to manage itself
    'TorchedSammy/Miq',

    -- install lsp
    'lite-xl/lite-xl-lsp',
    }
    ```

    Afterwards, run the command `miq:install` to begin installation.

=== "Manual Installation"

    To install the LSP plugin manually, run these commands:

    ```sh
    $ cd ~/.config/lite-xl/
    $ git clone https://github.com/lite-xl/lite-xl-lsp plugins/lsp
    $ git clone https://github.com/lite-xl/lite-xl-widgets libraries/widget
    $ git clone https://github.com/liquidev/lintplus plugins/lintplus
    $ wget https://raw.githubusercontent.com/vqns/lite-xl-snippets/main/snippets.lua \
        -O plugins/snippets.lua
    $ wget https://raw.githubusercontent.com/vqns/lite-xl-snippets/main/lsp_snippets.lua \
        -O plugins/lsp_snippets.lua
    ```

    They install the plugin with all its dependencies.

## Installing Language Servers

The LSP plugin requires languages servers to be installed on the system to function.
Some editors such as [Visual Studio Code] and [Neovim] tends to have this process abstracted by plugins.
Luckily, Lite XL provides commonly-used language servers as plugins as well, prefixed with `lsp_`.

| Plugin            | Language(s)         | Server          | Platforms
| ------            | -----------         | ------          | ---------
| [lsp_c]           | C, C++, Objective-C | [clangd]        | Linux, macOS, Windows
| [lsp_lua]         | Lua                 | [LuaLS]         | Linux, macOS, Windows
| [lsp_python]      | Python              | [Pyright]       | Linux, macOS, Windows
| [lsp_quicklintjs] | JavaScript          | [quick-lint-js] | Linux, macOS, Windows
| [lsp_rust]        | Rust                | [rust-analyzer] | Linux, macOS, Windows
| [lsp_tex]         | TeX                 | [texlab]        | Linux, macOS, Windows
| [lsp_zig]         | Zig                 | [zls]           | Linux, macOS, Windows

### Manual Installation

The LSP plugin expects language servers to be accessible in `PATH`.
If you have installed the language server from package managers such as `npm` and `pip`,
please ensure that **their local installation directory is in `PATH`**.

!!! important
    Even more care needs to be given to those who uses a node.js version manager such as [nvm],
    as the npm prefix changes when switching node.js versions.
    You should always **launch Lite XL after sourcing nvm**
    (do this for any Lite XL's desktop entries as well).

## Set Up

!!! note "If you installed the language servers via plugins, then you should skip this step."

The LSP plugin provides default configuration for most language servers, based on [nvim-lspconfig].
These configurations are available by requiring `plugins.lsp.config` in your user module.
For example, to configure [typescript-language-server], you can do:

```lua
local lspconfig = require "plugins.lsp.config"

-- set up typescript-language-server with default configuration (enough for most people)
lspconfig.tsserver.setup()

-- override the default configuration
lspconfig.tsserver.setup {
    verbose = false
}
```

## Features

After configuring your language server, you should see a log message in the form of
`[LSP] starting (language server name)` followed by `[(language server name)] Initialized`
when opening a file supported by the language server.
These messages indicate that the language server is properly set up and is running for the document.

### Enhanced Autocomplete

One of the most prominent features of a language server is to provide autocomplete suggestions.
The LSP plugin integrates with the [autocomplete] plugin to provide this functionality.

![lsp-autocomplete]{ loading=lazy }

### Snippets

When installed with [lsp_snippets], the LSP plugin is able to provide snippets from language servers.
The snippets are also integrated with the [autocomplete] plugin.

![lsp-snippets]{ loading=lazy }

### Inline Diagnostics

When installed with [lint+], the LSP plugin will show diagnostics on the affected lines.
You can disable this with `lsp:toggle-diagnostics` (++shift+alt+e++).

![lsp-inline-diagnostics]{ loading=lazy }

### Symbol Search

To view all symbols in a file, you can use `lsp:view-document-symbols` (++alt+s++).
You can use `lsp:find-workspace-symbol` (++shift+alt+s++) to find a symbol in the current workspace.

![lsp-view-symbol]{ loading=lazy }
![lsp-search-symbol]{ loading=lazy }

### Tooltips

You can hover on symbols to check their types and descriptions.

![lsp-hover]{ loading=lazy }

Tooltips will also appear when entering function arguments.

![lsp-args]{ loading=lazy }

### Go to Definition

Press ++alt+d++ to jump to definition.

![lsp-goto-definition]{ loading=lazy }

### Find References

Press ++alt+f++ to find references to a symbol.

![lsp-find-references]{ loading=lazy }

### Document Formatting

Press ++alt+shift+f++ to format the current document.

![lsp-format]{ loading=lazy }

### Diagnostics

Press ++alt+e++ to view diagnostics messages for the current document.
Press ++ctrl+alt+e++ to view diagnostics messages for the workspace.

![lsp-view-doc-diagnostics]{ loading=lazy }
![lsp-view-all-diagnostics]{ loading=lazy }


[Language Server Protocol]:   https://microsoft.github.io/language-server-protocol/
[LSP]:                        https://github.com/lite-xl/lite-xl-lsp
[widget]:                     https://github.com/lite-xl/lite-xl-widgets
[lint+]:                      https://github.com/liquid600pgm/lintplus
[lsp_snippets]:               https://github.com/vqns/lite-xl-snippets
[Visual Studio Code]:         https://code.visualstudio.com/
[Neovim]:                     https://neovim.io/
[lsp_c]:                      https://github.com/adamharrison/lite-xl-lsp-servers/blob/master/plugins/lsp_c.lua?raw=1
[clangd]:                     https://clangd.llvm.org/
[lsp_lua]:                    https://github.com/adamharrison/lite-xl-lsp-servers/blob/master/plugins/lsp_lua.lua?raw=1
[LuaLS]:                      https://luals.github.io/
[lsp_python]:                 https://github.com/adamharrison/lite-xl-lsp-servers/blob/master/plugins/lsp_python.lua?raw=1
[Pyright]:                    https://github.com/Microsoft/pyright
[lsp_quicklintjs]:            https://github.com/adamharrison/lite-xl-lsp-servers/blob/master/plugins/lsp_quicklintjs.lua?raw=1
[quick-lint-js]:              https://quick-lint-js.com/
[lsp_rust]:                   https://github.com/adamharrison/lite-xl-lsp-servers/blob/master/plugins/lsp_rust.lua?raw=1
[rust-analyzer]:              https://github.com/rust-lang/rust-analyzer
[lsp_tex]:                    https://github.com/adamharrison/lite-xl-lsp-servers/blob/master/plugins/lsp_tex.lua?raw=1
[texlab]:                     https://github.com/latex-lsp/texlab
[lsp_zig]:                    https://github.com/adamharrison/lite-xl-lsp-servers/blob/master/plugins/lsp_zig.lua?raw=1
[zls]:                        https://install.zigtools.org/
[nvm]:                        https://github.com/nvm-sh/nvm
[nvim-lspconfig]:             https://github.com/neovim/nvim-lspconfig
[typescript-language-server]: https://github.com/typescript-language-server/typescript-language-server
[autocomplete]:               https://github.com/lite-xl/lite-xl/blob/master/data/plugins/autocomplete.lua
[lsp-autocomplete]:           ../assets/user-guide/lsp-autocomplete.png
[lsp-snippets]:               ../assets/user-guide/lsp-snippets.gif
[lsp-inline-diagnostics]:     ../assets/user-guide/lsp-inline-diagnostics.png
[lsp-hover]:                  ../assets/user-guide/lsp-hover.png
[lsp-args]:                   ../assets/user-guide/lsp-args.png
[lsp-view-symbol]:            ../assets/user-guide/lsp-view-symbol.gif
[lsp-search-symbol]:          ../assets/user-guide/lsp-search-symbol.gif
[lsp-goto-definition]:        ../assets/user-guide/lsp-goto-definitions.gif
[lsp-find-references]:        ../assets/user-guide/lsp-find-references.gif
[lsp-format]:                 ../assets/user-guide/lsp-format.gif
[lsp-view-doc-diagnostics]:   ../assets/user-guide/lsp-view-doc-diagnostics.gif
[lsp-view-all-diagnostics]:   ../assets/user-guide/lsp-view-all-diagnostics.gif
