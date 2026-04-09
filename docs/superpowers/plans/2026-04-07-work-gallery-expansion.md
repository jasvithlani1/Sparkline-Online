# Work Gallery Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the `OUR WORK` section from two cards to four cards and add a `View All Projects` CTA below the grid.

**Architecture:** Keep the existing gallery section structure and styling. First add a focused test for the four-card render and CTA, then extend the structured content with two duplicated project entries and render the CTA below the grid.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### Task 1: Lock the expanded gallery with a failing test

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
  it("renders four work cards and a view-all-projects CTA", () => {
    render(<Home />);

    const cards = screen.getAllByTestId("work-gallery-card");
    const cta = screen.getByRole("link", { name: /view all projects/i });

    expect(cards).toHaveLength(4);
    expect(cta).toHaveAttribute("href", "#portfolio");
  });
```

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the current section only renders two cards and no CTA.

### Task 2: Expand the content and render the CTA

**Files:**
- Modify: `lib/content.ts`
- Modify: `components/landing/work-gallery.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Add two more project entries and CTA content**

```ts
export const workGallery = {
  ...
  projects: [
    { id: "firecrawl-1", ... },
    { id: "blackalgo-1", ... },
    { id: "firecrawl-2", ... },
    { id: "blackalgo-2", ... },
  ],
  cta: {
    label: "View All Projects",
    href: "#portfolio",
  },
} as const;
```

- [ ] **Step 2: Render four cards and the CTA beneath the grid**

```tsx
{workGallery.projects.map((project) => (
  <article key={project.id} data-testid="work-gallery-card">
    ...
  </article>
))}

<a href={workGallery.cta.href}>View All Projects</a>
```

- [ ] **Step 3: Run the targeted test and verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the new gallery test and existing home-page assertions still green.

### Task 3: Verify the whole app

**Files:**
- Modify: `lib/content.ts`
- Modify: `components/landing/work-gallery.tsx`
- Modify: `tests/app/home.test.tsx`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS with 0 failures.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS with 0 errors.

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: PASS and Next.js completes the production build successfully.
