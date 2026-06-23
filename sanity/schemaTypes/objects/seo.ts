import { SearchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO & Schema",
  type: "object",
  icon: SearchIcon,
  options: { collapsible: true, collapsed: false },
  fields: [
    // ── Standard Meta ─────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Meta Title",
      type: "string",
      description: "Page title shown on Google. Aim for 50–60 characters.",
      validation: (r) => r.max(70).warning("Keep titles under 70 characters."),
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Summary shown in search results. Aim for 140–160 characters.",
      validation: (r) => r.max(180).warning("Keep descriptions under 180 characters."),
    }),
    defineField({
      name: "image",
      title: "Social Sharing Image (OG Image)",
      type: "image",
      description: "Image shown when shared on LinkedIn, Twitter, Facebook. Recommended: 1200×630 px.",
      options: { hotspot: true },
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Only set if this page has a duplicate at another URL. Usually leave blank.",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from Search Engines (noindex)",
      type: "boolean",
      description: "Turn ON to prevent Google indexing this page.",
      initialValue: false,
    }),

    // ── Schema Modules (JSON-LD) ───────────────────────────────────────────────
    defineField({
      name: "schemaModules",
      title: "Structured Data Modules (JSON-LD)",
      description: "Toggle on schema types that apply to this page. Only enabled modules are rendered.",
      type: "array",
      of: [
        // FAQ Schema
        {
          type: "object",
          name: "faqSchema",
          title: "FAQ Schema",
          fields: [
            defineField({ name: "enabled", title: "Enable FAQ Schema", type: "boolean", initialValue: true }),
            defineField({
              name: "faqs",
              title: "FAQ Items",
              type: "array",
              of: [{
                type: "object",
                name: "faqItem",
                fields: [
                  defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
                  defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
                ],
                preview: { select: { title: "question", subtitle: "answer" } },
              }],
            }),
          ],
          preview: { prepare: () => ({ title: "❓ FAQ Schema" }) },
        },

        // Review / AggregateRating Schema
        {
          type: "object",
          name: "reviewSchema",
          title: "Review / Rating Schema",
          fields: [
            defineField({ name: "enabled", title: "Enable Review Schema", type: "boolean", initialValue: true }),
            defineField({ name: "ratingValue", title: "Average Rating", type: "number", description: "e.g. 4.9", validation: (r) => r.min(0).max(5) }),
            defineField({ name: "ratingCount", title: "Review Count", type: "number", validation: (r) => r.min(0).integer() }),
            defineField({ name: "bestRating", title: "Best Rating", type: "number", initialValue: 5 }),
            defineField({ name: "worstRating", title: "Worst Rating", type: "number", initialValue: 1 }),
          ],
          preview: {
            select: { rating: "ratingValue", count: "ratingCount" },
            prepare: ({ rating, count }: { rating?: number; count?: number }) => ({
              title: `⭐ Review Schema — ${rating ?? "?"}★ (${count ?? "?"} reviews)`,
            }),
          },
        },

        // Article Schema
        {
          type: "object",
          name: "articleSchema",
          title: "Article Schema",
          fields: [
            defineField({ name: "enabled", title: "Enable Article Schema", type: "boolean", initialValue: true }),
            defineField({
              name: "articleType",
              title: "Article Type",
              type: "string",
              options: {
                list: [
                  { title: "Article", value: "Article" },
                  { title: "BlogPosting", value: "BlogPosting" },
                  { title: "NewsArticle", value: "NewsArticle" },
                ],
                layout: "radio",
              },
              initialValue: "BlogPosting",
            }),
            defineField({ name: "authorName", title: "Author Name", type: "string", description: "Leave blank to use site Person schema." }),
            defineField({ name: "publishedDate", title: "Published Date", type: "datetime" }),
            defineField({ name: "modifiedDate", title: "Last Modified Date", type: "datetime" }),
          ],
          preview: {
            select: { articleType: "articleType" },
            prepare: ({ articleType }: { articleType?: string }) => ({
              title: `📰 Article Schema (${articleType ?? "Article"})`,
            }),
          },
        },

        // Service Schema
        {
          type: "object",
          name: "serviceSchema",
          title: "Service Schema",
          fields: [
            defineField({ name: "enabled", title: "Enable Service Schema", type: "boolean", initialValue: true }),
            defineField({ name: "serviceName", title: "Service Name", type: "string" }),
            defineField({ name: "serviceDescription", title: "Service Description", type: "text", rows: 3 }),
            defineField({ name: "areaServed", title: "Area Served", type: "string", description: "e.g. Atlanta, GA, United States" }),
          ],
          preview: {
            select: { serviceName: "serviceName" },
            prepare: ({ serviceName }: { serviceName?: string }) => ({
              title: `🛠 Service Schema — ${serviceName ?? "Unnamed"}`,
            }),
          },
        },
      ],
    }),
  ],
});
