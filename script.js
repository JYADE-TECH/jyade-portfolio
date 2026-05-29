/* JYADE Portfolio — script.js */

var carousels = {};

document.addEventListener("DOMContentLoaded", function() {
  // Build project carousels
  var wrappers = document.querySelectorAll("[data-carousel]");
  for (var i = 0; i < wrappers.length; i++) {
    initCarousel(wrappers[i]);
  }

  // Build certificates
  buildCertificates();

  // Filter tabs
  document.querySelectorAll(".filter-tab").forEach(function(tab) {
    tab.addEventListener("click", onFilterClick);
  });

  // Scroll reveal
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(function(el) { io.observe(el); });

  // Mobile nav
  var burger = document.getElementById("nav-burger");
  var menu   = document.getElementById("nav-menu");
  if (burger && menu) {
    burger.addEventListener("click", function() {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
    });
    menu.querySelectorAll("a").forEach(function(a) {
      a.addEventListener("click", function() {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener("click", function(e) {
      var t = document.querySelector(a.getAttribute("href"));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
    });
  });

  // Close gallery on backdrop click / ESC
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") { closeGallery(); closeLightbox(); }
  });
});

/* ═══════════════════════════════════════════════════
   CAROUSEL — shows project cover cards
   ═══════════════════════════════════════════════════ */
function initCarousel(wrapper) {
  var key      = wrapper.getAttribute("data-carousel");
  var projects = (typeof PORTFOLIO_IMAGES !== "undefined") ? PORTFOLIO_IMAGES[key] : null;

  if (!projects || projects.length === 0) {
    wrapper.innerHTML =
      '<p class="carousel-empty">No projects yet for <strong>' + key + '</strong>. ' +
      'Create a project folder and add entries to images.js.</p>';
    return;
  }

  var total = projects.length;
  var html  = '<div class="carousel-viewport" tabindex="0" id="vp-' + key + '">';
  html += '<div class="carousel-track" id="track-' + key + '">';

  for (var i = 0; i < total; i++) {
    var p = projects[i];
    html += '<div class="carousel-slide' + (i === 0 ? ' active' : '') + '">';
    html += '<div class="slide-inner project-card" data-key="' + key + '" data-index="' + i + '" style="cursor:pointer;">';
    html += '<img src="' + p.cover + '" alt="' + p.title + '" loading="' + (i === 0 ? 'eager' : 'lazy') + '">';
    html += '<div class="slide-overlay">';
    html += '<span class="slide-tag">' + p.tag + '</span>';
    html += '<h3 class="slide-title">' + p.title + '</h3>';
    html += '<p class="slide-caption">' + p.caption + '</p>';
    // Image count badge + click hint
    html += '<div class="project-meta">';
    html += '<span class="project-count">';
    html += '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>';
    html += ' ' + p.images.length + ' photo' + (p.images.length !== 1 ? 's' : '') + '</span>';
    html += '<span class="project-view-btn">View Project →</span>';
    html += '</div>';
    html += '</div></div></div>';
  }

  html += '</div>'; // track

  if (total > 1) {
    html += '<button class="carousel-arrow arrow-prev" data-key="' + key + '" aria-label="Previous">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg></button>';
    html += '<button class="carousel-arrow arrow-next" data-key="' + key + '" aria-label="Next">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></button>';
  }
  html += '</div>'; // viewport

  if (total > 1) {
    html += '<div class="carousel-dots">';
    for (var d = 0; d < total; d++) {
      html += '<button class="carousel-dot' + (d === 0 ? ' active' : '') +
        '" data-key="' + key + '" data-index="' + d + '" aria-label="Project ' + (d+1) + '"></button>';
    }
    html += '</div>';
    html += '<div class="carousel-counter"><span class="cc-cur">1</span> / <span class="cc-tot">' + total + '</span></div>';
  }

  wrapper.innerHTML = html;
  carousels[key] = { current: 0, total: total };

  // Arrow events
  if (total > 1) {
    wrapper.querySelector(".arrow-prev").addEventListener("click", function(e) { e.stopPropagation(); move(key, -1); });
    wrapper.querySelector(".arrow-next").addEventListener("click", function(e) { e.stopPropagation(); move(key,  1); });
    wrapper.querySelectorAll(".carousel-dot").forEach(function(dot) {
      dot.addEventListener("click", function(e) { e.stopPropagation(); goTo(key, parseInt(dot.getAttribute("data-index"))); });
    });
    startAuto(key);
    var vp = wrapper.querySelector(".carousel-viewport");
    vp.addEventListener("mouseenter", function() { stopAuto(key); });
    vp.addEventListener("mouseleave", function() { startAuto(key); });
    // Swipe
    var sx = null;
    vp.addEventListener("touchstart", function(e) { sx = e.touches[0].clientX; }, { passive: true });
    vp.addEventListener("touchend",   function(e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) move(key, dx < 0 ? 1 : -1);
      sx = null;
    }, { passive: true });
  }

  // Click project card → open gallery
  wrapper.querySelectorAll(".project-card").forEach(function(card) {
    card.addEventListener("click", function() {
      var k = card.getAttribute("data-key");
      var idx = parseInt(card.getAttribute("data-index"));
      var project = PORTFOLIO_IMAGES[k][idx];
      openGallery(project);
    });
  });
}

/* ═══════════════════════════════════════════════════
   CAROUSEL CONTROLS
   ═══════════════════════════════════════════════════ */
function move(key, dir) {
  var c = carousels[key];
  goTo(key, (c.current + dir + c.total) % c.total);
}

function goTo(key, index) {
  var c = carousels[key];
  var wrapper = document.querySelector('[data-carousel="' + key + '"]');
  if (!wrapper || index === c.current) return;
  var slides  = wrapper.querySelectorAll(".carousel-slide");
  var dots    = wrapper.querySelectorAll(".carousel-dot");
  var counter = wrapper.querySelector(".cc-cur");
  slides[c.current].classList.remove("active");
  slides[index].classList.add("active");
  if (dots.length) { dots[c.current].classList.remove("active"); dots[index].classList.add("active"); }
  if (counter) counter.textContent = index + 1;
  c.current = index;
}

function startAuto(key) {
  stopAuto(key);
  carousels[key]._timer = setInterval(function() { move(key, 1); }, 4500);
}
function stopAuto(key) {
  if (carousels[key] && carousels[key]._timer) { clearInterval(carousels[key]._timer); carousels[key]._timer = null; }
}

/* ═══════════════════════════════════════════════════
   PROJECT GALLERY — full image grid when project clicked
   ═══════════════════════════════════════════════════ */
function openGallery(project) {
  var overlay = document.getElementById("project-gallery");
  var title   = document.getElementById("gallery-title");
  var caption = document.getElementById("gallery-caption");
  var grid    = document.getElementById("gallery-grid");
  if (!overlay) return;

  title.textContent   = project.title;
  caption.textContent = project.caption;

  // Build image grid
  var html = "";
  for (var i = 0; i < project.images.length; i++) {
    html += '<div class="gallery-thumb" data-src="' + project.images[i] + '" data-index="' + i + '">';
    html += '<img src="' + project.images[i] + '" alt="' + project.title + ' photo ' + (i+1) + '" loading="lazy">';
    html += '<div class="gallery-thumb-hover"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></div>';
    html += '</div>';
  }
  grid.innerHTML = html;

  // Click thumb → lightbox
  grid.querySelectorAll(".gallery-thumb").forEach(function(thumb) {
    thumb.addEventListener("click", function() {
      openLightbox(thumb.getAttribute("data-src"), project.title, project.images, parseInt(thumb.getAttribute("data-index")));
    });
  });

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  var overlay = document.getElementById("project-gallery");
  if (overlay) { overlay.classList.remove("open"); document.body.style.overflow = ""; }
}

/* ═══════════════════════════════════════════════════
   LIGHTBOX — swipeable, loops at ends
   ═══════════════════════════════════════════════════ */
var _lbImages = [];
var _lbIndex  = 0;
var _lbTitle  = "";

function openLightbox(src, title, images, index) {
  var lb = document.getElementById("cert-lightbox");
  if (!lb) return;

  _lbImages = images && images.length ? images : [src];
  _lbIndex  = typeof index === "number" ? index : 0;
  _lbTitle  = title || "";

  updateLightbox(lb);
  lb.classList.add("open");
  document.body.style.overflow = "hidden";

  // Attach swipe once
  if (!lb._swipeAttached) {
    var sx = null;
    lb.addEventListener("touchstart", function(e) {
      sx = e.touches[0].clientX;
    }, { passive: true });
    lb.addEventListener("touchend", function(e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) lbNavigate(dx < 0 ? 1 : -1);
      sx = null;
    }, { passive: true });

    // Keyboard left/right inside lightbox
    document.addEventListener("keydown", function(e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "ArrowLeft")  lbNavigate(-1);
      if (e.key === "ArrowRight") lbNavigate(1);
    });

    lb._swipeAttached = true;
  }
}

function updateLightbox(lb) {
  if (!lb) lb = document.getElementById("cert-lightbox");
  if (!lb) return;

  var img     = lb.querySelector(".cert-lightbox__img");
  var caption = lb.querySelector(".cert-lightbox__caption");
  var prev    = lb.querySelector(".lb-prev");
  var next    = lb.querySelector(".lb-next");

  // Fade swap
  img.style.opacity = "0";
  img.style.transition = "opacity 0.2s";
  setTimeout(function() {
    img.src = _lbImages[_lbIndex];
    img.style.opacity = "1";
  }, 180);

  caption.textContent = _lbTitle + "  " + (_lbIndex + 1) + " / " + _lbImages.length;

  // Show arrows only if more than 1 image
  if (prev) prev.style.display = _lbImages.length > 1 ? "flex" : "none";
  if (next) next.style.display = _lbImages.length > 1 ? "flex" : "none";
}

function lbNavigate(dir) {
  if (!_lbImages.length) return;
  // Loop — goes back to first after last, last before first
  _lbIndex = (_lbIndex + dir + _lbImages.length) % _lbImages.length;
  updateLightbox();
}

function closeLightbox() {
  var lb = document.getElementById("cert-lightbox");
  if (lb) { lb.classList.remove("open"); document.body.style.overflow = ""; }
}

/* ═══════════════════════════════════════════════════
   FILTER TABS
   ═══════════════════════════════════════════════════ */
function onFilterClick() {
  var target = this.getAttribute("data-filter");
  document.querySelectorAll(".filter-tab").forEach(function(t) { t.classList.remove("active"); });
  this.classList.add("active");
  document.querySelectorAll(".portfolio-section").forEach(function(s) {
    s.style.display = (target === "all" || s.getAttribute("data-section") === target) ? "block" : "none";
  });
}

/* ═══════════════════════════════════════════════════
   CERTIFICATES
   ═══════════════════════════════════════════════════ */
function buildCertificates() {
  var grid  = document.getElementById("cert-grid");
  var empty = document.getElementById("cert-empty");
  if (!grid) return;

  var certs = (typeof PORTFOLIO_IMAGES !== "undefined" && PORTFOLIO_IMAGES.certificates)
    ? PORTFOLIO_IMAGES.certificates : [];

  if (certs.length === 0) {
    grid.style.display = "";
    if (empty) empty.style.display = "none";
    grid.innerHTML = '<p class="carousel-empty">No certificates yet. Upload images and add entries to images.js.</p>';
    return;
  }

  grid.style.display = "";
  if (empty) empty.style.display = "none";

  var html = "";
  for (var i = 0; i < certs.length; i++) {
    var c = certs[i];
    html += '<div class="cert-card" data-src="' + c.src + '" data-title="' + c.title + ' — ' + c.issuer + '">';
    html += '<div class="cert-card__img-wrap">';
    html += '<img src="' + c.src + '" alt="' + c.title + '" loading="lazy">';
    html += '<div class="cert-card__view"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> View</div>';
    html += '</div>';
    html += '<div class="cert-card__body">';
    if (c.tag)    html += '<span class="cert-card__tag">' + c.tag + '</span>';
    html += '<h3 class="cert-card__title">' + c.title + '</h3>';
    if (c.issuer) html += '<p class="cert-card__issuer">' + c.issuer + '</p>';
    if (c.date)   html += '<p class="cert-card__date">' + c.date + '</p>';
    html += '</div></div>';
  }
  grid.innerHTML = html;

  grid.querySelectorAll(".cert-card").forEach(function(card) {
    card.addEventListener("click", function() {
      openLightbox(card.getAttribute("data-src"), card.getAttribute("data-title"), null, 0);
    });
  });
}

/* ═══════════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    var btn  = document.getElementById("form-submit");
    var data = new FormData(form);
    btn.textContent = "Sending\u2026";
    btn.disabled    = true;
    fetch("https://formspree.io/f/mykvdodn", {
      method: "POST", body: data, headers: { "Accept": "application/json" }
    })
    .then(function(r) {
      if (r.ok) {
        btn.textContent      = "Message Sent \u2713";
        btn.style.background = "#4a7c59";
        form.reset();
        setTimeout(function() { btn.textContent = "Send Message"; btn.style.background = ""; btn.disabled = false; }, 4000);
      } else { throw new Error("failed"); }
    })
    .catch(function() {
      btn.textContent      = "Failed \u2014 Try Again";
      btn.style.background = "#a0522d";
      btn.disabled         = false;
      setTimeout(function() { btn.textContent = "Send Message"; btn.style.background = ""; }, 3000);
    });
  });
});
