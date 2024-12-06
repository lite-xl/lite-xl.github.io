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

## In this section

| Topics                      | Descrption
| ------                      | ----------
| [Syntaxes and Themes][8]    | Learn how Lite XL loads syntax definitions and themes.
| [Commands and Shortcuts][9] | Learn how Lite XL perform tasks with commands and keyboard shortcuts.
| [Writing Plugins][10]       | Learn how to write plugins for Lite XL.
| [Using Libraries][11]       | Learn how to use library functions in Lite XL.
| [Samples][12]               | View samples of plugins built for Lite XL.
| [Advanced Topics][13]       | Learn about the internals that power Lite XL.


[1]:  https://www.lua.org/manual/5.4/
[2]:  https://www.lua.org/pil/
[3]:  https://tylerneylon.com/a/learn-lua/
[4]:  http://www.tutorialspoint.com/lua/lua_overview.htm
[5]:  http://lua-users.org/wiki/LuaTutorial
[6]:  https://github.com/rxi/lite
[7]:  https://rxi.github.io/lite_an_implementation_overview.html
[8]:  ./syntaxes-and-themes/index.md
[9]:  ./commands-and-shortcuts/index.md
[10]: ./writing-plugins/index.md
[11]: ./using-libraries/index.md
[12]: ./samples/index.md
[13]: ./advanced-topics/index.md
