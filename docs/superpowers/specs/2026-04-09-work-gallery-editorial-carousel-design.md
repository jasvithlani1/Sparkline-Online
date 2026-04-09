# Work Gallery Editorial Carousel Design

## Summary

Replace the static `OUR WORK` four-card grid with a single horizontal carousel of four Paper-inspired editorial cards that auto-scroll left-to-right while still supporting manual drag, swipe, and horizontal scroll interaction.

## Goals

- Replace the current 2x2 grid layout with a horizontally scrolling carousel.
- Keep exactly four real project entries in the content model.
- Restyle each project card to match the selected Paper editorial format:
  - large media panel on the left
  - text content panel on the right
  - small top meta/date line
  - stronger editorial title and supporting body copy
  - bottom action line
- Support both automatic looping movement and manual user control.
- Keep the `View All Projects` CTA after the carousel.

## Non-Goals

- No change to the section heading copy.
- No change to the total number of projects.
- No backend or CMS integration.

## Current State

- `components/landing/work-gallery.tsx` renders a static `lg:grid-cols-2` layout with four simple image cards.
- `lib/content.ts` only provides `name`, `meta`, `image`, and image class data per project.
- The current test only asserts four cards and the CTA link.

## Proposed Design

### Card format

- Rebuild each card into a wide editorial layout inspired by the selected Paper frame:
  - rounded light card surface
  - image/media block occupying the left side
  - structured content column on the right
  - small uppercase meta/date line at the top
  - larger title
  - short body paragraph
  - bottom action label such as `View Project`
- Keep this responsive by stacking vertically on smaller screens and using the editorial split layout on larger screens.

### Content model

- Extend `workGallery.projects` with the extra fields needed for the richer card format:
  - `eyebrow` or `date`
  - `description`
  - `ctaLabel`
- Keep the four current projects as the source items, even if some are repeated placeholders for now.

### Carousel behavior

- Replace the grid with a horizontally scrolling track.
- The track will auto-advance left-to-right continuously.
- Users can still manually scroll, drag, or swipe the row.
- For a seamless infinite effect, render a duplicated sequence in the track while preserving only four actual project records in content.
- Add edge fade masks so the carousel enters and exits cleanly instead of clipping abruptly.

### Interaction model

- Automatic motion should pause while the user is actively dragging or scrolling.
- After interaction ends, automatic movement can resume.
- On mobile, touch swipe should feel natural and not fight the automatic motion.

### CTA placement

- Keep the `View All Projects` button beneath the carousel, centered as it is now.

### Test coverage

- Replace the grid-oriented test expectations with carousel-oriented assertions:
  - four real project definitions still render as cards
  - carousel container and track exist
  - left/right masks exist
  - CTA remains present
- Keep the regression focused on structure and contract, not animation timing.

## Files Expected To Change

- `components/landing/work-gallery.tsx`
- `lib/content.ts`
- `tests/app/home.test.tsx`
- `app/globals.css` if shared carousel animation utilities are needed

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
- Run a production build, escalating outside the sandbox if Turbopack hits the known port-binding restriction.
