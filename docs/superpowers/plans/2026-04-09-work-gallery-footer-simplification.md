# Work Gallery Footer Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the visible project meta label from the `OUR WORK` card footer so only `View Project` remains.

**Architecture:** Keep the editorial carousel and content model intact, and change only the card footer contract. First tighten the existing work-gallery regression to assert that the footer no longer shows the old meta text, then remove the rendered `project.meta` span from the component.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### File Structure

- Modify: `components/landing/work-gallery.tsx` - remove the visible `project.meta` footer label.
- Modify: `tests/app/home.test.tsx` - extend the work-gallery regression to assert the simplified footer.

### Task 1: Lock the simplified footer contract with a failing test

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Extend the work-gallery regression**

```tsx
    expect(within(cards[0]).getByText(/view project/i)).toBeInTheDocument();
    expect(within(cards[0]).queryByText(/website · branding/i)).not.toBeInTheDocument();
```

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the first work card still renders `Website · Branding`.

### Task 2: Remove the visible meta label and verify the app

**Files:**
- Modify: `components/landing/work-gallery.tsx`
- Modify: `tests/app/home.test.tsx`

- [ ] **Step 1: Remove the `project.meta` span from the card footer**

```tsx
                        <div className="flex items-end justify-between gap-4 border-t border-black/8 pt-5">
                          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#222F30]/75 sm:text-[12px]">
                            {project.ctaLabel}
                          </span>
                        </div>
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
