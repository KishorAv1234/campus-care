"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { InteractiveDietPlan } from "@/components/interactive-diet-plan"
import { motion } from "framer-motion"

export default function DietPlansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Diet & Nutrition Tracker
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your daily nutrition, water intake, and maintain healthy eating habits throughout your campus life.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <InteractiveDietPlan />
          </div>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  )
}
