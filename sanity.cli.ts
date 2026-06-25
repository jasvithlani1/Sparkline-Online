import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "8g3u06mk";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    appId: "ahj5voo5b7ger0rsgyqomypd",
  },
});
