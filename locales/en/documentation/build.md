# Build

Once you have downloaded the source code, you can build Lite XL yourself using Meson.
In addition, the `build.sh` script can be used to compile Lite XL with some
level of customization.

The following dependencies are required:

- Meson (>=0.63)
- Ninja
- GCC / Clang / MSVC
- Bash (installed from brew on macOS)

The following libraries are **optional**:

- FreeType2
- SDL2
- PCRE2
- Lua 5.4

If they are not found, they will be downloaded and compiled by Meson.
Otherwise, if they are present, they will be used to compile Lite XL.

On Linux, you may need to install other dependencies to compile
the SDL2 X11 / Wayland backend:

- `libX11-devel`
- `libXi-devel`
- `libXcursor-devel`
- `libxkbcommon-devel`
- `libXrandr-devel`
- `wayland-devel`
- `wayland-protocols-devel`
- `dbus-devel`
- `ibus-devel`

These dependencies can also be installed as `libsdl2-dev` on Debian-based
distros and `SDL2-devel` on CentOS / RHEL-based distros and Fedora.

We recommend using [lite-xl-build-box][1] as it provides a containerized Linux
environment specifically for compiling Lite XL.

## Build Script

You can use `scripts/build.sh` to compile Lite XL yourself.

```sh
$ bash build.sh --help
# Usage: scripts/build.sh <OPTIONS>
# 
# Available options:
# 
# -b --builddir DIRNAME         Sets the name of the build directory (not path).
#                               Default: 'build-x86_64-linux'.
#    --debug                    Debug this script.
# -f --forcefallback            Force to build dependencies statically.
# -h --help                     Show this help and exit.
# -d --debug-build              Builds a debug build.
# -p --prefix PREFIX            Install directory prefix. Default: '/'.
# -B --bundle                   Create an App bundle (macOS only)
# -A --addons                   Add in addons
# -P --portable                 Create a portable binary package.
# -r --reconfigure              Tries to reuse the meson build directory, if possible.
#                               Default: Deletes the build directory and recreates it.
# -O --pgo                      Use profile guided optimizations (pgo).
#                               macOS: disabled when used with --bundle,
#                               Windows: Implicit being the only option.
#    --cross-platform PLATFORM  Cross compile for this platform.
#                               The script will find the appropriate
#                               cross file in 'resources/cross'.
#    --cross-arch ARCH          Cross compile for this architecture.
#                               The script will find the appropriate
#                               cross file in 'resources/cross'.
#    --cross-file CROSS_FILE    Cross compile with the given cross file.
```

The script will run Meson and compile Lite XL.

To create platform-dependent packages that can be installed on your machine,
you should check out the various `scripts/package-*.sh` scripts.

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
sudo apt install libsdl2-dev

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
[release page][2]. 
In addition the application can be compiled using the generic instructions given above.

## Windows MSYS2

The build environment chosen for Lite XL on Windows is [MSYS2][3].
Follow the install instructions in the link.

- Open `MinGW 64-bit` or `MinGW 32-bit` shell from the start menu.
- Update the MSYS2 installation with `pacman -Syu`
- Restart the shell
- Install the dependencies:

```sh
pacman -S \
  git \
  zip \
  patch \
  ${MINGW_PACKAGE_PREFIX}-gcc \
  ${MINGW_PACKAGE_PREFIX}-ninja \
  ${MINGW_PACKAGE_PREFIX}-meson \
  ${MINGW_PACKAGE_PREFIX}-ca-certificates \
  ${MINGW_PACKAGE_PREFIX}-pkg-config
```

`${MINGW_PACKAGE_PREFIX}` expands either to `mingw-w64-i686` or `mingw-w64-x86_64`
depending if the current shell is 32 or 64 bit.

[1]: https://github.com/lite-xl/lite-xl-build-box
[2]: https://github.com/lite-xl/lite-xl/releases/latest/
[3]: https://www.msys2.org/