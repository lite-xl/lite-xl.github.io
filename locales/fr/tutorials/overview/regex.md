# API Regex

Cette API fournit des expressions régulières PCRE pour ceux qui auraient
besoin d'une plus grande puissance dans l'appariement (*matching*) de textes.
Cette API est écrite en C et en Lua.

## Création d'une regex

Utilisez `regex.compile(pattern, options)` pour compiler une regex.

- `pattern` : le motif du regex
- `options` : les modificateurs du regex en tant que chaînes de caractères, eg `"im"`
  - `"i"` : recherche insensible à la casse
  - `"m"` : recherche multi-ligne
  - `"s"` : fait correspondre tous les caractères avec un point (`.`), **y compris les sauts à la ligne**

## Appariement

### Fonctions de bas-niveau

- `regex:cmatch(str, offset, options)` est une fonction bas-niveau d'appariement
  - `str` : la chaîne de caractères à apparier
  - `offset` : où commencer l'appariement
  - `options` : un champ de bits pour les options
    - `regex.ANCHORED` : apparie seulement à partir du début de la chaîne
    - `regex.ENDANCHORED` : apparie seulement à partir de la fin de la chaîne
    - `regex.NOTBOL` : la chaîne n'est pas le début de la ligne
    - `regex.NOTEOL` : la chaîne n'est pas la fin de la ligne
    - `regex.NOTEMPTY` : ne pas apparier une chaîne vide
    - `regex.NOTEMPTY_ATSTART` : ne pas apparier une chaîne vide au début

**Note : `regex:cmatch()` renvoie des indices erronés (actuellement dans la
  version 2.0.2).
  L'indice de fin renvoyé par `regex:cmatch()` est toujours décalé de 1 (-1
  pour obtenir le réel indice de fin).**

### Fonctions de haut-niveau

Toutes les fonctions ci-dessous peuvent se présenter sous deux formes :

- `regex:fn(...)` où `regex` est l'instance de regex compilé.
- `regex.fn(pattern, ...)` où `pattern` est un motif (sous forme de chaîne)
  à compiler et utiliser directement.

Nous documenterons uniquement la première forme.

- `regex:match(str, offset, options)` est une fonction haut-niveau d'appariement. Cette
  fonction accepte les mêmes arguments que `regex:cmatch()`.
- `regex:gsub(str, replacement)` remplace les correspondances dans `str` par
  `replacement`.
  Les groupes de capture sont identifiés de `\\0` à `\\9`. Cela pourrait
  changer à l'avenir.
