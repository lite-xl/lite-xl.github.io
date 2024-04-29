# Téléchargements

## Paquets binaires

Les paquets binaires sont disponibles sur la [page de versions GitHub][1].

## Installation via un gestionnaire de paquets

Autrement, vous pouvez installer lite-xl depuis le gestionnaire de
paquets de votre distribution.
**Ces paquets sont gérés par la communauté et peuvent être obsolètes.**

- [Windows][2] ([Chocolatey][3] / [Scoop][4])
- [Mac OS][5] (MacPorts)
- [Arch Linux][6] (AUR)
- [NixOS][7] (nixpkgs)
- [Fedora][8]

```sh
choco install lite-xl                                        # chocolatey
scoop bucket add extras && scoop install lite-xl             # scoop
sudo port install lite-xl                                    # macports
yay -S lite-xl                                               # or your favorite AUR helper
nix-env -i lite-xl                                           # nixos
sudo dnf install lite-xl                                     # fedora
```

## Code source

Le code source est disponible sur [GitHub][9], en téléchargeant les archives
zip ou tar, ou directement via git:

```sh
git clone https://github.com/lite-xl/lite-xl.git
```


[1]: https://github.com/lite-xl/lite-xl/releases/latest
[2]: https://github.com/microsoft/winget-cli/discussions/223#discussion-15735
[3]: https://community.chocolatey.org/packages/lite-xl
[4]: https://github.com/ScoopInstaller/Extras/blob/master/bucket/lite-xl.json
[5]: https://ports.macports.org/port/lite-xl/
[6]: https://aur.archlinux.org/packages/lite-xl-bin/
[7]: https://github.com/NixOS/nixpkgs/blob/release-21.11/pkgs/applications/editors/lite-xl/default.nix
[8]: https://src.fedoraproject.org/rpms/lite-xl
[9]: https://github.com/lite-xl/lite-xl
