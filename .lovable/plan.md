## Goal
Make the home page feel premium and consistent on light mode + mobile. Particles must be visible everywhere, the hero title gets a refined fade/blur-in (no more washed-out shimmer), and every card group (stats, services, why-us) gets a polished staggered reveal on load/scroll.

## Step 1 — Particles visible in light mode + mobile
File: `src/components/site/Particles.tsx` + `src/routes/index.tsx`
- Currently hero passes `rgba(140,170,255,0.85)` — too light against a near-white background → invisible.
- Switch to a theme-aware color: read `--primary` / a darker indigo, use `rgba(79, 70, 229, 0.55)` style that works on both light and dark.
- Increase contrast: stroke `alpha * 0.6` (was 0.35) so the link lines actually show on white.
- Mobile: current `mobileScale = 0.45` makes particles nearly disappear on phones. Raise to `0.7` and lower min count to keep perf.
- Also raise base `density` for hero from default to `0.00018`.

## Step 2 — Hero title animation
File: `src/routes/index.tsx` (+ remove `animate-shimmer` usage)
- Drop the moving gradient `animate-shimmer` (it's the color-shift the user dislikes and disappears on light bg).
- Use `SplitTextReveal` with word-by-word fade + blur + small Y rise (already in MotionReveal). Final color = solid `gradient-text` (static gradient, no animation).
- Add subtle once-only `letter-spacing` settle (tracking-tight → normal) over 1.2s for an elegant entrance.

## Step 3 — Stats cards entrance
- Replace alternating slide directions with unified fade-up + blur stagger (cleaner, more "fabulous").
- 80ms stagger, spring settle, plus a one-time glow pulse on the border after they land.

## Step 4 — Services & Why-Us cards
- Both already use `MotionStagger` but with mixed rotations. Standardize to: fade + 24px up + 6px blur, 100ms stagger, `once: false` so it replays when scrolling back.
- Add a soft scale-in (0.96 → 1) for extra polish.
- Icon: keep rotate-on-hover, but add an initial "pop" (scale 0 → 1 with spring) when the card enters view.

## Step 5 — CTA banner
- Add a gentle floating animation on the headline and a shimmer sweep on the button (consistent with hero CTA).

## Out of scope
- No new sections, copy, routes, or packages.
- No backend changes.
- Portfolio route untouched.

## Technical notes
- All animation values respect `useReducedMotion()`.
- Particle color computed once at mount from a CSS custom property (`getComputedStyle(document.documentElement).getPropertyValue('--primary')`) with fallback.
- Use `viewport={{ once: false, margin: "-80px" }}` for scroll replays.
