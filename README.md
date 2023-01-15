# Lite XL Website

> **Note**
> This website is still under construction.
> Expect jank and general problems.

This website is written in Markdown with [MkDocs] and [mkdocs-material].
We also use [mkdocs-macros-plugin] for rendering certain pages.

## Getting started

To get started, you will need a recent version of Python 3 and pip.

Install the required dependencies with `pip`,
preferably in a virtual environment.

```sh
pip install -r requirements.txt
```

Afterwards, run `mkdocs serve` to start a development web server.

```sh
mkdocs serve
```

The server supports auto code reloading, so the website will automatically
refresh if changes were made.

To build the website, run `mkdocs build`.
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
    - `settings/`: Demo images for the settings GUI.
    - `favicon.png`
    - `icon.svg`: Vector icon of Lite XL.
    - `keymap-macos.json`: Keymap file for macOS.
    - `keymap.json`: Keymap file for non-macOS platforms.
  - `documentation/`
  - `overrides/`: Theme overrides for [mkdocs-material].
    - `assets/`
      - `javascript/`: Custom JavaScript files for the homepage.
      - `stylesheets/`: Custom stylesheets for the homepage.
      - `home.html`: The homepage.
      - `main.html`: The main template for the homepage.
  - `references/`
  - `setup/`
  - `stylesheets/`: Custom stylesheets for the entire website.
  - `user-guide/`
  - `index.md`: Stub file for the homepage.



[MkDocs]:               https://www.mkdocs.org/
[mkdocs-material]:      https://squidfunk.github.io/mkdocs-material/
[mkdocs-macros-plugin]: https://mkdocs-macros-plugin.readthedocs.io/en/latest/