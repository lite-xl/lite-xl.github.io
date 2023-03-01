---
description: Learn how to create and call commands programmatically.
---

As explained in the User Guide, a lot of Lite XL's functionalities
are implemented as commands.

Each command has a predicate function that is run before executing the command.
If the function returns `true`, Lite XL will run the command.
The predicate function is useful to scope each command to a specific condition, such
as allowing a command to only run when the user is editing a file.

The most commonly used predicate is to check if the active view is a DocView.

```lua
local function predicate()
  return core.current_view:is(DocView)
end
```

### Adding commands

To add a command, use `command.add()`.

```lua
function command.add(predicate: (function(...: any): any) or nil,
                      commands: table(string, function(...: any): any)): none
```

The first parameter to the function is the predicate function.
This predicate function will be set for each command in the `commands` parameter.
If no predicates are required, nil can be passed.
The second parameter is a table of functions mapped to each command.

**Example:**

```lua
-- add "test:print-message" which prints a message to stdout
-- this command will be available at all times
command.add(nil, { ["test:print-message"] = function() core.log("Hello world!") end })

local function docview_predicate()
  return core.active_view:is(DocView)
end

local function print_doc_name()
  core.log("%s", core.active_view.doc.filename)
end

-- add "test:print-doc-name" which prints the name of currently opened file
-- This command will only be available if the user is editing a document.
command.add(docview_predicate, { ["test:print-doc-name"] = print_doc_name })
```


### Running commands

Users can run these commands via the command palette while
plugins can run these commands programmatically via `command.perform()`.

```lua
function command.perform(cmd: string, ...: any): boolean
```

`command.perform()` accepts a command as the first parameter.
If the command requires other parameters, it can be passed into
`command.perform()`.