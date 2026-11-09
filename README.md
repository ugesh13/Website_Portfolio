# Ugesh Kumar — Frontend Developer Portfolio

A high-performance, dark-brutalist portfolio website personalized for **Ugesh Kumar**, Frontend Developer. Built upon the signature interactive template featuring GSAP animations, WebGL tile-mosaic portrait effect, dot-assembled preloader, project showcase & modal, and interactive Pixel Breakout arcade.

---

## ⚡ Tech Stack & Architecture

- **Core**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS v4 + Dark Brutalist Theme (`#050505`) + Neon Orange Accent (`#ff5c3d`)
- **Animation Engine**: GSAP 3 (ScrollTrigger, Timelines, Context)
- **WebGL Engine**: Custom WebGL2 shader point-cloud mosaic portrait
- **Interactive Canvas**: Fixed-timestep accumulator canvas arcade engine
- **Icons**: Lucide React + Custom SVG Brand Glyphs

---

## 🌟 Sections & Interactive Experiences

1. **Dot-Assembled Hero Preloader (`src/components/HeroPreloader.tsx` + `src/components/DotWordAnimation.tsx`)**:
   - The wordmark `"UGESH"` is dynamically drawn letter by letter with a playful dot bouncing along the baseline and orbiting the glyphs.
   - Holds the name, then seamlessly morphs left-to-right into `"PORTFOLIO"`.
   - GSAP split timeline: heading drops to reveal the job title (`Frontend Developer`), splitting `PORT` / `FOLIO` horizontally around the portrait.
2. **WebGL Tile-Mosaic Portrait (`src/components/HeroTilePortrait.tsx`)**:
   - WebGL2 engine rendering point sprites from project color atlases.
   - Dynamic cursor-repulsion and scroll-reactive scattering.
   - Neutral studio rim-lit developer silhouette placeholder installed at `public/portrait.jpg` (ready to be swapped with Ugesh's photo anytime).
3. **Word-by-Word Scrubbed About Section (`src/components/AboutSection.tsx`)**:
   - Personalized narrative highlighting Ugesh's passion for frontend development, interactive experiences, and vibe coding.
   - 4-card verified metrics grid: 05 Credentials, 02 Hackathons, 100% Hands-on Learning, 0→1 Idea to Prototype.
   - Continuous marquee ticker displaying Ugesh's real skills across 4 categorized tracks.
4. **Services & Capabilities Accordion (`src/components/ServicesSection.tsx`)**:
   - 4 tailored capability rows: Frontend Development & UI, AI-Assisted Dev & Vibe Coding, Data Analytics & Dashboards, and Database Foundations.
5. **Verified Certifications & Credentials Gallery (`src/components/CertificatesSection.tsx`)**:
   - Dedicated certifications gallery showcasing Ugesh's 5 authentic credentials:
     1. *What Is Generative AI?* (LinkedIn Learning)
     2. *Coding Foundations* (SoloLearn)
     3. *AI Fluency: Framework & Foundations* (Anthropic)
     4. *Smart India Hackathon 2026 Internal Hackathon* (JAIN University / AICTE / MoE Innovation Cell)
     5. *AVISHKAR 2026 Alumni-Led Hackathon* (JAIN University Faculty of Engineering & Technology)
   - Interactive Lightbox / Modal with high-res certificate image preview, previous/next controls, keyboard navigation (Escape, Left/Right arrows), and metadata display.
6. **Featured Projects Showcase & Deep-Dive Modal (`src/components/ProjectsSection.tsx`)**:
   - Full-width alternating project cards with landscape preview thumbnails, category tags, subtitles, and detail modal.
   - Configurable project slots with architecture breakdowns and tags.
7. **Personal Interests & Creative Pursuits (`src/components/InterestsSection.tsx`)**:
   - Dedicated 3-card showcase highlighting Gaming, Building Side Projects, and Exploring New Technologies.
8. **Interactive Pixel Breakout Arcade (`src/components/PixelBreakoutSection.tsx`)**:
   - Destructible ASCII bitmap brick game featuring `"FRONTEND DEV"`.
   - Autopilot attract mode, interactive play mode with paddle physics, and custom text re-rasterization.
9. **Contact & Footer (`src/components/ContactSection.tsx`)**:
   - One-click email copy pill with toast feedback.
   - Configurable social links (GitHub, LinkedIn).

---

## 🚀 Running Locally

```bash
# Start the Vite development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## ⚙️ Centralized Configuration

All personal details, skills, projects, certificates, and links are managed from:
👉 **[`src/config/portfolio.ts`](src/config/portfolio.ts)**
