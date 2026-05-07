import { Reveal } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";
import { useT } from "@/contexts/LanguageContext";

export function About() {
  const t = useT();
  return (
    <section id="about" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-accent/60" />
              <span className="label-mono">{t("about.label")}</span>
            </div>
            <h2 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              {t("about.heading")}
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-px bg-border">
              <StatCounter value={0} suffix="" label={t("about.stat1.label")} className="hidden" />
              <StatCounter value={1} suffix="" label={t("about.stat2.label")} />
              <StatCounter value={5} label={t("about.stat3.label")} />
              <StatCounter value="infinity" label={t("about.stat4.label")} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
