import type { Metadata } from "next"
import Link from "next/link"
import { GraduationCap } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Campus Care",
  description: "A comprehensive platform for students to manage their academic journey.",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <GraduationCap className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Welcome to Campus Care</h1>
        <p className="text-muted-foreground">A comprehensive platform for students to manage their academic journey.</p>
        <Button asChild size="lg">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
