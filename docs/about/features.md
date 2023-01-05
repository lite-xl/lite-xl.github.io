# Features

## Cross-Platform

We currently support Windows, Linux and macOS (with Retina display support).
However, Lite XL can be compiled and run on many platforms.
We have received reports of successful ports to Android, PS Vita, Haiku,
AmigaOS 4, MorphOS 3 and browsers via WASM.

## Lightweight

We are currently around 3 MB in size and takes about 10 MB in RAM.
No Electron / WebView involved.
The whole thing is just Lua running on a software renderer.

## Extensible

While the editor is minimal by default, it is very extensible via Lua scripting.
In fact, a lot of features are provided by plugins.
For example, [VSC-like intellisense][1], [Minimap][2] and [Git gutter][3].

## Better font rendering

The editor looks good in screen of any sizes.
Some other options are also configurable, such as hinting and anti-aliasing.

## Multi-cursor editing

You can now place multiple cursors by `ctrl` + `lclick` on lines
or `ctrl` + `shift` + `up` or `ctrl` + `shift` + `down`.

---

We also have a [list of features][4] that we aren't planning to add to the editor.
Some of these features are already achieved by plugins, but we are not shipping
them by default.


[1]: https://github.com/lite-xl/lite-xl-lsp
[2]: https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/minimap.lua?raw=1
[3]: https://github.com/vincens2005/lite-xl-gitdiff-highlight
[4]: /en/about/wontdo