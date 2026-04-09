# Work Gallery Dot Indicator Design

## Summary

Add a centered four-dot indicator row below the `OUR WORK` carousel and above the `View All Projects` CTA. Each dot represents one real card, the currently selected card's dot turns blue, and clicking a dot scrolls the carousel to that card.

## Goals

- Add a visible four-dot pager between the carousel and CTA.
- Map one dot to each of the four real cards.
- Show the active card with a blue dot.
- Keep inactive dots black.
- Allow clicking or tapping a dot to jump to the corresponding card.
- Keep the carousel auto-scroll and manual drag behavior intact.

## Non-Goals

- No change to the card layout.
- No change to the CTA placement.
- No change to the number of cards.

## Current State

- The carousel has no visible dot indicator row.
- The section already supports horizontal movement through auto-scroll and manual drag.

## Proposed Design

### Indicator row

- Add a centered row of four dot buttons below the carousel and above the CTA.
- Each dot corresponds only to one of the four real project records.
- Use a compact circular style for inactive dots.

### Active state

- Determine the active real card from the carousel scroll position.
- Color the active dot blue.
- Keep all other dots black.
- Initialize the first dot as active on first render.

### Dot interaction

- Clicking or tapping a dot scrolls the carousel to the matching real card.
- Dot interaction pauses automatic motion briefly, then allows it to resume.

### Test coverage

- Extend the work-gallery regression to assert:
  - a dot navigation container exists
  - four dot buttons render
  - the first dot starts in the active blue state
- Keep the existing carousel and CTA assertions intact.

## Files Expected To Change

- `components/landing/work-gallery.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
