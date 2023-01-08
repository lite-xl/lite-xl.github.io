# Keymap

This is the keymap on macOS.

{% import 'keyboard_renderer.j2' as keybinds with context %}

| Command | Keys
| ------- | ----
{%- for item in keymap_macos %}
`{{ item[0] }}` | {{ keybinds.render(item[1]) }}
{%- endfor %}