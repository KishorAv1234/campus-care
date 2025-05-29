export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
        <div className="max-w-md mx-auto border rounded-lg p-6">
          <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-6"></div>
          <div className="h-16 bg-gray-200 rounded w-48 mx-auto mb-6"></div>
          <div className="flex justify-center space-x-4">
            <div className="h-10 bg-gray-200 rounded w-20"></div>
            <div className="h-10 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
