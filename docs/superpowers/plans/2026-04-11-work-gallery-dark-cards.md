# Work Gallery Dark Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Change the work-gallery cards to a `#03123A` shell with light text while keeping the inner image panel light.

**Architecture:** Keep the existing card layout, image panel, carousel mechanics, and section CTA unchanged, but retheme the card shell and text stack for a dark-surface presentation. Lock the change with the existing work-gallery regression by replacing the white-card assertion and adding stable checks for the light-on-dark text classes and white-tinted divider treatment.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### Task 1: Update the work-gallery regression for the dark card treatment

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify against: `components/landing/work-gallery.tsx`

- [ ] **Step 1: Replace the white-card assertion and add light-on-dark text expectations**

Update the work-gallery test block to include these assertions:

```tsx
    expect(cards[0]).toHaveClass("bg-[#03123A]");
    expect(cards[0]).not.toHaveClass("bg-white");
    expect(within(cards[0]).getByText(/view project/i)).toHaveClass("text-white/76");
    expect(within(cards[0]).getByRole("heading", { name: /aurora atlas/i, level: 3 })).toHaveClass(
      "text-white",
    );
    expect(
      within(cards[0]).getByText(/a campaign system for immersive product storytelling/i),
    ).toHaveClass("text-white/80");
```

Replace the old white-card assertion:

```tsx
    expect(cards[0]).toHaveClass("bg-white");
```

with the new dark-shell assertions above.

- [ ] **Step 2: Run the focused regression to verify it fails before implementation**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: FAIL because `WorkGallery` still renders white cards with dark text classes.

### Task 2: Re-theme the work-gallery cards for the dark surface

**Files:**
- Modify: `components/landing/work-gallery.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Change the card shell, text colors, and divider treatment while keeping the image panel light**

Update the relevant card markup in `components/landing/work-gallery.tsx` to:

```tsx
                  <article
                    key={`${project.id}-${isClone ? "clone" : "real"}`}
                    data-testid={isClone ? undefined : "work-gallery-card"}
                    data-work-gallery-index={index % workGallery.projects.length}
                    aria-hidden={isClone}
                    className="w-[min(88vw,900px)] shrink-0 overflow-hidden rounded-[28px] bg-[#03123A] px-5 py-5 shadow-[0_24px_60px_rgba(4,10,32,0.28)] sm:px-8 sm:py-8"
                  >
```

```tsx
                          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/52 sm:text-[12px]">
                            {project.date}
                          </p>
```

```tsx
                            <h3 className="max-w-[12ch] text-[30px] leading-[0.95] tracking-[-0.04em] text-white sm:text-[38px]">
                              {project.name}
                            </h3>
                            <p className="max-w-[48ch] text-[15px] leading-6 text-white/80 sm:text-[17px] sm:leading-7">
                              {project.description}
                            </p>
```

```tsx
                        <div className="flex items-end border-t border-white/12 pt-5">
                          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/76 sm:text-[12px]">
                            {project.ctaLabel}
                          </span>
                        </div>
```

Keep the image panel unchanged:

```tsx
                      <div className="relative aspect-[750/530] overflow-hidden rounded-[20px] bg-[#EEF0EE]">
```

- [ ] **Step 2: Re-run the focused regression to verify the dark card treatment passes**

Run:

```bash
npm test -- --run tests/app/home.test.tsx
```

Expected: PASS with the dark card shell, light text, and preserved image panel behavior covered by the home-page regression.

- [ ] **Step 3: Commit the focused implementation**

```bash
git add components/landing/work-gallery.tsx tests/app/home.test.tsx
git commit -m "feat: darken work gallery cards"
```

### Task 3: Run full verification for the work-gallery card refresh

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
