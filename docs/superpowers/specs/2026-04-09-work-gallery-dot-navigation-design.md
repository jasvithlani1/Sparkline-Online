# Work Gallery Dot Navigation Design

## Summary

Replace the visible bottom scrollbar affordance in the `OUR WORK` editorial carousel with a centered four-dot navigation control. Each dot maps to one real card, clicking or tapping a dot scrolls the carousel to that card, and the active dot stretches into a blue pill while the inactive dots remain black circles.

## Goals

- Keep the editorial carousel layout and horizontal scrolling behavior.
- Remove the bottom scrollbar as a visible control affordance.
- Add a four-dot pager representing the four real project cards.
- Make dots clickable and tappable so they jump the carousel to the corresponding card.
- Show the active card with a stretched blue pill indicator.
- Keep the remaining inactive dots black and circular.

## Non-Goals

- No change to the number of cards.
- No change to the editorial card layout itself.
- No change to the `View All Projects` CTA placement.

## Current State

- The carousel is horizontally scrollable and uses a hidden-scrollbar utility.
- There is no explicit pagination control tied to the four real cards.
- The duplicated track items exist only to support looping behavior.

## Proposed Design

### Navigation model

- Add a centered row of four dot buttons below the carousel.
- Each dot corresponds only to one real project entry, not the duplicated loop items.
- Clicking or tapping a dot scrolls the carousel to the matching real card position.

### Active-state treatment

- The currently active card determines the active dot.
- The active dot becomes a stretched rounded pill in blue.
- The other dots remain smaller black circular marks.

### Active-card tracking

- Track the currently dominant visible real card based on carousel scroll position.
- As auto-scroll or manual interaction changes the active card, update the dot state accordingly.
- Preserve looping behavior while translating the duplicated track position back to one of the four real-card indices.

### Interaction behavior

- Dot click/tap should pause or override the automatic motion briefly while the carousel moves to the requested card.
- After the jump settles, automatic scrolling can resume.
- Manual drag/swipe should continue working as before.

### Test coverage

- Extend the home-page regression to assert:
  - the dot navigation container exists
  - four dot buttons render
  - the first dot starts active with the blue stretched style
- Keep the structural carousel assertions intact.

## Files Expected To Change

- `components/landing/work-gallery.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
- Run a production build, escalating outside the sandbox if needed for the known Turbopack restriction.
