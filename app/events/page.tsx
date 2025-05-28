"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { InteractiveEvents } from "@/components/interactive-events"
import { motion } from "framer-motion"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Campus Events & Deadlines
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay organized with your academic schedule, deadlines, and campus events all in one place.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <InteractiveEvents />
          </div>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  )
}
