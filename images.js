/**
 * JYADE Portfolio — Image Registry
 * ─────────────────────────────────────────────────────────────────────────────
 * NEW PROJECT STRUCTURE:
 *
 * Each section contains PROJECTS.
 * Each project has:
 *   - cover  : the image shown on the carousel card
 *   - title  : project name
 *   - caption: short description
 *   - tag    : badge label
 *   - images : array of ALL photos inside the project gallery
 *
 * HOW TO ADD A NEW PROJECT:
 *   1. Create a folder: assets/images/construction/project-2/
 *   2. Upload all your project images into that folder
 *   3. Add a new project block below with the cover + images list
 *   4. Commit — done!
 *
 * HOW TO ADD MORE IMAGES TO AN EXISTING PROJECT:
 *   1. Upload the new image to the project folder
 *   2. Add the src to that project's images array below
 *   3. Commit
 * ─────────────────────────────────────────────────────────────────────────────
 */

const PORTFOLIO_IMAGES = {

  // ── CAD Operator ───────────────────────────────────────────────────────────
  // Folder: assets/images/cad/project-1/ , project-2/ etc.
  cad: [
    // {
    //   cover:   "assets/images/cad/project-1/CadImg1.jpg",
    //   title:   "Project Name",
    //   caption: "Short description · 2025",
    //   tag:     "CAD",
    //   images: [
    //     "assets/images/cad/project-1/CadImg1.jpg",
    //     "assets/images/cad/project-1/CadImg2.jpg"
    //   ]
    // }
  ],

  // ── Construction & Renovation ──────────────────────────────────────────────
  // Folder: assets/images/construction/project-1/ , project-2/ etc.
  construction: [
    {
      cover:   "assets/images/construction/project-1/ConstructionImg1.png",
      title:   "Apalit Pampanga, Home Renovation",
      caption: "Renovation Project · 2025",
      tag:     "Construction",
      images: [
        "assets/images/construction/project-1/ConstructionImg1.png",
        "assets/images/construction/project-1/ConstructionImg2.png",
        "assets/images/construction/project-1/ConstructionImg3.png",
        "assets/images/construction/project-1/ConstructionImg4.png"
      ]
    }
  ],

  // ── 3D Modelling ───────────────────────────────────────────────────────────
  // Folder: assets/images/modelling/project-1/ etc.
  modelling: [
    {
      cover:   "assets/images/modelling/ModellingImg1.jpg",
      title:   "Bungalow 3D Model",
      caption: "Bungalow 3D Preview · 2026",
      tag:     "3D Modelling",
      images: [
        "assets/images/modelling/ModellingImg1.jpg"
      ]
    }
  ],

  // ── Certificates ───────────────────────────────────────────────────────────
  certificates: [
    {
      src:    "assets/images/certificates/CertImg1.png",
      title:  "Mini Robot Challenge 2nd Placer",
      issuer: "La Consolacion University Philippines",
      date:   "2024",
      tag:    "Award"
    },
    {
      src:    "assets/images/certificates/CertImg2.png",
      title:  "National Robotics Competition",
      issuer: "FIRST EDUSPEC INC",
      date:   "2025",
      tag:    "Award"
    },
    {
      src:    "assets/images/certificates/CertImg3.png",
      title:  "Internship Multiple Awards",
      issuer: "Sunkist Enterprise",
      date:   "2025",
      tag:    "Award"
    }
  ]

};
