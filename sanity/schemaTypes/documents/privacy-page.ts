import { LockIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const privacyPage = defineType({
  name: "privacyPage",
  title: "Privacy Policy Page",
  type: "document",
  icon: LockIcon,
  fields: [
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "effectiveDate",
      title: "Effective Date",
      type: "string",
      description: 'e.g. "April 29, 2026"',
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "string",
      description: 'e.g. "April 29, 2026"',
    }),
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      description: "Displayed in the page header, e.g. SPARKLINE MARKETING FIRM, LLC",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [{ type: "legalSection" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Privacy Policy Page" };
    },
  },
});
