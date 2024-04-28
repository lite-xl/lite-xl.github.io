# API System

C'est ici que le code Lua de Lite XL interagit avec son moteur C sous-jacent.
Certaines fonctionnalités ici seront omises car elles ne sont pas utiles pour
les plugins.

## Presse-papier

- `system.set_clipboard(text)` définit le contenu du presse-papier.
- `system.get_clipboard()` récupère le contenu du presse-papier.

## Manipulation de fichier / répertoire

- `system.list_dir(dir)` renvoie une liste de noms de fichiers dans un répertoire.
- `system.rmdir(dir)` supprime un répertoire. Utilisez-le au lieu de `os.remove()`.
  **Le répertoire doit être vide.**
- `system.chdir(dir)` modifie le répertoire de travail actuel (comme `cd`).
- `system.mkdir(dir)` crée un nouveau répertoire.
  **Il ne crée pas de répertoire récursivement.**
- `system.absolute_path(path)` convertit les composants du chemin (`.. and .`)
  en un chemin absolu.
- `system.get_file_info(path)` renvoie des informations sur le chemin :
  - `modified` : date de la dernière modification en secondes depuis l'époque UNIX.
  - `size` : taille du fichier en octets.
  - `type` : type de chemin (`"file"` ou `"dir"`).

## Minutage

- `system.get_time()` renvoie le temps en secondes (sous forme de nombre flottant) depuis que Lite XL a été lancé.
  Utilisez-le au lieu de `os.time()` pour des minuteurs de plus haute précision.
- `system.sleep(time)` endort pendant `time` en millisecondes.
  **N'utilisez pas cette fonction. Écrivez du code asynchrone.**

## Manipulation de fenêtre

- `system.set_window_opacity(o)` définit l'opacité de la fenêtre de 0 à 1.
- `system.set_window_title(title)` définit le titre de la fenêtre.
- `system.set_window_mode(mode)` définit le mode de la fenêtre :
  - `"normal"` : aussi connu sous le nom de "restored" sur Windows.
  - `"maximized"` : Maximise la fenêtre.
  - `"minimized"` : Réduit la fenêtre.
  - `"fullscreen"` : Plein écran.
- `system.set_window_bordered(bordered)` active ou désactive les bordures de
  la fenêtre (décoration).
- `system.set_window_hit_test(height, control_width, resize_border)` définit
  le hit test de la fenêtre (utilisé par `config.borderless` pour créer des
  bordures personnalisées interactives).
  - Si aucun argument n'est renseigné, réinitialise les valeurs du hit test.
  - `height` : hauteur de la barre de titre.
  - `controls_width` : Pas très sûr à ce sujet, mais ça doit être la taille
    des contrôles de la barre de titre (les boutons Maximiser, Réduire et
    Normal sur la droite).
    Ils semblent être fixé sur le côté droit de la barre de titre.
  - `resize_border` : Nombre de pixels réservés pour redimensionner la
    fenêtre (lui définir une grande valeur signifie que vous pouvez
    redimensionner la fenêtre plus facilement).
- `system.get_window_size()` renvoie les dimensions de la fenêtre.
- `system.set_window_size(w, h, x, y)` définit les dimensions de la fenêtre
  (et aussi la position).
- `system.window_has_focus()` vérifie si la fenêtre est au premier plan.
- `system.show_fatal_error(title, msg)` affiche une erreur système sous la
  forme d'une boîte de dialogue.
  **Utilisez nagview chaque fois que cela est possible.**

## Divers

- `system.exec(command)` exécute une commande. Utilisez [l'API Process][1] à la place.
- `system.fuzzy_match(haystack, needle, file)` génère un score dépendant de
  la proximité de `needle` avec `haystack`.
  - `file`: apparie à l'envers (plus précis pour l'appariement de nom de fichier).

[1]: /fr/tutorials/overview/process
