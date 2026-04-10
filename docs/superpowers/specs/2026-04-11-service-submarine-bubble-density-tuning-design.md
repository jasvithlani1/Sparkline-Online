# Service Submarine Bubble Density Tuning Design

## Summary

Increase the perceived density of the decorative submarine bubbles in the `HOW CAN WE SERVE YOU?` section without literally doubling the element count, while keeping the current right-shifted origin and subtle ambient motion.

## Goals

- Make the bubble plume feel roughly twice as full.
- Preserve the current right-shifted origin over the antenna area.
- Keep the effect understated rather than noisy.
- Maintain the current submarine image, layout, and reduced-motion behavior.

## Non-Goals

- No change to the banner layout, heading, toggle, or background video.
- No particle system, canvas effect, or asset changes.
- No literal 2x bubble count jump to 16 elements.
- No hover-triggered bubble behavior.

## Current State

- The submarine overlay currently renders 8 bubbles in `components/landing/service-banner.tsx`.
- The bubble origin has already been shifted rightward toward the antenna area.
- The current effect is still a bit too sparse relative to the desired density.
- Regression coverage in `tests/app/home.test.tsx` currently expects 8 bubbles.

## Proposed Design

### Density strategy

- Increase the bubble count modestly to about 10 bubbles total.
- Tighten the delay spacing so more bubbles are visible at the same time.
- Slightly overlap durations to create a fuller plume without making the movement frantic.

### Placement

- Keep the bubble origin clustered around the current antenna-aligned area.
- Add only a small amount of extra spread so the plume stays compact and intentional.
- Preserve the right-shifted placement rather than recentering the stream.

### Motion and styling

- Reuse the existing bubble keyframes, styling, and reduced-motion handling.
- Keep bubble sizes small and varied so the increased density still reads as light foam rather than large orbs.
- Adjust only descriptor values unless a minimal timing tweak is needed for balance.

### Test coverage

- Update the submarine regression to expect the new bubble count.
- Keep the existing overlay and submarine image assertions intact.

## Files Expected To Change

- `components/landing/service-banner.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page submarine bubble regression.
- Run the full test suite.
- Run a production build.
