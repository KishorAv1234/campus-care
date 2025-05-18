import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/toast-provider"
import { Analytics } from "@/components/analytics"
import { UserProvider } from "@/contexts/user-context"
import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "campus.care - Student Success Platform",
  description: "Your all-in-one platform for student success, wellness, and productivity.",
  metadataBase: new URL("https://campus.care"),
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider>
            <Suspense>
              {children}
              <ToastProvider />
            </Suspense>
          </UserProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
