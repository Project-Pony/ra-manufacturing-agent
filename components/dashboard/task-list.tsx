import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { SLABadge } from "@/components/ui/sla-badge";
import { STAGE_MAP } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import { TaskItem } from "@/types/app";

interface TaskListProps {
  tasks: TaskItem[];
  basePath: string;
}

export function TaskList({ tasks, basePath }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        description="No tasks are currently assigned to you. New workflow assignments will appear here automatically."
        title="No active tasks"
      />
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const stage = STAGE_MAP[task.stageKey];

        return (
          <div
            key={`${task.leadId}-${task.stageKey}`}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-base font-semibold text-slate-950">{task.leadCode}</p>
                  <Badge variant={task.slaStatus === "breached" ? "red" : "blue"}>
                    {stage.group}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-slate-600">{task.stageName}</p>
                <p className="mt-1 text-sm text-slate-500">
                  Deadline: {formatDateTime(task.deadlineAt)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <SLABadge deadlineAt={task.deadlineAt} />
                <Link href={`${basePath}?lead=${task.leadId}`}>
                  <Button size="sm">{task.actionLabel}</Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
