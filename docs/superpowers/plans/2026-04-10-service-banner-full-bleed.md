# Service Banner Full-Bleed Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the `HOW CAN WE SERVE YOU?` banner background full-bleed with no left or right gaps while increasing the black overlay to 60% opacity and preserving the current content alignment.

**Architecture:** Keep the section wrapper and submarine alignment container in place, but break the banner media frame out of the centered max-width wrapper by using a viewport-width full-bleed shell with an inner content container for the heading and toggle. Lock the full-bleed shell and new overlay opacity in the home-page regression before applying the minimal layout change.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Jest Testing Library, ESLint

---

### Task 1: Lock the full-bleed banner and overlay opacity contract

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
    const serviceBannerShell = screen.getByTestId("service-banner-shell");

    expect(serviceBannerShell).toHaveClass("relative");
    expect(serviceBannerShell).toHaveClass("left-1/2");
    expect(serviceBannerShell).toHaveClass("w-screen");
    expect(serviceBannerShell).toHaveClass("-translate-x-1/2");
    expect(serviceVideoOverlay).toHaveClass("bg-black/[0.60]");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the current banner has no `service-banner-shell` test hook and the overlay still uses `bg-black/[0.44]`.

### Task 2: Apply the full-bleed shell and darker overlay

**Files:**
- Modify: `components/landing/service-banner.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the minimal implementation**

```tsx
      <div
        data-testid="service-banner-shell"
        className="relative left-1/2 w-screen -translate-x-1/2"
      >
        <div className="relative min-h-[280px] overflow-hidden rounded-[2px] sm:min-h-[340px] md:min-h-[520px] lg:min-h-[596px]">
          <ServiceBannerVideo />
          <div
            data-testid="service-banner-video-overlay"
            className="absolute inset-0 bg-black/[0.60]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,84,160,0.15),rgba(35,84,160,0.05))]" />
          <div className="absolute inset-0 mx-auto max-w-[1310px]">
            <h2 className="absolute left-5 top-5 max-w-[240px] text-[26px] font-medium leading-none tracking-[0.01em] text-white sm:left-7 sm:top-7 sm:max-w-[320px] sm:text-[34px] md:left-[72px] md:top-[64px] md:max-w-[520px] md:text-[42px] lg:left-[103px] lg:top-[88px] lg:max-w-[616px] lg:text-[48px]">
              HOW CAN WE SERVE YOU?
            </h2>
            <ServiceOptionsToggle />
          </div>
        </div>
      </div>
```

- [ ] **Step 2: Run the focused test to verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the full-bleed shell hook and `bg-black/[0.60]` overlay assertion green, while the existing service toggle and submarine assertions still pass.

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
