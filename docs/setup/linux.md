---
description: Linux-specific instructions for setting up Lite XL.
---

# Linux

## Install

The easiest way to run Lite XL on Linux is to download and run the [Lite XL AppImage][1].
Most recent Linux systems supports AppImage, but you may need to install `fuse`.

Alternatively, we provide [`tar.gz` archive][2] that can be downloaded and extracted
to a directory.

## Install via package managers

Lite XL is available on most common package managers.
A complete list is available at [Repology][3].

!!! note "These packages are maintained by the community."

### Alpine Linux

You need to enable the `testing` repository by uncommenting the relevant line in `/etc/apk/repositories`:

```sh
#/media/cdrom/apks
http://dl-cdn.alpinelinux.org/alpine/v3.16/main
#http://dl-cdn.alpinelinux.org/alpine/v3.16/community
#http://dl-cdn.alpinelinux.org/alpine/edge/main
#http://dl-cdn.alpinelinux.org/alpine/edge/community
http://dl-cdn.alpinelinux.org/alpine/edge/testing
```

Afterwards, update the package database and install Lite XL:

```sh
apk update
apk add lite-xl
```

### Arch Linux (via AUR)

Packages for Arch Linux are available as 3 AUR repositories: [`lite-xl`][4], [`lite-xl-git`][5] and [`lite-xl-bin`][6].

To install, you can clone the [git repository][7] to a working directory and run `makepkg`:

```sh
git clone https://aur.archlinux.org/lite-xl.git
cd lite-xl
makepkg -si
```

Alternatively, install it via an AUR helper such as [yay][8].

### Fedora

Lite XL can be installed on Fedora 37 with the command:

```sh
dnf install lite-xl
```

A Copr also provides nightly releases.
To install it, enable the [`sentry/lite` Copr][9] and install the appropriate package.

```sh
dnf copr enable sentry/lite
dnf install lite-xl-nightly
```

### GNU Guix

Lite XL can be installed via [Guix][10] with the command:

```sh
guix install lite-xl
```

### Debian-based (via MPR)

[makedeb][11] provides an AUR-like experience to install Lite XL.

First, install [makedeb][11]:

```sh
bash -ci "$(wget -qO - 'https://shlink.makedeb.org/install')"
```

Then, clone the [git repository][12] into a working directory and run `makedeb`:

```sh
git clone https://mpr.makedeb.org/lite-xl.git
cd lite-xl
makedeb -s
```

### Nix

Lite XL can be installed on Nix via `nix-env`.

```sh
nix-env -i lite-xl
```

### openSUSE Tumbleweed

Lite XL can be installed on openSUSE Tumbleweed via `zypper`:

```sh
zypper install lite-xl
```

### Void Linux

Lite XL can be installed on Void Linux with the following command:

```sh
xbps-install lite-xl
```

## 32-bit support

Unfortunately, Lite XL does not provide binary packages for 32-bit systems.
You may want to compile Lite XL yourself.

??? warning "32-bit version of Lite XL is not actively tested for bugs."
    Due to a lack of testers, we've only been able to test whether the code
    can compile on a 32-bit system.
    This does not mean that Lite XL may run correctly.

## Portable packages

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

## Client-side decorations

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
    ![screenshot indicating the borderless checkbox][13]{ loading=lazy }



[1]: https://github.com/lite-xl/lite-xl/releases/download/v2.1.1/LiteXL-v2.1.1-addons-x86_64.AppImage
[2]: https://github.com/lite-xl/lite-xl/releases/download/v2.1.1/lite-xl-v2.1.1-addons-linux-x86_64-portable.tar.gz
[3]: https://repology.org/project/lite-xl/versions
[4]: https://aur.archlinux.org/packages/lite-xl
[5]: https://aur.archlinux.org/packages/lite-xl-git
[6]: https://aur.archlinux.org/packages/lite-xl-bin
[7]: https://aur.archlinux.org/lite-xl.git
[8]: https://github.com/Jguer/yay
[9]: https://copr.fedorainfracloud.org/coprs/sentry/lite/
[10]: https://packages.guix.gnu.org/packages/lite-xl/
[11]: https://www.makedeb.org/
[12]: https://mpr.makedeb.org/lite-xl.git
[13]: ../assets/user-guide/settings/borderless.png