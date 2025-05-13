import type { ReactNode } from "react"
import Link from "next/link"
import { GraduationCap } from "lucide-react"

import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/mobile-nav"

interface DashboardShellProps {
  children: ReactNode
  className?: string
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="ml-2 hidden font-bold text-xl md:inline-block">Campus Care</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <MobileNav />
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground border-2 border-primary/10">
                <span className="font-medium text-sm">CC</span>
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
            </div>
          </div>
        </div>
      </header>
      <main className="container flex w-full flex-1 flex-col overflow-hidden">
        <div className={cn("flex flex-1 flex-col gap-4 py-8", className)}>{children}</div>
      </main>
    </div>
  )
}
