# FAJ Prime Estates — Website

Premium real estate website for FAJ Prime Estates Ltd., built with React + Vite + Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Status

This is a work-in-progress build. Layout (Navbar, Footer, routing, mobile menu) is complete.
Individual pages are currently placeholders and are being built out section by section.

## Adding images

Never drop raw photos straight into `public/images/`. Instead:

1. Put new raw photos in `image-uploads/<category>/filename.jpg` (this folder is git-ignored — it's a scratch inbox, not committed)
   - Categories: `hero`, `projects`, `properties`, `partners`, `team`, `blog`
2. Run:
   ```bash
   npm run images:optimize
   ```
3. It resizes and converts each one to an optimized `.webp` in `public/images/<category>/filename.webp`
4. Reference it in code as `/images/<category>/filename.webp`

Currently missing (referenced in code, not yet supplied — add with these exact filenames and it'll resolve automatically):
- **Team headshots**: adeola-faj-johnson, amara-nwachukwu, chuka-ibe, emeka-obi, femi-coker, grace-effiong, halima-bello, ifeoma-chukwu, kunle-adebayo, segun-alade
- **Page hero banners**: about-hero, blog-hero, contact-hero, listings-hero, projects-hero, services-hero, site-inspection-hero, team-hero
- **A few property photos**: ajah-duplex-1, ajah-land-1, asokoro-terrace-1, epe-land-1, ph-apartment-1, vi-office-1
- **Two "about" section photos**: about-story, company-culture
