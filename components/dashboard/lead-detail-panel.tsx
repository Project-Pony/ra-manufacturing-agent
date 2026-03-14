import Link from "next/link";
import {
  FileText,
  Mail,
  Phone,
  StickyNote,
  X
} from "lucide-react";

import { StageActionForm } from "@/components/forms/stage-action-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SLABadge } from "@/components/ui/sla-badge";
import {
  getLeadCombinedTimeline,
  getLeadParallelTracks
} from "@/lib/dashboard";
import { ROLE_LABELS, STAGE_MAP } from "@/lib/constants";
import {
  canViewClientInfo,
  formatDateTime,
  getActiveStageLog,
  getStaticTrackingUrl,
  isReadOnlyRole
} from "@/lib/utils";
import { AppRole, AppUser, LeadBundle } from "@/types/app";

interface LeadDetailPanelProps {
  bundle: LeadBundle;
  role: AppRole | null;
  users: AppUser[];
  basePath: string;
  isDemo: boolean;
}

export function LeadDetailPanel({
  bundle,
  role,
  users,
  basePath,
  isDemo
}: LeadDetailPanelProps) {
  const { lead, briefs, notifications, samples, stageLogs } = bundle;
  const stage = STAGE_MAP[lead.currentStage];
  const activeLog = getActiveStageLog(lead, stageLogs);
  const showClientInfo = canViewClientInfo(role);
  const readOnlyRole = isReadOnlyRole(role);
  const canAct = !readOnlyRole && role === stage.ownerRole;
  const salesExecutives = users
    .filter((user) => user.role === "sales_executive")
    .map((user) => ({ id: user.id, fullName: user.fullName }));
  const parallelTracks = getLeadParallelTracks(
    {
      currentUser: null,
      role,
      isDemo,
      leads: [lead],
      stageLogs,
      briefs,
      samples,
      notifications,
      users
    },
    lead
  );

  const documents = [
    ...lead.referenceUrls.map((url, index) => ({
      id: `reference-${index}`,
      label: `Client reference ${index + 1}`,
      url,
      meta: "reference"
    })),
    ...briefs.map((brief) => ({
      id: brief.id,
      label: `${brief.briefType} brief`,
      url: brief.documentUrl,
      meta: brief.approvalStatus
    })),
    ...samples
      .filter((sample) => sample.dispatchNoteUrl)
      .map((sample) => ({
        id: sample.id,
        label: `${sample.sampleType} dispatch note`,
        url: sample.dispatchNoteUrl ?? "#",
        meta: "dispatch note"
      })),
    ...samples
      .filter((sample) => sample.courierDocket)
      .map((sample) => ({
        id: `${sample.id}-tracking`,
        label: `${sample.sampleType} tracking reference`,
        url: sample.trackingUrl ?? getStaticTrackingUrl(sample.courierDocket) ?? "#",
        meta: sample.courierDocket ?? "tracking"
      }))
  ];

  return (
    <>
      <Link
        className="fixed inset-0 z-30 bg-slate-950/20 backdrop-blur-sm"
        href={basePath}
      />
      <aside className="fixed inset-y-0 right-0 z-40 w-full max-w-2xl overflow-y-auto border-l border-slate-200 bg-white shadow-panel">
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                {lead.leadCode}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                {showClientInfo && lead.clientName ? lead.clientName : "Confidential"}
              </h2>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Badge variant="blue">{stage.name}</Badge>
                <Badge variant="neutral">{ROLE_LABELS[stage.ownerRole]}</Badge>
                <SLABadge
                  deadlineAt={activeLog?.deadlineAt}
                  startedAt={activeLog?.startedAt}
                />
              </div>
            </div>
            <Link
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              href={basePath}
            >
              <X className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="space-y-8 px-6 py-6">
          <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-slate-950">Lead Overview</h3>
            <p className="mt-4 text-sm leading-6 text-slate-600">{lead.requirementDetails}</p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Workflow Status
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {lead.status.replaceAll("_", " ")}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Expected Delivery
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {lead.expectedDeliveryDate
                    ? formatDateTime(lead.expectedDeliveryDate)
                    : "Awaiting entry"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Parallel Workflow Status
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Both operational tracks are displayed side by side.
                </p>
              </div>
              <Badge variant="neutral">{stage.group}</Badge>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {parallelTracks.map((track) => (
                <div
                  key={track.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    {track.label}
                  </p>
                  <div className="mt-3">
                    <Badge variant={track.tone}>{track.value}</Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              <p className="font-semibold text-slate-900">Combined timeline summary</p>
              <p className="mt-2">{getLeadCombinedTimeline(briefs)}</p>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">Current Stage</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {stage.name} · Owned by {ROLE_LABELS[stage.ownerRole]}
                </p>
              </div>
              <Badge variant={canAct ? "green" : "neutral"}>
                {canAct ? "Action available" : "Read only"}
              </Badge>
            </div>

            <div className="mt-5">
              <StageActionForm
                canAct={canAct}
                isDemo={isDemo}
                salesExecutives={salesExecutives}
                stage={stage}
              />
            </div>

            {lead.status === "client_approved_ready_for_pi" ? (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Move to Bulk Order Process
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      This handoff stays disabled in Phase 1.
                    </p>
                  </div>
                  <Button disabled variant="secondary">
                    Coming Soon
                  </Button>
                </div>
              </div>
            ) : null}
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-slate-950">Attached Documents</h3>
            <div className="mt-4 space-y-3">
              {documents.length === 0 ? (
                <p className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-500">
                  No documents uploaded for this lead yet.
                </p>
              ) : (
                documents.map((document) => (
                  <a
                    key={document.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 transition hover:bg-slate-50"
                    href={document.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {document.label}
                        </p>
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                          {document.meta}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">Open</span>
                  </a>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-slate-950">Stage History</h3>
            <div className="mt-5 space-y-4">
              {stageLogs.map((stageLog) => (
                <div key={stageLog.id} className="flex gap-4">
                  <div className="flex w-4 justify-center">
                    <span
                      className={`mt-1 h-3 w-3 rounded-full ${
                        stageLog.completedAt ? "bg-emerald-500" : "bg-amber-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{stageLog.stageName}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          Owner: {ROLE_LABELS[stageLog.assignedToRole]}
                        </p>
                      </div>
                      <Badge variant={stageLog.completedAt ? "green" : "yellow"}>
                        {stageLog.completedAt ? "Completed" : "Active"}
                      </Badge>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl bg-white p-4 text-sm text-slate-600">
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                          Started
                        </p>
                        <p className="mt-2 font-medium text-slate-900">
                          {formatDateTime(stageLog.startedAt)}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 text-sm text-slate-600">
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                          Deadline
                        </p>
                        <p className="mt-2 font-medium text-slate-900">
                          {formatDateTime(stageLog.deadlineAt)}
                        </p>
                      </div>
                    </div>
                    {stageLog.notes ? (
                      <div className="mt-4 flex gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-600">
                        <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                        <p>{stageLog.notes}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-950">Client Info</h3>
              {showClientInfo ? (
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{lead.clientEmail ?? "Not shared"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>{lead.clientPhone ?? "Not shared"}</span>
                  </div>
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                  Confidential
                </div>
              )}
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-950">Notifications</h3>
              <div className="mt-4 space-y-3">
                {notifications.length === 0 ? (
                  <p className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-500">
                    No notifications attached to this lead.
                  </p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600"
                    >
                      <p className="font-medium text-slate-900">{notification.message}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">
                        {formatDateTime(notification.createdAt)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
}
