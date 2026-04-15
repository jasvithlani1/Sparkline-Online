# Feature Intro To Service Banner Gap Removal Design

## Summary

Remove the visible gap between the dark Haven Demo card and the `HOW CAN WE SERVE YOU?` section so the two sections touch directly with no seam.

## Goals

- Eliminate the visible vertical gap between the two adjacent sections.
- Keep both sections in the same order and structure.
- Preserve internal spacing inside each section.

## Non-Goals

- No copy changes.
- No layout restructuring inside either section.
- No negative-margin overlap tricks.
- No changes to unrelated section spacing elsewhere on the page.

## Current State

- `components/landing/feature-intro.tsx` applies vertical padding to the Haven Demo section.
- `components/landing/service-banner.tsx` applies vertical padding to the services section.
- Those adjacent outer paddings create a visible seam between the sections.

## Proposed Design

### Section spacing

- Remove the bottom padding from the Haven Demo section.
- Remove the top padding from the services section.
- Keep the remaining side and lower padding values intact so each section still breathes internally.

### Testing

- Update the home-page regression only if the relevant section class assertions are stable and easy to extend.
- Prefer asserting the outer section spacing classes rather than introducing brittle visual approximations.

## Files Expected To Change

- `components/landing/feature-intro.tsx`
- `components/landing/service-banner.tsx`
- `tests/app/home.test.tsx` only if a stable spacing assertion is added

## Verification

- Run the focused home-page regression.
- Run the full test suite.
- Run a production build.
