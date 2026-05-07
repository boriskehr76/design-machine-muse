import { LossLandscape } from "@/components/LossLandscape";
import { useT } from "@/contexts/LanguageContext";

export function Hero() {
  const t = useT();

  const tags = [
    t("hero.tag.lia"),
    t("hero.tag.city"),
    t("hero.tag.python"),
    t("hero.tag.figma"),
    t("hero.tag.uxr"),
    t("hero.tag.mlxd"),
  ];

  return (
    <section id="top" className="relative flex min-h-[80vh] w-full items-center overflow-hidden pt-14">
      <LossLandscape />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-4">
        <div className="mb-8 flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="h-px w-8 bg-accent/60" />
          <span className="uppercase tracking-[0.2em]">Boris Kehr · UX × ML</span>
        </div>

        <h1 className="font-serif text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] text-foreground animate-fade-in">
          <span className="block">{t("hero.line1")}</span>
          <span className="block italic text-accent">{t("hero.line2")}</span>
        </h1>

        <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("hero.sub")}
        </p>

        <ul className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.72rem] uppercase tracking-wider text-muted-foreground">
          {tags.map((tag, i) => (
            <li key={tag} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="text-muted-foreground/40">·</span>}
              <span>{tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
