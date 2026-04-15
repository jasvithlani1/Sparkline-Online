# Midpage Gradient Band Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one continuous gradient band from `#0B349F` to `#050C1E` behind the services, trusted-by, and work-gallery sections, while removing their white outer surfaces and restoring readable light-on-dark chrome.

**Architecture:** Introduce a shared wrapper in `app/page.tsx` that owns the middle-page gradient, then make `ServiceBanner`, `LogoGrid`, and `WorkGallery` transparent to that wrapper by removing their white backgrounds. Extend the shared `SectionHeading` component with a dark-surface variant and retune the marquee and carousel masks to fade into the new dark gradient instead of white.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### Task 1: Lock the shared gradient band contract in the home-page regression

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify against: `app/page.tsx`
- Verify against: `components/landing/logo-grid.tsx`
- Verify against: `components/landing/work-gallery.tsx`

- [ ] **Step 1: Extend the home-page regression to expect the shared gradient wrapper and non-white section surfaces**

Insert these lookups near the existing section queries in `renders the approved landing page sections and copy`:

```tsx
    const midpageGradientBand = screen.getByTestId("midpage-gradient-band");
    const trustedBySection = screen.getByTestId("trusted-by-section");
    const workGallerySection = screen.getByTestId("work-gallery-section");
```

Replace the old section-surface assumptions with these assertions:

```tsx
    expect(midpageGradientBand).toHaveClass("bg-[linear-gradient(180deg,#0B349F_0%,#050C1E_100%)]");
    expect(servicesSection).not.toHaveClass("bg-white");
    expect(trustedBySection).not.toHaveClass("bg-white");
    expect(workGallerySection).not.toHaveClass("bg-white");
```

Update the marquee and carousel mask expectations in their existing tests:

```tsx
    expect(leftMask).toHaveClass("bg-[linear-gradient(90deg,#0A2F8E,rgba(10,47,142,0))]");
    expect(rightMask).toHaveClass("bg-[linear-gradient(270deg,#0A2F8E,rgba(10,47,142,0))]");
```

```tsx
    expect(screen.getByTestId("work-gallery-left-mask")).toHaveClass(
      "bg-[linear-gradient(90deg,#050C1E,rgba(5,12,30,0))]",
    );
    expect(screen.getByTestId("work-gallery-right-mask")).toHaveClass(
      "bg-[linear-gradient(270deg,#050C1E,rgba(5,12,30,0))]",
    );
```

- [ ] **Step 2: Run the focused regression to verify it fails before implementation**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: FAIL because the shared wrapper test id and dark-surface mask classes do not exist yet, and the three sections still advertise `bg-white`.

### Task 2: Add the shared gradient wrapper and dark-surface section treatment

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/landing/service-banner.tsx`
- Modify: `components/landing/logo-grid.tsx`
- Modify: `components/landing/work-gallery.tsx`

- [ ] **Step 1: Wrap the three middle sections in a shared gradient band in `app/page.tsx`**

Update the page structure to:

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
    <main className="min-h-screen bg-white">
      <div className="relative">
        <Navbar />
        <Hero />
      </div>
      <FeatureIntro />
      <div
        data-testid="midpage-gradient-band"
        className="bg-[linear-gradient(180deg,#0B349F_0%,#050C1E_100%)]"
      >
        <ServiceBanner />
        <LogoGrid />
        <WorkGallery />
      </div>
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Remove the white outer surfaces from the affected sections and add stable section hooks**

Update the outer section elements to:

```tsx
// components/landing/service-banner.tsx
<section id="services" className="px-5 pt-0 pb-8 sm:px-6 sm:pt-0 sm:pb-10 md:px-8 md:pt-0 md:pb-14">
```

```tsx
// components/landing/logo-grid.tsx
<section data-testid="trusted-by-section" className="px-5 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24">
```

```tsx
// components/landing/work-gallery.tsx
<section
  id="portfolio"
  data-testid="work-gallery-section"
  className="px-5 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24"
>
```

- [ ] **Step 3: Re-run the focused regression to surface the remaining contrast-related failures**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: FAIL on the heading and mask assertions because `SectionHeading`, marquee text, and edge masks still assume a light background.

### Task 3: Add dark-surface heading and mask treatments

**Files:**
- Modify: `components/landing/section-heading.tsx`
- Modify: `components/landing/logo-grid.tsx`
- Modify: `components/landing/work-gallery.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Add a `tone` variant to `SectionHeading` and wire up the dark treatment**

Replace `components/landing/section-heading.tsx` with:

```tsx
type SectionHeadingProps = {
  eyebrow: string;
  lines: readonly string[];
  tone?: "light" | "dark";
};

export function SectionHeading({ eyebrow, lines, tone = "light" }: SectionHeadingProps) {
  const eyebrowClass =
    tone === "dark"
      ? "text-[11px] uppercase tracking-[0.24em] text-white/55 sm:text-sm sm:tracking-[0.3em]"
      : "text-[11px] uppercase tracking-[0.24em] text-black/35 sm:text-sm sm:tracking-[0.3em]";
  const linesClass =
    tone === "dark"
      ? "space-y-1 text-[28px] leading-[1.12] text-white/88 sm:text-[32px] sm:leading-[1.16] md:text-[40px] md:leading-[1.18]"
      : "space-y-1 text-[28px] leading-[1.12] text-black/80 sm:text-[32px] sm:leading-[1.16] md:text-[40px] md:leading-[1.18]";

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center sm:gap-5 md:gap-6">
      <p className={eyebrowClass}>{eyebrow}</p>
      <div className={linesClass}>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Apply the dark heading tone and dark-surface mask/text classes in `LogoGrid`**

Update the relevant parts of `components/landing/logo-grid.tsx` to:

```tsx
    <section data-testid="trusted-by-section" className="px-5 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[1208px] flex-col items-center gap-12 sm:gap-14 md:gap-16">
        <SectionHeading eyebrow={trustedBy.eyebrow} lines={trustedBy.lines} tone="dark" />
        <div data-testid="trusted-by-marquee" className="relative w-full overflow-hidden py-2">
          <div
            data-testid="trusted-by-marquee-left-mask"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-[linear-gradient(90deg,#0A2F8E,rgba(10,47,142,0))] sm:w-20 md:w-28"
          />
          <div
            data-testid="trusted-by-marquee-right-mask"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-[linear-gradient(270deg,#0A2F8E,rgba(10,47,142,0))] sm:w-20 md:w-28"
          />
```

Change the marquee logo text to:

```tsx
className="whitespace-nowrap text-base font-medium text-white/78 sm:text-lg md:text-[1.2rem]"
```

- [ ] **Step 3: Apply the dark heading tone and dark edge masks in `WorkGallery`**

Update the relevant parts of `components/landing/work-gallery.tsx` to:

```tsx
    <section
      id="portfolio"
      data-testid="work-gallery-section"
      className="px-5 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24"
    >
      <div className="mx-auto flex max-w-[1208px] flex-col gap-10 sm:gap-12 md:gap-14">
        <SectionHeading eyebrow={workGallery.eyebrow} lines={workGallery.lines} tone="dark" />
        <div className="relative">
          <div
            data-testid="work-gallery-left-mask"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-[linear-gradient(90deg,#050C1E,rgba(5,12,30,0))] sm:w-16"
          />
          <div
            data-testid="work-gallery-right-mask"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-[linear-gradient(270deg,#050C1E,rgba(5,12,30,0))] sm:w-16"
          />
```

- [ ] **Step 4: Re-run the focused regression to verify the complete gradient-band behavior passes**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: PASS with the shared gradient wrapper, transparent section shells, and dark-surface mask assertions all green.

- [ ] **Step 5: Commit the focused implementation**

```bash
git add app/page.tsx components/landing/section-heading.tsx components/landing/logo-grid.tsx components/landing/work-gallery.tsx components/landing/service-banner.tsx tests/app/home.test.tsx
git commit -m "feat: add midpage gradient band"
```

### Task 4: Run full verification for the middle-band gradient change

**Files:**
- Verify: `app/page.tsx`
- Verify: `components/landing/section-heading.tsx`
- Verify: `components/landing/logo-grid.tsx`
- Verify: `components/landing/work-gallery.tsx`
- Verify: `components/landing/service-banner.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Run the full test suite**

Run:

```bash
npm test
```

Expected: PASS with all landing-page regressions green.

- [ ] **Step 2: Run the production build**

Run:

```bash
npm run build
```

Expected: PASS with a successful Next.js production build. If the sandboxed build hits the known Turbopack port-binding restriction, rerun the same command outside the sandbox for final verification.
