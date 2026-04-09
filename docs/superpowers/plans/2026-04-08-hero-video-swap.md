# Hero Video Swap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hero background video with the provided MP4 while keeping a repo-local source copy and serving an optimized delivery asset.

**Architecture:** Keep the hero component behavior unchanged and swap only the video asset path. First update the hero regression to expect the new MP4 path, then copy the original file into the repo, generate an optimized delivery MP4, and finally point the hero component at that optimized asset.

**Tech Stack:** Next.js 16, React 19, Vitest, Testing Library, FFmpeg

---

### File Structure

- Modify: `components/landing/hero.tsx` - switch the hero video source from the existing WebM to the optimized MP4.
- Modify: `tests/app/home.test.tsx` - update the hero regression to expect the new MP4 asset path.
- Create: `public/videos/source/hero-background-source.mp4` - repo-local source copy of the user-provided file.
- Create: `public/videos/hero-background.mp4` - optimized delivery asset used by the hero.

### Task 1: Lock the hero swap with a failing test

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test expectation**

```tsx
  it("keeps the hero locked to a single viewport with a looping background video and no submarine image", () => {
    render(<Home />);

    const heroSection = screen.getByTestId("hero-section");
    const heroVideo = screen.getByTestId("hero-background-video");
    const heroContent = screen.getByTestId("hero-content");

    expect(heroSection).toHaveClass("h-[100svh]");
    expect(heroSection).toHaveClass("min-h-[100svh]");
    expect(heroContent).toHaveClass("-translate-y-8");
    expect(heroContent).toHaveClass("sm:-translate-y-12");
    expect(heroContent).toHaveClass("md:-translate-y-16");
    expect(heroContent).toHaveClass("lg:-translate-y-20");
    expect(heroVideo).toHaveAttribute("autoplay");
    expect(heroVideo).toHaveAttribute("loop");
    expect(heroVideo).toHaveAttribute("playsinline");
    expect(heroVideo).toHaveAttribute("src", "/videos/hero-background.mp4");
    expect(heroVideo).toHaveProperty("muted", true);
    expect(screen.queryByTestId("hero-submarine-frame")).not.toBeInTheDocument();
    expect(screen.queryByTestId("hero-submarine-image")).not.toBeInTheDocument();
  });
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the hero component still points at `/videos/hero-background.webm`.

### Task 2: Add the source copy, create the optimized MP4, and update the component

**Files:**
- Create: `public/videos/source/hero-background-source.mp4`
- Create: `public/videos/hero-background.mp4`
- Modify: `components/landing/hero.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Copy the provided asset into the repo as the local source copy**

Run:

```bash
cp /Users/kairen/Downloads/tmpxawfkllt.mp4 public/videos/source/hero-background-source.mp4
```

Expected: `public/videos/source/hero-background-source.mp4` exists and matches the user-provided source file.

- [ ] **Step 2: Generate the optimized delivery MP4**

Run:

```bash
ffmpeg -y -i public/videos/source/hero-background-source.mp4 -an -vf "scale='min(1440,iw)':-2" -c:v libx264 -preset medium -crf 28 -movflags +faststart public/videos/hero-background.mp4
```

Expected: `public/videos/hero-background.mp4` exists and is smaller than the original source file while staying visually usable as a background loop.

- [ ] **Step 3: Update the hero component to use the optimized MP4**

```tsx
      <video
        data-testid="hero-background-video"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/videos/hero-background.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
```

- [ ] **Step 4: Run the targeted test to verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the updated hero video path assertion.

### Task 3: Verify the full app

**Files:**
- Modify: `components/landing/hero.tsx`
- Modify: `tests/app/home.test.tsx`
- Create: `public/videos/source/hero-background-source.mp4`
- Create: `public/videos/hero-background.mp4`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS with 0 failures.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS with 0 errors.

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: PASS and Next.js completes the production build successfully. If sandboxed Turbopack hits the known port-binding restriction, rerun outside the sandbox and capture that successful result.
