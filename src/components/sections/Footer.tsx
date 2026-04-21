import { useT } from "@/contexts/LanguageContext";

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center">
        <span>{t("footer.left")}</span>
        <span>{t("footer.right")}</span>
      </div>
    </footer>
  );
}
