---
description: Learn how to install Lite XL.
---

To get started, grab a release of Lite XL.
All the files are available on [GitHub], and some [package managers] provide packages for Lite XL.

<div class="grid cards" markdown>

-   :simple-windows:{ .lg .middle } **Windows**
    
    For Windows 7 Service Pack 2 and above.

    - [64-bit Installer][windows-x86_64-installer]
    - [64-bit ZIP][windows-x86_64-zip]
    - [32-bit Installer][windows-i686-installer]
    - [32-bit ZIP][windows-i686-zip]

    [:octicons-arrow-right-24: Installation Instructions](#windows)

-   :simple-linux:{ .lg .middle } **Linux**

    For Ubuntu 18.04 and above.

    - [64-bit AppImage][linux-x86_64-appimage]
    - [64-bit tarball][linux-x86_64-tar]
    - .
    { style="visibility:hidden" }
    - .
    { style="visibility:hidden" }

    [:octicons-arrow-right-24: Installation Instructions](#linux)

-   :simple-apple:{ .lg .middle } **macOS**

    For OSX El Capitan and above.

    - [Intel Mac DMG][macos-x86_64-dmg]
    - [Apple Silicon Mac DMG][macos-aarch64-dmg]
    - [Universal DMG][macos-universal-dmg]
    - .
    { style="visibility:hidden" }

    [:octicons-arrow-right-24: Installation Instructions](#macos)

-   :material-code-tags:{ .lg .middle } **Source Code**
    
    [Meson] and a C11 compiler needed.

    - [Source tarball][source-tar]
    - [Source ZIP][source-zip]
    - .
    { style="visibility:hidden" }
    - .
    { style="visibility:hidden" }

    [:octicons-arrow-right-24: Build Instructions][build]

</div>

## Base and Addons Packages

Since Lite XL v2.1.0, we provide two releases per platform —
the base and addons packages.
The base release contains a minimal release of Lite XL and essential plugins,
while the addons package contains a full suite of plugins and syntax-highlighting support
out-of-the-box.

Most users should choose the addons package as it provides most features out-of-the-box.
However, if you plan to customize Lite XL from scratch, the base release is for you.

!!! tip "The addons package is going away."
    We know that this dual-package convention is confusing,
    so we are working on [lpm] to enable users to customize their plugins on first launch.

## Windows

On Windows, Lite XL is available as an installer or a zip archive.
To use the installer, simply run it and follow the steps outlined by the installer.

To install Lite XL from a zip archive, extract it to a directory and run it directly.

??? tip "Never run Lite XL directly from the zip archive."
    Lite XL requires extra files that are present in the zip archive to function.
    Running it may cause crashes or unexpected errors.

## Linux

Linux distributions usually install packages via their respective package managers.
If a package is available for your distribution, you can [install][package managers] it from there.

Lite XL is available as an AppImage or tarballs.
For AppImages, you can simply make it executable and run it.

??? tip "If you encounter issues with the AppImage, verify whether fuse is installed."
    AppImages require FUSE to function.
    Please visit [AppImage Troubleshooting Guide][appimage-troubleshoot] for details.

To install Lite XL from a tarball, you should extract it to a temporary directory
and move each files into place.
For instance:

```sh
tar -xzf <file>
cd lite-xl

# to run Lite XL without installing, simply do the following:
# ./lite-xl

# remove previous installation files
rm -rf $HOME/.local/share/lite-xl $HOME/.local/bin/lite-xl
mkdir -p $HOME/.local/bin && cp lite-xl $HOME/.local/bin
mkdir -p $HOME/.local/share/lite-xl && cp -r data/* $HOME/.local/share/lite-xl
```

You may encounter older releases that has the files laid out in the correct
directories (e.g. `bin`, `share`); in that case copying them to your installation
directory (`$HOME/.local` or `/usr`) is sufficient.

### Adding Lite XL to PATH

If you can't launch Lite XL from the terminal after installation,
you need to put `$HOME/.local/bin` into PATH.
Instructions may vary according to your shell, but for bash, simply run the following line:

```sh
echo -e 'export PATH=$PATH:$HOME/.local/bin' >> $HOME/.bashrc
```

### Lite XL icon not showing on app launchers

On certain systems, you might want to run the following command to update the cache:

```sh
xdg-desktop-menu forceupdate
```

## macOS

Installation on macOS is fairly straightforward — we provide DMG files that
you can mount and drag-and-drop Lite XL into your Applications folder.

For older versions of Lite XL (before v2.1.2),
you will need to clear App attributes from the application to launch it.
To do so,  you need to run the following command:

```sh
$ xattr -cr /Applications/Lite\ XL.app
```

For releases v2.1.2 and above, you just need to right-click on Lite XL
in Finder and click "Open". If this is your first time launching Lite XL,
macOS will display a prompt. Click "OK" and the Lite XL will launch.

## Other Platforms

Lite XL does not produce binary releases for other platforms.
To run the editor in other platforms,
you may want to [build] Lite XL yourself.

## Portable mode

Lite XL searches `(directory to lite-xl.exe)/user` for configuration,
which allows users to create portable installations that doesn't
use the user's configuration.

To create a portable installation, simply create a `user` directory
where Lite XL executable is located.

## Issues and workarounds

Lite XL may have issues on certain platforms that can be worked around
by the user. A list of issues and workarounds are documented [here][issues].


<!-- LTeX: enabled=false -->
{% set release_url = "https://github.com/lite-xl/lite-xl/releases/download/%s" | format(lite_xl_version) %}
[GitHub]:                   https://github.com/lite-xl/lite-xl/releases/latest
[package managers]:         ./install-from-package-managers.md
[windows-x86_64-installer]: {{ release_url }}/lite-xl-{{ lite_xl_version }}-addons-windows-x86_64.zip
[windows-x86_64-zip]:       {{ release_url }}/lite-xl-{{ lite_xl_version }}-addons-windows-x86_64.zip
[windows-i686-installer]:   {{ release_url }}/LiteXL-{{ lite_xl_version }}-addons-i686-setup.exe
[windows-i686-zip]:         {{ release_url }}/lite-xl-{{ lite_xl_version }}-addons-windows-i686.zip
[linux-x86_64-appimage]:    {{ release_url }}/LiteXL-{{ lite_xl_version }}-addons-x86_64.AppImage
[linux-x86_64-tar]:         {{ release_url }}/lite-xl-{{ lite_xl_version }}-addons-linux-x86_64-portable.tar.gz
[macos-x86_64-dmg]:         {{ release_url }}/lite-xl-{{ lite_xl_version }}-addons-macos-x86_64.dmg
[macos-aarch64-dmg]:        {{ release_url }}/lite-xl-{{ lite_xl_version }}-addons-macos-arm64.dmg
[macos-universal-dmg]:      {{ release_url }}/lite-xl-{{ lite_xl_version }}-addons-macos-universal.dmg
[Meson]:                    https://mesonbuild.com/
[source-tar]:               https://github.com/lite-xl/lite-xl/archive/refs/tags/{{ lite_xl_version }}.tar.gz
[source-zip]:               https://github.com/lite-xl/lite-xl/archive/refs/tags/{{ lite_xl_version }}.zip
[build]:                    ./building-from-source.md
[lpm]:                      https://github.com/lite-xl/lite-xl-plugin-manager
[appimage-troubleshooting]: https://docs.appimage.org/user-guide/troubleshooting/index.html#troubleshooting
[issues]:                   ./platform-notes.md
