# The New Paradigm Global Church — Website

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui, with Sanity
as the headless CMS for sermons, programs, gallery, testimonials, and staff.

## Tech stack

- **Next.js 15** (App Router, React 19)
- **Tailwind CSS v4** + **shadcn/ui** (`radix-nova` style) for the component layer
- **Framer Motion** for scroll/reveal/hero animation, **GSAP** available for anything Framer can't do cleanly
- **React Hook Form + Zod** for every form (contact, giving confirmation, Arkville & Discipleship registration, newsletter)
- **Sanity** (Studio deployed separately at `<project>.sanity.studio` — see below) as the CMS — sermons, programs, gallery images, testimonials, leadership, FAQs, site settings, upcoming programs, and a full media library (videos, audio, books, documents, YouTube Shorts) all live there
- **Flutterwave** for multi-currency (NGN/USD/GBP/EUR) card giving
- Floating "Live" button (`src/components/shared/live-stream-button.tsx`) that lights up automatically during the weekly YouTube livestream schedule (`src/lib/live-schedule.ts`), plus a manual override in Studio for unscheduled streams
- Deployment target: **Netlify** (primary), Vercel-compatible

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setting up Sanity (required before forms/CMS content work)

The site runs without it (pages render with placeholder data), but forms and
the admin dashboard need a real project.

**Why the Studio isn't embedded in this app:** Sanity Studio 5.x requires
React 19.2+'s new `useEffectEvent` hook internally, which Next.js 15's
production webpack build can't currently resolve — every Sanity/next-sanity
release that fixes this requires Next.js 16, which this project intentionally
avoids (see git history / project notes). Rather than fight that, the Studio
is deployed as Sanity's own free-hosted app — this is a common, more robust
pattern anyway, since it decouples the admin dashboard's build from the
website's build entirely.

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage) →
   "Create new project". Note the **Project ID**.
2. Create a dataset named `production` (default).
3. Copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` — from step 1
   - `NEXT_PUBLIC_SANITY_DATASET` — `production`
   - `SANITY_API_WRITE_TOKEN` — sanity.io/manage → your project → API → Tokens →
     Add API token, **Editor** permission (needed so the contact/give/registration
     forms can write submissions)
4. Add the same three variables in **Netlify → Site settings → Environment
   variables** so the live site can read/write too.
5. Deploy the admin dashboard itself (one-time, then re-run only when schema
   fields change):
   ```bash
   npx sanity login
   npx sanity deploy
   ```
   This asks for a Studio "hostname" (e.g. `npgc` → `npgc.sanity.studio`) and
   publishes the dashboard there. Log in with your Sanity account and populate:
   Site Settings, Hero Slides, Sermons, Programs, Leadership, Testimonials,
   Gallery Images, FAQs, About Page Content, and everything under Media Library.

Content types are defined in `src/sanity/schemaTypes/`.

**In plain terms:** Sanity Studio (`https://<your-hostname>.sanity.studio`) is
what replaces the WordPress admin dashboard. There's no code involved — the
media team logs in, picks "Gallery Image" or "Sermon," drags in a photo or
pastes a YouTube link, and clicks Publish. It shows up on the live site right
away.

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

The client organizes new photos into category-named folders and drops the
whole thing directly into `public/ALL PHOTOS TYPES/<Category>/` (e.g.
`public/ALL PHOTOS TYPES/Arkville/photo1.jpg`). To pull them into the site:

1. Add the new category to `FOLDER_TO_CATEGORY` in `scripts/sync-images.mjs`
   (maps the client's folder name to a gallery category slug) if it's a
   brand-new category — existing categories (Welcome, Prayer, Ministration,
   Pastor, Pastor's Wife, Programs, Testimonies, Worship, Happy, and the
   nested Events/Beyond Borders → Special Events) already work.
2. Run:
   ```bash
   node scripts/sync-images.mjs
   ```
   This **moves** every photo into `public/images/gallery/<category>/`,
   deletes the now-empty source folders, and regenerates
   `src/lib/gallery-manifest.ts` automatically.
3. Update whichever page/component should use the new photos (e.g. swap the
   Arkville page's `gallery` array once real Arkville/children's photos
   arrive — see the TODO comment in
   `src/app/(site)/activities/arkville/page.tsx`).

The logo already lives at `public/brand/npgc-logo.png` (a one-time manual
copy) — the sync script doesn't touch it.

## Content still needed from the client

- [x] Phone / WhatsApp, Facebook, Instagram, YouTube, service times, bank details — done
- [x] Founding year (2020) and Pastor Nonye Eforuoku added to Leadership — done
- [ ] Confirmed public contact email (still a placeholder in `src/lib/site-config.ts`)
- [ ] Confirmed real domain name (`siteConfig.url` is a placeholder — affects sitemap/canonical/share previews)
- [ ] Milestone years between 2020 (founding) and 2026 for the About page timeline
- [ ] Dedicated Arkville/children's ministry photos (client said these are coming — see the TODO in `src/app/(site)/activities/arkville/page.tsx`)
- [ ] Full church history detail, plus any corrections to the drafted Vision/Mission/Core Values (`aboutContent` in Studio)
- [ ] Optional: a QR code image for the bank/giving accounts
- [ ] Real testimonials — currently demo quotes (clearly marked in the UI) paired
      with real photos of members holding a microphone; swap the quotes for
      genuine ones in Sanity Studio whenever they're ready
- [ ] Arkville & Discipleship FAQ content
- [ ] Flutterwave account (see "Setting up card giving" above) to activate card payments
- [ ] YouTube Shorts URLs (paste into Studio → Media Library → YouTube Short to populate the home page grid)

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
  app/(site)/        Public pages (home, about, programs, activities, gallery, give, resources)
  app/api/            Form submission routes (contact, give, arkville, discipleship, newsletter, event-registration)
  components/
    layout/           Header, footer, page hero
    home/             Homepage sections
    forms/            React Hook Form + Zod forms
    gallery/           Masonry gallery + lightbox
  sanity/             Client, schema types, Studio structure (deployed separately — see "Setting up Sanity")
  lib/                Site config, validations, curated + gallery-manifest images
scripts/
  sync-images.mjs     Photo import/categorization pipeline (see above)
```
