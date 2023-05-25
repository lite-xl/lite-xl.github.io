---
description: Learn about basic operations in Lite XL.
---

## Opening files

Lite XL comes with a file browser by default.
You can open, rename, move and delete files with it.
Right-clicking on a file or folder will show more options.

Other than that, you can also open files with ++ctrl+p++.
This opens a fuzzy finder with a list of project files.

![Opening a file with the fuzzy finder][1]{ loading=lazy }

## Commands

Most of Lite XL's functionalities are implemented as commands and
exposed by the command palette.
The command palette is bound to ++ctrl+shift+p++ by default and is
used to enter commands and execute them.

The command palette supports fuzzy matching, so you don't need to enter
the full name of the command. For instance, to create a new file, you can
type `new doc` and the correct command `Core: New Doc` will show up as
the first choice. You can press ++up++ or ++down++ to select other commands.
If a command is bound to a key shortcut, it will be shown on the right.

![Command palette in action][2]{ loading=lazy }

## Keyboard shortcuts

All keyboard shortcuts are handled by the `core.keymap` module.
A key binding maps a "stroke" (e.g. ++ctrl+q++) to one or more commands
(e.g. `core:quit`).
When the shortcut is pressed Lite XL will iterate each command
assigned to that key and run the *predicate function* for that command — if the
predicate passes it stops iterating and runs the command.

A new mapping can be added by your user module as follows:

```lua
local keymap = require "core.keymap"
keymap.add { ["ctrl+q"] = "core:quit" }
```

A list of default mappings can be viewed [here][mapping].

## Multiple selections (multiple cursors)

Lite XL supports multiple cursors to edit multiple lines at once.
You insert more cursors by ++ctrl+left-button++.
To insert cursors upwards or downwards, use ++ctrl+shift+up++
or ++ctrl+shift+down++.

![Placing and editing text with multiple cursors][3]{ loading=lazy }

## Find and replace

To find a certain word, you can use ++ctrl+f++.
This will open a prompt where you can find text in the document.
After entering the text, you can press enter to find the first
match.
The matched text will be selected.
To find the next match, press ++f3++

By default, Lite XL uses case-insensitive search.
Input such as `Test` will match either `Test` or `test`.
To toggle case-sensitive search, press ++ctrl+i++.

Lite XL also supports searching with regular expressions.
This feature can be enabled by pressing ++ctrl+shift+i++.
This mode can be used in conjunction with case-sensitive search.

To find and replace text, press ++ctrl+r++.
Lite XL will prompt you for text to replace and the replacement
text. Afterwards, it will replace all occurrences of the text.

![The find text prompt][4]{ loading=lazy }

## Project search

Finding text across multiple files can be useful.
To do this in Lite XL, press ++ctrl+shift+f++.
You can then enter the text to find and press enter.
Lite XL will open a new tab to display all the search results.
To open the file containing the match, you can click the entries.

Project search also supports case-sensitive search and
regular expressions with the same keyboard shortcuts.
`project-search:fuzzy-find` allows you to search the project
for similar words.

Lite XL does not support find and replace text across a project.

![Project search result tab][5]{ loading=lazy }

## Line endings

Some application may require a specific type of line ending.
To change the line ending of a file, you can use the command
`doc:toggle-line-ending` or press the rightmost entry on
the StatusView.
This should toggle between LF and CRLF which corresponds to
Unix and Windows style line endings.

![Button to change line endings][6]{ loading=lazy }

## Indentation

Lite XL should automatically detect the indentation
of the current file and apply it when pressing ++tab++.
However, you can change the indentation size by left-clicking
the 4th entry on the right of the StatusView.
You can also change the type of the indentation by right-clicking
the entry.
The settings will not apply to existing text.

![Changing the indentation of the file][7]{ loading=lazy }

## Projects

Lite XL centers around the concept of projects — a project contains your code
and project-specific configuration.
A project contains at least one project directory.
Project directories are where your code is stored.

To use open a directory as a project, the directory name can be passed
as a command-line argument or the directory can be dragged onto
either the executable or a running instance.
Once loaded, the project can be changed using the command
`core:change-project-folder`.
The command will close all the documents currently opened
and switch to the new project.
If you want to open a project in a new window,
the command `core:open-project-folder` will open a new editor window
with the selected project.

Projects may contain multiple directories.
To add a directory to the current project,
you can use the command `core:add-directory`.
Once the directory is added to the project, you can browse its file on the
file browser and fuzzy finder.

Lite XL will automatically save opened files and directories and restore them
when you restart the editor.



[1]: ../assets/user-guide/opening-files.gif
[2]: ../assets/user-guide/command-palette.gif
[3]: ../assets/user-guide/multi-cursor.gif
[4]: ../assets/user-guide/find.png
[5]: ../assets/user-guide/project-search.png
[6]: ../assets/user-guide/line-endings.png
[7]: ../assets/user-guide/indent.png

[mapping]: ../keymap