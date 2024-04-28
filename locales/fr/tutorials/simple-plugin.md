# Plugin Simple

### Qu'est-ce que Simple ?

Simple est un plugin très basique écrit avec l'intention d'introduire aux
développeurs qui sont nouveaux sur Lite XL au processus d'écriture de plugins
pour l'éditeur.

### Que fait ce plugin ?

Le plugin affiche un message (qui est pris comme entrée par l'utilisateur)
dans le coin supérieur droite de la fenêtre de l'éditeur. Il permet
également à l'utilisateur de basculer la visibilité du message.

### Je ne sais pas écrire en Lua !

Si vous venez d'un autre langage de programmation, jetez un œil à [l'antisèche Lua][1].
Si vous êtes débutant en programmation, vous pouvez lire [ceci][2].

### Format du tutoriel

Le code contains des commentaires détaillant ce que fait une grande partie (si
ce n'est l'intégralité) du code dans le fichier.

### Le code :

```lua
-- mod-version:3

-- vous DEVEZ mettre mod-version:x sur la première ligne de votre plugin
-- mod-version corresponds généralement aux versions de lite-xl (eg. mod-version: 2 == lite-xl 2.0)
-- lite-xl ne chargera pas le plugin si le mod-version ne correspond pas

-----------------------------------------------------------------------
-- NOM         : Simple
-- DESCRIPTION : Un guide simple sur la création de votre premier plugin Lite XL
-- AUTEUR      : Ashwin Godbole (aelobdog)
-- OBJECTIF    : Afficher du texte dans l'éditeur
-----------------------------------------------------------------------
-- Avertissement :
-- Je ne suis pas un développeur Lua, et mes connaissans autour de l'écriture
-- de plugins pour Lite XL sont très limitées. Ce fichier a pour but d'aider
-- le lecteur à démarrer avec le développement de plugins pour Lite XL, et
-- donc montre seulement des fonctionnalités très basiques. Pour voir le
-- développement d'un plugin plus complexe, allez voir le code source
-- d'autres plugins après avoir parcouru ce fichier.
-----------------------------------------------------------------------
-- Avant de commencer à écrire du code pour le plugin, nous devons importer
-- les modules depuis le paquet "core".

-- le module "core"
local core = require "core"

-- le module "command" nous aidera à enregistrer des commandes pour notre plugin
local command = require "core.command"

-- le module "style" nous permettra d'utilser des options de styles
local style = require "core.style"

-- le module "config" sera utilisé pour stocker certains éléments comme les
-- couleurs et les fonctions
local config = require "core.config"

-- le module "keymap" nous permettra d'associer des raccourcis clavier à nos commandes
local keymap = require "core.keymap"

-- puisque nous voulons modifier RootView, nous devons d'abord l'importer
local RootView = require "core.rootview"

-----------------------------------------------------------------------
-- la configuration par plugin doit rester dans config.plugins.(nom_du_plugin)
config.plugins.simple = {}

-- les couleurs sont juste trois ou quatre valeurs séparées par des virgules (RGBA) (entre 0 et 255)
-- placées à l'intérieur de '{ }'. Nous ajouterons notre couleur dans le module config.
config.plugins.simple.text_color = {200, 140, 220} -- ou utilisez `{ common.color "#C88CDC" }`
-----------------------------------------------------------------------
-- Créons une fonction pour calculer les coordonnées de notre texte.
-- Tant qu'on y est, ajoutons notre fonction dans le module `config`.
-- Nous prendrons le message que nous voulons afficher comme argument de la
-- fonction pour déterminer les coordonnées x et y du texte.

function config.plugins.simple.get_text_coordinates(message)
   -- Pour ce plugin, nous voulons afficher le texte dans le coin supérieur
   -- droit de l'écran. Pour ce faire, nous devons trouver les valeurs de
   -- longueur et hauteur de l'éditeur.

   -- La taille actuelle de la police d'écriture peut être obtenue grâce au module "style".
   -- Les dimensions de l'éditeur peuvent être obtenues avec
   --   1. LARGEUR  : core.root_view.size.x
   --   2. HAUTEUR : core.root_view.size.y

   local message_width = style.code_font:get_width(message.." ")
   local font_height = style.code_font:get_size()
   local x = core.root_view.size.x - message_width
   local y = font_height / 2

   return x, y
end
-----------------------------------------------------------------------
-- Passons maintenant à l'affichage du texte dans l'éditeur.
-- Afin "d'injecter" notre propre code pour afficher du texte,
-- nous devrons sauvegarder la fonction de dessin original.
-- Nous sauvegarderons `RootView.draw` dans une variable qu'on appelera `parent_draw`

local parent_draw = RootView.draw

-- Maintenant suchargeons la définition originale de `draw` dans RootView
-- en redéfinissant la fonction.

function RootView:draw()
   -- Nous appelons la fonction parent pour assurer le fonctionnement de l'éditeur...
   -- il est évident que nous devons encore dessiner tous les autres éléments !
   -- Donc on appelle la fonction `parent_draw` avant de faire quoi que ce soit d'autre.
   parent_draw(self)

   -- Nous ajouterons une option pour activer ou désactiver le message. Utilisons une
   -- variable booléenne permettant de savoir si on veut afficher le message ou non.
   if config.plugins.simple.show_my_message then
      -- Nous obtiendrons le message que nous allons afficher comme entrée de l'utilisateur
      -- plus tard. Nous stockerons cette entrée dans `config.plugins.simple.hw_message`.
      -- (NOTE: cette variable n'est pas intégrée dans lite-xl;
      --        c'est une variable que nous définirons plus tard.)

      -- Connservons la valeur de config.plugins.simple.hw_message dans une variable locale
      -- `message`. Si config.plugins.simple.hw_message est vide la variable message vaudra
      -- "Le message n'est pas encore défini !"
      local message

      if config.plugins.simple.hw_message then
          message = config.plugins.simple.hw_message
      else
          message = "Le message n'est pas encore défini !"
      end

      -- Récupérons les coordonnées de notre texte
      local x, y = config.plugins.simple.get_text_coordinates(message)

      -- On dessine enfin le texte dans la fenêtre !
      -- La fonction draw_text de `renderer` est une fonction importante
      -- puisqu'elle est utilisée pour afficher tous les texte dans la
      -- fenêtre de l'éditeur.
      renderer.draw_text(style.code_font, message, x, y, config.plugins.simple.text_color)
   end
end
-----------------------------------------------------------------------
-- Permettons à l'utilisateur d'activer ou désactiver le message.
-- Nous écrirons une fonction pour inverser la valeur de notre
-- variable booléenne.

local function toggle_helloworld()
   config.plugins.simple.show_my_message = not config.plugins.simple.show_my_message
end
-----------------------------------------------------------------------
-- Enfin, ajoutons une fonction toggle à la liste de commande pour que
-- nous puissions l'appeler avec le panneau de commande ctrl-shift-p. Ajoutons une
-- commande pour activer ou désactiver la visibilité du message et une autre pour
-- obtenir le message de l'utilisateur et ensuite l'afficher.

command.add(nil, {
   -- Basculer la visibilité du message.
   ["simple:toggle"] = toggle_helloworld,

   -- Définir et afficher le message.
   -- C'est la façon d'obtenir une entrée utilisateur via la barre de commande.
   -- `core.command_view:enter` prend 2 arguments :
   --    * le texte à afficher avant de prendre l'entrée
   --    * une fonction qui prend comme argument l'entrée
   -- (NOTE : ici la variable que nous lisons en entrée est `text`)
   ["simple:setshow"] = function()
      core.command_view:enter("Texte à afficher", {
         submit = function(text)
            config.plugins.simple.hw_message = text
            config.plugins.simple.show_my_message = true
         end
      })
   end
})
-----------------------------------------------------------------------
-- Pour le plaisir, attribuons à nos commandes leur propre raccourci clavier.
-- Ici, nous assignons au raccourci clavier la même chaîne (son nom) que celle
-- que l'on a définie lors de la création de la commandz
keymap.add {
   ["alt+s"] = "simple:setshow",
   ["alt+t"] = "simple:toggle",
}
```

### Lectures complémentaires

- [Lite: An Implementation Overview][3], un excellent article de rxi qui reste pertinent pour lite-xl.
- [Aperçu de l'API][4], ou quelques APIs sont expliquées.


[1]: https://devhints.io/lua
[2]: https://www.lua.org/pil
[3]: https://rxi.github.io/lite_an_implementation_overview.html
[4]: /fr/tutorials/api-overview
