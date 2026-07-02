import { describe, expect, it } from "vitest";
import { client, useCdn } from "@/sanity/lib/client";
import {
  getBlogPosts,
  getPortfolioProjects,
  getServicesContent,
  resolveCmsImage,
  toBlogPost,
  toPortfolioProject,
  toServiceCard,
  toServiceDetail,
} from "@/sanity/lib/content";

describe("Sanity content mapping", () => {
  it("uses fresh Sanity API reads for server-rendered CMS content", () => {
    expect(useCdn).toBe(false);
    expect(client.config().useCdn).toBe(false);
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

  it("maps backend service FAQ items into service detail content", () => {
    const detail = toServiceDetail({
      _id: "service.cms-service",
      title: "CMS Service",
      slug: { current: "cms-service" },
      faq: [
        {
          _key: "backend-faq-one",
          question: "Can this FAQ come from Sanity?",
          answer: "Yes, service detail pages render FAQ items from the backend.",
        },
      ],
    });

    expect(detail.faq).toEqual([
      {
        id: "backend-faq-one",
        question: "Can this FAQ come from Sanity?",
        answer: "Yes, service detail pages render FAQ items from the backend.",
      },
    ]);
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

  it("maps portfolio project into current shape", () => {
    const project = toPortfolioProject({
      _id: "portfolioProject.example",
      name: "Example",
      slug: { current: "example" },
      order: 0,
      date: "May 30, 2026",
      description: "Project description",
      ctaLabel: "View Project",
      cover: { fallbackUrl: "/images/work-firecrawl.png", alt: "Example", className: "object-cover" },
      canvaUrl: "https://www.canva.com/design/example/view",
    });

    expect(project.slug).toBe("example");
    expect(project.image).toBe("/images/work-firecrawl.png");
    expect(project.description).toBe("Project description");
    expect(project.canvaUrl).toBe("https://www.canva.com/design/example/view");
  });

  it("maps blog Portable Text into body text and blocks", () => {
    const post = toBlogPost({
      _id: "blogPost.high-converting-page",
      title: "Landing Pages",
      slug: { current: "landing-pages" },
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
