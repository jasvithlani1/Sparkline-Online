# Sanity CMS Content Design

## Summary

Build an editable Sanity CMS for Sparkline services, portfolio projects, and blog posts, then wire the Next.js site to read those collections from Sanity while preserving the existing visual design and static content as a resilient fallback.

## Approved Direction

- Use Sanity project `8g3u06mk` (`sparkline`) and dataset `production`.
- Seed the CMS from the current `lib/content.ts` services, portfolio, and blog data.
- Keep static fallbacks so tests, local development, and production pages still render if Sanity credentials or content are temporarily unavailable.
- Add an embedded Studio at `/studio` so the content team can edit these collections inside the Next app.

## Goals

- Editors can manage services, service detail pages, portfolio projects, project detail sections, blog posts, SEO fields, dates, ordering, and publish state in Sanity.
- Public pages use Sanity content first and fall back to the current local data when Sanity has no matching content or fetches fail.
- Existing routes remain stable: `/services`, `/services/[slug]`, `/portfolio`, `/portfolio/[slug]`, `/blogs`, and `/blogs/[slug]`.
- Existing static images continue to render after seeding; CMS image fields also allow uploaded Sanity assets for future edits.
- Tests cover the transformation and fallback behavior without requiring live Sanity access.

## Non-Goals

- Do not redesign the pages.
- Do not migrate every global site setting, FAQ section, navbar link, or footer field into Sanity in this pass.
- Do not require private read tokens for published content. The dataset is public; optional token support is allowed for draft/preview workflows later.
- Do not delete `lib/content.ts`; it remains the fallback and seed source.

## Content Model

### Service

A `service` document represents both the service listing card and the detail page.

Fields include title, slug, order, summary items, eyebrow, lead, intro, two banner media objects, why-us copy, problem list, cornerstone list, specialties, process copy, FAQ items, CTA copy, and SEO metadata.

### Portfolio Project

A `portfolioProject` document represents one project card and its detail page.

Fields include project name, slug, order, date, metadata label, description, CTA label, cover media, intro, tagline, summary, services list, content sections, and SEO metadata. Content sections support either one large image or a grid of images.

### Blog Post

A `blogPost` document represents one blog card and detail page.

Fields include title, slug, order, published date, category, excerpt, cover media, body as Portable Text, YouTube video ID, and SEO metadata.

### Shared Objects

- `cmsImage`: optional Sanity image asset plus fallback public URL, alt text, and CSS class name.
- `faqItem`: stable id, question, and answer.
- `seo`: optional title, description, social image, and no-index flag.

## Frontend Architecture

Add `sanity/lib/client.ts`, `sanity/lib/queries.ts`, `sanity/lib/fetch.ts`, and `sanity/lib/image.ts`. Query functions return normalized frontend shapes compatible with the current components. The query layer catches Sanity failures and returns fallback data from `lib/content.ts`.

Server pages become async and fetch collection/detail data before rendering. List components accept data as props instead of importing `lib/content.ts` directly. Detail pages use Sanity documents by slug, with static data as the fallback.

Blog body rendering uses `PortableText` when Sanity returns block content. Seeded fallback bodies are converted from the current plain strings into single-paragraph Portable Text blocks.

## Studio Architecture

Add embedded Sanity Studio configuration:

- `sanity.config.ts`
- `sanity.cli.ts`
- `app/studio/[[...tool]]/page.tsx`
- `sanity/schemaTypes/**`

The local schema mirrors the deployed schema and is the source of truth after this feature. The initial remote schema can be deployed through the Sanity MCP because no local Studio existed at the start of this work.

## Seeding

Seed `production` with deterministic document ids:

- `service.<slug>`
- `portfolioProject.<slug>`
- `blogPost.<slug>`

The seed data comes from current static content. Seeded media uses `fallbackUrl` paths for current public assets and leaves Sanity image assets empty, so pages render immediately. Editors can later upload Sanity image assets without changing routes or components.

## Error Handling

- Missing service/project/post by slug returns `notFound()` only after checking Sanity and fallback content.
- Sanity fetch failures log a concise server-side warning and render fallback content.
- Missing optional images render the existing placeholder treatments where the page already has them.

## Testing

- Unit tests verify Sanity mappers normalize documents and fall back to static content.
- Page/component tests verify services, portfolio, and blogs render when passed CMS-shaped content.
- Existing spacing/visual regression tests remain in place.
- Full verification runs `npm test`, `npm run lint`, and `npm run build`.
