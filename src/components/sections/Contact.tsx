import { Reveal } from "@/components/Reveal";
import { useT } from "@/contexts/LanguageContext";

export function Contact() {
  const t = useT();
  const links = [
    { label: t("contact.email"), href: "mailto:boriskehr76@gmail.com" },
    { label: t("contact.linkedin"), href: "https://www.linkedin.com/in/boriskehr/" },
    { label: t("contact.portfolio"), href: "https://boriskehr.framer.website/" },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-accent/60" />
            <span className="label-mono">{t("contact.label")}</span>
          </div>
          <h2 className="font-serif text-5xl leading-tight text-foreground sm:text-6xl">
            {t("contact.heading")}
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("contact.body")}
          </p>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {links.filter(l => l.label).map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="group relative font-mono text-sm text-foreground transition-colors hover:text-accent"
              >
                <span>{l.label}</span>
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-foreground transition-transform group-hover:scale-x-0" />
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
