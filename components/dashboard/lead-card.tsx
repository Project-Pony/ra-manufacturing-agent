import Link from "next/link";

import { ParallelTrackItem } from "@/lib/dashboard";
import { Badge } from "@/components/ui/badge";
import { SLABadge } from "@/components/ui/sla-badge";
import { STAGE_MAP } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Lead, StageLog } from "@/types/app";

interface LeadCardProps {
  lead: Lead;
  activeLog?: StageLog;
  href: string;
  showClientName: boolean;
  parallelTracks: ParallelTrackItem[];
}

export function LeadCard({
  lead,
  activeLog,
  href,
  showClientName,
  parallelTracks
}: LeadCardProps) {
  const stage = STAGE_MAP[lead.currentStage];
  const isBreached = activeLog?.slaStatus === "breached";

  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-3xl border bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-panel",
        isBreached ? "border-red-300" : "border-slate-200"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-950">{lead.leadCode}</h3>
          <p className="mt-2 text-sm text-slate-500">
            {showClientName && lead.clientName ? lead.clientName : "Client confidential"}
          </p>
        </div>
        <SLABadge
          deadlineAt={activeLog?.deadlineAt}
          startedAt={activeLog?.startedAt}
        />
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
        {lead.requirementDetails}
      </p>

      <div className="mt-4 grid gap-2">
        {parallelTracks.map((track) => (
          <div
            key={track.label}
            className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              {track.label}
            </span>
            <Badge variant={track.tone}>{track.value}</Badge>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <Badge variant="blue">{stage.name}</Badge>
        <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700">
          Open lead
        </span>
      </div>
    </Link>
  );
}
