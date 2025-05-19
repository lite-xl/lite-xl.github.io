---
description: Learn how Lite XL loads syntax definitions and themes.
---

# Syntaxes and Themes

In Lite XL, adding support for different programming languages is accomplished by adding
syntax definitions to the tokenizer.
The highlighter uses the tokenizer to get a stream of tokens, and queries the visual styles
from the current theme.
The tokens are then rendered to the window.

Syntax definition and theme files are Lua files that are loaded during Lite XL initialization.
Syntax definition calls `syntax.add()` while theme files manipulate the values in the `styles` table.

## In this section

| Topic               | Description
| -----               | -----------
| [Creating Syntaxes] | Learn how to add support for other programming languages.
| [Creating Themes]   | Learn how to create themes.


[Creating Syntaxes]: ./creating-syntaxes.md
[Creating Themes]:   ./creating-themes.md
