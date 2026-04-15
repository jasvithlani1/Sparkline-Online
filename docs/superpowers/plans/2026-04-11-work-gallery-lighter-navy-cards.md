# Work Gallery Lighter Navy Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lighten the work-gallery card shell to a more noticeable navy so the cards separate more clearly from the section background while preserving the current white text and light image panel.

**Architecture:** Keep the current dark-card treatment, text hierarchy, divider, image panel, carousel behavior, and CTA exactly as they are, but swap the card shell from `#03123A` to a lighter navy around `#0A1F57`. Update only the work-gallery regression’s shell-color assertion so the narrower change is tracked without broadening the test surface.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### Task 1: Update the work-gallery regression for the lighter navy shell

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify against: `components/landing/work-gallery.tsx`

- [ ] **Step 1: Replace the current dark-shell assertion with the lighter navy expectation**

Update the work-gallery shell assertions to:

```tsx
    expect(cards[0]).toHaveClass("bg-[#0A1F57]");
    expect(cards[0]).not.toHaveClass("bg-[#03123A]");
    expect(cards[0]).not.toHaveClass("bg-white");
```

Replace the existing shell-color checks:

```tsx
    expect(cards[0]).toHaveClass("bg-[#03123A]");
    expect(cards[0]).not.toHaveClass("bg-white");
```

with the three assertions above.

- [ ] **Step 2: Run the focused regression to verify it fails before implementation**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: FAIL because `WorkGallery` still renders `bg-[#03123A]`.

### Task 2: Apply the lighter navy shell in `WorkGallery`

**Files:**
- Modify: `components/landing/work-gallery.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Replace the current card shell color with the lighter navy**

Update the card shell in `components/landing/work-gallery.tsx` to:

```tsx
                  <article
                    key={`${project.id}-${isClone ? "clone" : "real"}`}
                    data-testid={isClone ? undefined : "work-gallery-card"}
                    data-work-gallery-index={index % workGallery.projects.length}
                    aria-hidden={isClone}
                    className="w-[min(88vw,900px)] shrink-0 overflow-hidden rounded-[28px] bg-[#0A1F57] px-5 py-5 shadow-[0_24px_60px_rgba(4,10,32,0.28)] sm:px-8 sm:py-8"
                  >
```

Keep the existing white text classes and light image panel unchanged.

- [ ] **Step 2: Re-run the focused regression to verify the lighter navy shell passes**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: PASS with the lighter navy shell assertion green and the existing white-text assertions unchanged.

- [ ] **Step 3: Commit the focused implementation**

```bash
git add components/landing/work-gallery.tsx tests/app/home.test.tsx
git commit -m "fix: lighten work gallery card shells"
```

### Task 3: Run full verification for the card-shell adjustment

**Files:**
- Verify: `components/landing/work-gallery.tsx`
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
