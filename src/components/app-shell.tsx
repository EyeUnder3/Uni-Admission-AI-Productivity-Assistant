import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Mail,
  FileText,
  ListChecks,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Settings,
  Menu,
  GraduationCap,
  Sparkles,
  Info,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email-generator", label: "Email Generator", icon: Mail },
  { to: "/summarizer", label: "Application Summarizer", icon: FileText },
  { to: "/task-planner", label: "AI Task Planner", icon: ListChecks },
  
  { to: "/workplace-assistant", label: "AI Workplace Assistant", icon: MessageSquare },
  { to: "/responsible-ai", label: "Responsible AI", icon: ShieldCheck },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground",
        className,
      )}
      aria-hidden="true"
    >
      <GraduationCap className="size-5" strokeWidth={2.4} />
      <Sparkles className="absolute -right-1 -top-1 size-3.5 text-accent" strokeWidth={3} />
    </span>
  );
}

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1" aria-label="Main navigation">
      {NAV.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              active &&
                "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_3px_0_0_0_var(--sidebar-primary)]",
            )}
          >
            <item.icon className="size-4.5 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarInner({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex items-center gap-3 px-5 py-6">
        <BrandMark />
        <div className="min-w-0">
          <p className="text-display truncate text-base font-semibold text-sidebar-foreground">
            UniAssist AI
          </p>
          <p className="truncate text-xs text-sidebar-foreground/60">
            Smarter administration. Better applicant support.
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <NavItems onNavigate={onNavigate} />
      </div>
      <div className="border-t border-sidebar-border px-5 py-4">
        <p className="text-xs leading-relaxed text-sidebar-foreground/60">
          Administrative assistance only. No admission decisions are made by this system.
        </p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="sticky top-0 hidden h-screen border-r border-sidebar-border lg:block">
        <SidebarInner />
      </aside>

      <div className="flex min-h-screen min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[17rem] border-sidebar-border p-0">
              <SheetTitle className="sr-only">UniAssist AI navigation</SheetTitle>
              <SidebarInner onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <div className="flex min-w-0 items-center gap-2">
            <BrandMark className="size-8" />
            <span className="text-display truncate font-semibold">UniAssist AI</span>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>

        <footer className="border-t border-border bg-muted/50 px-4 py-4 sm:px-6 lg:px-10">
          <p className="mx-auto flex max-w-6xl items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            <span>
              UniAssist AI provides administrative assistance only. AI-generated outputs may contain
              errors and must be reviewed by an authorized staff member. The system does not make
              admission or eligibility decisions.
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}
