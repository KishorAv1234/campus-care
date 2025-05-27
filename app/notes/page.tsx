"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { InteractiveNotes } from "@/components/interactive-notes"
import { motion } from "framer-motion"

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Study Notes & Knowledge Base
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Organize your study materials, create rich notes, and build your personal knowledge repository.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <InteractiveNotes />
          </div>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  )
}
