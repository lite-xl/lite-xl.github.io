# Compilation

Une fois que vous avez téléchargé le code source, vous pouvez construire Lite
XL vous-même en utilisant Meson.
En outre, le script `build-packages.sh` peut être utilisé pour compiler Lite
XL et créer un paquet spécifique à un OS pour Linux, Windows ou macOS.

Les bibliothèques suivantes sont nécessaires :

- freetype2
- SDL2

Les bibliothèques suivantes sont **optionnelles**:

- libagg
- Lua 5.2

Si elles ne sont pas trouvées, elles seront téléchargées et compilées par Meson.
Sinon, si elles sont présentes, elles seront utilisées pour compiler Lite XL.

## Script de génération

Si vous compilez Lite XL vous-même, il est recommandé d'utiliser le script
`build-packages.sh` :

```bash
bash build-packages.sh -h
```

Ce script exécutera Meson et créera une archive compressée tar avec
l'application ou, pour Windows, un fichier zip. Lite XL peut facilement être
installé en extrayant l'archive dans le répertoire de votre choix.

Sur Windows deux paquets seront générés, l'un nommé "portable" utilisant
le dossier "data" à côté de l'exécutable et l'autre utilisant une organisation
de fichier à la unix.
Les deux paquets fonctionnent correctement. Celui avec l'organisation de
fichier à la unix est destiné aux personnes utilisant un shell à la unix et la ligne de commande.

Veuillez noter qu'il n'y a aucun répertoire codé en dur dans l'exécutable,
afin que le paquet puisse être extrait et utilisé dans n'importe quel répertoire.

## Portable

Lors de l'exécution de la commande `meson setup` vous pouvez activer l'option
`-Dportable=true` pour spécifier que les fichiers doivent être installés comme
dans une application portable.

Si `portable` est activé, Lite XL est construit pour utiliser le répertoire
`data` placé à côté de l'exécutable
Sinon, Lite XL utilisera des emplacements de répertoires à la unix.
Dans ce cas, le répertoire `data` sera `$prefix/share/lite-xl` et l'exécutable
se trouvera dans `$prefix/bin`.
`$prefix` est déterminé lorsque l'application démarre dans un répertoire
de telle sorte que `$prefix/bin` corresponde à l'emplacement de l'exécutable.

Le répertoire `user` ne dépend pas de l'option `portable` et sera toujours
`$HOME/.config/lite-xl`.
`$HOME` est déterminé à partir de la variable d'environnement correspondante.
Dans le cas particulier de Windows la variable `$USERPROFILE` ser utilisée à
la place.

## Linux

Sur les systèmes basés sur Debian les bibliothèques nécessaires et Meson
peuvent être installés grâce aux commandes suivantes :

```bash
# Pour installer les bibliothèques nécessaires :
sudo apt install libfreetype6-dev libsdl2-dev

# Pour installer Meson :
sudo apt install meson
# ou pip3 install --user meson
```

Pour construire Lite XL avec Meson les commandes ci-dessous peuvent être utilisées :

```bash
meson setup --buildtype=release --prefix <prefix> build
meson compile -C build
DESTDIR="$(pwd)/lite-xl" meson install --skip-subprojects -C build
```

où `<prefix>` dépend du système d'exploitation que vous utilisez :
- sur Linux c'est `/usr`
- sur macOS le paquet peut être `"/Lite XL.app"`

Si vous utilisez une version de Meson antérieure à la 0.54
vous devez utiliser des commandes différentes pour la compilation et l'installation :

```bash
meson setup --buildtype=release build
ninja -C build
ninja -C build install
```

## macOS

macOS est entièrement pris en charge et une application image disque notarisée
est fournie dans la [page de versions][1].
De plus l'e application peut être compilée en utilisant les instructions génériques indiquées ci-dessus.

## Windows MSYS2

L'environnement de développement choisi pour Lite XL sur Windows est [MSYS2][2].
Suivez les instructions d'installation dans le lien.

- Ouvrez le shell `MinGW 64-bit` ou `MinGW 32-bit` depuis le menu Démarrer.
- Mettez à jour l'installation MSYS2 avec `pacman -Syu`
- Rédemarrez le shell
- Installez les dépendances :

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

`${MINGW_PACKAGE_PREFIX}` se développe soit en `mingw-w64-i686` soit en
`mingw-w64-x86_64` selon que le shell actuel est en 32 ou 64 bits.

[1]: https://github.com/lite-xl/lite-xl/releases/latest/
[2]: https://www.msys2.org/
