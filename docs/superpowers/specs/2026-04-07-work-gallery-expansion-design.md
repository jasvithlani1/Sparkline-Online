# Work Gallery Expansion Design

Date: 2026-04-07
Status: Approved in conversation, pending final spec review

## Goal

Expand the `OUR WORK` section from two project cards to four project cards and add a `View All Projects` button beneath the grid.

## Chosen Approach

Duplicate the existing two project entries so the section can ship with four real-looking cards immediately, then add a section CTA below the grid.

This means:

- keep the existing section heading and card structure
- reuse the current `Firecrawl` and `Blackalgo` names, metadata, and images for the two added cards for now
- add a single `View All Projects` button after the card grid

This approach was chosen because it satisfies the requested section expansion without inventing new project assets or introducing unnecessary layout risk.

## Content

The section should render four cards total:

- `Firecrawl`
- `Blackalgo`
- `Firecrawl`
- `Blackalgo`

The added cards should reuse the same image and metadata values as the current two cards.

The section should also include:

- `View All Projects`

## Layout

- keep the existing responsive card grid structure
- mobile: cards stack vertically
- larger screens: the grid should continue to fill in a balanced multi-column layout
- place the `View All Projects` button below the grid with enough spacing so it reads as the section-level action

## Visual Treatment

- preserve the current editorial gallery card styling
- make the `View All Projects` button feel like a deliberate CTA rather than a plain text link
- keep the section aligned with the rest of the landing-page visual language

## Implementation Boundaries

- update `lib/content.ts` for the expanded project list
- update `components/landing/work-gallery.tsx` to render the CTA beneath the grid
- keep the existing card component structure and image treatment intact

## Testing And Verification

Required verification:

- add or update a focused home-page test asserting four project cards and the CTA button
- run `npm test`
- run `npm run lint`
- run `npm run build`

## Risks

- duplicated cards are intentionally temporary and may look repetitive until unique projects are provided
- the CTA placement needs enough breathing room so it does not feel attached to only the last card
