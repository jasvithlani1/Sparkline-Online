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
