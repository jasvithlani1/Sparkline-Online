# Dockclaw Landing Page

Responsive single-page marketing site rebuilt from the selected Paper frame in `Next.js` and `Tailwind CSS`.

## Run locally

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Contact form email

The contact form posts directly to Formspree at `https://formspree.io/f/meewjvgj`, which forwards submissions to `info@sparklinemarketingfirm.com`.

## Sanity content updates

Sanity-backed pages use ISR and revalidate every 60 seconds. For instant updates after publishing in Sanity, configure a Sanity webhook:

- URL: `https://sparkline-marketing.vercel.app/api/revalidate`
- Method: `POST`
- Header: `x-revalidate-secret: <SANITY_REVALIDATE_SECRET>`
- Payload projection should include `_type` and `slug`, for example:

```groq
{
  "_type": _type,
  "slug": slug
}
```

Set the same `SANITY_REVALIDATE_SECRET` value in Vercel production environment variables.

## Verification

Run the automated checks with:

```bash
npm test
npm run lint
npm run build
```

## Key files

- `app/page.tsx` composes the landing page
- `components/landing/*` contains the page sections
- `lib/content.ts` stores the page copy and repeated metadata
- `public/images/*` contains the Paper-derived image assets
