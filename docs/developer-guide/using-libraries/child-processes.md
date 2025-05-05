---
description: Learn how to use the Process API to start and manage child processes in Lite XL.
---

Lite XL provides a process API to launch external applications.
This API is meant to replace Lua's `io.popen`, `system.exec()` and lite's [pipe-to-a-file][1] approach.

Advantages of this API includes:

- Proper argument escaping (arguments are supplied via a table)
- Non-blocking IO
- Able to detach processes from Lite XL
- Does not create temporary files
- Mostly cross-platform (does not require special code for each shell)
- Does not create a console window on Windows

Unless you plan to run a command and forget about it, you should stick
with the Process API as it provides more features.

## Example: reading a file with `cat`

This example uses `cat` to read a file. This approach is impractical, but it demonstrates the typical usage
of the Process API.

```lua
local core = require "core"

local filename = "myfile.lua"
local proc = process.start { "cat", filename }

-- we use core.add_thread so that we don't softlock the editor
-- while reading the output of the child process.
core.add_thread(function()
  local readbuf = {}
  while true do
    -- yield so that the rest of the editor can carry out its tasks
    -- eg. accepting input, updating the UI
    coroutine.yield(1)

    -- try to read from the standard output of the process.
    local read = proc:read_stdout()
    -- read == nil is a pretty good indication that the pipe is closed
    -- therefore, no more data can be read.
    if read == nil then break end
    if read ~= "" then
      -- if we read something, append it into the table
      readbuf[#readbuf+1] = read
    end
    -- efficiently concatenate all the output into a string
    local process_output = table.concat(readbuf)
    -- note: never use core.log(process_output)!
    -- core.log() accepts the same parameters as string.format(),
    -- so you risk injecting invalid format strings!
    core.log("read: %s", process_output)
  end
end)
```

## Terms

To prevent confusion, these terms are used to describe various things:

| Terms           | Meaning
| -----           | -------
| Child process   | A process created with Process API via `process.start()`
| Parent process  | The parent process that owns the child. This usually refers to Lite XL.
| Process         | Any process (including child and parent processes).
| Stream          | An entity used to transfer data between child and parent processes. Think of it as a queue that can only be enqueued and dequeued.
| Standard input  | The standard input of most processes, also known as stdin.
| Standard error  | The standard error of most processes, also known as stderr.
| Standard output | The standard output of most processes, also known as stdout.

## Using the Process API

To create a child process, use `process.start()`.

```lua
local type RedirectType = number

local record ProcessOptions
  timeout: number,
  cwd: string,
  stdin: RedirectType,
  stdout: RedirectType,
  stderr: RedirectType,
  env: {string: string}
end

function process.start(program_args: {string} | string,
                        options: ProcessOptions): Process
end
```

The first argument of the function is a table containing the program name and its arguments.
The program name and its arguments need not be escaped as the API does it when necessary.

Since v2.1.0, users can provide a string instead of a table as the first argument to prevent the function
from escaping them.
This may help with legacy software on Windows such as `cmd.exe`.
However, this should not be done on POSIX platforms as the entire string will be treated as the program name
and cause issues.

!!! note
    Before v2.1.0, this table is not escaped on Windows.

The second argument specifies options to control process creation.

`timeout` is an advisory value that will be used by `process:wait()` and is optional.

`cwd` is the current working directory of the program.
If specified, the child process would run as if it was started in the directory.

`stdin`, `stdout` and `stderr` tells Lite XL how to treat standard input and output of the child process.
There are four possible values:

- `process.REDIRECT_DEFAULT` is the default behavior. It will be deprecated
  in future versions as specifying `nil` is preferred.
- `process.REDIRECT_PIPE` allows the Process API to write/read the input/output of the child process.
- `process.REDIRECT_PARENT` redirects the child process' input/output to the parent.
  If `stdin` has this value, child process will accept input from the parent process' console.
  If `stdout` or `stderr` has this value, child process will output to the parent process' console.
- `process.REDIRECT_DISCARD` discards any data to/from child process.
- `process.REDIRECT_STDOUT` can only be used on `stderr` and will redirect the child process' standard error
  to its standard output.

`env` is a table containing the environment variables for the child process as key-value pairs.

!!! note
    On POSIX platforms, this table will **extend** the parent's environment.
    On Windows with Lite XL version v2.1.1 and below, this table will **replace** the parent's environment.

The function returns a `Process` object that the user should hold onto until
the child process can be safely terminated.
If the `Process` object is garbage-collected, the child process will be killed.

**Examples:**

```lua
-- run something in the background
local proc = process.start { "bash", "-c", "echo hello world" }

-- start a process and read its output
local proc = process.start({ "cat", "myfile" }, { stdout = process.REDIRECT_PIPE })
-- might or might not print something as the child process
-- might not have written data to the standard output
print(proc:read_stdout())

-- start a script with verbose output (accepting options over env vars)
local proc = process.start({ "./site.rb" }, { env = { VERBOSE = "1" } })
```

### Reading from a child process

If the child process is created with proper output modes, one can read the standard output/error
of the child process with the API.

To read from the child process' standard output, use `process:read_stdout(len)`.

To read from the child process' standard error, use `process:read_stderr(len)`.

```lua
function process:read_stdout(len?: number): string, string, number end
function process:read_stderr(len?: number): string, string, number end
```

The `len` parameter is optional and is used to specify the maximum number of bytes to read from the stream.

These methods return a string with size up to `len` if data can be read.
Otherwise, they will return `nil`, an error message and the error code.

**Examples:**

```lua
-- proc is a process with stdout set to process.REDIRECT_PIPE
-- read default number of bytes (2048) from the process' standard output
print(proc:read_stdout())

-- read default number of bytes (2048) from the process' standard error
-- ensure that stderr of the process is not set to process.REDIRECT_STDOUT!
print(proc:read_stderr())
```

### Waiting for a child process

You might want to wait for a child process to end.

To check if a child process is still running, use `process:running()`.

To wait for a child process to end, use `process:wait(time)`.

```lua
function process:running(): boolean end
function process:wait(timeout: number): number, string, number end
```

`process:running()` returns a boolean immediately indicating whether the process has ended.

!!! note
    Do not use `process:running()` to determine when to stop reading the output of a child process.
    A child process can end and leave residual data in the stream.
    Instead, you should call `process.read_stdout()` or `process.read_stderr()`
    until an appropriate error (`process.ERROR_PIPE`) occurs.

`process:wait(time)` will wait for specified number of milliseconds before returning.
If the child process has ended, it will return the exit code of the process.
If the child process is still running or an error occurred,
it will return `nil` followed by an error message and error code.

`time` is time in milliseconds before the method returns.
If it is 0, the method returns immediately without waiting for the child process to exit.
The parameter can also be `process.WAIT_DEADLINE` to use the timeout value provided in `process.start()`
or `process.WAIT_INFINITE` to wait until the child process exits (the default).

**Examples:**

```lua
-- wait for a process to end
core.add_thread(function()
  while process:running() do
    coroutine.yield(0)
    print("I am still running")
  end
  print("Oh no!")
end)

-- wait for a process to end, and print its exit code.
print("The process exited with the exit code " .. process:wait(process.WAIT_INFINITE))
```

### Terminating a child process

The Process API allows the user to terminate a child process gracefully or forcefully.

Use `process:terminate()` to terminate a child process gracefully.
If it fails, use `process:kill()` to forcefully terminate it.

```lua
function process:terminate(): boolean, string, number end
function process:kill(): boolean, string, number end
```

On POSIX platforms, `process:terminate()` sends `SIGTERM` to the child process
while `process:kill()` sends `SIGKILL` to the child process.

On Windows, `process:terminate()` uses `GenerateConsoleCtrlEvent(CTRL_BREAK_EVENT)` to simulate ++ctrl+break++.
`process:kill()` uses `TerminateProcess()` to terminate the process immediately.

!!! note
    `process:kill()` can only **request** a process to be killed.
    On POSIX, signals are delivered asynchronously; a child process can be too busy to process them
    (e.g. stuck at a blocking `read()` or `write()` call).
    This is the same on Windows except `TerminateProcess()` will request cancellation of all pending
    IO operations.
    This is impossible on POSIX platforms.

**Examples:**

```lua
-- try to terminate child process
proc:terminate()

-- wait for child process to end
if not proc:wait(1000) then
  -- didn't work, have to terminate it forcefully
  proc:kill()
end
```

### Miscellaneous

`process:pid()` can be used to obtain the PID of a child process.
It will return `0` if the process is not running.

`process:returncode()` can be used to get the exit code of the child process
without calling `process:wait()`.

`process.strerror()` can be used to convert error codes emitted by the process API into human-readable
error messages.
If an error message is unavailable, `nil` will be returned.

`process:close_stream()` can be used to close the child process' streams.

```lua
function process:pid(): number end
function process:returncode(): number end
function process.strerror(errcode: number): string end
function process:close_stream(stream: number): number, string, number end
```

!!! note
    `process:pid()` will not return the correct process ID if
    the child process ended early.


### Error handling

The Process API functions and methods will return error messages/codes or throw errors.

`process.start()` will throw an error if the program cannot be run.
On Windows, this usually results in an error message `"Error creating a process: 2"`.

`process:read()`, `process:read_stdout()`, `process:read_stderr()` and `process:write()` may throw errors if:

- The child process died.
- The child process closed their side of the input/output.
- The input/output is closed via `process:close_stream()`.

Not all errors are documented here.
In general, it is recommended to call the functions with `pcall()` until this
inconsistency is fixed in the future.


[1]: https://github.com/rxi/console/blob/fb3d414d085d4110364314d6cd8380dc1d386249/init.lua#L100
