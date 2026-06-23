/**
 * Uploads the two hardcoded founder portrait images to Sanity and patches
 * the aboutPage document so the Portrait Photo fields reflect the same
 * images currently shown on the frontend.
 *
 * Run once: node scripts/sync-founder-portraits.cjs
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

const PORTRAITS = [
  { filename: "about-ashlan-leazer.jpeg", founderName: "Ashlan Leazer", imageSide: "left" },
  { filename: "about-second-founder.jpeg", founderName: "Ruby Leazer",   imageSide: "right" },
];

async function uploadImage(filename) {
  const filePath = path.join(IMAGES_DIR, filename);
  if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);

  const buffer = fs.readFileSync(filePath);
  const contentType = filename.endsWith(".png") ? "image/png" : "image/jpeg";

  console.log(`  Uploading ${filename}…`);
  const asset = await client.assets.upload("image", buffer, { filename, contentType });
  console.log(`  ✓ Asset ID: ${asset._id}`);
  return asset;
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error("SANITY_API_TOKEN env var is not set. Run with: SANITY_API_TOKEN=... node scripts/sync-founder-portraits.cjs");
  }

  // ── 1. Fetch current aboutPage ───────────────────────────────────────────
  console.log("\n1. Fetching aboutPage document from Sanity…");
  const aboutPage = await client.fetch(`*[_type == "aboutPage"][0]{ _id, foundersSection }`);

  if (!aboutPage) {
    throw new Error("No aboutPage document found in Sanity. Create it in the Studio first.");
  }
  console.log(`   Found: ${aboutPage._id}`);

  // ── 2. Upload portrait images ────────────────────────────────────────────
  console.log("\n2. Uploading portrait images…");
  const [ashlanAsset, rubyAsset] = await Promise.all(PORTRAITS.map((p) => uploadImage(p.filename)));
  const uploadedAssets = [ashlanAsset, rubyAsset];

  // ── 3. Build updated founders array ─────────────────────────────────────
  console.log("\n3. Patching aboutPage document…");
  const existingFounders = aboutPage.foundersSection?.founders ?? [];

  let updatedFounders;

  if (existingFounders.length >= 2) {
    // Update existing founders — keep all their current fields, just add/replace portraitImage
    updatedFounders = existingFounders.map((founder, i) => {
      const asset = uploadedAssets[i];
      if (!asset) return founder;
      return {
        ...founder,
        portraitImage: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        },
      };
    });
    console.log(`   Updating ${updatedFounders.length} existing founders.`);
  } else {
    // Create founders from scratch (preserving any existing single entry if present)
    updatedFounders = PORTRAITS.map((p, i) => {
      const existing = existingFounders[i] ?? {};
      return {
        _type: "object",
        _key: existing._key ?? `founder-${i}`,
        name:      existing.name      ?? p.founderName,
        imageSide: existing.imageSide ?? p.imageSide,
        bio:       existing.bio       ?? [],
        portraitImage: {
          _type: "image",
          asset: { _type: "reference", _ref: uploadedAssets[i]._id },
        },
      };
    });
    console.log(`   Creating ${updatedFounders.length} new founder entries.`);
  }

  // ── 4. Commit patch ──────────────────────────────────────────────────────
  await client
    .patch(aboutPage._id)
    .setIfMissing({ foundersSection: {} })
    .set({ "foundersSection.founders": updatedFounders })
    .commit({ autoGenerateArrayKeys: true });

  console.log("\n✅ Done! Portrait images synced to Sanity.");
  console.log("   Open the Studio → About Page → Founders Section to verify,");
  console.log("   then publish the document to make them live on the website.\n");
}

main().catch((err) => {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
});
