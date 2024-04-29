# Coloration syntaxique

## Comment créer un plugin de coloration syntaxique pour Lite XL ?

Les plugins de coloration syntaxique pour Lite XL sont des fichiers Lua. Ils
définissent des motifs ou des expressions régulières qui correspondent
à différentes parties d'un langage donné, attribuant un type d'item à
chaque correspondance.
Ces différents types d'items (token types) sont ensuite colorés différemment selon la
palette de couleurs choisie.

Comme les autres plugins, les définitions syntaxiques proviennent des dossiers
dans l'ordre suivant :

- `/usr/share/lite-xl/plugins/`
- `$HOME/.config/lite-xl/plugins/`

NOTE : l'emplacement exact de ces dossiers dépendra de votre OS et de la
méthode d'installation. Par exemple, sur Windows, la variable `$USERPROFILE`
sera utilisée à la place de `$HOME`.

Le dossier de module utilisateur pour Lite XL peut généralement être trouvé
à ces endroits sur différents OS :

- Windows : `C:\Users\(username)\.config\lite-xl`
- MacOS : `/Users/(usernmame)/.config/lite-xl`
- Linux : `/home/(username)/.config/lite-xl`

Donc pour créer une nouvelle définition syntaxique sur Linux, vous pouvez
tout simplement créer un fichier `.lua` dans votre dossier `$HOME/.config/lite-xl/plugins/`.

## Quels types d'items syntaxiques sont pris en charge ?

Les types d'items syntaxiques pris en charge, définis dans `lite-xl/core/style.lua`, sont :

- normal
- symbol
- comment
- keyword
- keyword2
- number
- literal
- string
- operator
- function

Dans votre plugin de coloration syntaxique, vous écrivez des motifs
correspondant à des parties de la syntaxe du langage, attribuant ces
types d'items à des appariements. Vous n'avez pas besoin de tous les
utiliser - utilisez seulement autant que nécessaire pour votre langage.

Prenons un exemple de définition syntaxique et voyons comment ça marche.

## Exemple de syntaxe : fichiers de configuration ssh

Il s'agit d'un exemple bref et simple d'une définition syntaxique. Il a pour
but de surligner les fichiers de configuration SSH et ressemble à ça :

```lua
-- mod-version:2 -- lite-xl 2.0
local syntax = require "core.syntax"

syntax.add {
  files = { "sshd?/?_?config$" },
  comment = '#',
  patterns = {
    { pattern = "#.*\n",        type = "comment"  },
    { pattern = "%d+",          type = "number"   },
    { pattern = "[%a_][%w_]*",  type = "symbol"   },
    { pattern = "@",            type = "operator" },
  },
  symbols = {
    -- configuration ssh
    ["Host"]                         = "function",
    ["ProxyCommand"]                 = "function",

    ["HostName"]                     = "keyword",
    ["IdentityFile"]                 = "keyword",
    ...

    -- configuration sshd
    ["Subsystem"]                    = "keyword2",

    -- littéraux
    ["yes"]      = "literal",
    ["no"]       = "literal",
    ["any"]      = "literal",
    ["ask"]      = "literal",
  },
}
```

Prenons chaque section l'une après l'autre et voyons comment elle fonctionne.

### En-tête

La première ligne est un commentaire Lua et indique à Lite XL quelle version
nécessite ce plugin. La seconde ligne importe le module `core.syntax` pour que
nous puissions l'utiliser :

```lua
-- mod-version:2 -- lite-xl 2.0
local syntax = require "core.syntax"
```

Nous ajoutons ensuite une définition syntaxique à Lite XL en utilisant
`syntax.add {...}`. Le contenu de cette définition est abordé après.

#### Fichiers

La propriété `files` indique à Lite XL pour quels fichiers cette syntaxe
doit être utilisée. C'est un motif Lua correspondant au chemin complet du
fichier ouvert. Par exemple, pour correspondre aux fichiers Markdown — avec
comme extension soit `.md` soit `.markdown` — vous pourriez faire ceci :

```lua
files = { "%.md$", "%.markdown$" },
```

Dans notre exemple initial, nous faisons une correspondance avec la fin du
chemin plutôt que l'extension, car les fichiers de configuration SSH n'ont pas
d'extension — et nous ne voulons pas faire correspondre tous les fichiers `config`.
Nous nous attendons à ce que le chemin des fichiers de configuration SSH
ressemble à l'un des éléments suivants :

- `~/.ssh/config`
- `/etc/ssh/ssh_config`
- `/etc/ssh/sshd_config`

Le motif permettant de faire correspondre ces chemins est celui-ci :

```lua
files = { "sshd?/?_?config$" },
```

### Commentaires

La propriété `comment` ne définit _pas_ quelles parties de la syntaxe sont
des commentaires - voir la section Motifs ci-dessous pour cela. Cette
propriété indique à Lite XL quel charactère insérer au début des lignes
sélectionnées lorsque vous appuyez sur `ctrl+/`.
Vous pouvez également utiliser `block_comment` pour indiquer à Lite XL
comment créer des commentaires multilignes / en bloc.

### Motifs

Un texte donnée ne peut correspondre qu'à un seul motif. Une fois que Lite
XL décide que ce texte correspond à un motif, il lui attribuera ce type
d'item et avancera.
Les motifs sont essayés dans l'ordre dans lequel ils sont écrits dans la
définition syntaxique. La première correspondance sera donc gagnante.

Chaque motif prend l'une des formes suivantes :

#### Motif simple

```lua
{ pattern = "#.*\n",        type = "comment" },
```

Cette forme fait correspondre la ligne au motif et si ça marche, lui attribue
l'item donné par `type` (`comment`, dans ce cas-ci).

#### Motif de début et de fin

```lua
{ pattern = { "%[", "%]" }, type = "keyword" },
```

Cette forme a deux motifs — un qui correspond au début de l'intervalle et un
autre qui correspond à la fin. Tout ce qui est entre le début et la fin se
verra attribué l'item donnée par `type`.

#### Motif de début et de fin, avec échappement

```lua
{ pattern = { '"', '"', '\\' }, type = "string" },
```

Il s'agit de la même forme que la précédente, mais avec un troisième
paramètre.
La 3ème partie, ici `'\\'`, spécifie le caractère permettant d'échapper à
la correspondance de fin.

Pour en savoir plus sur les motifs Lua, voir : [Lua Pattern Reference](https://www.lua.org/manual/5.3/manual.html#6.4.1)

Si vous avez besoin d'expressions régulières PCRE, au lieu des motifs, vous
pouvez utiliser le mot-clé `regex` ici, à la place de `pattern`.

### Symboles

> Ceci **n'est pas lié au type d'item `symbol`**.

La section des symboles vous permet d'assigner des types d'items à des
mot-clés ou chaînes particuliers — généralement des mots réservés dans le
langage que vous colorez.
Le type d'item dans cette section **est toujours prioritaire** face aux types
d'item déclarés dans les motifs.

Par exemple, le code suivant surligne `Host` avec le type d'item `function`, `HostName`
comme `keyword` et `yes`, `no`, `any` & `ask` comme `literal` :

```lua
["Host"]                         = "function",
["HostName"]                     = "keyword",

["yes"]      = "literal",
["no"]       = "literal",
["any"]      = "literal",
["ask"]      = "literal",
```

#### Astuces : revérifiez vos motifs !

IL y a quelques erreurs fréquentes qui peuvent être faites lorsque vous
utilisez la table de `symbols` avec des motifs.

##### Cas 1 : espaces entre deux items `symbols`

Prenons l'exemple suivant :

```lua
{ pattern = "[%a_][%w_]+%s+()[%a_][%w_]+", type = { "keyword2", "symbol" } }
```

Expliquons un peu le motif (on omet les parenthèses vides) :

```
[%a_] = toutes les lettres, et les underscores
[%w_] = tous les nombres, lettres, et underscores
%s = tous les espaces blancs (espace, tabulation, retour à la ligne)

MOT =
  [%a_] suivi de (un ou plusieurs [%w_])

motif =
  MOT suivi de (un ou plusieurs %s) suivi de MOT
```

Par la suite, vous ajoutez une entrée `["my"] = "literal"` dans la table
`symbols`.
Vous testez la syntaxe avec `my function` et vous constatez que `"my"` n'est
pas surligné comme `literal`. Pourquoi donc ?

**La table `symbols` requiert une correspondance exacte**.
Si vous observez bien, les parenthèses vides (`()`) sont placées **après l'espace** !
Cela indique à Lite XL que `MOT suivi de (un ou plusieurs %s)` est un item,
ce qui fera correspondre `my ` (notez l'espace dans la correspondance).

La solution est d'ajouter un item `normal` pour l'espace blanc entre les deux items :

```lua
{ pattern = "[%a_][%w_]+()%s+()[%a_][%w_]+", type = { "keyword2", "normal", "symbol" } }
```

##### Cas 2 : Motifs & items `symbols`

On peut supposer que Lite XL apparie par magie le texte avec la table
`symbols`. Ce n'est pas le cas.

Dans certains languages, des gens peuvent ajouter un motif générique pour
déléguer l'appariement à la table `symbols`.

```lua
{ pattern = "[%a_][%w_]*", "symbol" }
```

Cependant, la table `symbols` peut se présenter comme suit :

```lua
symbols = {
  ["my-symbol"] = "function",
  ["..something_else"] = "literal"
}
```

`"my-symbol` contient un tiret (`-`) et `"..something_else"` contient 2 points (`.`).
Aucun des caractères ne correspond à `[%a_][%w_]*`!

**Attention au texte que vous avez l'intention de faire correspondre à la
table `symbols`.**
**Si vous voulez l'utiliser, vous devez vous assurer qu'il peut correspondre à l'un des motifs.**

Les motifs corrects sont :

```lua
{ pattern = "[%a_][%w%-_]*", "symbol" },
{ pattern = "%.%.[%a_][%w_]*", "symbol" },
```

## Tester votre nouvelle syntaxe

Pour tester votre nouvelle coloration syntaxique vous devez faire deux choses :

- Recharger le noyau de Lite XL
- Charger un fichier dans le langage de votre choix et voir ce que ça donne

Pour recharger le noyau, vous pouvez soit redémarrer Lite XL, soit utiliser la
palette de commande, sans avoir à redémarrer.
Pour ce faire, appuyez sur `ctrl+shit+p` pour afficher la palette, puis
sélectionnez `Core: Restart` (ou tapez `crr` ou quelque chose de similaire
pour que ça corresponde), puis appuyez sur Entrée. Vous devrez redémarrer
le noyau après tout changement effectué sur la définition de la coloration
syntaxique.

## Exemple de syntaxe avancée : Markdown

> **Note : Cet exemple emploie des fonctionnalités de la 2.1. Il n'est pas
compatible avec les anciennes versions de Lite XL.**

Tous les langages ne sont pas aussi simples que les fichiers de configuration
SSH. Les langages de balisage comme HTML et Markdown sont particulièrement
difficile à analyser correctement. Voici le fichier de syntaxe markdown dans toute sa splendeur :

```lua
-- mod-version:3
local syntax = require "core.syntax"
local style = require "core.style"
local core = require "core"

local initial_color = style.syntax["keyword2"]

-- on ajoute 3 types de styles de police à utiliser pour les fichiers markdown
for _, attr in pairs({"bold", "italic", "bold_italic"}) do
  local attributes = {}
  if attr ~= "bold_italic" then
    attributes[attr] = true
  else
    attributes["bold"] = true
    attributes["italic"] = true
  end
  -- impossible de copier une police personnalisée par l'utilisateur avec des
  -- attributs supplémentaires :(
  style.syntax_fonts["markdown_"..attr] = renderer.font.load(
    DATADIR .. "/fonts/JetBrainsMono-Regular.ttf",
    style.code_font:get_size(),
    attributes
  )
  -- on ajoute également une couleur
  style.syntax["markdown_"..attr] = style.syntax["keyword2"]
end

local in_squares_match = "^%[%]"
local in_parenthesis_match = "^%(%)"

syntax.add {
  name = "Markdown",
  files = { "%.md$", "%.markdown$" },
  block_comment = { "<!--", "-->" },
  space_handling = false, -- on désactive cette fonctionnalité pour la gérer nous-mêmes
  patterns = {
  ---- On place des motifs requérant des espaces au début pour optimiser la vitesse
  ---- d'appariement et appliquer l'optimisation %s+ tout de suite après.
    -- puce
    { pattern = "^%s*%*%s",                 type = "number" },
    { pattern = "^%s*%-%s",                 type = "number" },
    { pattern = "^%s*%+%s",                 type = "number" },
    -- puce numérotée
    { pattern = "^%s*[0-9]+[%.%)]%s",       type = "number" },
    -- citation
    { pattern = "^%s*>+%s",                 type = "string" },
    -- formats alternatifs d'italique et gras
    { pattern = { "%s___", "___%f[%s]" },   type = "markdown_bold_italic" },
    { pattern = { "%s__", "__%f[%s]" },     type = "markdown_bold" },
    { pattern = { "%s_[%S]", "_%f[%s]" },   type = "markdown_italic" },
    -- lien de référence
    {
      pattern = "^%s*%[%^()["..in_squares_match.."]+()%]: ",
      type = { "function", "number", "function" }
    },
    {
      pattern = "^%s*%[%^?()["..in_squares_match.."]+()%]:%s+.+\n",
      type = { "function", "number", "function" }
    },
    -- optimisation
    { pattern = "%s+",                      type = "normal" },

  ---- règles HTML importées et adaptées de language_html pour ne pas
  ---- entrer en conflit avec les règles markdown
    -- JS et CSS intégrés
    {
      pattern = {
      "<%s*[sS][cC][rR][iI][pP][tT]%s+[tT][yY][pP][eE]%s*=%s*" ..
        "['\"]%a+/[jJ][aA][vV][aA][sS][cC][rR][iI][pP][tT]['\"]%s*>",
      "<%s*/[sS][cC][rR][iI][pP][tT]>"
      },
      syntax = ".js",
      type = "function"
    },
    {
      pattern = {
      "<%s*[sS][cC][rR][iI][pP][tT]%s*>",
      "<%s*/%s*[sS][cC][rR][iI][pP][tT]>"
      },
      syntax = ".js",
      type = "function"
    },
    {
      pattern = {
      "<%s*[sS][tT][yY][lL][eE][^>]*>",
      "<%s*/%s*[sS][tT][yY][lL][eE]%s*>"
      },
      syntax = ".css",
      type = "function"
    },
    -- commentaires
    { pattern = { "<!%-%-", "%-%->" },   type = "comment" },
    -- tags
    { pattern = "%f[^<]![%a_][%w_]*",    type = "keyword2" },
    { pattern = "%f[^<][%a_][%w_]*",     type = "function" },
    { pattern = "%f[^<]/[%a_][%w_]*",    type = "function" },
    -- attributs
    {
      pattern = "[a-z%-]+%s*()=%s*()\".-\"",
      type = { "keyword", "operator", "string" }
    },
    {
      pattern = "[a-z%-]+%s*()=%s*()'.-'",
      type = { "keyword", "operator", "string" }
    },
    {
      pattern = "[a-z%-]+%s*()=%s*()%-?%d[%d%.]*",
      type = { "keyword", "operator", "number" }
    },
    -- entités
    { pattern = "&#?[a-zA-Z0-9]+;",         type = "keyword2" },

  ---- règles markdown
    -- math
    { pattern = { "%$%$", "%$%$", "\\"  },  type = "string", syntax = ".tex"},
    { pattern = { "%$", "%$", "\\" },       type = "string", syntax = ".tex"},
    -- blocs de code
    { pattern = { "```c++", "```" },        type = "string", syntax = ".cpp" },
    -- ... il y a d'autres motifs ici, mais je les ai retirés pour des raisons de brièveté
    { pattern = { "```lobster", "```" },    type = "string", syntax = ".lobster" },
    { pattern = { "```", "```" },           type = "string" },
    { pattern = { "``", "``" },             type = "string" },
    { pattern = { "%f[\\`]%`[%S]", "`" },   type = "string" },
    -- rayage
    { pattern = { "~~", "~~" },             type = "keyword2" },
    -- surlignage
    { pattern = { "==", "==" },             type = "literal" },
    -- lignes
    { pattern = "^%-%-%-+\n",               type = "comment" },
    { pattern = "^%*%*%*+\n",               type = "comment" },
    { pattern = "^___+\n",                  type = "comment" },
    -- gras et italique
    { pattern = { "%*%*%*%S", "%*%*%*" },   type = "markdown_bold_italic" },
    { pattern = { "%*%*%S", "%*%*" },       type = "markdown_bold" },
    -- gestion des cas spéciaux où l'astérisque peut être à la fin de la ligne et non fermé
    {
      pattern = { "%f[\\%*]%*[%S]", "%*%f[^%*]" },
      type = "markdown_italic"
    },
    -- formats alternatifs gras italique
    { pattern = "^___[%s%p%w]+___%s" ,      type = "markdown_bold_italic" },
    { pattern = "^__[%s%p%w]+__%s" ,        type = "markdown_bold" },
    { pattern = "^_[%s%p%w]+_%s" ,          type = "markdown_italic" },
    -- titre avec identifiant personnalisé
    {
      pattern = "^#+%s[%w%s%p]+(){()#[%w%-]+()}",
      type = { "keyword", "function", "string", "function" }
    },
    -- titre
    { pattern = "^#+%s.+\n",                type = "keyword" },
    -- exposant et indice
    {
      pattern = "%^()%d+()%^",
      type = { "function", "number", "function" }
    },
    {
      pattern = "%~()%d+()%~",
      type = { "function", "number", "function" }
    },
    -- définition
    { pattern = "^:%s.+",                   type = "function" },
    -- émoji
    { pattern = ":[a-zA-Z0-9_%-]+:",        type = "literal" },
    -- image et lien
    {
      pattern = "!?%[!?%[()["..in_squares_match.."]+()%]%(()["..in_parenthesis_match.."]+()%)%]%(()["..in_parenthesis_match.."]+()%)",
      type = { "function", "string", "function", "number", "function", "number", "function" }
    },
    {
      pattern = "!?%[!?%[?()["..in_squares_match.."]+()%]?%]%(()["..in_parenthesis_match.."]+()%)",
      type = { "function", "string", "function", "number", "function" }
    },
    -- liens de référence
    {
      pattern = "%[()["..in_squares_match.."]+()%] *()%[()["..in_squares_match.."]+()%]",
      type = { "function", "string", "function", "function", "number", "function" }
    },
    {
      pattern = "!?%[%^?()["..in_squares_match.."]+()%]",
      type = { "function", "number", "function" }
    },
    -- url et email
    {
      pattern = "<[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+%.[a-zA-Z0-9-.]+>",
      type = "function"
    },
    { pattern = "<https?://%S+>",           type = "function" },
    { pattern = "https?://%S+",             type = "function" },
    -- optimise les tirets consécutifs utilisé dans les tableaux
    { pattern = "%-+",                      type = "normal" },
  },
  symbols = { },
}

-- on ajuste les couleurs lors de changement de thème
core.add_thread(function()
  while true do
    if initial_color ~= style.syntax["keyword2"] then
      for _, attr in pairs({"bold", "italic", "bold_italic"}) do
        style.syntax["markdown_"..attr] = style.syntax["keyword2"]
      end
      initial_color = style.syntax["keyword2"]
    end
    coroutine.yield(1)
  end
end)
```

### Syntaxe des polices (depuis 1.16.10)

Cette syntaxe permet aux utilisateurs de définir différents styles de police
(gras, italique, etc.) pour différents motifs.
Pour changer le style de police d'un item, ajoutez une police à `style.syntax_fonts[token_type]`.
Par exemple :

```lua
-- s'assure que toutes les "fancysyntax_fancy_token" soient en italique
style.syntax_fonts["fancysyntax_fancy_token"] = renderer.font.load("myfont.ttf", 14 * SCALE, { italic = true })
```

L'exemple avec markdown automatise cela avec une boucle for.

Les limitations ici sont que les polices ne peuvent pas être copiées avec
différents attributs. Le chemin d'accès aux polices doit donc être codé en
dur.
En dehors de cela, abuser des `style.syntax_fonts` peut mener à **une lenteur
des performances** et **une consommation élevée de mémoire**.
Cela est évident lorsque l'utilisateur tente de redimensionner l'éditeur avec `ctrl-scroll` ou `ctrl+` et `ctrl-`.
À utiliser avec modération.

### Gestion des espaces (v2.1 / `master`)

Par défaut, Lite XL ajoute à la syntaxe le motif `{ pattern = "%s+", type = "normal" }`.
Cela améliore drastiquement les performances sur les lignes débutant par des
espaces blancs (eg. les lignes fortement indentées) en faisant correspondre
les espaces blancs avant les autres motifs afin d'empêcher Lite XL de
parcourir toute la syntaxe.
Cependant, il y a des syntaxes requérant un appariement d'espaces (eg.
Markdown avec les blocs indentés) donc cela peut être désactivé en
définissant `space_handling` comme `false.`

> Pour conserver l'optimisation de gestion des espaces ou pour prendre en
charge d'anciennes versions de Lite XL,
> `{ pattern = "%s+", type = "normal" }` peut être ajouté après les motifs
nécessitant des espaces.

### Motifs simples aves plusieurs items (v1.16.10)

Il y a un extrait provenant du plugin markdown :

```lua
local in_squares_match = "^%[%]"
-- lien de référence
{
  pattern = "^%s*%[%^()["..in_squares_match.."]+()%]: ",
  type = { "function", "number", "function" }
},
```

Parfois cela a du sens de surligner différentes parties d'un motif
différement.
Les parenthèses vides (`()`) dans les motifs Lua renverront la position du
texte dans les parentheses.
Elles indiqueront à Lite XL quand changer de type d'item.
Par exemple, `^%s*%[%^` est une `"function"`, `["..in_squares_match.."]+` est
un `"number"` et `%]: ` est une `"function"`.

### Sous-syntaxes (depuis v1.16.10)

Lite XL prend en charge l'intégration d'une autre syntaxe dans une syntaxe existante.
Cela est utilisé pour prendre en compte les blocs de code dans la syntaxe markdown.

Par exemple :
```lua
{ pattern = { "```` ``` ````cpp", "```` ``` ````" },        type = "string", syntax = ".cpp" },
```

Cela surlignerait ```` ```cpp```` et ```` ``` ```` comme `"string"` tandis que tout ce
qui se trouve à l'intérieur sera surligné avec une syntaxe correspondant à `".cpp"`.
