/**
 * JYADE Portfolio — Image Registry
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO ADD IMAGES:
 *   1. Upload your image file to the correct folder under assets/images/
 *   2. Add a new object to the matching array below
 *   3. Commit — the carousel updates automatically. No HTML edits needed.
 *
 * IMAGE OBJECT SHAPE:
 *   {
 *     src:     "assets/images/architectural/MyProject.jpg",
 *     title:   "Two-Storey Residence",
 *     caption: "Floor plan + elevation · Bulacan, 2024",
 *     tag:     "Floor Plan"
 *   }
 * ─────────────────────────────────────────────────────────────────────────────
 */

const PORTFOLIO_IMAGES = {

  // ── Architectural ──────────────────────────────────────────────────────────
  // Folder: assets/images/architectural/
  architectural: [
    {
      src:     "assets/images/architectural/ArchitecturalImg1.jpg",
      title:   "Two-Storey Residence",
      caption: "Complete floor plan & elevation · Bulacan, 2024",
      tag:     "Floor Plan"
    }
    // Add more below when you upload more files:
    // ,{
    //   src:     "assets/images/architectural/ArchitecturalImg2.jpg",
    //   title:   "Your Project Title",
    //   caption: "Short description · Year",
    //   tag:     "Floor Plan"
    // }
  ],

  // ── Structural ─────────────────────────────────────────────────────────────
  // Folder: assets/images/structural/
  // Upload files here, then uncomment and fill the entries below
  structural: [
    // {
    //   src:     "assets/images/structural/StructuralImg1.jpg",
    //   title:   "Column & Beam Layout",
    //   caption: "Structural framing plan · RC frame system",
    //   tag:     "Structural"
    // }
  ],

  // ── Electrical ─────────────────────────────────────────────────────────────
  // Folder: assets/images/electrical/
  electrical: [
    // {
    //   src:     "assets/images/electrical/ElectricalImg1.jpg",
    //   title:   "Lighting Layout",
    //   caption: "Electrical plan · residential, ground floor",
    //   tag:     "Electrical"
    // }
  ],

  // ── Plumbing ───────────────────────────────────────────────────────────────
  // Folder: assets/images/plumbing/
  plumbing: [
    // {
    //   src:     "assets/images/plumbing/PlumbingImg1.jpg",
    //   title:   "Sanitary & Water Supply",
    //   caption: "Plumbing layout · 2-bedroom unit",
    //   tag:     "Plumbing"
    // }
  ],

  // ── Logos & Branding ───────────────────────────────────────────────────────
  // Folder: assets/images/logos/
  logos: [
    // {
    //   src:     "assets/images/logos/LogoImg1.jpg",
    //   title:   "JYADE Brand Identity",
    //   caption: "Wordmark, monogram & brand guidelines",
    //   tag:     "Branding"
    // }
  ]

};
