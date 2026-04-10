# Trusted-By Polished Mask Design

## Summary

Refine the `Trusted by the bold` marquee side masks so they blend more naturally into the middle-page gradient while still providing a soft, polished fade at the left and right edges of the logo animation.

## Goals

- Make the side mask blend feel smoother and more natural against the background.
- Keep a very soft visible fade so the logo entries and exits still feel polished.
- Keep the change isolated to the trusted-by marquee treatment.

## Non-Goals

- No changes to the marquee animation behavior.
- No changes to the trusted-by copy or typography.
- No changes to the work gallery masks or other middle-page sections.
- No layout restructuring.

## Current State

- `components/landing/logo-grid.tsx` already uses softened low-opacity mask gradients.
- The current fade is less harsh than before, but the blend still does not fully match the surrounding section background.
- The result is a visible edge treatment that still feels slightly separate from the section surface.

## Proposed Design

### Mask treatment

- Keep the existing left and right mask elements and widths.
- Replace the current gradients with gentler multi-stop fades that taper more gradually into transparency.
- Use lower-opacity blue stops and an additional mid-stop so the fade reads as polished rather than abrupt or painted on.

### Testing

- Update the trusted-by marquee regression to assert the revised multi-stop gradient classes on both mask elements.
- Keep coverage class-based and focused on the mask treatment only.

## Files Expected To Change

- `components/landing/logo-grid.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page regression.
- Run the full test suite.
- Run a production build.
