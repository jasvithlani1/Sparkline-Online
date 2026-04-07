# Navbar Fixed Scroll-State Design

Date: 2026-04-07
Status: Approved in conversation, pending final spec review

## Goal

Keep the landing-page navbar fixed to the top of the viewport, preserve its glass appearance while the page is at the top of the hero, and transition it into a darker solid shell after scrolling so it stays readable over the white sections.

## Chosen Approach

Use a single fixed navbar with a scroll-driven style state:

- keep one shared navbar component for desktop and mobile
- make the header fixed to the top of the viewport
- track whether the page has crossed a small scroll threshold
- at the top of the page, keep the current glass/transparent hero treatment
- after scrolling, swap to a darker, more opaque shell with stronger border and shadow

This approach was chosen because it preserves the existing hero composition while solving the readability problem over the lighter page sections.

## Behavior

### Top-of-page state

- navbar is fixed and visible
- shell keeps the glass/transparent look appropriate over the hero video
- spacing stays compact and consistent with the current responsive navbar

### Scrolled state

- navbar remains fixed at the top
- shell becomes darker and more opaque so it does not blend into the off-white background
- border and shadow become slightly stronger to separate it from the page content
- mobile hamburger behavior and desktop inline-nav behavior remain unchanged

## Implementation Boundaries

- keep the change inside the existing `Navbar` component
- use small client-side scroll state only for the visual transition
- avoid introducing a separate duplicate navbar for scrolled state
- do not change page structure outside what is necessary to offset the fixed header if overlap becomes an issue

## Testing And Verification

Required verification:

- extend the existing home-page test to assert the navbar is fixed
- add a focused navbar test for the scroll-state style toggle if practical
- run `npm test`
- run `npm run lint`
- run `npm run build`

## Risks

- fixed positioning can cover content if top spacing is not accounted for carefully
- an aggressive scroll threshold can make the transition feel jumpy
- the scrolled-state styling needs enough contrast without looking like a completely different component
