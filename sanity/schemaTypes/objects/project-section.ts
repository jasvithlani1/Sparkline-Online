import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const projectSection = defineType({
  name: "projectSection",
  title: "Project Section",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      type: "string",
      initialValue: "image",
      options: {
        list: [
          { title: "Single image", value: "image" },
          { title: "Image grid", value: "grid" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      type: "array",
      of: [defineArrayMember({ type: "cmsImage" })],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "type" },
  },
});
