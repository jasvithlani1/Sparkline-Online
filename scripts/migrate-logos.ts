import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "8g3u06mk",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2026-05-30",
  token: process.env.SANITY_API_TOKEN,
});

async function main() {
  const doc = await client.getDocument<{
    trustedBy?: { logos?: { _key: string; _type: string; src?: string; fallbackUrl?: string; alt?: string }[] };
  }>("homePage");

  if (!doc?.trustedBy?.logos?.length) {
    console.log("No logos found in homePage.trustedBy — nothing to migrate.");
    return;
  }

  const logos = doc.trustedBy.logos;
  const needsMigration = logos.some((l) => l._type !== "cmsImage" || l.src);

  if (!needsMigration) {
    console.log("Logos already migrated to cmsImage format.");
    return;
  }

  const migratedLogos = logos.map((logo) => ({
    _key: logo._key,
    _type: "cmsImage",
    fallbackUrl: logo.fallbackUrl ?? logo.src ?? "",
    alt: logo.alt ?? "",
  }));

  await client
    .patch("homePage")
    .set({ "trustedBy.logos": migratedLogos })
    .commit();

  console.log(`Migrated ${migratedLogos.length} logos to cmsImage format:`);
  migratedLogos.forEach((l) => console.log(`  • ${l.fallbackUrl}  [${l.alt}]`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
