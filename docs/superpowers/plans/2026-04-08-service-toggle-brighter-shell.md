# Service Toggle Brighter Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Brighten only the outer service-toggle shell slightly while preserving the existing light-glass inner styling and interaction behavior.

**Architecture:** Reuse the existing toggle regression and change only the shell-specific assertions, then minimally adjust the outer card background and shadow in the component. No inner divider, icon, or text styles change.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### File Structure

- Modify: `components/landing/service-options-toggle.tsx` - brighten only the outer glass shell classes.
- Modify: `tests/app/home.test.tsx` - update the shell-specific expectation to the brighter class.

### Task 1: Lock the brighter shell contract with a failing test

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Update the shell expectation**

```tsx
    expect(toggle).toHaveClass("bg-white/62");
```

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the toggle shell still uses `bg-white/52`.

### Task 2: Brighten the outer shell and verify the app

**Files:**
- Modify: `components/landing/service-options-toggle.tsx`
- Modify: `tests/app/home.test.tsx`

- [ ] **Step 1: Update only the outer shell classes**

```tsx
      className="... border border-white/38 bg-white/62 ... shadow-[0_16px_32px_rgba(15,23,42,0.14)] ..."
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
