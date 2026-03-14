import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Skeleton className="h-32 rounded-[1.75rem]" />
        <Skeleton className="h-32 rounded-[1.75rem]" />
        <Skeleton className="h-32 rounded-[1.75rem]" />
        <Skeleton className="h-32 rounded-[1.75rem]" />
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        <Skeleton className="h-[32rem] rounded-[1.75rem]" />
        <Skeleton className="h-[32rem] rounded-[1.75rem]" />
        <Skeleton className="h-[32rem] rounded-[1.75rem]" />
      </div>
    </div>
  );
}
