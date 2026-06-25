import { SparkleIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: SparkleIcon,
  fields: [
    // ── Internal / admin ─────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Internal name",
      description: "Used for reference in the Studio only.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      description: "The URL path for this service page (e.g. website-design-development).",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sort order",
      description: "Controls the display order on the Services listing page.",
      type: "number",
      validation: (rule) => rule.required().integer().min(0),
    }),

    // ── Services listing card ─────────────────────────────────────────────────
    defineField({
      name: "cardTitle",
      title: "Services page — Card heading",
      description: "The heading shown on the service card on the main Services page. Use \\n for line breaks.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cardItems",
      title: "Services page — Card bullet points",
      description: "The bullet points shown on the service card on the main Services page.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.min(1).required(),
    }),

    // ── Section 1 — Page header ───────────────────────────────────────────────
    defineField({
      name: "eyebrow",
      title: "Page header — Eyebrow label",
      description: "Small label shown above the main page title (e.g. \"WEBSITE DESIGN & DEVELOPMENT\").",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detailTitle",
      title: "Page header — Page title",
      description: "The large H1 heading at the top of the service detail page.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lead",
      title: "Page header — Lead paragraph",
      description: "First body paragraph shown below the title. Larger text, bolder tone.",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Page header — Intro paragraph",
      description: "Second body paragraph shown below the lead. Softer, supporting copy.",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),

    // ── Section 2 — Why Sparkline ─────────────────────────────────────────────
    defineField({
      name: "whyUs",
      title: "\"Why Sparkline\" section",
      description: "The two-column section that explains why clients choose Sparkline.",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Section heading",
          description: "Shown as the left-column H2 (e.g. \"Why SPARKLINE MARKETING FIRM\").",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "body",
          title: "Body text",
          description: "Paragraph shown in the right column.",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // ── Section 3 — Top banner image ──────────────────────────────────────────
    defineField({
      name: "bannerTop",
      title: "Top banner image",
      description: "Full-width image shown after the 'Why Sparkline' section.",
      type: "cmsImage",
    }),

    // ── Section 4 — Problems we solve ─────────────────────────────────────────
    defineField({
      name: "problems",
      title: "\"Problems we solve\" section",
      description: "The list section showing client pain points this service addresses.",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Section heading",
          description: "Shown as the H2 above the problem list (e.g. \"Problems We Solve\").",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "items",
          title: "Problem items",
          description: "Each item is a bullet point in the two-column grid.",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),

    // ── Section 5 — Cornerstones + Specialties (same visual block) ────────────
    defineField({
      name: "cornerstones",
      title: "\"Our Approach\" section — Cornerstones (left column)",
      description: "Numbered list in the left column of the Cornerstones & Specialties block.",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Section heading",
          description: "Left-column H2 (e.g. \"Our Core Principles\").",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "items",
          title: "Cornerstone items",
          description: "Each item is a numbered entry in the left column.",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),
    defineField({
      name: "specialtiesHeading",
      title: "\"Our Approach\" section — Specialties heading (right column)",
      description: "Right-column H2 (e.g. \"Our Specialties\"). Defaults to \"Our Specialties\" if left blank.",
      type: "string",
    }),
    defineField({
      name: "specialties",
      title: "\"Our Approach\" section — Specialties items (right column)",
      description: "Each item appears as a pill/tag in the right column of the Cornerstones & Specialties block.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.min(1).required(),
    }),

    // ── Section 6 — Bottom banner image ──────────────────────────────────────
    defineField({
      name: "bannerBottom",
      title: "Bottom banner image",
      description: "Full-width image shown after the Cornerstones & Specialties section.",
      type: "cmsImage",
    }),

    // ── Section 7 — Our process ───────────────────────────────────────────────
    defineField({
      name: "process",
      title: "\"Our Process\" section",
      description: "Two-column section describing how this service is delivered.",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Section heading",
          description: "Left-column H2 (e.g. \"Our Process\").",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "body",
          title: "Body text",
          description: "Paragraph shown in the right column.",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // ── Section 8 — FAQ ───────────────────────────────────────────────────────
    defineField({
      name: "faq",
      title: "FAQ section",
      description: "Accordion FAQ items shown below the Process section.",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
    }),

    // ── Section 9 — Call to action ────────────────────────────────────────────
    defineField({
      name: "cta",
      title: "Call to action section",
      description: "The bottom CTA banner with a heading, supporting text, and button.",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "CTA heading",
          description: "Large heading inside the CTA box.",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "body",
          title: "CTA body text",
          description: "Supporting paragraph below the heading.",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "label",
          title: "Button label",
          description: "Text shown on the CTA button (e.g. \"Book a Call\").",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO settings",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
