# Keymap (macOS)

This is the keymap on non-macOS platforms.

{% import 'keyboard_renderer.j2' as keybinds with context %}

| Command | Keys
| ------- | ----
{%- for item in keymap %}
`{{ item[0] }}` | {{ keybinds.render(item[1]) }}
{%- endfor %}