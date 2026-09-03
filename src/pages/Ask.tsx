import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { askBoris, type AskBorisConfidence, type AskBorisSource } from "@/lib/askBoris";
import type { TranslationKey } from "@/i18n/translations";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  confidence?: AskBorisConfidence;
  sources?: AskBorisSource[];
  pendingConfirm?: boolean;
  error?: boolean;
};

function uid() {
  return Math.random().toString(36).slice(2);
}

const CONFIDENCE_KEY: Record<AskBorisConfidence, TranslationKey> = {
  high: "ask.confidence.high",
  medium: "ask.confidence.medium",
  low: "ask.confidence.low",
};

function ConfidenceBadge({ confidence }: { confidence: AskBorisConfidence }) {
  const t = useT();
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        confidence === "high" && "border-accent/40 text-accent",
        confidence === "medium" && "border-border text-muted-foreground",
        confidence === "low" && "border-destructive/40 text-destructive",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          confidence === "high" && "bg-accent",
          confidence === "medium" && "bg-muted-foreground",
          confidence === "low" && "bg-destructive",
        )}
      />
      {t(CONFIDENCE_KEY[confidence])}
    </span>
  );
}

export default function Ask() {
  const t = useT();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }));
  };

  const runQuery = async (question: string, confirmed: boolean, targetId?: string) => {
    setLoading(true);

    const assistantId = targetId ?? uid();
    if (!targetId) {
      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);
    } else {
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, pendingConfirm: false, content: "" } : m)),
      );
    }
    scrollToBottom();

    try {
      for await (const event of askBoris(question, confirmed)) {
        if (event.type === "confirm_needed") {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, pendingConfirm: true } : m)),
          );
        } else if (event.type === "sources") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, sources: event.sources, confidence: event.confidence } : m,
            ),
          );
        } else if (event.type === "token") {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + event.token } : m)),
          );
          scrollToBottom();
        } else if (event.type === "error") {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, error: true } : m)),
          );
        }
      }
    } catch {
      setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, error: true } : m)));
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { id: uid(), role: "user", content: question }]);
    void runQuery(question, false);
  };

  const handleConfirm = (message: Message, userQuestion: string) => {
    void runQuery(userQuestion, true, message.id);
  };

  const questionFor = (assistantIndex: number) => {
    for (let i = assistantIndex - 1; i >= 0; i--) {
      if (messages[i].role === "user") return messages[i].content;
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-14">
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <Link
                to="/"
                className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {t("nav.logo")}
              </Link>

              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-accent/60" />
                <span className="label-mono">{t("ask.label")}</span>
              </div>
              <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                {t("ask.heading")}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t("ask.sub")}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-12 rounded-3xl border border-border bg-card/40">
                <div className="flex flex-col gap-6 p-6 sm:p-8">
                  {messages.length === 0 && (
                    <p className="label-mono text-muted-foreground/70">{t("ask.empty.hint")}</p>
                  )}

                  {messages.map((m, i) =>
                    m.role === "user" ? (
                      <div key={m.id} className="flex flex-col items-end gap-1.5">
                        <span className="label-mono text-muted-foreground/60">{t("ask.you")}</span>
                        <p className="max-w-[85%] rounded-2xl rounded-tr-sm border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground sm:text-base">
                          {m.content}
                        </p>
                      </div>
                    ) : (
                      <div key={m.id} className="flex flex-col items-start gap-2">
                        <span className="label-mono text-accent">{t("ask.boris")}</span>

                        {m.pendingConfirm ? (
                          <div className="w-full rounded-2xl border border-destructive/30 bg-destructive/[0.05] p-5 sm:p-6">
                            <p className="font-serif text-lg italic leading-snug text-foreground sm:text-xl">
                              {t("ask.confirm.title")}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                              {t("ask.confirm.body")}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-3">
                              <button
                                type="button"
                                onClick={() => handleConfirm(m, questionFor(i))}
                                disabled={loading}
                                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-background transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                              >
                                {t("ask.confirm.yes")}
                              </button>
                              <span className="inline-flex items-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
                                {t("ask.confirm.no")}
                              </span>
                            </div>
                          </div>
                        ) : m.error ? (
                          <p className="text-sm leading-relaxed text-destructive">{t("ask.error")}</p>
                        ) : (
                          <div className="w-full rounded-2xl border border-border bg-background/60 p-5 sm:p-6">
                            {m.confidence && (
                              <div className="mb-4">
                                <ConfidenceBadge confidence={m.confidence} />
                              </div>
                            )}
                            <p className="font-serif text-lg italic leading-relaxed text-foreground sm:text-xl">
                              {m.content || (loading && i === messages.length - 1 ? t("ask.thinking") : "")}
                            </p>

                            {!!m.sources?.length && (
                              <div className="mt-5 border-t border-border pt-4">
                                <span className="label-mono">{t("ask.sources.label")}</span>
                                <ul className="mt-2 space-y-1.5">
                                  {m.sources.map((s, si) =>
                                    s.url ? (
                                      <li key={si}>
                                        <a
                                          href={s.url}
                                          target="_blank"
                                          rel="noreferrer noopener"
                                          className="font-mono text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                                        >
                                          {s.title} {s.date && `— ${s.date}`}
                                        </a>
                                      </li>
                                    ) : null,
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ),
                  )}
                  <div ref={bottomRef} />
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-3 border-t border-border p-4 sm:p-5"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("ask.placeholder")}
                    disabled={loading}
                    className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none sm:text-base"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    aria-label={t("ask.send")}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
