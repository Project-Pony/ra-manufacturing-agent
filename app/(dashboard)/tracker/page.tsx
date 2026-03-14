import { redirect } from "next/navigation";

import { SalesTrackerTable } from "@/components/dashboard/sales-tracker-table";
import { getRoleHomePath } from "@/lib/auth";
import { getDashboardSnapshot } from "@/lib/data/dashboard";
import { getTrackerRows } from "@/lib/dashboard";

export default async function TrackerPage() {
  const snapshot = await getDashboardSnapshot();

  if (!snapshot.role || !snapshot.currentUser) {
    redirect("/login");
  }

  if (!["business_owner", "sales_manager"].includes(snapshot.role)) {
    redirect(getRoleHomePath(snapshot.role));
  }

  const rows = getTrackerRows(snapshot);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-blue-600">
          Sales Manager View
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">
          Sales Tracker
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
          Monitor active leads, dispatch details, delivery expectations, and client
          approval status in a filterable table.
        </p>
      </div>

      <SalesTrackerTable rows={rows} />
    </div>
  );
}
