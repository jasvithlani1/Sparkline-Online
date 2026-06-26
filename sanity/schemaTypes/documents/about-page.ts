import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "introSection",
      title: "Intro Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "paragraphs", title: "Paragraphs", type: "array", of: [{ type: "text", rows: 4 }] }),
      ],
    }),
    defineField({
      name: "foundersSection",
      title: "Founders Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "founders",
          title: "Founders",
          type: "array",
          of: [
            {
              type: "object",
              preview: {
                select: { title: "name", media: "portraitImage" },
              },
              fields: [
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({
                  name: "portraitImage",
                  title: "Portrait Photo",
                  type: "image",
                  options: { hotspot: true },
                  description: "Upload a portrait photo. If left empty, the default image will be used.",
                }),
                defineField({
                  name: "portraitAlt",
                  title: "Portrait Photo Alt Text",
                  type: "string",
                  description: "Describe the photo for accessibility and SEO (e.g. \"Jane Smith, Co-founder of Sparkline, smiling outdoors\").",
                }),
                defineField({ name: "bio", title: "Bio", type: "array", of: [{ type: "text", rows: 4 }] }),
                defineField({
                  name: "imageSide",
                  title: "Image Side",
                  type: "string",
                  options: { list: ["left", "right"] },
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "gallerySection",
      title: "Gallery Section",
      type: "array",
      of: [
        {
          type: "object",
          preview: {
            select: { title: "caption", media: "galleryImage" },
          },
          fields: [
            defineField({
              name: "galleryImage",
              title: "Gallery Photo",
              type: "image",
              options: { hotspot: true },
              description: "Upload a gallery photo. If left empty, the default image will be used.",
            }),
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
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
      return {
        title: "About Page",
      };
    },
  },
});
