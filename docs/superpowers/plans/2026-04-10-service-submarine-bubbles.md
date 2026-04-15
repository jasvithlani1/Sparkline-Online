# Service Submarine Bubbles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a subtle continuous bubble effect rising from the service submarine antennas without changing the existing submarine image, layout footprint, or hover motion.

**Architecture:** Keep the current submarine image in `components/landing/service-banner.tsx` and layer a small decorative bubble overlay inside the same frame. Drive the motion with one reusable CSS keyframe in `app/globals.css`, then render a fixed array of 4 bubble spans with staggered timing and reduced-motion protection. Lock the behavior in `tests/app/home.test.tsx` before implementing it.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

## File Structure

- Modify: `tests/app/home.test.tsx` - extend the submarine regression to require a decorative bubble overlay and 4 bubble items while preserving the current image and hover assertions.
- Modify: `components/landing/service-banner.tsx` - add a small inline bubble descriptor array and render a `pointer-events-none` overlay positioned near the submarine antennas.
- Modify: `app/globals.css` - add the bubble keyframes and class used by the new overlay.

### Task 1: Lock the bubble overlay contract in tests

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

Replace the current submarine regression body with this version so it requires the bubble overlay:

```tsx
  it("keeps the service banner submarine oversized with a decorative bubble overlay", () => {
    render(<Home />);

    const submarineFrame = screen.getByTestId("service-submarine-frame");
    const submarineImage = within(submarineFrame).getByAltText("");
    const bubbleLayer = screen.getByTestId("service-submarine-bubbles");
    const bubbles = screen.getAllByTestId("service-submarine-bubble");

    expect(submarineFrame).toHaveClass("max-w-[340px]");
    expect(submarineFrame).toHaveClass("ml-auto");
    expect(submarineFrame).toHaveClass("mr-[calc((100vw-100%)/-2)]");
    expect(submarineFrame).toHaveClass("-mt-[6rem]");
    expect(submarineFrame).toHaveClass("h-[154px]");
    expect(submarineFrame).toHaveClass("sm:max-w-[440px]");
    expect(submarineFrame).toHaveClass("sm:h-[220px]");
    expect(submarineFrame).toHaveClass("sm:-mt-[8rem]");
    expect(submarineFrame).toHaveClass("md:max-w-[560px]");
    expect(submarineFrame).toHaveClass("md:h-[316px]");
    expect(submarineFrame).toHaveClass("md:-mt-[12rem]");
    expect(submarineFrame).toHaveClass("lg:max-w-[650px]");
    expect(submarineFrame).toHaveClass("lg:h-[367px]");
    expect(submarineFrame).toHaveClass("lg:-mt-[15.5rem]");
    expect(submarineFrame).toHaveClass("group/service-submarine");
    expect(submarineImage).toHaveClass("motion-reduce:transform-none");
    expect(submarineImage).toHaveClass("motion-safe:transition-transform");
    expect(submarineImage).toHaveClass("motion-safe:duration-500");
    expect(submarineImage).toHaveClass("motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]");
    expect(submarineImage).toHaveClass("group-hover/service-submarine:translate-x-3");
    expect(submarineImage).toHaveClass("group-hover/service-submarine:-translate-y-2");
    expect(submarineImage).toHaveClass("object-right");

    expect(bubbleLayer).toHaveClass("pointer-events-none");
    expect(bubbleLayer).toHaveClass("absolute");
    expect(bubbleLayer).toHaveClass("inset-0");
    expect(bubbleLayer).toHaveClass("motion-reduce:hidden");
    expect(bubbles).toHaveLength(4);
    expect(bubbles[0]).toHaveClass("service-submarine-bubble");
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/app/home.test.tsx -t "service banner submarine oversized with a decorative bubble overlay"`

Expected: FAIL because `service-submarine-bubbles` and `service-submarine-bubble` do not exist yet.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/app/home.test.tsx
git commit -m "test: require service submarine bubble overlay"
```

### Task 2: Add the bubble animation primitive

**Files:**
- Modify: `app/globals.css`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Add the reusable keyframes and class**

Append this CSS below the existing `@keyframes logo-marquee` block:

```css
@keyframes service-submarine-bubble {
  0% {
    opacity: 0;
    transform: translate3d(0, 8px, 0) scale(0.72);
  }

  20% {
    opacity: 0.55;
  }

  100% {
    opacity: 0;
    transform: translate3d(var(--bubble-drift-x, 0px), -34px, 0) scale(1.08);
  }
}

.service-submarine-bubble {
  animation-name: service-submarine-bubble;
  animation-duration: var(--bubble-duration, 4.6s);
  animation-timing-function: ease-out;
  animation-delay: var(--bubble-delay, 0s);
  animation-iteration-count: infinite;
  will-change: transform, opacity;
}
```

- [ ] **Step 2: Run the targeted test again**

Run: `npm test -- --run tests/app/home.test.tsx -t "service banner submarine oversized with a decorative bubble overlay"`

Expected: FAIL again, but now only because the overlay markup is still missing from the component.

- [ ] **Step 3: Commit the CSS primitive**

```bash
git add app/globals.css
git commit -m "feat: add service submarine bubble animation"
```

### Task 3: Render the bubble overlay in the submarine frame

**Files:**
- Modify: `components/landing/service-banner.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Add the bubble descriptor array and `CSSProperties` import**

Update the top of `components/landing/service-banner.tsx` like this:

```tsx
import type { CSSProperties } from "react";
import Image from "next/image";
import { ServiceOptionsToggle } from "@/components/landing/service-options-toggle";
import { ServiceBannerVideo } from "@/components/landing/service-banner-video";

const submarineBubbles: Array<{
  id: string;
  size: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
  driftX: string;
}> = [
  { id: "bubble-1", size: 10, left: "28%", top: "13%", delay: "0s", duration: "4.6s", driftX: "-6px" },
  { id: "bubble-2", size: 7, left: "30.5%", top: "10.5%", delay: "1.1s", duration: "4.1s", driftX: "5px" },
  { id: "bubble-3", size: 12, left: "32.5%", top: "8.5%", delay: "2.2s", duration: "4.9s", driftX: "-3px" },
  { id: "bubble-4", size: 8, left: "29.5%", top: "15.5%", delay: "3s", duration: "4.4s", driftX: "7px" },
];
```

- [ ] **Step 2: Render the overlay inside `service-submarine-frame`**

Insert this block before the existing `<Image ... />` in the submarine frame:

```tsx
          <div
            data-testid="service-submarine-bubbles"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 overflow-visible motion-reduce:hidden"
          >
            {submarineBubbles.map((bubble) => (
              <span
                key={bubble.id}
                data-testid="service-submarine-bubble"
                className="service-submarine-bubble absolute rounded-full border border-white/45 bg-white/25 shadow-[0_0_12px_rgba(255,255,255,0.18)]"
                style={
                  {
                    left: bubble.left,
                    top: bubble.top,
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                    "--bubble-delay": bubble.delay,
                    "--bubble-duration": bubble.duration,
                    "--bubble-drift-x": bubble.driftX,
                  } as CSSProperties
                }
              />
            ))}
          </div>
```

- [ ] **Step 3: Keep the existing image markup unchanged**

The image block should remain:

```tsx
          <Image
            src="/images/service-submarine.webp"
            alt=""
            fill
            sizes="(min-width: 1280px) 650px, (min-width: 768px) 560px, (min-width: 640px) 440px, 340px"
            className="h-full w-full object-contain object-right motion-reduce:transform-none motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service-submarine:translate-x-3 group-hover/service-submarine:-translate-y-2"
          />
```

- [ ] **Step 4: Run the targeted test to verify it passes**

Run: `npm test -- --run tests/app/home.test.tsx -t "service banner submarine oversized with a decorative bubble overlay"`

Expected: PASS

- [ ] **Step 5: Commit the markup**

```bash
git add components/landing/service-banner.tsx
git commit -m "feat: add service submarine bubble overlay"
```

### Task 4: Full verification

**Files:**
- Modify: none
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`

Expected: PASS with all Vitest suites green.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: PASS with the Next.js production build completing successfully.

- [ ] **Step 3: Commit the verified feature**

```bash
git add app/globals.css components/landing/service-banner.tsx tests/app/home.test.tsx
git commit -m "feat: add service submarine bubbles"
```
