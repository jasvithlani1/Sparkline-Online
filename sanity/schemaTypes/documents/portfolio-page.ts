import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const portfolioPage = defineType({
  name: "portfolioPage",
  title: "Portfolio Overview Page",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Portfolio Overview Page" };
    },
  },
});
