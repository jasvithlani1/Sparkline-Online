# Service Banner Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the service banner's static water image with an optimized background video that autoplay/pause toggles with viewport visibility, while preserving the existing layout and shipping local source plus optimized assets.

**Architecture:** Keep the banner layout intact and move playback logic into a small client component that owns the `<video>` element and `IntersectionObserver` behavior. Preserve the original source file in the repo, generate optimized delivery assets plus a poster image, and verify the change through the existing home-page test suite.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Vitest, Testing Library, FFmpeg

---

### Task 1: Add the regression test first

**Files:**
- Modify: `tests/app/home.test.tsx`
- Test: `tests/app/home.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it("renders a service banner background video with poster and dual sources", () => {
  render(<Home />);

  const serviceVideo = screen.getByTestId("service-banner-video");

  expect(serviceVideo).toHaveAttribute("poster", "/images/service-banner-ocean-poster.webp");
  expect(serviceVideo).toHaveAttribute("loop");
  expect(serviceVideo).toHaveAttribute("playsinline");
  expect(serviceVideo).toHaveProperty("muted", true);
  expect(serviceVideo.querySelector('source[type="video/webm"]')).toHaveAttribute(
    "src",
    "/videos/service-banner-ocean.webm",
  );
  expect(serviceVideo.querySelector('source[type="video/mp4"]')).toHaveAttribute(
    "src",
    "/videos/service-banner-ocean.mp4",
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/app/home.test.tsx`
Expected: FAIL because `service-banner-video` and the new source/poster wiring do not exist yet.

### Task 2: Add optimized assets and minimal implementation

**Files:**
- Create: `public/videos/source/service-banner-ocean-original.webm`
- Create: `public/videos/service-banner-ocean.webm`
- Create: `public/videos/service-banner-ocean.mp4`
- Create: `public/images/service-banner-ocean-poster.webp`
- Create: `components/landing/service-banner-video.tsx`
- Modify: `components/landing/service-banner.tsx`

- [ ] **Step 1: Generate the local source copy and optimized assets**

Run:

```bash
mkdir -p public/videos/source
cp /Users/kairen/Downloads/Roaring_waves_crash_with_intensity__wind_howls__and_thunder_rumbles_in_a_stormy__turbul1750274481034.webm public/videos/source/service-banner-ocean-original.webm
ffmpeg -y -i public/videos/source/service-banner-ocean-original.webm -an -vf "scale='min(1600,iw)':-2" -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 public/videos/service-banner-ocean.webm
ffmpeg -y -i public/videos/source/service-banner-ocean-original.webm -an -vf "scale='min(1600,iw)':-2" -c:v libx264 -preset slow -crf 25 -movflags +faststart public/videos/service-banner-ocean.mp4
ffmpeg -y -i public/videos/source/service-banner-ocean-original.webm -vf "select=eq(n\\,0),scale='min(1600,iw)':-2" -frames:v 1 public/images/service-banner-ocean-poster.webp
```

- [ ] **Step 2: Add the client-side video component**

```tsx
"use client";

import { useEffect, useRef } from "react";

export function ServiceBannerVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void video.play().catch(() => {});
          return;
        }

        video.pause();
      },
      { threshold: 0.35 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      data-testid="service-banner-video"
      className="absolute inset-0 h-full w-full object-cover object-center"
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/service-banner-ocean-poster.webp"
    >
      <source src="/videos/service-banner-ocean.webm" type="video/webm" />
      <source src="/videos/service-banner-ocean.mp4" type="video/mp4" />
    </video>
  );
}
```

- [ ] **Step 3: Swap the banner background from image to video**

```tsx
import Image from "next/image";
import { ServiceBannerVideo } from "@/components/landing/service-banner-video";

// inside the banner media frame
<ServiceBannerVideo />
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/app/home.test.tsx`
Expected: PASS

### Task 3: Verify the whole repo state and commit one snapshot

**Files:**
- Modify: `tests/app/home.test.tsx`
- Modify: `components/landing/service-banner.tsx`
- Create: `components/landing/service-banner-video.tsx`
- Create: `public/videos/source/service-banner-ocean-original.webm`
- Create: `public/videos/service-banner-ocean.webm`
- Create: `public/videos/service-banner-ocean.mp4`
- Create: `public/images/service-banner-ocean-poster.webp`

- [ ] **Step 1: Run the full verification suite**

Run: `npm test`
Expected: PASS

Run: `npm run lint`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 2: Commit the final snapshot**

```bash
git add components/landing/service-banner.tsx components/landing/service-banner-video.tsx tests/app/home.test.tsx public/images/service-banner-ocean-poster.webp public/videos/service-banner-ocean.webm public/videos/service-banner-ocean.mp4 public/videos/source/service-banner-ocean-original.webm docs/superpowers/specs/2026-04-07-service-banner-video-design.md docs/superpowers/plans/2026-04-07-service-banner-video.md
git commit -m "Add optimized service banner background video"
```
