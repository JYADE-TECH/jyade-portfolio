/**
 * JYADE Portfolio — Image Registry
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO ADD IMAGES:
 *   1. Drop your image file into the correct folder under assets/images/
 *   2. Add a new object to the matching array below
 *   3. Save — the carousel updates automatically. No HTML edits needed.
 *
 * IMAGE OBJECT SHAPE:
 *   {
 *     src:     "assets/images/architectural/MyFloorPlan.jpg",  // path from root
 *     title:   "Two-Storey Residence",                         // slide title
 *     caption: "Floor plan + elevation · Bulacan, 2024",       // short caption
 *     tag:     "Floor Plan"                                     // badge label
 *   }
 * ─────────────────────────────────────────────────────────────────────────────
 */

const PORTFOLIO_IMAGES = {

  // ── Architectural ──────────────────────────────────────────────────────────
  architectural: [
    {
      src:     "assets/images/architectural/ArchitecturalImg1.jpg",
      title:   "Two-Storey Residence",
      caption: "Complete floor plan & elevation · Bulacan, 2024",
      tag:     "Floor Plan"
    },
    {
      src:     "assets/images/architectural/ArchitecturalImg2.jpg",
      title:   "Commercial Façade Study",
      caption: "Rendered elevation with material schedule",
      tag:     "Elevation"
    }
    // ↓ Add more: copy a block above, paste here, change the values
  ],

  // ── Structural ─────────────────────────────────────────────────────────────
  structural: [
    {
      src:     "assets/images/structural/StructuralImg1.jpg",
      title:   "Column & Beam Layout",
      caption: "Structural framing plan · RC frame system",
      tag:     "Structural"
    },
    {
      src:     "assets/images/structural/StructuralImg2.jpg",
      title:   "Foundation Detail",
      caption: "Footing schedule and reinforcement details",
      tag:     "Detail"
    }
  ],

  // ── Electrical ─────────────────────────────────────────────────────────────
  electrical: [
    {
      src:     "assets/images/electrical/ElectricalImg1.jpg",
      title:   "Lighting Layout",
      caption: "Electrical plan · residential, ground floor",
      tag:     "Electrical"
    }
  ],

  // ── Plumbing ───────────────────────────────────────────────────────────────
  plumbing: [
    {
      src:     "assets/images/plumbing/PlumbingImg1.jpg",
      title:   "Sanitary & Water Supply",
      caption: "Plumbing layout · 2-bedroom unit",
      tag:     "Plumbing"
    }
  ],

  // ── Logos & Branding ───────────────────────────────────────────────────────
  logos: [
    {
      src:     "assets/images/logos/LogoImg1.jpg",
      title:   "JYADE Brand Identity",
      caption: "Wordmark, monogram & brand guidelines",
      tag:     "Branding"
    },
    {
      src:     "assets/images/logos/LogoImg2.jpg",
      title:   "Client Logo Design",
      caption: "Vector logo · construction sector",
      tag:     "Logo"
    }
  ],

};

// Export for script.js
// (No module system needed — this file is loaded before script.js via <script> tag)
