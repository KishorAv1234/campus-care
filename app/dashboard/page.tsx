"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Trophy, TrendingUp, CheckCircle2, XCircle, Plus, Edit, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function Dashboard() {
  const [goals, setGoals] = useState([
    { id: 1, title: "Complete Math Assignment", progress: 75, completed: false },
    { id: 2, title: "Read Chapter 5", progress: 50, completed: false },
    { id: 3, title: "Prepare for Presentation", progress: 25, completed: false },
    { id: 4, title: "Review Notes for Quiz", progress: 10, completed: false },
  ])

  const [newGoal, setNewGoal] = useState("")
  const [streak, setStreak] = useState(12)
  const [studyHours, setStudyHours] = useState(18.5)
  const [progress, setProgress] = useState(12)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Simulate streak increase
    const timer = setTimeout(() => {
      setStreak((prev) => prev + 1)
      toast({
        title: "Daily streak increased!",
        description: "You've maintained your streak for 13 days. Keep it up!",
        action: <ToastAction altText="View">View</ToastAction>,
      })
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const addGoal = () => {
    if (!newGoal.trim()) return

    const newId = Math.max(0, ...goals.map((g) => g.id)) + 1
    setGoals([...goals, { id: newId, title: newGoal, progress: 0, completed: false }])
    setNewGoal("")

    toast({
      title: "Goal added",
      description: "Your new goal has been added successfully.",
    })
  }

  const updateGoalProgress = (id, newProgress) => {
    setGoals(
      goals.map((goal) => (goal.id === id ? { ...goal, progress: newProgress, completed: newProgress === 100 } : goal)),
    )

    if (newProgress === 100) {
      toast({
        title: "Goal completed!",
        description: "Congratulations on completing your goal.",
        variant: "success",
      })
    }
  }

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id))

    toast({
      title: "Goal deleted",
      description: "Your goal has been deleted.",
      variant: "destructive",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                May 13, 2025
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{streak} days</div>
                <p className="text-xs text-muted-foreground">Keep it up! You're on a roll.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24/30</div>
                <p className="text-xs text-muted-foreground">80% completion rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studyHours} hrs</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{progress}%</div>
                <p className="text-xs text-muted-foreground">From last week</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
          >
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Daily Goals</CardTitle>
                  <CardDescription>Track your progress on today's goals</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Goal
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Goal</DialogTitle>
                      <DialogDescription>Create a new goal to track your progress.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="goal-title">Goal Title</Label>
                        <Input
                          id="goal-title"
                          placeholder="Enter your goal"
                          value={newGoal}
                          onChange={(e) => setNewGoal(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={addGoal}>Add Goal</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {goals.map((goal, index) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {goal.progress >= 75 ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : goal.progress >= 50 ? (
                            <CheckCircle2 className="h-4 w-4 text-orange-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span>{goal.title}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-sm ${
                              goal.progress >= 75
                                ? "text-green-500"
                                : goal.progress >= 50
                                  ? "text-orange-500"
                                  : goal.progress >= 25
                                    ? "text-blue-500"
                                    : "text-red-500"
                            }`}
                          >
                            {goal.progress}%
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateGoalProgress(goal.id, Math.min(100, goal.progress + 25))}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteGoal(goal.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Progress
                        value={goal.progress}
                        className="h-2"
                        onClick={() => updateGoalProgress(goal.id, Math.min(100, goal.progress + 25))}
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your schedule for the next few days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 rounded-md border p-4 cursor-pointer"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Physics Exam</p>
                      <p className="text-sm text-muted-foreground">May 15, 2025 • 10:00 AM</p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 rounded-md border p-4 cursor-pointer"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Group Project Meeting</p>
                      <p className="text-sm text-muted-foreground">May 16, 2025 • 2:30 PM</p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 rounded-md border p-4 cursor-pointer"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Essay Deadline</p>
                      <p className="text-sm text-muted-foreground">May 18, 2025 • 11:59 PM</p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <Card>
              <CardHeader>
                <CardTitle>Diet Plan</CardTitle>
                <CardDescription>Today's meal suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Breakfast</p>
                    <p className="text-sm text-muted-foreground">Oatmeal with fruits and nuts</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Lunch</p>
                    <p className="text-sm text-muted-foreground">Quinoa salad with vegetables</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Dinner</p>
                    <p className="text-sm text-muted-foreground">Grilled chicken with steamed vegetables</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View Full Plan
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Study Resources</CardTitle>
                <CardDescription>Recently accessed materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Browse Marketplace
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Get help with your studies</CardDescription>
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
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Open AI Assistant
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
