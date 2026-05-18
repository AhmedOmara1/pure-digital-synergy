# Pure Digital

A bilingual (Arabic / English) marketing website for **Pure Digital**, a UAE-based digital agency offering websites & e-commerce, visual identity, video production, paid advertising, and social media management.

## Tech Stack

- **TanStack Start** (React 19, SSR, file-based routing)
- **Vite 7**
- **TypeScript** (strict)
- **Tailwind CSS v4** with semantic design tokens in `src/styles.css`
- **shadcn/ui** components
- **TanStack Query**

## Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev

# Build for production
bun run build
```

The app runs at `http://localhost:5173` by default.

## Project Structure

```
src/
├── routes/              File-based routes (TanStack Start)
│   ├── __root.tsx       Root layout + <head>
│   ├── index.tsx        Home
│   ├── about.tsx        About
│   ├── services.tsx     Services
│   ├── portfolio.tsx    Portfolio
│   ├── testimonials.tsx Testimonials
│   ├── faq.tsx          FAQ
│   └── contact.tsx      Contact
├── components/
│   ├── site/            Navbar, Footer, WhatsApp float, etc.
│   └── ui/              shadcn/ui primitives
├── i18n/                Bilingual (AR/EN) provider + translations
├── hooks/
├── lib/
└── styles.css           Design tokens (oklch) + Tailwind v4 setup
```

## Internationalization

All user-facing copy lives in `src/i18n/translations.ts` with `en` and `ar` keys. The active language is managed by `LanguageProvider` and swaps both direction (`dir="rtl"`) and font stacks automatically.

## Design System

Colors, gradients, and shadows are defined as CSS variables in `src/styles.css` (using `oklch`). Always use semantic tokens (`bg-background`, `text-primary`, `gradient-text`, etc.) — never hardcode hex values in components.

## Routes

| Path            | Page          |
| --------------- | ------------- |
| `/`             | Home          |
| `/about`        | About         |
| `/services`     | Services      |
| `/portfolio`    | Portfolio     |
| `/testimonials` | Testimonials  |
| `/faq`          | FAQ           |
| `/contact`      | Contact       |

## License

© Pure Digital. All rights reserved.
