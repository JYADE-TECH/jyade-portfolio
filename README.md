# JYADE Portfolio
**Justine Yuri De Leon** — Architectural Drafting & Graphics Design Technology

Live portfolio for JYADE, offering full house planning, structural, electrical, plumbing, architectural, renovation, and construction services.

---

## 🗂 Project Structure

```
jyade-portfolio/
├── index.html          ← Main page (never edit for images)
├── style.css           ← All styles, carousel included
├── script.js           ← Carousel engine — auto-builds from images.js
├── images.js           ← ✅ ONLY file you edit to add images
├── README.md
└── assets/
    └── images/
        ├── logo.png
        ├── architectural/
        │   ├── ArchitecturalImg1.jpg
        │   └── ArchitecturalImg2.jpg
        ├── structural/
        ├── electrical/
        ├── plumbing/
        ├── logos/
        └── graphics/
```

---

## ➕ How to Add a New Image

1. Drop your image into the correct folder under `assets/images/`
2. Open `images.js`
3. Add a new object to the matching array:

```js
// Example: adding a 3rd architectural image
architectural: [
  { src: "assets/images/architectural/ArchitecturalImg1.jpg", title: "...", caption: "...", tag: "..." },
  { src: "assets/images/architectural/ArchitecturalImg2.jpg", title: "...", caption: "...", tag: "..." },
  // ↓ New entry — a third slide is automatically created
  { src: "assets/images/architectural/ArchitecturalImg3.jpg", title: "Bungalow Design", caption: "Single-storey · 2025", tag: "Floor Plan" }
]
```

4. Save and push. **No HTML changes needed.** The carousel updates automatically.

---

## ➕ How to Add a New Portfolio Section

1. Add a new key to `PORTFOLIO_IMAGES` in `images.js`
2. Add a `<article>` block in `index.html` with `data-section="yourkey"` and `data-carousel="yourkey"`
3. Add a filter button in the filter bar

---

## 🌐 Deploying on GitHub Pages

1. Go to your repo → **Settings → Pages**
2. Source: **Deploy from a branch** → branch: `main` → folder: `/ (root)`
3. Save — your site will be live at `https://yourusername.github.io/jyade-portfolio/`

---

## 📧 Contact
Justine Yuri De Leon · justineyuridl@gmail.com
