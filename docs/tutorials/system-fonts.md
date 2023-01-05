# Using system fonts

Lite XL does not provide a convenient way to use fonts on the system.
There is literally _different APIs for each platform we support (Windows, Linux and macOS)._
This is where [fontconfig][1] comes to our rescue. fontconfig is
installable on a lot of OSes.

Lite XL has a [fontconfig plugin][2] that we can use to find system fonts.

## Installing fontconfig

#### Windows

[mingw-w64-fontconfig][3] provides a build that can be used directly on Windows.
Download the file, extract it to somewhere and (optionally) add it to the PATH.

#### Linux

Check your distro-specific instructions.

```sh
# ubuntu / debian
apt install fontconfig
# arch
pacman -Su fontconfig
# fedora
dnf install fontconfig
...
```

#### macOS

```sh
brew install fontconfig
```

### Setting up

1. Install the plugin
2. Put this in your user module:

```lua
local fontconfig = require "plugins.fontconfig"
fontconfig.use {
	 font = { name = "sans", size = 13 * SCALE },
	 code_font = { name = "monospace", size = 13 * SCALE }
}
```

`"sans"` and `"monospace"` can be any [fontconfig syntax. (check "Font Names")][4]


Note that the font might not load immediately
(because we need to wait for `fc-match` to return.
If you want that, replace `fontconfig.use` with `fontconfig.use_blocking`.
Doing this will force Lite XL to wait for `fc-match`, which can be much slower.


[1]: https://www.freedesktop.org/wiki/Software/fontconfig/
[2]: https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/fontconfig.lua
[3]: https://github.com/takase1121/mingw-w64-fontconfig
[4]: https://www.freedesktop.org/software/fontconfig/fontconfig-user.html