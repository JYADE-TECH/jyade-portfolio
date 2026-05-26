/* JYADE Portfolio — script.js
 * Reads PORTFOLIO_IMAGES from images.js and builds every carousel.
 */

// ── State ──────────────────────────────────────────────────
var carousels = {};

// ── Init on load ───────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {

  // Build every carousel
  var wrappers = document.querySelectorAll("[data-carousel]");
  for (var i = 0; i < wrappers.length; i++) {
    initCarousel(wrappers[i]);
  }

  // Filter tabs
  var tabs = document.querySelectorAll(".filter-tab");
  for (var t = 0; t < tabs.length; t++) {
    tabs[t].addEventListener("click", onFilterClick);
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(function(el) { io.observe(el); });

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

  // Build certificates
  buildCertificates();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener("click", function(e) {
      var t = document.querySelector(a.getAttribute("href"));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
    });
  });
});

// ── Build one carousel ─────────────────────────────────────
function initCarousel(wrapper) {
  var key    = wrapper.getAttribute("data-carousel");
  var images = (typeof PORTFOLIO_IMAGES !== "undefined") ? PORTFOLIO_IMAGES[key] : null;

  if (!images || images.length === 0) {
    wrapper.innerHTML =
      '<p class="carousel-empty">No images yet for <strong>' + key + '</strong>.' +
      ' Upload files and add entries to images.js.</p>';
    return;
  }

  var total = images.length;
  var html  = '<div class="carousel-viewport" tabindex="0" id="vp-' + key + '">';

  // Slides
  html += '<div class="carousel-track" id="track-' + key + '">';
  for (var i = 0; i < total; i++) {
    var img = images[i];
    html += '<div class="carousel-slide' + (i === 0 ? ' active' : '') + '">';
    html += '<div class="slide-inner">';
    html += '<img src="' + img.src + '" alt="' + img.title + '" loading="' + (i === 0 ? 'eager' : 'lazy') + '">';
    html += '<div class="slide-overlay">';
    html += '<span class="slide-tag">' + img.tag + '</span>';
    html += '<h3 class="slide-title">' + img.title + '</h3>';
    html += '<p class="slide-caption">' + img.caption + '</p>';
    html += '</div></div></div>';
  }
  html += '</div>'; // track

  // Arrows
  if (total > 1) {
    html += '<button class="carousel-arrow arrow-prev" data-key="' + key + '" aria-label="Previous">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>' +
      '</button>';
    html += '<button class="carousel-arrow arrow-next" data-key="' + key + '" aria-label="Next">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
      '</button>';
  }

  html += '</div>'; // viewport

  // Dots
  if (total > 1) {
    html += '<div class="carousel-dots">';
    for (var d = 0; d < total; d++) {
      html += '<button class="carousel-dot' + (d === 0 ? ' active' : '') +
        '" data-key="' + key + '" data-index="' + d + '" aria-label="Slide ' + (d+1) + '"></button>';
    }
    html += '</div>';
    html += '<div class="carousel-counter"><span class="cc-cur">1</span> / <span class="cc-tot">' + total + '</span></div>';
  }

  wrapper.innerHTML = html;

  // Store state
  carousels[key] = { current: 0, total: total };

  // Wire events
  if (total > 1) {
    wrapper.querySelector(".arrow-prev").addEventListener("click", function() { move(key, -1); });
    wrapper.querySelector(".arrow-next").addEventListener("click", function() { move(key,  1); });
    wrapper.querySelectorAll(".carousel-dot").forEach(function(dot) {
      dot.addEventListener("click", function() { goTo(key, parseInt(dot.getAttribute("data-index"))); });
    });

    // Swipe
    var vp = wrapper.querySelector(".carousel-viewport");
    var sx = null;
    vp.addEventListener("touchstart", function(e) { sx = e.touches[0].clientX; }, { passive: true });
    vp.addEventListener("touchend",   function(e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) move(key, dx < 0 ? 1 : -1);
      sx = null;
    }, { passive: true });

    // Keyboard
    vp.addEventListener("keydown", function(e) {
      if (e.key === "ArrowLeft")  { move(key, -1); e.preventDefault(); }
      if (e.key === "ArrowRight") { move(key,  1); e.preventDefault(); }
    });

    // Autoplay
    startAuto(key);
    vp.addEventListener("mouseenter", function() { stopAuto(key); });
    vp.addEventListener("mouseleave", function() { startAuto(key); });
  }
}

// ── Navigate ───────────────────────────────────────────────
function move(key, dir) {
  var c = carousels[key];
  goTo(key, (c.current + dir + c.total) % c.total);
}

function goTo(key, index) {
  var c       = carousels[key];
  var wrapper = document.querySelector('[data-carousel="' + key + '"]');
  if (!wrapper || index === c.current) return;

  var slides = wrapper.querySelectorAll(".carousel-slide");
  var dots   = wrapper.querySelectorAll(".carousel-dot");
  var counter = wrapper.querySelector(".cc-cur");

  slides[c.current].classList.remove("active");
  slides[index].classList.add("active");

  if (dots.length) {
    dots[c.current].classList.remove("active");
    dots[index].classList.add("active");
  }
  if (counter) counter.textContent = index + 1;

  c.current = index;
}

// ── Autoplay ───────────────────────────────────────────────
function startAuto(key) {
  stopAuto(key);
  carousels[key]._timer = setInterval(function() { move(key, 1); }, 4500);
}
function stopAuto(key) {
  if (carousels[key] && carousels[key]._timer) {
    clearInterval(carousels[key]._timer);
    carousels[key]._timer = null;
  }
}

// ── Filter tabs ────────────────────────────────────────────
function onFilterClick() {
  var target = this.getAttribute("data-filter");
  document.querySelectorAll(".filter-tab").forEach(function(t) { t.classList.remove("active"); });
  this.classList.add("active");
  document.querySelectorAll(".portfolio-section").forEach(function(s) {
    s.style.display = (target === "all" || s.getAttribute("data-section") === target) ? "block" : "none";
  });
}

// ── Contact form (Formspree) ───────────────────────────────
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
        setTimeout(function() {
          btn.textContent      = "Send Message";
          btn.style.background = "";
          btn.disabled         = false;
        }, 4000);
      } else { throw new Error("failed"); }
    })
    .catch(function() {
      btn.textContent      = "Failed \u2014 Try Again";
      btn.style.background = "#a0522d";
      btn.disabled         = false;
      setTimeout(function() {
        btn.textContent      = "Send Message";
        btn.style.background = "";
      }, 3000);
    });
  });
});

// ── Build Certificates ─────────────────────────────────────
function buildCertificates() {
  var grid  = document.getElementById("cert-grid");
  var empty = document.getElementById("cert-empty");
  if (!grid) return;

  var certs = (typeof PORTFOLIO_IMAGES !== "undefined" && PORTFOLIO_IMAGES.certificates)
    ? PORTFOLIO_IMAGES.certificates : [];

  if (certs.length === 0) {
    grid.style.display = "";
    if (empty) empty.style.display = "none";
    grid.innerHTML =
      '<p class="carousel-empty">No certificates yet for <strong>certificates</strong>.' +
      ' Upload files and add entries to images.js.</p>';
    return;
  }

  grid.style.display  = "";
  if (empty) empty.style.display = "none";

  var html = "";
  for (var i = 0; i < certs.length; i++) {
    var c = certs[i];
    html += '<div class="cert-card" data-src="' + c.src + '" data-title="' + c.title + ' — ' + c.issuer + '">';
    html += '<div class="cert-card__img-wrap">';
    if (c.src) {
      html += '<img src="' + c.src + '" alt="' + c.title + '" loading="lazy">';
      html += '<div class="cert-card__view">';
      html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
      html += ' View';
      html += '</div>';
    } else {
      html += '<div class="cert-card__img-placeholder">';
      html += '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="6" y="10" width="36" height="28" rx="2"/><path d="M6 18h36M14 14h2M20 14h2"/><path d="M14 26h20M14 31h12"/></svg>';
      html += '</div>';
    }
    html += '</div>'; // img-wrap
    html += '<div class="cert-card__body">';
    if (c.tag)    html += '<span class="cert-card__tag">' + c.tag + '</span>';
    html += '<h3 class="cert-card__title">' + c.title + '</h3>';
    if (c.issuer) html += '<p class="cert-card__issuer">' + c.issuer + '</p>';
    if (c.date)   html += '<p class="cert-card__date">' + c.date + '</p>';
    html += '</div></div>';
  }
  grid.innerHTML = html;

  // Wire lightbox on each card
  grid.querySelectorAll(".cert-card").forEach(function(card) {
    card.addEventListener("click", function() {
      openLightbox(card.getAttribute("data-src"), card.getAttribute("data-title"));
    });
  });
}

// ── Lightbox ───────────────────────────────────────────────
function openLightbox(src, caption) {
  var lb = document.getElementById("cert-lightbox");
  if (!lb) return;
  lb.querySelector(".cert-lightbox__img").src     = src;
  lb.querySelector(".cert-lightbox__caption").textContent = caption || "";
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  var lb = document.getElementById("cert-lightbox");
  if (lb) { lb.classList.remove("open"); document.body.style.overflow = ""; }
}
