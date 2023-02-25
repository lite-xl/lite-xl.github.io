---
description: Windows-specific instructions for setting up Lite XL.
---

# Windows

## Install

We provide installers and zip archives for Windows.
You can get them from [GitHub releases][1].

1. Download the [Lite XL installer][2] from the [release page][1].
2. Run the installer and install Lite XL.

Alternatively, you may download the [zip archive][3], extract it and run it directly.

## Install via package managers

Lite XL can be installed with Chocolatey and Scoop.

!!! note "These packages are maintained by the community."

### Chocolatey

Lite XL can be installed on Chocolatey with the following command:

```sh
choco install lite-xl
```

### Scoop

Lite XL can be installed on Scoop by installing the Extras manifest and installing the package:

```sh
scoop bucket add extras
scoop install lite-xl
```

## Portable application

The installer provides a "Portable Mode" checkbox which can be used to extract
Lite XL into a directory.
If this mode is enabled, the installer will not allow user to uninstall Lite XL
from the Settings / Control Panel.
Users can just delete the installation folder.

## 32-bit support

We also provide a [32-bit installer for Lite XL][3].
A [zip archive][4] is also available.

??? warning "32-bit version of Lite XL is not actively tested for bugs."
    Due to a lack of testers, we've only been able to test whether the code
    can compile on a 32-bit system.
    This does not mean that Lite XL may run correctly.

## Custom title bar

Windows users may notice that the title bar (window decoration) does not follow
device theme.
This is a known [upstream issue][5] related to SDL, so we are not planning to fix it.

In the meantime, there are two alternatives:

1. Enable custom title bar by setting `config.borderless` to `true` in `init.lua`.
   The custom title bar will follow Lite XL's color scheme.
2. Install [immersive-title][6].
   This approach will preserve Windows' title bar while having the correct
   appearance on theme change.
   However, it is a workaround to the original issue.

The first option can be enabled with the following steps.

=== "init.lua"

    ```lua
    local config = require "core.config"
    config.borderless = true
    ```

=== "Settings UI"

    Toggle the "Borderless" checkbox under _Core_ > _User Interface_.
    ![screenshot indicating the borderless checkbox][7]{ loading=lazy }



[1]: https://github.com/lite-xl/lite-xl/releases
[2]: https://github.com/lite-xl/lite-xl/releases/download/v2.1.1/LiteXL-v2.1.1-addons-x86_64-setup.exe
[3]: https://github.com/lite-xl/lite-xl/releases/download/v2.1.1/lite-xl-v2.1.1-addons-windows-x86_64.zip
[3]: https://github.com/lite-xl/lite-xl/releases/download/v2.1.1/LiteXL-v2.1.1-addons-i686-setup.exe
[4]: https://github.com/lite-xl/lite-xl/releases/download/v2.1.1/lite-xl-v2.1.1-addons-windows-i686.zip
[5]: https://github.com/libsdl-org/SDL/issues/4776
[6]: https://github.com/takase1121/lite-xl-immersive-title
[7]: ../assets/user-guide/settings/borderless.png