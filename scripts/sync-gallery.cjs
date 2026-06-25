/**
 * Uploads the 8 about-page gallery images to Sanity and patches
 * the aboutPage.gallerySection so the CMS reflects the frontend images.
 *
 * Run once: SANITY_API_TOKEN=... node scripts/sync-gallery.cjs
 */

const { createClient } = require("@sanity/client");
const fs = require("fs");
const path = require("path");

const client = createClient({
  projectId: "8g3u06mk",
  dataset: "production",
  apiVersion: "2026-05-30",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const IMAGES_DIR = path.join(__dirname, "..", "public", "images");

const GALLERY = [
  { filename: "about-founders-first.png",    alt: "Outdoor Sparkline founder moment",          caption: "Real moments behind the work." },
  { filename: "about-founders-birthday.jpg",  alt: "Ashlan and Ruby Leazer celebrating together", caption: "Built together, with heart." },
  { filename: "about-gallery-2760.jpg",       alt: "Sparkline family portrait outdoors",          caption: "Family first, always." },
  { filename: "about-gallery-3600.jpg",       alt: "Quiet at-home Sparkline moment",              caption: "Grounded in everyday care." },
  { filename: "about-gallery-4749.jpg",       alt: "Sparkline family moment in the mountains",    caption: "Joy we carry forward." },
  { filename: "about-gallery-6945.jpg",       alt: "Ashlan and Ruby Leazer at dinner",            caption: "Sisters beyond the screen." },
  { filename: "about-gallery-7356.jpg",       alt: "Sparkline travel memory",                     caption: "Inspired by every place." },
  { filename: "about-gallery-9541.jpg",       alt: "Sparkline founder memory",                    caption: "Care shows up everywhere." },
];

async function uploadImage(filename) {
  const filePath = path.join(IMAGES_DIR, filename);
  if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);

  const buffer = fs.readFileSync(filePath);
  const contentType = filename.endsWith(".png") ? "image/png" : "image/jpeg";

  console.log(`  Uploading ${filename}…`);
  const asset = await client.assets.upload("image", buffer, { filename, contentType });
  console.log(`  ✓ ${asset._id}`);
  return asset;
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error("SANITY_API_TOKEN is not set. Run with: SANITY_API_TOKEN=... node scripts/sync-gallery.cjs");
  }

  console.log("\n1. Fetching aboutPage from Sanity…");
  const aboutPage = await client.fetch(`*[_type == "aboutPage"][0]{ _id }`);
  if (!aboutPage) throw new Error("No aboutPage document found. Create it in the Studio first.");
  console.log(`   Found: ${aboutPage._id}`);

  console.log("\n2. Uploading gallery images…");
  const assets = await Promise.all(GALLERY.map((g) => uploadImage(g.filename)));

  console.log("\n3. Building gallerySection array…");
  const gallerySection = GALLERY.map((g, i) => ({
    _type: "object",
    _key: `gallery-${i}`,
    galleryImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assets[i]._id },
    },
    alt: g.alt,
    caption: g.caption,
  }));

  console.log("\n4. Patching aboutPage…");
  await client
    .patch(aboutPage._id)
    .setIfMissing({ gallerySection: [] })
    .set({ gallerySection })
    .commit({ autoGenerateArrayKeys: true });

  console.log("\n✅ Done! Gallery synced to Sanity.");
  console.log("   Open Studio → About Page → Gallery Section to verify.\n");
}

main().catch((err) => {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
});
