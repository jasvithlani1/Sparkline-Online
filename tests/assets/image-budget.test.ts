import fs from "node:fs";
import path from "node:path";

const budgets = {
  "public/images/hero-submarine.webp": 150_000,
  "public/images/service-submarine.webp": 150_000,
  "public/images/service-water.webp": 250_000,
  "public/images/hero-reef.webp": 150_000,
} as const;

describe("landing image assets", () => {
  it("keeps the largest images under the shipping budget", () => {
    for (const [relativePath, maxBytes] of Object.entries(budgets)) {
      const absolutePath = path.join(process.cwd(), relativePath);
      const { size } = fs.statSync(absolutePath);

      expect(size).toBeLessThanOrEqual(maxBytes);
    }
  });
});
