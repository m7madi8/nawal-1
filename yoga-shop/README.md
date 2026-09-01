# Solace — Yoga Accessories Shop

A premium, editorial e-commerce extension for two products — **The Mat** and
**The Block** — built to feel like a natural continuation of an existing
warm, minimal yoga brand site. Not a Shopify template. Not a SaaS grid.

---

## Stack

| Layer       | Choice                                   | Why                                                                 |
|-------------|-------------------------------------------|----------------------------------------------------------------------|
| Framework   | Next.js 14 (App Router) + TypeScript      | Static generation for two known product pages, typed data contracts |
| Styling     | Tailwind CSS                              | Design tokens live in `tailwind.config.ts`, not scattered CSS       |
| Motion      | Framer Motion (primary) + a Lenis smooth-scroll provider | Declarative component-level animation; GSAP hook point left open (see below) |
| Data        | Local typed module (`lib/products.ts`)    | Two products only — no CMS overhead until you actually need one     |

No backend is wired up yet — see **"Where this deliberately stops"** below.

---

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The two product pages are statically generated
at `/product/the-mat` and `/product/the-block`.

```bash
npm run build       # production build
npm run type-check  # TypeScript, no emit
npm run lint        # ESLint (next/core-web-vitals)
```

---

## Design system

Every visual decision traces back to `tailwind.config.ts` — nothing is
hardcoded inline. If a color or size isn't in the token list below, it
shouldn't appear in a component.

**Color** (warm palette only — the product photography stays the strongest
color moment on the page):

| Token | Hex | Use |
|---|---|---|
| `cream` | `#F7F3EC` | Primary background |
| `warm-white` | `#FBF9F5` | Secondary background (alternating sections) |
| `sand` | `#EDE4D3` | Tertiary background, placeholder tone |
| `stone` | `#D9CCB8` | Placeholder tone, borders |
| `soft-brown` / `soft-brown-dark` | `#8B7355` / `#6B5842` | Eyebrow text, accents, icons |
| `charcoal` | `#2B2622` | Primary text, primary buttons |
| `muted-black` | `#1A1714` | Darkest surface (lifestyle banner) |
| `muted-pink` / `muted-pink-dark` | `#E3C2C2` / `#CFA3A3` | **Product-only** accent — the Soft Pink colorway |

**Type**: `Fraunces` (display, editorial serif) + `Inter` (body). Loaded via
`next/font/google` in `app/layout.tsx` — self-hosted at build time, no
runtime font-fetch flash.

**Signature element**: the hero's "breathing" product photograph — a 6s
scale/opacity pulse timed to a resting breath, plus scroll-linked parallax.
See `components/sections/Hero.tsx`. This is the one deliberately animated
flourish; every other motion in the app is calm scroll-reveal by comparison
(`components/ui/Reveal.tsx`), on purpose — don't add competing signature
moments elsewhere.

**Motion rules already baked in**:
- `prefers-reduced-motion` is respected in three places: `Reveal.tsx`
  (skips to static), `globals.css` (global animation-duration override),
  and `SmoothScrollProvider.tsx` (skips Lenis entirely).
- Every transition uses one eased curve (`ease-editorial`,
  `cubic-bezier(0.22, 1, 0.36, 1)`) for consistency — avoid introducing a
  second easing curve without a specific reason.

---

## Architecture

```
app/
  layout.tsx               → fonts, metadata, viewport, Header/Footer, SmoothScrollProvider
  page.tsx                 → shop landing page (assembles sections in order)
  globals.css               → Tailwind layers, focus states, reduced-motion overrides
  loading.tsx / error.tsx   → route-level loading & error boundaries, on-brand
  not-found.tsx
  robots.ts / sitemap.ts    → generated from lib/products.ts, no manual sync needed
  product/[slug]/page.tsx   → static-generated product detail page

components/
  ui/            → Container, Button, Reveal, Accordion, PhotoPlaceholder
  layout/        → Header (transparent→solid on scroll), Footer
  sections/      → one file per shop-landing-page section, in page order
  product/       → Gallery, StickyPurchasePanel, ProductStory, QuickView, etc.
  providers/     → SmoothScrollProvider (Lenis)

lib/
  types.ts       → Product, ColorVariant, Review, FAQItem, etc.
  products.ts     → THE single source of truth for both products
  utils.ts        → cn() class merger, formatPrice()
```

**Why this shape**: every section on the landing page is one component, in
one file, named after what it is (`WhyTheseProducts.tsx`, not
`Section3.tsx`). Adding, reordering, or removing a section is a one-line
change in `app/page.tsx`. Product content lives in exactly one place
(`lib/products.ts`) — copy, pricing, specs, reviews, and FAQ are all typed,
so a typo in a field name fails the build instead of failing silently in
the browser.

---

## Extending this later

**Adding a third product** (if the brand ever wants to): add one object to
the `PRODUCTS` array in `lib/products.ts` matching the `Product` type. The
landing page grid, the static route generation, and the related-product
logic all pick it up automatically — no component changes needed. (The
current brief is intentionally two products; `WhyTheseProducts.tsx`'s copy
assumes that framing and would need a copy pass if the catalog grows.)

**Real commerce (cart, checkout, inventory)**: `StickyPurchasePanel.tsx`
has a single `handleAddToCart` function with a comment marking the seam —
swap the `setTimeout` placeholder for a real mutation (Supabase edge
function, Shopify Storefront API, or similar) without touching layout code.
Cart state itself isn't wired up yet; when it is, reach for React Context
or a small Zustand store rather than prop-drilling — keep it out of URL
state.

**CMS instead of the local data file**: `lib/products.ts` exports typed
functions (`getProductBySlug`, `getAllProductSlugs`) — swapping the
in-memory array for a fetch to Sanity/Contentful/Shopify only requires
changing the inside of those two functions and making the product page
`async`. Nothing downstream needs to change.

**GSAP ScrollTrigger**: not wired in yet — Framer Motion + `Reveal.tsx`
covers every reveal on the page today. If a future section needs true
scroll-scrubbed animation (a pinned section, a scroll-driven video
scrub), install `gsap` (already a dependency) and register
`ScrollTrigger` inside a `useGSAP`/`useEffect` hook with proper cleanup —
don't mix it into `Reveal.tsx` itself, keep it scoped to the one section
that needs it.

**Bilingual EN/AR**: not implemented in this pass (brief didn't call for
it). If it's needed later: move copy out of components into a
`lib/content/{en,ar}.ts` pair or a proper i18n library, add
`dir="rtl"` at the `<html>` or route-group level, switch `ml-`/`mr-` to
`ms-`/`me-` throughout, and re-check every `translateX` in Framer Motion
variants for direction-awareness. Budget real time for this — it's not a
find-and-replace.

---

## Photography — what's still a placeholder

Every image in this build is a styled placeholder (`PhotoPlaceholder.tsx`)
labeled with exactly what should replace it. This was a deliberate
trade-off: real cinematic photography can't be generated here, but the
layout, spacing, motion, and hierarchy needed to be evaluable now rather
than blocked on a photoshoot.

Shot list, by slot (see labels in `lib/products.ts` and each section
component for the exact alt text expected):

- **Hero**: one full-bleed cinematic lifestyle shot, warm natural light
- **Per product, per colorway** (×2 products × 2 colors = 4 sets): one
  clean "floating" hero shot, one in-use lifestyle shot, one texture/detail
  close-up
- **Materials section**: two macro texture shots (cork, rubber)
- **Lifestyle banner**: one full-bleed environmental shot

To swap a placeholder for a real photo: replace the `<PhotoPlaceholder>`
usage with Next's `<Image>` pointing at a file in
`public/images/products/`, matching the path already referenced in
`lib/products.ts`'s `ColorVariant.images`. Aspect ratios are already
correct in each component (`aspect-[4/5]`, etc.) — the image will drop in
without layout changes.

---

## Quick View

`components/product/QuickView.tsx` is a modal triggered from the "Quick
View" button that appears on hover (and on keyboard focus) over each
product card on the landing page. It carries its own color-selection
state, locks body scroll while open, closes on `Escape` or backdrop click,
and hands off to the full product page via "View Full Details" — so a
visitor can compare both products' price and colorways without losing
their place on the landing page.

## Production checklist before launch

A few things are intentionally stubbed and should be revisited before
this goes live:

- `metadataBase` in `app/layout.tsx` and the URLs in `app/sitemap.ts` /
  `app/robots.ts` use a placeholder domain (`solace.example.com`) — swap
  for the real domain.
- `public/favicon.svg` is a minimal placeholder mark, not a final logo.
- `StickyPurchasePanel`'s and `QuickView`'s "Add to Cart" both simulate a
  network call with `setTimeout` — see "Real commerce" above for the real
  integration seam.
- `app/error.tsx` logs to `console.error` only — wire up real error
  reporting (Sentry or similar) before launch.

## Accessibility & performance already in place

- Keyboard focus is visible everywhere (`:focus-visible` in `globals.css`,
  never removed on any interactive element)
- Semantic HTML: `<article>`, `<dl>`/`<dt>`/`<dd>` for specs, proper heading
  hierarchy per section
- All icon-only buttons (color swatches, gallery close, accordion toggles)
  have `aria-label`
- `next/font` self-hosts and preloads both typefaces — no CLS from webfont
  swap
- Images are the one deferred item — once real photography replaces the
  placeholders, use `next/image` (already configured in
  `next.config.mjs`) for automatic lazy-loading and AVIF/WebP output
