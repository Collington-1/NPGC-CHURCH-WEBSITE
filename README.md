# The New Paradigm Global Church — Website

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui, with Sanity
as the headless CMS for sermons, programs, gallery, testimonials, and staff.

## Tech stack

- **Next.js 15** (App Router, React 19)
- **Tailwind CSS v4** + **shadcn/ui** (`radix-nova` style) for the component layer
- **Framer Motion** for scroll/reveal/hero animation, **GSAP** available for anything Framer can't do cleanly
- **React Hook Form + Zod** for every form (contact, giving confirmation, Arkville & Discipleship registration, newsletter)
- **Sanity** (embedded Studio at `/studio`) as the CMS — sermons, programs, gallery images, testimonials, leadership, FAQs, site settings all live there
- Deployment target: **Netlify** (primary), Vercel-compatible

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The Sanity Studio lives at
[http://localhost:3000/studio](http://localhost:3000/studio) once configured (below).

## Setting up Sanity (required before forms/CMS content work)

The site runs without it (pages render with placeholder content), but forms and
the Studio need a real project:

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage) →
   "Create new project". Note the **Project ID**.
2. Create a dataset named `production` (default).
3. Copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` — from step 1
   - `NEXT_PUBLIC_SANITY_DATASET` — `production`
   - `SANITY_API_WRITE_TOKEN` — sanity.io/manage → your project → API → Tokens →
     Add API token, **Editor** permission (needed so the contact/give/registration
     forms can write submissions)
4. Restart `npm run dev`, then open `/studio` and log in with your Sanity account.
   Populate: Site Settings, Hero Slides, Sermons, Programs, Leadership, Testimonials,
   Gallery Images, FAQs, About Page Content.

Content types are defined in `src/sanity/schemaTypes/`.

## Adding more photos

Real church photography lives one level up, in the `NPGC WEBSITE` folder
(sibling of this project), not inside the repo. To pull new photos in:

1. Drop new images anywhere inside `NPGC WEBSITE/` (a new subfolder is fine).
2. Run:
   ```bash
   node scripts/sync-images.mjs
   ```
   This copies every photo into `public/images/gallery/<category>/`, dedupes
   repeats, and regenerates `src/lib/gallery-manifest.ts` automatically.
3. New filename patterns that don't match an existing rule fall back to the
   `congregation` category — open `scripts/sync-images.mjs` and add a rule, or
   just move the file into the right `public/images/gallery/<category>/` folder
   and re-run.

The logo is auto-detected from any filename containing "logo" (picks the
larger of the two currently in the source folder) and copied to
`public/brand/npgc-logo.png`.

## Content still needed from the client

These are placeholders in the code right now — search for them or check
`src/lib/site-config.ts`:

- [ ] Real phone number (currently `+234 000 000 0000`)
- [ ] Confirmed public contact email
- [ ] Real Facebook / YouTube / Instagram URLs
- [ ] Service times (Sunday service, Bible study, prayer meeting, vigil — day + time each)
- [ ] Full church history, Vision, Mission, Core Values, Statement of Faith (`aboutContent` in Studio)
- [ ] Leadership team bios + photos beyond Pastor Victor Eforuoku
- [ ] Giving bank details (account name/number per category) and optional QR code
- [ ] Real testimonials (currently placeholder quotes marked as such in the UI)
- [ ] Arkville & Discipleship FAQ content

## Deployment

### Netlify (primary)

`netlify.toml` is already configured with `@netlify/plugin-nextjs`. Connect the
repo in Netlify, set the same environment variables from `.env.local` in
Site settings → Environment variables, and deploy.

### Vercel (alternative)

No config needed — `vercel` auto-detects Next.js. Set the same environment
variables in the Vercel project settings.

## Project structure

```
src/
  app/(site)/        Public pages (home, about, programs, activities, gallery, give)
  app/studio/         Embedded Sanity Studio
  app/api/            Form submission routes (contact, give, arkville, discipleship, newsletter)
  components/
    layout/           Header, footer, page hero
    home/             Homepage sections
    forms/            React Hook Form + Zod forms
    gallery/           Masonry gallery + lightbox
  sanity/             Client, schema types, Studio structure
  lib/                Site config, validations, curated + gallery-manifest images
scripts/
  sync-images.mjs     Photo import/categorization pipeline (see above)
```
