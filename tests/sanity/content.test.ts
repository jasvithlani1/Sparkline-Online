import { describe, expect, it } from "vitest";
import * as sanityClient from "@/sanity/lib/client";
import {
  getBlogPosts,
  getPortfolioProjects,
  getServicesContent,
  resolveCmsImage,
  toBlogPost,
  toPortfolioProject,
  toServiceCard,
} from "@/sanity/lib/content";

describe("Sanity content mapping", () => {
  it("uses the live API instead of the CDN for CMS reads", () => {
    expect((sanityClient as { useCdn?: boolean }).useCdn).toBe(false);
  });

  it("maps service documents into existing service-card shape", () => {
    const card = toServiceCard({
      _id: "service.digital-marketing",
      title: "Digital Marketing",
      slug: { current: "digital-marketing" },
      order: 0,
      cardTitle: "Digital\nMarketing",
      cardItems: ["SEO", "Analytics"],
    });

    expect(card).toEqual({
      id: "digital-marketing",
      title: "Digital\nMarketing",
      items: ["SEO", "Analytics"],
    });
  });

  it("resolves seeded fallback images before Sanity assets", () => {
    expect(
      resolveCmsImage({
        fallbackUrl: "/images/work-firecrawl.png",
        alt: "Firecrawl project",
        className: "object-contain object-center",
      }),
    ).toEqual({
      src: "/images/work-firecrawl.png",
      alt: "Firecrawl project",
      className: "object-contain object-center",
    });
  });

  it("maps portfolio project sections into current detail-page shape", () => {
    const project = toPortfolioProject({
      _id: "portfolioProject.example",
      name: "Example",
      slug: { current: "example" },
      order: 0,
      date: "May 30, 2026",
      meta: "Website",
      description: "Project description",
      ctaLabel: "View Project",
      cover: { fallbackUrl: "/images/work-firecrawl.png", alt: "Example", className: "object-cover" },
      intro: "Intro",
      tagline: "TAGLINE",
      summary: "Summary",
      services: ["Strategy"],
      sections: [
        {
          heading: "Hero",
          type: "image",
          images: [{ fallbackUrl: "/images/work-firecrawl.png", alt: "Hero", className: "object-cover" }],
        },
      ],
    });

    expect(project.slug).toBe("example");
    expect(project.image).toBe("/images/work-firecrawl.png");
    expect(project.sections[0].images[0].src).toBe("/images/work-firecrawl.png");
  });

  it("maps blog Portable Text into body text and blocks", () => {
    const post = toBlogPost({
      _id: "blogPost.high-converting-page",
      title: "Landing Pages",
      slug: { current: "landing-pages" },
      order: 0,
      displayDate: "May 30, 2026",
      category: "Marketing",
      description: "Post description",
      cover: { fallbackUrl: "/images/work-blackalgo.png", alt: "Landing Pages", className: "object-cover" },
      body: [
        {
          _type: "block",
          _key: "body-0",
          style: "normal",
          markDefs: [],
          children: [{ _type: "span", _key: "span-0", text: "Body copy", marks: [] }],
        },
      ],
      videoId: "abc123",
    });

    expect(post.body).toBe("Body copy");
    expect(post.bodyBlocks).toHaveLength(1);
  });

  it("fills missing portfolio fields from the static fallback by slug", () => {
    const project = toPortfolioProject({
      _id: "portfolioProject.firecrawl-launch",
      slug: { current: "firecrawl-launch" },
      name: "Firecrawl CMS",
    });

    expect(project.name).toBe("Firecrawl CMS");
    expect(project.description).toContain("launch-ready web presence");
    expect(project.sections.length).toBeGreaterThan(0);
  });

  it("fills missing blog fields from the static fallback by slug", () => {
    const post = toBlogPost({
      _id: "blogPost.how-to-build-a-high-converting-landing-page",
      slug: { current: "how-to-build-a-high-converting-landing-page" },
      title: "Landing Page CMS",
    });

    expect(post.title).toBe("Landing Page CMS");
    expect(post.description).toContain("landing pages convert");
    expect(post.bodyBlocks).toHaveLength(1);
  });

  it("returns static fallback collections during tests", async () => {
    await expect(getServicesContent()).resolves.toHaveProperty("cards.length", 6);
    await expect(getPortfolioProjects()).resolves.toHaveLength(4);
    await expect(getBlogPosts()).resolves.toHaveLength(4);
  });
});
