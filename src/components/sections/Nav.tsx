import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export function Nav() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm tracking-tight text-foreground hover:text-accent transition-colors">
          {t("nav.logo")}
        </a>

        <nav className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 sm:flex">
          <a
            href="#lia"
            className="pointer-events-auto font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
          >
            {t("nav.lia")}
          </a>
          <a
            href="#projects"
            className="pointer-events-auto font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
          >
            {t("nav.projects")}
          </a>
        </nav>

        <nav className="flex items-center gap-2">
          <a
            href="#about"
            className="mr-2 hidden font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent sm:inline"
          >
            {t("nav.about")}
          </a>
          <div
            className="flex items-center rounded-full border border-border bg-card/60 p-0.5 font-mono text-xs"
            role="group"
            aria-label="Language"
          >
            {(["en", "sv"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={cn(
                  "rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors",
                  lang === code
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-pressed={lang === code}
              >
                {t(code === "en" ? "nav.lang.en" : "nav.lang.sv")}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
            aria-label={theme === "dark" ? t("nav.theme.toLight") : t("nav.theme.toDark")}
          >
            {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
