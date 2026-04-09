# Work Gallery Editorial Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the `OUR WORK` section as a Paper-inspired editorial carousel with four richer cards that auto-scroll horizontally and still support manual scroll/drag interaction.

**Architecture:** First update the home-page regression to expect a carousel structure instead of a 2x2 grid. Then extend the work-gallery content model with the editorial fields the selected Paper card requires, and replace the static grid with a client-side carousel that duplicates the sequence for seamless looping while keeping only four real project records.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### File Structure

- Modify: `lib/content.ts` - extend the four `workGallery.projects` entries with editorial metadata and body copy.
- Modify: `components/landing/work-gallery.tsx` - replace the grid with a Paper-style editorial carousel, add auto-scroll/manual-drag behavior, masks, and CTA placement.
- Modify: `tests/app/home.test.tsx` - swap the grid test for carousel contract assertions.
- Modify: `app/globals.css` - add a small utility to hide the horizontal scrollbar cleanly if needed.

### Task 1: Lock the editorial carousel contract with a failing test

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Replace the work-gallery regression**

```tsx
  it("renders the work gallery as an editorial carousel with masks and a CTA", () => {
    render(<Home />);

    const cards = screen.getAllByTestId("work-gallery-card");
    const carousel = screen.getByTestId("work-gallery-carousel");
    const track = screen.getByTestId("work-gallery-track");
    const cta = screen.getByRole("link", { name: /view all projects/i });

    expect(cards).toHaveLength(4);
    expect(carousel).toHaveClass("overflow-x-auto");
    expect(track).toHaveClass("flex");
    expect(track).toHaveClass("w-max");
    expect(screen.getByTestId("work-gallery-left-mask")).toBeInTheDocument();
    expect(screen.getByTestId("work-gallery-right-mask")).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "#portfolio");
  });
```

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the current section still renders a static grid and has no carousel container, track, or masks.

### Task 2: Extend the content model for the editorial card format

**Files:**
- Modify: `lib/content.ts`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Add the richer editorial fields to each project**

```ts
  projects: [
    {
      id: "firecrawl-1",
      name: "Firecrawl",
      meta: "Website · Branding",
      date: "September 4, 2025",
      description: "A sharper brand and product story system designed to make launch moments easier to trust and easier to share.",
      ctaLabel: "View Project",
      image: "/images/work-firecrawl.png",
      imageClassName: "object-contain object-center scale-[1.12]",
    },
    ...
  ],
```

- [ ] **Step 2: Keep the CTA config intact**

```ts
  cta: {
    label: "View All Projects",
    href: "#portfolio",
  },
```

### Task 3: Replace the grid with the editorial carousel

**Files:**
- Modify: `components/landing/work-gallery.tsx`
- Modify: `app/globals.css`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Convert the component to a client component and build the looping carousel state**

```tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
```

```tsx
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ pointerId: number | null; startX: number; startScrollLeft: number }>({
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
  });
  const [isPaused, setIsPaused] = useState(false);
```

- [ ] **Step 2: Add the auto-scroll loop with seamless reset**

```tsx
  useEffect(() => {
    const node = carouselRef.current;

    if (!node) {
      return;
    }

    const halfWidth = node.scrollWidth / 2;
    node.scrollLeft = halfWidth;

    let frameId = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused) {
        node.scrollLeft -= delta * 0.03;

        if (node.scrollLeft <= 0) {
          node.scrollLeft += halfWidth;
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [isPaused]);
```

- [ ] **Step 3: Add pointer and scroll pause handling for manual control**

```tsx
  const pauseTemporarily = () => {
    setIsPaused(true);
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setIsPaused(false), 1200);
  };
```

```tsx
  onPointerDown={...}
  onPointerMove={...}
  onPointerUp={...}
  onPointerCancel={...}
  onScroll={pauseTemporarily}
```

- [ ] **Step 4: Render the Paper-style editorial cards inside a duplicated track**

```tsx
        <div className="relative">
          <div data-testid="work-gallery-left-mask" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-[linear-gradient(90deg,#FDFCF4,rgba(253,252,244,0))] sm:w-16" />
          <div data-testid="work-gallery-right-mask" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-[linear-gradient(270deg,#FDFCF4,rgba(253,252,244,0))] sm:w-16" />
          <div
            ref={carouselRef}
            data-testid="work-gallery-carousel"
            className="work-gallery-scrollbar relative overflow-x-auto overscroll-x-contain"
          >
            <div data-testid="work-gallery-track" className="flex w-max gap-6 pr-6 sm:gap-8 sm:pr-8">
              {[...workGallery.projects, ...workGallery.projects].map((project, index) => {
                const isClone = index >= workGallery.projects.length;

                return (
                  <article
                    key={`${project.id}-${isClone ? "clone" : "real"}`}
                    data-testid={isClone ? undefined : "work-gallery-card"}
                    aria-hidden={isClone}
                    className="w-[min(88vw,900px)] shrink-0 rounded-[28px] bg-white px-5 py-5 shadow-[0_24px_60px_rgba(34,47,48,0.08)] sm:px-8 sm:py-8"
                  >
```

- [ ] **Step 5: Match the editorial layout pattern inside each card**

```tsx
                    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.95fr)] lg:items-stretch">
                      <div className="relative aspect-[750/530] overflow-hidden rounded-[20px] bg-[#EEF0EE]">
                        <Image ... />
                      </div>
                      <div className="flex min-h-full flex-col justify-between gap-8 py-2 lg:px-2">
                        <div className="space-y-6">
                          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#222F30]/50 sm:text-[12px]">
                            {project.date}
                          </p>
                          <div className="space-y-4">
                            <h3 className="max-w-[12ch] text-[30px] leading-[0.95] tracking-[-0.04em] text-[#222F30]/85 sm:text-[38px]">
                              {project.name}
                            </h3>
                            <p className="max-w-[48ch] text-[15px] leading-6 text-[#222F30]/78 sm:text-[17px] sm:leading-7">
                              {project.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-end justify-between gap-4 border-t border-black/8 pt-5">
                          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#222F30]/75 sm:text-[12px]">
                            {project.ctaLabel}
                          </span>
                          <span className="text-[12px] uppercase tracking-[0.16em] text-[#222F30]/45">
                            {project.meta}
                          </span>
                        </div>
                      </div>
                    </div>
```

- [ ] **Step 6: Add the scrollbar-hiding utility**

```css
.work-gallery-scrollbar {
  scrollbar-width: none;
}

.work-gallery-scrollbar::-webkit-scrollbar {
  display: none;
}
```

- [ ] **Step 7: Run the targeted test and verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the carousel structure assertions.

### Task 4: Verify the full app

**Files:**
- Modify: `lib/content.ts`
- Modify: `components/landing/work-gallery.tsx`
- Modify: `tests/app/home.test.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS with 0 failures.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS with 0 errors.

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: PASS and Next.js completes the production build successfully. If sandboxed Turbopack hits the known port-binding restriction, rerun outside the sandbox and capture that successful result.
