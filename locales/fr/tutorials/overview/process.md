# API Process

Lite XL fournit une API Process pour lancer des applications externes. Cette
API a pour but de remplacer `io.popen` de Lua et l'approche [pipe-to-a-file][1] de Lite.

Les avantages de cette API comprennent :

- Un argument avec un échappement propre (les arguments sont fournis via une table)
- E-S non bloquante
- Possibilité de détacher les processus de Lite XL [(en cours d'élaboration)][2]
- Ne crée pas de fichiers temporaires
- Principalement multiplateforme (ne requiert pas de code spécial pour chaque shell)

## Utilisation de l'API Process

### Gestion d'erreurs

- `process.start()` peut générer des erreurs s'il ne peut pas exécuter le programme.
- `process.read*` et `process.write` peuvent générer des erreurs si :
  - le processus s'est achevé
  - le processus a fermé le flux
  - vous avez fermé le flux
- Il pourrait y avoir d'autres erreurs auxquelles s'attendre également.

### Démarrage du processus

Pour démarrer un processus, utilisez `process.start(args, options)`.

Voici quelques arguments parmi les plus utiles :

- `args` : L'exécutable et les arguments, eg : `{ "sh", "-c", "echo hello world" }`
- `options` : Options pour `process.start()`
  - `env` : Une table de clés-valeurs contenant des variables d'environnement.
  **Notez que si cet argument est fourni, les variables d'environnement ne
  seront pas héritées.**
  - `stdin` : Spécifie où rediriger stdin.
  - `stdout` : Spécifie où rediriger stdout.
  - `stderr` : Spécifie où rediriger stderr.

Pour `options.std{in,out,err}`, les valeurs valides sont :

- `process.REDIRECT_PIPE` (met le processus à disposition de l'API subprocess
  pour la lecture / l'écriture)
- `process.REDIRECT_DISCARD` (rejette la sortie. Utilisez-le pour empêcher le
  buffering)
- `process.REDIRECT_STDOUT` (seulement pour `stderr`, pour rediriger `stderr`
  vers `stdout`)

### Lecture du processus

Pour lire depuis le `stdout` ou `stderr` d'un processus, utilisez respectivement
`process:read_stdout()` et `process:read_stderr()`.

Vous pouvez leur spécifier un argument numérique, qui changera la taille de
la mémoire tampon interne utilisée pour lire la sortie.

Autrement, vous pouvez utiliser `process:read()` avec `process.STREAM_STDERR`
et `process.STREAM_STDOUT`.

**Exemple :**

```lua
local proc = process.start { "sh", "-c", "echo hello world!" }

-- n'utilisez pas `while proc:running()` si vous vous souciez de la sortie
-- le processus pourrait s'arrêter et laisser des données dans la mémoire tampon
-- vous devriez seulement lire jusqu'à ce que `proc:read_stdout()` renvoie nil
while true do
  local rdbuf = proc:read_stdout()
  if not rdbuf then break end
  -- youpi, une sortie
end
```

### Écriture dans le processus

Vous pouvez utiliser `process:write(data)` pour écrire une chaîne de
caractères dans `stdin`.

### Vérification de la complétion

- `process:running()` renvoie un booléen pour indiquer si le processus est en
  cours d'exécution.
- `process:wait(time)` fait la même chose, mais vous spécifiez le temps d'attente (ou 0 pour renvoyer immédiatement).

### Interruption du processus

- `process:terminate()` envoie un SIGTERM (ou l'équivalent Windows) au
  processus.
- `process:kill()` envoie un SIGKILL (ou l'équivalent Windows) au processus.
  **Utilisez-le seulement si `process:terminate()` ne peut pas tuer le
  processus, [car cela peut poser des problèmes][3].**

### Divers

- `process:pid()` renvoie l'identifiant du processus (PID).
  **Il n'y a aucune garantie que ce PID soit correct si le processus est
  interrompu plus tôt.**
- `process:returncode()` renvoie le code de sortie du processus s'il y en a un.
- `process:close_stream()` ferme le flux `stdin`, `stdout` ou `stderr` du processus.


[1]: https://github.com/rxi/console/blob/fb3d414d085d4110364314d6cd8380dc1d386249/init.lua#L100
[2]: https://github.com/lite-xl/lite-xl/pull/535
[3]: http://turnoff.us/geek/dont-sigkill/
