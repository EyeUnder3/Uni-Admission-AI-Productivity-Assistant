import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { MessageSquare, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/page-header";
import { AiLoading, StructuredOutput } from "@/components/ai-output";
import { useAiFeature } from "@/hooks/use-ai-feature";

export const Route = createFileRoute("/workplace-assistant")({
  head: () => ({
    meta: [
      { title: "AI Workplace Assistant for Admissions Staff | UniAssist AI" },
      {
        name: "description",
        content:
          "Chat with an admissions-focused workplace assistant for drafting, summarising and prioritising administrative work — never for admission decisions.",
      },
      { property: "og:title", content: "AI Workplace Assistant for Admissions Staff" },
      {
        property: "og:description",
        content: "A conversational assistant for admissions administration and productivity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkplaceAssistant,
});

const SUGGESTIONS = [
  "Help me prioritise 40 pending application files today.",
  "Turn these notes into a checklist of outstanding documents.",
  "Draft a polite follow-up asking for a missing transcript.",
  "How can I reduce repetitive applicant enquiry work?",
];

type ChatMessage = { role: "user" | "assistant"; content: string };

function WorkplaceAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { loading, run } = useAiFeature("assistant");
  const endRef = useRef<HTMLDivElement>(null);

  const send = async (text: string) => {
    const prompt = text.trim();
    if (!prompt || loading) return;
    setMessages((m) => [...m, { role: "user", content: prompt }]);
    setInput("");
    const reply = await run(prompt);
    if (reply) setMessages((m) => [...m, { role: "assistant", content: reply }]);
    requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth" }));
  };

  return (
    <div>
      <PageHeader
        icon={MessageSquare}
        title="AI Workplace Assistant"
        description="Ask admissions administration questions, draft messages and organise workload. Outputs are suggestions for human review — never decisions."
      >
        {messages.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => setMessages([])}>
            <Trash2 className="size-4" /> Clear chat
          </Button>
        )}
      </PageHeader>

      <section className="surface-card flex min-h-[28rem] flex-col p-4 sm:p-6" aria-label="Chat">
        <div className="flex-1 space-y-4 overflow-y-auto">
          {messages.length === 0 && !loading && (
            <div className="rounded-xl border border-dashed border-border bg-muted/30 px-5 py-10 text-center">
              <p className="text-sm font-semibold">Start a conversation</p>
              <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                Try one of these admissions productivity prompts.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                  {m.content}
                </p>
              </div>
            ) : (
              <div
                key={i}
                className="max-w-[92%] rounded-2xl rounded-bl-sm border border-border bg-muted/40 px-4 py-3"
              >
                <StructuredOutput text={m.content} />
              </div>
            ),
          )}

          {loading && <AiLoading label="UniAssist AI is thinking…" />}
          <div ref={endRef} />
        </div>

        <form
          className="mt-4 flex items-end gap-2 border-t border-border pt-4"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <Textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            placeholder="Ask about drafting, summarising or prioritising admissions work…"
            aria-label="Message"
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            <Send className="size-4" /> Send
          </Button>
        </form>
      </section>
    </div>
  );
}
