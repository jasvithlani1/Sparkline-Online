import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "8g3u06mk",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2026-05-30",
  token: process.env.SANITY_API_TOKEN,
});

const LOGO_DIR = path.resolve(process.cwd(), "public/images/trusted-by");

const logos = [
  { file: "q1.jpeg", alt: "Trusted brand logo 1" },
  { file: "q2.jpeg", alt: "Trusted brand logo 2" },
  { file: "q3.jpeg", alt: "Trusted brand logo 3" },
  { file: "q4.jpeg", alt: "Trusted brand logo 4" },
  { file: "q5.jpeg", alt: "Trusted brand logo 5" },
  { file: "q6.jpeg", alt: "Trusted brand logo 6" },
  { file: "q7.jpeg", alt: "Trusted brand logo 7" },
];

async function main() {
  const migratedLogos = [];

  for (let i = 0; i < logos.length; i++) {
    const { file, alt } = logos[i];
    const filePath = path.join(LOGO_DIR, file);
    const buffer = fs.readFileSync(filePath);

    console.log(`Uploading ${file}...`);
    const asset = await client.assets.upload("image", buffer, {
      filename: file,
      contentType: "image/jpeg",
    });

    migratedLogos.push({
      _key: `logo-${i}`,
      _type: "cmsImage",
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      },
      fallbackUrl: `/images/trusted-by/${file}`,
      alt,
    });

    console.log(`  ✓ Uploaded as ${asset._id}`);
  }

  await client
    .patch("homePage")
    .set({ "trustedBy.logos": migratedLogos })
    .commit();

  console.log("\nAll logos uploaded and patched into homePage.trustedBy.logos");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
