# Service Submarine Bubble Density Design

## Summary

Increase the number of decorative bubbles in the `HOW CAN WE SERVE YOU?` submarine treatment and shift their origin farther right so they visually sit on top of the submarine antenna area.

## Goals

- Make the bubble effect feel fuller without becoming noisy.
- Move the bubble origin closer to the visible antenna top.
- Preserve the current continuous looping behavior.
- Keep the submarine image, frame sizing, and hover motion unchanged.

## Non-Goals

- No change to the banner layout, heading, toggle, or background video.
- No change to the core bubble animation style.
- No interactive or hover-triggered bubble behavior.
- No new asset files.

## Current State

- The submarine frame renders a decorative bubble overlay in `components/landing/service-banner.tsx`.
- The overlay currently renders 4 bubbles with staggered timing.
- The existing bubble positions are slightly too far left relative to the antenna mast.
- Regression coverage in `tests/app/home.test.tsx` currently expects 4 bubbles.

## Proposed Design

### Bubble count

- Increase the bubble count from 4 to 7 or 8 bubbles.
- Keep the bubbles relatively small so the denser stream still reads as subtle.
- Continue using staggered delays and durations so the extra bubbles do not animate in lockstep.

### Bubble placement

- Shift the bubble cluster farther right to sit above the visible antenna tower and mast details.
- Keep the cluster compact enough that the bubbles still clearly originate from a single antenna area.
- Allow a small vertical spread so the source feels organic rather than perfectly aligned.

### Motion and styling

- Keep the existing keyframe animation and reduced-motion behavior.
- Preserve the current soft white bubble styling and low-intensity feel.
- Adjust only the per-bubble descriptor values unless a minor timing tweak is needed to maintain visual balance.

### Test coverage

- Update the service submarine regression to expect the new bubble count.
- Keep the existing overlay and submarine image assertions unchanged.

## Files Expected To Change

- `components/landing/service-banner.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page submarine bubble regression.
- Run the full test suite.
- Run a production build.
