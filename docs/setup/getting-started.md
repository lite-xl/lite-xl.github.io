---
description: Install Lite XL and configure it for your use.
---

## Install

Official builds of Lite XL can be obtained from [GitHub releases].
Alternatively, many package managers also provide Lite XL for installation.
Finally, you can build Lite XL and install it directly.

- [Install from Releases]
- [Install from Package Managers]
- [Building and Installing]

The installation method should be straightforward, but some platforms may have
their own issues and workarounds. You can find a list of them [here][platform notes].

## Portable mode

Lite XL searches `(directory to lite-xl.exe)/user` for configuration,
which allows users to create portable installations that doesn't
use the user's configuration.

To create a portable installation, simply create a `user` directory
where Lite XL executable is located.


[GitHub releases]:               https://github.com/lite-xl/lite-xl/releases/latest
[Install from Releases]:         ./install-from-releases.md
[Install from Package Managers]: ./install-from-package-managers.md
[Building and Installing]:       ./building.md
[platform notes]:                ./platform-notes.md
