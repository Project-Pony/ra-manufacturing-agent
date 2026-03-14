"use client";

import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { StageDefinition } from "@/types/app";

interface StageActionFormProps {
  stage: StageDefinition;
  canAct: boolean;
  isDemo: boolean;
  salesExecutives: Array<{ id: string; fullName: string }>;
}

const fieldBaseClass =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-200 focus:bg-white";

export function StageActionForm({
  stage,
  canAct,
  isDemo,
  salesExecutives
}: StageActionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const helperText = useMemo(() => {
    if (isDemo) {
      return "Demo mode is active. Submitted values are validated in the UI and can be wired to Supabase mutations next.";
    }

    return "This action form is scaffolded for Supabase-backed workflow mutations.";
  }, [isDemo]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canAct) {
      toast.error("You do not own this stage.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);

    try {
      switch (stage.key) {
        case "1":
        case "4":
        case "10":
        case "12": {
          const confirmed = formData.get("confirmed");
          if (!confirmed) {
            throw new Error("Please confirm the required checkbox before continuing.");
          }
          break;
        }
        case "2":
        case "3":
        case "7":
        case "8":
        case "17":
        case "19": {
          if (!formData.get("documentUrl")) {
            throw new Error("Document URL is required for this stage.");
          }
          break;
        }
        case "2.1":
        case "3.1": {
          if (!formData.get("decision")) {
            throw new Error("Select approval or rejection.");
          }
          break;
        }
        case "5":
        case "6": {
          if (!formData.get("prepStatus")) {
            throw new Error("Select the preparation status.");
          }
          break;
        }
        case "9": {
          if (!formData.get("salesExecutiveId")) {
            throw new Error("Assign a sales executive for dispatch.");
          }
          break;
        }
        case "11": {
          if (!formData.get("courierDocket")) {
            throw new Error("Courier docket number is required.");
          }
          break;
        }
        case "13": {
          if (!formData.get("trackingNumber") || !formData.get("trackingUrl")) {
            throw new Error("Tracking number and URL are both required.");
          }
          break;
        }
        case "14":
        case "16": {
          if (!formData.get("notes")) {
            throw new Error("Add a note before submitting.");
          }
          break;
        }
        default:
          break;
      }

      toast.success(
        isDemo
          ? `${stage.actionLabel} captured in demo mode.`
          : `${stage.actionLabel} validated. Connect the final mutation handler in Supabase.`
      );
      event.currentTarget.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to submit this stage action."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (stage.key === "15") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-700">
        Sales Tracker updates automatically when Stage 14 is completed. No manual
        action is required here.
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
        {helperText}
      </p>

      {stage.key === "0" ? (
        <label className="block text-sm font-medium text-slate-700">
          Lead intake note
          <textarea
            className={fieldBaseClass}
            name="notes"
            placeholder="Summarize the enquiry, volume, and sample intent."
            rows={4}
          />
        </label>
      ) : null}

      {["1", "4", "10", "12"].includes(stage.key) ? (
        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
          <input className="mt-1 h-4 w-4 rounded border-slate-300" name="confirmed" type="checkbox" />
          <span>Confirm the completion step for this stage.</span>
        </label>
      ) : null}

      {["2", "3", "7", "8", "17", "19"].includes(stage.key) ? (
        <>
          <label className="block text-sm font-medium text-slate-700">
            Document URL
            <input
              className={fieldBaseClass}
              name="documentUrl"
              placeholder="Paste the Supabase Storage signed URL"
              type="url"
            />
          </label>
          {["2", "3"].includes(stage.key) ? (
            <label className="block text-sm font-medium text-slate-700">
              Deadline
              <input className={fieldBaseClass} name="deadline" type="datetime-local" />
            </label>
          ) : null}
        </>
      ) : null}

      {["2.1", "3.1"].includes(stage.key) ? (
        <>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-700">Decision</p>
            <div className="mt-3 flex gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input name="decision" type="radio" value="approved" />
                Approve
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input name="decision" type="radio" value="rejected" />
                Reject
              </label>
            </div>
          </div>
          <label className="block text-sm font-medium text-slate-700">
            Review note
            <textarea
              className={fieldBaseClass}
              name="notes"
              placeholder="Add approval comment or rejection reason."
              rows={4}
            />
          </label>
        </>
      ) : null}

      {["5", "6"].includes(stage.key) ? (
        <label className="block text-sm font-medium text-slate-700">
          Preparation status
          <select className={fieldBaseClass} defaultValue="" name="prepStatus">
            <option disabled value="">
              Select status
            </option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Ready">Ready</option>
          </select>
        </label>
      ) : null}

      {stage.key === "9" ? (
        <label className="block text-sm font-medium text-slate-700">
          Assign sales executive
          <select className={fieldBaseClass} defaultValue="" name="salesExecutiveId">
            <option disabled value="">
              Select executive
            </option>
            {salesExecutives.map((user) => (
              <option key={user.id} value={user.id}>
                {user.fullName}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      {stage.key === "11" ? (
        <label className="block text-sm font-medium text-slate-700">
          Courier docket number
          <input
            className={fieldBaseClass}
            name="courierDocket"
            placeholder="Enter the courier docket number"
            type="text"
          />
        </label>
      ) : null}

      {stage.key === "13" ? (
        <>
          <label className="block text-sm font-medium text-slate-700">
            Tracking number
            <input
              className={fieldBaseClass}
              name="trackingNumber"
              placeholder="Enter the tracking number"
              type="text"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Tracking URL
            <input
              className={fieldBaseClass}
              name="trackingUrl"
              placeholder="Paste the courier tracking URL"
              type="url"
            />
          </label>
        </>
      ) : null}

      {["14", "16"].includes(stage.key) ? (
        <>
          <label className="block text-sm font-medium text-slate-700">
            Next follow-up
            <input className={fieldBaseClass} name="followUpAt" type="datetime-local" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Note
            <textarea
              className={fieldBaseClass}
              name="notes"
              placeholder="Log call notes, objections, or next steps."
              rows={4}
            />
          </label>
        </>
      ) : null}

      <Button className="w-full" disabled={isSubmitting || !canAct} type="submit">
        {isSubmitting ? "Submitting..." : stage.actionLabel}
      </Button>
      {!canAct ? (
        <p className="text-sm text-slate-500">
          This stage is owned by another role. You can review history, but not submit
          the action.
        </p>
      ) : null}
    </form>
  );
}
