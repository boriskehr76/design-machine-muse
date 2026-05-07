// Flat translation dictionary for Boris Kehr portfolio.
// Edit copy here — both locales must stay in sync.

export type Lang = "en" | "sv";

export const translations = {
  en: {
    // Nav
    "nav.logo": "boris.kehr",
    "nav.lang.en": "EN",
    "nav.lang.sv": "SV",
    "nav.theme.toLight": "Light",
    "nav.theme.toDark": "Dark",
    "nav.lia": "LIA Placement",
    "nav.projects": "Projects",
    "nav.about": "About Me",

    // Hero
    "hero.line1": "Design meets",
    "hero.line2": "machine learning",
    "hero.sub":
      "I'm Boris — a UX/UI designer with 20 years of experience who spent the past year building ML systems. I'm interested in the intersection: how model behaviour shapes interface decisions, and how user needs should inform model design.",
    "hero.tag.lia": "LIA 2026 · seeking placement",
    "hero.tag.city": "Stockholm",
    "hero.tag.python": "Python / scikit-learn",
    "hero.tag.figma": "Figma",
    "hero.tag.uxr": "UX research",
    "hero.tag.mlxd": "ML + design",
    "hero.cta.primary": "LIA placement",
    "hero.cta.ghost": "View projects",

    // About
    "about.label": "About",
    "about.heading": "Two disciplines, one practice",
    "about.p1":
      "For two decades I worked at the intersection of complex systems and human needs — designing fintech products at SEB and Swedbank, educational platforms at Learnifier and EdAider, and leading design teams through ambiguity.",
    "about.p2":
      "A year ago I started studying machine learning formally. Not to become an ML engineer, but because I saw a gap: models that behave in ways users can't trust, and interfaces that ignore what the model actually knows. I want to close that gap.",
    "about.stat1.label": "years in design",
    "about.stat2.label": "year in ML",
    "about.stat3.label": "ML×design projects",
    "about.stat4.label": "interest in the seam",

    // Skills
    "skills.label": "Skills",
    "skills.heading": "What I bring",
    "skills.col1.title": "ML · in progress",
    "skills.col2.title": "Design · established",
    "skills.col3.title": "The seam · the point",
    "skills.badge.new": "new",
    "skills.ml.1": "Supervised learning",
    "skills.ml.2": "Clustering & segmentation",
    "skills.ml.3": "Sentiment analysis",
    "skills.ml.4": "Recommendation systems",
    "skills.ml.5": "Anomaly detection",
    "skills.ml.6": "scikit-learn, Python",
    "skills.dx.1": "UX research & testing",
    "skills.dx.2": "Interaction design",
    "skills.dx.3": "Design systems",
    "skills.dx.4": "Accessibility",
    "skills.dx.5": "Workshop facilitation",
    "skills.dx.6": "Figma, Framer",
    "skills.seam.1": "Translating model behaviour to UI decisions",
    "skills.seam.2": "Designing for uncertainty & confidence",
    "skills.seam.3": "User needs → model requirements",
    "skills.seam.4": "Failure mode UX",
    "skills.seam.5": "Explainability in interfaces",

    // Projects
    "projects.label": "Selected work",
    "projects.heading": "Where ML and design meet",
    "projects.num": "01",
    "projects.title": "Statistical table — interactive probability explorer",
    "projects.oneliner":
      "A tool that makes Z-tables and T-tables interactive, with live probability calculations and an animated normal distribution curve.",
    "projects.expand": "Read the case",
    "projects.collapse": "Close",
    "projects.seam.label": "The seam",
    "projects.seam.body":
      "Statistical tables are usually static images in textbooks. Making them interactive meant deciding what the model output — a probability — should look like when a user hovers a cell. The animated bell curve on the right panel isn't decoration: it's the model output made visible. Every design decision in the interface was driven by what the math was actually doing.",
    "projects.ml.label": "ML side",
    "projects.ml.body":
      "Built the probability calculation logic for both Z-scores and T-distributions. The core challenge: translating a z-score lookup into a real-time, continuous output as the user moves through the table.",
    "projects.dx.label": "Design side",
    "projects.dx.body":
      "Designed the two-panel layout so the table and the visual explanation live side by side — not in sequence. The right panel updates live: Z-score, P(Z ≤ z), P(Z > z), and the bell curve with the shaded area moving in real time. Chose a dark theme to make the teal curve and probability highlights legible without visual noise.",
    "projects.live": "Try it live →",
    "projects.repo": "GitHub repo →",
    "projects.shot1.alt": "sndz-table — Z Table view with cumulative probabilities",
    "projects.shot2.alt": "sndz-table — interactive right panel with bell curve",

    // Timeline
    "tl.label": "Background",
    "tl.heading": "Where I've been",
    "tl.e1.period": "2024 – now",
    "tl.e1.title": "ML studies · full-time education",
    "tl.e1.body":
      "Formal program in machine learning. Building ML systems from supervised learning to anomaly detection, with a parallel focus on what these systems mean for interface design. LIA placement autumn 2026.",
    "tl.e2.period": "2023 – 2024",
    "tl.e2.title": "Head of Design · EdAider",
    "tl.e2.body":
      "Led design for three educational AI products. Introduced ML thinking to the design team. Also built the company's AI education content.",
    "tl.e3.period": "2020 – 2023",
    "tl.e3.title": "Senior Product Designer · Learnifier / Qvik",
    "tl.e3.body":
      "B2B learning platform design, design systems, user research. Led UX for Finnair's productivity tooling at Qvik.",
    "tl.e4.period": "2010 – 2020",
    "tl.e4.title": "UX/UI Consultant · inUse / Osynlig / others",
    "tl.e4.body":
      "A decade across fintech (SEB, Swedbank, SBAB, Regeringskansliet), health tech, and enterprise software. Building the pattern recognition this pivot is built on.",

    // LIA
    "lia.label": "LIA placement",
    "lia.heading": "Looking for a host company",
    "lia.p1":
      "My LIA placement runs October to early December 2026 — a formal part of my ML education program. I'm looking for an AI-enabled product company in Stockholm where ML and design work in proximity, not in separate silos.",
    "lia.p2":
      "What I offer: someone who can prototype an ML feature, write the UX spec for it, and explain both to engineers and stakeholders — in the same meeting.",
    "lia.req.title": "What I'm looking for",
    "lia.req.1": "Stockholm (hybrid ok)",
    "lia.req.2": "ML and design in the same product team",
    "lia.req.3": "A mentor who can formally track my progress",
    "lia.req.4": "User-facing AI products — not pure internal tooling",
    "lia.req.5": "Some tolerance for learning-by-doing",
    "lia.cta": "Get in touch",

    // Contact
    "contact.label": "Contact",
    "contact.heading": "Let's talk",
    "contact.body":
      "If you're building AI-powered products in Stockholm and see a role for someone at the intersection of ML and UX, I'd be glad to hear from you.",
    "contact.email": "boriskehr76@gmail.com",
    "contact.linkedin": "LinkedIn",
    "contact.portfolio": "Design portfolio",

    // Footer
    "footer.left": "Boris Kehr · Stockholm · 2026",
    "footer.right": "Built without a template",
  },

  sv: {
    "nav.logo": "boris.kehr",
    "nav.lang.en": "EN",
    "nav.lang.sv": "SV",
    "nav.theme.toLight": "Ljust",
    "nav.theme.toDark": "Mörkt",
    "nav.lia": "LIA-plats",
    "nav.projects": "Projekt",
    "nav.about": "Om mig",

    "hero.line1": "Design möter",
    "hero.line2": "maskininlärning",
    "hero.sub":
      "Jag är Boris — en UX/UI-designer med 20 års erfarenhet som det senaste året ägnat åt att bygga ML-system. Jag är intresserad av skärningspunkten: hur modellbeteende formar gränssnittsbeslut och hur användarbehov bör påverka modelldesign.",
    "hero.tag.lia": "LIA 2026 · söker LIA-plats",
    "hero.tag.city": "Stockholm",
    "hero.tag.python": "Python / scikit-learn",
    "hero.tag.figma": "Figma",
    "hero.tag.uxr": "UX research",
    "hero.tag.mlxd": "ML + design",
    "hero.cta.primary": "LIA-plats",
    "hero.cta.ghost": "Se projekt",

    "about.label": "Om mig",
    "about.heading": "Två discipliner, en praktik",
    "about.p1":
      "I två decennier jobbade jag i skärningspunkten mellan komplexa system och mänskliga behov — designade fintech-produkter för SEB och Swedbank, pedagogiska plattformar för Learnifier och EdAider, och ledde designteam genom osäkerhet.",
    "about.p2":
      "För ett år sedan började jag studera maskininlärning på ett strukturerat sätt. Inte för att bli ML-ingenjör, utan för att jag såg ett tomrum: modeller som beter sig på sätt användare inte kan lita på, och gränssnitt som ignorerar vad modellen faktiskt vet. Jag vill stänga det tomrummet.",
    "about.stat1.label": "år inom design",
    "about.stat2.label": "år inom ML",
    "about.stat3.label": "ML×design-projekt",
    "about.stat4.label": "intresse för skärningspunkten",

    "skills.label": "Förmågor",
    "skills.heading": "Vad jag bidrar med",
    "skills.col1.title": "ML · under uppbyggnad",
    "skills.col2.title": "Design · etablerat",
    "skills.col3.title": "Skärningspunkten · poängen",
    "skills.badge.new": "nytt",
    "skills.ml.1": "Supervised learning",
    "skills.ml.2": "Klustring & segmentering",
    "skills.ml.3": "Sentimentanalys",
    "skills.ml.4": "Rekommendationssystem",
    "skills.ml.5": "Anomalidetektion",
    "skills.ml.6": "scikit-learn, Python",
    "skills.dx.1": "UX-forskning & testning",
    "skills.dx.2": "Interaktionsdesign",
    "skills.dx.3": "Designsystem",
    "skills.dx.4": "Tillgänglighet",
    "skills.dx.5": "Workshop-facilitering",
    "skills.dx.6": "Figma, Framer",
    "skills.seam.1": "Översätta modellbeteende till UI-beslut",
    "skills.seam.2": "Designa för osäkerhet & konfidens",
    "skills.seam.3": "Användarbehov → modellkrav",
    "skills.seam.4": "UX för fellägen",
    "skills.seam.5": "Förklarbarhet i gränssnitt",

    "projects.label": "Utvalt arbete",
    "projects.heading": "Där ML och design möts",
    "projects.num": "01",
    "projects.title": "Statistisk tabell — interaktiv sannolikhetsutforskare",
    "projects.oneliner":
      "Ett verktyg som gör Z-tabeller och T-tabeller interaktiva, med live-sannolikhetsberäkningar och en animerad normalfördelningskurva.",
    "projects.expand": "Läs caset",
    "projects.collapse": "Stäng",
    "projects.seam.label": "Skärningspunkten",
    "projects.seam.body":
      "Statistiska tabeller är oftast statiska bilder i läroböcker. Att göra dem interaktiva innebar att bestämma hur modellens output — en sannolikhet — ska se ut när en användare hovrar över en cell. Den animerade klockformen i höger panel är ingen dekoration: det är modellens output gjord synlig. Varje designbeslut i gränssnittet drevs av vad matematiken faktiskt gjorde.",
    "projects.ml.label": "ML-sidan",
    "projects.ml.body":
      "Byggde sannolikhetsberäkningslogiken för både Z-värden och T-fördelningar. Kärnproblemet: att översätta ett z-värde-uppslag till en realtids-, kontinuerlig output när användaren rör sig genom tabellen.",
    "projects.dx.label": "Design-sidan",
    "projects.dx.body":
      "Designade tvåpanelslayouten så att tabellen och den visuella förklaringen lever sida vid sida — inte i sekvens. Höger panel uppdateras live: Z-värde, P(Z ≤ z), P(Z > z) och klockformen med det skuggade området som rör sig i realtid. Valde ett mörkt tema för att göra den blågröna kurvan och sannolikhetsmarkeringarna läsbara utan visuellt brus.",
    "projects.live": "Testa live →",
    "projects.repo": "GitHub-repo →",
    "projects.shot1.alt": "sndz-table — Z-tabellvy med kumulativa sannolikheter",
    "projects.shot2.alt": "sndz-table — interaktiv höger panel med klockform",

    "tl.label": "Bakgrund",
    "tl.heading": "Var jag har varit",
    "tl.e1.period": "2024 – nu",
    "tl.e1.title": "ML-studier · heltidsutbildning",
    "tl.e1.body":
      "Formellt program i maskininlärning. Bygger ML-system från supervised learning till anomalidetektion, med parallellt fokus på vad dessa system innebär för gränssnittsdesign. LIA-praktik höst 2026.",
    "tl.e2.period": "2023 – 2024",
    "tl.e2.title": "Head of Design · EdAider",
    "tl.e2.body":
      "Ledde design för tre pedagogiska AI-produkter. Introducerade ML-tänk i designteamet. Byggde också företagets AI-utbildningsinnehåll.",
    "tl.e3.period": "2020 – 2023",
    "tl.e3.title": "Senior Product Designer · Learnifier / Qvik",
    "tl.e3.body":
      "B2B-lärplattformsdesign, designsystem, användarforskning. Ledde UX för Finnairs produktivitetsverktyg på Qvik.",
    "tl.e4.period": "2010 – 2020",
    "tl.e4.title": "UX/UI-konsult · inUse / Osynlig / andra",
    "tl.e4.body":
      "Ett decennium inom fintech (SEB, Swedbank, SBAB, Regeringskansliet), hälsoteknik och företagsprogramvara. Byggde mönsterigenkänningen som den här pivoten är byggd på.",

    "lia.label": "LIA-praktik",
    "lia.heading": "Söker ett värdföretag",
    "lia.p1":
      "Min LIA-praktik löper oktober till början av december 2026 — en formell del av mitt ML-utbildningsprogram. Jag söker ett AI-baserat produktbolag i Stockholm där ML och design jobbar nära varandra, inte i separata silos.",
    "lia.p2":
      "Det jag erbjuder: någon som kan prototypa en ML-funktion, skriva UX-specen för den och förklara båda för ingenjörer och intressenter — i samma möte.",
    "lia.req.title": "Det jag söker",
    "lia.req.1": "Stockholm (hybrid ok)",
    "lia.req.2": "ML och design i samma produktteam",
    "lia.req.3": "En mentor som formellt kan följa min progress",
    "lia.req.4": "Användarfacing AI-produkter — inte enbart interna verktyg",
    "lia.req.5": "Viss tolerans för lärande-genom-görande",
    "lia.cta": "Hör av dig",

    "contact.label": "Kontakt",
    "contact.heading": "Låt oss prata",
    "contact.body":
      "Om du bygger AI-drivna produkter i Stockholm och ser en roll för någon i skärningspunkten mellan ML och UX, hör gärna av dig.",
    "contact.email": "boriskehr76@gmail.com",
    "contact.linkedin": "LinkedIn",
    "contact.portfolio": "Designportfolio",

    "footer.left": "Boris Kehr · Stockholm · 2026",
    "footer.right": "Byggd utan mall",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];
