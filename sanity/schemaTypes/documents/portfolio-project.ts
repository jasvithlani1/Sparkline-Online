import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const portfolioProject = defineType({
  name: "portfolioProject",
  title: "Portfolio Project",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required().integer().min(0) }),
    defineField({ name: "date", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "ctaLabel", title: "CTA label", type: "string", initialValue: "View Project" }),
    defineField({ name: "cover", title: "Cover image", type: "cmsImage", validation: (rule) => rule.required() }),
    defineField({
      name: "canvaUrl",
      title: "Canva Presentation URL",
      type: "url",
      description: "Paste the Canva smartlink for this project. The full presentation will be embedded directly on the project page.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }).required(),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "name", subtitle: "date", media: "cover.image" },
  },
});
