import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, Wand2, ClipboardPaste } from "lucide-react";
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
import { AiEmptyState, AiErrorState, AiLoading, AiOutputCard } from "@/components/ai-output";
import { useAiFeature } from "@/hooks/use-ai-feature";
import { buildPlannerPrompt } from "@/lib/ai-prompts";
import { DEMO_TASKS } from "@/lib/demo-data";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner for Admissions Workload | UniAssist AI" },
      {
        name: "description",
        content:
          "Turn your admissions workload into a prioritised daily or weekly plan with realistic time blocks and practical recommendations.",
      },
      { property: "og:title", content: "AI Task Planner for Admissions Workload" },
      {
        property: "og:description",
        content: "Prioritised admissions work plans built only from the workload you describe.",
      },
    ],
  }),
  component: TaskPlanner,
});

function TaskPlanner() {
  const [tasks, setTasks] = useState("");
  const [deadlines, setDeadlines] = useState("");
  const [priority, setPriority] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState(false);

  const { output, setOutput, loading, error, run, clear } = useAiFeature("planner");

  const tasksError =
    touched && tasks.trim().length < 15 ? "Describe your workload (min. 15 characters)." : "";

  const generate = () => {
    setTouched(true);
    if (tasks.trim().length < 15) return;
    void run(buildPlannerPrompt({ tasks, deadlines, priority, time, notes }));
  };

  return (
    <div>
      <PageHeader
        icon={ListChecks}
        title="AI Task Planner"
        description="Describe your admissions workload and get a prioritised, realistic work plan. Deadlines are never invented — anything you don't supply is marked unknown."
      />
      <FlowSteps step={loading ? "processing" : output ? "output" : "input"} />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface-card p-5 sm:p-6" aria-label="Workload inputs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-semibold">Input</h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setTasks(DEMO_TASKS);
                setDeadlines("Incomplete-files report due Friday 29 Aug");
                setPriority("High");
                setTime("6 hours today");
                setTouched(false);
              }}
            >
              <ClipboardPaste className="size-4" /> Load demo workload
            </Button>
          </div>
          <div className="mt-5 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="tasks">Tasks / workload</Label>
              <Textarea
                id="tasks"
                rows={6}
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
                placeholder="e.g. I have 45 applications to review, 12 outstanding document requests, and 8 applicants waiting for responses."
                aria-invalid={!!tasksError}
              />
              {tasksError && <p className="text-xs text-destructive">{tasksError}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="deadlines">Deadlines (optional)</Label>
                <Input
                  id="deadlines"
                  value={deadlines}
                  onChange={(e) => setDeadlines(e.target.value)}
                  placeholder="e.g. Report due Friday"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Overall priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {["High", "Medium", "Low"].map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Estimated available time</Label>
              <Input
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 6 hours today / 3 mornings this week"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="planner-notes">Optional notes</Label>
              <Textarea
                id="planner-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Team meeting 11:00–12:00. Front desk duty every afternoon."
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={generate} disabled={loading}>
                <Wand2 className="size-4" /> {loading ? "Planning…" : "Create task plan"}
              </Button>
              <Button
                variant="ghost"
                disabled={loading}
                onClick={() => {
                  setTasks("");
                  setDeadlines("");
                  setPriority("");
                  setTime("");
                  setNotes("");
                  setTouched(false);
                  clear();
                }}
              >
                Clear form
              </Button>
            </div>
          </div>
        </section>

        <section aria-label="Generated plan" className="space-y-4">
          <h2 className="text-base font-semibold">Output</h2>
          {loading ? (
            <AiLoading label="Prioritising tasks and building your schedule…" />
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
              title="No plan generated yet"
              description="Describe your workload to get today's priorities, a suggested schedule, outstanding tasks and recommendations — all editable afterwards."
            />
          )}
          <p className="text-xs text-muted-foreground">
            Use the Edit action to adjust tasks and time blocks after the plan is generated.
          </p>
        </section>
      </div>
    </div>
  );
}
