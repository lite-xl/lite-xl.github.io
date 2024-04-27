# Build

Once you have downloaded the source code, you can build Lite XL yourself using Meson.
In addition, the `build-packages.sh` script can be used to compile Lite XL and
create an OS-specific package for Linux, Windows or macOS.

The following libraries are required:

- freetype2
- SDL2

The following libraries are **optional**:

- libagg
- Lua 5.2

If they are not found, they will be downloaded and compiled by Meson.
Otherwise, if they are present, they will be used to compile Lite XL.

## Build Script

If you compile Lite XL yourself,
it is recommended to use the script `build-packages.sh`:

```bash
bash build-packages.sh -h
```

The script will run Meson and create a tar compressed archive with the application or,
for Windows, a zip file. Lite XL can be easily installed
by unpacking the archive in any directory of your choice.

On Windows two packages will be created, one called "portable" using the "data"
folder next to the executable and the other one using a unix-like file layout.
Both packages works correctly. The one with unix-like file layout is meant
for people using a unix-like shell and the command line.

Please note that there aren't any hard-coded directories in the executable,
so that the package can be extracted and used in any directory.

## Portable

When performing the `meson setup` command you may enable the `-Dportable=true`
option to specify whether files should be installed as in a portable application.

If `portable` is enabled, Lite XL is built to use a `data` directory placed next
to the executable.
Otherwise, Lite XL will use unix-like directory locations.
In this case, the `data` directory will be `$prefix/share/lite-xl`
and the executable will be located in `$prefix/bin`.
`$prefix` is determined when the application starts as a directory such that
`$prefix/bin` corresponds to the location of the executable.

The `user` directory does not depend on the `portable` option and will always be
`$HOME/.config/lite-xl`.
`$HOME` is determined from the corresponding environment variable.
As a special case on Windows the variable `$USERPROFILE` will be used instead.

## Linux

On Debian-based systems the required libraries and Meson can be installed
using the following commands:

```bash
# To install the required libraries:
sudo apt install libfreetype6-dev libsdl2-dev

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
you need to use diffent commands to compile and install:

```bash
meson setup --buildtype=release build
ninja -C build
ninja -C build install
```

## macOS

macOS is fully supported and a notarized app disk image is provided in the
[release page][1]. 
In addition the application can be compiled using the generic instructions given above.

## Windows MSYS2

The build environment chosen for Lite XL on Windows is [MSYS2][2].
Follow the install instructions in the link.

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
depending if the current shell is 32 or 64 bit.

[1]: https://github.com/lite-xl/lite-xl/releases/latest/
[2]: https://www.msys2.org/
