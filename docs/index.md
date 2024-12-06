---
title: Lite XL - Fast, Lightweight and Powerful Text-Editing Experience
hide:
  - toc
  - navigation
---

<style>
    /* hide the "view page source" and "edit page" buttons */
    .md-content__button, .md-source-file, .md-footer__inner.md-footer__inner {
        display: none;
    }
</style>

<div class="hero flex-center" markdown>
<div markdown>

# Fast, Lightweight and Powerful Text-Editing Experience { #headline }

A simple, fast, feature-filled and extremely extensible text editor
written in C and Lua, adapted from [lite].
{ .text-center .no-margin-top }

<div class="downloads" markdown>

[Download :material-download:](#lets-get-started){ .button .md-button .md-button--primary }
[GitHub :material-github:][github]{ .button .md-button }

</div>

<div class="footer" markdown>
<span markdown>
:material-linux: :material-microsoft-windows: :material-apple:
</span>
Available for Linux, Windows and macOS
{ .text-align-center }
</div>

</div>
</div>

![Lite XL with summer theme][summer]{ data-gallery=screenshot-light }
![Lite XL with default theme][default]{ data-gallery=screenshot-dark }

# All the things you want for editing. { .text-center .no-margin-top }

<div class="grid cards" markdown>

-   :material-feather:{ .lg .middle } **Lightweight**
    
    ---

    Lite XL is super lightweight;
    10 MB of RAM and no GPU requirements at all.
    If your platform is supported by SDL2, **it will work**.

-   :material-lightning-bolt:{ .lg .middle } **Powerful**

    ---

    Lite XL is powerful and has many features of a "modern" text editor.
    Multiline editing, autocomplete and pane splitting are supported by default.

-   :material-magnify:{ .lg .middle } **Hackable**

    ---

    Lite XL is insanely hackable — there are no rigid plugin API to hold you back.
    Override anything and everything, do whatever you want.

</div>

<div class="grid cards" markdown>

-   :material-code-tags:{ .lg .middle } **Customizable**

    ---
    
    Lite XL is extremely customizable, completely scriptable with Lua.
    In fact, most of Lite XL is written entirely in Lua, C is only
    used when necessary.

-   :material-connection:{ .lg .middle } **Hyperextensible**

    ---

    If Lite XL doesn't provide a feature you want, it's probably available
    with a plugin. Add and remove features from your editor at will.

</div>

# Let's get started. { .text-center style="margin-top:1.25em" }

<div class="grid cards" markdown>

-   :octicons-download-24:{ .lg .middle } **Install**

    ---

    Learn how to install Lite XL from the official release,
    package managers and from source.

    [:octicons-arrow-right-24: Set Up][setup]

-   :octicons-command-palette-24:{ .lg .middle } **Customize**

    ---

    Learn how to use Lite XL and customize it to suit your needs.

    [:octicons-arrow-right-24: User Guide][user-guide]

-   :octicons-book-24:{ .lg .middle } **Learn**

    ---

    Learn how to add functionality to Lite XL by writing
    themes and plugins!

    [:octicons-arrow-right-24: Developer Guide][developer-guide]

</div>


[lite]:            https://github.com/rxi/lite
[github]:          https://github.com/lite-xl/lite-xl
[summer]:          ./assets/screenshots/theme-summer.png#only-light
[default]:         ./assets/screenshots/theme-default.png#only-dark
[setup]:           setup/getting-started.md
[user-guide]:      user-guide/introduction.md
[developer-guide]: developer-guide/index.md
