# Utiliser les polices d'écriture système

lite-xl n'offre pas de moyen pratique pour utiliser des polices provenant du
système.
Il y a littéralement des API _différentes_ pour chaque plateforme que nous
prenons en charge (Windows, Linux et Mac).
C'est là que [fontconfig][1] vient à notre rescousse. fontconfig est
installable sur un grand nombre d'OS.

lite-xl a un [plugin fontconfig][2] que nous pouvons utiliser pour trouver les
polices système.

## Installation de fontconfig

#### Windows

[mingw-w64-fontconfig][3] fournit une version pouvant être utilisée directement
sur Windows.
Téléchargez le fichier, extrayez-le quelque part et (optionnellement) ajoutez-le dans le PATH.

#### Linux

Vérifiez les instructions spécifiques à votre distribution.

```sh
# ubuntu / debian
apt install fontconfig
# arch
pacman -Su fontconfig
# fedora
dnf install fontconfig
...
```

#### MacOS

```sh
brew install fontconfig
```

### Mise en place

1. Installez le plugin
2. Mettez-le dans votre module utilisateur :

```lua
local fontconfig = require "plugins.fontconfig"
fontconfig.use {
	 font = { name = "sans", size = 13 * SCALE },
	 code_font = { name = "monospace", size = 13 * SCALE }
}
```

`"sans"` et `"monospace"` peuvent être n'importe quelle [syntaxe de fontconfig. (voir "Font Names")][4]

Notez que la police peut ne pas se charger immédiatement (car nous devons
attendre que `fc-match` renvoie une valeur).
Si c'est ce que vous souhaitez, remplacez `fontconfig.use` par `fontconfig.use_blocking`.
Faire ceci forcera lite-xl à attendre `fc-match`, ce qui peut être plus lent.


[1]: https://www.freedesktop.org/wiki/Software/fontconfig/
[2]: https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/fontconfig.lua
[3]: https://github.com/takase1121/mingw-w64-fontconfig
[4]: https://www.freedesktop.org/software/fontconfig/fontconfig-user.html
