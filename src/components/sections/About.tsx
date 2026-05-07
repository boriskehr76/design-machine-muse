import { Reveal } from "@/components/Reveal";
import { useT } from "@/contexts/LanguageContext";

export function About() {
  const t = useT();
  return (
    <section id="about" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div>
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-accent/60" />
              <span className="label-mono">{t("about.label")}</span>
            </div>
            <h2 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              {t("about.heading")}
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p className="whitespace-pre-line">{t("about.p1")}</p>
              <p className="whitespace-pre-line">{t("about.p2")}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
