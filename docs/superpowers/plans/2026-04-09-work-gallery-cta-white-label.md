# Work Gallery CTA White Label Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lock the `View All Projects` CTA label in the `OUR WORK` section to pure white while preserving the existing navbar-matched button treatment.

**Architecture:** Keep the CTA markup and navbar-style treatment intact. Add a focused regression for the explicit white text color, then apply the minimal inline `color` style to the existing CTA.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Jest Testing Library, ESLint

---

### Task 1: Lock the white-label contract with a failing regression

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
    expect(cta).toHaveStyle({
      color: "#FFFFFF",
    });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the current work gallery CTA does not explicitly set `color: "#FFFFFF"` in its inline style contract.

### Task 2: Add the explicit white text lock to the work gallery CTA

**Files:**
- Modify: `components/landing/work-gallery.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the minimal implementation**

```tsx
            style={{
              paddingInline: "12px",
              paddingBlock: "12px",
              borderRadius: "8px",
              backgroundImage:
                "linear-gradient(in oklab 180deg, oklab(43.1% -0.018 -0.204) 1.39%, oklab(51.3% -0.023 -0.216) 101.39%)",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#FFFFFF29",
              boxShadow:
                "#FFFFFF14 0px 0.5px 0.5px inset, #2157E033 0px 1px 1px, #2157E033 0px 1px 1px, #2157E066 0px 2px 5px -2px, #0F64F2 0px 0px 0px 1px",
              color: "#FFFFFF",
              fontSize: "16px",
              lineHeight: "20px",
              fontWeight: 600,
              fontFamily: '"Geist-SemiBold", "Geist", system-ui, sans-serif',
            }}
```

- [ ] **Step 2: Run the focused test to verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the CTA still matching the navbar treatment and now explicitly asserting white text.

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
