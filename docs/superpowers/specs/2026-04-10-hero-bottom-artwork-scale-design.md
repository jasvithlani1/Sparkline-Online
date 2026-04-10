# Hero Bottom Artwork Scale Design

## Summary

Reduce the newly added hero bottom artwork to about half of its current footprint while keeping it bottom-aligned and horizontally centered.

## Goals

- Make the hero bottom artwork visibly smaller.
- Keep it centered horizontally.
- Keep it anchored to the bottom of the hero.

## Non-Goals

- No change to the artwork asset itself.
- No hero copy changes.
- No hero video changes.
- No new animation.

## Current State

- The hero artwork is currently rendered as a wide bottom strip with `w-full` and `max-w-[1680px]`.
- That footprint is reading too large in the hero.

## Proposed Design

### Scale adjustment

- Reduce the artwork’s maximum rendered width by roughly 50%.
- Keep the image responsive so it can still shrink on smaller screens.

### Alignment

- Preserve the existing centered horizontal alignment.
- Preserve the bottom anchor inside the hero.

### Test coverage

- Update the hero regression to assert the smaller max-width treatment on the artwork image.
- Keep the existing hero artwork hook and local asset path assertions intact.

## Files Expected To Change

- `components/landing/hero.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
