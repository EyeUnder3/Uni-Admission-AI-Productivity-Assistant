import { useEffect, useMemo, useState } from "react";
import { format, isSameDay, parseISO, startOfToday } from "date-fns";
import { CalendarIcon, Plus, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type PlannerTask = {
  id: string;
  title: string;
  date: string; // yyyy-MM-dd
  priority: "High" | "Medium" | "Low";
  hours: string;
  done: boolean;
};

const STORAGE_KEY = "uniassist.planner.tasks";

export function loadTasks(): PlannerTask[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as PlannerTask[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: PlannerTask[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    /* storage unavailable */
  }
}

/** Builds the workload + deadline text automatically from the calendar entries. */
export function summariseTasks(tasks: PlannerTask[]) {
  const open = tasks.filter((t) => !t.done);
  const workload = open.length
    ? open
        .map(
          (t) =>
            `- ${t.title} (due ${format(parseISO(t.date), "EEE d MMM yyyy")}, priority ${t.priority}${
              t.hours ? `, estimated ${t.hours} hour(s)` : ""
            })`,
        )
        .join("\n")
    : "";
  const deadlines = open.length
    ? open
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((t) => `${t.title}: ${format(parseISO(t.date), "EEE d MMM yyyy")}`)
        .join("; ")
    : "";
  const totalHours = open.reduce((sum, t) => sum + (parseFloat(t.hours) || 0), 0);
  const highest: PlannerTask["priority"] = open.some((t) => t.priority === "High")
    ? "High"
    : open.some((t) => t.priority === "Medium")
      ? "Medium"
      : "Low";
  return { open, workload, deadlines, totalHours, priority: open.length ? highest : "" };
}

const PRIORITY_STYLES: Record<PlannerTask["priority"], string> = {
  High: "border-destructive/40 text-destructive",
  Medium: "border-primary/40 text-primary",
  Low: "border-border text-muted-foreground",
};

export function TaskCalendar({
  tasks,
  onChange,
}: {
  tasks: PlannerTask[];
  onChange: (tasks: PlannerTask[]) => void;
}) {
  const [selected, setSelected] = useState<Date>(startOfToday());
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<PlannerTask["priority"]>("Medium");
  const [hours, setHours] = useState("");
  const [due, setDue] = useState<Date>(startOfToday());

  const dayTasks = useMemo(
    () => tasks.filter((t) => isSameDay(parseISO(t.date), selected)),
    [tasks, selected],
  );

  const busyDays = useMemo(
    () => tasks.filter((t) => !t.done).map((t) => parseISO(t.date)),
    [tasks],
  );

  const add = () => {
    if (!title.trim()) return;
    onChange([
      ...tasks,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title: title.trim(),
        date: format(due, "yyyy-MM-dd"),
        priority,
        hours: hours.trim(),
        done: false,
      },
    ]);
    setTitle("");
    setHours("");
    setSelected(due);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(d) => d && setSelected(d)}
          modifiers={{ busy: busyDays }}
          modifiersClassNames={{ busy: "font-bold underline decoration-primary decoration-2" }}
          className={cn("rounded-lg border border-border p-3 pointer-events-auto")}
        />
        <p className="text-xs text-muted-foreground">
          Underlined dates have outstanding work. Select a date to see its tasks.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-3 rounded-lg border border-border p-4">
          <div className="space-y-2">
            <Label htmlFor="task-title">New task</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && add()}
              placeholder="e.g. Review 20 Science faculty files"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Due date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start font-normal">
                    <CalendarIcon className="size-4" />
                    {format(due, "d MMM")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={due}
                    onSelect={(d) => d && setDue(d)}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-priority">Priority</Label>
              <Select
                value={priority}
                onValueChange={(v) => setPriority(v as PlannerTask["priority"])}
              >
                <SelectTrigger id="task-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["High", "Medium", "Low"] as const).map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-hours">Hours</Label>
              <Input
                id="task-hours"
                inputMode="decimal"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="2"
              />
            </div>
          </div>
          <Button onClick={add} className="w-full sm:w-auto">
            <Plus className="size-4" /> Add to calendar
          </Button>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{format(selected, "EEEE d MMMM yyyy")}</h3>
          {dayTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground">No tasks scheduled for this date.</p>
          ) : (
            <ul className="space-y-2">
              {dayTasks.map((t) => (
                <li
                  key={t.id}
                  className="flex items-start justify-between gap-3 rounded-lg border border-border p-3"
                >
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-sm font-medium break-words",
                        t.done && "line-through text-muted-foreground",
                      )}
                    >
                      {t.title}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={PRIORITY_STYLES[t.priority]}>
                        {t.priority}
                      </Badge>
                      {t.hours && (
                        <span className="text-xs text-muted-foreground">{t.hours} hr</span>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={t.done ? "Mark as outstanding" : "Mark as done"}
                      onClick={() =>
                        onChange(tasks.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))
                      }
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Delete task"
                      onClick={() => onChange(tasks.filter((x) => x.id !== t.id))}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
