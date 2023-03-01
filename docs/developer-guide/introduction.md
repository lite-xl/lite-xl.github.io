---
description: An introduction about Lite XL's concepts
              and how they tie in to plugin development.
---

Lite XL has little functionalities without plugins —
anything that can be implemented as plugins can and _will_ be implemented as one.

Lite XL is mostly written in Lua 5.4.
If you want to write plugins, you need to know how to write Lua.
There are various resources such as the [Lua 5.4 Reference Manual][1],
[Programming in Lua][2], [Learn Lua in 15 Minutes][3],
[Lua Tutorial at TutorialsPoint][4] and [Lua Tutorial at lua-users.org][5].

You will also need general programming knowledge and some experience with
object-oriented programming.

!!! note "Some of these tutorials target older versions of Lua and may be less relevant."

## Overview

Lite XL is a fork of [lite][6].
As such, a lot of concepts used in lite is inherited in Lite XL.
[Lite: An Implementation Overview][7] is an excellent article that explains
many concepts about lite.

## Types of plugins

There are a few types of plugins.
Syntaxes and colors are considered as subset of plugins.
These subsets of plugins only interact with the syntax highlighter
and the `style` table respectively.

## More resources

Here are more resources on how to create syntaxes, themes
and other plugins for Lite XL.

**Syntaxes and Themes**:

- [Creating Syntaxes] — Learn how to create syntaxes
                        for highlighting various types of files.
- [Creating Themes]   — Learn to create themes for Lite XL.

**Others**:

- [Simple Plugin]               — Learn to write a simple plugin that draws text
                                  in the top right corner of the editor window.
- [Commands]                    — Learn how to create and call commands programmatically.
- [Managing Keyboard Shortcuts] — Learn how to manage keyboard shortcuts.
- [Classes and Objects]         — Learn how to extend Lite XL with
                                  classes and objects.
- [Using Regular Expressions]   — Learn how to use
                                  regular expressions in Lite XL.
- [Interacting with the OS]     — Learn how to interact with the OS, such
                                  as reading and writing to the clipboard,
                                  setting window properties and getting
                                  high-resolution time.
- [Child Processes]             — Learn how to use the Process API
                                  to start and manage child processes.

## Tips and tricks

Here are some tips for plugin developers.

### Interactive debugging

Other than using GDB to debug the C part of Lite XL,
you can also debug the Lua part with [lite-debugger][8].
To use the debugger, install it as a plugin and call
`command.perform "debugger:break"` to stop the VM and
start debugging interactively.

### Differing stack traces when a critical error occur

When a critical error occur, the stack trace printed in the terminal
may be incomplete.
To get the complete stack trace, consult `error.txt`
in the executable directory or `USERDIR`.

### `print()` function does not work in Windows

On Windows, we compile Lite XL using the GUI subsystem by default.
This causes Lite XL to close the stdout.
To work around this behavior, you can force Lite XL to keep
stdout open by redirecting its output in a terminal.

On PowerShell:

```powershell
./lite-xl | tee -variable null
```

On `cmd.exe`:

```batch
./lite-xl > NUL
```


[1]: https://www.lua.org/manual/5.4/
[2]: https://www.lua.org/pil/
[3]: https://tylerneylon.com/a/learn-lua/
[4]: http://www.tutorialspoint.com/lua/lua_overview.htm
[5]: http://lua-users.org/wiki/LuaTutorial
[6]: https://github.com/rxi/lite
[7]: https://rxi.github.io/lite_an_implementation_overview.html
[8]: https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/lite-debugger.lua?raw=1
[Creating Syntaxes]:           creating-syntaxes.md
[Creating Themes]:             creating-themes.md
[Simple Plugin]:               simple-plugin.md
[Commands]:                    commands.md
[Managing Keyboard Shortcuts]: managing-keyboard-shortcuts.md
[Classes and Objects]:         classes-and-objects.md
[Using Regular Expressions]:   using-regular-expressions.md
[Interacting with the OS]:     interacting-with-the-os.md
[Child Processes]:             child-processes.md