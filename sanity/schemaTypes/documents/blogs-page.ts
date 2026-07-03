import { ComposeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const blogsPage = defineType({
  name: "blogsPage",
  title: "Blogs Overview Page",
  type: "document",
  icon: ComposeIcon,
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Blogs Overview Page" };
    },
  },
});
