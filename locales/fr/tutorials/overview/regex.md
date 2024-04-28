# API Regex

Cette API fournit des expressions régulières PCRE pour ceux qui auraient
besoin d'une plus grande puissance dans l'appariement (*matching*) de textes.
Cette API est écrite en C et en Lua.

## Création d'une regex

Utilisez `regex.compile(pattern, options)` pour compiler une regex.

- `pattern` : Le motif du regex
- `options` : Les modificateurs du regex en tant que chaînes de caractères, eg `"im"`
  - `"i"` : Recherche insensible à la casse
  - `"m"` : Recherche multi-ligne
  - `"s"` : Fait correspondre tous les caractères avec un point (`.`), **y compris les sauts à la ligne**

## Apparement

### Fonctions de bas-niveau

- `regex:cmatch(str, offset, options)` fonction bas-niveau d'appariement
  - `str`: La chaîne de caractères à apparier
  - `offset`: Où commencer l'appariement
  - `options`: Un champ de bits pour les options
    - `regex.ANCHORED`: Apparie seulement à partir du début de la chaîne
    - `regex.ENDANCHORED`: Apparie seulement à partir de la fin de la chaîne
    - `regex.NOTBOL`: La chaîne n'est pas le début de la ligne
    - `regex.NOTEOL`: La chaîne n'est pas la fin de la ligne
    - `regex.NOTEMPTY`: Ne pas apparier une chaîne vide
    - `regex.NOTEMPTY_ATSTART`: Ne pas apparier une chaîne vide au début

**Note : `regex:cmatch()` renvoie des indices erronés (actuellement dans la
  version 2.0.2).
  L'indice de fin renvoyé par `regex:cmatch()` est toujours décalé de 1 (-1
  pour obtenir le réel indice de fin).**

### Fonctions de haut-niveau

Toutes les fonctions ci-dessous peuvent se présenter sous deux formes :
- `regex:fn(...)` où `regex` est l'instance de regex compilé
- `regex.fn(pattern, ...)` où `pattern` est un motif (sous forme de chaîne)
  à compiler et utiliser directement.

Nous documenterons uniquement la première forme.

- `regex:match(str, offset, options)` fonction haut-niveau d'appariement. Cette
  fonction accepte les mêmes arguments que `regex:cmatch()`
- `regex:gsub(str, replacement)` remplace les correspondances dans `str` par
  `replacement`.
  Les groupes de capture sont identifiés de `\\0` à `\\9`. Cela pourrait
  changer à l'avenir.
