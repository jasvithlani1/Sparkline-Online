# Site Background White Design

## Summary

Change the main website canvas from the current off-white tone to pure white across the site, including the shared background token, hardcoded section backgrounds, and carousel mask gradients that still reference the old off-white color.

## Goals

- Replace the site-wide off-white canvas with pure white.
- Keep the dark hero, service video section, and footer treatments intact.
- Update section backgrounds that still hardcode `#FDFCF4`.
- Update mask gradients so they blend into white instead of off-white.
- Keep layout, spacing, and content unchanged.

## Non-Goals

- No redesign of dark sections.
- No typography or spacing changes.
- No content changes.

## Current State

- The site-wide background token in `app/globals.css` is `#fdfcf4`.
- `app/page.tsx` still hardcodes `bg-[#FDFCF4]`.
- Several sections and mask gradients also hardcode `#FDFCF4`:
  - `FeatureIntro`
  - `LogoGrid`
  - `ServiceBanner`
  - `WorkGallery`
  - left/right fade masks in the logo and work sections

## Proposed Design

### Global background

- Change `--background` from `#fdfcf4` to `#ffffff`.
- Update the `main` wrapper to use pure white.

### Section backgrounds

- Replace each hardcoded `bg-[#FDFCF4]` section fill with `bg-white`.
- Keep dark sections unchanged.

### Mask gradients

- Update the logo marquee and work carousel mask gradients to fade from white instead of the old off-white.
- This keeps the section edges visually clean after the canvas color change.

### Test coverage

- Extend the home-page regression to assert the white background on the main wrapper and/or updated section class where useful.
- Keep the rest of the visual structure assertions intact.

## Files Expected To Change

- `app/globals.css`
- `app/page.tsx`
- `components/landing/feature-intro.tsx`
- `components/landing/logo-grid.tsx`
- `components/landing/service-banner.tsx`
- `components/landing/work-gallery.tsx`
- `tests/app/home.test.tsx`

## Verification

- Run the focused home-page test.
- Run the full test suite.
- Run lint.
