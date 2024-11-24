---
description: Check if your favorite language is supported.
---

# Lite XL IDE Progress Status

WIP: intro

## Development boards

- [Intellisense](https://github.com/users/PerilousBooklet/projects/6/views/1)
- [Utilities](https://github.com/users/PerilousBooklet/projects/7/views/1)
- [Build Integration](https://github.com/users/PerilousBooklet/projects/8/views/1)
- [Debug Integration](https://github.com/users/PerilousBooklet/projects/9/views/1)
- [Profiling Integration](https://github.com/users/PerilousBooklet/projects/10/views/1)

## Features

- Syntax highlighting for 100+ languages
- Intellisense support for 25+ languages (more in the future)
- Language-specific treeview icons
- VSCode-like minimap
- Project-wide text and filename search
- Multi-cursor editing
- Single/multi-line commenting with shortcuts
- Go-to-line-n command
- TODO treeview
- Tooltips
- Integrated terminal
- Git integration
- Build integration
- Debug integration

### WIP
- Foldable code blocks
- Horizontal scrolling for project treeview
- Ligatures support
- Github Copilot integration
- Custom Canvas API to allow an external renderer to draw on a surface that Lite XL will render on screen
- Proper markdown rendering support
- Project template manager
- Project-wide refactoring
- External libraries item in project treeview

### TODO
- Document symbols treeview
- Simultaneous tag rename for all languages that require it

## Languages

| Language | Syntax High. | LSP support | Linting | Snippets | Formatter | Builder | Debugger |
|------------------|:--------------:|:-------------:|:---------:|:----------:|:----------:|:-----------:|:---------:|
| Arduino | :check_mark: |  |  |  |  |  |  |
| Bash | :check_mark: | :check_mark: | :check_mark: \*\* | :check_mark: | :check_mark: |  |  |
| C# | :check_mark: | :check_mark: | :check_mark: | :check_mark: |  |  |  |
| C/C++ | :check_mark: | :check_mark: | :check_mark: | :check_mark: | :check_mark: | :check_mark: |:check_mark:|
| Clojure | :check_mark: | :check_mark: | :check_mark: |  | :check_mark: |  |  |
| Cobol |  |  |  |  |  |  |  |
| Crystal | :check_mark: | :check_mark: \* |  |  | :check_mark: |  |  |
| CSS | :check_mark: | :check_mark: |  | :check_mark: | :check_mark: |  |  |
| D | :check_mark: | :check_mark: | :check_mark: |  | :check_mark: |  |  |
| Dart | :check_mark: | :check_mark: | :check_mark: |  | :check_mark: |  |  |
| Elixir | :check_mark: | :check_mark: |  | :check_mark: | :check_mark: |  |  |
| Elm | :check_mark: | :check_mark: | :check_mark: |  | :check_mark: |  |  |
| Erlang | [WIP](https://github.com/lite-xl/lite-xl-plugins/pull/424) | :check_mark: | :check_mark: \* | :check_mark: |  |  |  |
| F# | [WIP](https://github.com/lite-xl/lite-xl-plugins/pull/423) |  |  |  |  |  |  |
| Fortran | :check_mark: | :check_mark: |  |  |  |  |  |
| GDScript | :check_mark: |  |  |  | :check_mark: |  |  |
| Go | :check_mark: | :check_mark: |  | :check_mark: | :check_mark: |  |  |
| Groovy | :check_mark: | :check_mark: \* | :check_mark: |  | [WIP]() |  |  |
| Haskell | :check_mark: | :check_mark: |  | :check_mark: | :check_mark: |  |  |
| HTML | :check_mark: | :check_mark: |  | :check_mark: | :check_mark: |  |  |
| Java | :check_mark: | :check_mark: | :check_mark: | :check_mark: | :check_mark: |  |  |
| Javascript | :check_mark: | :check_mark: | :check_mark: | :check_mark: | :check_mark: |  |  |
| JSON | :check_mark: | :check_mark: | :check_mark: |/|  |  |  |
| Julia | :check_mark: | :check_mark: \* |  | :check_mark: | :check_mark: |  |  |
| Kotlin | :check_mark: | :check_mark: | :check_mark: | :check_mark: |  |  |  |
| Lisp |  |  |  |  |  |  |  |
| Lua | :check_mark: | :check_mark: | :check_mark: \*\* | :check_mark: | :check_mark: |  |  |
| Nim | :check_mark: | :check_mark: \* | :check_mark: \* |  |  |  |  |
| Nix | :check_mark: |  |  | :check_mark: |  |  |  |
| Ocaml | [WIP](https://github.com/lite-xl/lite-xl-plugins/pull/429) |  |  | :check_mark: | :check_mark: |  |  |
| Odin | :check_mark: | :check_mark: | :check_mark: |  |  |  |  |
| OpenSCAD | :check_mark: |  |  |  |  |  |  |
| Perl | :check_mark: | :check_mark: |  | :check_mark: |  |  |  |
| PHP | :check_mark: | :check_mark: | :check_mark: \*\* | :check_mark: |  |  |  |
| Python | :check_mark: | :check_mark: | :check_mark: | :check_mark: | :check_mark: |  |  |
| R | :check_mark: | :check_mark: | :check_mark: | :check_mark: |  |  |  |
| Ruby | :check_mark: | :check_mark: |  | :check_mark: | :check_mark: |  |  |
| Rust | :check_mark: | :check_mark: | :check_mark: | :check_mark: | :check_mark: |  |  |
| Scala | :check_mark: | :check_mark: | :check_mark: | :check_mark: |  |  |  |
| SQL | :check_mark: | :check_mark: | :check_mark: | :check_mark: | :check_mark: |  |  |
| System Verilog |  |  |  |  |  |  |  |
| TeX | :check_mark: | :check_mark: | :check_mark: | :check_mark: |  |  |  |
| TOML | :check_mark: | :check_mark: | :check_mark: | / | :check_mark: |  |  |
| Typescript | :check_mark: | :check_mark: |  |  |  |  |  |
| Typst | :check_mark: | :check_mark: \* | :check_mark: |  |  |  |  |
| V | :check_mark: | :check_mark: |  |  | :check_mark: |  |  |
| Vala | [WIP](https://github.com/lite-xl/lite-xl-plugins/pull/432) | :check_mark: \* | :check_mark: |  |  |  |  |
| Zig | :check_mark: | :check_mark: | :check_mark: \*\* |  | :check_mark: |  |  |
| XML | :check_mark: | :check_mark: | :check_mark: | / |  |  |  |
| YAML | :check_mark: | :check_mark: | :check_mark: | / | :check_mark: |  |  |

`*`: partially working

`**`: external linter

## Bundles

| Language         | LSP Bundle | LSP Bundle Package | IDE Package |
|------------------|:--------------:|:-------------:|:-------------:|
| Arduino |  |  |  |
| Bash |  |  |  |
| C# |  |  |  |
| C/C++ | :check_mark: | `lsp_c` | `ide_c` |
| Clojure |   |  |  |
| Crystal |  |  |  |
| CSS |  |  |  |
| Dart |  |  |  |
| Elixir |  |  |  |
| ELM |  |  |  |
| Erlang |  |  |  |
| Go |  |  |  |
| Groovy |  |  |  |
| Haskell |  |  |  |
| HTML |  |  |  |
| Java | :check_mark: | `lsp_java` | `ide_java` |
| Javascript | :check_mark: | `lsp_typescript` | `ide_javascript` |
| JSON | :check_mark: | `lsp_json` |  |
| Julia |  |  |  |
| Kotlin |  |  |  |
| Lisp |  |  |  |
| Lua | :check_mark: | `lsp_lua` | `ide_lua` |
| Nim |  |  |  |
| Nix |  |  |  |
| Ocaml |  |  |  |
| Odin |  |  |  |
| OpenSCAD |  |  |  |
| Perl |  |  |  |
| PHP |  |  |  |
| Python | :check_mark: | `lsp_python` | `ide_python` |
| R |  |  |  |
| Ruby |  |  |  |
| Rust | :check_mark: | `lsp_rust` | `ide_rust` |
| Scala |  |  |  |
| SQL |  |  |  |
| TeX | :check_mark: | `lsp_tex` | `ide_tex` |
| Typescript | :check_mark: | `lsp_typescript` |  |
| Typst |  |  |  |
| XML |  |  |  |
| YAML | :check_mark: | `lsp_yaml` |  |
| Zig | :check_mark: | `lsp_zig` | `ide_zig` |

