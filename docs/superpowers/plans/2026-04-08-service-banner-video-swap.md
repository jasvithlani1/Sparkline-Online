# Service Banner Video Swap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `HOW CAN WE SERVE YOU?` background media set with the provided MP4, keeping a repo-local source copy and optimized delivery assets.

**Architecture:** First update the service-banner regression to expect the new poster and MP4-only media contract, then copy the provided source into the repo, generate the optimized delivery MP4 and poster, and finally point the banner component at those new assets. The section behavior stays unchanged apart from the media paths.

**Tech Stack:** Next.js 16, React 19, Vitest, Testing Library, FFmpeg

---

### File Structure

- Modify: `components/landing/service-banner-video.tsx` - point the banner video component at the new poster and MP4-only source set.
- Modify: `tests/app/home.test.tsx` - update the service-banner regression to assert the new media contract.
- Create: `public/videos/source/service-banner-background-source.mp4` - repo-local copy of the user-provided source file.
- Create: `public/videos/service-banner-background.mp4` - optimized delivery asset used by the banner.
- Create: `public/images/service-banner-background-poster.webp` - poster extracted from the new video.

### Task 1: Lock the new service-banner media contract with a failing test

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test expectation**

```tsx
  it("renders the service banner background video with the new poster and mp4 source", () => {
    render(<Home />);

    const serviceVideo = screen.getByTestId("service-banner-video");
    const serviceVideoOverlay = screen.getByTestId("service-banner-video-overlay");
    const mp4Source = serviceVideo.querySelector('source[type="video/mp4"]');
    const webmSource = serviceVideo.querySelector('source[type="video/webm"]');

    expect(serviceVideo).toHaveAttribute("poster", "/images/service-banner-background-poster.webp");
    expect(serviceVideo).toHaveAttribute("loop");
    expect(serviceVideo).toHaveAttribute("playsinline");
    expect(serviceVideo).toHaveAttribute("preload", "metadata");
    expect(serviceVideo).toHaveProperty("muted", true);
    expect(serviceVideoOverlay).toHaveClass("bg-black/[0.44]");
    expect(mp4Source).toHaveAttribute("src", "/videos/service-banner-background.mp4");
    expect(webmSource).toBeNull();
  });
```

- [ ] **Step 2: Run the targeted test and verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because the current component still references the old ocean poster and WebM/MP4 asset names.

### Task 2: Add the source copy, generate optimized assets, and update the component

**Files:**
- Create: `public/videos/source/service-banner-background-source.mp4`
- Create: `public/videos/service-banner-background.mp4`
- Create: `public/images/service-banner-background-poster.webp`
- Modify: `components/landing/service-banner-video.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Copy the provided asset into the repo as the source copy**

Run:

```bash
cp /Users/kairen/Downloads/tmp14tqi5vl.mp4 public/videos/source/service-banner-background-source.mp4
```

Expected: `public/videos/source/service-banner-background-source.mp4` exists and matches the provided source file.

- [ ] **Step 2: Generate the optimized delivery MP4**

Run:

```bash
ffmpeg -y -i public/videos/source/service-banner-background-source.mp4 -an -vf "scale='min(1600,iw)':-2" -c:v libx264 -preset medium -crf 28 -movflags +faststart public/videos/service-banner-background.mp4
```

Expected: `public/videos/service-banner-background.mp4` exists and is materially smaller than the 16 MB source while remaining visually usable as a looping background.

- [ ] **Step 3: Generate the poster image from the new video**

Run:

```bash
ffmpeg -y -i public/videos/source/service-banner-background-source.mp4 -vf "select=eq(n\\,24),scale='min(1600,iw)':-2" -vframes 1 public/images/service-banner-background-poster.webp
```

Expected: `public/images/service-banner-background-poster.webp` exists and visually matches the new banner footage.

- [ ] **Step 4: Update the banner component to use the new assets**

```tsx
    <video
      ref={videoRef}
      data-testid="service-banner-video"
      className="absolute inset-0 h-full w-full object-cover object-center"
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/service-banner-background-poster.webp"
      aria-hidden="true"
    >
      <source src="/videos/service-banner-background.mp4" type="video/mp4" />
    </video>
```

- [ ] **Step 5: Run the targeted test and verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS with the updated service-banner asset assertions.

### Task 3: Verify the full app

**Files:**
- Modify: `components/landing/service-banner-video.tsx`
- Modify: `tests/app/home.test.tsx`
- Create: `public/videos/source/service-banner-background-source.mp4`
- Create: `public/videos/service-banner-background.mp4`
- Create: `public/images/service-banner-background-poster.webp`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS with 0 failures.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS with 0 errors.

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: PASS and Next.js completes the production build successfully. If sandboxed Turbopack hits the known port-binding restriction, rerun outside the sandbox and capture that successful result.
