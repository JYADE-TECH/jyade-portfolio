/**
 * JYADE Portfolio — Image Registry
 *
 * HOW TO ADD AN IMAGE:
 *   1. Upload the file to the correct folder under assets/images/
 *   2. Copy one object block below and fill in your details
 *   3. Commit — the slide appears automatically. No HTML edits needed.
 *
 * SECTIONS & FOLDERS:
 *   cad          → assets/images/cad/
 *   construction → assets/images/construction/
 *   electronics  → assets/images/electronics/
 *   programming  → assets/images/programming/
 *   modelling    → assets/images/modelling/
 *   logos        → assets/images/logos/
 */

const PORTFOLIO_IMAGES = {

  // ── CAD Operator ───────────────────────────────────────────────────────────
  cad: [
  ],

  // ── Construction ───────────────────────────────────────────────────────────
  construction: [
  ],

  // ── Electronics ────────────────────────────────────────────────────────────
  electronics: [
  ],

  // ── Programming ────────────────────────────────────────────────────────────
  programming: [
  ],

  // ── 3D Modelling ───────────────────────────────────────────────────────────
  modelling: [
    {
    src:     "assets/images/modelling/ModellingImg1.jpg",
    title:   "Bungalow 3D Model",
    caption: "Bungalow 3D Preview · 2026",
    tag:     "CAD"
    }
  ],

  // ── Certificates ───────────────────────────────────────────────────────────
  // Folder: assets/images/certificates/
  // Each entry = one certificate card
  // Fields: src, title, issuer, date, tag
  certificates: [
     {
       src:    "assets/images/certificates/CertImg1.png",
       title:  "Mini Robot Challenge 2nd Placer",
       issuer: "La Consolacion University Philippines",
       date:   "2024",
       tag:    "Robotics"
     },
     {
       src:    "assets/images/certificates/CertImg2.png",
       title:  "National Robotics Competition",
       issuer: "FIRST EDUSPEC INC",
       date:   "2025",
       tag:    "Robotics"
    },
  
     {
       src:    "assets/images/certificates/CertImg3.png",
       title:  "Internship Multiple Awards",
       issuer: "Sunkist Enterprise",
       date:   "2025",
       tag:    "Robotics"
     }
  ]

};
