"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, FileText, Utensils, BookOpen, X, Zap } from "lucide-react"

interface QuickActionsProps {
  onNavigate: (path: string) => void
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const quickActions = [
    {
      id: "add-event",
      label: "Add Event",
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      action: () => onNavigate("/events?action=create"),
    },
    {
      id: "create-note",
      label: "Create Note",
      icon: FileText,
      color: "from-green-500 to-emerald-500",
      action: () => onNavigate("/notes?action=create"),
    },
    {
      id: "log-meal",
      label: "Log Meal",
      icon: Utensils,
      color: "from-orange-500 to-red-500",
      action: () => onNavigate("/diet-plans?action=add-meal"),
    },
    {
      id: "upload-book",
      label: "Upload Book",
      icon: BookOpen,
      color: "from-purple-500 to-pink-500",
      action: () => onNavigate("/marketplace?action=upload"),
    },
  ]

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="bg-white/80 backdrop-blur-sm border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300"
        >
          <Zap className="h-4 w-4 mr-2" />
          Quick Actions
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="bg-white/95 backdrop-blur-md border-orange-200 shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Quick Actions
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <motion.div
                        key={action.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          onClick={() => {
                            action.action()
                            setIsOpen(false)
                          }}
                          className={`w-full h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br ${action.color} text-white border-0 hover:shadow-lg transition-all duration-300`}
                        >
                          <action.icon className="h-6 w-6" />
                          <span className="text-sm font-medium">{action.label}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">Quickly access your most used features</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
