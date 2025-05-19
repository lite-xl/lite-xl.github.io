# Lite XL Website

This website is written in Markdown with [MkDocs] and [mkdocs-material].
We also use [mkdocs-macros-plugin] for rendering certain pages.

## Getting started

If you want to make small changes without changing how the website
is structured, you can simply use GitHub's online editor and open a PR.

If you want to make huge changes or build the website yourself, install
[uv] and run:

```sh
$ uv run mkdocs serve
```

This will install all dependencies and run `mkdocs serve`.

### Minification

The website uses [pub-minifier] to create minified JS, CSS and HTML code
when running `mkdocs build`.
The minification is optional and will only take place if you have the tools.
To use this feature, run the following commands instead of `uv run mkdocs build`:

```sh
$ npm ci
$ npm run build
```

These commands assume that you have node.js installed.

### Windows

You might need [GTK Runtime] to support all the imaging stuff (e.g. social cards).

The server supports auto code reloading, so the website will automatically
refresh if changes were made.

To build the website, run `uv run mkdocs build`.
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

##### `LITE_XL_VERSION`

This is the version of Lite XL to download in the setup page.

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
- `overrides/`: Overrides for the theme

# Keymap

The "generate keymap" action should be run after each release to update
the keymap.
This workflow should run automatically, provided that the API keys used
to invoke this workflow is still valid.

The keymap generation is currently a two-part process involving some
fix up on our side to match [pymdown]'s syntax.
This can be found in `fix-keymap.py`.



[MkDocs]:               https://www.mkdocs.org/
[mkdocs-material]:      https://squidfunk.github.io/mkdocs-material/
[mkdocs-macros-plugin]: https://mkdocs-macros-plugin.readthedocs.io/en/latest/
[pub-minifier]:         https://mkdocs-publisher.github.io/setup/seo-and-sharing/pub-minifier/
[GTK Runtime]:          https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer
[uv]:                   https://docs.astral.sh/uv/
[pymdown]:              https://facelessuser.github.io/pymdown-extensions/extensions/keys
