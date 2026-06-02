import { client } from "@/sanity/lib/client";

describe("Sanity client", () => {
  it("bypasses the Sanity CDN so ISR reads freshly published content", () => {
    expect(client.config().useCdn).toBe(false);
  });
});
