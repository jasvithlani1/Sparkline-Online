import { describe, expect, it } from "vitest";
import { schemaTypes } from "@/sanity/schemaTypes";

describe("Sanity schema", () => {
  it("registers the CMS document types", () => {
    const names = schemaTypes.map((type) => type.name);

    expect(names).toContain("service");
    expect(names).toContain("portfolioProject");
    expect(names).toContain("blogPost");
  });
});
