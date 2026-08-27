import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Wand2, ClipboardPaste } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader, FlowSteps } from "@/components/page-header";
import { AiEmptyState, AiErrorState, AiLoading, AiOutputCard } from "@/components/ai-output";
import { useAiFeature } from "@/hooks/use-ai-feature";
import { buildSummarizerPrompt } from "@/lib/ai-prompts";
import { DEMO_NOTES } from "@/lib/demo-data";

export const Route = createFileRoute("/summarizer")({
  head: () => ({
    meta: [
      { title: "AI Application Notes Summarizer | UniAssist AI" },
      {
        name: "description",
        content:
          "Turn lengthy application notes and applicant correspondence into structured summaries, missing documents, action items and follow-ups.",
      },
      { property: "og:title", content: "AI Application Notes Summarizer" },
      {
        property: "og:description",
        content: "Structured admissions summaries with no invented facts or admission decisions.",
      },
    ],
  }),
  component: Summarizer,
});

const SECTIONS = [
  "Application Summary",
  "Missing Documents",
  "Action Items",
  "Important Dates",
  "Decisions / Information",
  "Follow-Up Required",
];

function Summarizer() {
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState(false);
  const { output, setOutput, loading, error, run, clear } = useAiFeature("summarizer");

  const notesError =
    touched && notes.trim().length < 40
      ? "Paste at least 40 characters of notes to summarize."
      : "";

  const generate = () => {
    setTouched(true);
    if (notes.trim().length < 40) return;
    void run(buildSummarizerPrompt(notes));
  };

  return (
    <div>
      <PageHeader
        icon={FileText}
        title="AI Application Notes Summarizer"
        description="Paste application notes, applicant correspondence or file notes. The AI reorganises them into structured sections and marks anything unavailable as 'Not provided'."
      />
      <FlowSteps step={loading ? "processing" : output ? "output" : "input"} />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface-card p-5 sm:p-6" aria-label="Notes input">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-semibold">Input</h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setNotes(DEMO_NOTES);
                setTouched(false);
              }}
            >
              <ClipboardPaste className="size-4" /> Load demo notes
            </Button>
          </div>
          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Application notes / correspondence</Label>
              <Textarea
                id="notes"
                rows={18}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Paste the applicant's file notes, email thread or administrative notes here…"
                aria-invalid={!!notesError}
                className="min-h-[20rem]"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{notes.trim().length} characters</span>
                <span>Only the text you paste is used.</span>
              </div>
              {notesError && <p className="text-xs text-destructive">{notesError}</p>}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={generate} disabled={loading}>
                <Wand2 className="size-4" /> {loading ? "Summarizing…" : "Summarize notes"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setNotes("");
                  setTouched(false);
                  clear();
                }}
                disabled={loading}
              >
                Clear
              </Button>
            </div>
          </div>
        </section>

        <section aria-label="Structured summary" className="space-y-4">
          <h2 className="text-base font-semibold">Output</h2>
          {loading ? (
            <AiLoading label="Extracting summary, missing documents and action items…" />
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
            <div className="space-y-4">
              <AiEmptyState
                title="No summary yet"
                description="Paste your notes and run the summarizer. The output is grouped into the sections below."
              />
              <ul className="grid gap-2 sm:grid-cols-2">
                {SECTIONS.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            This tool never assesses whether an applicant should be accepted or rejected.
          </p>
        </section>
      </div>
    </div>
  );
}
