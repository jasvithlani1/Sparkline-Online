# Trusted-By Dissolve Mask Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the trusted-by marquee edges blend more cleanly into the background and let the logos dissolve more smoothly on both sides.

**Architecture:** Keep the existing left and right mask elements in `LogoGrid`, but widen them slightly and replace the current polished fade with a longer multi-stop dissolve that carries the background-matched tint farther before tapering to transparent. Update only the trusted-by marquee regression to cover the revised widths and gradient strings.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### Task 1: Update the trusted-by regression for the longer dissolve masks

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify against: `components/landing/logo-grid.tsx`

- [ ] **Step 1: Replace the current trusted-by mask assertions with the longer dissolve expectations**

Update the trusted-by marquee assertions to:

```tsx
    expect(leftMask).toHaveClass("w-14");
    expect(leftMask).toHaveClass(
      "bg-[linear-gradient(90deg,rgba(11,52,159,0.16),rgba(11,52,159,0.10)_24%,rgba(11,52,159,0.05)_48%,rgba(11,52,159,0.02)_68%,rgba(11,52,159,0))]",
    );
    expect(rightMask).toHaveClass("w-14");
    expect(rightMask).toHaveClass(
      "bg-[linear-gradient(270deg,rgba(11,52,159,0.16),rgba(11,52,159,0.10)_24%,rgba(11,52,159,0.05)_48%,rgba(11,52,159,0.02)_68%,rgba(11,52,159,0))]",
    );
```

- [ ] **Step 2: Run the focused regression to verify it fails before implementation**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: FAIL because `LogoGrid` still uses `w-12` and the shorter four-stop gradient.

### Task 2: Apply the longer dissolve treatment in `LogoGrid`

**Files:**
- Modify: `components/landing/logo-grid.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Widen the masks slightly and replace the current fades with the longer dissolve gradients**

Update the mask elements in `components/landing/logo-grid.tsx` to:

```tsx
          <div
            data-testid="trusted-by-marquee-left-mask"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-[linear-gradient(90deg,rgba(11,52,159,0.16),rgba(11,52,159,0.10)_24%,rgba(11,52,159,0.05)_48%,rgba(11,52,159,0.02)_68%,rgba(11,52,159,0))] sm:w-24 md:w-32"
          />
          <div
            data-testid="trusted-by-marquee-right-mask"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-[linear-gradient(270deg,rgba(11,52,159,0.16),rgba(11,52,159,0.10)_24%,rgba(11,52,159,0.05)_48%,rgba(11,52,159,0.02)_68%,rgba(11,52,159,0))] sm:w-24 md:w-32"
          />
```

- [ ] **Step 2: Re-run the focused regression to verify the longer dissolve passes**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: PASS with the trusted-by marquee test green and the rest of the home-page regression unchanged.

- [ ] **Step 3: Commit the focused implementation**

```bash
git add components/landing/logo-grid.tsx tests/app/home.test.tsx
git commit -m "fix: improve trusted by dissolve masks"
```

### Task 3: Run full verification for the dissolve refinement

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
