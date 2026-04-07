# Paper Footer Replacement Design

Date: 2026-04-07
Status: Approved in conversation, pending final spec review

## Goal

Replace the current coded site footer with the selected Paper footer design while keeping the page responsive across mobile, tablet, and desktop.

## Source Reference

The selected Paper node is `5JA-0`. It contains:

- a dark navy upper footer band with a subtle grid/pattern background
- three content columns: `COMPANY`, `GET IN TOUCH`, and `BACKGROUND`
- a white lower legal bar with copyright and policy links

The coded version should reproduce that visual structure and spacing, not keep the existing footer layout.

## Content

### Company

- `Home`
- `About Us`
- `FAQ`

### Get In Touch

- `Mail Us`
- `Contact Us`

### Background

- short Sparkline brand paragraph in the same editorial style as the Paper reference
- short line inviting users to connect on social channels
- icon buttons for `Instagram` and `Pinterest`

### Legal Bar

- `©2026 SPARKLINE MARKETING FIRM All Rights Reserved.`
- `Privacy Policy`
- `Terms of Service`
- `Accessibility`

## Layout

The footer should be split into two stacked sections:

- upper section: dark navy patterned band with three columns and generous spacing
- lower section: white legal strip with copyright on the left and policy links on the right

Required outcomes:

- mobile: stack the three content groups vertically with clear separation and comfortable spacing
- tablet: allow the footer to reflow cleanly without squeezing copy or icon buttons
- desktop: restore the Paper-style three-column layout and horizontal legal row
- the legal links should wrap or stack before they collide

## Visual Treatment

- preserve the dark navy atmosphere from the Paper footer
- recreate the subtle grid/pattern feel in the top band
- use strong white section headings and lighter body/link text beneath them
- keep the social buttons as compact blue rounded-square icon chips
- maintain a crisp white lower bar with dark text for contrast

## Implementation Boundaries

- replace the current footer component rather than layering the new design on top of the old one
- update structured footer content in `lib/content.ts` to match the new Paper-based layout
- keep the footer accessible with real text labels for links and social actions
- make the implementation responsive without introducing horizontal overflow
- preserve the existing site tone while matching the selected Paper composition closely

## Testing And Verification

Required verification:

- add or update a focused home-page test for the new footer headings and content
- verify the old footer-only content that is removed no longer appears
- run `npm test`
- run `npm run lint`
- run `npm run build`

## Risks

- matching the Paper layout too literally can create cramped columns on tablet widths if spacing is not adapted
- replacing the footer structure will invalidate current footer assertions and needs coordinated test updates
- the patterned upper band should feel intentional without overwhelming the rest of the landing page
