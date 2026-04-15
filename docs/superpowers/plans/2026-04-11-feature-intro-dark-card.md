# Feature Intro Dark Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Change the Haven Demo feature intro section to a `#050C1E` dark card with white body copy and a light CTA while preserving the existing layout and copy.

**Architecture:** Keep the change isolated to `components/landing/feature-intro.tsx` and extend the existing home-page regression in `tests/app/home.test.tsx`. Apply the dark surface at the section level, switch the content wrapper to white text, and lighten the CTA link so the entire card remains readable without altering structure.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

## File Structure

- Modify: `tests/app/home.test.tsx` - extend the intro-section assertions to lock the dark background and light text treatment.
- Modify: `components/landing/feature-intro.tsx` - switch the section surface to `#050C1E`, change the content text to white, and lighten the CTA.

### Task 1: Lock the dark-card contract in tests

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

In the `renders the approved landing page sections and copy` test, add these assertions after `featureIntro` and `featureIntroContent` are queried:

```tsx
    const featureIntroCta = within(featureIntro).getByRole("link", { name: /learn more/i });

    expect(featureIntro).toHaveClass("bg-[#050C1E]");
    expect(featureIntroContent).toHaveClass("text-white");
    expect(featureIntroCta).toHaveClass("text-white/72");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/app/home.test.tsx -t "renders the approved landing page sections and copy"`

Expected: FAIL because `FeatureIntro` still uses a white background with dark text.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/app/home.test.tsx
git commit -m "test: require dark haven demo intro card"
```

### Task 2: Apply the dark card styling

**Files:**
- Modify: `components/landing/feature-intro.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Update the section and content colors**

Replace `components/landing/feature-intro.tsx` with this implementation:

```tsx
import { featuredIntro } from "@/lib/content";

export function FeatureIntro() {
  return (
    <section
      id="about-us"
      data-testid="feature-intro"
      className="bg-[#050C1E] px-5 py-12 sm:px-6 sm:py-14 md:px-8 md:py-18 lg:py-20"
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

- [ ] **Step 2: Run the targeted test to verify it passes**

Run: `npm test -- --run tests/app/home.test.tsx -t "renders the approved landing page sections and copy"`

Expected: PASS with the new dark card assertions green.

- [ ] **Step 3: Commit the implementation**

```bash
git add components/landing/feature-intro.tsx tests/app/home.test.tsx
git commit -m "feat: darken haven demo intro card"
```

### Task 3: Full verification

**Files:**
- Modify: none
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`

Expected: PASS with all Vitest suites green.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: PASS with the Next.js production build completing successfully.

- [ ] **Step 3: Commit the verified change set**

```bash
git add components/landing/feature-intro.tsx tests/app/home.test.tsx
git commit -m "chore: verify dark haven demo intro card"
```
