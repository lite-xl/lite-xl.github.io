# Fonctionnalités

Actuellement, Lite XL offre beaucoup de fonctionnalités natives.

## Multiplateforme

Nous prenons actuellement en charge Windows, Linux et MacOS (et aussi l'affichage Retina).

## Léger

LiteXL occupe actuellement 3 Mo de stockage et utilise environ 10 Mo de RAM
(possiblement moins). Pas d'Electron / WebView impliqué. Il s'agit simplement
de Lua fonctionnant sur un moteur de rendu.

## Extensible

Bien que l'éditeur soit minimal par défaut, il est très extensible grâce à
Lua. En fait, beaucoup de fonctionnalités sont fournies par des plugins. Par
exemple, [un Intellisense à la VSC](https://github.com/jgmdev/lite-xl-lsp).

## Un meilleur rendu des polices

L'éditeur s'affiche correctement sur les écrans de toute taille. D'autres options sont
aussi configurables, comme le hinting et l'anticrénelage.

## Édition multi-curseur

Vous pouvez placer plusieurs curseurs en faisant `ctrl` + `lclick`
sur des lignes ou `ctrl` + `shift` + `up` ou `ctrl` + `shift` + `down`.


---


Voici quelques fonctionnalités qui ne sont pas encore mises en place avec les
justifications qui s'y rattachent.
Certaines peuvent être mises en œuvre via des plugins.
Nous vous encorageons à tenter le coup.

## Rendu matériel accéléré

**tl;dr - franko a déclaré qu'il n'envisageait pas d'utiliser OpenGL en raison des compétences et du travail requis.**

L'accélération matérielle a été évoquée dans [cette discussion](https://github.com/lite-xl/lite-xl/discussions/450).
Takase avait fait 2 tentatives - d'abord en utilisant [NanoVG](https://github.com/inniyah/nanovg),
puis en forçant SDL à utiliser le rendu GPU.
Dans les deux cas, le gain de performance était au mieux négligeable, et
au pire l'éditeur était complètement inutilisable.
Pour l'instant, nous avons décidé de nous concentrer sur l'optimisation du
logiciel de rendu et différentes parties du code Lua.

## Polices d'écriture du système

C'est pénible car les différents systèmes ont chacun leur propre mécanisme
de gestion des polices.
Pour le moment, les utilisateurs peuvent utiliser le plugin [fontconfig](https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/fontconfig.lua).
Fontconfig est disponible sur Linux et [Windows](https://github.com/takase1121/mingw-w64-fontconfig)
et est [installable sur MacOS](https://formulae.brew.sh/formula/fontconfig),
À l'avenir, nous pourrions envisager d'ajouter une API pour lire les métadonnées
des polices, qui nous permettrait alors d'écrire une alternative à fontconfig en Lua
(aucune promesse ici).

## Ouverture de chemins UNC sur Windows (lecteurs réseau, accès aux fichiers WSL2 depuis Windows)

Notre code pour la gestion des chemins peut seulement gérer les chemins POSIX
et Windows.
Nous ne savons pas non plus comment Lite XL se comportera dans ces scénarios.

## Communication inter-fenêtre (glisser des onglets entre des fenêtres et autres formes de magie)

C'est de loin la fonctionnalité la plus dure à réaliser.
Lite XL n'a aucune intention de lier un quelconque widget toolkit (Qt et GTK)
requis pour ce type de fonctionnalités.
Une approche alternative est de créer notre propre mécanisme de communication
inter-processus, mais ce serait [réinventer](https://en.wikipedia.org/wiki/D-Bus)
[la](https://fr.wikipedia.org/wiki/Manuel_des_Conventions_des_Communications_Inter-Client)
[roue](https://github.com/swaywm/wlroots).

## Terminal intégré

Un terminal est complexe à mettre en œuvre.
Il existe des projets qui _peuvent_ être portés en Lua, tels que [xterm.js](https://xtermjs.org/).
Si cela intéresse quelqu'un, il peut le faire.
