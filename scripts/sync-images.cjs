/**
 * Uploads all local frontend images to Sanity and patches the corresponding
 * document fields so the Studio shows real uploaded assets instead of
 * fallbackUrl strings.
 *
 * Run:
 *   cd sparkline
 *   SANITY_API_TOKEN=$(grep SANITY_API_TOKEN .env.local | cut -d= -f2) node scripts/sync-images.cjs
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const PROJECT_ID = "8g3u06mk";
const DATASET = "production";
const TOKEN = process.env.SANITY_API_TOKEN;
const API_VERSION = "2021-06-07";
const PUBLIC_DIR = path.join(__dirname, "../public");

if (!TOKEN) throw new Error("SANITY_API_TOKEN not set");

// ── Helpers ──────────────────────────────────────────────────────────────────

function sanityRequest(method, path, body, contentType = "application/json") {
  return new Promise((resolve, reject) => {
    const isUpload = contentType !== "application/json";
    const data = isUpload ? body : (body ? Buffer.from(JSON.stringify(body)) : null);

    const options = {
      hostname: `${PROJECT_ID}.api.sanity.io`,
      path,
      method,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": contentType,
        ...(data ? { "Content-Length": data.length } : {}),
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const text = Buffer.concat(chunks).toString();
        try {
          const json = JSON.parse(text);
          if (res.statusCode >= 400) reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(json)}`));
          else resolve(json);
        } catch {
          reject(new Error(`Non-JSON response (${res.statusCode}): ${text.slice(0, 200)}`));
        }
      });
    });

    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

async function uploadImage(localPath, label) {
  const fullPath = path.join(PUBLIC_DIR, localPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠  File not found: ${fullPath} — skipping`);
    return null;
  }

  const ext = path.extname(localPath).slice(1).toLowerCase();
  const mimeMap = {
    jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png",
    avif: "image/avif", webp: "image/webp", svg: "image/svg+xml",
    gif: "image/gif",
  };
  const mime = mimeMap[ext] || "application/octet-stream";
  const filename = path.basename(localPath);
  const fileData = fs.readFileSync(fullPath);

  console.log(`  ↑ Uploading ${label} (${filename}, ${Math.round(fileData.length / 1024)}KB)…`);

  const result = await sanityRequest(
    "POST",
    `/v${API_VERSION}/assets/images/${DATASET}?filename=${encodeURIComponent(filename)}`,
    fileData,
    mime,
  );

  const assetId = result.document._id;
  console.log(`  ✓ Uploaded → ${assetId}`);
  return assetId;
}

async function patchDocument(docId, patches) {
  const body = {
    mutations: [{ patch: { id: docId, set: patches } }],
  };
  await sanityRequest(
    "POST",
    `/v${API_VERSION}/data/mutate/${DATASET}`,
    body,
  );
}

function imageRef(assetId) {
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

// ── Service banners ───────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "8e6a111c-8203-4875-9f62-b082e0331c73",
    slug: "digital-marketing",
    bannerTop: "/images/digital-marketing-1.avif",
    bannerBottom: "/images/digital-marketing-2.png",
  },
  {
    id: "380a1929-7192-425b-b8b2-26c7c23b0e2c",
    slug: "website-design-development",
    bannerTop: "/images/website-design-1.avif",
    bannerBottom: "/images/website-design-2.avif",
  },
  {
    id: "3387faad-b208-4881-8cfe-93f5256165cc",
    slug: "content-marketing",
    bannerTop: "/images/content-marketing-1.avif",
    bannerBottom: "/images/content-marketing-2.avif",
  },
  {
    id: "37200201-876b-46a4-990b-b35eba2f2050",
    slug: "social-media-management",
    bannerTop: "/images/social-media-1.avif",
    bannerBottom: "/images/social-media-2.avif",
  },
  {
    id: "15842e0c-456d-4697-9039-0cab80be09eb",
    slug: "branding-design",
    bannerTop: "/images/branding-design-1.avif",
    bannerBottom: "/images/branding-design-2.avif",
  },
  {
    id: "52d8f450-3d5a-4a03-8251-693146b15da4",
    slug: "brand-strategy",
    bannerTop: "/images/brand-strategy-1.avif",
    bannerBottom: "/images/brand-strategy-2.avif",
  },
];

// ── Logo ─────────────────────────────────────────────────────────────────────

const LOGO_PATH = "/logos/sparkline-new-logo.svg";

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n── Service banner images ────────────────────────────────────");
  for (const svc of SERVICES) {
    console.log(`\n[${svc.slug}]`);

    const topId = await uploadImage(svc.bannerTop, "bannerTop");
    const bottomId = await uploadImage(svc.bannerBottom, "bannerBottom");

    const patches = {};
    if (topId) patches["bannerTop.image"] = imageRef(topId);
    if (bottomId) patches["bannerBottom.image"] = imageRef(bottomId);

    if (Object.keys(patches).length) {
      await patchDocument(svc.id, patches);
      console.log(`  ✓ Patched service document`);
    }
  }

  console.log("\n── Logo (siteHeader + siteFooter) ───────────────────────────");
  const logoId = await uploadImage(LOGO_PATH, "Sparkline logo");

  if (logoId) {
    for (const docId of ["siteHeader", "siteFooter"]) {
      await patchDocument(docId, { "logo.image": imageRef(logoId) });
      console.log(`  ✓ Patched ${docId} logo`);
    }
  }

  console.log("\n✅ Done!\n");
}

main().catch((err) => {
  console.error("\n❌", err.message);
  process.exit(1);
});
