---
description: Learn about how to operate on files opened in Lite XL.
---

Lite XL stores an opened file in a `Doc`.
A `Doc` contains the file in lines (`doc.lines`), metadata
and various states, including
the syntax highlighter (`doc.highlighter`) and the undo stack.

## Creating Docs

To create a Doc, you usually create instances of it directly.
Instead, it is often easier to call `core.open_doc()`.
This function will do bookkeeping and various checks before
creating the Doc with the correct state.

```lua
function core.open_doc(filename: string): Doc end
```

The function accepts a filename and returns a Doc.

## Getting Existing Docs

To get an existing Doc, you can use