"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Trophy,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  ChefHat,
  ShoppingBag,
  Bot,
} from "lucide-react"
import { motion } from "framer-motion"
import { getUserEvents, createEvent, toggleEventCompletion } from "@/app/actions/events"
import { getUserDietPlans } from "@/app/actions/diet"
import { redirect } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

type Event = {
  id: string
  title: string
  description: string
  date: Date
  location: string
  isCompleted: boolean
}

type DietPlan = {
  id: string
  name: string
  breakfast: string
  lunch: string
  dinner: string
  snacks: string
  date: Date
}

export default function Dashboard() {
  const { user, isLoading } = useUser()
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([])
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([])
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventDescription, setNewEventDescription] = useState("")
  const [newEventDate, setNewEventDate] = useState("")
  const [newEventLocation, setNewEventLocation] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/login")
    }
  }, [user, isLoading])

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const [eventsData, dietPlansData] = await Promise.all([getUserEvents(), getUserDietPlans()])

          setEvents(eventsData)
          setDietPlans(dietPlansData)
        } catch (error) {
          console.error("Error fetching data:", error)
          toast({
            title: "Error",
            description: "Failed to load your data. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsPageLoading(false)
        }
      }
    }

    if (user) {
      fetchData()
    }
  }, [user, toast])

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", newEventTitle)
    formData.append("description", newEventDescription)
    formData.append("date", newEventDate)
    formData.append("location", newEventLocation)

    const result = await createEvent(formData)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else if (result.success) {
      toast({
        title: "Success",
        description: "Event created successfully!",
      })

      // Add the new event to the state
      setEvents([...events, result.event])

      // Reset form
      setNewEventTitle("")
      setNewEventDescription("")
      setNewEventDate("")
      setNewEventLocation("")
      setIsDialogOpen(false)
    }
  }

  const handleToggleEventCompletion = async (eventId: string) => {
    const result = await toggleEventCompletion(eventId)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else if (result.success) {
      // Update the event in the state
      setEvents(events.map((event) => (event.id === eventId ? { ...event, isCompleted: !event.isCompleted } : event)))

      toast({
        title: "Success",
        description: result.event.isCompleted ? "Event marked as completed!" : "Event marked as incomplete!",
      })
    }
  }

  if (isLoading || isPageLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container py-6 pt-20 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6 pt-20">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 days</div>
                <p className="text-xs text-muted-foreground">Keep it up! You're on a roll.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {events.filter((e) => e.isCompleted).length}/{events.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {events.length > 0
                    ? `${Math.round((events.filter((e) => e.isCompleted).length / events.length) * 100)}% completion rate`
                    : "No tasks yet"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.5 hrs</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12%</div>
                <p className="text-xs text-muted-foreground">From last week</p>
              </CardContent>
            </Card>
          </motion.div>

          <Tabs defaultValue="events" className="w-full">
            <TabsList>
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
              <TabsTrigger value="diet">Diet Plans</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Events</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Event</DialogTitle>
                      <DialogDescription>
                        Add a new event to your calendar. Fill out the details below.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateEvent}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Event Title</Label>
                          <Input
                            id="title"
                            value={newEventTitle}
                            onChange={(e) => setNewEventTitle(e.target.value)}
                            placeholder="e.g., Physics Exam"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description (Optional)</Label>
                          <Textarea
                            id="description"
                            value={newEventDescription}
                            onChange={(e) => setNewEventDescription(e.target.value)}
                            placeholder="Add details about your event"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="date">Date & Time</Label>
                          <Input
                            id="date"
                            type="datetime-local"
                            value={newEventDate}
                            onChange={(e) => setNewEventDate(e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="location">Location (Optional)</Label>
                          <Input
                            id="location"
                            value={newEventLocation}
                            onChange={(e) => setNewEventLocation(e.target.value)}
                            placeholder="e.g., Room 101"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Create Event</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className={`${event.isCompleted ? "bg-muted/50" : ""}`}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className={`${event.isCompleted ? "line-through text-muted-foreground" : ""}`}>
                              {event.title}
                            </CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => handleToggleEventCompletion(event.id)}>
                              {event.isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                          <CardDescription>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            {event.location && ` • ${event.location}`}
                          </CardDescription>
                        </CardHeader>
                        {event.description && (
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </CardContent>
                        )}
                        <CardFooter className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No events yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first event to start tracking your schedule
                    </p>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Event
                      </Button>
                    </DialogTrigger>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="diet" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Diet Plans</h2>
                <Link href="/diet">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Diet Plan
                  </Button>
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {dietPlans.length > 0 ? (
                  dietPlans.map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>
                            {new Date(plan.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div>
                            <p className="font-medium text-sm">Breakfast</p>
                            <p className="text-sm text-muted-foreground">{plan.breakfast}</p>
                          </div>
                          <div>
                            <p className="font-medium text-sm">Lunch</p>
                            <p className="text-sm text-muted-foreground">{plan.lunch}</p>
                          </div>
                          <div>
                            <p className="font-medium text-sm">Dinner</p>
                            <p className="text-sm text-muted-foreground">{plan.dinner}</p>
                          </div>
                          {plan.snacks && (
                            <div>
                              <p className="font-medium text-sm">Snacks</p>
                              <p className="text-sm text-muted-foreground">{plan.snacks}</p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                    <ChefHat className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No diet plans yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first diet plan to start tracking your nutrition
                    </p>
                    <Link href="/diet">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Diet Plan
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary/10">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <CardTitle>Study Resources</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Calculus Notes</p>
                        <p className="text-xs text-muted-foreground">PDF • 2.4 MB</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Chemistry Flashcards</p>
                        <p className="text-xs text-muted-foreground">Set • 45 cards</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">History Timeline</p>
                        <p className="text-xs text-muted-foreground">Interactive • Web</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/marketplace" className="w-full">
                      <Button variant="outline" size="sm" className="w-full">
                        Browse Marketplace
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary/10">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                      <CardTitle>Recent Purchases</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Introduction to Computer Science</p>
                        <p className="text-xs text-muted-foreground">eBook • ₹299</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Read
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Physics Notes Bundle</p>
                        <p className="text-xs text-muted-foreground">PDF • ₹149</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/orders" className="w-full">
                      <Button variant="outline" size="sm" className="w-full">
                        View All Purchases
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary/10">
                        <Bot className="h-5 w-5" />
                      </div>
                      <CardTitle>AI Assistant</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-sm">
                          Ask me anything about your coursework, or get help with assignments and study plans.
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Summarize Notes
                        </Button>
                        <Button variant="outline" size="sm">
                          Generate Quiz
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Explain Concept
                        </Button>
                        <Button variant="outline" size="sm">
                          Study Plan
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/ai-assistant" className="w-full">
                      <Button variant="outline" size="sm" className="w-full">
                        Open AI Assistant
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
