import { redirect } from "next/navigation";

import { LeadDetailPanel } from "@/components/dashboard/lead-detail-panel";
import { PipelineBoard } from "@/components/dashboard/pipeline-board";
import { getRoleHomePath } from "@/lib/auth";
import { getDashboardSnapshot } from "@/lib/data/dashboard";
import { getLeadBundle } from "@/lib/dashboard";

interface PipelinePageProps {
  searchParams?: {
    lead?: string;
  };
}

export default async function PipelinePage({ searchParams }: PipelinePageProps) {
  const snapshot = await getDashboardSnapshot();

  if (!snapshot.role || !snapshot.currentUser) {
    redirect("/login");
  }

  if (!["business_owner", "sales_manager"].includes(snapshot.role)) {
    redirect(getRoleHomePath(snapshot.role));
  }

  const selectedLeadId = searchParams?.lead;
  const selectedBundle = selectedLeadId
    ? getLeadBundle(snapshot, selectedLeadId)
    : null;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-blue-600">
          Main View
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">
          Pipeline Board
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
          Full kanban visibility across all 20 workflow stages, with SLA visibility
          and lead-safe detail access.
        </p>
      </div>

      <PipelineBoard basePath="/pipeline" role={snapshot.role} snapshot={snapshot} />

      {selectedBundle ? (
        <LeadDetailPanel
          basePath="/pipeline"
          bundle={selectedBundle}
          isDemo={snapshot.isDemo}
          role={snapshot.role}
          users={snapshot.users.length > 0 ? snapshot.users : snapshot.currentUser ? [snapshot.currentUser] : []}
        />
      ) : null}
    </div>
  );
}
