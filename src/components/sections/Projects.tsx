import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import shotZ from "@/assets/sndz-z-table.png";
import shotPanel from "@/assets/sndz-panel.png";

export function Projects() {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <section id="projects" className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-accent/60" />
            <span className="label-mono">{t("projects.label")}</span>
          </div>
          <h2 className="max-w-2xl font-serif text-4xl leading-tight text-foreground sm:text-5xl">
            {t("projects.heading")}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <article className="group mt-14 overflow-hidden rounded-2xl border border-border bg-card/40 transition-colors hover:border-accent/60">
            <header className="grid gap-6 p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-end">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {t("projects.num")} / 01
              </span>
              <div>
                <h3 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                  {t("projects.title")}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {t("projects.oneliner")}
                </p>
              </div>
            </header>

            <div className="grid gap-px bg-border sm:grid-cols-2">
              <figure className="bg-background">
                {/* Replace src/assets/sndz-z-table.png with a fresh capture if the live app changes. */}
                <img
                  src={shotZ}
                  alt={t("projects.shot1.alt")}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </figure>
              <figure className="bg-background">
                {/* Replace src/assets/sndz-panel.png with a focused capture of the right interactive panel. */}
                <img
                  src={shotPanel}
                  alt={t("projects.shot2.alt")}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </figure>
            </div>

            <div className="px-8 pb-8 sm:px-10 sm:pb-10">
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:text-accent"
                aria-expanded={open}
              >
                <span>{open ? t("projects.collapse") : t("projects.expand")}</span>
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
              </button>

              <div
                className={cn(
                  "grid transition-all duration-500 ease-out",
                  open ? "mt-8 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="rounded-xl border border-accent/40 bg-accent/[0.06] p-6 sm:p-8">
                    <span className="label-mono text-accent">{t("projects.seam.label")}</span>
                    <p className="mt-3 text-base leading-relaxed text-foreground sm:text-lg">
                      {t("projects.seam.body")}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-background/50 p-6">
                      <span className="label-mono">{t("projects.ml.label")}</span>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {t("projects.ml.body")}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-background/50 p-6">
                      <span className="label-mono">{t("projects.dx.label")}</span>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {t("projects.dx.body")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://sndz-table.lovable.app"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 font-mono text-xs uppercase tracking-wider text-background transition-transform hover:-translate-y-0.5"
                >
                  {t("projects.live")}
                </a>
                <a
                  href="https://github.com/boriskehr76/sndz-table"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {t("projects.repo")}
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
