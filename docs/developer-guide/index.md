---
description: An introduction about Lite XL's concepts and how they tie in to plugin development.
---

# Developer Guide

Lite XL has little functionalities without plugins — anything that can be implemented as plugins can
and _will_ be implemented as one.

Lite XL is mostly written in Lua 5.4.
If you want to write plugins, you need to know how to write Lua.
There are various resources such as the [Lua 5.4 Reference Manual][1], [Programming in Lua][2],
[Learn Lua in 15 Minutes][3], [Lua Tutorial at TutorialsPoint][4] and [Lua Tutorial at lua-users.org][5].

You will also need general programming knowledge and some experience with object-oriented programming.

!!! note "Some of these tutorials target older versions of Lua and may be less relevant."
    The latest version of Lite XL uses Lua 5.4.6, while older versions uses Lua 5.2
    and LuaJIT.
    These versions have breaking changes that has to be accounted when following the tutorials.

## Overview

Lite XL is a fork of [lite][6].
As such, a lot of concepts used in lite is inherited in Lite XL.
[Lite: An Implementation Overview][7] is an excellent article that explains many concepts about lite.

## Types of plugins

There are a few types of plugins.
Syntaxes and colors are considered as subset of plugins.
These subsets of plugins only interact with the syntax highlighter and the `style` table respectively.

## Interactive debugging

Other than using GDB to debug the C part of Lite XL, you can also debug the Lua part with [lite-debugger][8].
Follow [this guide][9] to learn how it works.


[1]: https://www.lua.org/manual/5.4/
[2]: https://www.lua.org/pil/
[3]: https://tylerneylon.com/a/learn-lua/
[4]: http://www.tutorialspoint.com/lua/lua_overview.htm
[5]: http://lua-users.org/wiki/LuaTutorial
[6]: https://github.com/rxi/lite
[7]: https://rxi.github.io/lite_an_implementation_overview.html
[8]: https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/lite-debugger.lua?raw=1
[9]: ./writing-plugins/debugging.md
