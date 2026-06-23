import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "8g3u06mk",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2026-05-30",
  token: process.env.SANITY_API_TOKEN,
});

const doc = {
  _id: "servicesPage",
  _type: "servicesPage",
  heading: "OUR CORE SERVICES",
  intro: [
    "SPARKLINE MARKETING FIRM delivers strategic and creative solutions designed to help businesses grow with confidence in a competitive digital landscape. Our services are built to create a strong, consistent brand presence while supporting long-term business goals through purposeful execution and measurable impact.",
    "From Digital Marketing and Brand Strategy to Website Design & Development, we help brands build visibility, define their market position, and create meaningful customer experiences. Our team focuses on developing tailored strategies and high-performing digital platforms that strengthen credibility and drive engagement.",
    "We also specialise in Branding & Design, Social Media Management, and Content Marketing to ensure your business communicates with clarity and consistency across every touchpoint. Whether you need a stronger visual identity, a more engaging online presence, or content that connects with the right audience, SPARKLINE MARKETING FIRM provides integrated solutions that bring strategy, creativity, and performance together to help your brand stand out and grow with lasting impact.",
  ],
  ctaLabel: "Learn More",
  seo: {
    _type: "seo",
    title: "Services — Sparkline Marketing Firm",
    description:
      "Explore Sparkline Marketing Firm's core services: Digital Marketing, Website Design & Development, Content Marketing, Social Media Management, Branding & Design, and Brand Strategy.",
  },
};

async function main() {
  await client.createOrReplace(doc);
  console.log("✓ servicesPage seeded");
  console.log(`  heading: "${doc.heading}"`);
  console.log(`  intro paragraphs: ${doc.intro.length}`);
  console.log(`  ctaLabel: "${doc.ctaLabel}"`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
