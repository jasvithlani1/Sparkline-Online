# Feature Intro Single Column Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the post-hero two-column intro block with a single wide content column that keeps only the body copy and CTA.

**Architecture:** Keep the section and content source intact, but stop rendering the left title block and collapse the layout to one wide container. First tighten the home-page regression to assert the old left headline is gone and the wide single-column content shell is present, then simplify the component markup to that one block.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### File Structure

- Modify: `components/landing/feature-intro.tsx` - remove the left title block and convert the section to one wide content column.
- Modify: `tests/app/home.test.tsx` - extend the home-page regression to lock the new single-column contract.

### Task 1: Lock the single-column intro contract with a failing test

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Add focused feature-intro assertions**

```tsx
    const featureIntro = screen.getByTestId("feature-intro");
    const featureIntroContent = screen.getByTestId("feature-intro-content");

    expect(screen.queryByText(/haven demo:/i)).not.toBeInTheDocument();
    expect(featureIntroContent).toHaveClass("max-w-[1308px]");
    expect(featureIntroContent).not.toHaveClass("max-w-[415px]");
    expect(within(featureIntro).getByRole("link", { name: /learn more/i })).toBeInTheDocument();
```

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the current component still renders the left headline block and a narrow right column.

### Task 2: Replace the intro section with a single wide content block

**Files:**
- Modify: `components/landing/feature-intro.tsx`
- Modify: `tests/app/home.test.tsx`

- [ ] **Step 1: Simplify the section markup**

```tsx
export function FeatureIntro() {
  return (
    <section id="about-us" data-testid="feature-intro" className="bg-white px-5 py-12 sm:px-6 sm:py-14 md:px-8 md:py-18 lg:py-20">
      <div
        data-testid="feature-intro-content"
        className="mx-auto flex max-w-[1308px] flex-col gap-6 px-2 text-[#2A2C2F] sm:gap-8 sm:px-4 md:text-[18px] md:leading-[1.35]"
      >
        <p className="text-[17px] leading-7 sm:text-lg md:text-[18px] md:leading-[1.35]">
          {featuredIntro.body}
        </p>
        <a href="#portfolio" className="inline-flex items-center gap-2 text-sm text-black/70">
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

- [ ] **Step 2: Run the targeted test and verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS.

- [ ] **Step 3: Run the full test suite**

Run: `npm test`
Expected: PASS with 0 failures.

- [ ] **Step 4: Run lint**

Run: `npm run lint`
Expected: PASS with 0 errors.
