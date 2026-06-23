import { createClient } from "@sanity/client";
const client = createClient({
  projectId: "8g3u06mk",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-03-01"
});
async function check() {
  const docs = await client.fetch('*[_type == "homePage"][0]');
  console.log(JSON.stringify(docs.serviceBanner, null, 2));
}
check();
