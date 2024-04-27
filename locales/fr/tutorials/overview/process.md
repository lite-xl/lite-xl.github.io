# Process API

Lite XL provides a process API to launch external applications. This API is meant to replace
lua's `io.popen` and lite's [pipe-to-a-file][1] approach.

Advantages of this API includes:

- Proper argument escaping (arguments are supplied via a table)
- Nonblocking IO
- Able to detach processes from Lite XL [(in progress)][2]
- Does not create temporary files
- Mostly cross-platform (does not require special code for each shell)

## Using the Process API

### Error handling
- `process.start()` may throw errors if it cannot run the program.
- `process.read*` and `process.write` functions may throw errors if
  - the process ended
  - the process closed the stream
  - you closed the stream
- there might be other errors to look forward to too

### Starting a process
To start a process, use `process.start(args, options)`.

Here are some of the more useful arguments.

- `args`: The executable and any arguments, eg: `{ "sh", "-c", "echo hello world" }`
- `options`: Options for `process.start()`
  - `env`: A key-value table containing the env. **Note that if this is provided,
            environment variables will not be inherited.**
  - `stdin`: Specify where to redirect stdin
  - `stdout`: Specify where to redirect stdout
  - `stderr`: Specify where to redirect stderr

for `options.std{in,out,err}`, valid values are:

- `process.REDIRECT_PIPE` (Make it available to subprocess API for reading / writing)
- `process.REDIRECT_DISCARD` (Discard the output. Use this to prevent buffering)
- `process.REDIRECT_STDOUT` (`stderr` only, for redirecting `stderr` to `stdout`)

### Reading from process
To read from `stdout` or `stderr` of a process, use `process:read_stdout()` and
`process:read_stderr()` respectively.

You can specify a numeric argument to them, which will change the size of internal buffer used
to read the output.

Alternatively, you could use `process:read()` with `process.STREAM_STDERR` and `process.STREAM_STDOUT`.

**Example:**

```lua
local proc = process.start { "sh", "-c", "echo hello world!" }

-- do not use `while proc:running()` if you care about output.
-- The process could die and leave data in the buffer
-- You should just read until `proc:read_stdout()` returns nil
while true do
  local rdbuf = proc:read_stdout()
  if not rdbuf then break end
  -- yay, output
end
```

### Writing to process
You can use `process:write(data)` to write a string to `stdin`.

### Checking completion
- `process:running()` returns a boolean to indicate whether if the process is running.
- `process:wait(time)` also does the same thing, but you specify how long it should wait (or 0 to return immediately).

### Terminating process
- `process:terminate()` sends SIGTERM (or Windows equivalent) to the process.
- `process:kill()` sends SIGKILL (or Windows equivalent) to the progress.
**Use this only if `process:terminate()` cannot kill the process, [as it can cause issues][3].**

### Misc
- `process:pid()` returns the PID of the process.
**There are no guarantees for this PID to be correct if the process terminated early.**
- `process:returncode()` returns the exit code of the process, if any
- `process:close_stream()` closes `stdin`, `stdout` or `stderr` stream of the process.


[1]: https://github.com/rxi/console/blob/fb3d414d085d4110364314d6cd8380dc1d386249/init.lua#L100
[2]: https://github.com/lite-xl/lite-xl/pull/535
[3]: http://turnoff.us/geek/dont-sigkill/
