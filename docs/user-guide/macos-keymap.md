---
description: A list of default keyboard shortcuts on macOS.
---

This is the default keyboard shortcuts on macOS.
Your configuration may differ as plugins can modify them.

{% import 'keyboard_renderer.j2' as keybinds %}
{{ keybinds.render_keymap(keymap_macos.map) }}