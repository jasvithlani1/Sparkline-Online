# Hero Bottom Artwork Offset Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lower the hero bottom artwork slightly so part of it sits below the hero edge and gets cropped naturally.

**Architecture:** Keep the existing local asset, centered alignment, and reduced width intact. Update the hero regression to lock a small negative bottom offset on the artwork wrapper, then apply the minimal class change in `Hero`.

**Tech Stack:** Next.js, React, TypeScript, Next Image, Jest Testing Library, ESLint

---

### Task 1: Lock the lowered artwork offset with a failing regression

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
    expect(heroBottomArtwork).toHaveClass("-bottom-4");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the current hero artwork wrapper still uses `bottom-0`.

### Task 2: Lower the artwork slightly

**Files:**
- Modify: `components/landing/hero.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the minimal implementation**

```tsx
      <div
        data-testid="hero-bottom-artwork"
        className="pointer-events-none absolute inset-x-0 -bottom-4 z-10 flex justify-center px-4 sm:px-6 md:px-8"
      >
```

- [ ] **Step 2: Run the focused test to verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the artwork still centered and scaled down, and now slightly lowered below the hero edge.

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
