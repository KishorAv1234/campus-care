"use client"

import type React from "react"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Target, Plus, Edit, Trash2, Save, X, Trophy, Calendar, Clock } from "lucide-react"

interface Goal {
  id: string
  title: string
  description: string
  category: "academic" | "health" | "personal" | "career"
  priority: "low" | "medium" | "high"
  progress: number
  deadline: string
  status: "active" | "completed" | "paused"
  createdAt: Date
}

export default function GoalsPage() {
  const { toast } = useToast()
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Complete CS101 Final Project",
      description: "Finish the web application project for computer science course",
      category: "academic",
      priority: "high",
      progress: 75,
      deadline: "2025-06-15",
      status: "active",
      createdAt: new Date("2025-05-01"),
    },
    {
      id: "2",
      title: "Read 2 Books This Month",
      description: "Expand knowledge by reading technical and personal development books",
      category: "personal",
      priority: "medium",
      progress: 50,
      deadline: "2025-05-31",
      status: "active",
      createdAt: new Date("2025-05-01"),
    },
    {
      id: "3",
      title: "Exercise 4 Times a Week",
      description: "Maintain physical fitness with regular workout routine",
      category: "health",
      priority: "medium",
      progress: 80,
      deadline: "2025-12-31",
      status: "active",
      createdAt: new Date("2025-01-01"),
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "academic" as Goal["category"],
    priority: "medium" as Goal["priority"],
    deadline: "",
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "academic",
      priority: "medium",
      deadline: "",
    })
    setEditingGoal(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.deadline) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const goalData: Goal = {
      id: editingGoal?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      progress: editingGoal?.progress || 0,
      deadline: formData.deadline,
      status: editingGoal?.status || "active",
      createdAt: editingGoal?.createdAt || new Date(),
    }

    if (editingGoal) {
      setGoals(goals.map((goal) => (goal.id === editingGoal.id ? goalData : goal)))
      toast({
        title: "Success",
        description: "Goal updated successfully!",
      })
    } else {
      setGoals([...goals, goalData])
      toast({
        title: "Success",
        description: "Goal created successfully!",
      })
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal)
    setFormData({
      title: goal.title,
      description: goal.description,
      category: goal.category,
      priority: goal.priority,
      deadline: goal.deadline,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (goalId: string) => {
    setGoals(goals.filter((goal) => goal.id !== goalId))
    toast({
      title: "Success",
      description: "Goal deleted successfully!",
    })
  }

  const updateProgress = (goalId: string, newProgress: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, progress: newProgress, status: newProgress === 100 ? "completed" : "active" }
          : goal,
      ),
    )

    if (newProgress === 100) {
      toast({
        title: "🎉 Goal Completed!",
        description: "Congratulations on achieving your goal!",
      })
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "health":
        return "bg-green-100 text-green-800 border-green-200"
      case "personal":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "career":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const activeGoals = goals.filter((goal) => goal.status === "active")
  const completedGoals = goals.filter((goal) => goal.status === "completed")
  const averageProgress =
    goals.length > 0 ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Goal Planner & Tracker
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Set, track, and achieve your academic and personal goals with our interactive planner.
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={resetForm}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{editingGoal ? "Edit Goal" : "Create New Goal"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Goal Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter your goal"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your goal"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value: Goal["category"]) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="career">Career</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value: Goal["priority"]) => setFormData({ ...formData, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="deadline">Deadline *</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      {editingGoal ? "Update Goal" : "Create Goal"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{goals.length}</div>
                  <div className="text-sm text-muted-foreground">Total Goals</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{completedGoals.length}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{activeGoals.length}</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600">{averageProgress}%</div>
                  <div className="text-sm text-muted-foreground">Avg Progress</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                  <Card
                    className={`bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 ${
                      goal.status === "completed" ? "border-green-200" : "border-gray-200"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle
                            className={`text-lg ${goal.status === "completed" ? "line-through opacity-70" : ""}`}
                          >
                            {goal.title}
                          </CardTitle>
                          {goal.description && <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>}
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(goal)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(goal.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <div className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(goal.category)}`}>
                          {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(goal.priority)}`}>
                          {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
                        </div>
                        {goal.status === "completed" && (
                          <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 border border-green-200">
                            ✓ Completed
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>

                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateProgress(goal.id, Math.min(goal.progress + 10, 100))}
                              disabled={goal.status === "completed"}
                            >
                              +10%
                            </Button>
                            {goal.progress > 0 && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateProgress(goal.id, Math.max(goal.progress - 10, 0))}
                                disabled={goal.status === "completed"}
                              >
                                -10%
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {goals.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No goals yet</h3>
              <p className="text-muted-foreground mb-4">Create your first goal to start tracking your progress</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Goal
              </Button>
            </motion.div>
          )}
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  )
}
