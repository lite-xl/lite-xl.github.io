---
description: Learn how to write plugins for Lite XL.
---

# Writing Plugins

Lite XL allows users to load Lua files to add or modify functionalities of the editor.
In general, a plugin is a Lua file or a directory that contains an `init.lua` file
serving as the entrypoint.
Plugins can load other Lua files or native libraries that can be used to call system functions,
but are responsible for managing their own dependencies.

!!! tip
    [Plugin managers] provide dependency resolution capabilities for plugins,
    and automates the installation of native libraries on different platforms.
    If you aren't using a plugin manager, you should definitely consider using one.

## Overriding existing functionality

Lite XL heavily uses the idiom of overriding existing function that does a certain task.
For instance, to run something when the user saves a file, you can override `Doc:save()`
to add your own functionality before or after calling the original `Doc:save()` function.
This design makes plugin code generally easier to tinker with, but gets complex when the user
installs a bunch of plugins that doesn't interact with each other well.
This is a trade-off [lite] and Lite XL made for the sake of simplicity.

## Native libraries

Lite XL, since v2.1.0, supports loading shared libraries
(also known as dynamically-linked libraries on Windows) to provide functionalities
that are not available with Lite XL's own native bindings.
Lite XL uses [Lua's convention] for these libraries, but extends the convention to support
statically-linked Lua in Lite XL.

!!! warning
    Using native libraries in v2.1.0 is **not recommended**, as the native plugin API
    was missing several Lua symbols that will cause a crash when called.
    This behavior is fixed in v2.1.1.

## In this section

| Topic                 | Description
| -----                 | -----------
| [Classes and Objects] | Learn how Lite XL implements OOP in Lua.
| [Documents]           | Learn about how to operate on files opened in the editor.
| [Views]               | Learn about Views, one of the core concepts for building UIs.
| [Background Tasks]    | Learn how to use background tasks to perform long-running operations.
| [Debugging]           | Learn how to debug Lite XL with the debugger plugin, and other related tips.


[Plugin managers]:     ../../user-guide/managing-plugins.md#plugin-managers
[lite]:                https://github.com/rxi/lite
[Lua's convention]:    https://www.lua.org/manual/5.4/manual.html#pdf-package.searchers
[Classes and Objects]: ./classes-and-objects.md
[Documents]:           ./documents.md
[Views]:               ./views.md
[Background Tasks]:    ./background-tasks.md
[Debugging]:           ./debugging.md
