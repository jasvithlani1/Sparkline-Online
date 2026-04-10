# Service Submarine Bubbles Design

## Summary

Add a subtle continuous bubble effect that appears to rise from the submarine antennas in the `HOW CAN WE SERVE YOU?` section, while keeping the current submarine image, layout, and hover motion intact.

## Goals

- Add a light ambient animation near the submarine antennas.
- Keep the effect decorative and understated.
- Preserve the existing submarine image, sizing, and positioning.
- Respect reduced-motion preferences.

## Non-Goals

- No change to the service banner layout, heading, toggle, or background video.
- No replacement of the submarine image asset.
- No large particle system, canvas effect, or interactive animation.
- No hover-triggered-only behavior; the bubbles should loop continuously.

## Current State

- The submarine is rendered as a static image in `components/landing/service-banner.tsx`.
- The frame already supports subtle hover motion on the image.
- There is no decorative ambient animation around the submarine.
- Existing home-page regression coverage already locks the submarine frame footprint and hover classes in `tests/app/home.test.tsx`.

## Proposed Design

### Bubble overlay

- Add a `pointer-events-none` decorative overlay inside the existing `service-submarine-frame`.
- Render a small set of bubble elements positioned near the antenna area of the submarine image.
- Keep the bubble cluster localized so it reads as coming from the antennas rather than from the hull.

### Motion treatment

- Each bubble should:
  - start near the antenna origin
  - rise upward a short distance
  - drift slightly left or right
  - fade in and out during the loop
  - vary in size and timing slightly from the other bubbles
- The animation should run continuously, but at low visual intensity.
- The existing submarine hover motion should remain unchanged and visually combine with the bubble overlay without layout shifts.

### Accessibility

- Mark the bubble overlay as decorative only.
- Disable the bubble animation for users with reduced-motion preferences.
- Keep the submarine fully usable and unaffected by pointer events.

### Implementation shape

- Prefer a small inline bubble descriptor array in `service-banner.tsx` to render 3-5 bubbles.
- Use CSS keyframes in `app/globals.css` for the bubble rise/fade animation so the effect stays simple and reusable.
- Use per-bubble inline style values or utility classes for staggered delays, durations, and positions rather than adding a more complex animation system.

### Test coverage

- Extend the home-page regression to assert the presence of the decorative bubble container and bubble items.
- Keep the existing submarine frame and hover-motion assertions intact.
- Assert reduced-motion hooks only if they are implemented via visible classes on the rendered markup.

## Files Expected To Change

- `components/landing/service-banner.tsx`
- `tests/app/home.test.tsx`
- `app/globals.css`

## Verification

- Run the focused home-page test for the service banner submarine area.
- Run the full test suite.
- Run a production build.
