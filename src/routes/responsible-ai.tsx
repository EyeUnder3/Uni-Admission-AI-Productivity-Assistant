import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, ShieldAlert, Eye, UserCheck, Lock, Scale } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI Principles & Limitations | UniAssist AI" },
      {
        name: "description",
        content:
          "How UniAssist AI is used responsibly in university admissions: human oversight, no automated decisions, fairness, privacy and clear system limitations.",
      },
      { property: "og:title", content: "Responsible AI Principles & Limitations" },
      {
        property: "og:description",
        content: "Human oversight, fairness, privacy and transparency commitments for UniAssist AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResponsibleAi,
});

const PRINCIPLES = [
  {
    icon: UserCheck,
    title: "Human oversight always",
    body: "Every AI output is a draft. An authorised staff member must review, edit and approve anything before it reaches an applicant or an official record.",
  },
  {
    icon: ShieldAlert,
    title: "No high-stakes decisions",
    body: "UniAssist AI never makes, predicts or recommends admission, rejection, eligibility, ranking or selection outcomes. Those decisions remain entirely with qualified staff.",
  },
  {
    icon: Scale,
    title: "Fairness and non-discrimination",
    body: "Outputs must not reference or rely on protected characteristics such as race, religion, gender, nationality, disability or age when describing applicants.",
  },
  {
    icon: Eye,
    title: "Transparency about limits",
    body: "The assistant only works with the information you provide. Anything missing is flagged as not provided rather than filled in with plausible-sounding detail.",
  },
  {
    icon: Lock,
    title: "Data minimisation",
    body: "Share only the applicant information needed for the task. Avoid pasting identity numbers, financial details or medical information into prompts.",
  },
  {
    icon: ShieldCheck,
    title: "Accountability",
    body: "The staff member who sends or files an output owns it. Keep a record of material edits made to AI drafts where your institution requires it.",
  },
];

const LIMITATIONS = [
  "It does not know your university's policies, deadlines, fees or programme requirements unless you supply them.",
  "It can make factual mistakes, misread messy notes, or omit context — always verify against official sources.",
  "It has no access to your student information system, email or applicant records.",
  "Generated schedules and priorities are suggestions based only on the workload you describe.",
  "It is not a legal, immigration, financial, academic or wellbeing advisory service.",
];

const USE = [
  "Drafting routine applicant correspondence for review",
  "Summarising your own notes into structured form",
  "Organising and prioritising your administrative workload",
  "Rewriting or shortening internal text you already have",
];

const DONT = [
  "Deciding or hinting at admission or eligibility outcomes",
  "Assessing an applicant's academic ability or suitability",
  "Generating policy, deadline or fee information",
  "Sending output to an applicant without human review",
];

function ResponsibleAi() {
  return (
    <div>
      <PageHeader
        icon={ShieldCheck}
        title="Responsible AI"
        description="UniAssist AI is an administrative productivity tool. These principles define how it should be used inside an admissions office."
      />

      <div
        role="note"
        className="mb-8 flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 px-4 py-3"
      >
        <ShieldAlert className="mt-0.5 size-4.5 shrink-0 text-warning" />
        <p className="text-sm text-foreground/90">
          This system does not make admission or eligibility decisions. All AI-generated content must
          be reviewed by an authorised staff member before use.
        </p>
      </div>

      <section aria-label="Principles" className="grid gap-4 sm:grid-cols-2">
        {PRINCIPLES.map((p) => (
          <article key={p.title} className="surface-card p-5">
            <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <p.icon className="size-5" />
            </span>
            <h2 className="mt-4 text-base font-semibold">{p.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </article>
        ))}
      </section>

      <section aria-label="Appropriate use" className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="surface-card p-5">
          <h2 className="text-base font-semibold">Appropriate use</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {USE.map((u) => (
              <li key={u} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="surface-card p-5">
          <h2 className="text-base font-semibold">Never use it for</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {DONT.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section aria-label="Known limitations" className="surface-card mt-8 p-5 sm:p-6">
        <h2 className="text-base font-semibold">Known limitations</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {LIMITATIONS.map((l) => (
            <li key={l} className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
