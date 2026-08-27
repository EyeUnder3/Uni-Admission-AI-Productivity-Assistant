import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon className="size-5.5" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export function FlowSteps({ step }: { step: "input" | "processing" | "output" }) {
  const steps = ["Input", "AI Processing", "Output"] as const;
  const activeIndex = step === "input" ? 0 : step === "processing" ? 1 : 2;
  return (
    <ol className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium">
      {steps.map((label, i) => (
        <li key={label} className="flex items-center gap-2">
          <span
            className={
              i === activeIndex
                ? "rounded-full bg-primary px-3 py-1 text-primary-foreground"
                : "rounded-full bg-muted px-3 py-1 text-muted-foreground"
            }
          >
            {label}
          </span>
          {i < steps.length - 1 && <span className="text-muted-foreground">→</span>}
        </li>
      ))}
    </ol>
  );
}
