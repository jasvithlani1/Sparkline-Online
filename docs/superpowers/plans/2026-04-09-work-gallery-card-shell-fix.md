# Work Gallery Card Shell Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the broken clipped shell from the `OUR WORK` editorial cards and restore a clean rounded white panel.

**Architecture:** Keep the carousel and editorial card content intact, and change only the shell contract. First tighten the existing work-gallery regression to assert the rounded panel shell, then remove the inline `clip-path` from the card wrapper in the component.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### File Structure

- Modify: `components/landing/work-gallery.tsx` - remove the shell `clip-path` and keep the rounded white card surface.
- Modify: `tests/app/home.test.tsx` - extend the work-gallery regression with shell expectations.

### Task 1: Lock the rounded card shell with a failing test

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Extend the work-gallery regression**

```tsx
    expect(cards[0]).toHaveClass("rounded-[28px]");
    expect(cards[0]).toHaveClass("bg-white");
    expect(cards[0]).not.toHaveStyle({ clipPath: expect.any(String) });
```

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the first card still has an inline `clipPath` style.

### Task 2: Remove the broken clipped shell and verify the app

**Files:**
- Modify: `components/landing/work-gallery.tsx`
- Modify: `tests/app/home.test.tsx`

- [ ] **Step 1: Remove the inline `clipPath` from the card wrapper**

```tsx
                  <article
                    key={`${project.id}-${isClone ? "clone" : "real"}`}
                    data-testid={isClone ? undefined : "work-gallery-card"}
                    aria-hidden={isClone}
                    className="w-[min(88vw,900px)] shrink-0 overflow-hidden rounded-[28px] bg-white px-5 py-5 shadow-[0_24px_60px_rgba(34,47,48,0.08)] sm:px-8 sm:py-8"
                  >
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
