# Dockclaw Marketing Landing Page Design

Date: 2026-04-05
Status: Approved in conversation, pending final spec review

## Goal

Rebuild the selected Paper frame `Website` (`4NO-0`) as a responsive single-page marketing site in `Next.js` with `Tailwind CSS`, keeping the same copy, section order, imagery, and overall visual language while adapting the layout for smaller screens.

## Source of Truth

- Primary design source: selected Paper frame `Website` (`4NO-0`) in `Freelance - marketing agency`
- The implementation should preserve:
  - the same copy shown in the Paper frame
  - the same section sequence
  - the same editorial and cinematic visual tone
  - the same submarine-led imagery and featured work imagery where extractable
- The implementation may adapt spacing and composition for responsiveness, especially on tablet and mobile

## Chosen Approach

Use a pixel-leaning rebuild:

- Recreate the page as semantic React sections in the Next.js App Router
- Reproduce the visual treatments with code where practical: gradients, glass surfaces, spacing, typography, overlays, and background effects
- Export and reuse the key images from Paper when exact fidelity matters, especially the submarine artwork and project images
- Avoid over-systematizing the page into a generic design system if that would cause visible drift from the source frame

This approach was chosen because it gives the best fidelity to the selected Paper frame while still allowing the page to behave well responsively.

## Technology

- Framework: `Next.js`
- Styling: `Tailwind CSS`
- Routing model: App Router
- Primary page target: `app/page.tsx`

## Page Information Architecture

The site is a single landing page composed of these sections in order:

1. Header / Navbar
2. Hero
3. Featured intro
4. Service banner
5. Trusted-by logo wall
6. Our work gallery
7. Footer

No additional pages are required for the first implementation.

## Section Design

### 1. Header / Navbar

The header floats over the hero section and remains visually compact.

Required content:

- Dockclaw logo mark and wordmark
- Navigation links:
  - Services
  - Portfolio
  - About Us
  - Contact Us
  - Blogs
  - Reviews
- Primary CTA button:
  - `Book a Call`

Visual treatment:

- horizontally centered over the hero
- translucent glass-like container
- rounded corners around 16px
- subtle light border
- compact desktop spacing with a larger gap between logo, nav links, and CTA
- on mobile, nav links may collapse into a simpler layout or compact menu treatment as long as the header still feels visually aligned with the source

### 2. Hero

The hero is the most visually distinctive section and should stay as close to the Paper frame as practical.

Required content:

- two-line heading:
  - `Creative Marketing`
  - `Supercharged`
- large submarine image
- coral or seaweed silhouette treatment near the bottom edge
- soft vertical light rays or a similar underwater spotlight effect

Visual treatment:

- full-width dark background around `#060B1A`
- centered headline near the top-middle
- `Cal Sans` headline styling
- silver-to-darker gradient text fill
- very large display size around 80px on desktop, reduced responsively
- submarine positioned prominently toward the lower-right, oversized enough to dominate the composition
- layered atmospheric background effects instead of a flat background color

### 3. Featured Intro

This is a split editorial block on a warm off-white background.

Required content:

- left headline:
  - `Haven Demo:`
  - `In-space testbed for`
  - `Haven-1 space station`
  - `technologies`
- right paragraph:
  - `In November 2025, Haven Demo achieved mission success after deploying from the Bandwagon-4 rideshare mission.`
- text link:
  - `Learn more`

Visual treatment:

- warm off-white background around `#FDFCF4`
- left/right split on desktop
- generous white space
- large editorial heading around 48px on desktop
- supporting paragraph around 18px
- mobile layout stacks with the headline first and the supporting copy below

### 4. Service Banner

This is a dramatic visual transition section.

Required content:

- heading:
  - `HOW CAN WE SERVE YOU?`
- large blue ocean or water-texture banner image
- overlapping submarine image

Visual treatment:

- strong blue-water panel spanning most of the content width
- white heading placed over the banner near the top-left area
- submarine overlaps the banner and extends beyond the content block for a cinematic composition
- mobile layout should preserve the dramatic image-first feeling without horizontal overflow

### 5. Trusted-By Logo Wall

This section contains centered editorial copy followed by a grid of logos.

Required content:

- eyebrow or section heading:
  - `Trusted by the bold`
- supporting copy:
  - `From breakout startups to industry giants,`
  - `we partner with ambitious companies looking to`
  - `shape the`
  - `future.`
- logo wall containing the marks shown in the Paper design

Visual treatment:

- centered text block
- subdued eyebrow styling
- supporting copy around 32px on desktop
- logo grid in four columns on desktop
- responsive collapse to two columns and then one column as needed
- keep the section airy and editorial rather than enclosed in cards

### 6. Our Work Gallery

This section showcases two featured projects.

Required content:

- section heading:
  - `OUR WORK`
- supporting copy:
  - `A selection of the best projects`
  - `crafted by the OUR team.`
- two project tiles with the same imagery and captions used in Paper

Projects:

- `Firecrawl`
  - caption line: `Website · Branding`
- `Blackign`
  - caption line: `Website · Branding · Product`

Visual treatment:

- centered header copy above the gallery
- two-column desktop layout
- stacked layout on mobile
- project thumbnails should retain the same image dominance and caption minimalism as the Paper frame

### 7. Footer

The footer returns to a dark navy palette and contains multiple content clusters.

Required content:

- brand block:
  - `SPARKLINE`
  - `MARKETING FIRM`
- company links:
  - `Work`
  - `Pricing`
  - `Studio`
  - `Use cases`
  - `Insights`
  - `Playground`
  - `Reach out`
- social links:
  - `LinkedIn`
  - `Dribbble`
- lower content:
  - `SPARKLING MARKETING FIRM is open for business, talks and coffee Monday-Friday.`
  - `Currently we're Online`
  - two location blocks:
    - `LOCATION`
    - `Verd Lunda 4,`
    - `8230, Ayhjal`

Visual treatment:

- dark navy background close to `#273854`
- high-contrast light text
- multi-column desktop structure with large breathing room
- mobile stacks content in a readable order without losing the editorial feel

## Visual System

### Color

- Hero background: near-black ocean tone close to `#060B1A`
- Body background: warm off-white close to `#FDFCF4`
- Footer background: muted navy close to `#273854`
- CTA accent: purple button treatment matching the Paper frame
- Text:
  - hero heading uses a silver gradient fill
  - body text uses dark charcoal around `#2A2C2F`
  - footer text uses warm off-white

### Typography

- Hero headline:
  - `Cal Sans`
  - desktop size around 80px
  - tight tracking around `-0.03em`
  - gradient text fill
- Section headlines:
  - clean sans-serif
  - around 48px desktop for large editorial headings
- Centered supporting copy:
  - around 32px desktop
- Supporting paragraph:
  - around 18px desktop
- Footer lead copy:
  - bold, compact, high-contrast

### Layout Rhythm

- large vertical spacing between sections
- wide central content containers
- image-led sections should feel oversized and dramatic
- avoid dashboard-like density or boxed card-heavy layout patterns

## Responsiveness

Responsiveness should adapt the layout rather than freeze the desktop composition.

Rules:

- hero headline scales down aggressively on smaller screens
- navbar simplifies on smaller screens
- split editorial sections stack vertically
- large imagery is repositioned or resized to avoid overflow
- logo grid reduces column count by breakpoint
- gallery tiles stack vertically on narrow screens
- footer columns collapse into a clean reading order

The mobile result should still feel like the same site, not a separate simplified redesign.

## Asset Strategy

Use Paper as the source of truth for the following:

- submarine hero artwork
- service-banner submarine artwork
- project thumbnails
- any exact logo or image assets that are extractable directly from Paper

Recreate these in code:

- glass navbar shell
- gradients
- text treatments
- section spacing
- light-ray background effects
- background overlays and atmospheric effects

If some Paper image fills or brand marks cannot be extracted cleanly through the MCP tooling, use a visually close fallback while preserving layout and hierarchy.

## Component Breakdown

The implementation should be split into focused sections:

- `Navbar`
- `Hero`
- `FeatureIntro`
- `ServiceBanner`
- `LogoGrid`
- `WorkGallery`
- `Footer`

Shared helpers may be introduced for:

- section containers
- reusable heading blocks
- button styling
- background effect layers

Do not build an unnecessary generalized design system for the first pass.

## Accessibility and Behavior

- Use semantic landmarks and headings
- Ensure sufficient contrast outside of the intentionally stylized hero gradient text
- Navigation and footer links should be keyboard accessible
- CTA button should be visually prominent and interactive
- Decorative imagery may be marked appropriately so screen readers do not get noisy output

## Verification Criteria

The first implementation is successful if:

- the page clearly matches the selected Paper frame in structure and visual tone
- the copy and section order remain the same
- the hero, service banner, and footer preserve the strongest visual cues from the source
- the layout adapts cleanly on mobile without obvious overflow or broken composition
- the page builds and runs in the local Next.js environment

## Known Constraints

- The current workspace did not start as an existing git repository
- Some Paper endpoints can be inconsistent, so image or style extraction may require fallback decisions during implementation
- The build should stay close to the Paper frame without spending excessive effort on imperceptible pixel-level filter differences
