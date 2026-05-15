import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import type { TranslationKey } from "@/i18n/translations";
import shotZ from "@/assets/sndz-z-table.png";
import shotPanel from "@/assets/sndz-panel.png";
import shotPodMap from "@/assets/lennys-podgraph-map.png";
import shotPodList from "@/assets/lennys-podgraph-list.png";
import shotAmaHome from "@/assets/ama-rag-home.png";
import shotAmaAnswer from "@/assets/ama-rag-answer.png";

type ProjectItem = {
  key: "p0" | "p1" | "p2";
  shot1: string;
  shot2: string;
  liveUrl: string;
  repoUrl: string;
};

const projects: ProjectItem[] = [
  {
    key: "p0",
    shot1: shotAmaHome,
    shot2: shotAmaAnswer,
    liveUrl: "https://ask-boris-production.up.railway.app/",
    repoUrl: "https://github.com/boriskehr76/ask-boris",
  },
  {
    key: "p1",
    shot1: shotPodMap,
    shot2: shotPodList,
    liveUrl: "https://lennys-podgraph.streamlit.app/",
    repoUrl: "https://github.com/boriskehr76/lennys-podgraph",
  },
  {
    key: "p2",
    shot1: shotZ,
    shot2: shotPanel,
    liveUrl: "https://sndz-table.lovable.app",
    repoUrl: "https://github.com/boriskehr76/sndz-table",
  },
];

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const k = (suffix: string) => `projects.${project.key}.${suffix}` as TranslationKey;
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="group mt-14 overflow-hidden rounded-2xl border border-border bg-card/40 transition-colors hover:border-accent/60">
      <header className="grid gap-6 p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-end">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {num} / {num}
        </span>
        <div>
          <h3 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl">
            {t(k("title"))}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t(k("oneliner"))}
          </p>
        </div>
      </header>

      <div className="grid gap-px bg-border sm:grid-cols-2">
        <figure className="bg-background">
          <img
            src={project.shot1}
            alt={t(k("shot1.alt"))}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </figure>
        <figure className="bg-background">
          <img
            src={project.shot2}
            alt={t(k("shot2.alt"))}
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
                {t(k("seam.body"))}
              </p>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-background/50 p-6">
                <span className="label-mono">{t("projects.ml.label")}</span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(k("ml.body"))}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/50 p-6">
                <span className="label-mono">{t("projects.dx.label")}</span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(k("dx.body"))}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 font-mono text-xs uppercase tracking-wider text-background transition-transform hover:-translate-y-0.5"
          >
            {t("projects.live")}
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {t("projects.repo")}
          </a>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const t = useT();

  return (
    <section id="projects" className="py-12 sm:py-16">
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

        {projects.map((p, i) => (
          <Reveal key={p.key} delay={120 + i * 60}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
