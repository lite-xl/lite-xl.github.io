# Lite XL Website

> **Note**
> This website is still under construction.
> Expect jank and general problems.

This website is written in Markdown with [MkDocs] and [mkdocs-material].
We also use [mkdocs-macros-plugin] for rendering certain pages.

## Getting started

If you want to make small changes without changing how the website
is structured, you can simply use GitHub's online editor and open a PR.

If you want to make huge changes or build the website yourself, install
[poetry] and run:

```sh
$ poetry install
$ poetry run mkdocs serve
```

This will install all dependencies and run `mkdocs serve`.

### Windows

On Windows with MSYS2, there is [an issue] that breaks the minifier we're using.
Instead, install Python with the Python installer and install poetry with pip,
then run the commands above.

You might also need [GTK Runtime] to support all the imaging stuff (e.g. social cards).

The server supports auto code reloading, so the website will automatically
refresh if changes were made.

To build the website, run `poetry run mkdocs build`.
The website will be built in the `site/` directory.

## Configuration

There are a few options configurable by the user via environment variables.
These may be relevant if you fork this repository.

##### `SITE_URL`

This sets the URL of the website.
It is required if you plan to host the website on another domain
(such as personal GitHub Pages).

##### `REPO_URL`

This is the URL of the website repository.
You might want to change this so that the `Edit` buttons work properly.

## Site organization

This project follows typical [MkDocs] file structure.

- `.github/`: CI related files
- `docs/`:
  - `.include/`: Jinja2 macros for [mkdocs-macros-plugin].
  - `about/`
  - `assets/`
    - `screenshots/`: Screenshots of the editor.
    - `user-guide/`: User guide-related content.
      - `settings/`: Demo images for the settings GUI.
    - `favicon.png`
    - `icon.svg`: Vector icon of Lite XL.
    - `keymap-macos.json`: Keymap file for macOS.
    - `keymap.json`: Keymap file for non-macOS platforms.
  - `developer-guide/`
  - `setup/`
  - `stylesheets/`: Custom stylesheets for the entire website.
    - `extra.css`: Styles for custom syntax highlighting.
  - `user-guide/`
  - `index.md`: Homepage.

# Keymap

The "generate keymap" action should be run after each release to update
the keymap.
The keymap generation is currently a two-part process involving some
fix up on our side to match [pymdown]'s syntax.
This can be found in `fix-keymap.py`.



[MkDocs]:               https://www.mkdocs.org/
[mkdocs-material]:      https://squidfunk.github.io/mkdocs-material/
[mkdocs-macros-plugin]: https://mkdocs-macros-plugin.readthedocs.io/en/latest/
[an issue]:             https://github.com/tdewolff/minify/issues/679
[GTK Runtime]:          https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer
[poetry]:               https://python-poetry.org
[pymdown]:              https://facelessuser.github.io/pymdown-extensions/extensions/keys
