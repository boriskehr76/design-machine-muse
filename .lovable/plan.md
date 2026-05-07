## Nav, hero pills, and section order

### 1. Top nav (`src/components/sections/Nav.tsx`)
Restructure into a 3-column layout:
- **Left:** `boris.kehr` logo (unchanged)
- **Center:** two text links — "LIA Placement" → `#lia` and "View Projects" → `#projects`
- **Right:** "About Me" link → `#about`, then the existing EN/SV toggle and theme switch

Links use the same mono/uppercase styling as the existing hero CTAs (small, no pill border, hover → accent color). Layout uses `justify-between` with the center group absolutely centered (or a 3-column grid) so the middle stays visually centered regardless of right-side width. On narrow widths the center links collapse below or hide — will keep them visible down to ~640px and hide on smaller.

New translation keys added to `src/i18n/translations.ts`:
- `nav.lia` → "LIA Placement" / "LIA-plats"
- `nav.projects` → "View Projects" / "Se projekt"
- `nav.about` → "About Me" / "Om mig"

### 2. Hero pills (`src/components/sections/Hero.tsx`)
Remove the round pill border around the tag list (LIA 2026, Stockholm, Python, Figma, etc.). Replace with plain inline text separated by a thin divider (`·`) in muted mono type — no border, no background, no rounded-full. Keeps the same content, just unstyled.

### 3. Section order (`src/pages/Index.tsx`)
Reorder the `<main>` children to:

```text
Hero
Lia              (Looking for a host company)
Projects         (Where ML and design meet)
Skills           (What I bring)
Timeline         (Where I've been)
About            (Two disciplines, one practice)
Contact          (Let's talk)
```

About moves to just before Contact per your answer. Footer stays last.

### Files
- Edit `src/components/sections/Nav.tsx` — new 3-column layout with center links + About link
- Edit `src/components/sections/Hero.tsx` — strip pill styling from tag list
- Edit `src/pages/Index.tsx` — reorder sections
- Edit `src/i18n/translations.ts` — add 3 nav keys (EN + SV)
