"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PomodoroPage() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isWork, setIsWork] = useState(true)

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          setIsActive(false)
          if (isWork) {
            setMinutes(5)
            setIsWork(false)
          } else {
            setMinutes(25)
            setIsWork(true)
          }
          setSeconds(0)
        }
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, minutes, seconds, isWork])

  function toggle() {
    setIsActive(!isActive)
  }

  function reset() {
    setIsActive(false)
    setMinutes(25)
    setSeconds(0)
    setIsWork(true)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Pomodoro Timer</h1>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">{isWork ? "Work Time" : "Break Time"}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl font-mono">
            {minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
          </div>

          <div className="space-x-4">
            <Button onClick={toggle}>{isActive ? "Pause" : "Start"}</Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 max-w-lg mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4">How it works</h2>
        <p className="text-muted-foreground">
          Work for 25 minutes, then take a 5 minute break. This technique helps improve focus and productivity.
        </p>
      </div>
    </div>
  )
}
