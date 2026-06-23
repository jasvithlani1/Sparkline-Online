import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/sanity/lib/content";

const DEFAULT_SITE_URL = "https://www.sparklinemarketingfirm.com";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const siteUrl = settings?.siteUrl ?? DEFAULT_SITE_URL;
  const disallow = settings?.robotsDisallow?.length ? settings.robotsDisallow : ["/studio"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
