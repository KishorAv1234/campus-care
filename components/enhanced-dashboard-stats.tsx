"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { BookOpen, Target, TrendingUp, Clock, Award, Zap, Heart } from "lucide-react"

export function EnhancedDashboardStats() {
  const [animatedValues, setAnimatedValues] = useState({
    tasksCompleted: 0,
    studyHours: 0,
    goalsAchieved: 0,
    streakDays: 0,
  })

  const stats = [
    {
      title: "Tasks Completed",
      value: 8,
      total: 12,
      icon: Target,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      description: "Daily progress",
    },
    {
      title: "Study Hours",
      value: 4.5,
      total: 8,
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      description: "Today's focus time",
    },
    {
      title: "Goals Achieved",
      value: 3,
      total: 5,
      icon: Award,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      description: "This week",
    },
    {
      title: "Study Streak",
      value: 5,
      total: 7,
      icon: Zap,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      description: "Days in a row",
    },
  ]

  const achievements = [
    {
      title: "Early Bird",
      description: "Completed morning tasks",
      icon: "🌅",
      earned: true,
    },
    {
      title: "Focus Master",
      description: "2+ hours of focused study",
      icon: "🎯",
      earned: true,
    },
    {
      title: "Healthy Habits",
      description: "Met all diet goals",
      icon: "🥗",
      earned: false,
    },
    {
      title: "Social Butterfly",
      description: "Engaged in group activities",
      icon: "🦋",
      earned: false,
    },
  ]

  // Animate values on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        tasksCompleted: 8,
        studyHours: 4.5,
        goalsAchieved: 3,
        streakDays: 5,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group"
          >
            <Card
              className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative`}
            >
              <CardContent className="p-6">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                      className="text-2xl"
                    >
                      {stat.title === "Study Streak" ? "🔥" : "✨"}
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <motion.span
                        className={`text-3xl font-bold ${stat.textColor}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        {stat.title === "Study Hours" ? stat.value.toFixed(1) : stat.value}
                      </motion.span>
                      <span className="text-sm text-muted-foreground">/ {stat.total}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{stat.title}</span>
                        <span className="text-muted-foreground">{Math.round((stat.value / stat.total) * 100)}%</span>
                      </div>
                      <Progress value={(stat.value / stat.total) * 100} className="h-2" />
                    </div>

                    <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Achievements Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Today's Achievements
              </h3>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
                className="text-xl"
              >
                🏆
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    achievement.earned
                      ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-md"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="text-center">
                    <motion.div
                      animate={achievement.earned ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                      className="text-3xl mb-2"
                    >
                      {achievement.earned ? achievement.icon : "🔒"}
                    </motion.div>
                    <h4 className={`font-medium text-sm ${achievement.earned ? "text-gray-900" : "text-gray-500"}`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-xs mt-1 ${achievement.earned ? "text-gray-600" : "text-gray-400"}`}>
                      {achievement.description}
                    </p>
                    {achievement.earned && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          <Heart className="h-3 w-3 mr-1" />
                          Earned!
                        </span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm">Productivity Score</p>
                <p className="text-3xl font-bold">87%</p>
                <p className="text-indigo-200 text-xs mt-1">+12% from yesterday</p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <TrendingUp className="h-8 w-8 text-indigo-200" />
              </motion.div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Health Score</p>
                <p className="text-3xl font-bold">92%</p>
                <p className="text-green-200 text-xs mt-1">Excellent progress!</p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="h-8 w-8 text-green-200" />
              </motion.div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Learning Streak</p>
                <p className="text-3xl font-bold">5 Days</p>
                <p className="text-orange-200 text-xs mt-1">Keep it up! 🔥</p>
              </div>
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <BookOpen className="h-8 w-8 text-orange-200" />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
