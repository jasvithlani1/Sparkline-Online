# Dockclaw Marketing Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive single-page Next.js + Tailwind landing page that reproduces the approved Paper frame’s copy, section order, and visual tone.

**Architecture:** Start from a fresh Next.js App Router scaffold, store Paper-derived copy and section metadata in a dedicated content module, and render the page through focused section components under `components/landing`. Use Tailwind utilities plus a small set of CSS variables and custom rules in `app/globals.css` for gradients, glassmorphism, and atmospheric background effects.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, ESLint, static assets in `public/`

---

## File Structure

### Files to create

- `package.json` — project manifest created by Next.js scaffold
- `next.config.ts` — Next.js config
- `tsconfig.json` — TypeScript config
- `postcss.config.mjs` — PostCSS config
- `eslint.config.mjs` — ESLint config
- `app/layout.tsx` — root layout and font wiring
- `app/page.tsx` — landing page composition
- `app/globals.css` — global styles, CSS variables, and effect classes
- `components/landing/navbar.tsx` — floating header
- `components/landing/hero.tsx` — hero section with atmospheric overlays
- `components/landing/feature-intro.tsx` — Haven Demo split section
- `components/landing/service-banner.tsx` — blue banner with overlapping submarine
- `components/landing/logo-grid.tsx` — trusted-by copy and logo wall
- `components/landing/work-gallery.tsx` — featured project cards
- `components/landing/footer.tsx` — footer columns and bottom bar
- `components/landing/section-heading.tsx` — reusable centered heading block
- `lib/content.ts` — all page copy, nav links, logos, and project metadata
- `public/images/hero-submarine.png` — exported from Paper
- `public/images/hero-reef.png` — exported from Paper or recreated fallback
- `public/images/service-water.jpg` — exported from Paper
- `public/images/service-submarine.png` — exported from Paper
- `public/images/work-firecrawl.png` — exported from Paper
- `public/images/work-blackign.png` — exported from Paper

### Files to modify after scaffold

- `app/page.tsx` — replace starter content with landing page
- `app/globals.css` — replace starter styles with page styling tokens/effects
- `app/layout.tsx` — set title/description and font classes

## Task 1: Initialize the Next.js project

**Files:**
- Create: `package.json`
- Create: `app/page.tsx`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`

- [ ] **Step 1: Initialize git so the workspace can track commits**

Run:

```bash
git init
```

Expected: Git reports an empty repository initialized in `/Users/kairen/Desktop/aiautomate/sparkling-website/.git`

- [ ] **Step 2: Scaffold a fresh Next.js app in the current directory**

Run:

```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --use-npm --yes
```

Expected: Next.js creates the App Router scaffold, installs dependencies, and prints a success message.

- [ ] **Step 3: Verify the scaffolded app starts**

Run:

```bash
npm run lint
```

Expected: ESLint completes with no errors on the default scaffold.

- [ ] **Step 4: Confirm the generated root page contains only starter content before replacement**

Run:

```bash
sed -n '1,160p' app/page.tsx
```

Expected: `app/page.tsx` still contains the default `create-next-app` starter markup and does not yet import any landing page components.

- [ ] **Step 5: Commit the clean scaffold**

Run:

```bash
git add .
git commit -m "chore: scaffold nextjs landing page project"
```

Expected: Git records the initial project scaffold commit.

## Task 2: Extract and organize Paper assets and content

**Files:**
- Create: `public/images/hero-submarine.png`
- Create: `public/images/hero-reef.png`
- Create: `public/images/service-water.jpg`
- Create: `public/images/service-submarine.png`
- Create: `public/images/work-firecrawl.png`
- Create: `public/images/work-blackign.png`
- Create: `lib/content.ts`

- [ ] **Step 1: Export the required Paper images into `public/images/`**

Export these assets from the selected Paper frame and save them with these exact names:

```text
public/images/hero-submarine.png
public/images/hero-reef.png
public/images/service-water.jpg
public/images/service-submarine.png
public/images/work-firecrawl.png
public/images/work-blackign.png
```

Expected: Each required image exists locally under `public/images/`.

- [ ] **Step 2: Create a single content module for all page copy and repeated metadata**

Create `lib/content.ts`:

```ts
export const navLinks = [
  "Services",
  "Portfolio",
  "About Us",
  "Contact Us",
  "Blogs",
  "Reviews",
] as const;

export const featuredIntro = {
  title: [
    "Haven Demo:",
    "In-space testbed for",
    "Haven-1 space station",
    "technologies",
  ],
  body:
    "In November 2025, Haven Demo achieved mission success after deploying from the Bandwagon-4 rideshare mission.",
  cta: "Learn more",
};

export const trustedBy = {
  eyebrow: "Trusted by the bold",
  lines: [
    "From breakout startups to industry giants,",
    "we partner with ambitious companies looking to",
    "shape the",
    "future.",
  ],
  logos: [
    "Antimetal",
    "Blackalgo",
    "Clearbit",
    "Clerk",
    "CryptoSea",
    "Dimension",
    "formcarry.",
    "foreplay",
    "Index",
    "Klarna.",
    "Mintlify",
    "Plasmic",
    "PodcastAI",
    "wiza",
    "wope",
    "WorkOS",
  ],
};

export const workGallery = {
  eyebrow: "OUR WORK",
  lines: [
    "A selection of the best projects",
    "crafted by the OUR team.",
  ],
  projects: [
    {
      name: "Firecrawl",
      meta: "Website · Branding",
      image: "/images/work-firecrawl.png",
    },
    {
      name: "Blackign",
      meta: "Website · Branding · Product",
      image: "/images/work-blackign.png",
    },
  ],
};

export const footerContent = {
  brand: ["SPARKLINE", "MARKETING FIRM"],
  company: [
    "Work",
    "Pricing",
    "Studio",
    "Use cases",
    "Insights",
    "Playground",
    "Reach out",
  ],
  socials: ["LinkedIn", "Dribbble"],
  statement:
    "SPARKLING MARKETING FIRM is open for business, talks and coffee Monday-Friday.",
  status: "Currently we're Online",
  locations: [
    ["LOCATION", "Verd Lunda 4,", "8230, Ayhjal"],
    ["LOCATION", "Verd Lunda 4,", "8230, Ayhjal"],
  ],
};
```

Expected: All page copy lives in one module instead of being hard-coded across components.

- [ ] **Step 3: Type-check the new content module**

Run:

```bash
npx tsc --noEmit
```

Expected: TypeScript completes without errors after adding `lib/content.ts`.

- [ ] **Step 4: Verify all image files are present**

Run:

```bash
find public/images -maxdepth 1 -type f | sort
```

Expected: The six expected filenames are listed.

- [ ] **Step 5: Commit the content and asset baseline**

Run:

```bash
git add lib/content.ts public/images
git commit -m "feat: add landing page content and assets"
```

Expected: Git records the content and image assets commit.

## Task 3: Build the shared styling foundation

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Configure the root layout metadata and font imports**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const calSans = localFont({
  src: "../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal-sans",
  weight: "600",
});

export const metadata: Metadata = {
  title: "Dockclaw",
  description: "Creative marketing supercharged.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${calSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

Expected: The app is ready to use Geist for body copy and a local `Cal Sans` font file for the hero.

- [ ] **Step 2: Add the required local headline font**

Add this file to the scaffolded project:

```text
public/fonts/CalSans-SemiBold.woff2
```

Expected: `next/font/local` can resolve the file during build.

- [ ] **Step 3: Replace the starter global stylesheet with page tokens and effect classes**

Replace `app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --page-cream: #fdfcf4;
  --hero-ink: #060b1a;
  --footer-navy: #273854;
  --copy-dark: #2a2c2f;
  --copy-soft: rgba(5, 5, 5, 0.8);
  --glass-border: rgba(255, 255, 255, 0.16);
  --glass-fill: rgba(255, 255, 255, 0.04);
  --cta-purple: #a855f7;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--page-cream);
  color: var(--copy-dark);
  font-family: var(--font-geist), system-ui, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

.hero-copy {
  font-family: var(--font-cal-sans), system-ui, sans-serif;
  background: linear-gradient(180deg, #ffffff 0%, #c4cad6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.glass-shell {
  background: var(--glass-fill);
  border: 1px solid var(--glass-border);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(18px);
}

.hero-rays::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 0%, rgba(255, 255, 255, 0.08), transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 28%);
  opacity: 0.45;
  pointer-events: none;
}

.hero-fade::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 240px;
  background: linear-gradient(180deg, rgba(6, 11, 26, 0), rgba(6, 11, 26, 0.96));
  pointer-events: none;
}
```

Expected: Global page colors and reusable hero/navbar effect classes exist before component work starts.

- [ ] **Step 4: Verify the app still type-checks and lints**

Run:

```bash
npm run lint
```

Expected: ESLint passes after the layout and global CSS replacement.

- [ ] **Step 5: Commit the styling foundation**

Run:

```bash
git add app/layout.tsx app/globals.css public/fonts/CalSans-SemiBold.woff2
git commit -m "feat: add landing page visual foundation"
```

Expected: Git records the styling setup commit.

## Task 4: Implement the landing page components

**Files:**
- Create: `components/landing/navbar.tsx`
- Create: `components/landing/hero.tsx`
- Create: `components/landing/feature-intro.tsx`
- Create: `components/landing/service-banner.tsx`
- Create: `components/landing/logo-grid.tsx`
- Create: `components/landing/work-gallery.tsx`
- Create: `components/landing/footer.tsx`
- Create: `components/landing/section-heading.tsx`

- [ ] **Step 1: Create the reusable centered heading block**

Create `components/landing/section-heading.tsx`:

```tsx
type SectionHeadingProps = {
  eyebrow: string;
  lines: string[];
};

export function SectionHeading({ eyebrow, lines }: SectionHeadingProps) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
      <p className="text-sm uppercase tracking-[0.24em] text-black/40">{eyebrow}</p>
      <div className="space-y-1 text-2xl leading-tight text-black/80 md:text-[32px] md:leading-[1.25]">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
```

Expected: Shared centered section headers do not duplicate markup.

- [ ] **Step 2: Create the navbar and hero components**

Create `components/landing/navbar.tsx`:

```tsx
import Link from "next/link";
import { navLinks } from "@/lib/content";

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-6 z-30 px-4 md:top-[53px]">
      <div className="glass-shell mx-auto flex max-w-[1010px] items-center justify-between rounded-2xl px-5 py-4 text-white">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Dockclaw
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/75 lg:flex">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}>
              {link}
            </a>
          ))}
        </nav>
        <a
          href="#contact-us"
          className="rounded-xl bg-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.45)]"
        >
          Book a Call
        </a>
      </div>
    </header>
  );
}
```

Create `components/landing/hero.tsx`:

```tsx
import Image from "next/image";

export function Hero() {
  return (
    <section className="hero-rays hero-fade relative overflow-hidden bg-[#060B1A] pb-20 pt-40 text-white md:min-h-[1024px] md:pb-0 md:pt-52">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(39,60,106,0.35),transparent_45%)]" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-52 bg-[url('/images/hero-reef.png')] bg-cover bg-center opacity-40 md:h-[260px]" />
      <div className="relative z-20 mx-auto flex max-w-[1440px] flex-col items-center px-4 text-center">
        <h1 className="hero-copy max-w-[802px] text-5xl leading-none tracking-[-0.03em] sm:text-6xl md:text-[80px]">
          <span className="block">Creative Marketing</span>
          <span className="block">Supercharged</span>
        </h1>
      </div>
      <div className="relative z-20 mx-auto mt-10 max-w-[1440px] px-4 md:mt-[-10px]">
        <div className="relative ml-auto h-[260px] w-full max-w-[1148px] sm:h-[420px] md:h-[702px]">
          <Image
            src="/images/hero-submarine.png"
            alt=""
            fill
            priority
            className="object-contain object-center md:object-right"
          />
        </div>
      </div>
    </section>
  );
}
```

Expected: The top of the page matches the floating-glass header plus cinematic hero structure from Paper.

- [ ] **Step 3: Create the middle content sections**

Create `components/landing/feature-intro.tsx`:

```tsx
import { featuredIntro } from "@/lib/content";

export function FeatureIntro() {
  return (
    <section className="bg-[#FDFCF4] px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1390px] gap-10 md:grid-cols-[550px_415px] md:justify-between">
        <div className="space-y-1 text-4xl font-medium leading-none tracking-[0.01em] text-[#2A2C2F] md:text-[48px]">
          {featuredIntro.title.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="space-y-8 text-[#2A2C2F]">
          <p className="max-w-[415px] text-base leading-7 md:text-lg">
            {featuredIntro.body}
          </p>
          <a href="#learn-more" className="inline-flex items-center gap-2 text-sm">
            <span aria-hidden="true">›</span>
            {featuredIntro.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
```

Create `components/landing/service-banner.tsx`:

```tsx
import Image from "next/image";

export function ServiceBanner() {
  return (
    <section id="services" className="bg-[#FDFCF4] px-6 py-8 md:px-8 md:py-12">
      <div className="relative mx-auto max-w-[1310px] overflow-visible">
        <div className="relative min-h-[320px] overflow-hidden md:min-h-[596px]">
          <Image
            src="/images/service-water.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <h2 className="absolute left-8 top-8 text-3xl font-medium tracking-[0.01em] text-white md:left-[103px] md:top-[88px] md:text-[48px]">
            HOW CAN WE SERVE YOU?
          </h2>
        </div>
        <div className="pointer-events-none relative mx-auto -mt-10 h-[180px] w-full max-w-[928px] sm:h-[240px] md:-mt-28 md:ml-auto md:h-[524px]">
          <Image
            src="/images/service-submarine.png"
            alt=""
            fill
            className="object-contain object-center md:object-right"
          />
        </div>
      </div>
    </section>
  );
}
```

Create `components/landing/logo-grid.tsx`:

```tsx
import { trustedBy } from "@/lib/content";
import { SectionHeading } from "./section-heading";

export function LogoGrid() {
  return (
    <section className="bg-[#FDFCF4] px-6 py-16 md:py-24">
      <div className="mx-auto flex max-w-[1208px] flex-col items-center gap-16">
        <SectionHeading eyebrow={trustedBy.eyebrow} lines={trustedBy.lines} />
        <div className="grid w-full grid-cols-2 gap-x-8 gap-y-10 text-center text-lg font-medium text-black/80 sm:grid-cols-3 lg:grid-cols-4">
          {trustedBy.logos.map((logo) => (
            <div key={logo} className="flex min-h-[72px] items-center justify-center">
              <span>{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Expected: The editorial intro, service banner, and trusted-by section exist as independent components with approved copy.

- [ ] **Step 4: Create the work gallery and footer components**

Create `components/landing/work-gallery.tsx`:

```tsx
import Image from "next/image";
import { workGallery } from "@/lib/content";
import { SectionHeading } from "./section-heading";

export function WorkGallery() {
  return (
    <section id="portfolio" className="bg-[#FDFCF4] px-6 py-16 md:py-24">
      <div className="mx-auto flex max-w-[1208px] flex-col gap-14">
        <SectionHeading eyebrow={workGallery.eyebrow} lines={workGallery.lines} />
        <div className="grid gap-8 lg:grid-cols-2">
          {workGallery.projects.map((project) => (
            <article key={project.name} className="space-y-5">
              <div className="relative aspect-[596/600] overflow-hidden rounded-[20px] bg-black/5">
                <Image src={project.image} alt={project.name} fill className="object-cover" />
              </div>
              <div className="space-y-1 text-sm text-black/60">
                <h3 className="text-base text-black/80">{project.name}</h3>
                <p>{project.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Create `components/landing/footer.tsx`:

```tsx
import { footerContent } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-[#273854] px-6 py-12 text-[#FCF4EA] md:px-8 md:py-16">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_220px_220px]">
          <div className="space-y-1 text-4xl font-medium leading-none tracking-[-0.03em]">
            {footerContent.brand.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/50">Company</p>
            <div className="space-y-3 text-2xl font-semibold">
              {footerContent.company.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/50">Socials</p>
            <div className="space-y-3 text-2xl font-semibold">
              {footerContent.socials.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1fr] lg:items-end">
          <div className="max-w-[346px] space-y-5">
            <p className="text-2xl font-black leading-[1.4] tracking-[-0.02em]">
              {footerContent.statement}
            </p>
            <p className="text-xs uppercase tracking-[0.22em] text-white/60">
              {footerContent.status}
            </p>
          </div>
          <div className="text-sm text-white/50">Agency</div>
          <div className="grid gap-8 sm:grid-cols-2">
            {footerContent.locations.map((location) => (
              <div key={location.join("-")} className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/50">
                  {location[0]}
                </p>
                <div className="space-y-1 text-sm">
                  <p>{location[1]}</p>
                  <p>{location[2]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

Expected: All remaining page sections are implemented in focused files with no giant monolithic component.

- [ ] **Step 5: Commit the section components**

Run:

```bash
git add components/landing
git commit -m "feat: add landing page section components"
```

Expected: Git records the reusable section components commit.

## Task 5: Compose the page and fine-tune responsive behavior

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the default page with the full landing composition**

Replace `app/page.tsx` with:

```tsx
import { FeatureIntro } from "@/components/landing/feature-intro";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { LogoGrid } from "@/components/landing/logo-grid";
import { Navbar } from "@/components/landing/navbar";
import { ServiceBanner } from "@/components/landing/service-banner";
import { WorkGallery } from "@/components/landing/work-gallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFCF4]">
      <div className="relative">
        <Navbar />
        <Hero />
      </div>
      <FeatureIntro />
      <ServiceBanner />
      <LogoGrid />
      <WorkGallery />
      <Footer />
    </main>
  );
}
```

Expected: The page renders the site in the same top-to-bottom order as the Paper frame.

- [ ] **Step 2: Run the dev server and compare against the Paper frame**

Run:

```bash
npm run dev
```

Expected: The app starts locally and the page is viewable for visual comparison.

- [ ] **Step 3: Verify the required responsive class rules are present after visual comparison**

Confirm these exact responsive rules exist in the component files after the visual pass:

```tsx
<div className="relative ml-auto h-[260px] w-full max-w-[1148px] sm:h-[420px] md:h-[702px]">
```

```tsx
<div className="grid gap-10 md:grid-cols-[550px_415px] md:justify-between">
```

```tsx
<div className="grid w-full grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
```

Expected: Desktop and mobile layouts both preserve the Paper design’s mood without overflow or broken composition, and the checked class rules exist in code.

- [ ] **Step 4: Verify lint and production build**

Run:

```bash
npm run lint
npm run build
```

Expected: Both commands succeed.

- [ ] **Step 5: Commit the completed landing page**

Run:

```bash
git add app/page.tsx
git add components/landing app/globals.css app/layout.tsx lib/content.ts public/images public/fonts
git commit -m "feat: build dockclaw marketing landing page"
```

Expected: Git records the completed implementation commit.

## Task 6: Final verification and delivery notes

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Document how to run the project locally**

Create or update `README.md`:

````md
# Dockclaw Landing Page

## Run locally

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run lint
npm run build
```
````

Expected: The workspace has minimal run instructions for future use.

- [ ] **Step 2: Re-run the full verification commands**

Run:

```bash
npm run lint
npm run build
```

Expected: Both commands pass after the README addition.

- [ ] **Step 3: Capture the final implementation state**

Run:

```bash
git status --short
```

Expected: No unexpected uncommitted changes remain.

- [ ] **Step 4: Record any fidelity gaps that remain after implementation**

Document in the final handoff:

```text
- exact Paper image exports used
- any logos approximated with text fallback
- any effect differences intentionally left in CSS rather than reproduced pixel-for-pixel
```

Expected: The final handoff clearly states what is exact versus approximate.

- [ ] **Step 5: Commit the README and handoff-ready state**

Run:

```bash
git add README.md
git commit -m "docs: add landing page run instructions"
```

Expected: Git records the final documentation commit.

## Self-Review

### Spec coverage

- Header/navbar: covered in Task 4 navbar implementation and Task 5 composition.
- Hero section and visual effects: covered in Task 3 styling foundation and Task 4 hero implementation.
- Featured intro: covered in Task 2 content and Task 4 feature intro implementation.
- Service banner: covered in Task 2 assets and Task 4 service banner implementation.
- Trusted-by logo wall: covered in Task 2 content and Task 4 logo grid implementation.
- Our work gallery: covered in Task 2 assets/content and Task 4 work gallery implementation.
- Footer: covered in Task 2 footer content and Task 4 footer implementation.
- Responsiveness: covered in Task 5 responsive tuning.
- Verification: covered in Task 1, Task 3, Task 5, and Task 6.

### Placeholder scan

- No `TODO`, `TBD`, or deferred implementation placeholders remain.
- Commands, files, and code snippets are provided for each code-changing task.

### Type consistency

- Shared imports consistently use `@/components/landing/*` and `@/lib/content`.
- Component names in the plan match the names used in `app/page.tsx`.
