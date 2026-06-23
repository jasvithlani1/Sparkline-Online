import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "8g3u06mk";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

// Singleton document types — these cannot be created or deleted via the UI
const SINGLETON_TYPES = new Set(["siteSettings", "homePage", "aboutPage", "contactPage", "servicesPage", "termsPage", "privacyPage"]);

export default defineConfig({
  name: "sparkline-cms",
  title: "Sparkline CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .schemaType("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),

            S.divider(),

            // Singleton pages
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .schemaType("homePage")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .schemaType("aboutPage")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.listItem()
              .title("Contact Page")
              .id("contactPage")
              .schemaType("contactPage")
              .child(S.document().schemaType("contactPage").documentId("contactPage")),
            S.listItem()
              .title("Services Page")
              .id("servicesPage")
              .schemaType("servicesPage")
              .child(S.document().schemaType("servicesPage").documentId("servicesPage")),
            S.listItem()
              .title("Terms Page")
              .id("termsPage")
              .schemaType("termsPage")
              .child(S.document().schemaType("termsPage").documentId("termsPage")),
            S.listItem()
              .title("Privacy Policy")
              .id("privacyPage")
              .schemaType("privacyPage")
              .child(S.document().schemaType("privacyPage").documentId("privacyPage")),

            S.divider(),

            // Collection types
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("portfolioProject").title("Portfolio Projects"),
            S.documentTypeListItem("blogPost").title("Blog Posts"),
            S.documentTypeListItem("enquiry").title("Enquiries"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // Remove create/delete actions from singleton document types
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
});
