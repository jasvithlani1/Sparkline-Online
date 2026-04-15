# Feature Intro Dark Gap Restore Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the visible gap between the Haven Demo card and the services section while keeping that gap dark by assigning the spacing to the Haven Demo section.

**Architecture:** Keep the services section flush at the top and restore the Haven Demo section's responsive bottom padding so the seam reappears as part of the existing `#050C1E` surface. Lock the behavior with the existing home-page regression by replacing the zero-bottom-padding assertions with the restored responsive padding expectations.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### Task 1: Update the home-page regression for the restored dark gap

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify against: `components/landing/feature-intro.tsx`

- [ ] **Step 1: Replace the zero-bottom-padding assertions with restored gap assertions**

```tsx
    expect(featureIntro).toHaveClass("bg-[#050C1E]");
    expect(featureIntro).toHaveClass("pb-12");
    expect(featureIntro).toHaveClass("sm:pb-14");
    expect(featureIntro).toHaveClass("md:pb-18");
    expect(featureIntro).toHaveClass("lg:pb-20");
    expect(featureIntroContent).toHaveClass("max-w-[1308px]");
    expect(featureIntroContent).not.toHaveClass("max-w-[415px]");
    expect(featureIntroContent).toHaveClass("text-white");
    expect(featureIntroCta).toBeInTheDocument();
    expect(featureIntroCta).toHaveClass("text-white/72");
    expect(servicesSection).toHaveClass("pt-0");
    expect(servicesSection).toHaveClass("sm:pt-0");
    expect(servicesSection).toHaveClass("md:pt-0");
```

- [ ] **Step 2: Run the focused regression to verify it fails before implementation**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: FAIL because `FeatureIntro` still renders `pb-0 sm:pb-0 md:pb-0 lg:pb-0`.

### Task 2: Restore the dark gap on the Haven Demo section

**Files:**
- Modify: `components/landing/feature-intro.tsx`
- Verify with: `tests/app/home.test.tsx`

- [ ] **Step 1: Restore the responsive bottom padding on the dark Haven Demo section**

```tsx
import { featuredIntro } from "@/lib/content";

export function FeatureIntro() {
  return (
    <section
      id="about-us"
      data-testid="feature-intro"
      className="bg-[#050C1E] px-5 pt-12 pb-12 sm:px-6 sm:pt-14 sm:pb-14 md:px-8 md:pt-18 md:pb-18 lg:pt-20 lg:pb-20"
    >
      <div
        data-testid="feature-intro-content"
        className="mx-auto flex max-w-[1308px] flex-col gap-6 px-2 text-white sm:gap-8 sm:px-4"
      >
        <p className="text-[17px] leading-7 sm:text-lg md:text-[18px] md:leading-[1.35]">
          {featuredIntro.body}
        </p>
        <a href="#portfolio" className="inline-flex items-center gap-2 text-sm text-white/72">
          <span aria-hidden="true" className="text-lg leading-none">
            ›
          </span>
          {featuredIntro.cta}
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Re-run the focused regression to verify the restored gap passes**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: PASS with the restored `pb-12 sm:pb-14 md:pb-18 lg:pb-20` assertions and the existing `pt-0` services assertions.

- [ ] **Step 3: Commit the focused implementation**

```bash
git add components/landing/feature-intro.tsx tests/app/home.test.tsx
git commit -m "fix: restore dark gap before services section"
```

### Task 3: Run full verification for the restored spacing contract

**Files:**
- Verify: `tests/app/home.test.tsx`
- Verify: `components/landing/feature-intro.tsx`
- Verify: `components/landing/service-banner.tsx`

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

Expected: PASS with a successful Next.js production build.
