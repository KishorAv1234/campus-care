"use client"
import { BookOpen, Calendar, FileText, MessageSquare, Trophy } from "lucide-react"
import { motion } from "framer-motion"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "note",
      title: "Added new notes",
      description: "CS101 - Data Structures",
      time: "2 hours ago",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      id: 2,
      type: "quiz",
      title: "Completed quiz",
      description: "Mathematics Quiz - 85% score",
      time: "4 hours ago",
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      id: 3,
      type: "event",
      title: "Joined event",
      description: "Campus Cultural Fest 2025",
      time: "1 day ago",
      icon: Calendar,
      color: "text-purple-500",
    },
    {
      id: 4,
      type: "chat",
      title: "New message",
      description: "CS101 Study Group",
      time: "1 day ago",
      icon: MessageSquare,
      color: "text-green-500",
    },
    {
      id: 5,
      type: "book",
      title: "Purchased book",
      description: "Advanced Algorithms - ₹899",
      time: "2 days ago",
      icon: BookOpen,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-3"
        >
          <div className={`h-8 w-8 rounded-full bg-muted flex items-center justify-center ${activity.color}`}>
            <activity.icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-xs text-muted-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
