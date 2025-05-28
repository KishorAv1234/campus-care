import { Skeleton } from "@/components/ui/skeleton"

export default function BookDetailLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            {/* Book cover and actions */}
            <div>
              <Skeleton className="aspect-[3/4] w-full rounded-lg" />
              <div className="mt-4 space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Book details */}
            <div>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-10 w-10" />
                </div>
              </div>

              <div className="flex items-center mt-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-5 w-5" />
                  ))}
                </div>
                <Skeleton className="h-4 w-32 ml-2" />
              </div>

              <Skeleton className="h-6 w-24 mt-4" />
              <Skeleton className="h-8 w-32 mt-6" />

              {/* Tabs */}
              <div className="mt-8">
                <div className="flex space-x-4 mb-4">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-20" />
                  <Skeleton className="h-10 w-20" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer skeleton */}
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
