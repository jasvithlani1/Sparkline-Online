import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const cmsImage = defineType({
  name: "cmsImage",
  title: "Image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Uploaded image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "fallbackUrl",
      title: "Fallback public URL",
      type: "string",
      description: "Existing public asset path, such as /images/work-firecrawl.png.",
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "className",
      title: "Image class name",
      type: "string",
      description: "Optional rendering class used by the current site design.",
    }),
  ],
  preview: {
    select: {
      title: "alt",
      subtitle: "fallbackUrl",
      media: "image",
    },
  },
});
