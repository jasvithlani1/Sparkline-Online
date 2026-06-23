import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    // ── Identity ────────────────────────────────────────────────────────────
    defineField({
      name: "siteTitle",
      title: "Site Name",
      type: "string",
      description: "Business name shown in browser tabs and JSON-LD (e.g. Sparkline Marketing Firm).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      description: "Canonical domain (e.g. https://www.sparklinemarketingfirm.com).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default Social Sharing Image",
      type: "image",
      description: "Fallback OG image for pages that do not have their own. Recommended: 1200×630 px.",
      options: { hotspot: true },
    }),

    // ── Analytics & Tracking ─────────────────────────────────────────────────
    defineField({
      name: "analyticsGroup",
      title: "Analytics & Tracking",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "gtmId",
          title: "Google Tag Manager ID",
          type: "string",
          description: "Format: GTM-XXXXXXX. Injects GTM snippet in <head> and <body>.",
          validation: (r) =>
            r.custom((val: string | undefined) => {
              if (!val) return true;
              return /^GTM-[A-Z0-9]+$/.test(val) ? true : "Must be GTM-XXXXXXX";
            }),
        }),
        defineField({
          name: "gaId",
          title: "Google Analytics 4 Measurement ID",
          type: "string",
          description: "Format: G-XXXXXXXXXX. Only active when GTM is NOT set.",
          validation: (r) =>
            r.custom((val: string | undefined) => {
              if (!val) return true;
              return /^G-[A-Z0-9]+$/.test(val) ? true : "Must be G-XXXXXXXXXX";
            }),
        }),
        defineField({
          name: "gscCode",
          title: "Google Search Console Verification Code",
          type: "string",
          description: "The content= value from the <meta name=\"google-site-verification\"> tag.",
        }),
      ],
    }),

    // ── Organization Schema ──────────────────────────────────────────────────
    defineField({
      name: "organizationSchema",
      title: "Organization / Business Schema",
      type: "object",
      description: "Used to generate Organization / LocalBusiness JSON-LD on every page.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "type",
          title: "Schema Type",
          type: "string",
          options: {
            list: [
              { title: "Organization", value: "Organization" },
              { title: "LocalBusiness", value: "LocalBusiness" },
              { title: "MarketingAgency", value: "MarketingAgency" },
              { title: "ProfessionalService", value: "ProfessionalService" },
            ],
            layout: "radio",
          },
          initialValue: "MarketingAgency",
        }),
        defineField({ name: "name", title: "Business Name", type: "string" }),
        defineField({ name: "url", title: "Business URL", type: "url" }),
        defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
        defineField({ name: "telephone", title: "Phone Number", type: "string", description: "+1XXXXXXXXXX" }),
        defineField({ name: "email", title: "Email Address", type: "string" }),
        defineField({
          name: "address",
          title: "Address",
          type: "object",
          fields: [
            defineField({ name: "streetAddress", title: "Street Address", type: "string" }),
            defineField({ name: "city", title: "City", type: "string" }),
            defineField({ name: "state", title: "State / Region", type: "string" }),
            defineField({ name: "postalCode", title: "Postal Code", type: "string" }),
            defineField({ name: "country", title: "Country", type: "string", initialValue: "US" }),
          ],
        }),
        defineField({
          name: "geo",
          title: "Geographic Coordinates",
          type: "object",
          fields: [
            defineField({ name: "latitude", title: "Latitude", type: "string", description: "e.g. 33.7490" }),
            defineField({ name: "longitude", title: "Longitude", type: "string", description: "e.g. -84.3880" }),
          ],
        }),
        defineField({
          name: "openingHours",
          title: "Opening Hours",
          type: "array",
          of: [{ type: "string" }],
          description: 'ISO 8601, e.g. "Mo-Fr 09:00-17:00"',
        }),
        defineField({
          name: "priceRange",
          title: "Price Range",
          type: "string",
          description: "Dollar signs, e.g. $$",
          options: {
            list: [
              { title: "$ — Budget", value: "$" },
              { title: "$$ — Moderate", value: "$$" },
              { title: "$$$ — Premium", value: "$$$" },
              { title: "$$$$ — Luxury", value: "$$$$" },
            ],
          },
        }),
        defineField({
          name: "sameAs",
          title: "Social Profiles (sameAs)",
          type: "array",
          of: [{ type: "url" }],
          description: "Instagram, LinkedIn, Facebook, etc.",
        }),
        defineField({
          name: "areaServed",
          title: "Areas Served",
          type: "array",
          of: [{ type: "string" }],
          description: "e.g. Atlanta, United States",
        }),
      ],
    }),

    // ── Person Schema ─────────────────────────────────────────────────────────
    defineField({
      name: "personSchema",
      title: "Key Person Schema",
      type: "object",
      description: "Optional. Adds a Person JSON-LD block for the founder/principal.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "name", title: "Full Name", type: "string" }),
        defineField({ name: "jobTitle", title: "Job Title", type: "string" }),
        defineField({ name: "image", title: "Profile Photo", type: "image", options: { hotspot: true } }),
        defineField({ name: "url", title: "Profile Page URL", type: "url" }),
        defineField({ name: "sameAs", title: "Social Profiles", type: "array", of: [{ type: "url" }] }),
      ],
    }),

    // ── Crawl Manager ────────────────────────────────────────────────────────
    defineField({
      name: "robotsDisallow",
      title: "Crawl Manager — Disallow Paths",
      type: "array",
      of: [{ type: "string" }],
      description: "Paths to block search engines from (must start with /). e.g. /studio",
      initialValue: ["/studio"],
    }),

    // ── Custom Script Injection ───────────────────────────────────────────────
    defineField({
      name: "customHeaderScripts",
      title: "⚠️ Custom Header Scripts (Advanced)",
      type: "text",
      rows: 6,
      description: "Raw HTML/JS injected inside <head>. Developers only. Validated for XSS before rendering.",
    }),
    defineField({
      name: "customFooterScripts",
      title: "⚠️ Custom Footer Scripts (Advanced)",
      type: "text",
      rows: 6,
      description: "Raw HTML/JS injected at end of <body>. Developers only.",
    }),

    // ── LLMs.txt ─────────────────────────────────────────────────────────────
    defineField({
      name: "llmsTxtContent",
      title: "AI/LLM Context File (llms.txt)",
      type: "text",
      rows: 12,
      description: "Content served at /llms.txt to help AI assistants understand your site. See llmstxt.org.",
    }),
  ],
});
