# Hero Bottom Artwork Scale Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the hero bottom artwork to about half of its current footprint while keeping it centered and bottom-aligned.

**Architecture:** Keep the existing hero artwork layer and local asset path intact. Update the hero regression to lock a smaller max-width on the artwork image, then apply the minimal class change in `Hero`.

**Tech Stack:** Next.js, React, TypeScript, Next Image, Jest Testing Library, ESLint

---

### Task 1: Lock the smaller artwork width contract with a failing regression

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
    expect(heroBottomArtworkImage).toHaveClass("max-w-[840px]");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the current hero artwork image still uses `max-w-[1680px]`.

### Task 2: Reduce the artwork footprint

**Files:**
- Modify: `components/landing/hero.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the minimal implementation**

```tsx
        <Image
          src="/images/hero-bottom-artwork.png"
          alt="Decorative underwater artwork"
          width={5056}
          height={1584}
          priority
          className="h-auto w-full max-w-[840px] opacity-95"
        />
```

- [ ] **Step 2: Run the focused test to verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the hero artwork still anchored at the bottom and now locked to the smaller centered max width.

### Task 3: Run full verification

**Files:**
- Verify: `tests/app/home.test.tsx`
- Verify: project test suite
- Verify: project lint configuration

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS with all tests green.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS with no lint errors.
