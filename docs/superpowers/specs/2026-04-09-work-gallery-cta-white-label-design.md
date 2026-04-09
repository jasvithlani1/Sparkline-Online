# Work Gallery CTA White Label Design

## Summary

Force the `View All Projects` CTA label in the `OUR WORK` section to render in pure white while keeping the existing navbar-matched button treatment intact.

## Goals

- Keep the current navbar CTA visual treatment.
- Ensure the `View All Projects` text renders in pure white.
- Keep the change scoped to the work gallery CTA only.

## Non-Goals

- No navbar changes.
- No CTA layout changes.
- No color changes to other `OUR WORK` elements.
- No shared CTA refactor.

## Current State

- The `View All Projects` CTA already uses the navbar CTA gradient, border, shadow, and typography treatment.
- The text is intended to be white via utility class, but the rendered label needs an explicit white color lock.

## Proposed Design

### Label color

- Add an explicit white text color to the work gallery CTA style contract.
- Keep the existing `text-white` class in place and reinforce it with inline `color: "#FFFFFF"` so the visible label stays white regardless of inheritance.

### Test coverage

- Update the home-page regression to assert the CTA’s inline white text color as part of the visual contract.
- Keep the existing navbar-style assertions intact.

## Files Expected To Change

- `components/landing/work-gallery.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
