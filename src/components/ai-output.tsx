import { useState, type ReactNode } from "react";
import { Copy, Pencil, RefreshCw, Trash2, Check, Loader2, Sparkles, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function AiLoading({ label = "UniAssist AI is drafting your output…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/40 px-6 py-14 text-center">
      <Loader2 className="size-6 animate-spin text-primary" />
      <p className="text-sm font-medium">{label}</p>
      <div className="flex gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 animate-pulse rounded-full bg-primary"
            style={{ animationDelay: `${i * 180}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function AiEmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 px-6 py-14 text-center">
      <Sparkles className="size-6 text-muted-foreground" />
      <p className="text-sm font-semibold">{title}</p>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function AiErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-5"
    >
      <div className="flex items-start gap-2">
        <TriangleAlert className="mt-0.5 size-4.5 shrink-0 text-destructive" />
        <div>
          <p className="text-sm font-semibold text-destructive">Generation failed</p>
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry}>
          <RefreshCw className="size-4" /> Try again
        </Button>
      )}
    </div>
  );
}

/** Lightweight renderer for the structured markdown-ish AI output. */
export function StructuredOutput({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flush = (key: string) => {
    if (bullets.length) {
      blocks.push(
        <ul key={`ul-${key}`} className="ml-1 space-y-1.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{b}</span>
            </li>
          ))}
        </ul>,
      );
      bullets = [];
    }
  };

  lines.forEach((raw, index) => {
    const line = raw.trim();
    if (!line) {
      flush(`b${index}`);
      return;
    }
    if (line.startsWith("### ")) {
      flush(`b${index}`);
      blocks.push(
        <h4 key={index} className="pt-2 text-sm font-semibold text-primary">
          {line.slice(4)}
        </h4>,
      );
      return;
    }
    if (line.startsWith("## ") || line.startsWith("# ")) {
      flush(`b${index}`);
      blocks.push(
        <h3
          key={index}
          className="border-b border-border pb-2 pt-4 text-base font-semibold first:pt-0"
        >
          {line.replace(/^#+\s*/, "")}
        </h3>,
      );
      return;
    }
    if (/^([-*•]|\d+[.)])\s+/.test(line)) {
      bullets.push(line.replace(/^([-*•]|\d+[.)])\s+/, "").replace(/\*\*/g, ""));
      return;
    }
    flush(`b${index}`);
    blocks.push(
      <p key={index} className="text-sm leading-relaxed text-foreground/90">
        {line.replace(/\*\*/g, "")}
      </p>,
    );
  });
  flush("end");

  return <div className="space-y-2">{blocks}</div>;
}

type ActionsProps = {
  value: string;
  onChange: (value: string) => void;
  onRegenerate?: () => void;
  onClear?: () => void;
  canRegenerate?: boolean;
  className?: string;
  children?: ReactNode;
};

export function AiOutputCard({
  value,
  onChange,
  onRegenerate,
  onClear,
  canRegenerate = true,
  className,
  children,
}: ActionsProps) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Copying isn't available in this browser");
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1.5 bg-primary-soft text-primary">
          <Sparkles className="size-3" /> AI-generated — review before use
        </Badge>
        <div className="ml-auto flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={copy}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            size="sm"
            variant={editing ? "default" : "outline"}
            onClick={() => setEditing((e) => !e)}
          >
            <Pencil className="size-4" /> {editing ? "Done editing" : "Edit"}
          </Button>
          {onRegenerate && (
            <Button size="sm" variant="outline" onClick={onRegenerate} disabled={!canRegenerate}>
              <RefreshCw className="size-4" /> Regenerate
            </Button>
          )}
          {onClear && (
            <Button size="sm" variant="ghost" onClick={onClear}>
              <Trash2 className="size-4" /> Clear
            </Button>
          )}
        </div>
      </div>

      {editing ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={20}
          aria-label="Editable AI output"
          className="min-h-[24rem] font-mono text-sm"
        />
      ) : (
        (children ?? (
          <div className="rounded-xl border border-border bg-card p-5">
            <StructuredOutput text={value} />
          </div>
        ))
      )}
    </div>
  );
}
