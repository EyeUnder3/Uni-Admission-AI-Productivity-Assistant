import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Files,
  FileWarning,
  MessageSquareReply,
  CalendarClock,
  Mail,
  FileText,
  ListChecks,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/app-shell";
import { DEMO_ACTIVITY, DEMO_DEADLINES, DEMO_STATS } from "@/lib/demo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | UniAssist AI Admissions Assistant" },
      {
        name: "description",
        content:
          "Admissions dashboard with application volumes, incomplete files, pending responses, deadlines and AI quick actions.",
      },
      { property: "og:title", content: "UniAssist AI Admissions Dashboard" },
      {
        property: "og:description",
        content: "Track applications, deadlines and AI-assisted admissions tasks in one place.",
      },
    ],
  }),
  component: Dashboard,
});

const STATS: Array<{
  label: string;
  value: number;
  icon: LucideIcon;
  hint: string;
  tone: string;
}> = [
  {
    label: "Total Applications",
    value: DEMO_STATS.totalApplications,
    icon: Files,
    hint: "Current intake cycle",
    tone: "bg-primary-soft text-primary",
  },
  {
    label: "Incomplete Applications",
    value: DEMO_STATS.incompleteApplications,
    icon: FileWarning,
    hint: "Missing documents",
    tone: "bg-warning/15 text-warning",
  },
  {
    label: "Pending Responses",
    value: DEMO_STATS.pendingResponses,
    icon: MessageSquareReply,
    hint: "Applicants awaiting reply",
    tone: "bg-info/15 text-info",
  },
  {
    label: "Upcoming Deadlines",
    value: DEMO_STATS.upcomingDeadlines,
    icon: CalendarClock,
    hint: "Next 14 days",
    tone: "bg-destructive/12 text-destructive",
  },
];

const QUICK_ACTIONS = [
  {
    to: "/email-generator",
    label: "Generate Applicant Email",
    description: "Draft a tone-matched applicant email",
    icon: Mail,
  },
  {
    to: "/summarizer",
    label: "Summarize Application Notes",
    description: "Turn long notes into structured sections",
    icon: FileText,
  },
  {
    to: "/task-planner",
    label: "Create Task Plan",
    description: "Prioritise today's admissions workload",
    icon: ListChecks,
  },
  {
    to: "/workplace-assistant",
    label: "Ask UniAssist AI",
    description: "Chat through an admin task",
    icon: MessageSquare,
  },
] as const;

const STATUS_STYLES: Record<string, string> = {
  complete: "bg-success/15 text-success",
  incomplete: "bg-warning/18 text-warning",
  pending: "bg-info/15 text-info",
  deadline: "bg-destructive/12 text-destructive",
};

const URGENCY_STYLES: Record<string, string> = {
  high: "bg-destructive/12 text-destructive",
  medium: "bg-warning/18 text-warning",
  low: "bg-muted text-muted-foreground",
};

function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="gradient-hero relative overflow-hidden rounded-2xl px-6 py-8 text-primary-foreground shadow-[var(--shadow-elevated)] sm:px-9 sm:py-10">
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <Badge className="mb-4 gap-1.5 border-0 bg-accent text-accent-foreground">
              DEMO DATA
            </Badge>
            <h1 className="text-2xl font-semibold sm:text-3xl">Good morning, Admissions Officer</h1>
            <p className="mt-2 text-sm text-primary-foreground/80 sm:text-base">
              Smarter administration. Better applicant support. Here is your admissions workload
              snapshot for today.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 px-4 py-3 backdrop-blur">
            <BrandMark />
            <div className="text-sm">
              <p className="font-semibold">UniAssist AI</p>
              <p className="text-primary-foreground/75">Assistant ready</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="surface-card p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <span
                className={`inline-flex size-9 items-center justify-center rounded-lg ${stat.tone}`}
              >
                <stat.icon className="size-4.5" />
              </span>
            </div>
            <p className="text-display mt-3 text-3xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
          </div>
        ))}
      </section>

      <section aria-label="Quick actions">
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="surface-card group flex flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <action.icon className="size-5" />
              </span>
              <span className="text-sm font-semibold">{action.label}</span>
              <span className="text-xs text-muted-foreground">{action.description}</span>
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                Open <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        <section aria-label="Recent activity" className="surface-card lg:col-span-3">
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
            <h2 className="text-base font-semibold">Recent Activity</h2>
            <Badge variant="outline" className="text-[10px]">
              DEMO DATA
            </Badge>
          </div>
          <ul className="divide-y divide-border">
            {DEMO_ACTIVITY.map((item) => (
              <li key={item.id} className="flex flex-wrap items-start gap-3 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {item.applicant}{" "}
                    <span className="font-normal text-muted-foreground">· {item.id}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.programme}</p>
                  <p className="mt-1.5 text-sm text-foreground/85">{item.action}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${STATUS_STYLES[item.status]}`}
                  >
                    {item.status}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{item.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-6 lg:col-span-2">
          <section aria-label="Upcoming deadlines" className="surface-card">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-base font-semibold">Upcoming Deadlines</h2>
            </div>
            <ul className="divide-y divide-border">
              {DEMO_DEADLINES.map((d) => (
                <li key={d.label} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold">{d.label}</p>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${URGENCY_STYLES[d.urgency]}`}
                    >
                      {d.due}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{d.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="surface-card p-5">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-success/15 text-success">
                <ShieldCheck className="size-4.5" />
              </span>
              <div>
                <h2 className="text-base font-semibold">Responsible AI</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Human oversight, privacy and a strict prohibition on automated admission
                  decisions.
                </p>
                <Button asChild size="sm" variant="outline" className="mt-3">
                  <Link to="/responsible-ai">Read the principles</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
