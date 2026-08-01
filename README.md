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

**In plain terms:** Sanity Studio (`/studio`) is what replaces the WordPress
admin dashboard. There's no code involved — the media team logs in, picks
"Gallery Image" or "Sermon," drags in a photo or pastes a YouTube link, and
clicks Publish. It shows up on the live site right away.

## Setting up card giving (Flutterwave)

The bank transfer + confirmation form works with no setup. To also accept
debit/credit cards in Naira, Dollars, Pounds, and Euros on the Give page:

1. Create a free account at [dashboard.flutterwave.com](https://dashboard.flutterwave.com).
2. Go to Settings → API Keys. Start with the **Test** public/secret keys to try
   the flow safely; switch to **Live** keys (after Flutterwave verifies your
   business/KYC details) when you're ready to accept real payments.
3. Add to `.env.local`:
   - `NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY`
   - `FLUTTERWAVE_SECRET_KEY`
4. Restart `npm run dev`. The card form appears automatically on `/give` once
   the public key is set (it stays hidden with a "coming soon" message
   otherwise). Every card payment is verified server-side against
   Flutterwave's API (`src/app/api/give/verify/route.ts`) before being
   recorded — the client-side "successful" response is never trusted alone.

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

- [x] Phone / WhatsApp, Facebook, Instagram, service times, bank details — done
- [ ] Confirmed public contact email (still a placeholder in `src/lib/site-config.ts`)
- [ ] Real YouTube channel URL
- [ ] Full church history, Vision, Mission, Core Values, Statement of Faith (`aboutContent` in Studio)
- [ ] Leadership team bios + photos beyond Pastor Victor Eforuoku
- [ ] Optional: a QR code image for the bank/giving accounts
- [ ] Real testimonials — currently demo quotes (clearly marked in the UI) paired
      with real photos of members holding a microphone; swap the quotes for
      genuine ones in Sanity Studio whenever they're ready
- [ ] Arkville & Discipleship FAQ content
- [ ] Flutterwave account (see "Setting up card giving" above) to activate card payments

## Deployment

### Netlify (primary)

`netlify.toml` is already configured with `@netlify/plugin-nextjs`. Connect the
repo in Netlify, set the same environment variables from `.env.local` in
Site settings → Environment variables, and deploy.

### Connecting the Namecheap domain to Netlify

The domain and hosting are on Namecheap (renewed January 2026, expires
17 January 2027) — the WordPress hosting there gets retired once this site is
live, but **keep the domain registration on Namecheap** and just repoint its
DNS to Netlify:

1. In Netlify: Site settings → Domain management → Add a domain → enter the
   Namecheap domain.
2. Netlify will show either a set of DNS records to add, or its own
   nameservers to switch to. Using Netlify DNS (its nameservers) is simplest
   and gives automatic HTTPS.
3. In Namecheap: Domain List → Manage → Nameservers → Custom DNS → paste the
   Netlify nameservers Netlify gave you in step 2.
4. DNS changes can take a few hours to propagate. Netlify auto-provisions a
   free HTTPS certificate once it detects the domain pointing to it.
5. Until the domain is switched, the old WordPress site keeps serving — so
   there's no downtime risk in doing this at your own pace.

### Vercel (alternative)

No config needed — `vercel` auto-detects Next.js. Set the same environment
variables in the Vercel project settings. Domain connection works the same
way (point Namecheap DNS at Vercel instead).

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
