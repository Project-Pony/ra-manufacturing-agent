"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, KanbanSquare, LayoutGrid, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ROLE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AppRole, AppUser } from "@/types/app";

const NAV_BY_ROLE: Record<AppRole, Array<{ href: string; label: string; icon: React.ElementType }>> =
  {
    admin: [
      { href: "/pipeline", label: "Pipeline", icon: KanbanSquare },
      { href: "/tasks", label: "My Tasks", icon: ClipboardList },
      { href: "/tracker", label: "Sales Tracker", icon: LayoutGrid },
      { href: "/admin", label: "Admin", icon: ShieldCheck }
    ],
    sales_manager: [
      { href: "/pipeline", label: "Pipeline", icon: KanbanSquare },
      { href: "/tasks", label: "My Tasks", icon: ClipboardList },
      { href: "/tracker", label: "Sales Tracker", icon: LayoutGrid }
    ],
    sales_executive: [{ href: "/tasks", label: "My Tasks", icon: ClipboardList }],
    rnd_manager: [{ href: "/tasks", label: "My Tasks", icon: ClipboardList }],
    packaging_manager: [{ href: "/tasks", label: "My Tasks", icon: ClipboardList }]
  };

interface SidebarProps {
  currentUser: AppUser | null;
  role: AppRole | null;
}

export function Sidebar({ currentUser, role }: SidebarProps) {
  const pathname = usePathname();
  const navItems = role ? NAV_BY_ROLE[role] : [];

  return (
    <aside className="hidden min-h-screen w-72 flex-col bg-sidebar px-6 py-6 text-sidebar-foreground lg:flex">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">
            RA
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Internal Workflow
            </p>
            <h1 className="font-semibold text-white">Sales Operations</h1>
          </div>
        </div>
        {role ? (
          <Badge className="mt-4 bg-white/10 text-white" variant="neutral">
            {ROLE_LABELS[role]}
          </Badge>
        ) : null}
      </div>

      <nav className="mt-8 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-blue-950/20"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          Signed in
        </p>
        <p className="mt-2 font-semibold text-white">
          {currentUser?.fullName ?? "Guest"}
        </p>
        <p className="mt-1 text-sm text-slate-400">
          {currentUser?.email ?? "No active session"}
        </p>
      </div>
    </aside>
  );
}
