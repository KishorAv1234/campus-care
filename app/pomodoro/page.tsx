"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlayIcon, PauseIcon, RotateCcwIcon, SettingsIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PomodoroSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
}

interface Session {
  id: string;
  type: "work" | "short-break" | "long-break";
  duration: number;
  completedAt: Date;
}

const defaultSettings: PomodoroSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
};

export default function PomodoroPage() {
  const [settings, setSettings] = useState<PomodoroSettings>(defaultSettings);
  const [currentSession, setCurrentSession] = useState<"work" | "short-break" | "long-break">("work");
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState<Session[]>([]);
  const [sessionCount, setSessionCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    
    const newSession: Session = {
      id: Date.now().toString(),
      type: currentSession,
      duration: getCurrentDuration(),
      completedAt: new Date(),
    };
    
    setCompletedSessions(prev => [newSession, ...prev]);

    if (currentSession === "work") {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      
      if (newCount % settings.sessionsUntilLongBreak === 0) {
        setCurrentSession("long-break");
        setTimeLeft(settings.longBreakDuration * 60);
      } else {
        setCurrentSession("short-break");
        setTimeLeft(settings.shortBreakDuration * 60);
      }
    } else {
      setCurrentSession("work");
      setTimeLeft(settings.workDuration * 60);
    }

    // Play notification sound (browser notification)
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Pomodoro Timer", {
        body: `${currentSession === "work" ? "Work" : "Break"} session completed!`,
        icon: "/favicon.ico"
      });
    }
  };

  const getCurrentDuration = () => {
    switch (currentSession) {
      case "work":
        return settings.workDuration;
      case "short-break":
        return settings.shortBreakDuration;
      case "long-break":
        return settings.longBreakDuration;
      default:
        return settings.workDuration;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(getCurrentDuration() * 60);
  };

  const handleSettingsUpdate = (newSettings: PomodoroSettings) => {
    setSettings(newSettings);
    if (!isRunning) {
      setTimeLeft(newSettings.workDuration * 60);
      setCurrentSession("work");
    }
  };

  const progress = ((getCurrentDuration() * 60 - timeLeft) / (getCurrentDuration() * 60)) * 100;

  const getSessionTypeLabel = (type: string) => {
    switch (type) {
      case "work":
        return "Work Session";
      case "short-break":
        return "Short Break";
      case "long-break":
        return "Long Break";
      default:
        return "Session";
    }
  };

  const getSessionColor = (type: string) => {
    switch (type) {
      case "work":
        return "bg-red-500";
      case "short-break":
        return "bg-green-500";
      case "long-break":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
          <p className="text-muted-foreground">
            Boost your productivity with focused work sessions
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <SettingsIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Timer Settings</DialogTitle>
            </DialogHeader>
            <SettingsForm settings={settings} onUpdate={handleSettingsUpdate} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getSessionColor(currentSession)}`} />
                {getSessionTypeLabel(currentSession)}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-mono font-bold">
                {formatTime(timeLeft)}
              </div>
              
              <Progress value={progress} className="w-full" />
              
              <div className="flex justify-center gap-4">
                {!isRunning ? (
                  <Button onClick={handleStart} size="lg">
                    <PlayIcon className="h-5 w-5 mr-2" />
                    Start
                  </Button>
                ) : (
                  <Button onClick={handlePause} size="lg" variant="secondary">
                    <PauseIcon className="h-5 w-5 mr-2" />
                    Pause
                  </Button>
                )}
                <Button onClick={handleReset} size="lg" variant="outline">
                  <RotateCcwIcon className="h-5 w-5 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{sessionCount}</div>
                  <div className="text-sm text-muted-foreground">
                    Completed Sessions
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {Math.floor(sessionCount / settings.sessionsUntilLongBreak)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Completed Cycles
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {completedSessions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No completed sessions yet. Start your first session!
                  </p>
                ) : (
                  completedSessions.slice(0, 10).map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getSessionColor(session.type)}`} />
                        <div>
                          <div className="font-medium">
                            {getSessionTypeLabel(session.type)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {session.duration} minutes
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {session.completedAt.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>How to Use Pomodoro Technique</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-600 font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Work Session</h3>
                <p className="text-sm text-muted-foreground">
                  Focus on a single task for 25 minutes without distractions
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Short Break</h3>
                <p className="text-sm text-muted-foreground">
                  Take a 5-minute break to rest and recharge
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-600 font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Repeat</h3>
                <p className="text-sm text-muted-foreground">
                  Continue the cycle for maximum productivity
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <h3 className="font-medium mb-2">Long Break</h3>
                <p className="text-sm text-muted-foreground">
                  After 4 sessions, take a longer 15-30 minute break
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SettingsForm({
  settings,
  onUpdate,
}: {
  settings: PomodoroSettings;
  onUpdate: (settings: PomodoroSettings) => void;
}) {
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="work-duration">Work Duration (minutes)</Label>
        <Input
          id="work-duration"
          type="number"
          min="1"
          max="60"
          value={formData.workDuration}
          onChange={(e) =>
            setFormData({ ...formData, workDuration: parseInt(e.target.value) })
          }
        />
      </div>
      <div>
        <Label htmlFor="short-break">Short Break Duration (minutes)</Label>
        <Input
          id="short-break"
          type="number"
          min="1"
          max="30"
          value={formData.shortBreakDuration}
          onChange={(e) =>
            setFormData({
              ...formData,
              shortBreakDuration: parseInt(e.target.value),
            })
          }
        />
      </div>
      <div>
        <Label htmlFor="long-break">Long Break Duration (minutes)</Label>
        <Input
          id="long-break"
          type="number"
          min="1"
          max="60"
          value={formData.longBreakDuration}
          onChange={(e) =>
            setFormData({
              ...formData,
              longBreakDuration: parseInt(e.target.value),
            })
          }
        />
      </div>
      <div>
        <Label htmlFor="sessions-until-long">Sessions Until Long Break</Label>
        <Input
          id="sessions-until-long"
          type="number"
          min="2"
          max="10"
          value={formData.sessionsUntilLongBreak}
          onChange={(e) =>
            setFormData({
              ...formData,
              sessionsUntilLongBreak: parseInt(e.target.value),
            })
          }
        />
      </div>
      <Button type="submit" className="w-full">
        Save Settings
      </Button>
    </form>
  );
}
