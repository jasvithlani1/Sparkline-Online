import type { PortableTextBlock } from "next-sanity";
import {
  blogPosts,
  faqSection,
  ourServices,
  serviceDetails,
  workGallery,
  type ServiceDetailSlug,
} from "@/lib/content";
import { client } from "./client";
import {
  BLOG_POST_QUERY,
  BLOG_POSTS_QUERY,
  BLOG_SLUGS_QUERY,
  PORTFOLIO_PROJECT_QUERY,
  PORTFOLIO_PROJECTS_QUERY,
  PORTFOLIO_SLUGS_QUERY,
  SERVICE_DETAIL_QUERY,
  SERVICE_LIST_QUERY,
  SERVICE_SLUGS_QUERY,
  HOME_PAGE_QUERY,
  ABOUT_PAGE_QUERY,
  CONTACT_PAGE_QUERY,
  SERVICES_PAGE_QUERY,
  TERMS_PAGE_QUERY,
  PRIVACY_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  SITE_FOOTER_QUERY,
  SITE_HEADER_QUERY,
} from "./queries";

const isTest = process.env.NODE_ENV === "test";

type SlugValue = string | { current?: string } | undefined;

type CmsImageDocument = {
  image?: unknown;
  fallbackUrl?: string;
  alt?: string;
  className?: string;
  assetUrl?: string;
};

type ServiceDocument = {
  _id?: string;
  title?: string;
  slug?: SlugValue;
  order?: number;
  cardTitle?: string;
  cardItems?: string[];
  eyebrow?: string;
  detailTitle?: string;
  lead?: string;
  intro?: string;
  bannerTop?: CmsImageDocument;
  bannerBottom?: CmsImageDocument;
  whyUs?: { heading?: string; body?: string };
  problems?: { heading?: string; items?: string[] };
  cornerstones?: { heading?: string; items?: string[] };
  specialtiesHeading?: string;
  specialties?: string[];
  process?: { heading?: string; body?: string };
  faq?: FaqDocument[];
  cta?: { heading?: string; body?: string; label?: string };
  seo?: SeoDocument;
};

type FaqDocument = {
  _key?: string;
  id?: string;
  question?: string;
  answer?: string;
};

type PortfolioProjectDocument = {
  _id?: string;
  name?: string;
  slug?: SlugValue;
  order?: number;
  date?: string;
  meta?: string;
  description?: string;
  ctaLabel?: string;
  cover?: CmsImageDocument;
  intro?: string;
  tagline?: string;
  summary?: string;
  services?: string[];
  sections?: {
    _key?: string;
    heading?: string;
    type?: "image" | "grid";
    images?: CmsImageDocument[];
  }[];
  canvaUrl?: string;
  seo?: SeoDocument;
};

type BlogPostDocument = {
  _id?: string;
  title?: string;
  slug?: SlugValue;
  order?: number;
  publishedAt?: string;
  displayDate?: string;
  category?: string;
  description?: string;
  cover?: CmsImageDocument;
  body?: PortableTextBlock[];
  bodyText?: string;
  videoId?: string;
  faqs?: FaqDocument[];
  seo?: SeoDocument;
};

type SeoDocument = {
  title?: string;
  description?: string;
  ogImageUrl?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
};

type ServiceCard = {
  id: string;
  title: string;
  items: string[];
};

type ServiceDetail = {
  slug: string;
  eyebrow: string;
  title: string;
  bannerTop?: string;
  bannerBottom?: string;
  lead: string;
  intro: string;
  whyUs: { heading: string; body: string };
  problems: { heading: string; items: string[] };
  cornerstones: { heading: string; items: string[] };
  specialtiesHeading?: string;
  specialties: string[];
  process: { heading: string; body: string };
  faq: { id: string; question: string; answer: string }[];
  cta: { heading: string; body: string; label: string };
};

type PortfolioImage = {
  src: string;
  alt: string;
  className: string;
};

type PortfolioProject = {
  id: string;
  slug: string;
  name: string;
  date: string;
  meta: string;
  description: string;
  ctaLabel: string;
  image: string;
  imageClassName: string;
  intro: string;
  tagline: string;
  summary: string;
  services: string[];
  sections: {
    heading: string;
    type: "image" | "grid";
    images: PortfolioImage[];
  }[];
  canvaUrl?: string;
  seo?: SeoDocument;
};

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  imageClassName: string;
  body: string;
  bodyBlocks?: PortableTextBlock[];
  videoId: string;
  faqs: { id: string; question: string; answer: string }[];
  seo?: SeoDocument;
};

type ServiceEntry = {
  card: ServiceCard;
  detail: ServiceDetail;
  seo?: SeoDocument;
};

function slugString(slug: SlugValue, fallback = "") {
  if (typeof slug === "string") return slug;
  return slug?.current ?? fallback;
}

function maybeArray<T>(value: T[] | undefined, fallback: readonly T[] = []) {
  return value && value.length > 0 ? value : [...fallback];
}

function toFaqItems(items: FaqDocument[] | undefined, fallback: readonly FaqDocument[] = []) {
  return maybeArray(items, fallback)
    .map((item, index) => ({
      id: item.id ?? item._key ?? `faq-${index}`,
      question: item.question ?? "",
      answer: item.answer ?? "",
    }))
    .filter((item) => item.question && item.answer);
}

function textFromBlocks(blocks: PortableTextBlock[] | undefined) {
  if (!blocks?.length) return "";

  return blocks
    .map((block) => {
      if (!Array.isArray(block.children)) return "";
      return block.children
        .map((child) => ("text" in child && typeof child.text === "string" ? child.text : ""))
        .join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

export function textToPortableText(text: string, keyPrefix = "body"): PortableTextBlock[] {
  return text
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => ({
      _type: "block",
      _key: `${keyPrefix}-${index}`,
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: `${keyPrefix}-${index}-span`,
          text: paragraph,
          marks: [],
        },
      ],
    }));
}

export function resolveCmsImage(value: CmsImageDocument | undefined, fallbackAlt = "") {
  return {
    src: value?.assetUrl ?? value?.fallbackUrl ?? "",
    alt: value?.alt ?? fallbackAlt,
    className: value?.className ?? "object-cover object-center",
  };
}

export function toServiceCard(doc: ServiceDocument): ServiceCard {
  const slug = slugString(doc.slug, doc._id?.replace(/^service\./, ""));

  return {
    id: slug,
    title: doc.cardTitle ?? doc.title ?? slug,
    items: maybeArray(doc.cardItems),
  } as ServiceCard;
}

export function toServiceDetail(doc: ServiceDocument): ServiceDetail {
  const slug = slugString(doc.slug, doc._id?.replace(/^service\./, "")) as ServiceDetailSlug;
  const fallback = serviceDetails[slug] as unknown as ServiceDetail | undefined;
  const bannerTop = resolveCmsImage(doc.bannerTop, doc.title).src;
  const bannerBottom = resolveCmsImage(doc.bannerBottom, doc.title).src;

  return {
    slug,
    eyebrow: doc.eyebrow ?? fallback?.eyebrow ?? doc.title ?? slug,
    title: doc.detailTitle ?? fallback?.title ?? doc.title ?? slug,
    ...(bannerTop ? { bannerTop } : {}),
    ...(bannerBottom ? { bannerBottom } : {}),
    lead: doc.lead ?? fallback?.lead ?? "",
    intro: doc.intro ?? fallback?.intro ?? "",
    whyUs: {
      heading: doc.whyUs?.heading ?? fallback?.whyUs.heading ?? "Why SPARKLINE MARKETING FIRM",
      body: doc.whyUs?.body ?? fallback?.whyUs.body ?? "",
    },
    problems: {
      heading: doc.problems?.heading ?? fallback?.problems.heading ?? "What We Improve",
      items: maybeArray(doc.problems?.items, fallback?.problems.items),
    },
    cornerstones: {
      heading: doc.cornerstones?.heading ?? fallback?.cornerstones.heading ?? "Key Focus Areas",
      items: maybeArray(doc.cornerstones?.items, fallback?.cornerstones.items),
    },
    ...(doc.specialtiesHeading ?? fallback?.specialtiesHeading
      ? { specialtiesHeading: doc.specialtiesHeading ?? fallback?.specialtiesHeading }
      : {}),
    specialties: maybeArray(doc.specialties, fallback?.specialties),
    process: {
      heading: doc.process?.heading ?? fallback?.process.heading ?? "How We Deliver",
      body: doc.process?.body ?? fallback?.process.body ?? "",
    },
    faq: toFaqItems(doc.faq, fallback?.faq),
    cta: {
      heading: doc.cta?.heading ?? fallback?.cta.heading ?? "Ready to start?",
      body: doc.cta?.body ?? fallback?.cta.body ?? "Contact Sparkline Marketing Firm to discuss your goals.",
      label: doc.cta?.label ?? fallback?.cta.label ?? "Contact Now",
    },
  } as ServiceDetail;
}

export function toServiceEntry(doc: ServiceDocument): ServiceEntry {
  return {
    card: toServiceCard(doc),
    detail: toServiceDetail(doc),
    seo: doc.seo,
  };
}

export function toPortfolioProject(doc: PortfolioProjectDocument): PortfolioProject {
  const slug = slugString(doc.slug, doc._id?.replace(/^portfolioProject\./, ""));
  const fallback = workGallery.projects.find((project) => project.slug === slug) as unknown as PortfolioProject | undefined;
  const cover = resolveCmsImage(doc.cover, doc.name ?? fallback?.name ?? slug);
  const image = cover.src || fallback?.image || "";
  const sections = doc.sections?.length
    ? doc.sections.map((section) => ({
        heading: section.heading ?? "Project Section",
        type: section.type ?? "image",
        images: (section.images ?? []).map((imageValue) => {
          const resolved = resolveCmsImage(imageValue, section.heading);
          return {
            src: resolved.src,
            alt: resolved.alt,
            className: resolved.className,
          };
        }),
      }))
    : (fallback?.sections ?? []);

  return {
    id: doc._id ?? fallback?.id ?? `portfolioProject.${slug}`,
    slug,
    name: doc.name ?? fallback?.name ?? slug,
    date: doc.date ?? fallback?.date ?? "",
    meta: doc.meta ?? fallback?.meta ?? "",
    description: doc.description ?? fallback?.description ?? "",
    ctaLabel: doc.ctaLabel ?? fallback?.ctaLabel ?? "View Project",
    image,
    imageClassName: cover.src ? cover.className : (fallback?.imageClassName ?? cover.className),
    intro: doc.intro ?? fallback?.intro ?? "",
    tagline: doc.tagline ?? fallback?.tagline ?? doc.name ?? slug,
    summary: doc.summary ?? fallback?.summary ?? "",
    services: maybeArray(doc.services, fallback?.services),
    sections,
    canvaUrl: doc.canvaUrl,
    seo: doc.seo,
  } as PortfolioProject;
}

export function toBlogPost(doc: BlogPostDocument): BlogPost {
  const slug = slugString(doc.slug, doc._id?.replace(/^blogPost\./, ""));
  const fallback = blogPosts.find((post) => post.slug === slug);
  const cover = resolveCmsImage(doc.cover, doc.title ?? fallback?.title ?? slug);
  const fallbackBlocks = fallback ? textToPortableText(fallback.body, slug) : [];
  const bodyBlocks = doc.body?.length
    ? doc.body
    : doc.bodyText
      ? textToPortableText(doc.bodyText, slug)
      : fallbackBlocks;

  return {
    id: doc._id ?? fallback?.id ?? `blogPost.${slug}`,
    slug,
    title: doc.title ?? fallback?.title ?? slug,
    date: doc.displayDate ?? doc.publishedAt ?? fallback?.date ?? "",
    category: doc.category ?? fallback?.category ?? "Marketing",
    description: doc.description ?? fallback?.description ?? "",
    image: cover.src || fallback?.image || "",
    imageClassName: cover.src ? cover.className : (fallback?.imageClassName ?? cover.className),
    body: doc.bodyText || textFromBlocks(bodyBlocks) || fallback?.body || "",
    bodyBlocks,
    videoId: doc.videoId ?? fallback?.videoId ?? "",
    faqs: toFaqItems(doc.faqs),
    seo: doc.seo,
  } as BlogPost;
}

async function fetchSanity<T>(query: string, params?: Record<string, string>) {
  if (isTest) return null;
  return client.fetch<T>(query, params ?? {});
}

function fallbackServiceEntries(): ServiceEntry[] {
  const entries: ServiceEntry[] = [];

  for (const card of ourServices.cards) {
    const detail = serviceDetails[card.id as ServiceDetailSlug] as unknown as ServiceDetail | undefined;
    if (!detail) continue;

    entries.push({
      card: {
        id: card.id,
        title: card.title,
        items: [...card.items],
      },
      detail,
    });
  }

  return entries;
}

type ServicesPageDocument = {
  heading?: string;
  intro?: string[];
  faqSection?: {
    eyebrow?: string;
    line?: string;
    items?: { _key?: string; question?: string; answer?: string }[];
  };
  seo?: SeoDocument;
};

export async function getServicesContent() {
  const [pageDoc, serviceDocs] = await Promise.all([
    fetchSanity<ServicesPageDocument>(SERVICES_PAGE_QUERY),
    fetchSanity<ServiceDocument[]>(SERVICE_LIST_QUERY),
  ]);

  const cmsFaq = pageDoc?.faqSection;
  return {
    heading: pageDoc?.heading ?? "OUR CORE SERVICES",
    eyebrow: ourServices.eyebrow,
    intro: pageDoc?.intro?.length ? pageDoc.intro : [...ourServices.intro],
    cards: serviceDocs?.length ? serviceDocs.map(toServiceCard) : [...ourServices.cards],
    ctaLabel: ourServices.ctaLabel,
    faq: {
      eyebrow: cmsFaq?.eyebrow ?? faqSection.eyebrow,
      lines: cmsFaq?.line ? [cmsFaq.line] : [...faqSection.lines],
      items: cmsFaq?.items?.length
        ? cmsFaq.items.map((item, i) => ({
            id: item._key ?? `faq-${i}`,
            question: item.question ?? "",
            answer: item.answer ?? "",
          }))
        : [...faqSection.items],
    },
    seo: pageDoc?.seo,
  };
}

export async function getServiceEntries() {
  const docs = await fetchSanity<ServiceDocument[]>(SERVICE_LIST_QUERY);
  if (!docs?.length) return fallbackServiceEntries();

  const entries = await Promise.all(
    docs.map(async (doc) => {
      const slug = slugString(doc.slug);
      const detailDoc = slug ? await fetchSanity<ServiceDocument>(SERVICE_DETAIL_QUERY, { slug }) : doc;
      return toServiceEntry(detailDoc ?? doc);
    }),
  );

  return entries;
}

export async function getServiceBySlug(slug: string) {
  const doc = await fetchSanity<ServiceDocument>(SERVICE_DETAIL_QUERY, { slug });
  if (doc) return toServiceEntry(doc);

  return fallbackServiceEntries().find((entry) => entry.card.id === slug) ?? null;
}

export async function getServiceSlugs() {
  const docs = await fetchSanity<{ slug?: string }[]>(SERVICE_SLUGS_QUERY);
  if (docs?.length) return docs.map((doc) => doc.slug).filter((slug): slug is string => Boolean(slug));
  return fallbackServiceEntries().map((entry) => entry.card.id);
}

export async function getPortfolioProjects() {
  const docs = await fetchSanity<PortfolioProjectDocument[]>(PORTFOLIO_PROJECTS_QUERY);
  if (!docs?.length) return [...workGallery.projects] as unknown as PortfolioProject[];

  return docs.map(toPortfolioProject);
}

export async function getPortfolioProjectBySlug(slug: string) {
  const doc = await fetchSanity<PortfolioProjectDocument>(PORTFOLIO_PROJECT_QUERY, { slug });
  if (doc) return toPortfolioProject(doc);

  return (workGallery.projects.find((project) => project.slug === slug) ?? null) as PortfolioProject | null;
}

export async function getBlogPosts() {
  const docs = await fetchSanity<BlogPostDocument[]>(BLOG_POSTS_QUERY);
  if (!docs?.length) {
    return blogPosts.map((post) => ({
      ...post,
      bodyBlocks: textToPortableText(post.body, post.slug),
    })) as BlogPost[];
  }

  return docs.map(toBlogPost);
}

export async function getBlogPostBySlug(slug: string) {
  const doc = await fetchSanity<BlogPostDocument>(BLOG_POST_QUERY, { slug });
  if (doc) return toBlogPost(doc);

  const fallback = blogPosts.find((post) => post.slug === slug);
  if (!fallback) return null;

  return {
    ...fallback,
    bodyBlocks: textToPortableText(fallback.body, fallback.slug),
    faqs: [],
  } as BlogPost;
}

export async function getHomePage() {
  return fetchSanity<any>(HOME_PAGE_QUERY);
}

export async function getAboutPage() {
  return fetchSanity<any>(ABOUT_PAGE_QUERY);
}

export async function getContactPage() {
  return fetchSanity<any>(CONTACT_PAGE_QUERY);
}

export type SanityLegalBlock = {
  _key?: string;
  _type?: string;
  text?: string;
  items?: string[];
  rows?: { _key?: string; category?: string; provider?: string }[];
};

export type SanityLegalSection = {
  _key?: string;
  id?: string;
  number?: string;
  title?: string;
  blocks?: SanityLegalBlock[];
};

export type SanityLegalPage = {
  seo?: SeoDocument;
  effectiveDate?: string;
  lastUpdated?: string;
  companyName?: string;
  sections?: SanityLegalSection[];
};

export async function getTermsPage() {
  return fetchSanity<SanityLegalPage>(TERMS_PAGE_QUERY);
}

export async function getPrivacyPage() {
  return fetchSanity<SanityLegalPage>(PRIVACY_PAGE_QUERY);
}

// ── Site Settings ─────────────────────────────────────────────────────────────

export type SiteSettingsAnalytics = {
  gtmId?: string;
  gaId?: string;
  gscCode?: string;
};

export type SiteSettingsOrg = {
  type?: string;
  name?: string;
  url?: string;
  logoUrl?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  geo?: { latitude?: string; longitude?: string };
  openingHours?: string[];
  priceRange?: string;
  sameAs?: string[];
  areaServed?: string[];
};

export type SiteSettingsPerson = {
  name?: string;
  jobTitle?: string;
  imageUrl?: string;
  url?: string;
  sameAs?: string[];
};

export type SiteSettings = {
  siteTitle?: string;
  siteUrl?: string;
  defaultOgImageUrl?: string;
  analyticsGroup?: SiteSettingsAnalytics;
  organizationSchema?: SiteSettingsOrg;
  personSchema?: SiteSettingsPerson;
  robotsDisallow?: string[];
  customHeaderScripts?: string;
  customFooterScripts?: string;
  llmsTxtContent?: string;
};

let _siteSettingsCache: SiteSettings | null | undefined;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (_siteSettingsCache !== undefined) return _siteSettingsCache;
  const result = await fetchSanity<SiteSettings>(SITE_SETTINGS_QUERY);
  _siteSettingsCache = result ?? null;
  return _siteSettingsCache;
}

export async function getBlogSlugs(): Promise<string[]> {
  const docs = await fetchSanity<{ slug?: string }[]>(BLOG_SLUGS_QUERY);
  return (docs ?? []).map((d) => d.slug).filter((s): s is string => Boolean(s));
}

export async function getPortfolioSlugs(): Promise<string[]> {
  const docs = await fetchSanity<{ slug?: string }[]>(PORTFOLIO_SLUGS_QUERY);
  return (docs ?? []).map((d) => d.slug).filter((s): s is string => Boolean(s));
}

type SiteFooterLink = { label: string; href: string };

export type SiteFooterData = {
  logo?: { assetUrl?: string; fallbackUrl?: string; alt?: string };
  tagline?: string;
  servicesColumn?: { heading?: string; links?: SiteFooterLink[] };
  quickLinksColumn?: { heading?: string; links?: SiteFooterLink[] };
  contactColumn?: {
    heading?: string;
    phone?: string;
    phoneHref?: string;
    email?: string;
    emailHref?: string;
    address?: string;
    addressHref?: string;
  };
  socialColumn?: { heading?: string; links?: SiteFooterLink[] };
  copyrightText?: string;
  bottomGraphicUrl?: string;
};

let _siteFooterCache: SiteFooterData | null | undefined;

export async function getSiteFooter(): Promise<SiteFooterData | null> {
  if (_siteFooterCache !== undefined) return _siteFooterCache;
  const result = await fetchSanity<SiteFooterData>(SITE_FOOTER_QUERY);
  _siteFooterCache = result ?? null;
  return _siteFooterCache;
}

export type SiteHeaderData = {
  logo?: { assetUrl?: string; fallbackUrl?: string; alt?: string };
  ctaLabel?: string;
  ctaUrl?: string;
};

let _siteHeaderCache: SiteHeaderData | null | undefined;

export async function getSiteHeader(): Promise<SiteHeaderData | null> {
  if (_siteHeaderCache !== undefined) return _siteHeaderCache;
  const result = await fetchSanity<SiteHeaderData>(SITE_HEADER_QUERY);
  _siteHeaderCache = result ?? null;
  return _siteHeaderCache;
}
