# Features

Currently, Lite XL offers a lot of features out of the box.

## Cross-Platform
We currently support Windows, Linux and MacOS (with Retina display support).

## Lightweight
We are currently around 3MB in size and takes about 10MB in RAM (can be lower). No Electron / WebView involved. The whole thing is just Lua running on a rendering engine.

## Extensible
While the editor is minimal by default, it is very extensible using Lua. In fact, a lot of features are provided by plugins. For example, [VSC-like intellisense](https://github.com/jgmdev/lite-xl-lsp)

## Better font rendering
The editor looks good in screen of any sizes. Some other options are also configurable, such as hinting and antialiasing.

## Multi-cursor editing
You can now place multiple cursors by `ctrl` + `lclick` on lines or `ctrl` + `shift` + `up` or `ctrl` + `shift` + `down`.


---


Here are some features that aren't implemented with the rationales behind it.
Some of these may be implemented via plugins.
We encourage you to give it a shot.

## Hardware accelerated rendering
**tl;dr -  franko stated that he isn't considering using OpenGL due to the skills and work involved.**

Hardware acceleration was brought up in this [discussion](https://github.com/lite-xl/lite-xl/discussions/450).
Takase had made 2 attempts at this - at first using [NanoVG](https://github.com/inniyah/nanovg) and then forcing SDL to use GPU rendering.
In both attempts, the performance gains at best is negligible, while at worst its completely unusable.
Right now, we decided to focus on optimizing the software renderer and various part of Lua code.

## System fonts
This is painful because various systems has their own mechanism of managing fonts.
For now, users can use the [fontconfig plugin](https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/fontconfig.lua).
Fontconfig is widely available on Linux and [installable on MacOS](https://formulae.brew.sh/formula/fontconfig), while [Windows builds](https://github.com/takase1121/mingw-w64-fontconfig) are available.
In the future, we might consider adding API to read font metadata, allowing us to write a fontconfig alternative in Lua. (no promises here)

## Opening UNC paths on Windows (network drives, accessing WSL2 files from Windows)
Our path handling code can only handle POSIX and Windows paths.
We also aren't sure how Lite XL will behave in these scenarios.

## Inter-window communication (dragging tabs between windows and other magic)
This is by far the hardest to achieve.
Lite XL has no intention to link to any widget toolkits (Qt and GTK) which are required for these features.
An alternative approach is to create our own IPC mechanism, but that's [reinventing](https://en.wikipedia.org/wiki/D-Bus) [the](https://en.wikipedia.org/wiki/Inter-Client_Communication_Conventions_Manual) [wheel](https://github.com/swaywm/wlroots).

## Integrated terminal
A terminal is complex to implement.
There are projects that _can_ be ported to Lua, such as [xterm.js](https://xtermjs.org/).
If someone is interested, they can do so.
