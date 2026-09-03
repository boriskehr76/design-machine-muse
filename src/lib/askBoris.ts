// Client for the Ask Boris RAG API (Flask + ChromaDB + Claude, served from Railway).
// The /ask endpoint is POST + SSE-formatted body, not a real EventSource
// (EventSource only supports GET), so we read the streamed response manually.

export const ASK_BORIS_API_URL =
  (import.meta.env.VITE_ASK_BORIS_API_URL as string | undefined) ??
  "https://ask-boris-production.up.railway.app";

export type AskBorisSource = {
  title: string;
  date: string;
  url: string | null;
  type: "post" | "conversation" | "note";
};

export type AskBorisConfidence = "high" | "medium" | "low";

export type AskBorisEvent =
  | { type: "confirm_needed" }
  | { type: "sources"; sources: AskBorisSource[]; confidence: AskBorisConfidence }
  | { type: "token"; token: string }
  | { type: "error"; message: string }
  | { type: "done" };

async function* streamAsk(question: string, confirmed: boolean): AsyncGenerator<AskBorisEvent> {
  const res = await fetch(`${ASK_BORIS_API_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, confirmed }),
  });

  if (!res.ok) {
    throw new Error(`Ask Boris API responded with ${res.status}`);
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const data = await res.json();
    if (data.confirm_needed) {
      yield { type: "confirm_needed" };
      return;
    }
    if (data.error) {
      yield { type: "error", message: data.error };
      return;
    }
  }

  if (!res.body) {
    yield { type: "error", message: "No response body from Ask Boris API." };
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const chunks = buffer.split("\n\n");
    buffer = chunks.pop() ?? "";

    for (const chunk of chunks) {
      const line = chunk.trim();
      if (!line.startsWith("data:")) continue;
      const payload = line.slice("data:".length).trim();
      if (payload === "[DONE]") {
        yield { type: "done" };
        continue;
      }
      try {
        const parsed = JSON.parse(payload);
        if (parsed.sources) {
          yield { type: "sources", sources: parsed.sources, confidence: parsed.confidence ?? "medium" };
        } else if (typeof parsed.token === "string") {
          yield { type: "token", token: parsed.token };
        } else if (parsed.error) {
          yield { type: "error", message: parsed.error };
        }
      } catch {
        // Ignore malformed chunks rather than aborting the whole stream.
      }
    }
  }
}

export function askBoris(question: string, confirmed = false) {
  return streamAsk(question, confirmed);
}
