import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
  orderings: [
    {
      title: "Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" as const }],
    },
  ],
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required().integer().min(0) }),
    defineField({ name: "publishedAt", title: "Published date", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "displayDate", title: "Display date", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "category", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "cover", title: "Cover image", type: "cmsImage", validation: (rule) => rule.required() }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({ name: "href", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https", "mailto"] }) }),
                  defineField({ name: "openInNewTab", type: "boolean", initialValue: false }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          name: "imageBlock",
          type: "object",
          title: "Image",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
          preview: {
            select: { title: "alt", subtitle: "caption", media: "image" },
            prepare({ title, subtitle, media }) {
              return { title: title || "Image", subtitle: subtitle || "", media };
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({ name: "videoId", title: "YouTube video ID", type: "string" }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      description: "Frequently asked questions for this article. These appear as an accordion section below the article body.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "question", subtitle: "answer" },
          },
        }),
      ],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "displayDate", media: "cover.image" },
  },
});
