# Pure Digital — Bilingual Marketing Website

A 7-page bilingual (Arabic RTL / English LTR) marketing site with a language toggle, dark navy + electric blue palette, and the supplied logo.

## Design System

- **Palette (oklch in `src/styles.css`)**: dark navy background `#0a1628`, electric blue primary `#2563eb` → glow `#3b82f6`, white/near-white foreground, muted slate for secondary text. Gradient accent matching the logo (blue → purple).
- **Typography**: Inter (EN body/headings) + Poppins (EN display), Cairo (AR body) + Tajawal (AR headings) — loaded via Google Fonts in `__root.tsx`. Font family swaps based on active language.
- **Components**: shadcn Button, Card, Accordion, Dialog, Tabs, Carousel, Form, Input, Select, Textarea, Sonner (toasts).
- **Logo**: copied to `src/assets/logo.jpg`, used in navbar + footer + favicon.

## i18n Approach

Lightweight context-based i18n (no external lib needed):
- `src/i18n/translations.ts` — single source of truth: `{ en: {...}, ar: {...} }` keyed by section.
- `src/i18n/LanguageProvider.tsx` — context with `lang`, `setLang`, `t(key)`, `dir`. Persists choice in `localStorage`, sets `<html lang>` and `<html dir>` via effect.
- Navbar toggle button: "AR / EN".
- Tailwind RTL handled via logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`) plus `dir="rtl"` on `<html>`.

## Route Structure (TanStack Start file routes)

```
src/routes/
  __root.tsx              -> shell + LanguageProvider + Navbar + Footer + WhatsApp float + GA4/Pixel placeholders
  index.tsx               -> Home (hero, stats, services strip, why-us)
  about.tsx               -> About (story, values, team)
  services.tsx            -> 5 detailed service sections
  portfolio.tsx           -> Filterable grid + project modal + lightbox
  testimonials.tsx        -> Carousel + trusted-by strip
  faq.tsx                 -> Accordion FAQ
  contact.tsx             -> Contact info + validated form + final CTA banner
  sitemap[.]xml.ts        -> Dynamic sitemap server route
```

Each route gets its own `head()` with bilingual-aware title, description, og:title, og:description, og:image (1200×630), and canonical. Root sets `LocalBusiness` JSON-LD. `public/robots.txt` allows all, disallows `/admin`. Custom 404 already exists in `__root.tsx` — restyled with "Back to Home".

## Page-by-Page

1. **Home** — Hero with bilingual headline, two CTAs (primary → /contact, secondary → /portfolio), stats bar (55+/32+/5/90%), services icon strip (5 cards linking to /services), why-us 4-card grid.
2. **About** — Two-column story (AR+EN intent: shows the active language), 4 values cards, 3 team cards with placeholder avatars.
3. **Services** — 5 stacked sections, alternating layout, each with title, description, "Includes" check-list.
4. **Portfolio** — Tabs filter (All/Websites/Branding/Video/Ads/Content), responsive grid (3/2/1), Dialog modal with project details + "Start a Similar Project" CTA to /contact, image lightbox via Dialog. Seed with sample projects incl. Bloom Restaurant.
5. **Testimonials** — shadcn Carousel with 3 testimonials (stars, avatar, name, title), trusted-by logo strip (placeholder marks).
6. **FAQ** — shadcn Accordion with 6 Q&A items.
7. **Contact** — Info block (WhatsApp, email, Instagram, LinkedIn, hours), validated form (react-hook-form + zod), final CTA banner.

## Shared Components

- `Navbar` — sticky, logo left, nav links, AR/EN toggle, "Start Now" CTA. Mobile: Sheet drawer.
- `Footer` — logo + tagline, quick links, services list, social icons, copyright, privacy/terms links.
- `WhatsAppFloat` — fixed bottom-end button on every page (uses `end-6` for RTL safety).
- `SectionHeading`, `Container` helpers.

## Technical

- **Performance**: lazy-load images via native `loading="lazy"`; hero image preloaded via route `head().links`.
- **SEO**: per-route head metadata, JSON-LD `LocalBusiness` at root, dynamic `sitemap.xml` listing all 7 routes, `robots.txt`.
- **Analytics**: GA4 + Meta Pixel script tags in `__root.tsx` with `GA_ID` / `PIXEL_ID` placeholders the user can swap. `<noscript>` Pixel fallback in `<body>`, not `<head>`.
- **Form**: client-side validation only (no backend). Submit shows success toast. (Wiring to email/CRM requires Lovable Cloud — can add later if requested.)
- **Responsive**: Tailwind breakpoints; mobile-first.
- **404**: existing `notFoundComponent` restyled with bilingual copy + Home button.

## What I'll skip unless asked

- Pricing page (not in spec, but referenced in footer — I'll point the footer link to `/services` and note this).
- Backend for contact form (would need Lovable Cloud).
- Real GA4 / Pixel IDs (placeholders).
- OG images — will omit `og:image` until you provide one or want generation, per project guidelines.

Ready to build on approval.
