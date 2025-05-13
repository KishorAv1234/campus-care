"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function MainNav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/diet", label: "Diet" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/learning", label: "Learning" },
    { href: "/tools", label: "Tools" },
    { href: "/assistant", label: "AI Assistant" },
  ]

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">CampusCare</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === item.href ? "text-foreground" : "text-foreground/60",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      {mounted && (
        <Button
          variant="ghost"
          size="icon"
          className="ml-6"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
      )}
    </div>
  )
}
