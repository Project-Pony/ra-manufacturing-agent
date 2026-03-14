"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { ROLE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AppRole } from "@/types/app";

const MOBILE_NAV: Record<AppRole, Array<{ href: string; label: string }>> = {
  business_owner: [
    { href: "/pipeline", label: "Pipeline" },
    { href: "/tracker", label: "Tracker" }
  ],
  sales_manager: [
    { href: "/pipeline", label: "Pipeline" },
    { href: "/tasks", label: "Tasks" },
    { href: "/tracker", label: "Tracker" }
  ],
  sales_executive: [{ href: "/tasks", label: "Tasks" }],
  rnd_manager: [{ href: "/tasks", label: "Tasks" }],
  packaging_manager: [{ href: "/tasks", label: "Tasks" }]
};

interface MobileNavProps {
  role: AppRole | null;
}

export function MobileNav({ role }: MobileNavProps) {
  const pathname = usePathname();

  if (!role) {
    return null;
  }

  return (
    <div className="border-b border-slate-200 bg-white px-4 py-4 lg:hidden">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">Navigate</p>
        <Badge variant="blue">{ROLE_LABELS[role]}</Badge>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {MOBILE_NAV[role].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-semibold transition",
              pathname === item.href
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-700"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
