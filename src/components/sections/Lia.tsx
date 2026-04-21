import { Reveal } from "@/components/Reveal";
import { useT } from "@/contexts/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

const REQS: TranslationKey[] = ["lia.req.1", "lia.req.2", "lia.req.3", "lia.req.4", "lia.req.5"];

export function Lia() {
  const t = useT();
  return (
    <section id="lia" className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card/40 p-8 sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-accent/60" />
                  <span className="label-mono">{t("lia.label")}</span>
                </div>
                <h2 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                  {t("lia.heading")}
                </h2>
                <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  <p>{t("lia.p1")}</p>
                  <p>{t("lia.p2")}</p>
                </div>
              </div>

              <div className="lg:pl-8 lg:border-l lg:border-border">
                <span className="label-mono">{t("lia.req.title")}</span>
                <ol className="mt-6 space-y-4">
                  {REQS.map((req) => (
                    <li key={req} className="flex items-start gap-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{t(req)}</span>
                    </li>
                  ))}
                </ol>

                <a
                  href="mailto:boriskehr76@gmail.com"
                  className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 font-mono text-xs uppercase tracking-wider text-background transition-transform hover:-translate-y-0.5"
                >
                  {t("lia.cta")}
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
