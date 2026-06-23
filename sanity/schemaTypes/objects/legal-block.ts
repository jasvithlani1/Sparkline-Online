import {
  BlockContentIcon,
  FolderIcon,
  HashIcon,
  ThLargeIcon,
  ThListIcon,
  UlistIcon,
} from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const legalParagraph = defineType({
  name: "legalParagraph",
  title: "Paragraph",
  type: "object",
  icon: BlockContentIcon,
  fields: [
    defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
  ],
  preview: {
    select: { title: "text" },
    prepare({ title }: { title?: string }) {
      return { title: `¶  ${title ?? ""}` };
    },
  },
});

export const legalSubheading = defineType({
  name: "legalSubheading",
  title: "Subheading",
  type: "object",
  icon: HashIcon,
  fields: [
    defineField({ name: "text", title: "Text", type: "string" }),
  ],
  preview: {
    select: { title: "text" },
    prepare({ title }: { title?: string }) {
      return { title: `##  ${title ?? ""}` };
    },
  },
});

export const legalList = defineType({
  name: "legalList",
  title: "Bullet List",
  type: "object",
  icon: UlistIcon,
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare({ items }: { items?: string[] }) {
      return { title: `•  List (${items?.length ?? 0} items)` };
    },
  },
});

export const legalTableRow = defineType({
  name: "legalTableRow",
  title: "Table Row",
  type: "object",
  icon: ThListIcon,
  fields: [
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "provider", title: "Provider / Detail", type: "string" }),
  ],
  preview: {
    select: { title: "category", subtitle: "provider" },
  },
});

export const legalTable = defineType({
  name: "legalTable",
  title: "Table",
  type: "object",
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [{ type: "legalTableRow" }],
    }),
  ],
  preview: {
    select: { rows: "rows" },
    prepare({ rows }: { rows?: unknown[] }) {
      return { title: `⊞  Table (${rows?.length ?? 0} rows)` };
    },
  },
});

export const legalSection = defineType({
  name: "legalSection",
  title: "Section",
  type: "object",
  icon: FolderIcon,
  fields: [
    defineField({
      name: "id",
      title: "Anchor ID",
      type: "string",
      description: "Used for deep-linking, e.g. 'agreement', 'fees', 'cookies'",
    }),
    defineField({ name: "number", title: "Section Number", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "blocks",
      title: "Content Blocks",
      type: "array",
      of: [
        { type: "legalParagraph" },
        { type: "legalSubheading" },
        { type: "legalList" },
        { type: "legalTable" },
      ],
    }),
  ],
  preview: {
    select: { number: "number", title: "title" },
    prepare({ number, title }: { number?: string; title?: string }) {
      return { title: `${number ?? "?"}. ${title ?? "Untitled Section"}` };
    },
  },
});
