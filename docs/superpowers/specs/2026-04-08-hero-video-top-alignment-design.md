# Hero Video Top Alignment Design

## Summary

Adjust the hero background video so the visible crop is anchored from the top of the frame instead of the middle.

## Goals

- Keep the hero section size and overlay treatment unchanged.
- Keep the hero video in cover mode.
- Show the top portion of the video first, rather than centering the crop.
- Add regression coverage for the alignment class.

## Non-Goals

- No hero layout, spacing, or typography changes.
- No asset replacement or re-encoding.
- No poster, overlay, or animation changes.

## Current State

- The hero background video uses `object-cover`.
- With only `object-cover`, the browser centers the cropped region, so the visible frame favors the middle of the source.

## Proposed Design

### Rendering behavior

- Keep the video stretched to the hero bounds with `object-cover`.
- Add top alignment so cropping happens from the top edge downward.
- This preserves the full-bleed hero treatment while prioritizing the top of the video.

### Component change

- Update the hero video class list to include top object positioning.
- Leave all other hero classes and video attributes unchanged.

### Test coverage

- Extend the existing hero regression to assert that the video has the top alignment class.
- Keep the test focused on the style contract, not the internals of rendering.

## Files Expected To Change

- `components/landing/hero.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
