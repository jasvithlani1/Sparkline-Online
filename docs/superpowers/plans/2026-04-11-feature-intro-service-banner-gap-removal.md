# Feature Intro To Service Banner Gap Removal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the visible seam between the Haven Demo intro card and the `HOW CAN WE SERVE YOU?` section so the two sections touch directly with no gap.

**Architecture:** Keep the change isolated to the outer section spacing classes in `components/landing/feature-intro.tsx` and `components/landing/service-banner.tsx`. Extend the existing home-page regression in `tests/app/home.test.tsx` to lock the updated padding contract without introducing brittle visual assertions.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

## File Structure

- Modify: `tests/app/home.test.tsx` - extend the home-page regression to assert the updated outer section padding classes.
- Modify: `components/landing/feature-intro.tsx` - remove bottom padding from the Haven Demo section.
- Modify: `components/landing/service-banner.tsx` - remove top padding from the services section.

### Task 1: Lock the no-gap spacing contract in tests

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

In the `renders the approved landing page sections and copy` test, add these assertions after the current `featureIntro` and `featureIntroContent` checks:

```tsx
    const servicesSection = screen.getByRole("heading", { name: /how can we serve you\?/i, level: 2 })
      .closest("section");

    expect(featureIntro).toHaveClass("pb-0");
    expect(featureIntro).toHaveClass("sm:pb-0");
    expect(featureIntro).toHaveClass("md:pb-0");
    expect(featureIntro).toHaveClass("lg:pb-0");
    expect(servicesSection).toHaveClass("pt-0");
    expect(servicesSection).toHaveClass("sm:pt-0");
    expect(servicesSection).toHaveClass("md:pt-0");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/app/home.test.tsx -t "renders the approved landing page sections and copy"`

Expected: FAIL because both sections still use top and bottom padding classes that create the visible gap.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/app/home.test.tsx
git commit -m "test: require no gap between intro and services"
```

### Task 2: Remove the adjacent outer paddings

**Files:**
- Modify: `components/landing/feature-intro.tsx`
- Modify: `components/landing/service-banner.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Update the Haven Demo section padding**

Change the `FeatureIntro` section class from:

```tsx
      className="bg-[#050C1E] px-5 py-12 sm:px-6 sm:py-14 md:px-8 md:py-18 lg:py-20"
```

to:

```tsx
      className="bg-[#050C1E] px-5 pt-12 pb-0 sm:px-6 sm:pt-14 sm:pb-0 md:px-8 md:pt-18 md:pb-0 lg:pt-20 lg:pb-0"
```

- [ ] **Step 2: Update the services section padding**

Change the `ServiceBanner` section class from:

```tsx
    <section id="services" className="bg-white px-5 py-8 sm:px-6 sm:py-10 md:px-8 md:py-14">
```

to:

```tsx
    <section id="services" className="bg-white px-5 pt-0 pb-8 sm:px-6 sm:pt-0 sm:pb-10 md:px-8 md:pt-0 md:pb-14">
```

- [ ] **Step 3: Run the targeted test to verify it passes**

Run: `npm test -- --run tests/app/home.test.tsx -t "renders the approved landing page sections and copy"`

Expected: PASS with the new spacing assertions green.

- [ ] **Step 4: Commit the implementation**

```bash
git add components/landing/feature-intro.tsx components/landing/service-banner.tsx tests/app/home.test.tsx
git commit -m "feat: remove intro to services gap"
```

### Task 3: Full verification

**Files:**
- Modify: none
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`

Expected: PASS with all Vitest suites green.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: PASS with the Next.js production build completing successfully.

- [ ] **Step 3: Commit the verified change set**

```bash
git add components/landing/feature-intro.tsx components/landing/service-banner.tsx tests/app/home.test.tsx
git commit -m "chore: verify intro to services gap removal"
```
