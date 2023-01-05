# Won't Dos

## Hardware accelerated rendering

> **tl;dr - franko stated that he isn't considering using OpenGL
due to the skills and work involved.**

Hardware acceleration was brought up in this [discussion][1].
Takase had made 2 attempts at this - at first using [NanoVG][2]
and then forcing SDL to use GPU rendering.
The NanoVG port does not offer features considered important to Lite XL - sub-pixel
font rendering while forcing SDL to use GPU rendering does not work as the
UI is rendered on CPU and then copied to the GPU.
Right now, we decided to focus on optimizing the software renderer
and various part of Lua code.

For those who want to give this a shot, the GPU renderer should at least support
sub-pixel rendering and blending. This might be possible with SDL2 Renderer API,
but it has not been investigated thoroughly. Other considerations may include
driver blacklisting as well since GPU rendering is significantly slower on
certain platforms with certain drivers.

## System fonts

This is painful because various systems has their own mechanism of managing fonts.
For now, users can use the [fontconfig plugin][3].
Fontconfig is widely available on Linux and [installable on macOS][4],
while [Windows builds][5] are available.
In the future, we might consider adding API to read font metadata,
allowing us to write a fontconfig alternative in Lua. (no promises here)

## Opening UNC paths on Windows (network drives, accessing WSL2 files from Windows)

Our path handling code can only handle POSIX and Windows paths.
We also aren't sure how Lite XL will behave in these scenarios.

## Inter-window communication (dragging tabs between windows and other magic)

This is by far the hardest to achieve.
Lite XL has no intention to link to any widget toolkits
(Qt and GTK) which are required for these features.
An alternative approach is to create our own IPC mechanism, 
but that's [reinventing][6] [the][7] [wheel][8].

There is a working [ipc][9] plugin that uses the file system, but it is
modular and support for D-Bus or alternatives can be added.

## Integrated terminal

A terminal is complex to implement.
It is a state machine with many states and unofficial extensions that are
difficult to support properly.
Currently, [lite-xl-tmt][10] and [lite-xl-terminal][11] provides an integrated
terminal in Lite XL, but we will not provide an implementation built into the
editor.


[1]:  https://github.com/lite-xl/lite-xl/discussions/450
[2]:  https://github.com/inniyah/nanovg
[3]:  https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/fontconfig.lua
[4]:  https://formulae.brew.sh/formula/fontconfig
[5]:  https://github.com/takase1121/mingw-w64-fontconfig
[6]:  https://en.wikipedia.org/wiki/D-Bus
[7]:  https://en.wikipedia.org/wiki/Inter-Client_Communication_Conventions_Manual
[8]:  https://github.com/swaywm/wlroots
[9]:  https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/ipc.lua?raw=1
[10]: https://github.com/ColonelPhantom/lite-xl-tmt
[11]: https://github.com/benjcollins/lite-xl-terminal