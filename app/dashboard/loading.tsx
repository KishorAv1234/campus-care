import { Skeleton } from "@/components/ui/skeleton"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome back! Here's an overview of your academic journey." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[125px] w-full" />
        ))}
      </div>
      <div className="mt-4">
        <Skeleton className="h-10 w-[200px]" />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="col-span-4 h-[300px]" />
        <Skeleton className="col-span-3 h-[300px]" />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="col-span-4 h-[300px]" />
        <Skeleton className="col-span-3 h-[300px]" />
      </div>
    </DashboardShell>
  )
}
