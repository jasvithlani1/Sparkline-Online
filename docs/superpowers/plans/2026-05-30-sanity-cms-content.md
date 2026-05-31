# Sanity CMS Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete Sanity CMS for services, portfolio projects, and blogs, seed it from existing site content, and make the Next.js app render Sanity content with local fallbacks.

**Architecture:** Add a typed Sanity content layer beside the existing static content, normalize Sanity documents into the current frontend shapes, and pass CMS data into existing page components. Add embedded Studio schema files locally and deploy/seed Sanity project `8g3u06mk` dataset `production` with deterministic document ids.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Vitest, Testing Library, Sanity Studio, next-sanity, GROQ, Portable Text

---

### Task 1: Add Sanity dependencies and configuration

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `sanity.cli.ts`
- Create: `sanity.config.ts`
- Create: `app/studio/[[...tool]]/page.tsx`

- [ ] **Step 1: Install packages**

Run: `npm install sanity next-sanity @sanity/icons @sanity/image-url`
Expected: dependencies are added to `package.json` and `package-lock.json`.

- [ ] **Step 2: Add Studio configuration**

Create `sanity.cli.ts` with project id `8g3u06mk`, dataset `production`, and schema extraction pointing at `sanity.config.ts`.

Create `sanity.config.ts` using `defineConfig`, `structureTool`, and the exported schema types.

Create `app/studio/[[...tool]]/page.tsx` rendering `<NextStudio config={config} />`.

- [ ] **Step 3: Run focused verification**

Run: `npm run lint`
Expected: PASS or only pre-existing warnings.

### Task 2: Add CMS schemas

**Files:**
- Create: `sanity/schemaTypes/index.ts`
- Create: `sanity/schemaTypes/objects/cms-image.ts`
- Create: `sanity/schemaTypes/objects/faq-item.ts`
- Create: `sanity/schemaTypes/objects/seo.ts`
- Create: `sanity/schemaTypes/objects/project-section.ts`
- Create: `sanity/schemaTypes/documents/service.ts`
- Create: `sanity/schemaTypes/documents/portfolio-project.ts`
- Create: `sanity/schemaTypes/documents/blog-post.ts`

- [ ] **Step 1: Write schema tests first**

Create a schema test that imports `schemaTypes` and asserts the document names include `service`, `portfolioProject`, and `blogPost`.

Run: `npm test -- tests/sanity/schema.test.ts`
Expected: FAIL because schema files do not exist.

- [ ] **Step 2: Implement schemas**

Use `defineType`, `defineField`, and `defineArrayMember`. Add icons from `@sanity/icons`. Add validation for required slugs, titles, dates, and minimum arrays where needed.

- [ ] **Step 3: Verify schema tests**

Run: `npm test -- tests/sanity/schema.test.ts`
Expected: PASS.

### Task 3: Add Sanity fetch and mapping layer

**Files:**
- Create: `sanity/lib/client.ts`
- Create: `sanity/lib/queries.ts`
- Create: `sanity/lib/image.ts`
- Create: `sanity/lib/content.ts`
- Create: `tests/sanity/content.test.ts`

- [ ] **Step 1: Write mapper/fallback tests first**

Tests cover these behaviors:

```ts
expect(toServiceCard(serviceDoc).id).toBe("digital-marketing");
expect(toBlogPost(blogDoc).bodyBlocks).toHaveLength(1);
expect(resolveCmsImage({ fallbackUrl: "/images/work.png" }).src).toBe("/images/work.png");
```

Run: `npm test -- tests/sanity/content.test.ts`
Expected: FAIL because the mapper module does not exist.

- [ ] **Step 2: Implement queries and mappers**

Define GROQ queries for service list/detail, portfolio list/detail, blog list/detail, and static params. Project only fields used by the UI. Normalize documents into `Service`, `PortfolioProject`, and `BlogPost` shapes that match the current components.

- [ ] **Step 3: Implement fallback fetch helpers**

Each public helper catches errors and falls back to `lib/content.ts` data. Add helpers:

```ts
getServicesContent()
getServiceBySlug(slug)
getPortfolioProjects()
getPortfolioProjectBySlug(slug)
getBlogPosts()
getBlogPostBySlug(slug)
```

- [ ] **Step 4: Verify mapper tests**

Run: `npm test -- tests/sanity/content.test.ts`
Expected: PASS.

### Task 4: Wire CMS data into services pages

**Files:**
- Modify: `components/landing/our-services.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/services/[slug]/page.tsx`
- Modify: `tests/app/services.test.tsx`

- [ ] **Step 1: Write service rendering tests first**

Add tests that pass a custom service card into `OurServices` and assert it renders the custom CMS title and link.

Run: `npm test -- tests/app/services.test.tsx`
Expected: FAIL because `OurServices` does not accept props.

- [ ] **Step 2: Pass services as props**

Update `OurServices` to accept optional `content`, defaulting to the current static `ourServices` value. Make `ServicesPage` async and pass `await getServicesContent()`.

- [ ] **Step 3: Update service detail page**

Use `getServiceSlugs()` for static params, `getServiceBySlug()` for metadata/rendering, and keep `notFound()` only when both Sanity and fallback miss.

- [ ] **Step 4: Verify service tests**

Run: `npm test -- tests/app/services.test.tsx`
Expected: PASS.

### Task 5: Wire CMS data into portfolio pages

**Files:**
- Modify: `components/portfolio/project-list.tsx`
- Modify: `app/portfolio/page.tsx`
- Modify: `app/portfolio/[slug]/page.tsx`
- Modify: `tests/app/portfolio.test.tsx`

- [ ] **Step 1: Write portfolio rendering tests first**

Add a test that passes custom project data into `ProjectList` and asserts the custom project name, description, and link render.

Run: `npm test -- tests/app/portfolio.test.tsx`
Expected: FAIL because `ProjectList` does not accept props.

- [ ] **Step 2: Pass project data as props**

Update `ProjectList` to accept `projects`, defaulting to `workGallery.projects`. Make `PortfolioPage` async and pass `await getPortfolioProjects()`.

- [ ] **Step 3: Update project detail page**

Fetch the ordered project list from Sanity/fallback, find the current slug, compute the next project from that list, and preserve the existing layout.

- [ ] **Step 4: Verify portfolio tests**

Run: `npm test -- tests/app/portfolio.test.tsx`
Expected: PASS.

### Task 6: Wire CMS data into blog pages

**Files:**
- Modify: `components/blogs/blog-list.tsx`
- Modify: `app/blogs/page.tsx`
- Modify: `app/blogs/[slug]/page.tsx`
- Modify: `tests/app/blogs.test.tsx`

- [ ] **Step 1: Write blog rendering tests first**

Add a test that passes custom posts into `BlogList`, filters by category, and asserts only matching CMS posts remain visible.

Run: `npm test -- tests/app/blogs.test.tsx`
Expected: FAIL because `BlogList` does not accept posts.

- [ ] **Step 2: Pass blog data as props**

Update `BlogList` to accept `posts`, defaulting to `blogPosts`. Make `BlogsPage` async and pass `await getBlogPosts()`.

- [ ] **Step 3: Render Portable Text bodies**

Update the blog detail page to render Portable Text blocks when present and fall back to the plain static body string.

- [ ] **Step 4: Verify blog tests**

Run: `npm test -- tests/app/blogs.test.tsx`
Expected: PASS.

### Task 7: Deploy schema and seed Sanity

**Files:**
- Create: `scripts/seed-sanity-content.mjs`
- Modify: `package.json`

- [ ] **Step 1: Add seed script**

Create a script that reads from `lib/content.ts` through a generated JSON seed module or inline exported data and creates deterministic document ids for all services, portfolio projects, and blog posts.

- [ ] **Step 2: Deploy schema**

Deploy the schema to project `8g3u06mk`, dataset `production`.

- [ ] **Step 3: Seed and publish documents**

Create and publish documents for services, projects, and posts. Verify counts with GROQ:

```groq
count(*[_type == "service"])
count(*[_type == "portfolioProject"])
count(*[_type == "blogPost"])
```

Expected counts: `6`, `4`, and `4`.

### Task 8: Full verification and launch

**Files:**
- All changed files

- [ ] **Step 1: Run all tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS.

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Launch dev server**

Run: `npm run dev -- --hostname 0.0.0.0`
Expected: Next.js reports a local URL and renders pages from the updated code.
