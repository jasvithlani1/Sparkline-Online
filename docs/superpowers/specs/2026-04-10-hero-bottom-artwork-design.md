# Hero Bottom Artwork Design

## Summary

Add the provided black-and-white underwater artwork as a bottom-aligned decorative strip in the hero section and keep a repo-local copy of the asset.

## Goals

- Add the supplied artwork to the bottom of the hero section.
- Keep the hero heading and background video unchanged.
- Store the artwork locally inside the repo.
- Keep the artwork responsive and decorative only.

## Non-Goals

- No hero copy changes.
- No changes to hero video behavior.
- No animation on the new artwork in this pass.
- No recoloring or redrawing of the source image.

## Current State

- The hero is implemented in `components/landing/hero.tsx`.
- The bottom of the hero currently uses only gradient fades and has no decorative image layer.

## Proposed Design

### Artwork placement

- Add the artwork as a separate image layer anchored to the bottom of the hero.
- Center it horizontally and size it to span most of the hero width on desktop while scaling down on smaller screens.
- Keep it behind the main text content and non-interactive.

### Asset handling

- Save a local copy of the provided image under `public/images`.
- Use that local path in the hero component.

### Responsiveness

- Use responsive width constraints so the artwork remains readable without overflowing the viewport.
- Keep the artwork low enough in the hero so it reads like a bottom scene element rather than competing with the heading.

### Test coverage

- Update the hero regression to assert the new decorative artwork test hook and local image path.
- Keep the existing hero video and layout assertions intact.

## Files Expected To Change

- `components/landing/hero.tsx`
- `tests/app/home.test.tsx`
- `public/images/<new-artwork-file>`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
