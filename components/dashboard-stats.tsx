"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Calendar, FileText, Users } from "lucide-react"
import { motion } from "framer-motion"

export function DashboardStats() {
  const stats = [
    {
      title: "Study Materials",
      value: "124",
      description: "Books and resources",
      icon: BookOpen,
      color: "bg-blue-500/10 text-blue-500",
      change: "+12% from last month",
    },
    {
      title: "Upcoming Events",
      value: "8",
      description: "In the next 7 days",
      icon: Calendar,
      color: "bg-purple-500/10 text-purple-500",
      change: "+3 new events",
    },
    {
      title: "Notes",
      value: "56",
      description: "Across all subjects",
      icon: FileText,
      color: "bg-green-500/10 text-green-500",
      change: "+5 new notes",
    },
    {
      title: "Study Groups",
      value: "7",
      description: "Active memberships",
      icon: Users,
      color: "bg-orange-500/10 text-orange-500",
      change: "+2 new groups",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
