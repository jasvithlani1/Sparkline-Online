# Work Gallery Lighter Navy Cards Design

## Summary

Lighten the `OUR WORK` carousel card shell from the current deep navy to a more noticeable lighter navy so the cards separate more clearly from the section background, while keeping the image panel light and the current white text treatment.

## Goals

- Increase visual separation between the work-gallery cards and the section background.
- Keep the cards in the same navy family rather than switching to a bright accent color.
- Preserve the current light image panel and white text treatment.
- Keep the carousel layout, spacing, and interactions unchanged.

## Non-Goals

- No change to the carousel behavior.
- No change to the work-gallery section background or CTA.
- No redesign of the image panel treatment.
- No layout restructuring inside the cards.

## Current State

- `components/landing/work-gallery.tsx` currently renders the card shell in `#03123A`.
- The white text treatment already reads correctly on the darker shell.
- The card shell now blends too closely with the surrounding section background.

## Proposed Design

### Card shell

- Change the outer card shell from `#03123A` to a lighter navy around `#0A1F57`.
- Keep the current rounded shape, padding, and overall card proportions.
- Keep the existing light image panel unchanged.

### Card text

- Keep the current white and white-tinted text treatment unless a small contrast adjustment becomes necessary after the shell color shift.
- Keep the divider line and bottom label in the same white-tinted family.

### Testing

- Update the work-gallery regression to assert the new lighter navy card shell class.
- Keep the existing white-text assertions intact unless the implementation requires a small class adjustment.

## Files Expected To Change

- `components/landing/work-gallery.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page regression.
- Run the full test suite.
- Run a production build.
