# Hero Bottom Artwork Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the provided underwater artwork as a bottom-aligned decorative strip in the hero and keep a repo-local copy of the asset.

**Architecture:** Copy the supplied PNG into `public/images`, then add a dedicated bottom artwork layer in `Hero` using a local image path and a stable test hook. Lock the new hero artwork contract in the home-page regression before changing the component.

**Tech Stack:** Next.js, React, TypeScript, Next Image, Jest Testing Library, ESLint

---

### Task 1: Lock the hero artwork contract with a failing regression

**Files:**
- Modify: `tests/app/home.test.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
    const heroBottomArtwork = screen.getByTestId("hero-bottom-artwork");
    const heroBottomArtworkImage = screen.getByAltText("");

    expect(heroBottomArtwork).toHaveClass("pointer-events-none");
    expect(heroBottomArtwork).toHaveClass("absolute");
    expect(heroBottomArtwork).toHaveClass("inset-x-0");
    expect(heroBottomArtwork).toHaveClass("bottom-0");
    expect(heroBottomArtworkImage).toHaveAttribute("src", "/images/hero-bottom-artwork.png");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the hero currently has no bottom artwork layer or local artwork asset reference.

### Task 2: Copy the artwork into the repo and render it in the hero

**Files:**
- Create: `public/images/hero-bottom-artwork.png`
- Modify: `components/landing/hero.tsx`
- Verify: `tests/app/home.test.tsx`

- [ ] **Step 1: Copy the local source asset into the repo**

Run: `cp '/Users/kairen/Downloads/bottom (1).png' public/images/hero-bottom-artwork.png`
Expected: `public/images/hero-bottom-artwork.png` exists as the repo-local copy.

- [ ] **Step 2: Write the minimal implementation**

```tsx
import Image from "next/image";

export function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="hero-rays hero-fade relative h-[100svh] min-h-[100svh] overflow-hidden bg-[#060B1A] text-white"
    >
      <video
        data-testid="hero-background-video"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/videos/hero-background.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(82,103,160,0.25),transparent_42%)]" />
      <div className="absolute inset-x-0 top-0 h-[340px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_85%)] opacity-40" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-[140px] bg-[linear-gradient(180deg,rgba(6,11,26,0),rgba(6,11,26,0.98))]" />
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(6,11,26,0.25)_0%,rgba(6,11,26,0.16)_38%,rgba(6,11,26,0.72)_100%)]" />
      <div
        data-testid="hero-bottom-artwork"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center px-4 sm:px-6 md:px-8"
      >
        <Image
          src="/images/hero-bottom-artwork.png"
          alt=""
          width={5056}
          height={1584}
          priority
          className="h-auto w-full max-w-[1680px] opacity-95"
        />
      </div>
      <div
        data-testid="hero-content"
        className="relative z-20 mx-auto flex h-full max-w-[1440px] -translate-y-8 flex-col items-center justify-center px-4 pt-24 text-center sm:-translate-y-12 sm:px-6 sm:pt-28 md:-translate-y-16 md:px-8 md:pt-32 lg:-translate-y-20 lg:pt-36"
      >
        <div className="flex flex-col items-center">
          <h1 className="hero-copy max-w-[860px] text-[48px] leading-[1.02] tracking-[-0.04em] sm:text-[72px] md:mt-10 md:text-[88px] lg:mt-14 lg:text-[96px]">
            <span className="block">
              <span className="inline-block">Creative Marketing</span>
            </span>
            <span className="block">
              <span data-testid="hero-second-line" className="inline-block pb-[0.08em]">
                Supercharged
              </span>
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run the focused test to verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the new hero artwork hook and local asset path assertions green, while the existing hero video/layout assertions still pass.

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
