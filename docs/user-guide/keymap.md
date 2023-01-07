# Keymap

Lite XL uses a keymap to map shortcut keys to commands.
Users can add, remove and modify keybindings via the `keymap` module.

## Adding a keybind

Users assign a keyboard shortcut with `keymap.add_direct()` or
`keymap.add()`.

=== "init.lua"

    For example, to bind ++ctrl+m++ to move the cursor backwards and then
    upwards, do:

    ```lua
    local keymap = require "core.keymap"
    keymap.add {
      ["ctrl+m"] = "doc:move-to-previous-char"
    }
    keymap.add {
      ["ctrl+m"] = "doc:move-to-previous-line"
    }
    ```

    Lite XL will automatically execute both commands in the order that
    they're added.

    Alternatively, to override a keybind completely, add `true` on the second
    parameter of `keybind.add()`.

    ```lua
    local keymap = require "core.keymap"
    keymap.add {
      ["ctrl+m"] = "doc:move-to-previous-char"
    }
    keymap.add({
      ["ctrl+m"] = "doc:move-to-previous-line"
    }, true)
    ```

    This will cause Lite XL to only run `core:move-to-previous-line` when
    ++ctrl+m++ is pressed.

=== "Settings UI"

    Navigate to the _Keybindings_ tab.
    ![Screenshot showing the keybindings tab][1]{ loading=lazy }

    Scroll until you find the entry containing the command you want to bind to
    and click on it.
    In this example, we pick `doc:move-to-previous-char`.

    To add a keybind, press the "Add" and press the key combination
    that you want to bind to. Afterwards, press "Save".

    ![Screenshot showing the keybind changer][2]{ loading=lazy }

    If the keybind is set properly, you will see the updated keybinds
    on the "Bindings" section at the right.
    ![Screenshot showing the changed keybinds][3]{ loading=lazy }

    To replace previous keybinds, simply delete any existing keybinds via
    the "Remove" button, then add the desired keybind.

## Unbinding a keybinding

Users can unbind keybindings by using `keymap.unbind()`.

=== "init.lua"

    In this example, we will unbind the previously bound ++ctrl+m++.

    ```lua
    local keymap = require "core.keymap"
    keymap.unbind("ctrl+m", "doc:move-to-previous-line")
    keymap.unbind("ctrl+m", "doc:move-to-previous-char")
    ```

    This will unbind the two commands from ++ctrl+m++.

    Alternatively, to unbind all commands from ++ctrl+m++, you can omit
    the second parameter to `keymap.unbind()`.

    ```lua
    local keymap = require "core.keymap"
    keymap.unbind("ctrl+m", "doc:move-to-previous-line")
    keymap.unbind("ctrl+m", "doc:move-to-previous-char")
    ```

=== "Settings UI"

    Navigate to the _Keybindings_ tab.
    ![Screenshot showing the keybindings tab][1]{ loading=lazy }

    Scroll until you find the entry containing the command you want to bind to
    and click on it.
    In this example, we pick `doc:move-to-previous-char`.

    To remove a keybind, select the keybind you want to remove and press
    the "Remove" button. Afterwards, press the "Save" button to save the changes.
    ![Screenshot showing the keybind changer][4]{ loading=lazy }


    The UI should update and show the keybind has been removed.
    ![Screenshot showing the removed keybinds][5]{ loading=lazy }

## Default keybindings

These are the default keybindings on non-macOS platforms:

| Keys      | Commands |
| --------- | -------- |
{%- for keybind, commands in keymap.items() %}
| ++{{ keybind }}++ | {% for c in commands %}`{{ c }}`{% if not loop.last %}, {% endif %}{% endfor %}
{%- endfor %}






[1]: ../assets/settings/keybinds/keybinds.png
[2]: ../assets/settings/keybinds/keybind-add-dialog.png
[3]: ../assets/settings/keybinds/keybind-add-after.png
[4]: ../assets/settings/keybinds/keybind-remove-dialog.png
[5]: ../assets/settings/keybinds/keybind-remove-after.png