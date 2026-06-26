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
    faq[]{
      _key,
      id,
      question,
      answer
    },
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
    faqs[]{
      _key,
      question,
      answer
    },
    seo
  }
`);

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "homePage"][0] {
    seo,
    hero,
    featuredIntro,
    trustedBy {
      eyebrow,
      lines,
      logos[] {
        "src": coalesce(image.asset->url, fallbackUrl),
        alt
      }
    },
    serviceBanner {
      title,
      options[] {
        id,
        icon,
        title,
        description,
        href
      }
    },
    workGallerySection {
      eyebrow,
      lines,
      cta {
        label,
        href
      }
    },
    faq[]{
      "id": _key,
      question,
      answer
    }
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "aboutPage"][0] {
    seo,
    introSection,
    foundersSection{
      eyebrow,
      title,
      founders[]{
        name,
        "portraitUrl": portraitImage.asset->url,
        portraitAlt,
        bio,
        imageSide
      }
    },
    gallerySection[]{
      "src": galleryImage.asset->url,
      alt,
      caption
    }
  }
`);

export const CONTACT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "contactPage"][0] {
    seo,
    contactDetails
  }
`);

export const SERVICES_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "servicesPage"][0] {
    heading,
    intro,
    faqSection {
      eyebrow,
      line,
      items[] {
        id,
        question,
        answer
      }
    },
    seo
  }
`);

const legalSectionsProjection = /* groq */ `
  sections[]{
    _key,
    id,
    number,
    title,
    blocks[]{
      _key,
      _type,
      text,
      items,
      rows[]{
        _key,
        category,
        provider
      }
    }
  }
`;

export const TERMS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "termsPage"][0] {
    seo,
    effectiveDate,
    lastUpdated,
    companyName,
    ${legalSectionsProjection}
  }
`);

export const PRIVACY_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "privacyPage"][0] {
    seo,
    effectiveDate,
    lastUpdated,
    companyName,
    ${legalSectionsProjection}
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0] {
    siteTitle,
    siteUrl,
    "defaultOgImageUrl": defaultOgImage.asset->url,
    analyticsGroup {
      gtmId,
      gaId,
      gscCode
    },
    organizationSchema {
      type,
      name,
      url,
      "logoUrl": logo.asset->url,
      telephone,
      email,
      address {
        streetAddress,
        city,
        state,
        postalCode,
        country
      },
      geo {
        latitude,
        longitude
      },
      openingHours,
      priceRange,
      sameAs,
      areaServed
    },
    personSchema {
      name,
      jobTitle,
      "imageUrl": image.asset->url,
      url,
      sameAs
    },
    robotsDisallow,
    customHeaderScripts,
    customFooterScripts,
    llmsTxtContent
  }
`);

export const BLOG_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "blogPost" && defined(slug.current)] { "slug": slug.current }
`);

export const PORTFOLIO_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "portfolioProject" && defined(slug.current)] { "slug": slug.current }
`);

export const SITE_FOOTER_QUERY = defineQuery(/* groq */ `
  *[_type == "siteFooter"][0] {
    logo ${cmsImageProjection},
    tagline,
    servicesColumn {
      heading,
      links[]{ label, href }
    },
    quickLinksColumn {
      heading,
      links[]{ label, href }
    },
    contactColumn {
      heading,
      phone,
      phoneHref,
      email,
      emailHref,
      address,
      addressHref
    },
    socialColumn {
      heading,
      links[]{ label, href }
    },
    copyrightText,
    bottomGraphicUrl
  }
`);

export const SITE_HEADER_QUERY = defineQuery(/* groq */ `
  *[_type == "siteHeader"][0] {
    logo ${cmsImageProjection},
    ctaLabel,
    ctaUrl
  }
`);
