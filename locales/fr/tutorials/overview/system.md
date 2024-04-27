# System API

This is where Lite XL's lua code interact with its underlying C engine.
Some of the functions here will be omitted because they're not useful for
plugins.

## Clipboard
- `system.set_clipboard(text)` sets the clipboard content.
- `system.get_clipboard()` retrieves the content of the clipboard.

## File / Directory manipulation
- `system.list_dir(dir)` returns a list of filenames in a directory.
- `system.rmdir(dir)` removes a directory. Use this instead of `os.remove()`.
  **The directory must be empty.**
- `system.chdir(dir)` changes the current working directory (like `cd`).
- `system.mkdir(dir)` creates a new directory.
  **It does not recursively create directories.**
- `system.absolute_path(path)` resolves the path components (`.. and .`) to an absolute path.
- `system.get_file_info(path)` returns info about a path.
  - `modified`: last modification time of the file in seconds since UNIX epoch.
  - `size`: file size in bytes.
  - `type`: Path type (`"file"` or `"dir"`).

## Timing
- `system.get_time()` returns time in seconds (as floating point number) since Lite XL started.
  Use this instead of `os.time()` for higher precision timers.
- `system.sleep(time)` sleeps for `time` in milliseconds.
  **Do not use this. Write asynchronous code.**

## Window manipulation
- `system.set_window_opacity(o)` sets the window opacity from 0 to 1.
- `system.set_window_title(title)` sets the window title.
- `system.set_window_mode(mode)` sets window mode:
  - `"normal"`: also known as "restored" on Windows.
  - `"maximized"`: Maximize the window.
  - `"minimized"`: Minimize the window.
  - `"fullscreen"`: Fullscreen
- `system.set_window_bordered(bordered)` enables or disable window border (decoration).
- `system.set_window_hit_test(height, control_width, resize_border)` sets window hit test (used for
  `config.borderless` to make custom drawn border interactable).
  - If no argument is supplied, reset the hit test values.
  - `height`: height of the title bar.
  - `controls_width`: Not too sure about this, but it should be the size of the title bar controls
    (Maximize, Minimize and Normal buttons on the right).
    It seems to be fixed at the right side of the title bar.
  - `resize_border`: Number of pixels reserved for resizing the window.
    (setting this to a large value means that you can resize the window way easier)
- `system.get_window_size()` gets the window size.
- `system.set_window_size(w, h, x, y)` sets the window size (and also position).
- `system.window_has_focus()` checks whether the window is in focus.
- `system.show_fatal_error(title, msg)` shows an system error message box.
  **Use nagview whenever possible.**

## Misc
- `system.exec(command)` runs a command. Use the [Process API][1] instead of this.
- `system.fuzzy_match(haystack, needle, file)` generates a score depends on how close the needle
  matches the haystack.
  - `file`: match backwards (more accurate for filename matching).

[1]: /en/tutorials/overview/process
