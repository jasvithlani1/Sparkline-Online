# Service Options Toggle Design

Date: 2026-04-07
Status: Approved in conversation, pending final spec review

## Goal

Add the selected Paper services/options block as fully coded interactive UI inside the existing `HOW CAN WE SERVE YOU?` section so users can toggle between the listed service categories.

## Source Reference

The selected Paper node is the `web page strategy options` block, which visually shows a stacked list of service categories with one highlighted item and supporting descriptions.

The coded version should reproduce the structure and editorial feel of that Paper block, not embed it as a flat image.

## Chosen Approach

Use a coded accordion-style toggle list embedded inside the current service banner:

- keep the current banner shell, video, overlay, heading, and submarine composition
- add a real interactive services list inside the section
- show one active item at a time
- clicking or tapping a different item makes it active and updates the visible description

This approach was chosen because it stays close to the Paper reference while satisfying the requirement that users can toggle between the options.

## Content

The toggle list should include these items:

- `Strategy`
  - `Helping you with top notch strategy for GTM`
- `Story/ Voice`
  - `Create the brand story and brand voice`
- `Design`
  - `Help the company in creative way`
- `Development`
  - `Develop products, websites and manage them for you`
- `Media & video`
  - `Content, social media, videography anything you ask for`

Default active item:

- `Strategy`

## Layout

The services list should live inside the existing `HOW CAN WE SERVE YOU?` section rather than replacing it.

Required outcomes:

- the list reads as part of the section composition
- the heading and submarine remain visually important
- the new block does not create horizontal overflow
- the services block remains usable on mobile and tablet with clear tap targets

Recommended direction:

- desktop: stacked editorial list with separators and visible description for the active item
- mobile/tablet: same structure, but with tighter spacing and touch-friendly row heights

## Visual Treatment

- active row should receive a stronger accent treatment that nods to the Paper reference
- inactive rows should remain readable but visually quieter
- separators should help scan the list without looking like default form controls
- the implementation should feel designed, not like a stock accordion component

## Implementation Boundaries

- prefer keeping service data in structured content rather than hardcoding repeated markup inline
- use a small dedicated client component for toggle state if needed
- keep the rest of the service banner structure intact
- do not replace the Paper-inspired design with generic tabs or cards

## Testing And Verification

Required verification:

- add a focused test for default active state and toggle behavior
- run `npm test`
- run `npm run lint`
- run `npm run build`

## Risks

- placing too much UI inside the banner could crowd the existing composition if spacing is not tuned carefully
- an accordion implementation can drift into generic UI if the visual treatment is not handled intentionally
- mobile spacing needs special attention so the list remains usable without overwhelming the banner
