# API Process

Lite XL fournit une API Process pour lancer des applications externes. Cette
API a pour but de remplacer `io.popen` de Lua et l'approche [pipe-to-a-file][1] de Lite.

Les avantages de cette API comprennent :

- Un argument avec un échappement propre (les arguments sont fournis via une table)
- E-S non bloquante
- Possibilité de détacher les processus de Lite XL [(en cours d'élaboration)][2]
- Ne créer pas de fichiers temporaires
- Principalement multiplateforme (ne requiert pas de code spécial pour chaque shell)

## Usage de l'API Process

### Gestion d'erreurs

- `process.start()` peut générer des erreurs s'il ne peut pas exécuter le programme.
- `process.read*` er `process.write` peuvent générer des erreurs si :
  - le processus s'est achevé
  - le processus a fermé le flux
  - vous avez fermé le flux
- il pourrait y avoir d'autres erreurs auxquelles s'attendre également

### Démarrer un processus

Pour démarrer un processus, utilisez `process.start(args, options)`.

Voici quelques arguments parmi les plus utiles :

- `args`: L'exécutable et des arguments, eg: `{ "sh", "-c", "echo hello world" }`
- `options`: Options pour `process.start()`
  - `env`: A key-value table containing the env. **Note that if this is provided,
            environment variables will not be inherited.**
  - `stdin`: Specify where to redirect stdin
  - `stdout`: Specify where to redirect stdout
  - `stderr`: Specify where to redirect stderr

for `options.std{in,out,err}`, valid values are:

- `process.REDIRECT_PIPE` (Make it available to subprocess API for reading / writing)
- `process.REDIRECT_DISCARD` (Discard the output. Use this to prevent buffering)
- `process.REDIRECT_STDOUT` (`stderr` only, for redirecting `stderr` to `stdout`)

### Reading from process
To read from `stdout` or `stderr` of a process, use `process:read_stdout()` and
`process:read_stderr()` respectively.

You can specify a numeric argument to them, which will change the size of internal buffer used
to read the output.

Alternatively, you could use `process:read()` with `process.STREAM_STDERR` and `process.STREAM_STDOUT`.

**Example:**

```lua
local proc = process.start { "sh", "-c", "echo hello world!" }

-- do not use `while proc:running()` if you care about output.
-- The process could die and leave data in the buffer
-- You should just read until `proc:read_stdout()` returns nil
while true do
  local rdbuf = proc:read_stdout()
  if not rdbuf then break end
  -- yay, output
end
```

### Writing to process
You can use `process:write(data)` to write a string to `stdin`.

### Checking completion
- `process:running()` returns a boolean to indicate whether if the process is running.
- `process:wait(time)` also does the same thing, but you specify how long it should wait (or 0 to return immediately).

### Terminating process
- `process:terminate()` sends SIGTERM (or Windows equivalent) to the process.
- `process:kill()` sends SIGKILL (or Windows equivalent) to the progress.
**Use this only if `process:terminate()` cannot kill the process, [as it can cause issues][3].**

### Misc
- `process:pid()` returns the PID of the process.
**There are no guarantees for this PID to be correct if the process terminated early.**
- `process:returncode()` returns the exit code of the process, if any
- `process:close_stream()` closes `stdin`, `stdout` or `stderr` stream of the process.


[1]: https://github.com/rxi/console/blob/fb3d414d085d4110364314d6cd8380dc1d386249/init.lua#L100
[2]: https://github.com/lite-xl/lite-xl/pull/535
[3]: http://turnoff.us/geek/dont-sigkill/
