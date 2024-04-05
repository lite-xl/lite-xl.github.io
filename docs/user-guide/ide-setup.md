---
description: Learn how to set up Lite XL as an integrated development environment.
---

# Setup Lite XL as an IDE

Lite XL can be configured to be a proper IDE for most programming languages.
The following is a brief overview of the plugins that, when used together,
provide the experience of a minimal and modern IDE.

## Bells and Whistles

The following plugins are meant to enrich Lite XL with handy features that improve the coding experience:

- `autoinsert` and `lfautoinsert` add automatic bracket/quote insertion and text-wrapping.
- `autosave` allows automatic file saving after every change.
- `bracketmatch` underlines brackets matching pairs under the caret.
- `colorpreview` underlays color values (e.g. `#ff00ff` or `rgb(255, 0, 255)`) with their respective color.
- `indentguide` adds indent guides to make it easier to see function boundaries.
- `rainbowparen` applies rainbow colors to nesting parentheses to make it easier to distinguish them.
- `scalestatus` displays current scale (zoom) in the status view (it depends on the `scale` plugin).
- `selectionhighlight` highlights regions of code that match the current selection, 
  to preview for search/replace actions.
- `sticky_scroll` keeps track of the current scope at the top of the view.
- `minimap` adds VSCode's minimap.
- `devicons` provides fancy icons in the project treeview for many file types.
- `meta_colors` installs all available theme files.

## Syntax Highlighting

`meta_languages` installs all supported syntax-highlighting plugins.

## Intellisense

`lsp` is a plugin that provides support for Intellisense (code completion, goto-definition, 
document symbols, function signatures and so on) through the LSP protocol,
while `lintplus` provides support for info/warning/error diagnostics.

There is also `lsp_snippets`, which adds snippets support from `lsp` to the `snippets` plugin.

`lsp` can be configured manually by following the [official guide][3], or it can interface with 
the `lite-xl-lsp-servers` repository that allows the installation of bundled LSP servers, which don't 
require manual configuration.

An example of installing bundled LSP servers is `lpm install lsp_rust` which installs the binary 
files required to run `rust-analyzer`.

## Code Snippets

`snippets` adds support for code snippets.

Snippets can easily be added by following the [official guide][5].

## Code Formatters

`formatter` provides file-specific formatting for several programming languages.

## Integrated Terminal

`terminal` provides an integrated terminal.

## Version Control

`scm` provides source code control integration to Lite XL.

`gitblame` can be added to show git commit information of the line where the cursor rests.

## TODO Treeview

`todotreeview` is a plugin that adds a custom treeview with the goal of keeping tracks of 
flagged comments (TODO, WIP, FIX, ...) for better workflow organization.

More flags can be added in the `init.lua` following the [official guide][4].

## Build Integration

`build` provides a build system, messages window, and easily clickable errors.

At the moment it only supports `make`, but it can be extended to any build system.

## Debug Integration

`debugger` provides debugger integration, with pluggable backends.

At the moment it only supports `gdb`.

## Automatic Setup

The following examples are configurations and scripts that bundle together the essential components 
of a minimal IDE:

- [Adam's configuration][1] contains the `build` and `debugger` plugins,
as well as several IDE meta-packages (e.g. `ide_c`, `ide_java`, `ide_python`) that add IDE-like
functionalities to Lite XL for many popular programming languages.
- [PerilousBooklet's configuration][2] contains documentation about IDE support progress
status for Lite XL.


[1]: https://github.com/adamharrison/lite-xl-ide
[2]: https://github.com/PerilousBooklet/lite-xl-ide
[3]: https://github.com/lite-xl/lite-xl-lsp?tab=readme-ov-file#setting-a-lsp-server
[4]: https://github.com/drmargarido/TodoTreeView?tab=readme-ov-file#instructions
[5]: https://github.com/vqns/lite-xl-snippets?tab=readme-ov-file#usage
