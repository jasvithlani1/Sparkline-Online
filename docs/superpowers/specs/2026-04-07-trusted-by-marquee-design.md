# Trusted By Marquee Design

Date: 2026-04-07
Status: Approved in conversation, pending final spec review

## Goal

Replace the static logo grid in the `Trusted by the bold` section with a responsive two-row marquee that loops infinitely, with the second row moving in the opposite direction and both edges softly masked.

## Chosen Approach

Use a CSS-based marquee layout with duplicated logo tracks and keyframe animation.

This means:

- each row renders the logo list in a single horizontal line
- each row duplicates the same content once so the animation can loop seamlessly
- the first row scrolls one direction and the second row scrolls the opposite direction
- edge masks fade the logos in and out on both sides

This approach was chosen because it is lighter and more predictable than a JavaScript-driven scroller while still matching the requested motion effect.

## Layout

The `Trusted by the bold` heading block should stay above the moving logos.

The logo area should change from a static grid to:

- two horizontal marquee rows
- each row containing the full list of logos in one line
- consistent spacing between logos
- enough vertical separation between the two rows so the motion does not feel crowded

## Responsiveness

- mobile: keep both rows as marquees with slightly smaller type and tighter horizontal gaps
- tablet: preserve two distinct rows with comfortable spacing and readable speeds
- desktop: use wider spacing and a calmer visual rhythm across the full section width
- the marquee container must not introduce horizontal page overflow

## Visual Treatment

- add left and right edge masks so the tracks blend into the page instead of clipping sharply
- keep the overall section aligned with the existing landing-page visual language
- preserve the monochrome editorial feel of the current wordmark list
- the animation should feel smooth and continuous, not jittery or abrupt

## Implementation Boundaries

- update the current logo section component rather than creating a separate section
- prefer CSS keyframes and duplicated content over JavaScript animation logic
- keep the logo data in structured content and reuse the existing logo list
- preserve accessibility by keeping the moving text readable and avoiding hidden primary content

## Testing And Verification

Required verification:

- add or update a focused home-page test for the marquee rows and opposite-direction classes
- verify the old grid-only layout assertion is replaced appropriately
- run `npm test`
- run `npm run lint`
- run `npm run build`

## Risks

- duplicated marquee content can become visually repetitive if spacing is too tight
- motion that is too fast will feel noisy rather than premium
- masking needs to be subtle enough that the first and last visible logos remain readable
