/**
 * Creates and populates the siteHeader and siteFooter singleton documents
 * in Sanity with the hardcoded content from the frontend components.
 *
 * Run once:
 *   cd sparkline
 *   SANITY_API_TOKEN=$(grep SANITY_API_TOKEN .env.local | cut -d= -f2) node scripts/sync-header-footer.cjs
 */

const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "8g3u06mk",
  dataset: "production",
  apiVersion: "2026-05-30",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error("SANITY_API_TOKEN is not set.");
  }

  // ── Header ───────────────────────────────────────────────────────────────
  console.log("\n1. Creating siteHeader...");
  await client.createOrReplace({
    _id: "siteHeader",
    _type: "siteHeader",
    logo: {
      _type: "cmsImage",
      fallbackUrl: "/logos/sparkline-new-logo.svg",
      alt: "SPARKLINE MARKETING FIRM",
    },
    ctaLabel: "Book a Call",
    ctaUrl: "https://crm.sparklinemarketingfirm.com/widget/booking/fseh3NlrLcMcooAlLbLB",
  });
  console.log("   ✅ siteHeader created");

  // ── Footer ───────────────────────────────────────────────────────────────
  console.log("\n2. Creating siteFooter...");
  await client.createOrReplace({
    _id: "siteFooter",
    _type: "siteFooter",

    logo: {
      _type: "cmsImage",
      fallbackUrl: "/logos/sparkline-new-logo.svg",
      alt: "Sparkline Marketing Firm",
    },
    tagline:
      "SPARKLINE MARKETING FIRM delivers strategic marketing, creative branding, and digital solutions that help businesses grow with confidence and clarity.",

    servicesColumn: {
      heading: "OUR SERVICES",
      links: [
        { _type: "object", _key: "dm",  label: "Digital Marketing",              href: "/services/digital-marketing" },
        { _type: "object", _key: "bs",  label: "Brand Strategy",                 href: "/services/brand-strategy" },
        { _type: "object", _key: "wd",  label: "Website Design & Development",   href: "/services/website-design-development" },
        { _type: "object", _key: "bd",  label: "Branding & Design",              href: "/services/branding-design" },
        { _type: "object", _key: "sm",  label: "Social Media",                   href: "/services/social-media-management" },
        { _type: "object", _key: "cm",  label: "Content Marketing",              href: "/services/content-marketing" },
      ],
    },

    quickLinksColumn: {
      heading: "QUICK LINKS",
      links: [
        { _type: "object", _key: "about",  label: "About Us",         href: "/about" },
        { _type: "object", _key: "svc",    label: "Our Services",     href: "/services" },
        { _type: "object", _key: "terms",  label: "Terms & Conditions", href: "/terms" },
        { _type: "object", _key: "priv",   label: "Privacy Policy",   href: "/privacy" },
      ],
    },

    contactColumn: {
      heading: "CONTACT",
      phone: "(470) 841-2335",
      phoneHref: "tel:+14708412335",
      email: "info@sparklinemarketingfirm.com",
      emailHref: "mailto:info@sparklinemarketingfirm.com",
      address: "524 Sawnee Village Boulevard, Cumming, Georgia 30040",
      addressHref: "/contact",
    },

    socialColumn: {
      heading: "FOLLOW US",
      links: [
        { _type: "object", _key: "fb",  label: "Facebook",  href: "https://www.facebook.com/profile.php?id=61589700706177" },
        { _type: "object", _key: "ig",  label: "Instagram", href: "https://www.instagram.com/sparklinemarketingfirm" },
        { _type: "object", _key: "li",  label: "LinkedIn",  href: "https://www.linkedin.com/company/sparkline-marketing-firm/?viewAsMember=true" },
        { _type: "object", _key: "x",   label: "X",         href: "https://x.com/SparklineMF" },
      ],
    },

    copyrightText: "© 2026 SPARKLINE MARKETING FIRM. All Rights Reserved.",
    bottomGraphicUrl:
      "https://app.paper.design/file-assets/01KNBNYP6N270CJVTY2FR1GV5J/01KNXFZD87Z01RFEZ99922PQC3.png",
  });
  console.log("   ✅ siteFooter created");

  console.log("\nDone! Header and Footer documents are now in Sanity.\n");
}

main().catch((err) => {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
});
