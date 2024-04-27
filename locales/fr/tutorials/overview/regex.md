# Regex API

This API provides PCRE regular expressions for those who needs more power in matching text.
This API written in C and Lua.

## Creating a regex
Use `regex.compile(pattern, options)` to compile a regex.

- `pattern`: The regex pattern
- `options`: regex modifiers as a string, eg `"im"`
  - `"i"`: Case-insensitive search
  - `"m"`: Multiline search
  - `"s"`: Match all characters with dot (`.`), **including newlines.**

## Matching

### Low level functions
- `regex:cmatch(str, offset, options)` low-level matching function
  - `str`: The string to match against
  - `offset`: Where to start matching
  - `options`: A bit field of options
    - `regex.ANCHORED`: Only match from the start of the string
    - `regex.ENDANCHORED`: Only match from the end of the string
    - `regex.NOTBOL`: String is not beginning of line
    - `regex.NOTEOL`: String is not the end of line
    - `regex.NOTEMPTY`: Do not match an empty string
    - `regex.NOTEMPTY_ATSTART`: Do not match empty string at the start

**Note: `regex:cmatch()` returns wrong indexes (currently at version 2.0.2).
  The end index returned by `regex:cmatch()` is always off by 1 (-1 to get the actual end index).**

### High level functions
All the functions below can be in 2 forms:
- `regex:fn(...)` where `regex` is the compiled regex instance
- `regex.fn(pattern, ...)` where `pattern` is a pattern string to be compiled and used directly.

We will only document the first form.

- `regex:match(str, offset, options)` high level matching function. This function accepts
  the same arguments as `regex:cmatch()`
- `regex:gsub(str, replacement)` replaces matches in `str` with `replacement`.
  Capture groups are identified with `\\0` to `\\9`, this might change in the future.
