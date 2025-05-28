import { Skeleton } from "@/components/ui/skeleton"

export default function MarketplaceLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Skeleton className="h-10 w-full md:w-[300px]" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>

          <div className="mb-6">
            <Skeleton className="h-10 w-full max-w-md" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
            {/* Filter sidebar skeleton */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-6">
              <div>
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-5 w-20 mb-2" />
                    <div className="space-y-2">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="flex items-center space-x-2">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Books grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-24" />
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Skeleton key={star} className="h-4 w-4" />
                      ))}
                    </div>
                    <Skeleton className="h-4 w-20" />
                    <div className="flex justify-between items-center pt-2">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <div className="bg-muted/40 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-4 w-24" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
