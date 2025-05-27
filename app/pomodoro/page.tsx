"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Play, Pause, RotateCcw, Settings, Clock, Target, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PomodoroSession {
  id: string
  date: Date
  workMinutes: number
  breakMinutes: number
  completedCycles: number
}

export default function PomodoroPage() {
  const { toast } = useToast()
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60)
  const [isActive, setIsActive] = useState(false)
  const [isWorkSession, setIsWorkSession] = useState(true)
  const [completedCycles, setCompletedCycles] = useState(0)
  const [sessions, setSessions] = useState<PomodoroSession[]>([])
  const [showSettings, setShowSettings] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleTimerComplete()
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeLeft])

  const handleTimerComplete = () => {
    setIsActive(false)

    if (isWorkSession) {
      setCompletedCycles((prev) => prev + 1)
      toast({
        title: "Work session complete! 🎉",
        description: "Time for a break. Great job!",
      })
      setTimeLeft(breakMinutes * 60)
      setIsWorkSession(false)
    } else {
      toast({
        title: "Break time over! ⏰",
        description: "Ready for another work session?",
      })
      setTimeLeft(workMinutes * 60)
      setIsWorkSession(true)
    }
  }

  const startTimer = () => {
    setIsActive(true)
  }

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(isWorkSession ? workMinutes * 60 : breakMinutes * 60)
  }

  const resetSession = () => {
    setIsActive(false)
    setIsWorkSession(true)
    setTimeLeft(workMinutes * 60)
    setCompletedCycles(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = isWorkSession
    ? ((workMinutes * 60 - timeLeft) / (workMinutes * 60)) * 100
    : ((breakMinutes * 60 - timeLeft) / (breakMinutes * 60)) * 100

  const totalMinutes = isWorkSession ? workMinutes : breakMinutes

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pomodoro Timer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Boost your productivity with focused work sessions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Timer */}
          <div className="lg:col-span-2">
            <Card className="relative overflow-hidden">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5" />
                  {isWorkSession ? "Work Session" : "Break Time"}
                </CardTitle>
                <CardDescription>
                  {isWorkSession ? "Stay focused and productive" : "Relax and recharge"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Circular Progress */}
                <div className="relative flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      {/* Progress circle */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        className={isWorkSession ? "text-blue-500" : "text-green-500"}
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100) }}
                        transition={{ duration: 0.5 }}
                      />
                    </svg>

                    {/* Timer display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div
                        className="text-4xl font-mono font-bold"
                        key={timeLeft}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {formatTime(timeLeft)}
                      </motion.div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {Math.floor(timeLeft / 60)} min remaining
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={isActive ? pauseTimer : startTimer}
                    size="lg"
                    className={`px-8 ${isWorkSession ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                  >
                    {isActive ? (
                      <>
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 mr-2" />
                        Start
                      </>
                    )}
                  </Button>

                  <Button onClick={resetTimer} variant="outline" size="lg">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>

                  <Button onClick={() => setShowSettings(!showSettings)} variant="outline" size="lg">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>

                {/* Settings Panel */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t pt-6 space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="work-minutes">Work Minutes</Label>
                          <Input
                            id="work-minutes"
                            type="number"
                            min="1"
                            max="60"
                            value={workMinutes}
                            onChange={(e) => {
                              const value = Number.parseInt(e.target.value)
                              setWorkMinutes(value)
                              if (isWorkSession && !isActive) {
                                setTimeLeft(value * 60)
                              }
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="break-minutes">Break Minutes</Label>
                          <Input
                            id="break-minutes"
                            type="number"
                            min="1"
                            max="30"
                            value={breakMinutes}
                            onChange={(e) => {
                              const value = Number.parseInt(e.target.value)
                              setBreakMinutes(value)
                              if (!isWorkSession && !isActive) {
                                setTimeLeft(value * 60)
                              }
                            }}
                          />
                        </div>
                      </div>
                      <Button onClick={resetSession} variant="outline" className="w-full">
                        Reset Session
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Current Session Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Session Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Completed Cycles</span>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {completedCycles}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Work Time</span>
                    <span className="font-medium">{workMinutes} min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Break Time</span>
                    <span className="font-medium">{breakMinutes} min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total Focus Time</span>
                    <span className="font-medium">{completedCycles * workMinutes} min</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setWorkMinutes(25)
                    setBreakMinutes(5)
                    if (isWorkSession && !isActive) setTimeLeft(25 * 60)
                    if (!isWorkSession && !isActive) setTimeLeft(5 * 60)
                  }}
                >
                  Classic (25/5)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setWorkMinutes(50)
                    setBreakMinutes(10)
                    if (isWorkSession && !isActive) setTimeLeft(50 * 60)
                    if (!isWorkSession && !isActive) setTimeLeft(10 * 60)
                  }}
                >
                  Extended (50/10)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setWorkMinutes(15)
                    setBreakMinutes(3)
                    if (isWorkSession && !isActive) setTimeLeft(15 * 60)
                    if (!isWorkSession && !isActive) setTimeLeft(3 * 60)
                  }}
                >
                  Quick (15/3)
                </Button>
              </CardContent>
            </Card>

            {/* Progress Today */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sessions completed</span>
                    <span className="font-medium">{completedCycles}</span>
                  </div>
                  <Progress value={(completedCycles / 8) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Goal: 8 sessions per day</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
