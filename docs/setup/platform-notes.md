---
description: Learn how to solve various issues with Lite XL in certain platforms.
---

## Windows

### Portable application

The installer provides a "Portable Mode" checkbox which can be used to extract Lite XL into a directory.
If this mode is enabled, the installer will not allow user to uninstall Lite XL
from the Settings / Control Panel.
Users can just delete the installation folder.

!!! note
    This is **different** from the Portable Mode mentioned in [Getting Started][1].
    The Portable Mode checkbox will not create the `user` directory,
    thus the install **will use the user's configuration**.

### 32-bit support

32-bit builds of Lite XL are provided, but they are not actively tested for bugs.
These builds has platform suffix "i386".

### Custom window decoration

Windows users may notice that the title bar (window decoration) does not follow device theme.
This is a known [upstream issue][2] related to SDL.

In the meantime, there are a few workarounds:

1. Enable the custom title bar by setting `config.borderless` to `true` in `init.lua`.
   The custom title bar will follow Lite XL's color scheme.
2. Install the [immersive-title][3] plugin.
   This approach will preserve Windows' title bar while having the correct
   appearance on theme change.

The first option can be enabled with the following steps.

=== "User Module"

    ```lua
    local config = require "core.config"
    config.borderless = true
    ```

=== "Settings UI"

    Toggle the "Borderless" checkbox under _Core_ > _User Interface_.
    ![screenshot indicating the borderless checkbox][4]{ loading=lazy }


## Linux

### 32-bit support

Unfortunately, Lite XL does not provide binary packages for 32-bit systems.
You may want to compile Lite XL yourself.

??? warning "32-bit version of Lite XL is not actively tested for bugs."
    Due to a lack of testers, we've only been able to test whether the code
    can compile on a 32-bit system.
    This does not mean that Lite XL may run correctly.

### Portable packages

Since v2.1.0, only portable packages are provided.
These packages do not follow the UNIX Filesystem Hierarchy Standard (FHS).

```
lite-xl/
  \- data/
  \- doc/
  \- lite-xl
```

To install the portable package according to the FHS, do the following:

1. Move `data/` to `/usr/share/lite-xl`.
2. Move `doc/` to `/usr/share/doc/lite-xl`
3. Move `lite-xl` to `/usr/bin/lite-xl`

### Client-side decorations

Certain Wayland desktops does not provide server-side decorations.
By default, Lite XL (SDL under the hood) will use `libdecor` to draw client-side decorations.

To work around this, set `config.borderless` to `true`.
Lite XL will draw a client-side decoration.

=== "User Module"

    ```lua
    local config = require "core.config"
    config.borderless = true
    ```

=== "Settings UI"

    Toggle the "Borderless" checkbox under _Core_ > _User Interface_.
    ![screenshot indicating the borderless checkbox][4]{ loading=lazy }


[1]: ./getting-started.md
[2]: https://github.com/libsdl-org/SDL/issues/4776
[3]: https://github.com/takase1121/lite-xl-immersive-title
[4]: ../assets/user-guide/settings/borderless.png
