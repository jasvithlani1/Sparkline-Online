# Site Background White Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the website's off-white canvas with pure white across the shared background token, section backgrounds, and fade masks.

**Architecture:** First update the home-page regression to expect a white site canvas and white-blending mask gradients. Then minimally replace the shared background token and all remaining hardcoded `#FDFCF4` section fills and mask gradients with white values.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### File Structure

- Modify: `app/globals.css` - switch the global `--background` token to white.
- Modify: `app/page.tsx` - change the main wrapper from off-white to white.
- Modify: `components/landing/feature-intro.tsx` - replace the off-white section background with white.
- Modify: `components/landing/logo-grid.tsx` - replace the off-white section background and mask gradients with white.
- Modify: `components/landing/service-banner.tsx` - replace the off-white section background with white.
- Modify: `components/landing/work-gallery.tsx` - replace the off-white section background and mask gradients with white.
- Modify: `tests/app/home.test.tsx` - extend the home-page regression to lock the white canvas contract.

### Task 1: Lock the white canvas contract with a failing test

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Add white-background assertions**

```tsx
    const main = container.querySelector("main");
    const trustedMask = screen.getByTestId("trusted-by-marquee-left-mask");
    const workMask = screen.getByTestId("work-gallery-left-mask");

    expect(main).toHaveClass("bg-white");
    expect(trustedMask).toHaveClass("bg-[linear-gradient(90deg,#FFFFFF,rgba(255,255,255,0))]");
    expect(workMask).toHaveClass("bg-[linear-gradient(90deg,#FFFFFF,rgba(255,255,255,0))]");
```

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the app still uses `#FDFCF4` in the main wrapper and mask gradients.

### Task 2: Replace the off-white canvas with white

**Files:**
- Modify: `app/globals.css`
- Modify: `app/page.tsx`
- Modify: `components/landing/feature-intro.tsx`
- Modify: `components/landing/logo-grid.tsx`
- Modify: `components/landing/service-banner.tsx`
- Modify: `components/landing/work-gallery.tsx`
- Modify: `tests/app/home.test.tsx`

- [ ] **Step 1: Switch the shared background token**

```css
:root {
  --background: #ffffff;
  ...
}
```

- [ ] **Step 2: Replace the hardcoded section backgrounds**

```tsx
<main className="min-h-screen bg-white">
```

```tsx
<section ... className="bg-white ...">
```

- [ ] **Step 3: Replace the logo and work mask gradients**

```tsx
className="... bg-[linear-gradient(90deg,#FFFFFF,rgba(255,255,255,0))] ..."
```

```tsx
className="... bg-[linear-gradient(270deg,#FFFFFF,rgba(255,255,255,0))] ..."
```

- [ ] **Step 4: Run the targeted test and verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS.

### Task 3: Verify the full app

**Files:**
- Modify: all files above

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS with 0 failures.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS with 0 errors.
