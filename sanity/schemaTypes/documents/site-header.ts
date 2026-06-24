import { DesktopIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteHeader = defineType({
  name: "siteHeader",
  title: "Header",
  type: "document",
  icon: DesktopIcon,
  fields: [
    // ── Logo ────────────────────────────────────────────────────────────────
    defineField({
      name: "logo",
      title: "Logo",
      type: "cmsImage",
      description: "Logo shown in the top-left corner of every page.",
      validation: (rule) => rule.required(),
    }),

    // ── CTA Button ──────────────────────────────────────────────────────────
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      description: 'Text on the primary action button in the header, e.g. "Book a Call".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA Button URL",
      type: "url",
      description: "Where the CTA button links to (can be an external booking link).",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Header" };
    },
  },
});
