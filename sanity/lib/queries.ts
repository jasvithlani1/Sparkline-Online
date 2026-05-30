import { defineQuery } from "next-sanity";

export const cmsImageProjection = /* groq */ `{
  image,
  fallbackUrl,
  alt,
  className,
  "assetUrl": image.asset->url
}`;

export const SERVICE_LIST_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && defined(slug.current)] | order(order asc, title asc) {
    _id,
    title,
    slug,
    order,
    cardTitle,
    cardItems
  }
`);

export const SERVICE_DETAIL_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    order,
    cardTitle,
    cardItems,
    eyebrow,
    detailTitle,
    lead,
    intro,
    bannerTop ${cmsImageProjection},
    bannerBottom ${cmsImageProjection},
    whyUs,
    problems,
    cornerstones,
    specialtiesHeading,
    specialties,
    process,
    faq,
    cta,
    seo
  }
`);

export const SERVICE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && defined(slug.current)] | order(order asc, title asc) {
    "slug": slug.current
  }
`);

export const PORTFOLIO_PROJECTS_QUERY = defineQuery(/* groq */ `
  *[_type == "portfolioProject" && defined(slug.current)] | order(order asc, date desc, name asc) {
    _id,
    name,
    slug,
    order,
    date,
    meta,
    description,
    ctaLabel,
    cover ${cmsImageProjection},
    intro,
    tagline,
    summary,
    services,
    sections[]{
      _key,
      heading,
      type,
      images[] ${cmsImageProjection}
    },
    seo
  }
`);

export const PORTFOLIO_PROJECT_QUERY = defineQuery(/* groq */ `
  *[_type == "portfolioProject" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    order,
    date,
    meta,
    description,
    ctaLabel,
    cover ${cmsImageProjection},
    intro,
    tagline,
    summary,
    services,
    sections[]{
      _key,
      heading,
      type,
      images[] ${cmsImageProjection}
    },
    seo
  }
`);

export const BLOG_POSTS_QUERY = defineQuery(/* groq */ `
  *[_type == "blogPost" && defined(slug.current)] | order(order asc, publishedAt desc, title asc) {
    _id,
    title,
    slug,
    order,
    publishedAt,
    displayDate,
    category,
    description,
    cover ${cmsImageProjection},
    body,
    "bodyText": pt::text(body),
    videoId,
    seo
  }
`);

export const BLOG_POST_QUERY = defineQuery(/* groq */ `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    order,
    publishedAt,
    displayDate,
    category,
    description,
    cover ${cmsImageProjection},
    body,
    "bodyText": pt::text(body),
    videoId,
    seo
  }
`);
