# Work Gallery CTA Navbar Treatment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the `View All Projects` CTA in the `OUR WORK` section use the exact same button treatment as the navbar `Book a Call` CTA.

**Architecture:** Keep the work gallery CTA in place and update only its styling contract. Add a focused regression that asserts the same class and inline-style values used by the navbar CTA, then apply the minimal button-style change in `work-gallery.tsx`.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Jest Testing Library, ESLint

---

### Task 1: Lock the navbar CTA visual contract on the work gallery CTA

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
    expect(cta).toHaveClass("inline-flex");
    expect(cta).toHaveClass("items-center");
    expect(cta).toHaveClass("justify-center");
    expect(cta).toHaveClass("whitespace-nowrap");
    expect(cta).toHaveClass("text-white");
    expect(cta).toHaveStyle({
      paddingInline: "12px",
      paddingBlock: "12px",
      borderRadius: "8px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#FFFFFF29",
      fontSize: "16px",
      lineHeight: "20px",
      fontWeight: "600",
      fontFamily: '"Geist-SemiBold", "Geist", system-ui, sans-serif',
    });
    expect(cta.getAttribute("style")).toContain(
      "linear-gradient(in oklab 180deg, oklab(0.431 -0.018 -0.204) 1.39%, oklab(0.513 -0.023 -0.216) 101.39%)",
    );
    expect(cta.getAttribute("style")).toContain(
      "#FFFFFF14 0px 0.5px 0.5px inset, #2157E033 0px 1px 1px, #2157E033 0px 1px 1px, #2157E066 0px 2px 5px -2px, #0F64F2 0px 0px 0px 1px",
    );
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the current work gallery CTA still uses the dark solid pill classes and does not match the navbar CTA style contract.

### Task 2: Apply the navbar CTA treatment to the work gallery CTA

**Files:**
- Modify: `components/landing/work-gallery.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the minimal implementation**

```tsx
          <a
            href={workGallery.cta.href}
            className="inline-flex items-center justify-center whitespace-nowrap text-white transition-transform hover:-translate-y-0.5"
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
              fontSize: "16px",
              lineHeight: "20px",
              fontWeight: 600,
              fontFamily: '"Geist-SemiBold", "Geist", system-ui, sans-serif',
            }}
          >
            {workGallery.cta.label}
          </a>
```

- [ ] **Step 2: Run the focused test to verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the work gallery CTA matching the navbar CTA visual contract and the existing carousel assertions still green.

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
