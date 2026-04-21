
# Boris Kehr — Personal Portfolio

A bold, editorial single-page portfolio with EN/SV bilingual support, dark/light theme, and tasteful SVG animations.

## Design system
- **Background**: near-black `#0D0D0D`, off-white text `#F5F2EA`-ish
- **Accent**: cyan/teal (used for the Gaussian curve, "new" badges, "the seam" highlight)
- **Typography**: DM Serif Display (headings, italic for emphasis) + DM Mono (labels, tags, nav, numbers, UI)
- **Tokens**: full HSL palette in `index.css`, Tailwind extended in config; no purple gradients, no Inter/Roboto, no emoji
- **Theme toggle**: dark default, light variant inverts background to off-white with near-black text

## Sections (single page, in order)

1. **Sticky nav** — `boris.kehr` (mono) left; EN/SV toggle + theme toggle right; subtle border on scroll.
2. **Hero (full viewport)** — Two-line serif heading "Design meets / *machine learning*", subhead paragraph, mono pill tags row, two CTAs (filled `#lia`, ghost `#projects`). Background: animated SVG Gaussian bell curve, low-opacity teal, stroke-dashoffset draw-in on load + slow loop.
3. **About** — Two-column: heading + 2 paragraphs left; 2×2 stat cards (20+, ~1, 5, ∞) right with serif numbers + mono labels. Numbers count up on scroll; ∞ stays static.
4. **Skills** — 3-column bordered grid (1px dividers, rounded outer): "ML · in progress" with teal "new" badges, "Design · established", "The seam · the point".
5. **Projects** — Single project card "01 — sndz-table". Serif title, one-liner, two screenshots from `https://sndz-table.lovable.app` (Z Table view + interactive panel) with subtle border + radius. Click-to-expand detail with: teal-tinted "The seam" highlight box, then two-column "ML side" / "Design side". Footer: "Try it live →" + "GitHub repo →" buttons. Hover changes border color.
6. **Background / Timeline** — "Where I've been". Vertical timeline; mono year-range left, serif title+company right, paragraph below. Vertical dashed SVG line draws downward on scroll-into-view (Intersection Observer + stroke-dashoffset).
7. **LIA** — Bordered card, two columns: heading + 2 paragraphs left; bulleted requirements with dot indicators + "Get in touch" button right.
8. **Contact** — "Let's talk", short paragraph, row of underlined mono text links: email, LinkedIn, design portfolio.
9. **Footer** — Mono. Left: `Boris Kehr · Stockholm · 2026`. Right: `Built without a template`.

## Bilingual content (EN / SV)
- All copy from the uploaded `site-copy-en-sv.md` stored as a flat translations object (`{ en: {...}, sv: {...} }`).
- Lightweight React context (`LanguageProvider`) + `useT()` hook; toggle swaps every text node instantly, no reload, no routing change. Persist choice in `localStorage`.

## Animations & interactions
- Hero Gaussian curve: SVG path with `stroke-dasharray`/`stroke-dashoffset` draw-in, then a subtle infinite opacity/translate loop.
- Section reveal: reusable `useInView` hook → fade + translateY on each section.
- Stat counters: animate 0 → target on scroll-in (skip ∞).
- Project card: smooth height expand/collapse for the detail panel.
- Timeline: dashed vertical SVG draws downward when section enters viewport.
- Hover: project card border, nav link underline, button states.

## Project structure
- `src/pages/Index.tsx` — composition of all sections
- `src/components/sections/` — `Nav`, `Hero`, `About`, `Skills`, `Projects`, `Timeline`, `Lia`, `Contact`, `Footer`
- `src/components/GaussianCurve.tsx`, `TimelineLine.tsx`, `StatCounter.tsx`, `ProjectCard.tsx`
- `src/i18n/translations.ts` — full EN/SV dictionary from the uploaded copy file
- `src/contexts/LanguageContext.tsx`, `src/contexts/ThemeContext.tsx`
- `src/hooks/useInView.ts`, `useCountUp.ts`
- Fonts loaded via Google Fonts in `index.html` (DM Serif Display, DM Mono)

## Images
I'll capture the two screenshots from `https://sndz-table.lovable.app` (Z Table view + interactive right panel), save into `src/assets/`, and import them in the project card. If capture fails, I'll insert clearly-marked placeholder slots with correct alt text and a comment indicating where to drop the real images.

## Out of scope (per brief)
No purple/white gradients, no Inter/Roboto, no emoji, no generic AI-portfolio layouts, no HTML `<ul>` bullets in headings/nav.
