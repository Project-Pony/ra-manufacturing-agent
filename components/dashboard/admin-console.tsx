"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { AppUser, Lead, StageLog } from "@/types/app";

interface AdminConsoleProps {
  users: AppUser[];
  leads: Lead[];
  auditLogs: StageLog[];
  isDemo: boolean;
}

const roleOptions = [
  "admin",
  "sales_manager",
  "sales_executive",
  "rnd_manager",
  "packaging_manager"
];

export function AdminConsole({
  users,
  leads,
  auditLogs,
  isDemo
}: AdminConsoleProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setIsSubmitting(true);

    try {
      const fullName = formData.get("fullName");
      const email = formData.get("email");
      const role = formData.get("role");

      if (!fullName || !email || !role) {
        throw new Error("Full name, email, and role are all required.");
      }

      toast.success(
        isDemo
          ? `Demo mode: ${fullName} would be provisioned as ${role}.`
          : "User management UI scaffolded. Connect this form to a service-role action."
      );
      event.currentTarget.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to submit the new user."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">Create User</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Create users and assign their dashboard role. For production, connect this
            form to a server action using the Supabase service role key.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleCreateUser}>
            <label className="block text-sm font-medium text-slate-700">
              Full name
              <input
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none"
                name="fullName"
                placeholder="Enter full name"
                type="text"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Email
              <input
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none"
                name="email"
                placeholder="Enter work email"
                type="email"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Role
              <select
                className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none"
                defaultValue=""
                name="role"
              >
                <option disabled value="">
                  Select role
                </option>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </label>

            <Button className="w-full" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Submitting..." : "Create user"}
            </Button>
          </form>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-950">User Directory</h3>
              <p className="mt-2 text-sm text-slate-500">
                Current workspace users and assigned roles.
              </p>
            </div>
            <Badge variant="blue">{users.length} users</Badge>
          </div>

          <div className="mt-5 space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{user.fullName}</p>
                    <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                  </div>
                  <Badge variant="neutral">{user.role.replaceAll("_", " ")}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-950">Lead Audit Overview</h3>
            <p className="mt-2 text-sm text-slate-500">
              Full lead visibility with stage-by-stage activity log.
            </p>
          </div>
          <Badge variant="blue">{leads.length} leads</Badge>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          {leads.map((lead) => (
            <div key={lead.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{lead.leadCode}</p>
              <p className="mt-1 text-sm text-slate-600">{lead.clientName ?? "Client hidden"}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {lead.requirementDetails}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
          <div className="grid grid-cols-[1.2fr_1fr_1fr_1.4fr] gap-4 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            <span>Lead</span>
            <span>Stage</span>
            <span>Owner</span>
            <span>Started</span>
          </div>
          <div className="divide-y divide-slate-200">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="grid grid-cols-[1.2fr_1fr_1fr_1.4fr] gap-4 px-5 py-4 text-sm text-slate-700"
              >
                <span>{leads.find((lead) => lead.id === log.leadId)?.leadCode ?? log.leadId}</span>
                <span>{log.stageName}</span>
                <span>{log.assignedToRole.replaceAll("_", " ")}</span>
                <span>{formatDateTime(log.startedAt)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
