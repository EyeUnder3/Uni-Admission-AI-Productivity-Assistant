import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Wand2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader, FlowSteps } from "@/components/page-header";
import { AiEmptyState, AiErrorState, AiLoading, AiOutputCard } from "@/components/ai-output";
import { useAiFeature } from "@/hooks/use-ai-feature";
import { buildResearchPrompt } from "@/lib/ai-prompts";

export const Route = createFileRoute("/research-assistant")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant for Admissions | UniAssist AI" },
      {
        name: "description",
        content:
          "Summarize admissions policies, procedures and documents into key points, requirements, dates and practical insights — verify against official sources.",
      },
      { property: "og:title", content: "AI Research Assistant for Admissions" },
      {
        property: "og:description",
        content: "Structured briefings from admissions policy and procedure documents you supply.",
      },
    ],
  }),
  component: ResearchAssistant;
});

const EXAMPLES = [
  "Summarize this university admissions policy.",
  "Extract the important application requirements from these notes.",
  "Summarize this admissions procedure.",
  "Identify the key deadlines mentioned in this document.",
];

function ResearchAssistant() {
  const [topic, setTopic] = useState("");
  const [source, setSource] = useState("");
  const [touched, setTouched] = useState(false);
  const { output, setOutput, loading, error, run, clear } = useAiFeature("research");

  const topicError =
    touched && !topic.trim() && !source.trim()
      ? "Enter a research topic or paste source material."
      : "";

  const generate = () => {
    setTouched(true);
    if (!topic.trim() && !source.trim()) return;
    void run(buildResearchPrompt({ topic, source }));
  };

  return (
    <div>
      <PageHeader
        icon={BookOpen}
        title="AI Research Assistant"
        description="Research and summarize admissions-related material. Enter a topic, paste a policy, procedure or document extract, and get a structured briefing."
      />

      <div
        role="note"
        className="mb-6 flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 px-4 py-3"
      >
        <ShieldAlert className="mt-0.5 size-4.5 shrink-0 text-warning" />
        <p className="text-sm text-foreground/90">
          AI-generated research should be verified against official university policies and sources
          before being used for administrative decisions.
        </p>
      </div>

      <FlowSteps step={loading ? "processing" : output ? "output" : "input"} />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface-card p-5 sm:p-6" aria-label="Research inputs">
          <h2 className="text-base font-semibold">Input</h2>
          <div className="mt-5 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="topic">Research topic or question</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Summarize this admissions procedure"
                aria-invalid={!!topicError}
              />
              {topicError && <p className="text-xs text-destructive">{topicError}</p>}
            </div>

            <div className="space-y-2">
              <Label>Example requests</Label>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setTopic(ex)}
                    className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Source material (optional but recommended)</Label>
              <Textarea
                id="source"
                rows={12}
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Paste the policy text, procedure, prospectus extract or notes you want summarized…"
                className="min-h-[14rem]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={generate} disabled={loading}>
                <Wand2 className="size-4" /> {loading ? "Researching…" : "Generate briefing"}
              </Button>
              <Button
                variant="ghost"
                disabled={loading}
                onClick={() => {
                  setTopic("");
                  setSource("");
                  setTouched(false);
                  clear();
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </section>

        <section aria-label="Research briefing" className="space-y-4">
          <h2 className="text-base font-semibold">Output</h2>
          {loading ? (
            <AiLoading label="Building your research briefing…" />
          ) : error ? (
            <AiErrorState message={error} onRetry={generate} />
          ) : output ? (
            <AiOutputCard
              value={output}
              onChange={setOutput}
              onRegenerate={generate}
              onClear={clear}
            />
          ) : (
            <AiEmptyState
              title="No briefing yet"
              description="Your briefing will include a summary, key points, important requirements, important dates and practical insights."
            />
          )}
        </section>
      </div>
    </div>
  );
}
