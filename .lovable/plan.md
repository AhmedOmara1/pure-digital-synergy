## Goal
Add an animated aurora/gradient mesh background to the home page hero only, working in both light and dark mode.

## Changes

### 1. `src/styles.css`
Add aurora utilities and keyframes:
- `@keyframes aurora-drift` — slow translate/rotate/scale loop (~20s).
- `@keyframes aurora-pulse` — opacity breathing (~8s).
- `.hero-aurora` — relative container; layered radial-gradient blobs in `--primary`, `--primary-glow`, `--purple-accent` over `--navy-deep` (dark) / `--background` (light), with mix-blend so it looks lush in both themes.
- `.aurora-blob` — absolute, large blurred radial blob; three variants (`.aurora-blob-1/2/3`) positioned top-left, center-right, bottom-center with different colors, sizes, animation delays.
- Respect `prefers-reduced-motion` (disable animations, keep static gradient).

### 2. `src/routes/index.tsx`
- Replace hero `<section className="hero-radial relative overflow-hidden">` with `<section className="hero-aurora relative overflow-hidden">`.
- Inside, add three `<div className="aurora-blob aurora-blob-N" aria-hidden />` before the content container.
- Wrap existing content in a `relative z-10` div so it sits above the blobs.
- Leave all other sections untouched.

## Visual result
Three large, soft, slowly drifting color blobs (brand blue, primary glow, purple accent) blend behind the hero headline and stats. Subtle, premium, agency-style — clearly visible on the dark hero, gentle on light mode.

## Out of scope
- No other sections modified.
- No new assets, packages, or images.
- No copy or layout changes.