"use client"

import { useState } from "react"
import { Calendar as CalendarUI } from "@/components/ui/calendar"
import { motion } from "framer-motion"

export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Sample events data
  const events = [
    { date: new Date(2025, 4, 22), title: "CS101 Exam", type: "exam" },
    { date: new Date(2025, 4, 24), title: "Project Deadline", type: "deadline" },
    { date: new Date(2025, 4, 25), title: "Campus Fest", type: "event" },
    { date: new Date(2025, 4, 27), title: "Study Group", type: "meeting" },
    { date: new Date(2025, 4, 29), title: "Math Quiz", type: "exam" },
  ]

  // Function to check if a date has events
  const hasEvent = (day: Date) => {
    return events.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )
  }

  // Function to get event type for styling
  const getEventType = (day: Date) => {
    const event = events.find(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )
    return event?.type || ""
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      <CalendarUI
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        modifiers={{
          event: (date) => hasEvent(date),
        }}
        modifiersStyles={{
          event: {
            fontWeight: "bold",
          },
        }}
      />

      {date && hasEvent(date) && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h4 className="text-sm font-medium">Events on {date.toLocaleDateString()}</h4>
          <div className="space-y-1">
            {events
              .filter(
                (event) =>
                  event.date.getDate() === date.getDate() &&
                  event.date.getMonth() === date.getMonth() &&
                  event.date.getFullYear() === date.getFullYear(),
              )
              .map((event, index) => (
                <div
                  key={index}
                  className={`text-xs p-2 rounded-md ${
                    event.type === "exam"
                      ? "bg-red-100 text-red-800"
                      : event.type === "deadline"
                        ? "bg-orange-100 text-orange-800"
                        : event.type === "event"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {event.title}
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
