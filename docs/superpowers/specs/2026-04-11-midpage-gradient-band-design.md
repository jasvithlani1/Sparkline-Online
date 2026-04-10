# Midpage Gradient Band Design

## Summary

Apply one continuous top-to-bottom gradient from `#0B349F` to `#050C1E` across the page band that starts below `HOW CAN WE SERVE YOU?` and ends before the footer, while removing the white section backgrounds so the gradient is directly visible.

## Goals

- Create a single continuous gradient surface behind the services-adjacent middle content.
- Start the gradient at `#0B349F` near the top of the band and end at `#050C1E` near the footer boundary.
- Remove the white section backgrounds from the affected sections so the gradient is actually visible.
- Preserve readability for headings, marquee masks, and gallery chrome on the darker surface.

## Non-Goals

- No changes to the hero, Haven Demo card, or footer backgrounds.
- No changes to the service banner video, submarine artwork, or bubble motion.
- No redesign of the work gallery cards themselves.
- No global theme-system refactor.

## Current State

- `app/page.tsx` renders `ServiceBanner`, `LogoGrid`, and `WorkGallery` as separate siblings with no shared background wrapper.
- `components/landing/service-banner.tsx`, `components/landing/logo-grid.tsx`, and `components/landing/work-gallery.tsx` each currently use white section backgrounds.
- `SectionHeading` currently assumes a light surface and renders dark eyebrow and heading text.
- The marquee and work-gallery edge masks fade to white, which would clash against a dark gradient.

## Proposed Design

### Shared gradient wrapper

- Wrap `ServiceBanner`, `LogoGrid`, and `WorkGallery` inside a single parent container in `app/page.tsx`.
- Apply a vertical gradient background on that wrapper from `#0B349F` at the top to `#050C1E` at the bottom.
- Keep the footer outside that wrapper so the footer remains visually separate.

### Section surfaces

- Remove `bg-white` from the outer sections of `ServiceBanner`, `LogoGrid`, and `WorkGallery`.
- Keep existing spacing and layout structure intact unless a local contrast fix requires a small utility update.

### Dark-surface readability

- Extend `SectionHeading` with a dark-surface variant so `LogoGrid` and `WorkGallery` can render light eyebrow and heading text on the gradient.
- Update the logo marquee text color to a lighter treatment that remains readable on the blue-to-navy background.
- Replace the white marquee and carousel fade masks with darker gradient-matched fades so the edges blend into the new wrapper.

### Work gallery cards

- Keep the gallery cards themselves white so the portfolio content still reads as elevated content on top of the gradient surface.
- Keep the CTA button treatment unchanged unless a readability issue appears against the new surrounding surface.

### Testing

- Update the home-page regression to assert the shared gradient wrapper exists with the expected gradient classes.
- Assert the affected sections no longer advertise `bg-white` on their outer wrappers.
- Assert the heading variant or text classes used for dark-surface readability where stable and non-brittle.

## Files Expected To Change

- `app/page.tsx`
- `components/landing/section-heading.tsx`
- `components/landing/logo-grid.tsx`
- `components/landing/work-gallery.tsx`
- `components/landing/service-banner.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page regression.
- Run the full test suite.
- Run a production build.
