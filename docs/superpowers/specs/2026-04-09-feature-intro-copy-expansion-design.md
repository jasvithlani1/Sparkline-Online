# Feature Intro Copy Expansion Design

## Summary

Replace the current one-sentence post-hero body copy with a fuller 4-5 line paragraph that keeps the same core meaning while reading better in the new wide single-column layout.

## Goals

- Keep the same message about Haven Demo achieving mission success after deployment on the Bandwagon-4 rideshare mission in November 2025.
- Expand the copy into a richer 4-5 line paragraph.
- Preserve the section layout and CTA.
- Match the editorial tone of the current site.

## Non-Goals

- No layout changes.
- No CTA changes.
- No new facts beyond the current core message.

## Current State

- The `featuredIntro.body` value in `lib/content.ts` is a single sentence:
  - `In November 2025, Haven Demo achieved mission success after deploying from the Bandwagon-4 rideshare mission.`

## Proposed Design

### Copy treatment

- Rewrite the sentence into a fuller paragraph with similar meaning.
- Keep the language clear, polished, and editorial.
- Avoid introducing unsupported technical claims beyond the current statement.

### Test coverage

- Update the home-page regression to assert a recognizable phrase from the new paragraph instead of the old exact sentence if needed.

## Files Expected To Change

- `lib/content.ts`
- `tests/app/home.test.tsx` if the current test relies on the old exact sentence

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
