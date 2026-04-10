# Feature Intro Dark Gap Restore Design

## Summary

Restore the vertical gap between the dark Haven Demo card and the `HOW CAN WE SERVE YOU?` section, but keep that visible spacing dark by making it belong to the Haven Demo section above.

## Goals

- Bring back the visible spacing between the two sections.
- Keep the gap color `#050C1E` instead of white.
- Preserve the current dark Haven Demo card styling and white text treatment.
- Avoid changing the internal layout of either section.

## Non-Goals

- No copy changes.
- No new spacer element between sections.
- No changes to the service banner artwork, bubbles, or content.
- No global spacing or color token refactor.

## Current State

- `components/landing/feature-intro.tsx` currently removes bottom padding from the Haven Demo section.
- `components/landing/service-banner.tsx` currently removes top padding from the services section.
- That makes the two sections touch directly with no visible seam.

## Proposed Design

### Section spacing

- Restore the Haven Demo section bottom padding to its earlier responsive values.
- Leave the services section top padding at `0`.
- This makes the visible gap reappear while keeping it visually attached to the dark Haven Demo section.

### Visual treatment

- Keep the Haven Demo section background at `#050C1E`.
- Keep the Haven Demo copy white and the CTA in its lighter white treatment.
- Keep the services section background white so the gap reads as a dark trailing edge from the card above.

### Testing

- Update the home-page regression to assert the restored Haven Demo bottom padding classes.
- Keep the existing assertions that the services section top padding remains `0`.
- Preserve the existing dark card and white text assertions.

## Files Expected To Change

- `components/landing/feature-intro.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page regression.
- Run the full test suite.
- Run a production build.
