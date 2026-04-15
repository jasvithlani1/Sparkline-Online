# Feature Intro Dark Card Design

## Summary

Change the Haven Demo feature intro card between the hero and `HOW CAN WE SERVE YOU?` sections to use a `#050C1E` background with white text, while keeping the current copy, layout, and CTA placement.

## Goals

- Apply `#050C1E` to the full Haven Demo card background.
- Make the Haven Demo body copy white for contrast.
- Keep the current section spacing, layout, and copy intact.
- Preserve CTA readability on the darker surface.

## Non-Goals

- No copy changes.
- No layout restructuring or new nested card shells.
- No changes to the hero, service banner, or other sections.
- No new theme system or global color refactor.

## Current State

- `components/landing/feature-intro.tsx` renders the Haven Demo section on a white background.
- The content wrapper currently uses dark text on a light surface.
- The CTA link also uses dark text styling intended for a light background.

## Proposed Design

### Section surface

- Change the outer Haven Demo section background from white to `#050C1E`.
- Keep the existing padding and content width unchanged.

### Text treatment

- Change the Haven Demo body copy to white.
- Keep the typography sizing and line-height unchanged.
- Update the CTA text and chevron color to a lighter white-based value so it remains readable on the dark background.

### Testing

- Extend the home-page regression to assert:
  - the Haven Demo section uses the dark background class
  - the content wrapper or body text uses white text
  - the CTA link remains present with a light-on-dark treatment

## Files Expected To Change

- `components/landing/feature-intro.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page regression.
- Run the full test suite.
- Run a production build.
