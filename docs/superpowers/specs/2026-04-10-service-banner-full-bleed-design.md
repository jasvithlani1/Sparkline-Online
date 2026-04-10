# Service Banner Full-Bleed Design

## Summary

Make the `HOW CAN WE SERVE YOU?` background banner stretch edge to edge with no left or right gaps, while keeping the heading, toggle, and submarine aligned to the existing content layout. Increase the black video overlay to 60% opacity.

## Goals

- Remove the left and right gaps around the service banner background.
- Keep the content placement for the heading, toggle, and submarine unchanged in spirit.
- Increase the black overlay to 60% opacity.

## Non-Goals

- No changes to the service toggle contents or interaction.
- No changes to the heading copy.
- No changes to the service submarine artwork or sizing beyond whatever is needed to stay aligned with the existing layout.

## Current State

- `components/landing/service-banner.tsx` wraps the banner inside a centered `max-w-[1310px]` container, which creates visible side gaps.
- The black overlay currently uses `bg-black/[0.44]`.

## Proposed Design

### Full-bleed banner

- Break the service banner media frame out of the centered max-width container so it spans the full viewport width.
- Keep the heading and toggle positioned from an inner alignment container so they continue to sit at the current inset offsets.
- Preserve the existing banner heights across breakpoints.

### Overlay opacity

- Change the black overlay from `44%` to `60%` opacity.
- Keep the existing blue gradient layer above the video.

### Layout containment

- Keep the submarine outside the banner frame as it is now, but ensure it continues to align relative to the content container after the banner goes full-bleed.
- Avoid introducing horizontal overflow.

### Test coverage

- Update the service banner regression to assert the full-bleed treatment on the banner wrapper.
- Update the video-overlay regression to assert the new `bg-black/[0.60]` opacity class.

## Files Expected To Change

- `components/landing/service-banner.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
