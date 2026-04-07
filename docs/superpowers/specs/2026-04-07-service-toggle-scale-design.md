# Service Toggle Scale Adjustment Design

Date: 2026-04-07
Status: Approved in conversation, pending final spec review

## Goal

Reduce the size of the entire interactive toggle card inside the `HOW CAN WE SERVE YOU?` section by roughly 60%, while leaving the section heading, background video, overlay, and surrounding banner composition unchanged.

## Chosen Approach

Adjust the toggle component's sizing directly in code instead of applying a transform scale.

This means shrinking:

- the card width and internal padding
- the vertical offset from the section heading
- row spacing and divider rhythm
- icon container sizes and SVG dimensions
- option title font sizes
- description font sizes
- the active state indicator width

This approach was chosen because it preserves crisp text, predictable pointer targets, and breakpoint-specific control.

## Scope

Only the toggle block should change.

The following elements should remain as they are:

- the `HOW CAN WE SERVE YOU?` heading
- the service banner video and overlay
- the service banner shell dimensions
- the submarine artwork and placement
- toggle interaction behavior and content

## Layout Expectations

- the toggle card should appear visibly smaller across mobile, tablet, and desktop
- the block should still read as part of the banner composition rather than looking detached
- the reduced footprint should not introduce horizontal overflow
- the rows should remain comfortably tappable on smaller screens even after the downscale

## Implementation Boundaries

- make the sizing changes inside `components/landing/service-options-toggle.tsx`
- do not replace the component structure or interaction model
- do not use a CSS transform-based scale for the card
- keep the existing active/inactive styling logic intact unless a size reduction requires a minor spacing tweak

## Testing And Verification

Required verification:

- update or add focused assertions for the new toggle sizing classes if needed
- run the relevant test file for the home page
- run `npm test`
- run `npm run lint`
- run `npm run build`

## Risks

- a literal 60% reduction can make desktop copy feel too small if not balanced per breakpoint
- aggressive downsizing can reduce touch comfort on mobile if row height is cut too far
- shrinking only internal elements without reducing width enough can leave the card looking sparse
