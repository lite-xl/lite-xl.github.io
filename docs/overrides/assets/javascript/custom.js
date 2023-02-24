window.addEventListener("load", function() {
  // since we enabled instant loading, this website is now a SPA.
  // we will need to observe DOM changes instead of onload events.
  var observer = new MutationObserver(function(mutations) {
    for (var i = 0; i < mutations.length; i++) {
      // run platform detection if nodes are added (md-content)
      if (mutations[i].addedNodes.length > 0) {
        changeDownload();
        changeScreenshot();
        return;
      }
      // only change screenshot on theme change
      if (mutations[i].attributeName === "data-md-color-scheme")
        return changeScreenshot();
    }
  });

  /**
   * Gets the platform (OS) of the system.
   * @return {string} "Windows", "macOS" and "Linux"
   */
  function getPlatform() {
    if (window.navigator.platform.indexOf("Win") != -1) {
      return "Windows";
    } else if (window.navigator.platform.indexOf("Mac") != -1) {
      return "macOS";
    // android can use the Linux platform, so we need to check UA
    } else if (window.navigator.platform.indexOf("Linux") != -1 &&
                window.navigator.userAgent.indexOf("Android") == -1) {
      return "Linux";
    }
  }

  /**
   * Gets the CPU architecture of the browser.
   * @return {string} "amd64", "ia32", "arm64"
   */
  function getArch() {
    // regex map copied from https://github.com/faisalman/ua-parser-js
    var cpu = [
      [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i, 'amd64'], // AMD64 (x64)
      [/(ia32(?=;))/i, 'ia32']  ,                                 // IA32 (quicktime)
      [/((?:i[346]|x)86)[;\)]/i, 'ia32'],                         // IA32 (x86)
      [/\b(aarch64|arm(v?8e?l?|_?64))\b/i, 'arm64'],              // ARM64
    ];

    for (var i = 0; i < cpu.length; i++) {
      if (cpu[i][0].test(window.navigator.userAgent)) {
        if (typeof cpu[i][1] === "string")
          return cpu[i][1];
      }
    }
  }

  /**
   * Performs platform detection and gives the correct download metadata.
   * @param  {string}  version The version
   * @return {object?} an object containing download metadata or undefined
   */
  function getDownloadMetadata(version) {
    var metadata = {
      "Windows-amd64": {
        label: "Windows (64-bit)",
        url: "https://github.com/lite-xl/lite-xl/releases/download/" + version + "/LiteXL-" + version + "-addons-x86_64-setup.exe",
        altLabel: "Windows (.zip)",
        altUrl: "https://github.com/lite-xl/lite-xl/releases/download/" + version + "/lite-xl-" + version + "-addons-windows-x86_64.zip"
      },
      "Windows-ia32": {
        label: "Windows (32-bit)",
        url: "https://github.com/lite-xl/lite-xl/releases/download/" + version + "/LiteXL-" + version + "-addons-i686-setup.exe",
        altLabel: "Windows (.zip)",
        altUrl: "https://github.com/lite-xl/lite-xl/releases/download/" + version + "/lite-xl-" + version + "-addons-windows-i686.zip"
      },
      "Linux-amd64": {
        label: "Linux (64-bit AppImage)",
        url: "https://github.com/lite-xl/lite-xl/releases/download/" + version + "/LiteXL-" + version + "-addons-x86_64.AppImage",
        altLabel: "Linux (tar.gz)",
        altUrl: "https://github.com/lite-xl/lite-xl/releases/download/" + version + "/lite-xl-" + version + "-addons-linux-x86_64-portable.tar.gz"
      },
      // yeah the macOS getArch() fails
      "macOS-undefined": {
        label: "macOS",
        url: "https://github.com/lite-xl/lite-xl/releases/download/" + version + "/lite-xl-" + version + "-addons-macos-x86_64.dmg",
        altLabel: "macOS (Apple Silicon)",
        altUrl: "https://github.com/lite-xl/lite-xl/releases/download/" + version + "/lite-xl-" + version + "-addons-macos-arm64.dmg"
      }
    };
    return metadata[getPlatform() + "-" + getArch()];
  }

  /**
   * Changes the download links based on platform detection.
   */
  function changeDownload() {
    var metadata;
    var download = document.getElementById("download-button");
    var altDownload = document.getElementById("alt-download-button");

    // avoid infinite loops because MutationObserver keeps firing
    if (!download || download.dataset.platformDetected === "true") return;
    metadata = getDownloadMetadata(download.dataset.latestVersion);

    if (metadata) {
      // show the download icon
      download.firstElementChild.style.removeProperty("display");

      // modify the text inside to match the platform
      download.lastChild.textContent = " " + metadata.label;
      download.href = metadata.url;

      // save the state to the element
      download.dataset.platformDetected = "true";

      // alt download supported
      if (metadata.altLabel) {
        altDownload.lastChild.textContent = " " + metadata.altLabel;
        altDownload.href = " " + metadata.altUrl;
        altDownload.style.removeProperty("display");
      }
    }
  }

  /**
   * Changes the screenshot depending on the theme
   */
  function changeScreenshot() {
    var screenshot = document.getElementById("screenshot-main");
    if (!screenshot) return;

    var theme = document.body.dataset.mdColorScheme === "slate" ? "default" : "summer";
    var newURL = screenshot.src.replace(/theme-.+\.png$/, "theme-" + theme + ".png")
    if (screenshot.src !== newURL)
      screenshot.src = newURL;
  }

  // try to run once
  changeDownload();
  changeScreenshot();
  observer.observe(document.body, { childList: true, attributes: true });
});