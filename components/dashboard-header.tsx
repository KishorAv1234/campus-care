import type { ReactNode } from "react"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold md:text-3xl">{heading}</h1>
        {text && <p className="text-sm text-muted-foreground md:text-base">{text}</p>}
      </div>
      {children}
    </div>
  )
}
