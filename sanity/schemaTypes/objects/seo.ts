import { SearchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
      validation: (rule) => rule.max(70).warning("Keep titles near 70 characters or fewer."),
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(180).warning("Keep descriptions near 180 characters or fewer."),
    }),
    defineField({
      name: "image",
      title: "Social image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
