"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface UpcomingEventsProps {
  limit?: number
}

export function UpcomingEvents({ limit }: UpcomingEventsProps) {
  const [reminders, setReminders] = useState<Record<string, boolean>>({
    event1: true,
    event3: true,
  })

  // Sample events data
  const events = [
    {
      id: "event1",
      title: "CS101 Final Exam",
      date: "May 25, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Examination Hall A",
      type: "exam",
      attendees: 120,
    },
    {
      id: "event2",
      title: "Project Submission Deadline",
      date: "May 27, 2025",
      time: "11:59 PM",
      location: "Online Submission",
      type: "deadline",
      attendees: 45,
    },
    {
      id: "event3",
      title: "Campus Cultural Fest",
      date: "May 29-30, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Main Auditorium",
      type: "event",
      attendees: 500,
    },
    {
      id: "event4",
      title: "Study Group Meeting",
      date: "June 2, 2025",
      time: "4:00 PM - 6:00 PM",
      location: "Library Conference Room",
      type: "meeting",
      attendees: 8,
    },
    {
      id: "event5",
      title: "Guest Lecture: AI Advancements",
      date: "June 5, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Lecture Hall 3",
      type: "lecture",
      attendees: 150,
    },
    {
      id: "event6",
      title: "Math Quiz",
      date: "June 8, 2025",
      time: "1:00 PM - 2:00 PM",
      location: "Room 201",
      type: "exam",
      attendees: 35,
    },
  ]

  const displayEvents = limit ? events.slice(0, limit) : events

  const toggleReminder = (eventId: string) => {
    setReminders((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }))
  }

  const getEventTypeStyles = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800 border-red-200"
      case "deadline":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "event":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "meeting":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "lecture":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {displayEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className={`p-4 border rounded-lg cursor-pointer ${event.type === "exam" ? "border-l-4 border-l-red-500" : ""}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{event.title}</h3>
                  <div className={`text-xs px-2 py-0.5 rounded-full border ${getEventTypeStyles(event.type)}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {event.location}
                  </div>
                  {event.attendees && (
                    <div className="flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      {event.attendees} attendees
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={reminders[event.id] ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleReminder(event.id)}
                  className="h-8"
                >
                  <Bell className="h-3.5 w-3.5 mr-1" />
                  {reminders[event.id] ? "Reminder On" : "Set Reminder"}
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  Details
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
