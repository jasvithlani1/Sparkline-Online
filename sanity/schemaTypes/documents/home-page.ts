import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "featuredIntro",
      title: "Featured Intro",
      type: "object",
      fields: [
        defineField({
          name: "body",
          title: "Body Paragraphs",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "serviceBanner",
      title: "Service Banner",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Banner Title",
          type: "string",
          description: "e.g., 'HOW CAN WE SERVE YOU?'",
        }),
        defineField({
          name: "options",
          title: "Service Options",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "id", title: "ID", type: "string" }),
                defineField({
                  name: "icon",
                  title: "Custom Icon (SVG code)",
                  type: "text",
                  rows: 3,
                  description: "Optional. Paste raw SVG code to override the default icon for this service.",
                }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
                defineField({ name: "href", title: "Link URL", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "trustedBy",
      title: "Trusted By Section",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        }),
        defineField({
          name: "lines",
          title: "Intro Lines",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "logos",
          title: "Logos",
          type: "array",
          of: [{ type: "cmsImage" }],
        }),
      ],
    }),
    defineField({
      name: "workGallerySection",
      title: "Work Gallery Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "lines", title: "Intro Lines", type: "array", of: [{ type: "string" }] }),
        defineField({
          name: "cta",
          title: "CTA Button",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Link URL", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ Section",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
});
