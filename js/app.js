/* ============================================================
 * 梅西耶之旅 —— 页面渲染与分页逻辑
 * ============================================================ */
(function () {
  "use strict";

  var PER_PAGE = 4;

  var grid = document.getElementById("grid");
  var pager = document.getElementById("pager");
  var pageLabel = document.getElementById("pageLabel");
  var stat = document.getElementById("stat");
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var lbClose = document.getElementById("lbClose");

  var totalPages = Math.ceil(MESSIER.length / PER_PAGE);
  var current = 1;

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function cardHTML(item, idx) {
    var num = item.file.match(/^M(\d+)/);
    var badge = num ? "M" + num[1] : item.file;
    var img = "images/" + encodeURIComponent(item.file) + ".jpg";
    return [
      '<article class="card" style="--d:' + (idx % PER_PAGE) * 90 + 'ms">',
      '  <div class="thumb">',
      '    <img src="' + img + '" alt="' + esc(item.name) + '" loading="eager" decoding="async">',
      '    <span class="badge">' + esc(badge) + "</span>",
      '    <span class="type-tag">' + esc(item.type) + "</span>",
      "  </div>",
      '  <div class="card-body">',
      '    <h3 class="card-title">' + esc(item.name) + "</h3>",
      '    <p class="card-en">' + esc(item.en) + "</p>",
      '    <ul class="meta">',
      '      <li><span>星座</span>' + esc(item.constellation) + "</li>",
      '      <li><span>距离</span>' + esc(item.distance) + "</li>",
      "    </ul>",
      '    <p class="desc">' + esc(item.desc) + "</p>",
      '    <a class="fits" href="http://' + esc(FITS_URL) + '" target="_blank" rel="noopener">',
      '      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 3v10.6l3.3-3.3 1.4 1.4L12 17.4l-4.7-4.7 1.4-1.4L12 13.6V3h0zM5 19h14v2H5z"/></svg>',
      "      原始 FITS 下载",
      "    </a>",
      "  </div>",
      "</article>"
    ].join("\n");
  }

  function render() {
    var start = (current - 1) * PER_PAGE;
    var items = MESSIER.slice(start, start + PER_PAGE);
    grid.innerHTML = items.map(cardHTML).join("");

    grid.querySelectorAll(".thumb img").forEach(function (img) {
      img.addEventListener("click", function () {
        var card = img.closest(".card");
        lbImg.src = img.src;
        lbCap.textContent = card.querySelector(".card-title").textContent;
        lightbox.classList.add("open");
        document.body.classList.add("locked");
      });
    });

    renderPager();
    pageLabel.textContent = pad(current) + " / " + pad(totalPages);
    stat.textContent = MESSIER.length + " 个天体 · 共 " + totalPages + " 页";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPager() {
    var html = "";
    html += '<button class="pg nav" data-go="prev"' + (current === 1 ? " disabled" : "") + ">‹ 上一页</button>";
    var from = Math.max(1, current - 2);
    var to = Math.min(totalPages, from + 4);
    from = Math.max(1, to - 4);
    if (from > 1) {
      html += '<button class="pg" data-go="1">1</button><span class="dots">…</span>';
    }
    for (var p = from; p <= to; p++) {
      html += '<button class="pg' + (p === current ? " active" : "") + '" data-go="' + p + '">' + p + "</button>";
    }
    if (to < totalPages) {
      html += '<span class="dots">…</span><button class="pg" data-go="' + totalPages + '">' + totalPages + "</button>";
    }
    html += '<button class="pg nav" data-go="next"' + (current === totalPages ? " disabled" : "") + ">下一页 ›</button>";
    pager.innerHTML = html;
  }

  pager.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-go]");
    if (!btn || btn.disabled) return;
    var go = btn.getAttribute("data-go");
    if (go === "prev") current = Math.max(1, current - 1);
    else if (go === "next") current = Math.min(totalPages, current + 1);
    else current = parseInt(go, 10);
    location.hash = "#page=" + current;
    render();
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.classList.contains("open")) {
      if (e.key === "Escape") closeLightbox();
      return;
    }
    if (e.key === "ArrowLeft" && current > 1) {
      current--; location.hash = "#page=" + current; render();
    } else if (e.key === "ArrowRight" && current < totalPages) {
      current++; location.hash = "#page=" + current; render();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.classList.remove("locked");
    lbImg.src = "";
  }
  lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  function fromHash() {
    var m = /page=(\d+)/.exec(location.hash);
    if (m) {
      var p = parseInt(m[1], 10);
      if (p >= 1 && p <= totalPages) current = p;
    }
  }
  window.addEventListener("hashchange", function () {
    fromHash();
    render();
  });

  fromHash();
  render();
})();
