"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, LayoutDashboard, ShoppingBag, Calendar, Utensils, FileText, User, LogIn } from "lucide-react"
import { useUser } from "@/contexts/user-context"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/diet-plans", label: "Diet Plans", icon: Utensils },
  { href: "/notes", label: "Notes", icon: FileText },
]

export function MobileNav() {
  const pathname = usePathname()
  const { user } = useUser()

  return (
    <div className="bg-background border-b">
      <ScrollArea className="h-[calc(100vh-4rem)] py-4">
        <div className="container space-y-6 pb-8">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start", pathname === item.href ? "bg-muted" : "bg-transparent")}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground py-2">Account</div>
            {user ? (
              <Link href="/profile">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="w-full justify-start">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
