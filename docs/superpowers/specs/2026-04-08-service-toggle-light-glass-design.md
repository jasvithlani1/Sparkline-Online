# Service Toggle Light Glass Design

## Summary

Change the `HOW CAN WE SERVE YOU?` toggle card from a dark glassmorphism treatment to a white glassmorphism treatment, and switch the toggle text and icon colors to black-based values for readability.

## Goals

- Preserve the toggle layout, sizing, spacing, and interaction behavior.
- Replace the dark translucent card background with a light translucent glass treatment.
- Improve contrast by switching text and inactive icon colors to black-based values.
- Keep the active blue accent for the selected item.
- Add regression coverage for the updated visual contract.

## Non-Goals

- No size or position changes to the toggle card.
- No copy changes.
- No changes to the surrounding service banner layout.

## Current State

- The toggle shell uses a dark translucent navy background with white text-oriented styling.
- Inactive icon strokes are white-based.
- Description copy also uses white-based alpha values.

## Proposed Design

### Container treatment

- Keep the same card geometry and blur effect.
- Switch the shell background to a white translucent fill.
- Adjust the border and shadow so the card still reads as glass against the video background without feeling muddy.
- Lighten the internal dividers to suit the lighter card.

### Text and icon treatment

- Keep the active blue highlight for the currently selected service.
- Change inactive titles to black-based values.
- Change descriptions to darker gray/black-based values for legibility.
- Change inactive icon strokes from white-based to black-based values.
- Keep active icon coloring aligned with the blue active state.

### Test coverage

- Extend the existing service-toggle regression to assert:
  - the new white glass background class
  - the lighter border/divider treatment
  - black-based inactive or description text classes
- Keep the test focused on the style contract and not broader layout behavior.

## Files Expected To Change

- `components/landing/service-options-toggle.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
