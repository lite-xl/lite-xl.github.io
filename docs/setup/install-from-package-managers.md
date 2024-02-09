---
description: Learn how to install Lite XL from your distribution's package managers.
---

# Installation from Package Managers

Lite XL is available on some package managers.
Other package managers may require you to configure extra sources in order to install Lite XL.

!!! warning
    The **only official source** of Lite XL binaries are from [GitHub][1].
    Be careful when installing packages from a 3rd party.

## Linux

Lite XL is available on many distributions' package managers.
Here are some instructions on how to install Lite XL on certain distributions.

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

Packages for Arch Linux are available as 3 AUR repositories: [`lite-xl`][2], [`lite-xl-git`][3] and [`lite-xl-bin`][4].

To install, you can clone the [git repository][5] to a working directory and run `makepkg`:

```sh
git clone https://aur.archlinux.org/lite-xl.git
cd lite-xl
makepkg -si
```

Alternatively, install it via an AUR helper such as [yay][6].

### Fedora

Lite XL can be installed on Fedora 37 with the command:

```sh
dnf install lite-xl
```

A Copr also provides nightly releases.
To install it, enable the [`sentry/lite` Copr][7] and install the appropriate package.

```sh
dnf copr enable sentry/lite
dnf install lite-xl-nightly
```

### GNU Guix

Lite XL can be installed via [Guix][8] with the command:

```sh
guix install lite-xl
```

### Debian-based (via MPR)

[makedeb][9] provides an AUR-like experience to install Lite XL.

First, install [makedeb][9]:

```sh
bash -ci "$(wget -qO - 'https://shlink.makedeb.org/install')"
```

Then, clone the [git repository][10] into a working directory and run `makedeb`:

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


## Windows

Windows doesn't use package managers in general — we recommend installing Lite XL via [GitHub][1].
However, Lite XL is available in Chocolatey and Scoop.

### Chocolatey

Lite XL can be installed on [Chocolatey][11] with the following command:

```sh
choco install lite-xl
```

### Scoop

Lite XL can be installed on [Scoop][12] by installing the [Extras manifest][13] and installing the package:

```sh
scoop bucket add extras
scoop install lite-xl
```

## macOS

### MacPorts

Lite XL is available via [MacPorts][14]:

```sh
sudo port install lite-xl
```



[1]:  https://github.com/lite-xl/lite-xl/releases/latest
[2]:  https://aur.archlinux.org/packages/lite-xl
[3]:  https://aur.archlinux.org/packages/lite-xl-git
[4]:  https://aur.archlinux.org/packages/lite-xl-bin
[5]:  https://aur.archlinux.org/lite-xl.git
[6]:  https://github.com/Jguer/yay
[7]:  https://copr.fedorainfracloud.org/coprs/sentry/lite/
[8]:  https://packages.guix.gnu.org/packages/lite-xl/
[9]:  https://www.makedeb.org/
[10]: https://mpr.makedeb.org/lite-xl.git
[11]: https://community.chocolatey.org/packages/lite-xl
[12]: https://scoop.sh/#/apps?q=lite-xl
[13]: https://github.com/ScoopInstaller/Extras
[14]: https://ports.macports.org/port/lite-xl/