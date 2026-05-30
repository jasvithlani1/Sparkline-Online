import type { PortableTextBlock } from "next-sanity";
import {
  blogPosts,
  ourServices,
  serviceDetails,
  workGallery,
  type ServiceDetailSlug,
} from "@/lib/content";
import { client } from "./client";
import {
  BLOG_POST_QUERY,
  BLOG_POSTS_QUERY,
  PORTFOLIO_PROJECT_QUERY,
  PORTFOLIO_PROJECTS_QUERY,
  SERVICE_DETAIL_QUERY,
  SERVICE_LIST_QUERY,
  SERVICE_SLUGS_QUERY,
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
  faq?: { id?: string; question?: string; answer?: string }[];
  cta?: { heading?: string; body?: string; label?: string };
  seo?: SeoDocument;
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
  seo?: SeoDocument;
};

type SeoDocument = {
  title?: string;
  description?: string;
  image?: unknown;
  noIndex?: boolean;
};

type ServiceCard = (typeof ourServices.cards)[number];
type ServiceDetail = (typeof serviceDetails)[ServiceDetailSlug];
type PortfolioProject = (typeof workGallery.projects)[number];
type BlogPost = (typeof blogPosts)[number] & { bodyBlocks?: PortableTextBlock[] };

type ServiceEntry = {
  card: ServiceCard;
  detail: ServiceDetail;
};

function slugString(slug: SlugValue, fallback = "") {
  if (typeof slug === "string") return slug;
  return slug?.current ?? fallback;
}

function maybeArray<T>(value: T[] | undefined, fallback: readonly T[] = []) {
  return value && value.length > 0 ? value : [...fallback];
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
  const fallback = serviceDetails[slug];
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
    faq: (doc.faq ?? fallback?.faq ?? []).map((item) => ({
      id: item.id ?? item.question ?? "faq",
      question: item.question ?? "",
      answer: item.answer ?? "",
    })),
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
  };
}

export function toPortfolioProject(doc: PortfolioProjectDocument): PortfolioProject {
  const slug = slugString(doc.slug, doc._id?.replace(/^portfolioProject\./, ""));
  const cover = resolveCmsImage(doc.cover, doc.name ?? slug);

  return {
    id: doc._id ?? `portfolioProject.${slug}`,
    slug,
    name: doc.name ?? slug,
    date: doc.date ?? "",
    meta: doc.meta ?? "",
    description: doc.description ?? "",
    ctaLabel: doc.ctaLabel ?? "View Project",
    image: cover.src,
    imageClassName: cover.className,
    intro: doc.intro ?? "",
    tagline: doc.tagline ?? doc.name ?? slug,
    summary: doc.summary ?? "",
    services: maybeArray(doc.services),
    sections: (doc.sections ?? []).map((section) => ({
      heading: section.heading ?? "Project Section",
      type: section.type ?? "image",
      images: (section.images ?? []).map((image) => {
        const resolved = resolveCmsImage(image, section.heading);
        return {
          src: resolved.src,
          alt: resolved.alt,
          className: resolved.className,
        };
      }),
    })),
  } as PortfolioProject;
}

export function toBlogPost(doc: BlogPostDocument): BlogPost {
  const slug = slugString(doc.slug, doc._id?.replace(/^blogPost\./, ""));
  const cover = resolveCmsImage(doc.cover, doc.title ?? slug);
  const bodyBlocks = doc.body?.length ? doc.body : textToPortableText(doc.bodyText ?? "", slug);

  return {
    id: doc._id ?? `blogPost.${slug}`,
    slug,
    title: doc.title ?? slug,
    date: doc.displayDate ?? doc.publishedAt ?? "",
    category: doc.category ?? "Marketing",
    description: doc.description ?? "",
    image: cover.src,
    imageClassName: cover.className,
    body: doc.bodyText || textFromBlocks(bodyBlocks),
    bodyBlocks,
    videoId: doc.videoId ?? "",
  } as BlogPost;
}

async function fetchSanity<T>(query: string, params?: Record<string, string>) {
  if (isTest) return null;

  try {
    return await client.fetch<T>(query, params ?? {});
  } catch (error) {
    console.warn("Sanity fetch failed; rendering static fallback content.", error);
    return null;
  }
}

function fallbackServiceEntries(): ServiceEntry[] {
  return ourServices.cards
    .map((card) => {
      const detail = serviceDetails[card.id as ServiceDetailSlug];
      if (!detail) return null;
      return { card, detail };
    })
    .filter((entry): entry is ServiceEntry => Boolean(entry));
}

export async function getServicesContent() {
  const docs = await fetchSanity<ServiceDocument[]>(SERVICE_LIST_QUERY);
  if (!docs?.length) return ourServices;

  return {
    ...ourServices,
    cards: docs.map(toServiceCard),
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
  if (!docs?.length) return [...workGallery.projects];

  return docs.map(toPortfolioProject);
}

export async function getPortfolioProjectBySlug(slug: string) {
  const doc = await fetchSanity<PortfolioProjectDocument>(PORTFOLIO_PROJECT_QUERY, { slug });
  if (doc) return toPortfolioProject(doc);

  return workGallery.projects.find((project) => project.slug === slug) ?? null;
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
  } as BlogPost;
}
