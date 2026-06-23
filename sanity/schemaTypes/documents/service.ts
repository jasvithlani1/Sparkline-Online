import { SparkleIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: SparkleIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required().integer().min(0) }),
    defineField({
      name: "cardTitle",
      title: "Card title",
      type: "string",
      description: "Use line breaks to preserve the current service-card heading treatment.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cardItems",
      title: "Card bullet items",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({ name: "eyebrow", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "detailTitle", title: "Detail page title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "lead", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "intro", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "bannerTop", title: "Top banner", type: "cmsImage" }),
    defineField({ name: "bannerBottom", title: "Bottom banner", type: "cmsImage" }),
    defineField({
      name: "whyUs",
      title: "Why us",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "body", type: "text", rows: 4, validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "problems",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "items",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),
    defineField({
      name: "cornerstones",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "items",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),
    defineField({ name: "specialtiesHeading", type: "string" }),
    defineField({
      name: "specialties",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({
      name: "process",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "body", type: "text", rows: 4, validation: (rule) => rule.required() }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQs",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
    }),
    defineField({
      name: "cta",
      title: "Call to action",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "body", type: "text", rows: 3, validation: (rule) => rule.required() }),
        defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
      ],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
