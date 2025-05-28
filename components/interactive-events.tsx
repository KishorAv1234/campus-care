"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Clock, MapPin, Users, Bell, Plus, Edit, Trash2, Save, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: "exam" | "deadline" | "event" | "meeting" | "lecture"
  attendees: number
  description: string
  reminder: boolean
}

export function InteractiveEvents() {
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "CS101 Final Exam",
      date: "2025-05-25",
      time: "10:00 AM - 12:00 PM",
      location: "Examination Hall A",
      type: "exam",
      attendees: 120,
      description: "Final examination covering all course materials",
      reminder: true,
    },
    {
      id: "2",
      title: "Project Submission Deadline",
      date: "2025-05-27",
      time: "11:59 PM",
      location: "Online Submission",
      type: "deadline",
      attendees: 45,
      description: "Submit your final project via the online portal",
      reminder: true,
    },
    {
      id: "3",
      title: "Campus Cultural Fest",
      date: "2025-05-29",
      time: "9:00 AM - 6:00 PM",
      location: "Main Auditorium",
      type: "event",
      attendees: 500,
      description: "Annual cultural festival with performances and competitions",
      reminder: false,
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    type: "event" as Event["type"],
    attendees: "",
    description: "",
  })

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      type: "event",
      attendees: "",
      description: "",
    })
    setEditingEvent(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.date || !formData.time || !formData.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const eventData: Event = {
      id: editingEvent?.id || Date.now().toString(),
      title: formData.title,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      type: formData.type,
      attendees: Number.parseInt(formData.attendees) || 0,
      description: formData.description,
      reminder: false,
    }

    if (editingEvent) {
      setEvents(events.map((event) => (event.id === editingEvent.id ? eventData : event)))
      toast({
        title: "Success",
        description: "Event updated successfully!",
      })
    } else {
      setEvents([...events, eventData])
      toast({
        title: "Success",
        description: "Event created successfully!",
      })
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type,
      attendees: event.attendees.toString(),
      description: event.description,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
    toast({
      title: "Success",
      description: "Event deleted successfully!",
    })
  }

  const toggleReminder = (eventId: string) => {
    setEvents(events.map((event) => (event.id === eventId ? { ...event, reminder: !event.reminder } : event)))
    const event = events.find((e) => e.id === eventId)
    toast({
      title: event?.reminder ? "Reminder Disabled" : "Reminder Enabled",
      description: event?.reminder ? "You won't receive notifications" : "You'll receive notifications for this event",
    })
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events & Deadlines</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="e.g., 10:00 AM - 12:00 PM"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter location"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Event Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: Event["type"]) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="lecture">Lecture</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="attendees">Expected Attendees</Label>
                    <Input
                      id="attendees"
                      type="number"
                      value={formData.attendees}
                      onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter event description"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingEvent ? "Update Event" : "Create Event"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.01, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
              className={`p-6 border rounded-lg cursor-pointer ${event.type === "exam" ? "border-l-4 border-l-red-500" : ""}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <div className={`text-xs px-2 py-1 rounded-full border ${getEventTypeStyles(event.type)}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </div>
                    {event.reminder && (
                      <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 border border-green-200">
                        Reminder On
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees} attendees
                    </div>
                  </div>

                  {event.description && <p className="text-sm text-muted-foreground mt-2">{event.description}</p>}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    variant={event.reminder ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleReminder(event.id)}
                    className="h-9"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    {event.reminder ? "Reminder On" : "Set Reminder"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(event)} className="h-9">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(event.id)}
                    className="h-9 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {events.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No events scheduled</h3>
          <p className="text-muted-foreground mb-4">Create your first event to get started</p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Event
          </Button>
        </motion.div>
      )}
    </div>
  )
}
