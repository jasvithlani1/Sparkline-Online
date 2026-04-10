# Work Gallery Dark Cards Design

## Summary

Change the `OUR WORK` carousel cards to a dark `#03123A` shell with light text, while keeping the inner image panel light so the artwork still reads cleanly against the darker section background.

## Goals

- Change the work-gallery card shell color to `#03123A`.
- Change the card text treatment to white or white-tinted values for readable contrast.
- Keep the image panel inside each card light.
- Preserve the current carousel layout, spacing, and interactions.

## Non-Goals

- No change to the carousel behavior.
- No change to the work-gallery section background or CTA.
- No redesign of the image panel treatment.
- No layout restructuring inside the cards.

## Current State

- `components/landing/work-gallery.tsx` renders each card with a white shell.
- The card date, title, description, and bottom label currently use dark text values tuned for a light surface.
- The image panel already uses a light backing and should remain visually separate from the shell.

## Proposed Design

### Card shell

- Change the outer card shell background from white to `#03123A`.
- Keep the current rounded shape, padding, and overall card proportions.
- Retune the card shadow only if the darker shell needs a slightly softer edge against the section background.

### Card text

- Change the metadata date to a muted white treatment.
- Change the project title and description to white or near-white values.
- Change the bottom CTA label and divider line to white-tinted values so they remain visible on the dark shell.

### Image panel

- Keep the image panel background light as it is now.
- Do not darken or recolor the image frame.

### Testing

- Update the work-gallery regression to assert the dark card shell class.
- Add stable assertions for the light-on-dark text treatment on the card content.
- Keep the current mask, carousel, and CTA assertions intact unless they need a minimal class update.

## Files Expected To Change

- `components/landing/work-gallery.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page regression.
- Run the full test suite.
- Run a production build.
