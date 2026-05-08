import { Reveal } from "@/components/Reveal";
import { useT } from "@/contexts/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

interface SkillCol {
  title: TranslationKey;
  items: TranslationKey[];
  withBadges?: boolean;
}

const COLS: SkillCol[] = [
  {
    title: "skills.col1.title",
    items: ["skills.ml.1", "skills.ml.2", "skills.ml.3", "skills.ml.4", "skills.ml.5", "skills.ml.6"],
  },
  {
    title: "skills.col2.title",
    items: ["skills.dx.1", "skills.dx.2", "skills.dx.3", "skills.dx.4", "skills.dx.5", "skills.dx.6"],
  },
  {
    title: "skills.col3.title",
    items: ["skills.seam.1", "skills.seam.2", "skills.seam.3", "skills.seam.4", "skills.seam.5"],
  },
];

export function Skills() {
  const t = useT();
  return (
    <section id="skills" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-accent/60" />
            <span className="label-mono">{t("skills.label")}</span>
          </div>
          <h2 className="max-w-2xl font-serif text-4xl leading-tight text-foreground sm:text-5xl">
            {t("skills.heading")}
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-foreground/80">
            {t("skills.intro")}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 overflow-hidden rounded-2xl border border-border">
            <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
              {COLS.map((col) => (
                <div key={col.title} className="p-7 sm:p-9">
                  <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent">
                    {t(col.title)}
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {col.items
                      .filter((item) => t(item).trim() !== "")
                      .map((item) => (
                        <li
                          key={item}
                          className="flex items-start justify-between gap-3 text-sm leading-snug text-foreground/90"
                        >
                          <span>{t(item)}</span>
                          {col.withBadges && (
                            <span className="mt-0.5 shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-accent">
                              {t("skills.badge.new")}
                            </span>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
