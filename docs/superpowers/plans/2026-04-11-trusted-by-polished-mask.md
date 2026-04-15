# Trusted-By Polished Mask Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the trusted-by marquee side masks so they keep a polished soft fade while blending more naturally into the surrounding gradient background.

**Architecture:** Keep the existing mask elements and widths in `LogoGrid`, but replace the current low-opacity two-step fade with a gentler multi-stop fade that eases into transparency more gradually. Update only the trusted-by marquee regression so it tracks the revised gradient strings without broadening the test surface.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### Task 1: Update the trusted-by regression for the polished multi-stop fade

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify against: `components/landing/logo-grid.tsx`

- [ ] **Step 1: Replace the current trusted-by mask assertions with the polished fade expectations**

Update the trusted-by marquee assertions to:

```tsx
    expect(leftMask).toHaveClass(
      "bg-[linear-gradient(90deg,rgba(11,52,159,0.14),rgba(11,52,159,0.08)_28%,rgba(11,52,159,0.03)_52%,rgba(11,52,159,0))]",
    );
    expect(rightMask).toHaveClass(
      "bg-[linear-gradient(270deg,rgba(11,52,159,0.14),rgba(11,52,159,0.08)_28%,rgba(11,52,159,0.03)_52%,rgba(11,52,159,0))]",
    );
```

- [ ] **Step 2: Run the focused regression to verify it fails before implementation**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: FAIL because `LogoGrid` still renders the earlier stronger mask classes with the `0.18 / 0.08 / 0` stops.

### Task 2: Apply the polished marquee fade in `LogoGrid`

**Files:**
- Modify: `components/landing/logo-grid.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Replace the current trusted-by mask classes with the gentler multi-stop fade**

Update the mask elements in `components/landing/logo-grid.tsx` to:

```tsx
          <div
            data-testid="trusted-by-marquee-left-mask"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-[linear-gradient(90deg,rgba(11,52,159,0.14),rgba(11,52,159,0.08)_28%,rgba(11,52,159,0.03)_52%,rgba(11,52,159,0))] sm:w-20 md:w-28"
          />
          <div
            data-testid="trusted-by-marquee-right-mask"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-[linear-gradient(270deg,rgba(11,52,159,0.14),rgba(11,52,159,0.08)_28%,rgba(11,52,159,0.03)_52%,rgba(11,52,159,0))] sm:w-20 md:w-28"
          />
```

- [ ] **Step 2: Re-run the focused regression to verify the polished fade passes**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: PASS with the trusted-by marquee test green and the rest of the home-page regression unchanged.

- [ ] **Step 3: Commit the focused implementation**

```bash
git add components/landing/logo-grid.tsx tests/app/home.test.tsx
git commit -m "fix: polish trusted by marquee masks"
```

### Task 3: Run full verification for the marquee mask refinement

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
