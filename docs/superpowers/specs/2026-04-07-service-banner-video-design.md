# Service Banner Background Video Design

Date: 2026-04-07
Status: Approved in conversation, pending final spec review

## Goal

Replace the static background image in the `HOW CAN WE SERVE YOU?` section with the provided ocean-storm video, keeping the section’s existing layout and headline treatment while improving delivery performance across user devices.

## Source Asset

- User-provided source video:
  - `/Users/kairen/Downloads/Roaring_waves_crash_with_intensity__wind_howls__and_thunder_rumbles_in_a_stormy__turbul1750274481034.webm`

The implementation must create a local project copy of the source material before generating optimized delivery assets.

## Chosen Approach

Use a dual-format background video with viewport-based playback:

- copy the provided source video into the repository as a preserved local source asset
- generate optimized delivery files in both `WebM` and `MP4`
- generate a poster image for initial paint and loading fallback
- replace the current banner `<Image>` with a background `<video>`
- autoplay the video when the section is in view and pause it when the section is outside the viewport

This approach was chosen because it balances fidelity, smooth playback, and broad browser support better than serving the original file directly.

## Asset Plan

### Preserved local source

- Store an internal copy of the user-provided source video inside the repo for traceability and future re-encoding.

Recommended location:

- `public/videos/source/service-banner-ocean-original.webm`

### Optimized delivery assets

- `public/videos/service-banner-ocean.webm`
- `public/videos/service-banner-ocean.mp4`
- `public/images/service-banner-ocean-poster.webp`

Optimization goals:

- trim file size enough to reduce stutter on typical mobile and laptop devices
- preserve the cinematic water motion and storm detail
- keep dimensions appropriate for the banner presentation instead of shipping unnecessary source resolution
- ensure the browser can begin rendering quickly by using metadata preload plus poster image

## Component Behavior

The `ServiceBanner` component should:

- keep the existing section structure, headline placement, overlay gradient, and overlapping submarine image
- replace the current static water background with a `<video>` element positioned the same way as the old image
- use:
  - `muted`
  - `playsInline`
  - `loop`
  - `preload="metadata"`
  - `poster="/images/service-banner-ocean-poster.webp"`
- expose both `WebM` and `MP4` sources so the browser can select the best supported format

## Playback Rules

Playback should be tied to viewport visibility:

- when the banner enters the viewport, start or resume playback
- when the banner leaves the viewport, pause playback
- do not require user interaction
- do not add a reduced-motion exception for this change, because the requested behavior is autoplay for all users

Implementation should prefer `IntersectionObserver` rather than scroll event listeners.

## Testing And Verification

Required verification:

- update or add a component test that asserts the service banner renders a video-based background with the expected source or poster wiring
- run the targeted test file first
- run `npm test`
- run `npm run lint`
- run `npm run build`

## Risks

- the provided source may still be too heavy for smooth playback if encoded conservatively, so encode settings need to prioritize delivery size over archival quality
- autoplay can still be affected by browser policies if the video is not muted or inline-safe, so those attributes are mandatory
- swapping to video introduces client-side playback logic, which should stay isolated to the service banner and not leak complexity into the rest of the page
