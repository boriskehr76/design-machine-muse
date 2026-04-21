import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { TimelineLine } from "@/components/TimelineLine";
import { useT } from "@/contexts/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

const ENTRIES: { period: TranslationKey; title: TranslationKey; body: TranslationKey }[] = [
  { period: "tl.e1.period", title: "tl.e1.title", body: "tl.e1.body" },
  { period: "tl.e2.period", title: "tl.e2.title", body: "tl.e2.body" },
  { period: "tl.e3.period", title: "tl.e3.title", body: "tl.e3.body" },
  { period: "tl.e4.period", title: "tl.e4.title", body: "tl.e4.body" },
];

export function Timeline() {
  const t = useT();
  const listRef = useRef<HTMLOListElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!listRef.current) return;
    const update = () => setHeight(listRef.current?.offsetHeight ?? 0);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(listRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="background" className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-accent/60" />
            <span className="label-mono">{t("tl.label")}</span>
          </div>
          <h2 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
            {t("tl.heading")}
          </h2>
        </Reveal>

        <div className="relative mt-14 pl-6 sm:pl-10">
          <TimelineLine height={height} />
          <ol ref={listRef} className="space-y-14">
            {ENTRIES.map((entry, i) => (
              <Reveal key={entry.title} delay={i * 80} as="div">
                <li className="relative grid gap-3 sm:grid-cols-[160px_1fr] sm:gap-10">
                  <span
                    aria-hidden
                    className="absolute -left-[27px] top-2 h-2 w-2 rounded-full bg-accent ring-4 ring-background sm:-left-[43px]"
                  />
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {t(entry.period)}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl leading-snug text-foreground sm:text-3xl">
                      {t(entry.title)}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {t(entry.body)}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
