import { describe, expect, it, vi } from "vitest";
import { revalidate as blogDetailRevalidate } from "@/app/blogs/[slug]/page";
import { revalidate as blogsRevalidate } from "@/app/blogs/page";
import { revalidate as homeRevalidate } from "@/app/page";
import { revalidate as portfolioDetailRevalidate } from "@/app/portfolio/[slug]/page";
import { revalidate as portfolioRevalidate } from "@/app/portfolio/page";
import { revalidate as serviceDetailRevalidate } from "@/app/services/[slug]/page";
import { revalidate as servicesRevalidate } from "@/app/services/page";
import { POST } from "@/app/api/revalidate/route";

const revalidatedPaths: string[] = [];

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn((path: string) => {
    revalidatedPaths.push(path);
  }),
}));

describe("CMS revalidation", () => {
  const originalSecret = process.env.SANITY_REVALIDATE_SECRET;

  afterEach(() => {
    revalidatedPaths.length = 0;
    process.env.SANITY_REVALIDATE_SECRET = originalSecret;
  });

  it("uses ISR for every Sanity-backed page", () => {
    expect(homeRevalidate).toBe(60);
    expect(servicesRevalidate).toBe(60);
    expect(serviceDetailRevalidate).toBe(60);
    expect(portfolioRevalidate).toBe(60);
    expect(portfolioDetailRevalidate).toBe(60);
    expect(blogsRevalidate).toBe(60);
    expect(blogDetailRevalidate).toBe(60);
  });

  it("rejects Sanity webhook requests without the configured secret", async () => {
    process.env.SANITY_REVALIDATE_SECRET = "test-secret";

    const response = await POST(
      new Request("http://localhost/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _type: "portfolioProject", slug: { current: "cms-project" } }),
      }),
    );

    expect(response.status).toBe(401);
    expect(revalidatedPaths).toEqual([]);
  });

  it("revalidates portfolio listing, homepage, and detail pages from a Sanity webhook", async () => {
    process.env.SANITY_REVALIDATE_SECRET = "test-secret";

    const response = await POST(
      new Request("http://localhost/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-revalidate-secret": "test-secret",
        },
        body: JSON.stringify({ _type: "portfolioProject", slug: { current: "cms-project" } }),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      ok: true,
      revalidated: ["/", "/portfolio", "/portfolio/cms-project"],
    });
    expect(revalidatedPaths).toEqual(["/", "/portfolio", "/portfolio/cms-project"]);
  });
});
