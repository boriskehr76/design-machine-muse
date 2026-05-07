## Goal

Add a new project — **Lenny's Podcast — Topic Explorer** — to the Projects section, placed *before* the existing Statistical table project. Capture two screenshots from the live Streamlit app and wire up live + GitHub links.

## What it is (for the case copy)

A machine learning project that clusters **264 episodes** of Lenny's Podcast into **7 topic groups** using SBERT sentence embeddings + K-means, with PCA reducing the 384-D vectors to 2D for an interactive episode map. Transcript data comes from the open ChatPRD transcript database. Users can toggle topics in a sidebar to filter the map and the episode list.

- Live: https://lennys-podgraph.streamlit.app/
- Repo: https://github.com/boriskehr76/lennys-podgraph

## Plan

### 1. Capture screenshots
Take two screenshots from the live app and save them as imports in `src/assets/`:
- `lennys-podgraph-map.png` — the episode map (scatter plot with color-coded topic clusters)
- `lennys-podgraph-list.png` — the filtered episode list/table view

### 2. Update `src/components/sections/Projects.tsx`
Refactor from a single hard-coded article to a small `projects` array of 2 items, each rendered with the same card layout already in place. Keep the existing visual design (number, title, oneliner, two-image grid, expandable seam/ML/design block, live + repo CTAs).

Order:
- **01** — Lenny's Podgraph (new)
- **02** — Statistical table (existing — currently labeled 01)

Update the hard-coded `01` number to come from the array index.

### 3. Add translation keys in `src/i18n/translations.ts`
Rename existing keys with a `p2.` prefix and add new `p1.` keys for Lenny's Podgraph. Mirror in both `en` and `sv`.

New keys (en, sv mirrors them):
- `projects.p1.num`: "01"
- `projects.p1.title`: "Lenny's Podcast — Topic Explorer"
- `projects.p1.oneliner`: "An ML project that clusters 264 podcast episodes into 7 topic groups using SBERT embeddings and K-means, with an interactive 2D episode map."
- `projects.p1.seam.body`: How the model output (cluster assignments + 2D PCA coordinates) shaped the UI — sidebar toggles drive both the scatter plot and the episode list, so the abstract clustering becomes something you can browse.
- `projects.p1.ml.body`: SBERT (Sentence-BERT) embeddings on cleaned transcripts, K-means with K=7 chosen via the elbow method, PCA to project 384-D vectors into a 2D map.
- `projects.p1.dx.body`: Two-pane layout — topic toggles on the left, scatter plot + episode table on the right. Color tokens map 1:1 between dots and topic chips so the visual identity of each cluster carries through.
- `projects.p1.shot1.alt`: "Lenny's Podgraph — episode map scatter plot colored by topic cluster"
- `projects.p1.shot2.alt`: "Lenny's Podgraph — filtered episode list with topic, guest, and duration"
- `projects.p1.live`: reuse `projects.live`
- `projects.p1.repo`: reuse `projects.repo`

Existing project keys get re-prefixed to `projects.p2.*` (title, oneliner, seam.body, ml.body, dx.body, shot1.alt, shot2.alt). Shared labels (`expand`, `collapse`, `seam.label`, `ml.label`, `dx.label`, `live`, `repo`, `label`, `heading`) stay as-is.

### 4. Verify
Check the preview to confirm both project cards render, images load, expand/collapse works, and live/repo links open the correct URLs.

## Notes

- No design system changes — reuses existing card/typography tokens.
- No new dependencies.
