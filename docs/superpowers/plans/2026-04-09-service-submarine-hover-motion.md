# Service Submarine Hover Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a subtle hover-only slide-and-lift motion to the submarine in the `HOW CAN WE SERVE YOU?` section without changing its size or layout.

**Architecture:** Keep the existing submarine markup in `ServiceBanner` and attach the hover behavior through a dedicated class hook on the frame and image. Lock the hook in the home-page regression first, then add the minimal transition and reduced-motion-safe hover transform.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Jest Testing Library, ESLint

---

### Task 1: Lock the hover animation hook with a failing regression

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
    expect(submarineFrame).toHaveClass("group/service-submarine");
    expect(submarineImage).toHaveClass("motion-reduce:transform-none");
    expect(submarineImage).toHaveClass("motion-safe:transition-transform");
    expect(submarineImage).toHaveClass("motion-safe:duration-500");
    expect(submarineImage).toHaveClass("motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]");
    expect(submarineImage).toHaveClass("group-hover/service-submarine:translate-x-3");
    expect(submarineImage).toHaveClass("group-hover/service-submarine:-translate-y-2");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the current submarine frame and image do not expose the new hover animation classes.

### Task 2: Add the hover motion to the submarine

**Files:**
- Modify: `components/landing/service-banner.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the minimal implementation**

```tsx
        <div
          data-testid="service-submarine-frame"
          className="group/service-submarine pointer-events-auto relative ml-auto mr-[calc((100vw-100%)/-2)] -mt-[6rem] h-[154px] w-full max-w-[340px] sm:-mt-[8rem] sm:h-[220px] sm:max-w-[440px] md:-mt-[12rem] md:h-[316px] md:max-w-[560px] lg:-mt-[15.5rem] lg:h-[367px] lg:max-w-[650px]"
        >
          <Image
            src="/images/service-submarine.webp"
            alt=""
            fill
            sizes="(min-width: 1280px) 650px, (min-width: 768px) 560px, (min-width: 640px) 440px, 340px"
            className="object-contain object-right motion-reduce:transform-none motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service-submarine:translate-x-3 group-hover/service-submarine:-translate-y-2"
          />
        </div>
```

- [ ] **Step 2: Run the focused test to verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the existing submarine layout assertions and the new hover hook assertions all green.

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
