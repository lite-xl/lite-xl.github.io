---
description: Learn how to debug Lite XL with the debugger plugin,
                and other related tips.
---


## Making stdin and stdout work on Windows

Before using the interactive debugger, you will need to make sure Lite XL
is accessible from the terminal.

Due to how Windows GUI and text subsystem works, GUI subsystem programs
such as Lite XL does not open stdout by default.
To work around this, follow these steps:

=== "MSYS2/Cygwin Shell"

    Run Lite XL with the following command:
    
    ```sh
    $ lite-xl | tee /dev/null
    ```

=== "PowerShell"

    Run Lite XL with the following command:

    ```pwsh
    $ lite-xl | tee -variable null
    ```

=== "cmd.exe"

    Run Lite XL with the following command:

    ```pwsh
    $ lite-xl > NUL
    ```

## Installing lite-debugger

[lite-debugger] can be used to debug Lite XL interactively from the terminal.
This plugin is not to be confused with the [debugger] plugin,
which provides debugger integration to Lite XL projects.

There are various ways to install lite-debugger:

=== "lpm"
    
    To install lite-debugger with [lpm], run:
    ```sh
    $ lpm install lite-debugger
    ```

=== "Miq"
    
    Add `lite-debugger` to `config.plugins.miq.plugins`.
    
    ```lua
    local config = require "core.config"
    config.plugins.miq.plugins = {
    'TorchedSammy/Miq',
    'lite-debugger',
    }
    ```

    Afterwards, run `miq:install` to install the plugin.

=== "Manually"

    Download [lite-debugger] into `~/.config/lite-xl/plugins/lite-debugger.lua`.

After installation, Lite XL will print a message
indicating that the debugger is loaded.
There will also be a noticeable slowdown in terms of responsiveness,
as the plugin needs to hook into all function calls in Lua.

## Add breakpoints in your code

To start an interactive debugging session,
you need to call `#!lua command.perform "debugger:break"` to add a breakpoint.

```lua
-- mod-version:3
-- Our example plugin to showcase interactive debugging.
local command = require "core.command"

command.add("core.docview", {
    ["hello:scramble-case"] = function(dv)
        dv.doc:replace(function(text)
            local result = {}
            local cap = true
            for c in text:gmatch(".") do
                command.perform "debugger:break"
                result[#result+1] = cap and c:upper() or c:lower()
                cap = not cap
            end
            return table.concat(result)
        end)
    end
})
```
## Using the debugger

When you run `hello:scramble-case` in the command palette,
Lite XL should freeze.
A prompt will appear in the terminal:

![screenshot of the debugger prompt][debugger-prompt]{ lazy=true }

You can enter `h` to get a list of commands for debugging:

```
debugger.lua> h
  <return> => re-run last command
  c(ontinue) => continue execution
  b(reak) [[file:]function] => set breakpoint at specified function
  d(elete) [index] => remove breakpoint
  s(tep) => step forward by one line (into functions)
  n(ext) => step forward by one line (skipping over functions)
  f(inish) => step forward until exiting the current function
  u(p) => move up the stack by one frame
  d(own) => move down the stack by one frame
  w(here) [line count] => print source code around the current line
  e(val) [statement] => execute the statement
  p(rint) [expression] => execute the expression and print the result
  t(race) => print the stack trace
  l(ocals) => print the function arguments, locals and upvalues.
  h(elp) => print this message
  q(uit) => halt execution
debugger.lua>
```

Enter `w` to see the current location.

```
debugger.lua> w
 658    dbg_writeln(COLOR_YELLOW.."debugger.lua: "..COLOR_RESET.."Loaded for ".._VERSION.." (Lite-XL)")
 659
 660    command.add(nil, {
 661       ["debugger:break"] = function()
 662          dbg()
 663 =>    end,
 664    })
debugger.lua>
```

This is not where we want to be.
Enter `t` to show the current stack trace:

```
debugger.lua> t
Inspecting frame 0
   0 => /home/takase/.config/lite-xl/plugins/lite-debugger.lua:663 in field 'perform'
   1    /home/takase/gh/lite-xl/build/src/data/core/command.lua:147 in chunk at /home/takase/gh/lite-xl/build/src/data/core/command.lua:137
   2    [C]:-1 in global 'xpcall'
   3    /home/takase/gh/lite-xl/build/src/data/core/init.lua:1261 in field 'try'
   4    /home/takase/gh/lite-xl/build/src/data/core/command.lua:169 in field 'perform'
   5    /home/takase/.config/lite-xl/init.lua:86 in local 'fn'
   6    /home/takase/gh/lite-xl/build/src/data/core/doc/init.lua:538 in method 'replace_cursor'
   7    /home/takase/gh/lite-xl/build/src/data/core/doc/init.lua:560 in method 'replace'
   8    /home/takase/.config/lite-xl/init.lua:82 in field 'perform'
   9    /home/takase/gh/lite-xl/build/src/data/core/command.lua:144 in chunk at /home/takase/gh/lite-xl/build/src/data/core/command.lua:137
  10    [C]:-1 in global 'xpcall'
  11    /home/takase/gh/lite-xl/build/src/data/core/init.lua:1261 in field 'try'
  12    /home/takase/gh/lite-xl/build/src/data/core/command.lua:169 in field 'perform'
  13    /home/takase/gh/lite-xl/build/src/data/core/commands/core.lua:72 in local 'submit'
  14    /home/takase/gh/lite-xl/build/src/data/core/commandview.lua:170 in method 'submit'
  15    /home/takase/gh/lite-xl/build/src/data/core/commands/command.lua:6 in field 'perform'
  16    /home/takase/gh/lite-xl/build/src/data/core/command.lua:144 in chunk at /home/takase/gh/lite-xl/build/src/data/core/command.lua:137
  17    [C]:-1 in global 'xpcall'
  18    /home/takase/gh/lite-xl/build/src/data/core/init.lua:1261 in field 'try'
  19    /home/takase/gh/lite-xl/build/src/data/core/command.lua:169 in field 'perform'
  20    /home/takase/gh/lite-xl/build/src/data/core/keymap.lua:226 in field 'on_key_pressed'
  21    /home/takase/gh/lite-xl/build/src/data/core/init.lua:1282 in upvalue 'on_event'
  22    /home/takase/gh/lite-xl/build/src/data/plugins/macro.lua:19 in chunk at /home/takase/gh/lite-xl/build/src/data/plugins/macro.lua:18
  23    [C]:-1 in global 'xpcall'
  24    /home/takase/gh/lite-xl/build/src/data/core/init.lua:1261 in field 'try'
  25    /home/takase/gh/lite-xl/build/src/data/core/init.lua:1360 in upvalue 'core_step'
  26    /home/takase/gh/lite-xl/build/src/data/plugins/frametime.lua:14 in field 'step'
  27    /home/takase/gh/lite-xl/build/src/data/core/init.lua:1449 in chunk at /home/takase/gh/lite-xl/build/src/data/core/init.lua:1435
  28    [string "local core..."]:14 in chunk at [string "local core..."]:6
  29    [C]:-1 in global 'xpcall'
  30    [string "local core..."]:6 in chunk at [string "local core..."]:0
```

We are currently inside `lite-debugger`,
in the handler for the command `debugger:break`.
We need to enter `d` until we reach frame 5,
which is where `#!lua command.perform "debugger:break"` is called.

```
debugger.lua> d
Inspecting frame: /home/takase/gh/lite-xl/build/src/data/core/command.lua:147 in chunk at /home/takase/gh/lite-xl/build/src/data/core/command.lua:137
debugger.lua> d
Inspecting frame: /home/takase/gh/lite-xl/build/src/data/core/init.lua:1261 in field 'try'
debugger.lua> d
Inspecting frame: /home/takase/gh/lite-xl/build/src/data/core/command.lua:169 in field 'perform'
debugger.lua> d
Inspecting frame: /home/takase/.config/lite-xl/init.lua:86 in local 'fn'
debugger.lua> w
  81        ["hello:scramble-case"] = function(dv)
  82            dv.doc:replace(function(text)
  83                local result = {}
  84                local cap = true
  85                for c in text:gmatch(".") do
  86 =>                 command.perform "debugger:break"
  87                    result[#result+1] = cap and c:upper() or c:lower()
  88                    cap = not cap
  89                end
  90                return table.concat(result)
  91            end)
debugger.lua>
```

Now that we are in the correct scope, we can use `l` to print
all the local variables in the scope.

```
debugger.lua> l
  c => "-"
  cap => false
  command => {"map" = {"doc:select-to-start-of-doc" = {"predicate" = function: 0x5c6ed4fd9890, "perform" = function: 0x5c6ed4fd9770}, "status-bar:reset-items"
  ...
  result => {1 = "-"}
  text => "-- put user settings here\
-- this module will be loaded after everything else when the application starts\
..."
debugger.lua>
```

You can use `p result` to show the value of `result`.
This command also allows executing any Lua expression.

To evaluate a Lua expression without printing it, you can use `e` instead.

```
debugger.lua> p result
result => {1 = "-", 2 = "-"}
debugger.lua> p text:len()
text:len() => 3387
debugger.lua> e result[1] = "abcd"
debugger.lua> p result
result => {1 = "abcd", 2 = "-"}
debugger.lua>
```

To continue execution, use `c`.
Since `#!lua command.perform "debugger:break"` is called in a loop,
the debugger will pause until `debugger:break` is called again.

## Limitations

The debugger cannot set breakpoints by line numbers.


[lite-debugger]:   https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/lite-debugger.lua?raw=1
[debugger]:        https://github.com/adamharrison/lite-xl-ide.git
[lpm]:             https://github.com/lite-xl/lite-xl-plugin-manager
[debugger-prompt]: ../assets/developer-guide/debugging/debugger-prompt.png
