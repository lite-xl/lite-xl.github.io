# FAQ

#### Kann ich smart autocompletion (intellisense/LSP) bekommen?

Schaue dir das [LSP] Plugin an.

#### Wo ist das integrierte Terminal?

Du kannst [lite-xl-terminal] ausprobieren.

#### Tabs und Indent Größe?

In deiner Benutzer Config (Das Zahnrad Symbol im File Tree):

```lua
config.tab_type = "soft" -- soft für Leerzeichen, hard für echte Tabs (\t)
config.indent_size = 4   -- 4 Leerzeichen
```

#### Wie binde ich Befehle an Tasten?

```lua
local keymap = require "core.keymap"
keymap.add { ["ctrl+escape"] = "core:quit" }
```

#### Wie entbinde ich Befehle für bestimmte Tasten?

```lua
-- Das zweite Parameter lässt dir Befehle für bestimmte Tasten überschreiben
-- in diesem Fall wird es auf nichts gebunden
keymap.add({ ["ctrl+escape"] = {} }, true)
```

#### Wie bekomme ich die Befehle für diese Tastenkombinationen?

Du kannst für Befehle im Command Palette suchen.

Für jedem Befehl, ersetze die Leerzeichen auf der rechten Seite mit Striche.

Zum Beispiel: `Core: Find Command` → `core:find-command`

#### Welche Lua Version wird von Lite XL benutzt?

Lua 5.4.

#### Plugin Empfehlungen

Im fall dass du nicht unser [Plugin Repository][1] durchforsten möchtest,
haben wir eine Liste von Plugins gemacht, die Lite XL viel mehr angenehmer machen.

| Plugin               | Verwendungszweck
| ---                  | ---
| [autoinsert]         | Fügt automatisch schließende Klammern und Anführungszeichen ein
| [bracketmatch]       | Markiert übereinstimmende Klammern
| [ephemeral_tabs]     | Vorschau von Dateien ohne der Erstellung von mehrere Tabs (Ephemeral Tabs)
| [gitdiff_highlight]  | Git diff gutter
| [lint+]              | Linter Unterschützung
| [minimap]            | Minimap
| [selectionhighlight] | Hebe Code hervor dass zur Auswahl passt
| [lite-xl-discord]    | Discord rich presence |

#### Wo ist Funktion X? Wie wäre es mit Y?

Du kannst mehr Informationen auf unserer [Funktionen Seite](/en/about/features) bekommen.


[LSP]:                https://github.com/lite-xl/lite-xl-lsp
[lite-xl-terminal]:   https://github.com/adamharrison/lite-xl-terminal
[autoinsert]:         https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/autoinsert.lua?raw=1
[bracketmatch]:       https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/bracketmatch.lua?raw=1
[ephemeral_tabs]:     https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/ephemeral_tabs.lua?raw=1
[gitdiff_highlight]:  https://github.com/vincens2005/lite-xl-gitdiff-highlight
[lint+]:              https://github.com/liquid600pgm/lintplus
[minimap]:            https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/minimap.lua?raw=1
[selectionhighlight]: https://github.com/lite-xl/lite-xl-plugins/blob/master/plugins/selectionhighlight.lua?raw=1
[lite-xl-discord]:    https://github.com/vincens2005/lite-xl-discord

[1]: https://github.com/lite-xl/lite-xl-plugins
