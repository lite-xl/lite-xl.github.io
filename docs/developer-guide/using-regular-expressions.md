---
description: Learn to use regular expressions in your configurations
              or plugins.
---

This API provides PCRE (Perl-Compatible Regular Expressions) and is written in C and Lua.
The API bears some similarity to Lua's pattern library with some differences.

## Example: matching capture groups with a regular expression

```lua
local s = "hello world hello world"
for hello, world in regex.gmatch("(hello)\\s+(world)", s) do
    print(hello .. " " .. world)
end
```

## Example: replacing words with a regular expression

```lua
local s = "hello world John!"
print(regex.gsub("hello world (.+)!", s, "Hello world $1 Doe!"))
```

## Using the Regex API

Most Regex API functions accept a `Regex` object or a string to compile into a regex as their first argument.
The only exception is `regex:cmatch()` which requires the first argument to be a `Regex` object.

For more information regarding PCRE itself, please consult the [documentation][1] or a [cheat sheet][2].

### Creating a regex

Use `regex.compile()` to compile a regular expression.
Compiling a regular expression is recommended if the user plans to use them frequently.

```lua
function regex.compile(pattern:  string,
                        options?: string): Regex, string
end
```

The first argument to the function is the regular expression to compile.
The second argument to the function is a string containing one or more pattern modifiers.

- `"i"` enables case-insensitive matching
- `"m"` enables multi-line matching
- `"s"` matches all characters with the dot (`.`) meta-character, including newlines.

The function returns a compiled `Regex` object.
If an error occurred, `nil` is returned along with an error message.

**Example:**

```lua
local s = "Hello world!\nWow!"

-- simple regex
local r = regex.compile "([A-Z]+)(,+)"
-- prints:
-- H       ello world!
print(r:match(s))

-- case-insensitive matching
local r = regex.compile("([A-Z]+)(,+)", "i")
-- prints:
-- Hello    world!
print(r:match(s))

-- match all characters with .
local r = regex.compile("([A-Z]+)(,+)", "is")
-- prints:
-- Hello    world!
-- Wow!
print(r:match(s))
```

### Matching text

The Regex API provides low-level matching functions (`regex:cmatch()`, `regex.find_offsets()`),
and high-level matching functions (`regex.match()`,`regex.find()`, `regex.gmatch()`, `regex.gsub()`).

```lua
function regex:cmatch(subject: string,
                      offset:  number,
                      options: number): number...
end

function regex.find_offsets(pattern:  string | Regex,
                            subject:  string,
                            offset?:  number,
                            options?: number): number...
end

local type Captures = number | string

function regex.match(pattern:   string | Regex,
                      subject:  string,
                      offset?:  number,
                      options?: number): Captures...
end

function regex.find(pattern: string | Regex,
                    subject: string,
                    offset?:  number,
                    options?: number): Captures...
end

-- since v2.1.1
function regex.gmatch(pattern: string | Regex,
                      subject: string,
                      offset?:  number,
                      options?: number): function(): string
end
```

The first argument to `regex:cmatch()` is the subject string.
The second argument is an offset in the subject string to indicate when to start matching.
The third argument is a number comprised of multiple match options OR-ed together.
These options are:

- `regex.ANCHORED`: Only matches the start of the input; similar to the `^` meta-character.
- `regex.ENDANCHORED`: Only matches the end of the input; similar to the `$` meta-character.
- `regex.NOTBOL`: Do not treat beginning of subject string as beginning of line.
- `regex.NOTEOL`: Do not treat end of subject string as end of line.
- `regex.NOTEMPTY`: Do not treat an empty subject string as a valid match.
- `regex.NOTEMPTY_ATSTART`: Do not treat empty string at the start of a subject string as a valid match.

`regex.find_offsets()` accepts the same arguments, but the first argument
can be a compiled `Regex` object or a string while the second and third argument are optional.

Both `regex:cmatch()` and `regex.find_offsets()` return pairs of numbers indicating the start
and end indices of all the matches.
The first pair of numbers is the indices of the whole match.
If captures were specified in the regex, the rest of the numbers are pairs
of start and end indices for each capture.

If no matches were found, both functions return `nil`.
Otherwise, if an error occurred, both functions throw an error.

!!! warning
    Never use `regex:cmatch()` as its return values are off by 1.
    Instead, use `regex:find_offsets()` which have the correct behavior.

**Example:**

```lua
local s = "Apples, Oranges, Bananas"
local r = regex.compile("([A-Za-z]+),\\s*(.+)")
-- prints:
-- 24
print(#s)
-- prints:
-- 1       25      1       7       9       25
print(r:cmatch(s))
-- prints:
-- 1       24      1       6       9       24
print(r:find_offsets(s))
```

`regex.match()` and `regex.find()` are similar to Lua's `string.match()` and
`string.find()`.

The first argument is the compiled `Regex` or a string,
while the second argument is the subject string to match.
The third and fourth argument specify the offset of the string to start matching and match options.
The third and fourth argument are optional.

`regex.match()` will return all captured strings.
If no captures are specified in the regex, it will return the matched string.
If a capture is empty, its offset will be returned.

`regex.find()` will return the start and end indices of the matched string,
followed by the captured strings if any.
If a capture is empty, its offset will be returned.

Both functions return `nil` if no match was found.

!!! note
    There are no functions that return the start and end indices of captured
    strings.
    Use `regex.find_offsets()` for that.

**Example:**

```lua
local s = "Apples, Oranges, Bananas"
-- prints:
-- Apples    Oranges, Bananas
print(regex.match("([A-Za-z]+),\\s*(.+)", s))
-- prints:
-- 1    24    Apples    Oranges, Bananas
print(regex.find("([A-Za-z]+),\\s*(.+)", s))

```

`regex.gmatch()` returns an iterator that iterates through all captured groups, or the whole match
if no captures are specified in the regex.

It accepts the same arguments as `regex.find()` and `regex.match()`.

**Example:**

```lua
local s = "John doe, Jeanne Doe, Jane Doe"
-- will print:
-- John - Doe
-- Jeanne - Doe
-- Jane - Doe
for first_name, last_name in regex.gmatch("([A-Za-z]+) ([A-Za-z]+)(,\\s*)?", s) do
  print(first_name .. " - " .. last_name)
end

-- will print:
-- John
-- doe
-- Jeanne
-- Doe
-- Jane
-- Doe
for name in regex.gmatch("\\w+", s) do
  print(name)
end
```

### String substitution

`regex.gsub()` can be used to perform simple string substitution.

```lua
function regex.gsub(pattern:     string | Regex,
                    subject:     string,
                    replacement: string,
                    limit?:      number): string, number
end
```

The first argument is the `Regex` object or a string, followed by the subject string.
The third argument is the replacement string and the last is the maximum number of replacements to make.

The function returns the subject string with matches replaced with the replacement string,
followed by the number of replacements made.

If an error occurred, the function throws an error.

#### Replacement string

The replacement string supports PCRE2 extended substitution syntax.

To use named and unnamed capture groups with `$n` or `${n}` where `n` is the group number or name.
The extended substitution syntax also supports two extra substitutions:

- The form `${n:-default}` will use `default` if `n` is unavailable.
- The form `${n:+iftrue:iffalse}` will use `iftrue` if `n` is available, otherwise it will use `iffalse`.

To insert a literal dollar sign (`$`), use `$$`.

Other than that, `\U` and `\L` can be used to toggle uppercase or lowercase,
while `\u` and `\l` causes the **next character** to be in uppercase or lowercase.

**Example:**

```lua
local s = "John Doe, Jane Doe, Peter Doe"
local r = regex.compile "(\\w+)"

-- prints:
-- No No, No No, No No     6
print(r:gsub(s, "No"))
-- prints:
-- $John $doe, $Jane $Doe, $Peter $Doe     6
print(r:gsub(s, "($1)"))
-- prints:
-- john doe, jane doe, peter doe   6
print(r:gsub(s, "\\l${1}"))
-- prints:
-- Matched => John Matched => doe, Matched => Jane Matched => Doe, Matched => Peter Matched => Doe 6
print(r:gsub(s, "${1:+Matched => $1:No match.}"))
```


[1]: https://www.pcre.org/original/doc/html/pcrepattern.html
[2]: https://www.debuggex.com/cheatsheet/regex/pcre
