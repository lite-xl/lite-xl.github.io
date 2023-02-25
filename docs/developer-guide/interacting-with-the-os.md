# System API

This is where Lite XL's Lua code interact with its underlying C engine.

## Using the System API

There are many functions that belong to this API; not all are necessary for
plugin development.
As such, we'll ignore them here and only document the useful ones.

### Clipboard

`system.set_clipboard()` sets the clipboard content,
while `system.get_clipboard()` retrieves the clipboard content.

The functions do not support rich content such as images and files.

```lua
function system.set_clipboard(text: string) end
function system.get_clipboard(text: string): string end
```

**Examples:**

```lua
system.set_clipboard("wow magic")
-- prints:
-- wow magic
print(system.get_clipboard("wow magic"))
```

### File / Directory operations

These functions deal with files, directories and paths.

```lua
-- Returns a list of files and directories in a directory.
function system.list_dir(path: string): string[] or (nil, string) end
-- Creates a new directory.
function system.mkdir(path: string): (boolean, string or nil) end
-- Removes a directory.
function system.rmdir(path: string): (boolean, string or nil) end
-- Changes the current working directory (equivalent to the `cd` command)
function system.chdir(path: string) end
-- Resolves the input path (removing all '.' and '..') into an absolute path.
function system.absolute_path(path: string) end
-- Returns information for a file or a directory.
function system.get_file_info(path: string): table or (nil, string) end
```

`system.get_file_info()` returns a table with the following properties:

- `modified`: Modification time in seconds (UNIX timestamp).
- `size`: Size of the file in bytes.
- `type`: Type of the path (Can be `file` or `dir`).
- `symlink`: The directory is a symlink (Only set on Linux and on directories).

All the functions listed above except `system.chdir()` will return `nil`
followed by an error message when an error occurred.
`system.chdir()` will throw an error if an error occurred.

**Examples:**

```lua
-- DO NOT RUN THIS CODE!
-- the code and its outputs are purely for demonstration only,
-- and will not reflect your actual usage.
local dir = "../lite-xl"
local dir_resolved = system.absolute_path(dir)
-- prints:
-- /home/user/gh/lite-xl
print(dir_resolved)

-- prints:
-- .git => dir
-- docs => dir
-- .editorconfig => file
-- LICENSE => file
-- ...
-- lite-xl => file
for i, d in ipairs(system.list_dir(dir_resolved)) do
  local info = system.get_file_info(dir_resolved .. "/" .. d)
  print(d .. " => " .. info.type)
end

-- create some directories
-- this will not work because system.mkdir() doesn't create directories
-- recursively, just like `mkdir` command without the `-p` option.
-- prints:
-- false   No such file or directory
print(system.mkdir(dir_resolved .. "/1/2"))

-- these will work
-- prints:
-- true
print(system.mkdir(dir_resolved .. "/1"))
-- prints:
-- true
print(system.mkdir(dir_resolved .. "/1/2"))

-- system.rmdir() does not support removing non-empty dirs, so
-- this will not work and print an error
-- prints:
-- false   Directory not empty
print(system.rmdir(dir_resolved .. "/1"))

-- instead, you should try to remove them recursively, making sure that each
-- directory is empty
-- prints:
-- true
print(system.rmdir(dir_resolved .. "/1/2"))
-- prints:
-- true
print(system.rmdir(dir_resolved .. "/1"))
```

### Timing

`system.get_time()` returns time in seconds since Lite XL started.
It is a high-precision alternative to `os.time()`.

```lua
function system.get_time(): number end
```

**Examples:**

```lua
-- prints:
-- 30148.079763237
print(system.get_time())
```

## Window manipulation

These functions deal with Lite XL window.

```lua
-- Sets the window opacity from 0 to 1.
function system.set_window_opacity(opacity: number): boolean end
-- Sets the window title.
function system.set_window_title(title: string) end
-- Sets the window mode.
function system.set_window_mode(mode: "normal"
                                      or "maximized"
                                      or "minimized"
                                      or "fullscreen") end
-- Enables/disables window borders (decoration).
function system.set_window_bordered(enable: boolean) end
-- Sets the window hit test region.
function system.set_window_hit_test(height:        number or nil,
                                    control_width: number or nil,
                                    resize_border: number or nil)
end
-- Gets the window dimension and position.
function system.get_window_size(): (number, number, number, number) end
-- Sets the window dimension and position.
function system.set_window_size(width:  number,
                                height: number,
                                x:      number,
                                y:      number)
end
-- Checks whether windows has input focus.
function system.window_has_focus(): boolean end
-- Shows a message box with an error message.
function system.show_fatal_error(title: string, msg: string) end
```

The `height` parameter in `system.set_window_hit_test()` refers to the height
of the top decoration. Users can drag this part of the window to move it.
`control_width` specifies the width of various window controls
(minimize, maximize and close) buttons in the top right corner of the window.
`resize_border` specifies the width of a "border region" where users can
drag the window to resize it.
This value does not overlap with the `height` parameter.

`system.get_window_size()` returns the width, height, x-coordinate
and y-coordinate of the window respectively.

`system.set_window_opacity()` will return `false` if the operation failed.
Otherwise, it returns `true`.

## Miscellaneous

`system.exec()` runs a command in the background.
It is useful if you just want to run a program and doesn't care about its
output and exit code.
If you want more features, consider using the [Process API][1].

`system.fuzzy_match()` generates a score for sorting text based on relevance.

```lua
function system.exec(command: string) end
function system.fuzzy_match(haystack: string,
                            needle:   string,
                            file:     boolean): number
end
```

`system.exec()` accepts a string containing a command to run.
This command will be run as `system("<command> &")` on POSIX platforms and
`cmd /c "<command>"` on Windows, so make sure that the command is escaped
properly.

`system.fuzzy_match()` takes in a `haystack` (a possible match) and a `needle`
(the string to search) to generate a similarity score.
If the score is 1, both strings are identical.
When the third argument is `true`, the matching will be done backwards as this
is more suitable for matching paths.


[1]: /en/tutorials/overview/process