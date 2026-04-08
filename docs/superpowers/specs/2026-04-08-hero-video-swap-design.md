# Hero Video Swap Design

## Summary

Replace the current hero background video with the user-provided file at `/Users/kairen/Downloads/tmpxawfkllt.mp4`, while keeping a local source copy in the repository and serving an optimized MP4 from the site.

## Goals

- Keep the hero section layout, timing, and overlay treatment unchanged.
- Preserve a local copy of the original source asset inside the repo.
- Serve an optimized MP4 for the actual hero background.
- Update regression coverage so the hero test verifies the new asset path.

## Non-Goals

- No new poster image.
- No secondary video format such as WebM.
- No hero copy, spacing, or animation changes.
- No broader video pipeline refactor.

## Current State

- The hero component currently renders a single looping video with `src="/videos/hero-background.webm"`.
- Tests assert that exact WebM path.
- The replacement source file exists outside the repo in `Downloads` and is about 4.4 MB.

## Proposed Design

### Asset handling

- Copy the original user-provided file into a repo-local source location under `public/videos/source/` so the project retains its own local copy.
- Generate an optimized delivery MP4 under `public/videos/` for the hero to actually load.
- Keep names explicit and stable so future replacements are straightforward, for example:
  - source: `public/videos/source/hero-background-source.mp4`
  - delivery: `public/videos/hero-background.mp4`

### Optimization

- Use `ffmpeg` to transcode the delivery asset to a smaller MP4 suitable for looping background playback.
- Keep the video visually close to the provided asset, but reduce file size enough to be reasonable for the hero.
- Since the user asked to swap as-is, optimization is limited to the media file itself; playback behavior remains unchanged.

### Component change

- Update the hero component to point from the old WebM path to the optimized MP4 path.
- Keep `autoPlay`, `muted`, `loop`, and `playsInline` exactly as they are today.

### Test coverage

- Update the existing hero regression in `tests/app/home.test.tsx` so it expects the new MP4 path.
- Keep the rest of the hero assertions intact so the change stays narrowly scoped to the asset swap.

## Files Expected To Change

- `components/landing/hero.tsx`
- `tests/app/home.test.tsx`
- `public/videos/hero-background.mp4`
- `public/videos/source/hero-background-source.mp4`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
- Run a production build, escalating outside the sandbox if Turbopack hits the known port-binding restriction.
