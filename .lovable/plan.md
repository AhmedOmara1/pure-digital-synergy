# Home Page Enhancements

Add four new features to the home page, all using existing design tokens (gradient-bg, gradient-text, glow-shadow, primary, card) — no new colors, no new libraries.

## 1. Scroll progress bar (global)

A thin 2px bar fixed to the very top of the viewport that fills left→right as the user scrolls the page.

- New component: `src/components/site/ScrollProgress.tsx`
  - Listens to `window.scroll`, computes `scrollTop / (scrollHeight - innerHeight)`
  - Renders a fixed bar with `gradient-bg` and `transform: scaleX(progress)` (transform-origin left)
  - `z-50`, sits above navbar
- Mount once inside `src/routes/__root.tsx` so it appears on every route
- Respects `prefers-reduced-motion` (instant updates, no transition)

## 2. Count-up animation for stats

The 4 stat cards in the hero currently show static strings (e.g. "120+", "50+"). Animate the numeric portion from 0 → target when the card enters view.

- New hook: `src/hooks/use-count-up.ts`
  - Args: `target: number`, `duration = 1400ms`, `start: boolean`
  - Uses `requestAnimationFrame` with easeOutCubic
  - Returns current integer value
- Update `src/routes/index.tsx` stats block:
  - Parse each `s.num` into `{ prefix, number, suffix }` (e.g. "120+" → "", 120, "+")
  - New `StatNumber` component wraps `useInView` + `useCountUp(start = inView)`
  - Preserves gradient-text styling
- Translations in `src/i18n/translations.ts` stay as-is (parsing handles "+", "%", "x", etc.)

## 3. Process / Timeline section

A new section between "Why Us" and the CTA banner showing the 4-step delivery process.

- Add `process` block to `src/i18n/translations.ts` (EN + AR):
  - title, sub, steps: [Discover, Design, Build, Launch] — each with title + short text
- New section in `src/routes/index.tsx`:
  - Desktop (≥md): horizontal 4-column layout with a connecting gradient line behind the step circles
  - Mobile: vertical stack with a left-side vertical line
  - Each step: numbered circle (gradient-bg), title, short paragraph
  - Wrapped with existing `Reveal` for staggered entrance
  - RTL-safe (use logical properties / flex direction works automatically)

## 4. Featured portfolio preview

A new section showing 3 featured case-study cards above the CTA banner.

- Add `featured` block to `src/i18n/translations.ts` under `home`:
  - title, sub, viewAll label
  - items: 3 placeholders `{ title, category, tag }` (no images required for v1)
- New section in `src/routes/index.tsx`:
  - 3-column grid (lg), 1-column mobile
  - Each card: aspect-video gradient placeholder with category label, then title + tag chips, hover lift + border glow (matches service cards)
  - "View all work →" Link to `/portfolio`
  - Reveal stagger 100/200/300

## Section order (final)

```text
Hero → Services strip → Why Us → Process timeline → Featured portfolio → CTA banner
```

## Technical notes

- All new code is presentation only — no backend, no new deps
- Reuses existing `useInView`, `Reveal`, `Card`, `Button`, design tokens
- All animations respect `prefers-reduced-motion` (count-up snaps to final value, progress bar still works, reveals already handled)
- Bilingual: every new string goes through `t.*` in both EN and AR
- No images needed for portfolio v1 (gradient placeholders); easy to swap in real screenshots later

## Files touched

- create `src/components/site/ScrollProgress.tsx`
- create `src/hooks/use-count-up.ts`
- edit `src/routes/__root.tsx` (mount ScrollProgress)
- edit `src/routes/index.tsx` (count-up stats, process section, featured section)
- edit `src/i18n/translations.ts` (process + featured strings, EN + AR)
