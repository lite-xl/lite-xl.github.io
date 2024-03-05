---
description: Learn about how to operate on files opened in Lite XL.
---

Lite XL stores an opened file in a Doc.
A Doc contains the file in lines (`doc.lines`), metadata and various states, including the syntax highlighter
(`doc.highlighter`) and the undo stack.

## Creating Docs

To create a Doc, you usually create instances of it directly.
Instead, it is often easier to call `core.open_doc()`.
This function accepts a filename and returns a new Doc if the file is not open,
or an existing Doc if the file is already open in the editor.

```lua
function core.open_doc(filename: string): Doc end
```

## Getting existing Docs

Other than `core.open_doc()`, you can also access `core.docs` for a list of opened Docs in the editor.
However, you should not modify this table directly but use other functions to interact with it.

## Filenames

The filename is stored in `Doc.filename` while the absolute path is stored in `Doc.abs_filename`.
If a Doc doesn't have a name (created by pressing ++ctrl+n++), `Doc.filename` is set to `"unsaved"`
and `Doc.abs_filename` is nil.

## Changes

If the Document was changed and the changes are not saved, it is considered "dirty".
To check if a Doc is dirty, simply call `Doc:is_dirty()`.
To reset the dirty flag, call `Doc:clean()`.

## Undo & Redo

Doc maintains two stacks, used for undo and redo operations.
As an operation is popped from one stack, it is pushed to another.
The stacks store insertion, deletion and selection changes.
Most Doc functions automatically commit to the undo stack.

To undo an operation, call `Doc:undo()`.
To redo an operation, call `Doc:redo()`.

## Positions

A position within a Doc is represented with two numbers — the row and column number.

To ensure that a position is correct (valid for the current Doc), you can call `Doc:sanitize_position()`.
This function accepts a position and clamps it to the following document, making sure that it is valid.

### Transformations

Doc provides `Doc:position_offset()` to translate a position to another (e.g. next word, next character, etc.).

The function accepts the input position followed by several arguments.
Depending on the types of arguments, different transformations are carried out.
The simplest form of the function accepts a byte offset and applies it to the input position.
The second form accepts a line and column offset and applies it to the position.
The third form accepts a transformation function.
The transformation function receives the Doc, as well as other arguments passed to `Doc:position_offset()`.

The function should return the transformed position.

```lua
-- skip 2 bytes starting from line 1 col 1
-- if line 1 has 2 characters, then 2, 1 will be returned.
-- assuming each character takes 1 byte, yada yada 
local x, y = doc:position_offset(1, 1, 2)

-- skip 2 lines and 3 cols
-- returns 3, 5
local x, y = doc:position_offset(1, 2, 2, 3)

---Taken from core/doc/translate.lua
---This function jumps to the next UTF-8 character.
local function next_char(doc, line, col)
    repeat
        line, col = doc:position_offset(line, col, -1)
    until not common.is_utf8_cont(doc:get_char(line, col))
    return line, col
end

-- assuming the line contains 1 wide character (2 bytes per character),
-- the function will return 1, 3
local x, y = doc:position_offset(1, 1, next_char)
```

For convenience, Lite XL provides a few transformation functions out-of-the-box.
These functions are UTF-8 aware and should be used whenever possible.

```lua
local translate = require "core.doc.translate"

-- this functions the same as the last example
local x, y = doc:position_offset(1, 1, translate.next_char)
```

## Selections

In Lite XL, selections refer to region of text selected by the user.
It is represented by four numbers — the starting and ending line and column number.
These numbers are sorted in operational order; for the word "Hello", selecting it from `o` to `H`
will yield `(1, 5, 1, 1)` while selecting it from `H` to `o` will yield `(1, 1, 1, 5)`.
When displayed to the user, a caret will be drawn at the **ending** position.

A caret is a **special selection where the start and end positions are equal**.

As multiline editing is added to Lite XL, functions that operate
on a single selection has been largely obsoleted.
These functions now operate on the last selection made by the user.

### Fixing inconsistencies

As the Doc is being edited, some selections can be invalidated
(e.g. the actual lines are shorter than what the selection covers).
To fix this, you can call `Doc:sanitize_selection()` before operating on them.
This function will normalize any inconsistent selections within the Doc.

### Getting selections

To check whether the user made any selection (excluding carets), you can use `Doc:has_any_selection()`.

To iterate through all the selections, you can use `Doc:get_selections()`.
This function accepts two arguments `sort_intra` and `idx_reverse`.

If `sort_intra` is true, the positions returned by the iterator is sorted in ascending order
instead of operational order.
If `idx_reverse` is true, the iterator will iterate from the latest to the oldest selection.
When a number is passed to `idx_reverse`, the iterator will run for that number of iterations
from the latest to the oldest.

To get individual selections, you can use `Doc:get_selection_idx()`.
This function accepts the selection index (1 is the oldest selection), and optionally a boolean indicating
the result positions should be sorted in ascending order.

To get text from multiple selections, use `Doc:get_selection_text()`.
This function returns the last `limit` selections' text concatenated with newline characters.
If `limit` is not provided, the function returns text from all selections.

```lua
-- iterate through all the selections from oldest to newest
for idx, line1, col1, line2, col2 in doc:get_selections(true) do
    if line1 == line2 and col1 == col2 then
        print(string.format("cursor[%d]: %d, %d", idx, line1, col1)
    else
        print(string.format("selection[%d]: %d, %d -> %d, %d", idx, line1, col1, line2, col2))
    end
end

-- get the 2nd selection
local l1, c1, l2, c2 = doc:get_selection_idx(2, true)

-- the text from the first 5 selections
-- Don't pass anything to get text from all selections
local text = doc:get_selection_text(5)
```

### Modifying selections

To add a selection, you can use `Doc:add_selection()`.
This function accepts the start and end positions followed by a boolean indicating whether the function
should swap the start and end positions.
This function will replace an existing smaller selection.

To modify an existing selection, you can use `Doc:set_selections()`.
The function can be called with 3, 6 or 7 arguments.
The first argument is always the index of the selection to modify.

When the function is called with 3 arguments, the other two arguments
are the ending positions of the selection.
This effectively truncates the selection at the index.

When the function is called with 6 arguments, the selection index is followed by the start and end positions
of the selection and a boolean indicating whether the start and end positions should be swapped.

The 7th argument is the number of selections to remove at the index before inserting new ones.

```lua
-- add a selection
doc:add_selection(1, 1, 2, 1)

-- add an empty selection (a caret)
doc:add_selection(1, 1)

-- truncate the 2nd selection and move it to 1, 1
-- (convert a selection into a caret)
doc:set_selections(2, 1, 1)

-- move the selection to (1, 1, 10, 10)
doc:set_selections(2, 1, 1, 10, 10)
```

### Removing selections

To remove a selection, you can use `Doc:remove_selection()`.
This function accepts a selection index.

```lua
-- you can't delete while iterating
local indices = {}
for idx, l1, c1, l2, c2 in doc:get_selections() do
    if l1 == whatever_we_want and c1 == whatever_we_want then
        table.insert(indices, idx)
    end
end

-- as things are getting removed, we need to account for the shift
local offset = 0
for _, idx in ipairs(indices) do
    doc:remove_selection(idx - offset)
    offset = offset + 1
end
```

### Merging selections

Sometimes operations involving multiline editing can cause inconsistent and duplicated selections.
To fix this, you can call `Doc:merge_cursors()`.

This function takes an optional number `idx`, which will make the function merge selections adjacent to `idx`. 
If `idx` is not provided, the function attempts to merge all the selections.

## Indentation

Doc stores the current indentation type and level.
This value is either inherited from `config.tab_type` and `config.indent_size`
or set by the `autoindent` plugin.

To get this info, you can call `Doc:get_indent_info()`.
This function returns the indent type, indent size and whether this is a guess by the `autoindent` plugin
or is confirmed to be correct.

Alternatively, you can call `Doc:get_indent_string()` to get a string used to indent a line by one level.

```lua
-- indent_type is either "soft" for space or "hard" for tabs.
-- indent_size is the number of spaces for soft indentation or the number
-- of spaces represented by one hard indent.
local indent_type, indent_size, confirmed = doc:get_indent_info()

-- a few space characters for soft indent, a tab character for hard indent
print(doc:get_indent_string())
```

```lua
function Doc:get_indent_info(): "soft"|"hard", number, boolean end
```
### Changing indentation

To add or remove indentation, you can call `Doc:indent_text()`.
The function accepts a boolean indicating whether you want to add or remove indents,
optionally followed by the starting and ending position of the region to modify.

When indenting, if the cursor is in the beginning whitespace of a line, the cursor will insert
an appropriate amount of whitespace and move to the first non-whitespace character of the line.
Otherwise, whitespace are inserted, and the cursor does not move.

When removing indentation, the cursor will jump to the start of line
and remove an appropriate amount of whitespace.

```lua
-- indent all selections
-- FIXME: this might not indent correctly with selections spanning multiple lines
for idx, l1, c1, l2, c2 in doc:get_selections(true) do
    local new_l1, new_c1, new_l2, new_c2 = doc:indent_text(true, l1, c1, l2, c2)
    if new_l1 then
        doc:set_selections(idx, new_l1, new_c1, new_l2, new_c2)
    end
end
```

## Getting text

To get text from a Doc, you can use `Doc:get_text()`.
This function accepts the start and end position and returns text between it.

`Doc:get_char()` can be used to get the character at a specified line and column.

## Modifying text

Doc provides high-level functions to insert, remove and modify lines, along with text input handlers
and convenience function to delete words or characters.

### Inserting and removing text

To insert text at the current cursors' position, you can use `Doc:text_input()`.
This function will replace selections and handle text overwriting.
You can pass a selection / cursor index for the second parameter to only insert text in the specified cursor.

For inserting text at a specified position, you can use `Doc:insert()`.
This function takes in the initial position and a string, and inserts it into the Doc.

To remove text from the Doc, call `Doc:remove()`.
The function accepts the start and end position of the region of text to remove.

These two functions has their low level counterpart, `Doc:raw_insert()` and `Doc:raw_remove()`.
These function takes the undo stack and the time in seconds as extra arguments.
They also don't call any event handlers related to Doc change.

```lua
-- insert text after all the selections
doc:text_input("hello world")

-- insert text after the 2nd selection
doc:text_input("hello world", 2)

-- insert text at the top of the doc
doc:insert(1, 1, "hello world")

-- remove 2 characters from the first line
doc:remove(1, 1, 1, 3)
```

### Replacing text

To replace text within selections, you can call `Doc:replace()`.
This function accepts a replace function, which accepts the original selection text and returns
the replaced text, optionally followed by a result value.
The result values for each replacement are stored in a table and returned by `Doc:replace()`.
If no text is selected, the function will try to replace all text in the Doc.

A lower-level version of the function is available as `Doc:replace_cursor()`,
which replaces text within a region and inserts the result to the cursor at the specified index.
The function returns the result value from the replace function.

```lua
-- add another dash for all lua comments
local function magic(text)
    return text:gsub("%-%-", "---")
end

-- replace for the entire doc
doc:replace(magic)

-- replace a specific selection
for idx, l1, c1, l2, c2 in doc:get_selections(true) do
    if l1 ~= l2 and c1 ~= c2 then
        if l1 == what_we_want and c1 == what_we_want then
            doc:replace_cursor(idx, l1, c1, l2, c2, magic)
        end
    end
end
```

### Convenience functions

`Doc:move_to()` and `Doc:move_to_cursor()` can be used to move the cursors to a specified position
with similar arguments to `Doc:position_offset()`.
`Doc:move_to_cursor()` accepts a cursor index as the first argument.

`Doc:select_to()` and `Doc:delete_to()` can be used and delete text with similar arguments
to `Doc:position_offset()`.
`Doc:select_to_cursor()` and `Doc:delete_to_cursor()` does the same thing but allows the user to specify
a cursor or selection index to operate on.

```lua
local translate = require "core.doc.translate"

-- move to the end of the next word
doc:move_to(translate.next_word_end)

-- move all selections to word end
-- this moves both the start and end positions of selections
for idx, _, _, _, _ in doc:get_selections() do
    doc:move_to_cursor(idx, translate.next_word_end)
end
```

## Saving

To save a Doc, you can call `Doc:save()`.

This function saves the Doc to a file with the name from `filename` or `self.filename` if `filename` is nil.
If the Doc doesn't have a filename set, this function will set the filename for the Doc.

```lua
function Doc:save(filename?: string) end
```

## Events

Doc provides some functions that could be overridden for certain events,
such as `Doc:on_text_change()` and `Doc:on_close()`.

```lua
local on_text_change = Doc.on_text_change
function Doc:on_text_change(type)
    if type == "insert" then
        -- text is inserted
    elseif type == "remove" then
        -- text is removed
    elseif type == "undo" then
        -- undo
    end
    on_text_change(type)
end

local on_close = Doc.on_close
function Doc:on_close()
    on_close()
end
```
