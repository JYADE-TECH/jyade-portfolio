/**
 * JYADE Portfolio — Carousel Engine
 * ─────────────────────────────────────────────────────────────────────────────
 * Reads PORTFOLIO_IMAGES from images.js and auto-builds every carousel.
 * You never touch this file when adding images — only images.js changes.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ─── State ──────────────────────────────────────────────────────────────── */
const carouselState = {};   // { sectionKey: { current, total, autoTimer } }

/* ─── Build all carousels on DOMContentLoaded ────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  // Every [data-carousel] element declares which image array it uses
  document.querySelectorAll("[data-carousel]").forEach(wrapper => {
    const key = wrapper.dataset.carousel;
    const images = PORTFOLIO_IMAGES[key];

    if (!images || images.length === 0) {
      wrapper.innerHTML = `<p class="carousel-empty">No images yet for <strong>${key}</strong>. Add entries to images.js to populate this section.</p>`;
      return;
    }

    buildCarousel(wrapper, key, images);
  });

  // Keyboard navigation
  document.addEventListener("keydown", handleKeyboard);

  // Pause autoplay when tab is hidden
  document.addEventListener("visibilitychange", () => {
    Object.keys(carouselState).forEach(key => {
      if (document.hidden) pauseAuto(key);
      else startAuto(key);
    });
  });
});

/* ─── Build a single carousel ────────────────────────────────────────────── */
function buildCarousel(wrapper, key, images) {
  const total = images.length;

  // ── Track (slides) ─────────────────────────────────────────────────────
  const track = document.createElement("div");
  track.className = "carousel-track";
  track.setAttribute("role", "list");
  track.setAttribute("aria-label", `${key} portfolio images`);

  images.forEach((img, i) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide" + (i === 0 ? " active" : "");
    slide.setAttribute("role", "listitem");
    slide.setAttribute("aria-hidden", i !== 0 ? "true" : "false");
    slide.innerHTML = `
      <div class="slide-inner">
        <img
          src="${img.src}"
          alt="${img.title}"
          loading="${i === 0 ? 'eager' : 'lazy'}"
          onerror="this.parentElement.parentElement.classList.add('img-error')"
        >
        <div class="slide-overlay">
          <span class="slide-tag">${img.tag}</span>
          <h3 class="slide-title">${img.title}</h3>
          <p class="slide-caption">${img.caption}</p>
        </div>
      </div>`;
    track.appendChild(slide);
  });

  // ── Arrows (only if more than 1 image) ────────────────────────────────
  let prevBtn = "", nextBtn = "";
  if (total > 1) {
    prevBtn = `<button class="carousel-arrow arrow-prev" data-key="${key}" aria-label="Previous slide" title="Previous">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>`;
    nextBtn = `<button class="carousel-arrow arrow-next" data-key="${key}" aria-label="Next slide" title="Next">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>`;
  }

  // ── Dots (only if more than 1 image) ──────────────────────────────────
  let dotsHtml = "";
  if (total > 1) {
    const dotItems = images.map((img, i) =>
      `<button class="carousel-dot${i === 0 ? " active" : ""}"
              data-key="${key}" data-index="${i}"
              aria-label="Go to slide ${i + 1}: ${img.title}"
              aria-current="${i === 0 ? 'true' : 'false'}"
       ></button>`
    ).join("");
    dotsHtml = `<div class="carousel-dots" role="tablist" aria-label="${key} slides">${dotItems}</div>`;
  }

  // ── Counter ───────────────────────────────────────────────────────────
  const counter = total > 1
    ? `<div class="carousel-counter" aria-live="polite" aria-atomic="true">
         <span class="counter-current">1</span> / <span class="counter-total">${total}</span>
       </div>`
    : "";

  // ── Assemble ──────────────────────────────────────────────────────────
  wrapper.innerHTML = `
    <div class="carousel-viewport" tabindex="0" data-key="${key}">
      ${prevBtn}
      <div class="carousel-track-wrap">${track.outerHTML}</div>
      ${nextBtn}
    </div>
    ${dotsHtml}
    ${counter}`;

  // Re-query track (it was cloned via outerHTML)
  const realTrack = wrapper.querySelector(".carousel-track");

  // Init state
  carouselState[key] = { current: 0, total, wrapper, track: realTrack };

  // Wire events
  if (total > 1) {
    wrapper.querySelector(".arrow-prev").addEventListener("click", () => navigate(key, -1));
    wrapper.querySelector(".arrow-next").addEventListener("click", () => navigate(key,  1));
    wrapper.querySelectorAll(".carousel-dot").forEach(dot => {
      dot.addEventListener("click", () => goTo(key, parseInt(dot.dataset.index)));
    });
    startAuto(key);
  }

  // Touch / swipe
  attachSwipe(wrapper.querySelector(".carousel-viewport"), key);
}

/* ─── Navigate relative (±1) ─────────────────────────────────────────────── */
function navigate(key, direction) {
  const state = carouselState[key];
  const next = (state.current + direction + state.total) % state.total;
  goTo(key, next);
  resetAuto(key);
}

/* ─── Go to a specific slide ─────────────────────────────────────────────── */
function goTo(key, index) {
  const state = carouselState[key];
  if (index === state.current) return;

  const slides = state.track.querySelectorAll(".carousel-slide");
  const dots   = state.wrapper.querySelectorAll(".carousel-dot");
  const counterCurrent = state.wrapper.querySelector(".counter-current");

  // Direction hint for CSS
  const dir = index > state.current ? "next" : "prev";
  state.track.dataset.dir = dir;

  slides[state.current].classList.remove("active");
  slides[state.current].setAttribute("aria-hidden", "true");
  slides[index].classList.add("active");
  slides[index].setAttribute("aria-hidden", "false");

  if (dots.length) {
    dots[state.current].classList.remove("active");
    dots[state.current].setAttribute("aria-current", "false");
    dots[index].classList.add("active");
    dots[index].setAttribute("aria-current", "true");
  }

  if (counterCurrent) counterCurrent.textContent = index + 1;

  state.current = index;
}

/* ─── Autoplay ───────────────────────────────────────────────────────────── */
const AUTO_DELAY = 5000;

function startAuto(key) {
  const state = carouselState[key];
  if (!state || state.total <= 1) return;
  pauseAuto(key); // clear any existing
  state.autoTimer = setInterval(() => navigate(key, 1), AUTO_DELAY);
}

function pauseAuto(key) {
  const state = carouselState[key];
  if (state && state.autoTimer) {
    clearInterval(state.autoTimer);
    state.autoTimer = null;
  }
}

function resetAuto(key) {
  pauseAuto(key);
  startAuto(key);
}

/* ─── Pause autoplay on hover ────────────────────────────────────────────── */
document.addEventListener("mouseover", e => {
  const vp = e.target.closest(".carousel-viewport");
  if (vp) pauseAuto(vp.dataset.key);
});
document.addEventListener("mouseout", e => {
  const vp = e.target.closest(".carousel-viewport");
  if (vp) startAuto(vp.dataset.key);
});

/* ─── Keyboard navigation ────────────────────────────────────────────────── */
function handleKeyboard(e) {
  const focused = document.activeElement;
  const vp = focused && focused.closest ? focused.closest(".carousel-viewport") : null;
  if (!vp) return;
  const key = vp.dataset.key;
  if (!key || !carouselState[key]) return;

  if (e.key === "ArrowLeft")  { navigate(key, -1); e.preventDefault(); }
  if (e.key === "ArrowRight") { navigate(key,  1); e.preventDefault(); }
}

/* ─── Touch / swipe ──────────────────────────────────────────────────────── */
function attachSwipe(el, key) {
  let startX = null;
  el.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
  el.addEventListener("touchend",   e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) navigate(key, dx < 0 ? 1 : -1);
    startX = null;
  }, { passive: true });
}

/* ─── Section filter tabs ────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.filter;

      // Update tab states
      document.querySelectorAll(".filter-tab").forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      // Show/hide sections
      document.querySelectorAll(".portfolio-section").forEach(section => {
        const show = target === "all" || section.dataset.section === target;
        section.style.display = show ? "block" : "none";
      });
    });
  });
});

/* ─── Smooth scroll for nav links ────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Mobile nav toggle
  const burger = document.getElementById("nav-burger");
  const navMenu = document.getElementById("nav-menu");
  if (burger && navMenu) {
    burger.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
    });
  }

  // Scroll-reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
});
