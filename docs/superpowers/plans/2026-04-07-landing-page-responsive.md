# Landing Page Responsive Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the full landing page render cleanly across standard mobile and tablet widths while preserving the current desktop look and section order.

**Architecture:** Keep the current page structure and tune responsiveness section-by-section with Tailwind classes inside the existing landing components. Extend the current home-page test only where layout behavior is already class-driven, then verify with the full test, lint, and build suite.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Vitest, Testing Library

---

### Task 1: Lock the responsive expectations in tests

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test updates**

```tsx
it("keeps the navbar compact and the hero readable on smaller screens", () => {
  render(<Home />);

  const brandLogo = screen.getByAltText(/sparkline marketing firm/i);
  const ctaButton = screen.getByRole("link", { name: /book a call/i });
  const heroContent = screen.getByTestId("hero-content");
  const heroHeading = screen.getByRole("heading", { level: 1 });

  expect(brandLogo).toHaveClass("w-[58px]");
  expect(brandLogo).toHaveClass("sm:w-[70px]");
  expect(brandLogo).toHaveClass("md:w-[84px]");
  expect(ctaButton).toHaveClass("text-[13px]");
  expect(ctaButton).toHaveClass("sm:text-[15px]");
  expect(heroContent).toHaveClass("-translate-y-8");
  expect(heroContent).toHaveClass("sm:-translate-y-12");
  expect(heroContent).toHaveClass("md:-translate-y-16");
  expect(heroHeading).toHaveClass("text-[48px]");
  expect(heroHeading).toHaveClass("sm:text-[72px]");
  expect(heroHeading).toHaveClass("md:text-[88px]");
});

it("keeps the service banner submarine oversized but responsive", () => {
  render(<Home />);

  const submarineFrame = screen.getByTestId("service-submarine-frame");

  expect(submarineFrame).toHaveClass("max-w-[300px]");
  expect(submarineFrame).toHaveClass("h-[128px]");
  expect(submarineFrame).toHaveClass("sm:max-w-[420px]");
  expect(submarineFrame).toHaveClass("sm:h-[188px]");
  expect(submarineFrame).toHaveClass("md:max-w-[560px]");
  expect(submarineFrame).toHaveClass("md:h-[316px]");
});
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the navbar, hero, and service banner still use the current larger-screen-biased classes.

### Task 2: Tune each landing section for mobile and tablet

**Files:**
- Modify: `components/landing/navbar.tsx`
- Modify: `components/landing/hero.tsx`
- Modify: `components/landing/feature-intro.tsx`
- Modify: `components/landing/service-banner.tsx`
- Modify: `components/landing/section-heading.tsx`
- Modify: `components/landing/logo-grid.tsx`
- Modify: `components/landing/work-gallery.tsx`
- Modify: `components/landing/footer.tsx`

- [ ] **Step 1: Tighten the navbar and hero spacing**

```tsx
// navbar
<header className="absolute inset-x-0 top-4 z-30 px-3 sm:px-4 md:top-5 md:px-6">
  <div className="glass-shell mx-auto flex w-full max-w-[1010px] items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-white sm:gap-4 sm:px-4 sm:py-3 md:px-5 md:py-4">
    <Image className="h-auto w-[58px] sm:w-[70px] md:w-[84px] lg:w-[91px]" />
    <a className="inline-flex items-center justify-center whitespace-nowrap text-[13px] text-white transition-transform hover:-translate-y-0.5 sm:text-[15px] md:text-base" />
  </div>
</header>

// hero
<div data-testid="hero-content" className="relative z-20 mx-auto flex h-full max-w-[1440px] -translate-y-8 flex-col items-center justify-center px-4 pt-24 text-center sm:-translate-y-12 sm:px-6 sm:pt-28 md:-translate-y-16 md:px-8 md:pt-32 lg:-translate-y-20 lg:pt-36">
  <h1 className="hero-copy max-w-[860px] text-[48px] leading-[1.02] tracking-[-0.04em] sm:text-[72px] md:mt-10 md:text-[88px] lg:mt-14 lg:text-[96px]">
```

- [ ] **Step 2: Rebalance the content sections**

```tsx
// feature intro
<section className="bg-[#FDFCF4] px-5 py-12 sm:px-6 sm:py-14 md:px-8 md:py-18 lg:py-20">
  <div className="mx-auto grid max-w-[1390px] gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,415px)] md:gap-10 md:justify-between">

// shared section heading
<div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center sm:gap-5 md:gap-6">
  <p className="text-[11px] uppercase tracking-[0.24em] text-black/35 sm:text-sm sm:tracking-[0.3em]">{eyebrow}</p>
  <div className="space-y-1 text-[28px] leading-[1.12] text-black/80 sm:text-[32px] sm:leading-[1.16] md:text-[40px] md:leading-[1.18]">

// logo grid
<section className="bg-[#FDFCF4] px-5 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24">
  <div className="mx-auto flex max-w-[1208px] flex-col items-center gap-12 sm:gap-14 md:gap-16">
    <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4">

// work gallery
<section id="portfolio" className="bg-[#FDFCF4] px-5 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24">
  <div className="mx-auto flex max-w-[1208px] flex-col gap-10 sm:gap-12 md:gap-14">
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
      <article className="space-y-3 sm:space-y-4">
```

- [ ] **Step 3: Refine the service banner and footer responsiveness**

```tsx
// service banner
<section id="services" className="bg-[#FDFCF4] px-5 py-8 sm:px-6 sm:py-10 md:px-8 md:py-14">
  <div className="relative min-h-[240px] overflow-hidden rounded-[2px] sm:min-h-[340px] md:min-h-[520px] lg:min-h-[596px]">
    <h2 className="absolute left-5 top-5 max-w-[240px] text-[26px] font-medium leading-none tracking-[0.01em] text-white sm:left-7 sm:top-7 sm:max-w-[320px] sm:text-[34px] md:left-[72px] md:top-[64px] md:max-w-[520px] md:text-[42px] lg:left-[103px] lg:top-[88px] lg:max-w-[616px] lg:text-[48px]">
  <div data-testid="service-submarine-frame" className="pointer-events-none relative ml-auto mr-[calc((100vw-100%)/-2)] -mt-[4.5rem] h-[128px] w-full max-w-[300px] sm:-mt-[5.75rem] sm:h-[188px] sm:max-w-[420px] md:-mt-[12rem] md:h-[316px] md:max-w-[560px] lg:-mt-[15.5rem] lg:h-[367px] lg:max-w-[650px]">

// footer
<footer id="contact-us" className="bg-[#273854] px-5 py-10 text-[#FCF4EA] sm:px-6 sm:py-12 md:px-8 md:py-14">
  <div className="mx-auto flex max-w-[1440px] flex-col gap-12 sm:gap-14 md:gap-16">
    <div className="grid gap-10 md:gap-12 lg:grid-cols-[1fr_220px_220px]">
    <div className="grid gap-8 md:gap-10 lg:grid-cols-[1fr_180px_1fr] lg:items-end">
```

- [ ] **Step 4: Run the targeted test to verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS

### Task 3: Verify the full app after the responsive pass

**Files:**
- Modify: `tests/app/home.test.tsx`
- Modify: `components/landing/navbar.tsx`
- Modify: `components/landing/hero.tsx`
- Modify: `components/landing/feature-intro.tsx`
- Modify: `components/landing/service-banner.tsx`
- Modify: `components/landing/section-heading.tsx`
- Modify: `components/landing/logo-grid.tsx`
- Modify: `components/landing/work-gallery.tsx`
- Modify: `components/landing/footer.tsx`

- [ ] **Step 1: Run the full verification suite**

Run: `npm test`
Expected: PASS

Run: `npm run lint`
Expected: PASS

Run: `npm run build`
Expected: PASS
