---
description: Learn how to build Lite XL on your machine.
---

# Build and Installation

Once you have downloaded the source code, you can build Lite XL using [Meson].
In addition, the `scripts/build.sh` script can be used to compile Lite XL and
create an OS-specific directory structure for Linux, Windows or macOS.

The following tools are required:

- [Meson] (version 0.63 and above)
- [Ninja]

The following libraries can be installed, but optional:

- [Lua 5.4]
- [SDL2]
- [FreeType]
- [PCRE2]

If they are not found, they will be downloaded and compiled by Meson.
Otherwise, if they are present, they will be used to compile Lite XL.

## Build Script

If you compile Lite XL yourself,
it is recommended to use `scripts/build.sh`:

```sh
$ bash scripts/build.sh --help

Usage: scripts/build.sh <OPTIONS>

Available options:

-b --builddir DIRNAME         Sets the name of the build directory (not path).
                              Default: 'build-x86_64-linux'.
   --debug                    Debug this script.
-f --forcefallback            Force to build dependencies statically.
-h --help                     Show this help and exit.
-d --debug-build              Builds a debug build.
-p --prefix PREFIX            Install directory prefix. Default: '/'.
-B --bundle                   Create an App bundle (macOS only)
-A --addons                   Install extra plugins.
                              Default: If specified, install the welcome plugin.
                              An comma-separated list can be specified after this flag
                              to specify a list of plugins to install.
                              If this option is not specified, no extra plugins will be installed.
-P --portable                 Create a portable binary package.
-r --reconfigure              Tries to reuse the meson build directory, if possible.
                              Default: Deletes the build directory and recreates it.
-O --pgo                      Use profile guided optimizations (pgo).
                              macOS: disabled when used with --bundle,
                              Windows: Implicit being the only option.
   --cross-platform PLATFORM  Cross compile for this platform.
                              The script will find the appropriate
                              cross file in 'resources/cross'.
   --cross-arch ARCH          Cross compile for this architecture.
                              The script will find the appropriate
                              cross file in 'resources/cross'.
   --cross-file CROSS_FILE    Cross compile with the given cross file.

```

The script will run Meson and create a directory with the application.
You can copy, compress or symlink the directory, or run Lite XL straight from it.

Lite XL supports two directory structures — portable or a Unix-like layout.
When the portable layout is used, all the Lua files needed to run Lite XL must be
present in a directory called `data` next to the executable file.
The Unix-like layout separates the executable and the Lua files into `bin` and `share`
directories, which can be installed on Unix-like environments easily.

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
sudo apt install python3 python3-pip libsdl2-dev

# To install Meson and Ninja
pip3 install meson ninja
```

To build Lite XL with Meson the commands below can be used:

```bash
meson setup --buildtype=release --prefix <prefix> build
meson compile -C build
meson install --destdir "$(pwd)/lite-xl" --skip-subprojects -C build
```

where `<prefix>` depends on the OS you are using:
- on Linux is `/usr`
- on macOS application bundle can be `"/Lite XL.app"`

### Docker

[lite-xl-build-box] provides a containerized Linux environment that is used to produce
official Linux distributions of Lite XL.

Run the following commands in the Lite XL source directory:

```sh
docker pull ghcr.io/lite-xl/lite-xl-build-box-manylinux:v3
docker run --rm -t -v .:/lite-xl ghcr.io/lite-xl/lite-xl-build-box-manylinux:v3 \
  bash -c 'cd /lite-xl; bash scripts/build.sh'
```

## macOS

macOS is fully supported, and an app disk image is provided in [GitHub Releases].
Due to a lack of support from Apple to open-source software such as Lite XL,
official Lite XL releases are self-signed with an ad-hoc signature, which requires extra steps to run.
In addition, the application can be compiled using the generic instructions
given above.

## Windows MSYS2

The build environment chosen for Lite XL on Windows is [MSYS2].
Follow the installation instructions in the link.

- Open `MinGW 64-bit`, `MinGW 32-bit` or `UCRT 64-bit` shell from the start menu.
- Update the MSYS2 installation with `pacman -Syu`
- Restart the shell
- Install the dependencies:

```sh
pacman -S \
  ${MINGW_PACKAGE_PREFIX}-gcc \
  ${MINGW_PACKAGE_PREFIX}-ninja \
  ${MINGW_PACKAGE_PREFIX}-meson \
  ${MINGW_PACKAGE_PREFIX}-pkg-config \
  ${MINGW_PACKAGE_PREFIX}-ca-certificates
```

- Build Lite XL with the [instructions above](#build-script).

`${MINGW_PACKAGE_PREFIX}` expands either to `mingw-w64-i686` or `mingw-w64-x86_64`
depending on the current MSYS2 shell used.
You can also use [pacboy] with the `:p` suffix.


[Meson]:             https://mesonbuild.com/
[Ninja]:             https://ninja-build.org
[Lua 5.4]:           https://lua.org/versions.html#5.4
[SDL2]:              https://www.libsdl.org/
[FreeType]:          https://freetype.org/
[PCRE2]:             https://www.pcre.org/
[GitHub Releases]:   https://github.com/lite-xl/lite-xl/releases/latest/
[lite-xl-build-box]: https://github.com/lite-xl/lite-xl-build-box
[MSYS2]:             https://www.msys2.org/
[pacboy]:            https://www.msys2.org/docs/package-naming/#avoiding-writing-long-package-names
