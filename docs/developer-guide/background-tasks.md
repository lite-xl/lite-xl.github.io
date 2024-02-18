---
description: Learn how to use background tasks
                to perform long-running operations.
---

Lite XL performs a few long-running tasks in the background,
such as syntax highlighting, project search and filesystem monitoring.
Lite XL implements background tasks with Lua coroutines,
ensuring that the program runs on a single thread.

To schedule a background task for execution, you can use `core.add_thread()`.
This function accepts a coroutine function, a weak reference to an object, and
other arguments to pass to the coroutine function.

The coroutine function takes any arguments passed into `core.add_thread()`
and should call `coroutine.yield()` with the timeout in seconds.
If the timeout is 0, the coroutine will be resumed as soon as possible.

```lua
local core = require "core"

-- Schedule a function for execution later
core.add_thread(function()
    print("Hello world!")
end)

-- Schedule a function to run until the weak reference is destroyed
-- This is used by the syntax highlighter to run the highlighter
-- until the underlying Doc is destroyed/closed.
core.add_thread(function()
    while true do
        coroutine.yield(1)
        print("Doc is still open!")
    end
end, doc)
```

## Example: Managing a child process

This example uses a background task to manage a long-running child process.
The background task reads from the child process and prints it to stdout
after the process exits.

```lua
local core = require "core"

core.add_thread(function()
    local proc = assert(process.start({ "cat", "/dev/urandom" }, { stdin = process.REDIRECT_PIPE }))
    
    local buffer = {}
    while true do
        local current_buffer = proc:read()
        if not current_buffer then break end

        table.insert(buffer, current_buffer)
        coroutine.yield(0)
    end

    print(table.concat(buffer))
end)
```

## Example: Defer execution of certain functions

This example shows a lesser-known use case for `core.add_thread()` —
deferring execution until Lite XL is fully loaded.
Coroutines scheduled with `core.add_thread()` will run after the UI and plugins
are loaded, so it could be used to run commands added by plugins.

```lua
local core = require "core"
local command = require "core.command"
local config = require "core.config"

core.add_thread(function()
    -- At this points, plugins are not loaded yet.
    -- We need to defer the execution after the editor is loaded.
    command:perform "my-plugin:show"
end)
```

!!! note "Background tasks will not execute when Lite XL is unfocused."
    To work around this, set `core.redraw` to true before yielding `0`.
    This will force Lite XL to constantly redraw (which increases CPU usage),
    but will make background tasks run correctly.
