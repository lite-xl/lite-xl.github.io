# FAQ

#### Est-ce que je peux avoir une autocomplétion intelligente (intellisense/LSP) ?

Consultez le plugin [LSP].

#### Où est le terminal intégré ?

Vous pouvez essayer [lite-xl-terminal].

#### Taille d'une tabulation et d'une indentation ?

Dans la configuration utilisateur (l'icône d'engrenage dans l'arborescence des
fichiers):

```lua
config.tab_type = "soft" -- soft pour les espaces, hard pour les vrais tabulations (\t)
config.indent_size = 4   -- 4 espaces
```

#### Comment assigner des commandes à un raccourci clavier ?

```lua
local keymap = require "core.keymap"
keymap.add { ["ctrl+escape"] = "core:quit" }
```

#### Comment désassigner des commandes à un raccourci clavier ?

```lua
-- le second paramètre vous laisser remplacer les commandes pour certain raccourcis
-- dans ce cas on l'assigne à rien
keymap.add({ ["ctrl+escape"] = {} }, true)
```

#### Comment obtenir les commandes de ces raccourcis ?

Vous pouvez chercher des commandes dans la palette de commandes.

Pour chaque commande, remplacez les espaces dans la partie droite par des tirets.

Par exemple: `Core: Find Command` → `core:find-command`

#### Quelle version de Lua utilise Lite XL ?

Lua 5.4.

#### Un mode Vim?

Vous avez besoin de [vibe].

#### Recommendations de plugins

Au cas où vous ne voudriez pas passer au peigne fin notre [dépôt de plugins][1],
il y a une liste de plugins qui rendent l'expérience avec Lite XL plus
agréable.

| Plugin               | Cas d'usage
| ---                  | ---
| [autoinsert]         | Insère automatiquement des parenthèses, crochets et guillemets fermants
| [bracketmatch]       | Surligne les parenthèses ou crochets correspondants
| [ephemeral_tabs]     | Onglets éphémères (aperçu des fichiers sans créer plusieurs onglets)
| [gitdiff_highlight]  | Montre les différences Git
| [lint+]              | Prise en charge de linter
| [minimap]            | Minimap
| [selectionhighlight] | Surligne le code correspondant à la sélection
| [lite-xl-discord]    | Présence riche Discord |

#### Où est la fonctionnalité X ? Et pourquoi pas Y ?

Vous pouvez trouver plus d'informations sur la [page Fonctionnalités](/fr/about/features).


[LSP]:                https://github.com/lite-xl/lite-xl-lsp
[lite-xl-terminal]:   https://github.com/adamharrison/lite-xl-terminal
[vibe]:               https://github.com/eugenpt/lite-xl-vibe
[autoinsert]:         https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/autoinsert.lua?raw=1
[bracketmatch]:       https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/bracketmatch.lua?raw=1
[ephemeral_tabs]:     https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/ephemeral_tabs.lua?raw=1
[gitdiff_highlight]:  https://github.com/vincens2005/lite-xl-gitdiff-highlight
[lint+]:              https://github.com/liquid600pgm/lintplus
[minimap]:            https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/minimap.lua?raw=1
[selectionhighlight]: https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/selectionhighlight.lua?raw=1
[lite-xl-discord]:    https://github.com/vincens2005/lite-xl-discord

[1]: https://github.com/lite-xl/lite-xl-plugins
