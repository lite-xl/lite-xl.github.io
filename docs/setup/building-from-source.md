---
description: Learn how to build Lite XL on your machine.
---

# Build and Installation

Once you have downloaded the source code, you can build Lite XL using [Meson].
In addition, the `build-packages.sh` script can be used to compile Lite XL and
create an OS-specific package for Linux, Windows or macOS.

The following libraries are required:

- [Lua 5.4]
- [SDL2]
- [FreeType]
- [PCRE2]

If they are not found, they will be downloaded and compiled by Meson.
Otherwise, if they are present, they will be used to compile Lite XL.

## Build Script

If you compile Lite XL yourself,
it is recommended to use `build-packages.sh`:

```bash
bash build-packages.sh -h
```

The script will run Meson and create an archive with the application.
Lite XL can be easily installed by unpacking the archive in any directory of your choice.

On Windows two packages will be created,
one called "portable" using the `data` folder next to the executable
and the other one using a Unix-like file layout.
The portable version conforms to the directory structure of normal Windows programs
while the Unix-like file layout is meant for a Unix-like environment.

Lite XL does not hard-code any directories and instead relies on environment variables.
This allows the package to be run in any directory.

## Portable

When running `meson setup` you may specify `-Dportable=true`
to install Lite XL as a portable application.

Lite XL needs the `data` directory to run properly.
When `portable` is enabled, Lite XL will use the `data` directory placed next to the executable.
Otherwise, Lite XL will use Unix-like directory locations.
It will use `$prefix/share/lite-xl` for `data` and the executable will be located in `$prefix/bin`.
`$prefix` is determined when the application starts such that
`$prefix/bin` corresponds to the location of the executable.

The `user` directory does not depend on the `portable` option
and will always be `$HOME/.config/lite-xl`.
On Windows, `$USERPROFILE` will be used instead of `$HOME`.

## Linux

On Debian-based systems the dependencies can be installed using the following commands:

```bash
# To install the required libraries:
sudo apt install libfreetype6-dev libsdl2-dev libpcre2-dev liblua5.4-dev

# To install Meson:
sudo apt install meson
# or pip3 install --user meson
```

To build Lite XL with Meson the commands below can be used:

```bash
meson setup --buildtype=release --prefix <prefix> build
meson compile -C build
DESTDIR="$(pwd)/lite-xl" meson install --skip-subprojects -C build
```

where `<prefix>` depends on the OS you are using:
- on Linux is `/usr`
- on macOS application bundle can be `"/Lite XL.app"`

If you are using a version of Meson below 0.54
you need to use different commands to compile and install:

```bash
meson setup --buildtype=release build
ninja -C build
ninja -C build install
```

## macOS

macOS is fully supported and a notarized app disk image is provided in [GitHub Releases].
In addition, the application can be compiled using the generic instructions
given above.

## Windows MSYS2

The build environment chosen for Lite XL on Windows is [MSYS2].
Follow the installation instructions in the link.

- Open `MinGW 64-bit` or `MinGW 32-bit` shell from the start menu.
- Update the MSYS2 installation with `pacman -Syu`
- Restart the shell
- Install the dependencies:

```sh
pacman -S \
  ${MINGW_PACKAGE_PREFIX}-freetype \
  ${MINGW_PACKAGE_PREFIX}-gcc \
  ${MINGW_PACKAGE_PREFIX}-ninja \
  ${MINGW_PACKAGE_PREFIX}-pcre2 \
  ${MINGW_PACKAGE_PREFIX}-pkg-config \
  ${MINGW_PACKAGE_PREFIX}-python-pip \
  ${MINGW_PACKAGE_PREFIX}-SDL2
pip3 install meson
```

`${MINGW_PACKAGE_PREFIX}` expands either to `mingw-w64-i686` or `mingw-w64-x86_64`
depending on the current MSYS2 shell used.
You can also use [pacboy] with the `:p` suffix.


[Meson]:           https://mesonbuild.com/
[Lua 5.4]:         https://lua.org/versions.html#5.4
[SDL2]:            https://www.libsdl.org/
[FreeType]:        https://freetype.org/
[PCRE2]:           https://www.pcre.org/
[GitHub Releases]: https://github.com/lite-xl/lite-xl/releases/latest/
[MSYS2]:           https://www.msys2.org/
[pacboy]:          https://www.msys2.org/docs/package-naming/#avoiding-writing-long-package-names
