import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <main className="min-h-screen px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <Skeleton className="h-16 w-64" />
        <div className="grid gap-6 xl:grid-cols-3">
          <Skeleton className="h-48 rounded-[2rem]" />
          <Skeleton className="h-48 rounded-[2rem]" />
          <Skeleton className="h-48 rounded-[2rem]" />
        </div>
      </div>
    </main>
  );
}
