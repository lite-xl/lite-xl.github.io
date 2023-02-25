---
description: A list of default keyboard shortcuts on Windows,
            Linux and other non-macOS platforms.
---

This is the default keyboard shortcuts on non-macOS platforms.
Your configuration may differ as plugins can modify them.

{% import 'keyboard_renderer.j2' as keybinds with context %}

| Command | Keys
| ------- | ----
{%- for item in keymap %}
`{{ item[0] }}` | {{ keybinds.render(item[1]) }}
{%- endfor %}