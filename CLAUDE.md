# ClaudeToEU.com

Viral landing page advocating for Anthropic to relocate to Europe after refusing US military demands to remove AI safety protections.

## Tech Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** (using `@tailwindcss/vite` plugin)
- **GSAP + ScrollTrigger** for scroll-driven animations
- **Deploy target:** Vercel (static output)

## Commands

```bash
npm run dev      # Start dev server
npm run build    # TypeScript check + production build
npm run preview  # Preview production build
```

## Project Structure

```
src/
  components/     # 7 page sections + reusable UI
    Hero.tsx         # Typewriter quote, fade-in subtitle
    Context.tsx      # 3 animated cards (what happened)
    Opportunity.tsx  # Scroll-pinned manifesto (viral core)
    Equation.tsx     # Values alignment infographic (Anthropic + Europe)
    TheAsk.tsx       # 4-point action checklist
    Close.tsx        # Dramatic "Europe." scale-up finale
    ShareBar.tsx     # Share buttons (X, LinkedIn, Bluesky)
    Footer.tsx       # Disclaimer + link to Anthropic statement
    EUStars.tsx      # Reusable EU stars SVG component
    ProgressBar.tsx  # Gold scroll progress indicator
    Preloader.tsx    # Loading screen with EU stars
  hooks/
    useTypewriter.ts     # Character-by-character reveal
    useCountUp.ts        # Animated number counter
    useScrollAnimation.ts # GSAP ScrollTrigger wrapper
  lib/
    share.ts         # Share URL builders for X/LinkedIn/Bluesky
  assets/
    anthropic-spark.svg
    anthropic-wordmark.svg
```

## Conventions

- TypeScript strict mode
- Tailwind v4 utility classes (custom colors defined in `@theme` in index.css)
- GSAP animations use ScrollTrigger with `once: true` for entrance animations
- Color tokens: `eu-blue`, `eu-gold`, `anthropic-terra`, `dark`, `navy`, `cream`
- Fonts: Playfair Display (serif headings), Inter (body), JetBrains Mono (stats/labels)

## Page Flow

Hero(dark) → Context(navy) → Opportunity(dark→cream) → Equation(cream) → Ask(EU blue) → Close(dark) → Share(cream) → Footer(dark)
