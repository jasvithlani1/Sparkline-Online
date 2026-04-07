# Navbar Fixed Scroll-State Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the navbar fixed to the top of the viewport, preserve its glass look at the top of the hero, and transition it into a darker solid shell once the page scrolls.

**Architecture:** Extend the existing client-side `Navbar` component with a small scroll-state hook and class toggle while keeping the current desktop and mobile navigation behavior intact. Verify the new behavior through the existing home-page test by asserting the fixed header and scroll-state class changes.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Vitest, Testing Library

---

### Task 1: Add the failing scroll-state regression

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it("keeps the navbar fixed and darkens it after scroll", () => {
  render(<Home />);

  const navbar = screen.getByTestId("site-navbar");
  const navbarShell = screen.getByTestId("site-navbar-shell");

  expect(navbar).toHaveClass("fixed");
  expect(navbarShell).toHaveClass("bg-white/8");
  expect(navbarShell).not.toHaveClass("bg-[#0d1730]/88");

  Object.defineProperty(window, "scrollY", { value: 80, writable: true });
  window.dispatchEvent(new Event("scroll"));

  expect(navbarShell).toHaveClass("bg-[#0d1730]/88");
  expect(navbarShell).toHaveClass("shadow-[0_14px_40px_rgba(4,10,24,0.28)]");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the navbar is still absolutely positioned and has no scroll-state styling.

### Task 2: Implement the fixed navbar scroll state

**Files:**
- Modify: `components/landing/navbar.tsx`

- [ ] **Step 1: Add the minimal scroll-state implementation**

```tsx
"use client";

import { useEffect, useState } from "react";

const NAVBAR_SCROLL_THRESHOLD = 24;

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrolledState = () => {
      setIsScrolled(window.scrollY > NAVBAR_SCROLL_THRESHOLD);
    };

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  return (
    <header data-testid="site-navbar" className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4 md:px-6">
      <div
        data-testid="site-navbar-shell"
        className={isScrolled ? "bg-[#0d1730]/88 ..." : "bg-white/8 ..."}
      >
```

- [ ] **Step 2: Run the targeted test to verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS

### Task 3: Verify the app after the navbar change

**Files:**
- Modify: `tests/app/home.test.tsx`
- Modify: `components/landing/navbar.tsx`

- [ ] **Step 1: Run the full verification suite**

Run: `npm test`
Expected: PASS

Run: `npm run lint`
Expected: PASS

Run: `npm run build`
Expected: PASS
