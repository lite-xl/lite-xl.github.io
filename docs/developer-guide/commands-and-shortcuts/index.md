---
description: Learn how Lite XL perform tasks with commands and keyboard shortcuts.
---

# Commands and Shortcuts

Most tasks in Lite XL are performed with commands, based on a simple system of
predicates and user-defined actions.
Commands can be bound to keyboard shortcuts,
which will be run when the corresponding keys or mouse buttons are pressed.

A common idiom used in Lite XL is to listen to `View:on_mouse_moved()`
and record the item that the cursor is hovering on;
and then add a command to set the hovered item as the selected item
when the left-clicks the item.
This idiom does not require the user to listen to `View:on_mouse_click()` and allows
unifying the mouse and keyboard handling code.

## In this section

| Topic                         | Description
| -----                         | -----------
| [Commands]                    | Learn how to create and call commands programmatically.
| [Managing Keyboard Shortcuts] | Learn in detail how to add and manage keyboard shortcuts.


[Commands]: ./commands.md
[Managing Keyboard Shortcuts]: ./managing-keyboard-shortcuts.md
