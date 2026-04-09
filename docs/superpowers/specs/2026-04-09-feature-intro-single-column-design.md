# Feature Intro Single Column Design

## Summary

Replace the two-column post-hero `FeatureIntro` layout with a single wide text block based on the selected Paper reference, removing the left headline block entirely and allowing the right content area to span broadly across the section.

## Goals

- Remove the current left headline block.
- Keep only one wide text content area after the hero.
- Match the selected Paper reference's single-block feel.
- Preserve the existing body copy and CTA.

## Non-Goals

- No new content.
- No changes to the hero or surrounding sections.
- No footer or carousel changes.

## Current State

- `components/landing/feature-intro.tsx` renders a two-column grid:
  - a large left title block from `featuredIntro.title`
  - a smaller right content block from `featuredIntro.body` and `featuredIntro.cta`

## Proposed Design

### Layout

- Remove the left title block from the rendered section.
- Replace the two-column grid with a single wide content container.
- Let the content block expand close to the section max width, similar to the selected `1390px` Paper frame.

### Content treatment

- Keep `featuredIntro.body` as the main visible content.
- Keep the CTA below the paragraph in the same content group.
- Use a more spacious paragraph presentation so the section feels wide rather than sidebar-sized.

### Test coverage

- Update the home-page regression to assert the old left headline text is no longer present in this section.
- Assert the section renders as a single-column content block with the CTA still present.

## Files Expected To Change

- `components/landing/feature-intro.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
