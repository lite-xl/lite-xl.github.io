---
description: Learn how to install Lite XL from releases.
---

# Installation from Releases

Lite XL releases can be found on [GitHub][1].
Depending on your platform, this may be the easiest way to install
Lite XL.

## Normal versus Addons Releases

Lite XL are released in two forms — normal and addons releases.
Normal releases contain Lite XL and essential plugins
for a minimal text-editing experience;
while the addons release contains a full suite of extra plugins and
language support.

In the future, we plan to remove this confusing convention by shipping only
one variation, and allowing the user to customize their installation later.

## Windows

On Windows, Lite XL is available as an installer or a zip archive.
To use the installer, simply run it and follow the steps outlined by the installer.

To install Lite XL from a zip archive, extract it to a directory and run it directly.

??? note "Never run Lite XL directly from the zip archive."
    Lite XL requires extra files that are present in the zip archive to function.
    Running it may cause crashes or unexpected errors.

## Linux

Linux distributions usually install packages via their respective package managers.
If a package is available for your distribution, you can [install][2] it from there.

Lite XL is available as an AppImage or tarballs.
For AppImages, you can simply make it executable and run it.

??? note "If you encounter issues with the AppImage, verify whether fuse is installed."
    AppImages require FUSE to function.
    Please visit [AppImage Troubleshooting Guide][3] for details.

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

If you can't launch Lite XL from the terminal after installation, you
need to put `$HOME/.local/bin` into PATH.
Instructions may vary according to your shell,
but for bash, simply run the following line:

```sh
echo -e 'export PATH=$PATH:$HOME/.local/bin' >> $HOME/.bashrc
```

### Lite XL icon not showing on app launchers

On certain systems, you might want to run the following command to update
the cache:

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
you may want to [build][4] Lite XL yourself.



[1]: https://github.com/lite-xl/lite-xl/releases/latest
[2]: ./install-from-package-managers.md
[3]: https://docs.appimage.org/user-guide/troubleshooting/index.html#troubleshooting
[4]: ./building.md
