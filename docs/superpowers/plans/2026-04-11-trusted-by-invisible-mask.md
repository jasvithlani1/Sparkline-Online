# Trusted-By Invisible Mask Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the trusted-by marquee side masks blend almost invisibly into the gradient background while preserving the soft edge fade.

**Architecture:** Keep the existing left and right mask elements in `LogoGrid`, but replace their current opaque-looking blue gradients with low-opacity blue fades that visually disappear into the surrounding surface. Lock the treatment with the existing marquee regression by updating only the trusted-by mask class assertions.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### Task 1: Update the trusted-by regression for the softer mask treatment

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify against: `components/landing/logo-grid.tsx`

- [ ] **Step 1: Replace the current trusted-by mask assertions with the softer invisible-mask expectations**

Update the trusted-by marquee assertions to:

```tsx
    expect(leftMask).toHaveClass(
      "bg-[linear-gradient(90deg,rgba(11,52,159,0.18),rgba(11,52,159,0.08)_38%,rgba(11,52,159,0))]",
    );
    expect(rightMask).toHaveClass(
      "bg-[linear-gradient(270deg,rgba(11,52,159,0.18),rgba(11,52,159,0.08)_38%,rgba(11,52,159,0))]",
    );
```

- [ ] **Step 2: Run the focused regression to verify it fails before implementation**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: FAIL because `LogoGrid` still renders the stronger `#0A2F8E` mask classes.

### Task 2: Soften the trusted-by side mask gradients

**Files:**
- Modify: `components/landing/logo-grid.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Replace the current mask backgrounds with low-opacity blue fades**

Update the mask elements in `components/landing/logo-grid.tsx` to:

```tsx
          <div
            data-testid="trusted-by-marquee-left-mask"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-[linear-gradient(90deg,rgba(11,52,159,0.18),rgba(11,52,159,0.08)_38%,rgba(11,52,159,0))] sm:w-20 md:w-28"
          />
          <div
            data-testid="trusted-by-marquee-right-mask"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-[linear-gradient(270deg,rgba(11,52,159,0.18),rgba(11,52,159,0.08)_38%,rgba(11,52,159,0))] sm:w-20 md:w-28"
          />
```

- [ ] **Step 2: Re-run the focused regression to verify the new mask treatment passes**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: PASS with the trusted-by mask assertions green and the rest of the home-page regression unchanged.

- [ ] **Step 3: Commit the focused implementation**

```bash
git add components/landing/logo-grid.tsx tests/app/home.test.tsx
git commit -m "fix: soften trusted by marquee masks"
```

### Task 3: Run full verification for the mask refinement

**Files:**
- Verify: `components/landing/logo-grid.tsx`
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
