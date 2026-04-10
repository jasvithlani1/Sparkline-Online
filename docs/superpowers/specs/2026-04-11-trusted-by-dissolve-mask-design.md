# Trusted-By Dissolve Mask Design

## Summary

Refine the `Trusted by the bold` marquee side masks so the background match feels cleaner and the logos dissolve more smoothly at both edges instead of fading out against a slightly visible side treatment.

## Goals

- Make the left and right edge masks blend as cleanly as possible into the surrounding background.
- Make the logos feel like they dissolve smoothly on both sides.
- Allow a slightly longer fade length if it improves the visual result.
- Keep the change isolated to the trusted-by marquee treatment.

## Non-Goals

- No changes to the marquee animation behavior.
- No changes to the trusted-by copy or typography.
- No changes to the work gallery masks or other middle-page sections.
- No layout restructuring outside the marquee edge treatment.

## Current State

- `components/landing/logo-grid.tsx` already uses softened multi-stop side masks.
- The fade is improved, but the blend still feels slightly off against the live background.
- The logos do not yet feel like they fully dissolve into the section at the left and right edges.

## Proposed Design

### Mask treatment

- Keep the existing left and right mask elements.
- Increase the mask widths slightly so the dissolve has more room to taper.
- Replace the current gradients with longer background-matched multi-stop fades that hold low-opacity color farther into the mask before tapering out.
- Prioritize a smoother perceived dissolve over minimizing mask footprint.

### Testing

- Update the trusted-by marquee regression to assert the revised mask widths and gradient classes on both mask elements.
- Keep coverage class-based and focused on the mask treatment only.

## Files Expected To Change

- `components/landing/logo-grid.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page regression.
- Run the full test suite.
- Run a production build.
