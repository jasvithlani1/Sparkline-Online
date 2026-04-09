# Service Submarine Hover Motion Design

## Summary

Add a subtle hover animation to the submarine in the `HOW CAN WE SERVE YOU?` section so it glides slightly to the right and lifts a little on hover, then returns smoothly on hover-out.

## Goals

- Add motion only to the service banner submarine.
- Keep the interaction polished and understated.
- Preserve the current submarine size, alignment, and layout footprint.
- Respect reduced-motion preferences.

## Non-Goals

- No changes to the service toggle, heading, or banner layout.
- No continuous idle animation.
- No large or exaggerated movement.

## Current State

- The submarine is rendered in `components/landing/service-banner.tsx`.
- The current regression coverage locks the submarine frame sizing and positioning in `tests/app/home.test.tsx`.
- There is no hover-specific motion on the submarine.

## Proposed Design

### Hover behavior

- Apply hover interaction to the submarine container or image in the service banner.
- On hover, the submarine should:
  - shift slightly to the right
  - lift slightly upward
  - use smooth easing and a short duration
- On hover-out, it should return smoothly to its resting position.

### Motion boundaries

- The movement should be small enough that it does not overlap adjacent content or break the current framing.
- The effect should feel buoyant, not springy or playful.

### Accessibility

- Disable the hover motion for users with reduced-motion preferences.
- Keep the hover behavior non-essential and purely decorative.

### Test coverage

- Extend the home-page regression to assert the presence of the hover animation hook or classes on the submarine frame or image.
- Keep the existing size and alignment assertions intact.

## Files Expected To Change

- `components/landing/service-banner.tsx`
- `tests/app/home.test.tsx`
- `app/globals.css` only if shared animation utilities are needed

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
