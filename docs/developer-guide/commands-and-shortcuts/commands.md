---
description: Learn how to create and call commands programmatically in Lite XL.
---

As explained in the User Guide, a lot of Lite XL's functionalities are implemented as commands.

Each command has a predicate — a condition to check if Lite XL should run the command.
The predicate will return a boolean and other values to be consumed by the command function.

The simplest command is a class.
This tells Lite XL to check whether the current view is an instance of a class.
For instance, one can pass `DocView` as a predicate so that the command only runs if the user
is editing a document.

A simpler form of the predicate above is a string that specifies the module to import.
Lite XL will import the module and checks whether the current view is an instance of the module.
To simplify our previous example, we can simply pass `core.docview` as a predicate to avoid
importing `DocView` ourselves.

The string predicate also supports strict checking — when the module name ends with `!`,
Lite XL will check whether the current view is an instance of the class and not it's child classes.
For instance, passing `core.view` will match `DocView` as well as `CommandView`, but passing `core.view!`
will only match `View` and not `DocView`.

The class and string predicates returns a boolean, the current view and other values passed into the predicate.

Lastly, the predicate could also be a function.
This function accepts a variable number of arguments, pass through `command.add()` and returns a boolean
and other values.
If the function returns true, the command will be executed.
Other values are passed into the command function as arguments.
For instance, we can create a predicate like this instead of passing `DocView` as a predicate:

```lua
local function predicate()
  return core.current_view:is(DocView)
end
```

## Adding commands

To add a command, use `command.add()`.

```lua
local type function Predicate(any...): boolean

function command.add(predicate: Predicate | string | Object,
                      commands: {string, Predicate}): () end
```

The first argument to `command.add()` is the predicate.
This predicate is set for each command passed to `command.add()`.
If no predicates are required, `nil` can be passed.
The second parameter is a table of functions mapped to each command.

**Example:**

```lua
local command = require "core.command"
local DocView = require "core.docview"

-- add "test:print-message" which prints a message to stdout
-- this command will be available at all times
command.add(nil, { ["test:print-message"] = function() core.log("Hello world!") end })

-- a predicate function
local function docview_predicate(custom_msg)
  return core.active_view:is(DocView), core.active_view, true, custom_msg
end

local function print_doc_name(dv, custom_predicate, custom_msg)
  if not custom_msg then
    custom_msg = custom_predicate and "custom predicate used!: %s" or "name: %s"
  end
  core.log(custom_msg, dv.doc.filename)
end

-- add "test:print-doc-name" which prints the name of currently opened file
-- This command will only be available if the user is editing a document.
-- this will log "custom predicate used!: <filename>"
command.add(docview_predicate, { ["test:print-doc-name"] = print_doc_name })

-- the line above can be simplified into this
-- this will log "name: <filename>"
command.add(DocView, { ["test:print-doc-name"] = print_doc_name })

-- the line above can be simplified into this, removing a require
-- this will log "name: <filename>"
command.add("core.docview", { ["test:print-doc-name"] = print_doc_name })

-- if you have subclasses of DocView and don't want to match them,
-- append a exclamation mark at the end.
-- this will log "name: <filename>"
command.add("core.docview!", { ["test:print-doc-name"] = print_doc_name })
```

## Running commands

Users can run these commands via the command palette while plugins can run these commands programmatically
via `command.perform()`.

If you want to check whether a command can run without running the command,
(the command exists and the predicate passed), you can use `command.is_valid()`.

```lua
function command.perform(cmd: string, ...: any): boolean end
function command.is_valid(cmd: string, ...: any): boolean end
```

`command.perform()` accepts a command as the first parameter.
If the command requires other parameters, it can be passed into `command.perform()`.
If a command is found and executed successfully, the function returns `true`.

**Example:**

```lua
local command = require "core.command"

-- open the command prompt
command.perform "core:find-command"

-- assuming we've run the code in the section above,
-- we can try passing a custom message via command:perform!
command.perform("test:print-doc-name", "custom message! %s")

-- command palette should be accessible all the time
-- prints true
print(command.is_valid "core:find-command")
```

## Utility functions

To get a prettified name of a command, shown in the command palette, use `command.prettify_name()`.

```lua
function command.prettify_name(name: string): string end
```

The function accepts a command-like string and returns a prettified command string.
All the dashes are replaced with spaces and the first letter of all words are capitalized.
