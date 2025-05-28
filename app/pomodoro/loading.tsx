import { Skeleton } from "@/components/ui/skeleton"

export default function PomodoroLoading() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="border rounded-lg">
            <div className="p-6 text-center space-y-6">
              <Skeleton className="h-6 w-32 mx-auto" />
              <Skeleton className="h-20 w-48 mx-auto" />
              <Skeleton className="h-2 w-full" />
              <div className="flex justify-center gap-4">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-20" />
              </div>
            </div>
          </div>

          <div className="border rounded-lg">
            <div className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <Skeleton className="h-8 w-8 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
                <div className="text-center">
                  <Skeleton className="h-8 w-8 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="border rounded-lg">
            <div className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-3 w-12" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="border rounded-lg">
          <div className="p-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center p-4">
                  <Skeleton className="w-12 h-12 rounded-full mx-auto mb-3" />
                  <Skeleton className="h-4 w-20 mx-auto mb-2" />
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-3 w-3/4 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
