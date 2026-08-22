(function () {
  "use strict";

  var grid = document.getElementById("productGrid");
  var releaseLabel = document.getElementById("releaseLabel");
  var productLetters = {
    "ps2ui": "PS",
    "ps2unity": "U",
    "ps2godot": "G",
    "ps2cocos": "C",
    "ps2unreal": "UE",
    "engine-installer": "EX"
  };

  function assetUrl(product) {
    var asset = product.assets && product.assets[0];
    if (!asset) return product.releaseUrl;
    return "https://github.com/" + product.releaseRepository + "/releases/download/" + encodeURIComponent(product.releaseTag) + "/" + encodeURIComponent(asset);
  }

  function render(products) {
    if (!products || !products.length) {
      grid.innerHTML = '<div class="loading-state error-state">当前没有可用的公开版本清单。</div>';
      return;
    }
    var orderedProducts = products.slice().sort(function (left, right) {
      return left.id === "engine-installer" ? -1 : right.id === "engine-installer" ? 1 : 0;
    });
    grid.innerHTML = orderedProducts.map(function (product) {
      var letter = productLetters[product.id] || "UI";
      var host = (product.supportedHosts || []).join(" · ");
      var kind = product.kind === "photoshop-exporter" ? "DESIGN TOOL" : product.kind === "installer" ? "INSTALLER" : "ENGINE ADAPTER";
      var featured = product.id === "engine-installer";
      return '<article class="product-card' + (featured ? ' product-card-featured' : '') + '">' +
        '<div class="product-top"><span class="product-icon" aria-hidden="true">' + letter + '</span><span class="product-kind">' + (featured ? 'RECOMMENDED' : kind) + '</span></div>' +
        '<h3>' + escapeHtml(product.name) + '</h3>' +
        '<div class="product-host">' + escapeHtml(host) + '</div>' +
        '<div class="product-meta"><span class="product-version">v' + escapeHtml(product.version) + '</span><a class="product-download" href="' + assetUrl(product) + '" target="_blank" rel="noreferrer">下载文件 ↗</a></div>' +
        '</article>';
    }).join("");
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char];
    });
  }

  fetch("./data/releases.json?v=2.1.4", { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("release manifest unavailable");
      return response.json();
    })
    .then(function (manifest) {
      releaseLabel.textContent = "统一发布批次 " + (manifest.releaseTrain || "当前");
      render(manifest.products);
    })
    .catch(function () {
      grid.innerHTML = '<div class="loading-state error-state">版本清单暂时无法读取，请打开 GitHub Release 页面下载。</div>';
    });
})();
