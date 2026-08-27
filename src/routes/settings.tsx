import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Workspace Settings & Preferences | UniAssist AI" },
      {
        name: "description",
        content:
          "Set your default email tone, signature details and review reminders for AI-assisted admissions administration.",
      },
      { property: "og:title", content: "Workspace Settings & Preferences" },
      {
        property: "og:description",
        content: "Personalise defaults for UniAssist AI drafting and planning tools.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [officer, setOfficer] = useState("");
  const [department, setDepartment] = useState("");
  const [tone, setTone] = useState("Formal");
  const [reminders, setReminders] = useState(true);
  const [compact, setCompact] = useState(false);

  return (
    <div>
      <PageHeader
        icon={SettingsIcon}
        title="Settings"
        description="Preferences for this session. They personalise how drafts are prepared — they never change the Responsible AI safeguards."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface-card p-5 sm:p-6" aria-label="Staff details">
          <h2 className="text-base font-semibold">Staff details</h2>
          <div className="mt-5 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="officer">Your name</Label>
              <Input
                id="officer"
                value={officer}
                onChange={(e) => setOfficer(e.target.value)}
                placeholder="e.g. Ayanda Malembe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department / office</Label>
              <Input
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Undergraduate Admissions Office"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tone">Default email tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {["Formal", "Friendly", "Empathetic", "Persuasive", "Urgent"].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="surface-card p-5 sm:p-6" aria-label="Preferences">
          <h2 className="text-base font-semibold">Preferences</h2>
          <div className="mt-5 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Label htmlFor="reminders">Human review reminders</Label>
                <p className="mt-1 text-sm text-muted-foreground">
                  Show a review reminder alongside every generated output.
                </p>
              </div>
              <Switch id="reminders" checked={reminders} onCheckedChange={setReminders} />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Label htmlFor="compact">Compact outputs</Label>
                <p className="mt-1 text-sm text-muted-foreground">
                  Prefer shorter, denser drafts and plans.
                </p>
              </div>
              <Switch id="compact" checked={compact} onCheckedChange={setCompact} />
            </div>
            <p className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
              Preferences apply to this browser session only. No applicant data is stored by
              UniAssist AI.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
