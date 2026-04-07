# Landing Page Responsive Pass Design

Date: 2026-04-07
Status: Approved in conversation, pending final spec review

## Goal

Make the full marketing landing page render cleanly across standard mobile and tablet widths while preserving the current visual direction, section order, and desktop composition.

## Scope

This responsive pass covers the entire landing page:

- header / navbar
- hero
- feature intro
- service banner
- trusted-by logo wall
- work gallery
- footer

The goal is not a visual redesign. The work should refine sizing, spacing, stacking, and positioning so the existing page feels intentional on smaller screens.

## Device Targets

The implementation should explicitly hold up at these representative viewport ranges:

- narrow mobile: `360px` to `390px`
- large mobile: `412px` to `430px`
- tablet portrait: `768px`
- tablet landscape / small laptop: `1024px`
- desktop: `1280px` and above

These are target reference widths, not hard-coded breakpoints for every rule.

## Chosen Approach

Use a section-by-section responsive polish pass:

- keep the current page structure and visual language
- refine breakpoint behavior where the current layout feels too desktop-biased
- prefer adjusting existing Tailwind classes over restructuring component boundaries
- keep special-case behavior local to the section that needs it

This approach was chosen because it improves real-device behavior without turning a layout-tuning request into a full redesign.

## Section Requirements

### 1. Navbar

The header should stay balanced and readable before the desktop nav appears.

Required outcomes:

- logo and CTA remain visually balanced on mobile and tablet
- outer padding scales down cleanly on smaller screens
- the glass shell does not feel cramped at tablet widths
- no content overlap or wrapping glitches appear before the desktop navigation breakpoint

### 2. Hero

The hero should remain legible and cinematic across viewport sizes.

Required outcomes:

- heading scale steps down smoothly on mobile and tablet
- headline vertical placement avoids clipping and excessive dead space
- background video remains full-bleed without awkward crop emphasis
- the hero still feels like a single-screen opening section on supported devices

### 3. Feature Intro

The editorial split should transition cleanly from desktop to stacked layouts.

Required outcomes:

- the heading block keeps strong hierarchy without overwhelming narrow screens
- supporting copy width feels comfortable on tablet and mobile
- spacing between the title block and body copy is intentional in stacked layout

### 4. Service Banner

The service banner needs the most careful responsive handling because it combines layered media, text, and the overlapping submarine image.

Required outcomes:

- banner height scales appropriately by device size
- heading inset and size stay readable over the video
- the submarine remains anchored to the viewport right edge
- enlarged submarine sizing must not create horizontal scrolling
- the submarine should feel oversized and cinematic on desktop while still fitting naturally on tablet and mobile
- the extra size bias should continue to grow upward and leftward rather than pulling away from the screen edge

### 5. Trusted-By Logo Wall

The logo grid should feel evenly distributed instead of too sparse or too dense.

Required outcomes:

- logo columns rebalance cleanly across mobile, tablet, and desktop
- heading spacing and copy width feel consistent with the surrounding sections
- logo rows keep comfortable vertical rhythm

### 6. Work Gallery

The gallery should maintain strong image presence without oversized gaps on smaller screens.

Required outcomes:

- section header spacing stays proportional to viewport size
- project cards stack cleanly on mobile
- image aspect presentation remains consistent and intentional
- caption spacing and type scale stay readable

### 7. Footer

The footer should collapse into smaller screens as a composed layout, not a loose pile of blocks.

Required outcomes:

- brand, company, social, status, and location groups stack in a deliberate order
- column gaps and text scale tighten on mobile
- the footer retains its editorial feel on tablet instead of looking like a desktop grid forced smaller

## Implementation Boundaries

- Prefer changing Tailwind layout, spacing, sizing, and typography classes in existing section components.
- Avoid introducing a new layout system or global responsive abstraction layer.
- Keep each section responsible for its own responsive behavior.
- Only add client-side logic if a layout issue cannot be solved with static styling. No new client logic is expected for this pass.

## Testing And Verification

Required verification:

- extend existing tests only where current layout behavior is already pinned by class-based assertions
- run `npm test`
- run `npm run lint`
- run `npm run build`

Manual review should also include checking the landing page at representative widths for overflow, awkward wrapping, and composition drift.

## Risks

- overly aggressive breakpoint tuning can improve one section while making the page feel inconsistent overall
- increasing responsiveness in the service banner can easily disturb the current overlap composition if frame sizing and offsets are not tuned together
- class-only responsive changes can become brittle if they are not kept local and readable within each section
