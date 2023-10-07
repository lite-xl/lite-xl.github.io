# [Lite XL][1] website

This website is built with markdown and a tiny ruby script
as a static site generator.

## Local Build Quick-start Guide

- Install ruby.
- Install the `redcarpet` and `rouge` gems.
  You can install them with `gem install redcarpet rouge`.
- Run `site.rb`. It should generate the website in-place.
  You'll need a HTTP server[₁][2][₂][3] to preview it.

> If you use `python3`'s `http.server`, the links on the website
> may not work correctly as `http.server` requires
> the full filename (with the `.html` file extension)
> while the website does not use that.
> `http-server` does not have this limitation.

## Contributing

Please read [CONTRIBUTING.md][4] for guidelines on how to contribute.

## Repo Structure

- `assets/`: Asset files (images, js, css, etc.)
- `assets/img`: Images used for the website
- `assets/javascript.js`: Main JavaScript file used for the website
- `assets/stylesheet.css`: Main CSS file used for the website
- `locales/`: Localized website content
- `locales/en`: English website content
- `locales/en/template.html`: Template HTML for the english website
- `locales/en/404.md`: The content shown to users when the page is not found
- `.editorconfig`: EditorConfig for this website
- `404.html`: The content shown to users when the page is not found
- `index.html`: A symlink to index.html in the default locale
- `site.rb`: Website generator

## Extra goodies

#### Auto updates

Get [watchexec][5] for watching directories.

```sh
$ watchexec -e md,html -w locales -w assets ./site.rb
```

#### Configuring site.rb

For normal usage you don't need to configure the script at all.
However, some of the behavior can be changed via environment variables.

| Environment Variable | Description
| -------------------- | -----------
| `SITE_ROOT`          | Change the output path of the script\*.
| `SITE_DOMAIN`        | Change the domain used in `sitemap.txt`.
| `SITE_LOCALE`        | Change the default locale of the website.
| `VERBOSE`            | Enable verbose logging.

\* This does not change the URL in generated HTML files.

#### Minification

> **Note**
> This approach only works if you set `SITE_ROOT=deploy`.

You can minify the CSS and JS files by running `npm ci`.
You need to install node.js for this feature.

# Credits

[Material Design Icons][6] are used in the website.
It is licensed under [Apache 2.0 License][7].



[1]: https://github.com/lite-xl/lite-xl
[2]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server
[3]: https://www.npmjs.com/package/http-server
[4]: CONTRIBUTING.md
[5]: https://github.com/watchexec/watchexec
[6]: https://materialdesignicons.com/
[7]: https://github.com/Templarian/MaterialDesign/blob/1d1761974cabe0868441fac6069438e5243d3446/LICENSE