import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Root layout", () => {
  it("uses the Sparkline brand for the browser tab title", () => {
    const layoutSource = readFileSync("app/layout.tsx", "utf8");

    expect(layoutSource).toContain('title: "Sparkline Marketing Firm"');
    expect(layoutSource).not.toContain('title: "Dockclaw"');
  });

  it("does not force links to open in a new tab", () => {
    const layoutSource = readFileSync("app/layout.tsx", "utf8");
    const forceNewTabSource = readFileSync("components/force-new-tab-links.tsx", "utf8");

    expect(layoutSource).not.toContain('target="_blank"');
    expect(layoutSource).not.toContain("<base");
    expect(layoutSource).not.toContain("ForceNewTabLinks");
    expect(forceNewTabSource).not.toMatch(/target\s*=\s*["']_blank["']/);
  });
});
