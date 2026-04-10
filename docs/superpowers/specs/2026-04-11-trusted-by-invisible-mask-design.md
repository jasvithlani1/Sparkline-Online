# Trusted-By Invisible Mask Design

## Summary

Refine the `Trusted by the bold` marquee side masks so they still soften the logo entries and exits, but visually disappear into the middle-page gradient background instead of reading as visible colored panels.

## Goals

- Make the left and right marquee masks feel nearly invisible.
- Preserve the soft fade effect at the marquee edges.
- Keep the change isolated to the trusted-by marquee treatment.

## Non-Goals

- No changes to the marquee animation behavior.
- No changes to the trusted-by copy or typography.
- No changes to the work gallery masks or other middle-page sections.
- No layout restructuring.

## Current State

- `components/landing/logo-grid.tsx` uses left and right mask overlays with solid-looking blue gradient starts.
- Those masks now sit on top of the shared middle-page gradient.
- The mismatch between the mask color block and the surrounding background makes the side fades more visible than intended.

## Proposed Design

### Mask treatment

- Keep the existing left and right mask elements and widths.
- Replace the current mask backgrounds with much softer gradients that start from low-opacity blue values and fade to transparent.
- Tune the starting opacity so the masks still soften the edge of the scrolling logos without looking like separate panels.

### Testing

- Update the trusted-by marquee regression to assert the new low-opacity gradient classes on both mask elements.
- Avoid adding screenshot-like assertions; class-based coverage is sufficient.

## Files Expected To Change

- `components/landing/logo-grid.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page regression.
- Run the full test suite.
- Run a production build.
