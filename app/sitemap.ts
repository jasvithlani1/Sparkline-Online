import type { MetadataRoute } from "next";
import { getSiteSettings, getBlogSlugs, getPortfolioSlugs } from "@/sanity/lib/content";
import { getServiceSlugs } from "@/sanity/lib/content";

const DEFAULT_SITE_URL = "https://www.sparklinemarketingfirm.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, blogSlugs, portfolioSlugs, serviceSlugs] = await Promise.all([
    getSiteSettings(),
    getBlogSlugs(),
    getPortfolioSlugs(),
    getServiceSlugs(),
  ]);

  const siteUrl = settings?.siteUrl ?? DEFAULT_SITE_URL;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/blogs`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blogs/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = portfolioSlugs.map((slug) => ({
    url: `${siteUrl}/portfolio/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...portfolioRoutes];
}
