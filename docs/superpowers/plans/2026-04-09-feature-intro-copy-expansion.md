# Feature Intro Copy Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the post-hero feature intro sentence with a fuller 4-5 line paragraph that keeps the same mission-success meaning.

**Architecture:** Keep the section component unchanged and update the content model only. Add a focused regression in the home-page test so the new copy is asserted before changing the content, then verify the broader test and lint surfaces still pass.

**Tech Stack:** Next.js, React, TypeScript, Jest Testing Library, ESLint

---

### Task 1: Lock the new paragraph contract with a regression

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
    expect(
      screen.getByText(/marked a major milestone with a successful deployment/i),
    ).toBeInTheDocument();
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the current `featuredIntro.body` still contains the old one-sentence copy and does not include `marked a major milestone with a successful deployment`.

### Task 2: Replace the feature intro body copy

**Files:**
- Modify: `lib/content.ts`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the minimal implementation**

```ts
  body:
    "In November 2025, Haven Demo marked a major milestone with a successful deployment on the Bandwagon-4 rideshare mission. The mission reached its intended outcome in orbit, confirming that the platform performed as planned after deployment. That result turned a key launch moment into a clear operational success for the program. It also marked an important step forward for Haven Demo as the work continues.",
```

- [ ] **Step 2: Run the focused test to verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the new paragraph rendered in the feature intro section.

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
