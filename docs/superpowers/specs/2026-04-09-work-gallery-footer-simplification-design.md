# Work Gallery Footer Simplification Design

## Summary

Simplify the footer row of each `OUR WORK` editorial card so only the `View Project` action remains visible, removing the visible `Website · Branding`-style meta label from the card UI.

## Goals

- Remove the visible project meta label from each work card footer.
- Keep the `View Project` action visible.
- Preserve the rest of the editorial card layout and carousel behavior.

## Non-Goals

- No change to the card layout outside the footer row.
- No change to the project count.
- No change to carousel motion or CTA placement.
- No required removal of `meta` from the content model.

## Current State

- Each editorial card footer currently renders:
  - `View Project` on the left
  - the project `meta` label on the right

## Proposed Design

### Footer row

- Remove the visible `meta` label from the footer row.
- Keep only the `View Project` action label.
- Preserve spacing and alignment so the footer still feels intentional rather than empty.

### Content model

- Leave `meta` in `lib/content.ts` for now unless it becomes unused elsewhere.
- This change is UI-only.

### Test coverage

- Extend the work-gallery regression to assert that the card does not show the meta footer text while keeping the `View Project` action visible.

## Files Expected To Change

- `components/landing/work-gallery.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
