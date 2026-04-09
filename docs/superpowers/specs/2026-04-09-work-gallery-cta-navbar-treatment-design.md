# Work Gallery CTA Navbar Treatment Design

## Summary

Restyle the `View All Projects` CTA in the `OUR WORK` section so it uses the exact same visual treatment as the navbar `Book a Call` CTA.

## Goals

- Match the navbar CTA treatment exactly.
- Preserve the current `View All Projects` label, location, and link destination.
- Keep the change scoped to the work gallery CTA only.

## Non-Goals

- No navbar changes.
- No CTA copy changes.
- No layout changes to the `OUR WORK` section.
- No refactor to introduce a shared CTA component in this pass.

## Current State

- The navbar CTA in `components/landing/navbar.tsx` uses:
  - white text
  - a blue gradient background
  - a white-tinted border
  - a layered blue glow shadow
  - custom inline typography and spacing styles
- The `View All Projects` CTA in `components/landing/work-gallery.tsx` currently uses a dark solid pill style.

## Proposed Design

### CTA treatment

- Replace the work gallery CTA styling with the same:
  - inline gradient background
  - border color
  - shadow stack
  - radius
  - font treatment
  - white text
- Keep the existing `inline-flex` button structure and link behavior.

### Scope boundary

- Do not refactor the navbar CTA or extract a shared component.
- Apply the navbar treatment directly to the work gallery CTA so the visual output matches exactly with minimal blast radius.

### Test coverage

- Update the home-page regression to assert the `View All Projects` CTA now uses the navbar-style visual contract.
- Remove assertions that depend on the old dark solid button styling.

## Files Expected To Change

- `components/landing/work-gallery.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
