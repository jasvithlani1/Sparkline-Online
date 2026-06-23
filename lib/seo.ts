import type { Metadata } from "next";
import type { SiteSettings, SiteSettingsOrg, SiteSettingsPerson } from "@/sanity/lib/content";

const DEFAULT_SITE_URL = "https://www.sparklinemarketingfirm.com";
const DEFAULT_SITE_NAME = "Sparkline Marketing Firm";

// ── Sanitisation ─────────────────────────────────────────────────────────────

const DANGEROUS_PATTERNS = [
  /on\w+\s*=/gi,           // inline event handlers
  /javascript\s*:/gi,      // javascript: URLs
  /document\.cookie/gi,    // cookie theft
  /\beval\s*\(/gi,         // eval
  /<\s*iframe/gi,          // iframes
  /data\s*:/gi,            // data: URIs
];

export function sanitiseScript(raw: string): string {
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(raw)) return "";
  }
  return raw;
}

// ── Metadata builder ─────────────────────────────────────────────────────────

interface PageSeoInput {
  title?: string | null;
  description?: string | null;
  ogImageUrl?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
  siteSettings?: SiteSettings | null;
  path?: string;
}

export function buildMetadata(input: PageSeoInput): Metadata {
  const {
    title,
    description,
    ogImageUrl,
    canonicalUrl,
    noIndex,
    siteSettings,
    path = "",
  } = input;

  const siteName = siteSettings?.siteTitle ?? DEFAULT_SITE_NAME;
  const siteUrl = siteSettings?.siteUrl ?? DEFAULT_SITE_URL;
  const resolvedOg = ogImageUrl ?? siteSettings?.defaultOgImageUrl;

  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const canonical = canonicalUrl ?? `${siteUrl}${path}`;

  const metadata: Metadata = {
    title: pageTitle,
    ...(description ? { description } : {}),
    alternates: { canonical },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: pageTitle,
      ...(description ? { description } : {}),
      url: canonical,
      siteName,
      type: "website",
      ...(resolvedOg ? { images: [{ url: resolvedOg, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      ...(description ? { description } : {}),
      ...(resolvedOg ? { images: [resolvedOg] } : {}),
    },
  };

  return metadata;
}

// ── JSON-LD builders ─────────────────────────────────────────────────────────

export function buildOrganizationLD(org: SiteSettingsOrg, siteUrl: string) {
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": org.type ?? "MarketingAgency",
    "@id": `${siteUrl}/#organization`,
    name: org.name,
    url: org.url ?? siteUrl,
    ...(org.logoUrl ? { logo: { "@type": "ImageObject", url: org.logoUrl } } : {}),
    ...(org.telephone ? { telephone: org.telephone } : {}),
    ...(org.email ? { email: org.email } : {}),
    ...(org.sameAs?.length ? { sameAs: org.sameAs } : {}),
    ...(org.areaServed?.length ? { areaServed: org.areaServed } : {}),
    ...(org.priceRange ? { priceRange: org.priceRange } : {}),
  };

  if (org.address) {
    base.address = {
      "@type": "PostalAddress",
      ...(org.address.streetAddress ? { streetAddress: org.address.streetAddress } : {}),
      ...(org.address.city ? { addressLocality: org.address.city } : {}),
      ...(org.address.state ? { addressRegion: org.address.state } : {}),
      ...(org.address.postalCode ? { postalCode: org.address.postalCode } : {}),
      ...(org.address.country ? { addressCountry: org.address.country } : {}),
    };
  }

  if (org.geo?.latitude && org.geo?.longitude) {
    base.geo = {
      "@type": "GeoCoordinates",
      latitude: org.geo.latitude,
      longitude: org.geo.longitude,
    };
  }

  if (org.openingHours?.length) {
    base.openingHoursSpecification = org.openingHours;
  }

  return base;
}

export function buildPersonLD(person: SiteSettingsPerson, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: person.name,
    ...(person.jobTitle ? { jobTitle: person.jobTitle } : {}),
    ...(person.imageUrl ? { image: person.imageUrl } : {}),
    ...(person.url ? { url: person.url } : {}),
    ...(person.sameAs?.length ? { sameAs: person.sameAs } : {}),
  };
}

export function buildWebSiteLD(siteName: string, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/blogs?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function buildBreadcrumbLD(items: BreadcrumbItem[], siteUrl: string) {
  const listItems = [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    ...items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: item.name,
      ...(item.url ? { item: `${siteUrl}${item.url}` } : {}),
    })),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: listItems,
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function buildFaqLD(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function buildAggregateRatingLD(
  name: string,
  ratingValue: number,
  ratingCount: number,
  bestRating = 5,
  worstRating = 1,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount: ratingCount,
      bestRating,
      worstRating,
    },
  };
}

interface ArticleInput {
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
  publishedAt?: string;
  modifiedAt?: string;
  authorName?: string;
  authorUrl?: string;
  siteUrl: string;
  siteName: string;
  articleType?: string;
}

export function buildArticleLD(input: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": input.articleType ?? "BlogPosting",
    headline: input.title,
    ...(input.description ? { description: input.description } : {}),
    url: input.url,
    ...(input.imageUrl ? { image: input.imageUrl } : {}),
    ...(input.publishedAt ? { datePublished: input.publishedAt } : {}),
    ...(input.modifiedAt ? { dateModified: input.modifiedAt } : {}),
    author: {
      "@type": "Person",
      name: input.authorName ?? input.siteName,
      ...(input.authorUrl ? { url: input.authorUrl } : {}),
    },
    publisher: {
      "@type": "Organization",
      "@id": `${input.siteUrl}/#organization`,
      name: input.siteName,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
  };
}

interface ServiceInput {
  name: string;
  description?: string;
  url: string;
  areaServed?: string;
  siteUrl: string;
  siteName: string;
}

export function buildServiceLD(input: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    url: input.url,
    ...(input.areaServed ? { areaServed: input.areaServed } : {}),
    provider: {
      "@type": "Organization",
      "@id": `${input.siteUrl}/#organization`,
      name: input.siteName,
    },
  };
}
