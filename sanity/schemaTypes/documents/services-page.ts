import { RocketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Overview Page",
  type: "document",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "string",
      description: 'The large heading displayed above the intro paragraphs, e.g. "OUR CORE SERVICES".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
      description: "One or more paragraphs shown below the heading. Bold phrases are applied automatically by the frontend.",
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({
      name: "faqSection",
      title: "FAQ Section",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Heading",
          type: "string",
          description: 'e.g. "Frequently Asked Questions"',
        }),
        defineField({
          name: "line",
          title: "Subheading",
          type: "string",
          description: "Short description shown below the heading.",
        }),
        defineField({
          name: "items",
          title: "Questions",
          type: "array",
          of: [{ type: "faqItem" }],
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Services Overview Page" };
    },
  },
});
