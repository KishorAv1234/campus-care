import Link from "next/link"
import { GraduationCap } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <GraduationCap className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">Page not found</h2>
        <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <Button asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
