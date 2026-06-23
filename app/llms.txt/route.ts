import { NextResponse } from "next/server";
import { getSiteSettings } from "@/sanity/lib/content";

const DEFAULT_SITE_URL = "https://www.sparklinemarketingfirm.com";
const DEFAULT_SITE_NAME = "Sparkline Marketing Firm";

export async function GET() {
  const settings = await getSiteSettings();
  const siteUrl = settings?.siteUrl ?? DEFAULT_SITE_URL;
  const siteName = settings?.siteTitle ?? DEFAULT_SITE_NAME;

  const content =
    settings?.llmsTxtContent?.trim() ||
    `# ${siteName}

> ${siteName} helps ambitious businesses build stronger brands, reach the right audience, and turn digital presence into measurable growth.

## About

${siteName} is a full-service digital marketing agency delivering strategic, creative, and performance-focused solutions.

## Services

- Digital Marketing
- Brand Strategy
- Website Design & Development
- Branding & Design
- Social Media Marketing
- Content Marketing

## Contact

Website: ${siteUrl}
Contact page: ${siteUrl}/contact

## Sitemap

${siteUrl}/sitemap.xml
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
