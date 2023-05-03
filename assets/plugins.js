/*
 * Manifest based plugins browser.
 * @license MIT Lite XL Team
 */

/**
 * A plugin details.
 * @typedef {Object} PluginInfo
 * @property {string} id
 * @property {(string|null)} name
 * @property {string} description
 * @property {(string|null)} icon
 * @property {string} version
 * @property {string} mod_version
 * @property {(string|null)} path
 * @property {(string|null)} remote
 * @property {number} search_score
 */

/**
 * The list of plugins.
 * @typedef {Object} PluginsList
 * @property {PluginInfo[]} addons
 */

class Plugins {
  /**
   * @param {Object} options
   */
  constructor(options) {
    /** @type {PluginsList} */
    this.plugins = [];

    this.plugins_icon = "/assets/img/plugin.svg";

    /** @type {string[]} */
    this.featured_plugins = [
      "autoinsert",
      "bracketmatch",
      "editorconfig",
      "ephemeral_tabs",
      "lsp",
      "selectionhighlight"
    ];

    /** @type {HTMLElement} */
    this.page_plugins = document.querySelector(options.page_plugins);
    /** @type {HTMLElement} */
    this.page_info = document.querySelector(options.page_info);
    /** @type {HTMLElement} */
    this.query = document.querySelector(options.query);
    /** @type {HTMLElement} */
    this.submit = document.querySelector(options.submit);
    /** @type {HTMLElement} */
    this.results = document.querySelector(options.results);

    this.text = options.text;

    var that = this;
    this.query.addEventListener("keypress", function(event){
      if(event.key == "Enter") {
        that.search();
      }
    });
    this.submit.addEventListener("click", function(){
      that.search();
    });

    fetch("https://raw.githubusercontent.com/lite-xl/lite-xl-plugins/master/manifest.json")
      .then((response) => response.json())
      .then((json) => this.plugins = json)
      .then(() => {
        if(window.location.search) {
          this.loadPath(window.location.search);
        } else {
          this.render()
        }
      })
    ;

    showdown.setOption('openLinksInNewWindow', true);
    showdown.setFlavor('github');
    this.md_converter = new showdown.Converter();

    /** @type {HTMLElement} */
    this.shown_plugin = null;

    window.addEventListener("popstate", function() {
      that.loadPath(window.location.search);
    });
  }

  /**
   * Set a list of plugin id's to be listed as featured.
   * @param {string[]} list
   */
  set featured(list) {
    this.featured_plugins = list;
  }

  /**
   * @param {string} icon
   */
  set defaultPluginIcon(icon) {
    this.plugins_icon = icon;
  }

  render() {
    if (!this.query || !this.submit || !this.results) {
      return false;
    }

    this.renderFeatured();
    this.renderRandom();
    this.renderLanguages();
  }

  /**
   * @param {PluginInfo} plugin
   * @return {HTMLElement}
   */
  renderPlugin(plugin) {
    var box = document.createElement("div");
    box.className = "plugin";

    var icon_path = plugin.icon || this.plugins_icon;

    var author = "lite-xl";
    if (plugin.remote) {
      var ele = document.createElement("a");
      ele.href = plugin.remote;

      var results = ele.pathname.match("/([^\\/]+)/");
      if (results && results.length > 0) {
        author = results[1];
      }
    }

    var version = "v" + plugin.version;

    box.innerHTML = '<div class="icon">'
      + '<img src="'+icon_path+'" />'
      + '</div>'
      + '<div class="title">'
      + (plugin.name || plugin.id)
      + '</div>'
      + '<div class="info">'
      + '<div class="author">' + author + '</div>'
      + '<div class="version">' + version + '</div>'
      + '</div>'
    ;

    var that = this;
    box.addEventListener("click", function(){
      that.showPluginInfo(plugin);
    })

    return box;
  }

  renderSection(title, items_callback) {
    var heading = document.createElement("h2");
    heading.innerText = title;

    this.results.append(heading);

    var container = document.createElement("div");
    container.className = "container";

    var plugins = items_callback();
    for (var index in plugins) {
      container.append(this.renderPlugin(plugins[index]));
    }

    this.results.append(container);
  }

  renderFeatured() {
    var that = this;
    this.renderSection(this.text.featured, function(){
      var plugins = [];
      for (var index in that.featured_plugins) {
        var plugin = that.getItem(that.featured_plugins[index]);
        if (plugin) {
          if (!plugin.name)
            that.setPluginName(plugin);
          plugins.push(plugin);
        }
      }
      return plugins;
    });
  }

  renderRandom() {
    var that = this;
    this.renderSection(this.text.fortune, function(){
      return that.getRandom(that.plugins.addons, null, /^language_/);
    });
  }

  renderLanguages() {
    var that = this;
    this.renderSection(this.text.languages, function(){
      var languages = [];
      for (var index in that.plugins.addons) {
        var plugin = that.plugins.addons[index];
        if (plugin.id.match(/^language_/)) {
          plugin = Object.assign({}, that.plugins.addons[index]);
          plugin.name = plugin.id.split(/[_\-]/).splice(1);
          languages.push(plugin);
        }
      }
      return that.getRandom(languages);
    });
  }

  /**
   * Retrieve the raw resource url for github or gitlab.
   */
  getRawURL(repo, path, branch, hoster) {
    if (hoster == "github")
      return "https://raw.githubusercontent.com"+repo+"/"+branch+"/"+path;
    else if (hoster == "gitlab")
      return "https://gitlab.com"+repo+"/-/raw/"+branch+"/"+path;
    return "";
  }

  /**
   * Retrieve a blob resource url for github or gitlab.
   */
  getURL(repo, path, branch, hoster) {
    if (hoster == "github")
      return "https://github.com"+repo+"/blob/"+branch+"/"+path;
    else if (hoster == "gitlab")
      return "https://gitlab.com"+repo+"/-/blob/"+branch+"/"+path;
    return "";
  }

  /**
   * Retrieve a blob resource url for github or gitlab.
   */
  getTreeURL(repo, branch, hoster) {
    if (hoster == "github")
      return "https://github.com"+repo+"/tree/"+branch;
    else if (hoster == "gitlab")
      return "https://gitlab.com"+repo+"/-/tree/"+branch;
    return "";
  }

  changePath(query) {
    var path = window.location.pathname;
    var params = "?";
    for (var param in query) {
      params += param + "=" + encodeURI(query[param]) + "&";
    }
    params = params.replace(/&$/, "");

    if (window.location.search != params) {
      window.history.pushState(
        null, null, path + params
      );
    }
  }

  loadPath(search) {
    this.hidePluginInfo();
    if (search && search != "") {
      var search = search.substring(1);
      var params = JSON.parse(
        '{"' + search.replace(/&/g, '","').replace(/\=/g,'":"') + '"}',
        function(key, value) {
          return key === "" ? value : decodeURIComponent(value)
      });

      if (params.plugin) {
        this.showPluginInfo(this.getItem(params.plugin));
      } else if (params.q) {
        this.query.value = params.q;
        this.search();
      }
    } else {
      this.query.value = "";
      this.search();
    }
  }

  /**
   * @param {string} path
   * @param {HTMLElement} readme
   * @param {string} hoster
   * @param {string} subpath
   */
  fetchReadme(path, readme, hoster, branch, subpath) {
    var that = this;
    setTimeout(async function(){
      var branches = [
        "master",
        "main"
      ];

      if (branch) branches = [branch];

      var readme_files = [
        "README.md",
        "readme.md"
      ];

      for (var b in branches) {
        var found = false;
        for (var i in readme_files) {
          var url = that.getRawURL(
            path, subpath + readme_files[i], branches[b], hoster
          );
          var response = await fetch(url);
          if (response.ok) {
            var text = await response.text();
            text = that.md_converter.makeHtml(text)
            text = text.replace(/<\s*script[^>]*>[\w\s\d\p]*<\s*\/\s*script\s*>/gi, "")
              // just in case the above failed for some instances...
              .replace(/<\s*script[^>]*>/gi, "")
              // naively try to clean all event attributes
              .replace(/on[\w]+\s*=\s*"[^"]*"/gi, "")
            ;
            readme.innerHTML = text
            var images = readme.querySelectorAll("img");
            for (var index in images) {
              /** @type {HTMLImageElement} */
              var image = images[index];
              if (image.getAttribute && !image.getAttribute("src").match(/https?:/))
                image.src = that.getRawURL(
                  path, subpath + image.getAttribute("src"), branches[b], hoster
                );
            }
            var links = readme.querySelectorAll("a");
            for (var index in links) {
              /** @type {HTMLAnchorElement} */
              var link = links[index];
              if (link.getAttribute && !link.getAttribute("href").match(/https?:/))
                link.href = that.getURL(
                  path, subpath + link.getAttribute("href"), branches[b], hoster
                );
            }
            hljs.highlightAll();
            found = true;
            break;
          }
        }
        if (found) break;
      }
    }, 0);
  }

  /**
   * @param {string} path
   * @param {HTMLElement} readme
   * @param {string} hoster
   * @param {string} subpath
   */
  fetchPluginAsReadme(path, readme, hoster, branch, subpath) {
    var that = this;
    setTimeout(async function(){
      var branches = [
        "master",
        "main"
      ];

      if (branch) branches = [branch];

      for (var b in branches) {
        var url = that.getRawURL(
          path, subpath, branches[b], hoster
        );
        var response = await fetch(url);
        if (response.ok) {
          var text = await response.text();
          text = that.md_converter.makeHtml("```lua\n"+text+"\n```");
          readme.innerHTML = text
          var download = document.createElement("div");
          download.className = "download button";
          var download_link = document.createElement("a");
          download_link.innerHTML = '<svg style="width:24px;height:24px" viewBox="0 0 24 24">'
            + '<path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />'
            + '</svg>'
            + that.text.download
          ;
          download_link.href = that.getRawURL(
            path, subpath, branches[b], hoster
          );
          download.append(download_link);
          var plugin_details = document.querySelector(".plugin-details");
          plugin_details.append(download);
          plugin_details.insertBefore(download, readme);
          hljs.highlightAll();
          break;
        }
      }
    }, 0);
  }

  /**
   * @param {HTMLElement} plugin_info
   */
  hidePluginInfo(plugin_info) {
    if (plugin_info) {
      plugin_info.remove();
    } else if (this.shown_plugin) {
      this.shown_plugin.remove();
      this.shown_plugin = null;
    }
    document.title = "Lite XL - " + this.text.plugins;
    this.page_plugins.style.display = "block";
  }

  showPluginInfo(plugin) {
    var icon_path = plugin.icon || this.plugins_icon;

    var author = "lite-xl";
    var repo = "";
    var url = "";
    var url_text = "";
    var hoster = "";
    var subpath = "";
    var branch = null;
    if (plugin.remote) {
      var ele = document.createElement("a");
      ele.href = plugin.remote;
      repo = ele.pathname.replace(/:.+$/, "");

      var branch_result = ele.pathname.match(/:(.+)$/);
      if (branch_result) {
        branch = branch_result[1];
      }

      url = ele.protocol + "//" + ele.host + repo;
      url_text = url.replace(/^https?:\/\//, "");

      var results = ele.pathname.match("/([^\/]+)/");
      if (results && results.length > 0) {
        author = results[1];
      }

      results = ele.host.match(/(github|gitlab)\.com/);
      if (results)
        hoster = results[1];
    } else if(plugin.path) {
      url = this.getURL("/lite-xl/lite-xl-plugins", plugin.path, "master", "github")
      url_text = "lite-xl-plugins/"+plugin.path;
      if (!plugin.path.match(/\.lua$/)) {
        hoster = "github"
        repo = "/lite-xl/lite-xl-plugins";
        subpath = plugin.path + "/";
      }
    }

    var version = "v" + plugin.version;
    var version_url = "";

    var infobox = document.createElement("div");
    infobox.className = "plugin-details";

    var readme = document.createElement("div");
    readme.className = "readme markdown-body";

    if (hoster != "") {
      this.fetchReadme(repo, readme, hoster, branch, subpath);
      if (plugin.remote) {
        version_url = 'href="'+this.getTreeURL(repo, branch, hoster)+'"';
      }
    }
    else if(plugin.path && !plugin.remote) {
      branch = branch || "master";
      this.fetchPluginAsReadme("/lite-xl/lite-xl-plugins", readme, "github", branch, plugin.path);
      version_url = 'href="'
        + this.getURL("/lite-xl/lite-xl-plugins", plugin.path, branch, "github")
        + '"'
      ;
    }

    infobox.innerHTML = '<div class="details">'
      + '<div class="icon">'+'<img src="'+icon_path+'" />'+'</div>'
      + '<div class="info">'
      + '<div class="title">'+(plugin.name || plugin.id)+'</div>'
      + '<div class="subinfo">'
      + '<div class="author">'+author+'</div>'
      + '<div class="version"><a target="_blank" '+version_url+'>'+version+'</a></div>'
      + '<div class="url"><a target="_blank" href="'+url+'">'+url_text+'</a></div>'
      + '</div>'
      + '<div class="description">'
      + this.md_converter.makeHtml(plugin.description)
      + '</div>'
      + '<div><strong>'+this.text.installation+':</strong></div>'
      + '<div class="install">'
      + '<div class="command">lpm install '+plugin.id+'</div>'
      + '</div>'
      + '</div>'
      + '</div>'
    ;

    var copy = document.createElement("button");
    copy.className = "copy";
    copy.innerText = this.text.copy;
    copy.addEventListener("click", function(){
      navigator.clipboard.writeText(
        document.querySelector(".plugin-details .command").textContent
      );
    });
    infobox.querySelector(".plugin-details .install").append(copy);

    infobox.append(readme);

    this.hidePluginInfo();

    this.shown_plugin = infobox;

    this.page_plugins.style.display = "none";
    this.page_info.append(infobox);

    document.title = "Lite XL - "
      + (plugin.name || plugin.id)
      + " " + this.text.plugin
    ;

    this.changePath({plugin: plugin.id});
  }

  /**
   * @param {string} haystack
   * @param {string[]} needles
   * @return {number}
   */
  match(haystack, needles) {
    haystack = haystack.toLowerCase();
    var found = 0;
    for (var index in needles) {
      var results = haystack.match(needles[index]);
      if (results) {
        found += results.length;
      }
    }
    return found;
  }

  search() {
    if (this.query.value.trim() != "") {
      /** @type {string} */
      var query = this.query.value.trim();

      this.changePath({q: query});

      query = query.toLowerCase();

      var needles = query.split(/\s+/);

      /** @type {PluginInfo[]} */
      var found_plugins = [];

      for (var index in this.plugins.addons) {
        var plugin = this.plugins.addons[index];
        plugin.search_score = 0;
        var found = false;
        var matches = 0;
        if (plugin.name) {
          matches = this.match(plugin.name, needles);
          plugin.search_score += matches * 50;
        } else {
          matches = this.match(plugin.id, needles);
          plugin.search_score += matches * 50;
        }

        if (matches > needles.length - 1) {
          found = true;
        }

        if (plugin.description) {
          matches = this.match(plugin.description, needles);
          plugin.search_score += matches * 10;

          if (!found && matches > needles.length - 1) {
            found = true;
          }
        }

        if (found) {
          if(!plugin.name)
            this.setPluginName(plugin);
          found_plugins.push(plugin);
        }
      }

      this.results.innerHTML = "";
      this.renderSection(this.text.results + ": " + found_plugins.length, function(){
        return found_plugins.sort(function(a, b) {
          if (a.search_score == b.search_score) return 0;
          return a.search_score > b.search_score ? -1 : 1;
        });
      });
    } else {
      this.results.innerHTML = "";
      this.render();
    }
  }

  /**
   * Retrieve a random list of plugins.
   * @param {PluginInfo[]} list
   * @param {number} amount
   * @param {RegExp} filter_regex
   * @return {PluginInfo[]}
   */
  getRandom(list, amount, filter_regex) {
    amount = amount || 12;
    var plugins_len = list.length;
    var plugins = {};
    for (var i=0; i<amount; i++) {
      var position = Math.floor(Math.random() * plugins_len) + 1;
      position--;
      while(
        plugins[position]
        ||
        !list[position]
        ||
        (
          filter_regex
          &&
          list[position].id.match(filter_regex)
        )
      ) {
        position = Math.floor(Math.random() * plugins_len) + 1;
      }
      plugins[position] = list[position];
      if (!plugins[position].name)
        this.setPluginName(plugins[position]);
    }
    return plugins;
  }

  /**
   * @param {PluginInfo} plugin
   */
  setPluginName(plugin) {
    if (!plugin.name)
      plugin.name = plugin.id.replace(/[_\-]/g, " ");
  }

  /**
   * @param {string} id_name
   * @return {(PluginInfo|null)}
   */
  getItem(id_name) {
    for (var index in this.plugins.addons) {
      if (
        this.plugins.addons[index].id == id_name
        ||
        this.plugins.addons[index].name == id_name
      ) {
        return this.plugins.addons[index];
      }
    }

    return null;
  }
}