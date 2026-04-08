# Service Banner Video Swap Design

## Summary

Replace the `HOW CAN WE SERVE YOU?` background video set with the user-provided file at `/Users/kairen/Downloads/tmp14tqi5vl.mp4`, keep a repo-local source copy, and serve optimized delivery assets that fully replace the current ocean-specific media references.

## Goals

- Fully switch the service banner background away from the current ocean video asset set.
- Keep a local source copy of the provided MP4 inside the repository.
- Serve optimized delivery media for the banner background.
- Preserve the existing section layout, autoplay behavior, and overlay treatment.
- Update regression coverage so tests assert the new asset paths.

## Non-Goals

- No changes to section copy, toggle behavior, or layout sizing.
- No changes to playback behavior beyond the media file swap.
- No broader refactor of the banner video component.

## Current State

- `components/landing/service-banner-video.tsx` renders:
  - poster: `/images/service-banner-ocean-poster.webp`
  - WebM source: `/videos/service-banner-ocean.webm`
  - MP4 source: `/videos/service-banner-ocean.mp4`
- The home-page regression asserts those exact asset paths.
- The new source file exists outside the repo in `Downloads` and is about 16 MB.

## Proposed Design

### Asset handling

- Copy the original user-provided MP4 into `public/videos/source/` as the repo-local source asset.
- Generate a new optimized MP4 delivery file for the service banner.
- Generate a matching poster image from the new video so the loading state visually matches the replacement footage.
- Since the user requested a full switch, stop using the old ocean asset names in the component and tests.

### Naming

- Source asset:
  - `public/videos/source/service-banner-background-source.mp4`
- Delivery asset:
  - `public/videos/service-banner-background.mp4`
- Poster asset:
  - `public/images/service-banner-background-poster.webp`

### Optimization

- Use `ffmpeg` to transcode the delivery MP4 to a lighter background-video asset suitable for looping playback.
- Keep the visual content intact while reducing file size enough to be practical for the banner section.
- Extract a representative frame from the new source video for the poster.

### Component change

- Update `ServiceBannerVideo` to reference only the new poster and MP4 asset.
- Remove the old WebM source from the rendered markup so the banner is fully switched to the new asset set.
- Keep `muted`, `loop`, `playsInline`, `preload="metadata"`, intersection-driven playback, and overlay behavior unchanged.

### Test coverage

- Update the existing service-banner regression to expect:
  - the new poster path
  - a single MP4 source path
  - absence of the old WebM source assertion
- Keep the rest of the test focused on the existing behavior contract.

## Files Expected To Change

- `components/landing/service-banner-video.tsx`
- `tests/app/home.test.tsx`
- `public/videos/source/service-banner-background-source.mp4`
- `public/videos/service-banner-background.mp4`
- `public/images/service-banner-background-poster.webp`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
- Run a production build, escalating outside the sandbox if Turbopack hits the known port-binding restriction.
