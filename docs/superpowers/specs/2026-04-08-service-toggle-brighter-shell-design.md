# Service Toggle Brighter Shell Design

## Summary

Brighten only the outer white glass shell of the `HOW CAN WE SERVE YOU?` toggle card slightly, without changing the internal dividers, icon chips, text, or active-state colors.

## Goals

- Make the outer toggle shell read a little whiter and glossier.
- Preserve the existing glassmorphism feel.
- Keep all inner contrast styling unchanged.
- Keep size, blur, spacing, and placement unchanged.

## Non-Goals

- No changes to divider lines.
- No changes to icon chip backgrounds.
- No changes to text or icon colors.
- No layout or interaction changes.

## Proposed Design

### Shell treatment

- Increase the white background opacity of the outer card slightly from the current light-glass value.
- Optionally soften the shell shadow slightly so the brighter fill still feels airy and glass-like instead of dense.
- Keep the border and blur close to the current treatment unless a small adjustment is needed to balance the brighter shell.

### Test coverage

- Update the existing toggle regression to assert the slightly brighter shell class.
- Leave the rest of the toggle assertions intact so the change remains narrowly scoped.

## Files Expected To Change

- `components/landing/service-options-toggle.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
