# Utilisation

Lite XL est un éditeur de texte léger écrit principalement en Lua — il a
pour but de fournir quelque chose de pratique, beau, *petit* et rapide,
mis en œuvre; facile à modifier et à étendre, or to use without doing either.

Lite XL is based on the Lite editor and provide some enhancements
while remaining generally compatible with it.

## Prise en main

Lite XL fonctionne en utilisant un *répertoire de projet* — c'est le
répertoire dans lequel le code de votre projet et d'autres données résident 

Pour ouvrir un répertoire de projet spécifique le nom du répertoire doit
être passé comme argument de ligne de commande *(`.` peut être renseigné
pour utiliser le répertoire courant)* ou le répertoire peut être glissée vers
soit l'exécutable soit une instance en cours d'exécution.

Une fois lancé le répertoire du projet peut être changé grâce à la
commande `core:change-project-folder`. Cette commande fermera tous les documents
actuellement ouverts et basculera vers les nouveau répertoire de projet.

Si vous voulez ouvrir un répertoire de projet dans une nouvelle fenêtre la
commande `core:open-project-folder` ouvrira une nouvelle fenêtre de l'éditeur
avec le répertoire de projet sélectionné.

La principale façon d'ouvrir des fichiers dans Lite XL est d'utiliser la commande
`core:find-file` — elle fournit un chercheur flou (fuzzy finder) sur tous les
fichiers du projet et peut être ouverte par défaut avec le raccourci `ctrl`+`p`.

Les commandes peuvent être lancées avec des raccoucis clavier, ou en utilisant
la commande `core:find-command` lié à `ctrl`+`shift`+`p` par défaut. Par
exemple, appuyant sur la combinaison ci-dessus et écrire `newdoc` puis appuyer
sur `entrée` ouvrira un nouveau document. Le raccourci clavier actuel pour une
commande est visible à droite du nom de la commande dans l'outil de recherche
de commandes. Ainsi, pour trouver le raccourci d'une commande, `ctrl`+`shift`+`p`
peut être appuyé et le nom de la commande renseigné.

## Répertoire de données utilisateur

Lite XL utilise les répertoires d'utilisateur standards des systèmes ; les
données de l'utilisateur peuvent être trouvées dans `$HOME/.config/lite-xl`
sur Linux et macOS.

Sur Windows, la variable `$USERPROFILE` sera utilisée au lieu de `$HOME`.

## Module utilisateur

Lite XL peut être configuré par l'utilisation du module utilisateur. Le
module utilisateur peut être utilisé pour changer les options dans le module
de configuration, ajouter des raccourcis clavier supplémentaires, charger des
thèmes de couleurs personnalisés, modifier le style ou changer toute autre
partie de l'éditeur selon vos préférences personnelles.

Le module utilisateur est chargé au démarrage de l'application, après
que les plugins sont chargés.

Le module utilisateur peut être modifié en exécutant la commande `core:open-user-module`
ou alors en ouvrant directement le fichier `$HOME/.config/lite-xl/init.lua`.

Sur Windows, la variable `$USERPROFILE` sera utilisée au lieu de `$HOME`.

**tl;dr:**

- Windows: `C:\Users\(username)\.config\lite-xl\init.lua`
- MacOS: `/Users/(usernmame)/.config/lite-xl/init.lua`
- Linux: `/home/(username)/.config/lite-xl/init.lua`

Ce ne sont pas les emplacements exacts, mais cela vous donne une idée d'où chercher.

Veuillez noter que Lite XL diffère de l'éditeur standard Lite pour l'emplacement
du module utilisateur.

## Module de projet

Le module de projet est un module optionnel qui est chargé depuis la répertoire
courant du projet lorsque Lite XL est lancé. Les modules de projet peuvent être
utiles pour des choses comme l'ajout de commandes personnalisées pour des systèmes
de construction spécifiques à un projet, ou pour charger des plugins spécifiques
à un projet.

Le module de projet est chargé au démarrage de l'application, après
que les plugins et le module utilisateur sont chargés.

Le module de projet peut être modifié en exécutant la commende `core:open-project-module`.
Si le module n'existe pas pour le projet en cours lorsque la commande est lancée,
il sera créé.

## Ajouter des répertoires à un projet

En plus des répertoires de projet il est possible d'ajouter d'autres
répertoires avec la commande `core:add-directory`.
Une fois le répertoire ajouté il sera affiché dans l'arborescence sur le
côté gauche et les fichiers supplémentaires seront accessibles à l'aide de
la commande `ctrl`+`p` (trouver un fichier).
Les fichiers supplémentaires seront également visibles lors de la recherche
à travers le projet.

Les répertoires supplémentaires peuvent être supprimés avec la commande `core:remove-directory`.

Lorsque vous ouvrez à nouveau Lite XL dans le même répertoire de projet,
l'application se souviendra de votre espace de travail, y compris les
répertoires de projet supplémentaires.

Depuis la version 1.15 Lite XL n'a plus besoin de plugin l'espace
de travail puisqu'il est maintenant fourni avec l'éditeur.

## Créer un nouveau répertoire vide

Utiliser la commande `files:create-directory` ou contrôle-clique dans un
répertoire dans l'arborescence créera un nouveau répertoire vide.

## Commandes

Les commandes sont utilisées à la fois par la biais de l'outil de recherche de
commandes (`ctrl`+`shift`+`p`) et par le système de raccourcis clavier de Lite
XL. Les commandes consistent en 3 composants :

* **Le nom** — Le nom de la commande de la forme `espacenom:nom-action`, par
  exemple: `doc:select-all`
* **Prédicat** — Une function qui renvoie true si la commande peut être lancée,
  par exemple, pour toute commande de document le prédicat vérifiera si la vue
  active est un document.
* **Fonction** — La fonction qui exécute la commande elle-même.

Des commandes peuvent être ajoutées en utilisant la fonction `command.add`
fournir par le module `core.command` :

```lua
local core = require "core"
local command = require "core.command"

command.add("core.docview", {
  ["doc:save"] = function()
    core.active_view.doc:save()
    core.log("Saved '%s'", core.active_view.doc.filename)
  end
})
```

Des commandes peuvent être exécutée  can be performed de manière programmée
(eg. à partir d'une autre commande ou par votre module utilisateur) en appelant
la fonction `command.perform` après avoir requis le module `command` :

```lua
local command = require "core.command"
command.perform "core:quit"
```

### Raccourcis clavier

Tous les raccourcis clavier sont gérés par le module `core.keymap`.
Un raccourci clavier associe un "coup" (eg. `ctrl`+`q`) à une ou plusieurs
commandes (eg. `core:quit`). Lorsque le raccourci est appuyé, Lite XL itérera
chaque commande assignée à ces touches et exécutera la *fonction de prédicat*
pour cette commande — si le prédicat passe l'itération s'arrête et la
commande s'exécute.

Un exemple d'utilsiation est la liaison par défaut à la touche `tab` :

``` lua
  ["tab"] = { "command:complete", "doc:indent" },
```

Lorsque la tabulation est appuyée la commande `command:complete` est essayée,
ce qui n'aboutira que si l'entrée de commande en bas de la fenêtre est active.
Autrement la commande `doc:indent` est essayée, ce qui n'aboutira que si nous
avons un document en tant que vue active.

Une nouvelle association peut être ajoutée par votre module utilisateur comme
suit :

```lua
local keymap = require "core.keymap"
keymap.add { ["ctrl+q"] = "core:quit" }
```

Une liste des associations par défaut peut être aperçue [ici][1].

### Variables globales

Il y a quelques variables globales fixée par l'éditeur.
Ces variables sont disponibles partout et ne devraient pas être écrasées.

- `ARGS`: arguments de la ligne de commande. `argv[1]` est le nom du programme,
  `argv[2]` est le 1er paramètre, ...
- `PLATFORM`: Affichage de `SDL_GetPlatform()`. Peut être `Windows`,
  `Mac OS X`, `Linux`, `iOS` et `Android`.
- `SCALE`: Échelle de police. Généralement 1, mais peut être plus élevé
  sur les systèmes HiDPI.
- `EXEFILE`: Un chemin absolu vers l'ex"cutable.
- `EXEDIR`: Le répertoire de l'exécutable. **NE PAS ÉCRIRE DANS CE RÉPERTOIRE.**
- `VERSION`: version de lite-xl.
- `MOD_VERSION`: version de modification. Elle est généralement incrementée
  lors de changements dans l'API.
- `PATHSEP`: Séparateur de chemin. `\` (Windows) ou `/` (autres OS)
- `DATADIR`: Le répertoire de données, où réside la partie en Lua de
  lite-xl. **NE PAS ÉCRIRE DANS CE RÉPERTOIRE.**
- `USERDIR`: Répertoire de configuration utilisateur.

> `USERDIR` devrait être utilisé à la place de `DATADIR` lors de la
> configuration de l'éditeur car `DATADIR` pourrait ne pas être accessible en
> écriture.
> (par exemple, si l'éditeur est installé dans `/usr`, `DATADIR` vaudra `/usr/share/lite-xl`!)
> `USERDIR` en revanche devrait toujours être accessible en écriture par
> l'utilisateur, et autorise plusieurs utilisateurs à personnaliser leur
> propre éditeur.

## Plugins

Les plugins dans Lite XL sont des modules Lua normaux et sont traités tels quels
— aucun gestionnaire de plugins n'est fourni, et une fois qu'un plugin est
chargé, il n'est jamais prévu qu'il doive se décharger lui-même.

Pour installer un plugin glissez-le simplement dans le répertoire `plugins` se
trouvant dans le répertoire de module utilisateur.
Lorsque Lite XL démarre il va tout d'abordd charger les plugins inclus dans le
répertoire de données et chargera ensuite les plugins situés dans le
répertoire de module utilisateur.

Pour désinstaller un plugin vous devez supprimer le fichier de plugin — tout
plugin (y compris ceux inclus dans l'installation par défaut) peut être
supprimé pour retirer ses fonctionnalités.

Si vous voulez charger un plugin seulement sous certaines conditions (par
exemple, seulement dans un projet donné), le plugin peut être placé ailleurs
que dans le répertoire `plugins` afin qu'il ne soit pas chargé automatiquement.
Le plugin peut ensuite être chargé manuellement si nécessaire en utilisant
la fonction `require`.

Les plugins peuvent être téléchargés depuis le [dépôt de plugins][2].

## Redémarrer l'éditeur

Si vous modifiez le fichier de configuration utilisateur ou des fichiers Lua
d'implémentation, vous pouvez redémarrer l'éditeur en utilisant la commande
`core:restart`.
L'application entière redémarrera en conservant la fenêtre alors en cours d'utilisation.

## Thèmes de couleurs

Les thèmes de couleurs dans Lite XL sont des modules Lua qui écrasent les
champs de couleurs du module `core.style`.
Des méthodes de couleurs prédéfinies se trouvent dans le dossier `colors`
dans le répertoire de données.
Des thèmes de couleur supplémentaires peuvent être installés dans le
répertoire utilisateur, dans un dossier nommé `colors`.

Un thème de couleur peut être défini en l'imposant dans votre module utilisateur :

```lua
core.reload_module "colors.winter"
```

Dans l'éditeur Lite la fonction `require` est utilisée au lieu de `core.reload_module`.
Dans Lite XL `core.reload_module` devrait être utilisée pour s'assurer que le
module de couleur est bien rechargé lors de la sauvegarde du fichier de
configuration utilisateur.

Des thèmes de couleurs peuvent être téléchargés depuis le [dépôt de thèmes de couleurs][3].
Il sont inclus dans les paquets de release de Lite XL.


[1]: /fr/documentation/keymap
[2]: https://github.com/lite-xl/lite-xl-plugins
[3]: https://github.com/lite-xl/lite-xl-colors
