"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, Plus, Mic, MicOff, Bell, Clock, MapPin, Save, X } from "lucide-react"

interface Reminder {
  id: string
  title: string
  description: string
  date: Date
  time: string
  location?: string
  type: "reminder" | "event" | "deadline"
  completed: boolean
}

declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

export default function CalendarPage() {
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "CS101 Assignment Due",
      description: "Submit the final programming assignment",
      date: new Date(2025, 4, 30), // May 30, 2025
      time: "23:59",
      type: "deadline",
      completed: false,
    },
    {
      id: "2",
      title: "Study Group Meeting",
      description: "Weekly study session for Mathematics",
      date: new Date(2025, 4, 28), // May 28, 2025
      time: "15:00",
      location: "Library Room 201",
      type: "event",
      completed: false,
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time: "",
    location: "",
    type: "reminder" as Reminder["type"],
  })

  // Voice recognition setup
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const speechRecognition = new (window as any).webkitSpeechRecognition()
      speechRecognition.continuous = false
      speechRecognition.interimResults = false
      speechRecognition.lang = "en-US"

      speechRecognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setFormData((prev) => ({ ...prev, title: transcript }))
        setIsListening(false)
        toast({
          title: "Voice Input Captured",
          description: `Added: "${transcript}"`,
        })
      }

      speechRecognition.onerror = () => {
        setIsListening(false)
        toast({
          title: "Voice Input Error",
          description: "Could not capture voice input. Please try again.",
          variant: "destructive",
        })
      }

      speechRecognition.onend = () => {
        setIsListening(false)
      }

      setRecognition(speechRecognition)
    }
  }, [toast])

  const startVoiceInput = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    } else {
      toast({
        title: "Voice Input Not Supported",
        description: "Your browser doesn't support voice input.",
        variant: "destructive",
      })
    }
  }

  const stopVoiceInput = () => {
    if (recognition) {
      recognition.stop()
      setIsListening(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      time: "",
      location: "",
      type: "reminder",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !selectedDate || !formData.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const reminderData: Reminder = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: selectedDate,
      time: formData.time,
      location: formData.location,
      type: formData.type,
      completed: false,
    }

    setReminders([...reminders, reminderData])
    toast({
      title: "Success",
      description: "Reminder created successfully!",
    })

    resetForm()
    setIsDialogOpen(false)
  }

  const toggleReminder = (id: string) => {
    setReminders(
      reminders.map((reminder) => (reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder)),
    )
  }

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id))
    toast({
      title: "Success",
      description: "Reminder deleted successfully!",
    })
  }

  const getRemindersForDate = (date: Date) => {
    return reminders.filter((reminder) => reminder.date.toDateString() === date.toDateString())
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "deadline":
        return "bg-red-100 text-red-800 border-red-200"
      case "event":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "reminder":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const selectedDateReminders = selectedDate ? getRemindersForDate(selectedDate) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Smart Calendar & Reminders
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Organize your schedule with voice-powered reminders and smart calendar features.
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={resetForm}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reminder
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Reminder</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter reminder title"
                        required
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={isListening ? stopVoiceInput : startVoiceInput}
                        className={isListening ? "bg-red-100 border-red-300" : ""}
                      >
                        {isListening ? <MicOff className="h-4 w-4 text-red-600" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    {isListening && <p className="text-sm text-blue-600 mt-1">🎤 Listening... Speak now!</p>}
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Add details about your reminder"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="time">Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as Reminder["type"] })}
                      >
                        <option value="reminder">Reminder</option>
                        <option value="event">Event</option>
                        <option value="deadline">Deadline</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Add location"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Create Reminder
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Calendar and Reminders Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                      hasReminder: (date) => getRemindersForDate(date).length > 0,
                    }}
                    modifiersStyles={{
                      hasReminder: {
                        backgroundColor: "#dbeafe",
                        color: "#1d4ed8",
                        fontWeight: "bold",
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Reminders for Selected Date */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg">
                <CardHeader>
                  <CardTitle>Reminders for {selectedDate?.toLocaleDateString() || "Selected Date"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <AnimatePresence>
                      {selectedDateReminders.length > 0 ? (
                        selectedDateReminders.map((reminder, index) => (
                          <motion.div
                            key={reminder.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 border rounded-lg transition-all duration-300 ${
                              reminder.completed ? "bg-green-50 border-green-200" : "bg-white hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3
                                    className={`font-semibold ${reminder.completed ? "line-through opacity-70" : ""}`}
                                  >
                                    {reminder.title}
                                  </h3>
                                  <div
                                    className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(reminder.type)}`}
                                  >
                                    {reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1)}
                                  </div>
                                  {reminder.completed && (
                                    <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 border border-green-200">
                                      ✓ Completed
                                    </div>
                                  )}
                                </div>

                                {reminder.description && (
                                  <p className="text-sm text-muted-foreground mb-2">{reminder.description}</p>
                                )}

                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {reminder.time}
                                  </div>
                                  {reminder.location && (
                                    <div className="flex items-center">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      {reminder.location}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex gap-2 ml-4">
                                <Button variant="outline" size="sm" onClick={() => toggleReminder(reminder.id)}>
                                  {reminder.completed ? "Undo" : "Complete"}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => deleteReminder(reminder.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">No reminders for this date</h3>
                          <p className="text-muted-foreground mb-4">Select a different date or create a new reminder</p>
                          <Button onClick={() => setIsDialogOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Reminder
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* All Reminders Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle>All Upcoming Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reminders
                    .filter((reminder) => !reminder.completed)
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((reminder, index) => (
                      <motion.div
                        key={reminder.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{reminder.title}</h4>
                          <div className={`text-xs px-1.5 py-0.5 rounded-full border ${getTypeColor(reminder.type)}`}>
                            {reminder.type}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {reminder.date.toLocaleDateString()} at {reminder.time}
                        </div>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  )
}
