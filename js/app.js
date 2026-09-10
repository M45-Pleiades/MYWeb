/* ============================================================
 * 深空天体之旅 —— 页面渲染、分类切换与分页逻辑
 * ============================================================ */
(function () {
  "use strict";

  var PER_PAGE = 4;

  var grid = document.getElementById("grid");
  var pager = document.getElementById("pager");
  var pageLabel = document.getElementById("pageLabel");
  var stat = document.getElementById("stat");
  var tabs = document.getElementById("tabs");
  var subtitle = document.getElementById("subtitle");
  var footTitle = document.getElementById("footTitle");
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var lbCount = document.getElementById("lbCount");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var lbClose = document.getElementById("lbClose");

  /* 梅西耶天体：一幅照片可能包含多个天体（如 M42-43、M31-32-110），
   * 因此总数由 file 字段解析并去重，而非按图片数量计算。 */
  function messierCount(data) {
    var seen = {};
    data.forEach(function (item) {
      (item.file.match(/\d+/g) || []).forEach(function (n) { seen[parseInt(n, 10)] = true; });
    });
    return Object.keys(seen).length;
  }

  var CATEGORIES = {
    messier: {
      key: "messier",
      label: "梅西耶天体",
      dir: "images",
      data: MESSIER,
      foot: "梅西耶之旅 · Messier Journey",
      intro: "从蟹状星云的爆发余烬，到仙女座星系的百万光年尺度 —— 这是我用镜头记录下的梅西耶天体，共 "
    },
    deepsky: {
      key: "deepsky",
      label: "深空天体",
      dir: "images-2",
      data: DEEPSKY,
      foot: "深空之旅 · Deep Sky Journey",
      intro: "银河之外，星云、星团与遥远星系 —— 这是我拍摄的非梅西耶深空天体，共 "
    }
  };
  CATEGORIES.messier.count = messierCount(MESSIER);
  CATEGORIES.deepsky.count = DEEPSKY.length;

  var cat = "messier";
  var pages = { messier: 1, deepsky: 1 };
  var lbIndex = -1;

  function C() { return CATEGORIES[cat]; }
  function data() { return C().data; }
  function totalPages() { return Math.ceil(data().length / PER_PAGE); }

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function imgURL(item) {
    return C().dir + "/" + encodeURIComponent(item.file) + ".jpg";
  }

  function badgeOf(item) {
    var num = item.file.match(/^M(\d+)/);
    return num ? "M" + num[1] : item.file;
  }

  function cardHTML(item, idx) {
    var img = imgURL(item);
    return [
      '<article class="card" style="--d:' + (idx % PER_PAGE) * 90 + 'ms">',
      '  <div class="thumb" data-index="' + idx + '">',
      '    <img src="' + img + '" alt="' + esc(item.name) + '" loading="eager" decoding="async">',
      '    <span class="badge">' + esc(badgeOf(item)) + "</span>",
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
    var start = (pages[cat] - 1) * PER_PAGE;
    var items = data().slice(start, start + PER_PAGE);
    grid.innerHTML = items.map(cardHTML).join("");

    grid.querySelectorAll(".thumb").forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        openLightbox(start + parseInt(thumb.getAttribute("data-index"), 10));
      });
    });

    renderPager();
    pageLabel.textContent = pad(pages[cat]) + " / " + pad(totalPages());
    stat.textContent = C().count + " 个" + C().label + " · " + data().length + " 幅影像 · 共 " + totalPages() + " 页";
    subtitle.innerHTML = C().intro + '<span class="accent">' + C().count + "</span> 个目标。";
    footTitle.textContent = C().foot;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPager() {
    var tp = totalPages();
    var cur = pages[cat];
    var html = "";
    html += '<button class="pg nav" data-go="prev"' + (cur === 1 ? " disabled" : "") + ">‹ 上一页</button>";
    var from = Math.max(1, cur - 2);
    var to = Math.min(tp, from + 4);
    from = Math.max(1, to - 4);
    if (from > 1) {
      html += '<button class="pg" data-go="1">1</button><span class="dots">…</span>';
    }
    for (var p = from; p <= to; p++) {
      html += '<button class="pg' + (p === cur ? " active" : "") + '" data-go="' + p + '">' + p + "</button>";
    }
    if (to < tp) {
      html += '<span class="dots">…</span><button class="pg" data-go="' + tp + '">' + tp + "</button>";
    }
    html += '<button class="pg nav" data-go="next"' + (cur === tp ? " disabled" : "") + ">下一页 ›</button>";
    pager.innerHTML = html;
  }

  function setHash() {
    location.hash = "#cat=" + cat + "&page=" + pages[cat];
  }

  pager.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-go]");
    if (!btn || btn.disabled) return;
    var go = btn.getAttribute("data-go");
    if (go === "prev") pages[cat] = Math.max(1, pages[cat] - 1);
    else if (go === "next") pages[cat] = Math.min(totalPages(), pages[cat] + 1);
    else pages[cat] = parseInt(go, 10);
    setHash();
    render();
  });

  function switchCat(next) {
    if (!CATEGORIES[next] || next === cat) return;
    cat = next;
    updateTabs();
    setHash();
    render();
  }

  function updateTabs() {
    tabs.querySelectorAll(".tab").forEach(function (t) {
      var on = t.getAttribute("data-cat") === cat;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  tabs.addEventListener("click", function (e) {
    var btn = e.target.closest(".tab");
    if (btn) switchCat(btn.getAttribute("data-cat"));
  });

  /* ---------- 灯箱 ---------- */
  function openLightbox(index) {
    lbIndex = index;
    updateLightbox();
    lightbox.classList.add("open");
    document.body.classList.add("locked");
  }

  function updateLightbox() {
    var item = data()[lbIndex];
    lbImg.classList.remove("loaded");
    lbImg.src = imgURL(item);
    lbImg.alt = item.name;
    lbCap.textContent = item.name + "  ·  " + item.en;
    lbCount.textContent = pad(lbIndex + 1) + " / " + pad(data().length);
    lbPrev.disabled = lbIndex === 0;
    lbNext.disabled = lbIndex === data().length - 1;
  }

  function stepLightbox(dir) {
    var n = lbIndex + dir;
    if (n < 0 || n >= data().length) return;
    lbIndex = n;
    updateLightbox();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.classList.remove("locked");
    lbImg.src = "";
    lbIndex = -1;
  }

  lbPrev.addEventListener("click", function (e) { e.stopPropagation(); stepLightbox(-1); });
  lbNext.addEventListener("click", function (e) { e.stopPropagation(); stepLightbox(1); });
  lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  lbImg.addEventListener("load", function () { lbImg.classList.add("loaded"); });

  document.addEventListener("keydown", function (e) {
    if (lightbox.classList.contains("open")) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") stepLightbox(-1);
      else if (e.key === "ArrowRight") stepLightbox(1);
      return;
    }
    if (e.key === "ArrowLeft" && pages[cat] > 1) {
      pages[cat]--; setHash(); render();
    } else if (e.key === "ArrowRight" && pages[cat] < totalPages()) {
      pages[cat]++; setHash(); render();
    }
  });

  function fromHash() {
    var c = /cat=(\w+)/.exec(location.hash);
    if (c && CATEGORIES[c[1]]) cat = c[1];
    var m = /page=(\d+)/.exec(location.hash);
    if (m) {
      var p = parseInt(m[1], 10);
      if (p >= 1 && p <= totalPages()) pages[cat] = p;
    }
  }
  window.addEventListener("hashchange", function () {
    fromHash();
    updateTabs();
    render();
  });

  fromHash();
  updateTabs();
  render();
})();
