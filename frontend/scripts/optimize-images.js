/**
 * Image optimization pipeline for FAJ Prime Estates.
 *
 * WHY THIS EXISTS:
 * Raw camera/phone photos are typically 2-8MB and 3000-6000px wide.
 * Displayed on a website at 400-1600px, that's 90%+ wasted bytes on
 * every single page load. This script resizes + compresses every new
 * image the same way, automatically, so nobody has to remember to
 * do it by hand (or forget to, and quietly bloat the site again).
 *
 * HOW TO USE (for you or your colleague):
 *   1. Drop new raw images into:  image-uploads/<category>/filename.jpg
 *      Categories: hero, projects, properties, partners, team, blog
 *   2. Run:  npm run images:optimize
 *   3. It outputs an optimized .webp into: public/images/<category>/filename.webp
 *   4. Reference it in your data file / component as:
 *        /images/<category>/filename.webp
 *
 * image-uploads/ is git-ignored on purpose — it's just a scratch inbox,
 * NOT where the live site reads images from. public/images/ is the
 * real, committed, optimized source of truth.
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "image-uploads");
const OUT = path.join(ROOT, "public", "images");

// Max display width per category — tweak these if a section's design changes.
const MAX_WIDTH = {
  hero: 1920,
  projects: 1600,
  properties: 1400,
  partners: 800,
  team: 600,
  blog: 900,
};

async function optimizeFile(srcPath, outPath, category) {
  const ext = path.extname(srcPath).toLowerCase();

  if (ext === ".avif") {
    // Already an efficient modern format — just copy through.
    fs.copyFileSync(srcPath, outPath.replace(/\.webp$/, ".avif"));
    return;
  }

  const width = MAX_WIDTH[category] || 1200;
  await sharp(srcPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: category === "hero" ? 80 : 78 })
    .toFile(outPath);
}

async function run() {
  if (!fs.existsSync(SRC)) {
    console.log(`No "image-uploads" folder found at ${SRC}.`);
    console.log("Create it, add category subfolders, and drop images in before running this.");
    return;
  }

  const categories = fs
    .readdirSync(SRC)
    .filter((f) => fs.statSync(path.join(SRC, f)).isDirectory());

  if (categories.length === 0) {
    console.log("image-uploads/ exists but has no category subfolders. Nothing to do.");
    return;
  }

  let processed = 0;

  for (const category of categories) {
    const inDir = path.join(SRC, category);
    const outDir = path.join(OUT, category);
    fs.mkdirSync(outDir, { recursive: true });

    const files = fs
      .readdirSync(inDir)
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));

    for (const file of files) {
      const srcPath = path.join(inDir, file);
      const base = path.basename(file, path.extname(file));
      const outPath = path.join(outDir, base + ".webp");
      const before = fs.statSync(srcPath).size;

      await optimizeFile(srcPath, outPath, category);

      const after = fs.statSync(
        fs.existsSync(outPath) ? outPath : outPath.replace(/\.webp$/, ".avif")
      ).size;

      console.log(
        `  ${category}/${file} -> ${category}/${base}.webp  (${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB)`
      );
      processed++;
    }
  }

  console.log(`\nDone. ${processed} image(s) optimized into public/images/.`);
  console.log("Remember to update the matching path in your data file / component if it's a new filename.");
}

run();
