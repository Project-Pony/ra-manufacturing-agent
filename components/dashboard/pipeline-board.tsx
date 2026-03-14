import { AlertTriangle, Clock3, PackageCheck, ShieldAlert } from "lucide-react";

import { getBusinessOwnerStats, getLeadParallelTracks } from "@/lib/dashboard";
import { LeadCard } from "@/components/dashboard/lead-card";
import { Badge } from "@/components/ui/badge";
import { STAGE_GROUPS } from "@/lib/constants";
import { groupLeadsByStageGroup, canViewClientInfo, getActiveStageLog } from "@/lib/utils";
import { AppRole, DashboardSnapshot } from "@/types/app";

interface PipelineBoardProps {
  snapshot: DashboardSnapshot;
  role: AppRole | null;
  basePath: string;
}

export function PipelineBoard({
  snapshot,
  role,
  basePath
}: PipelineBoardProps) {
  const groupedLeads = groupLeadsByStageGroup(snapshot.leads);
  const showClientName = canViewClientInfo(role);
  const stats = getBusinessOwnerStats(snapshot);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Clock3 className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-medium text-slate-500">Active Leads</p>
          </div>
          <p className="mt-4 text-3xl font-semibold text-slate-950">
            {stats.activeLeads}
          </p>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <PackageCheck className="h-5 w-5 text-amber-600" />
            <p className="text-sm font-medium text-amber-700">
              Leads Awaiting Approval
            </p>
          </div>
          <p className="mt-4 text-3xl font-semibold text-amber-900">
            {stats.awaitingApprovalCount}
          </p>
        </div>
        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-blue-700" />
            <p className="text-sm font-medium text-blue-700">SLA Breaches Today</p>
          </div>
          <p className="mt-4 text-3xl font-semibold text-blue-900">
            {stats.slaBreachesToday}
          </p>
        </div>
        <div className="rounded-3xl border border-red-200 bg-red-50 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-700" />
            <p className="text-sm font-medium text-red-700">
              Samples Dispatched This Month
            </p>
          </div>
          <p className="mt-4 text-3xl font-semibold text-red-900">
            {stats.samplesDispatchedThisMonth}
          </p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-5">
        {STAGE_GROUPS.map((group) => (
          <section key={group} className="rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-slate-900">{group}</h3>
              <Badge variant="neutral">{groupedLeads[group].length}</Badge>
            </div>
            <div className="space-y-4">
              {groupedLeads[group].length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
                  No leads in this stage group.
                </div>
              ) : (
                groupedLeads[group].map((lead) => (
                  <LeadCard
                    key={lead.id}
                    activeLog={getActiveStageLog(lead, snapshot.stageLogs)}
                    href={`${basePath}?lead=${lead.id}`}
                    lead={lead}
                    parallelTracks={getLeadParallelTracks(snapshot, lead)}
                    showClientName={showClientName}
                  />
                ))
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
