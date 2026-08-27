import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader, FlowSteps } from "@/components/page-header";
import {
  AiEmptyState,
  AiErrorState,
  AiLoading,
  AiOutputCard,
  StructuredOutput,
} from "@/components/ai-output";
import { useAiFeature } from "@/hooks/use-ai-feature";
import { buildEmailPrompt } from "@/lib/ai-prompts";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Smart Applicant Email Generator | UniAssist AI" },
      {
        name: "description",
        content:
          "Draft professional, tone-matched applicant emails from the information you supply — reviewed and edited by admissions staff before sending.",
      },
      { property: "og:title", content: "Smart Applicant Email Generator" },
      {
        property: "og:description",
        content: "Tone-matched admissions email drafts generated from your own information only.",
      },
    ],
  }),
  component: EmailGenerator,
});

const PURPOSES = [
  "Request missing documents",
  "Application status update",
  "Application acknowledgement",
  "Deadline reminder",
  "Request additional information",
  "General applicant response",
];

const TONES = ["Formal", "Friendly", "Empathetic", "Persuasive", "Urgent"];

function EmailGenerator() {
  const [applicantName, setApplicantName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("Formal");
  const [info, setInfo] = useState("");
  const [instructions, setInstructions] = useState("");
  const [touched, setTouched] = useState(false);

  const { output, setOutput, loading, error, run, clear } = useAiFeature("email");

  const nameError = touched && !applicantName.trim() ? "Applicant name is required." : "";
  const purposeError = touched && !purpose ? "Select an email purpose." : "";
  const infoError =
    touched && info.trim().length < 10 ? "Add the relevant information (min. 10 characters)." : "";
  const valid = !!applicantName.trim() && !!purpose && info.trim().length >= 10;

  const generate = () => {
    setTouched(true);
    if (!valid) return;
    void run(buildEmailPrompt({ applicantName, purpose, tone, info, instructions }));
  };

  const reset = () => {
    clear();
    setApplicantName("");
    setPurpose("");
    setTone("Formal");
    setInfo("");
    setInstructions("");
    setTouched(false);
  };

  return (
    <div>
      <PageHeader
        icon={Mail}
        title="Smart Applicant Email Generator"
        description="Generate a professional applicant email using only the details you supply. The AI never invents policies, deadlines, fees or applicant information."
      />
      <FlowSteps step={loading ? "processing" : output ? "output" : "input"} />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface-card p-5 sm:p-6" aria-label="Email inputs">
          <h2 className="text-base font-semibold">Input</h2>
          <div className="mt-5 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="applicant">Applicant name</Label>
              <Input
                id="applicant"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="e.g. Thandi Nkosi"
                aria-invalid={!!nameError}
              />
              {nameError && <p className="text-xs text-destructive">{nameError}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="purpose">Email purpose</Label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger id="purpose" aria-invalid={!!purposeError}>
                    <SelectValue placeholder="Select a purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    {PURPOSES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {purposeError && <p className="text-xs text-destructive">{purposeError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TONES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="info">Relevant information</Label>
              <Textarea
                id="info"
                rows={6}
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                placeholder="e.g. Application APP-10241 for BSc Computer Science. Final Grade 12 results and certified ID copy are outstanding. Documents can be uploaded on the applicant portal."
                aria-invalid={!!infoError}
              />
              {infoError && <p className="text-xs text-destructive">{infoError}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Additional instructions (optional)</Label>
              <Textarea
                id="instructions"
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Keep it under 120 words and mention that our office hours are 09:00–15:00."
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={generate} disabled={loading}>
                <Wand2 className="size-4" /> {loading ? "Generating…" : "Generate email"}
              </Button>
              <Button variant="ghost" onClick={reset} disabled={loading}>
                Clear form
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Avoid entering unnecessary personal or sensitive applicant information.
            </p>
          </div>
        </section>

        <section aria-label="Generated email" className="space-y-4">
          <h2 className="text-base font-semibold">Output</h2>
          {loading ? (
            <AiLoading label="Drafting the applicant email…" />
          ) : error ? (
            <AiErrorState message={error} onRetry={generate} />
          ) : output ? (
            <AiOutputCard
              value={output}
              onChange={setOutput}
              onRegenerate={generate}
              onClear={clear}
            >
              <div className="rounded-xl border border-border bg-card p-5">
                <StructuredOutput text={output} />
              </div>
            </AiOutputCard>
          ) : (
            <AiEmptyState
              title="No email generated yet"
              description="Complete the form on the left and select a tone. Your draft appears here, fully editable before you send it."
            />
          )}
        </section>
      </div>
    </div>
  );
}
