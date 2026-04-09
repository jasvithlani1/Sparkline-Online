# Work Gallery Dot Indicator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a four-dot indicator row below the `OUR WORK` carousel and above the CTA, with the active card's dot turning blue and dot clicks jumping to the corresponding card.

**Architecture:** Keep the existing carousel and editorial cards intact, and add a small active-index state plus a dot navigation row. First extend the existing work-gallery regression to assert the pager contract, then compute the active real-card index from scroll position and wire the dots to scroll the carousel to the selected card.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Vitest, Testing Library

---

### File Structure

- Modify: `components/landing/work-gallery.tsx` - add active-card tracking and the four-dot indicator row.
- Modify: `tests/app/home.test.tsx` - extend the work-gallery regression with dot indicator assertions.

### Task 1: Lock the dot-indicator contract with a failing test

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Extend the work-gallery regression**

```tsx
    const dots = screen.getAllByTestId("work-gallery-dot");

    expect(screen.getByTestId("work-gallery-dot-nav")).toBeInTheDocument();
    expect(dots).toHaveLength(4);
    expect(dots[0]).toHaveClass("bg-[#2C6BFF]");
    expect(dots[1]).toHaveClass("bg-black/18");
```

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the dot navigation row does not exist yet.

### Task 2: Add the indicator row and active-card tracking

**Files:**
- Modify: `components/landing/work-gallery.tsx`
- Modify: `tests/app/home.test.tsx`

- [ ] **Step 1: Add active-index state and a helper to derive the visible real card**

```tsx
  const [activeIndex, setActiveIndex] = useState(0);
```

```tsx
  const updateActiveIndex = () => {
    const node = carouselRef.current;

    if (!node) {
      return;
    }

    const sequenceWidth = node.scrollWidth / 2;
    const itemWidth = sequenceWidth / workGallery.projects.length;
    const normalizedScroll = ((node.scrollLeft % sequenceWidth) + sequenceWidth) % sequenceWidth;
    const nextIndex = Math.round((sequenceWidth - normalizedScroll) / itemWidth) % workGallery.projects.length;

    setActiveIndex(nextIndex);
  };
```

- [ ] **Step 2: Call the active-index updater during motion and manual interaction**

```tsx
        updateActiveIndex();
```

Place it after scroll normalization in the animation loop and pointer move / dot jump paths.

- [ ] **Step 3: Render the dot indicator row between the carousel and CTA**

```tsx
        <div data-testid="work-gallery-dot-nav" className="flex justify-center gap-3">
          {workGallery.projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              data-testid="work-gallery-dot"
              aria-label={`Go to ${project.name}`}
              aria-pressed={activeIndex === index}
              onClick={() => jumpToIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                activeIndex === index ? "bg-[#2C6BFF]" : "bg-black/18"
              }`}
            />
          ))}
        </div>
```

- [ ] **Step 4: Add the jump helper for dot clicks**

```tsx
  const jumpToIndex = (index: number) => {
    const node = carouselRef.current;

    if (!node) {
      return;
    }

    const sequenceWidth = node.scrollWidth / 2;
    const itemWidth = sequenceWidth / workGallery.projects.length;

    pauseTemporarily();
    node.scrollTo({
      left: sequenceWidth - itemWidth * index,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };
```

- [ ] **Step 5: Run the targeted test and verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS.

### Task 3: Verify the full app

**Files:**
- Modify: `components/landing/work-gallery.tsx`
- Modify: `tests/app/home.test.tsx`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS with 0 failures.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS with 0 errors.
