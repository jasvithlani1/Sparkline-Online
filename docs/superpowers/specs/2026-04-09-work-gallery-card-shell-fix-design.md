# Work Gallery Card Shell Fix Design

## Summary

Fix the `OUR WORK` editorial carousel card shell by removing the clipped corner treatment and returning each card to a clean rounded white panel so the bottom-right corner and left border render correctly.

## Goals

- Remove the broken bottom-right corner cut.
- Remove the left-edge border artifact.
- Keep the editorial carousel layout and content intact.
- Preserve the clean Paper-inspired feel with a stable rounded card shell.

## Non-Goals

- No change to the carousel behavior.
- No change to the card content structure.
- No change to the CTA placement.

## Current State

- The card shell uses a `clip-path` polygon in `components/landing/work-gallery.tsx`.
- That clip treatment is causing visible rendering problems in the bottom-right corner and along the left edge.

## Proposed Design

### Card shell

- Remove the `clip-path` from the card shell entirely.
- Keep the rounded white card surface, padding, and shadow.
- Let the standard rounded rectangle shape define the shell.

### Test coverage

- Extend the work-gallery regression to assert the card shell uses the expected rounded panel classes rather than relying on the old clipped treatment.
- Keep the carousel structure assertions intact.

## Files Expected To Change

- `components/landing/work-gallery.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
