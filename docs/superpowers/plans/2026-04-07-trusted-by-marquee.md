# Trusted By Marquee Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static trusted-by logo grid with two responsive infinite marquee rows that move in opposite directions and fade at both edges.

**Architecture:** Keep the section heading intact and convert the logo area into a CSS-driven marquee. Add a focused test for the new marquee structure first, then update the logo section component and global styles with reusable animation classes.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### Task 1: Lock the marquee structure with a failing test

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing marquee test**

```tsx
  it("renders trusted-by logos as two masked marquee rows with opposite directions", () => {
    render(<Home />);

    const marquee = screen.getByTestId("trusted-by-marquee");
    const rowOne = screen.getByTestId("trusted-by-row-0");
    const rowTwo = screen.getByTestId("trusted-by-row-1");

    expect(marquee).toHaveClass("overflow-hidden");
    expect(rowOne).toHaveClass("logo-marquee-track");
    expect(rowTwo).toHaveClass("logo-marquee-track--reverse");
    expect(screen.getByTestId("trusted-by-marquee-left-mask")).toBeInTheDocument();
    expect(screen.getByTestId("trusted-by-marquee-right-mask")).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the current section still renders a static grid without marquee rows or masks.

### Task 2: Replace the logo grid with animated marquee rows

**Files:**
- Modify: `components/landing/logo-grid.tsx`
- Modify: `app/globals.css`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Add reusable marquee animation styles**

```css
@keyframes logo-marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}

.logo-marquee-track {
  display: flex;
  width: max-content;
  animation: logo-marquee 30s linear infinite;
  will-change: transform;
}

.logo-marquee-track--reverse {
  animation-direction: reverse;
}
```

- [ ] **Step 2: Replace the grid with two duplicated marquee rows**

```tsx
const marqueeRows = [false, true] as const;

<div data-testid="trusted-by-marquee" className="relative w-full overflow-hidden">
  ...
  {marqueeRows.map((isReverse, index) => (
    <div key={index} data-testid={`trusted-by-row-${index}`} className={...}>
      {[0, 1].map((copyIndex) => (
        <div key={copyIndex} aria-hidden={copyIndex === 1}>
          ...
        </div>
      ))}
    </div>
  ))}
</div>
```

- [ ] **Step 3: Run the targeted test and verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the new marquee structure test and existing home-page assertions still green.

### Task 3: Verify the whole app

**Files:**
- Modify: `app/globals.css`
- Modify: `components/landing/logo-grid.tsx`
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
