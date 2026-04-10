# Hero Bottom Artwork Offset Design

## Summary

Move the hero bottom artwork slightly lower so part of it sits below the hero edge and is cropped off naturally.

## Goals

- Lower the hero bottom artwork slightly.
- Keep the current smaller scale.
- Keep the artwork centered horizontally.

## Non-Goals

- No new asset changes.
- No scale changes beyond the current reduced size.
- No hero copy or video changes.

## Current State

- The hero bottom artwork is currently centered, bottom-aligned, and reduced in width.
- It needs to sit a little lower so it feels more grounded against the bottom edge.

## Proposed Design

### Bottom offset

- Add a small negative bottom offset to the artwork wrapper.
- Let the existing `overflow-hidden` hero container crop the lower portion naturally.

### Layout preservation

- Keep the current width and centered alignment unchanged.
- Keep the artwork decorative and non-interactive.

### Test coverage

- Update the hero regression to assert the new negative bottom offset class on the artwork wrapper.
- Keep the existing artwork hook, asset path, and width assertions intact.

## Files Expected To Change

- `components/landing/hero.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
