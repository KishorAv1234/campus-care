"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { InteractiveEvents } from "@/components/interactive-events"
import { InteractiveDietPlan } from "@/components/interactive-diet-plan"
import { InteractiveNotes } from "@/components/interactive-notes"
import { EnhancedDashboardStats } from "@/components/enhanced-dashboard-stats"
import { SmartSidebar } from "@/components/smart-sidebar"
import { VoiceAssistant } from "@/components/voice-assistant"
import { QuickActions } from "@/components/quick-actions"
import { LoadingAnimation } from "@/components/loading-animation"
import {
  LayoutDashboard,
  BookOpen,
  CalendarIcon,
  Utensils,
  FileText,
  MessageSquare,
  User,
  Sparkles,
} from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [pageLoading, setPageLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Login Required",
        description: "Please login to view your dashboard",
        variant: "destructive",
      })
      router.push("/login")
    } else if (!isLoading) {
      const timer = setTimeout(() => {
        setPageLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [user, isLoading, router, toast])

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    toast({
      title: "Navigating...",
      description: `Taking you to ${path.replace("/", "")}`,
    })
  }

  if (isLoading || pageLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <SiteHeader />
        <main className="flex-1 container py-6 pt-20 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <LoadingAnimation />
            <motion.h2
              className="text-2xl font-bold mt-4 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Loading your dashboard...
            </motion.h2>
            <p className="text-muted-foreground mt-2">Preparing your personalized experience</p>
          </motion.div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <SiteHeader />

      <div className="flex pt-16">
        {/* Enhanced Smart Sidebar */}
        <SmartSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onNavigate={handleNavigation}
          user={user}
        />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Enhanced Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                    {getGreeting()}, {user?.name?.split(" ")[0] || "Student"}! 👋
                  </h1>
                  <p className="text-lg text-muted-foreground mt-2">
                    Ready to make today productive? Here's your campus overview.
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <span>{currentTime.toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </motion.div>

                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <QuickActions onNavigate={handleNavigation} />
                  <VoiceAssistant />

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleNavigation("/profile")}
                      className="bg-white/80 backdrop-blur-sm border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      onClick={() => handleNavigation("/settings")}
                      className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Customize
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Enhanced Stats */}
              <EnhancedDashboardStats />

              {/* Interactive Tabs */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full max-w-4xl grid-cols-6 bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-lg">
                    {[
                      { value: "overview", icon: LayoutDashboard, label: "Overview" },
                      { value: "academics", icon: BookOpen, label: "Academics" },
                      { value: "events", icon: CalendarIcon, label: "Events" },
                      { value: "diet", icon: Utensils, label: "Diet" },
                      { value: "notes", icon: FileText, label: "Notes" },
                      { value: "social", icon: MessageSquare, label: "Social" },
                    ].map((tab) => (
                      <motion.div key={tab.value} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <TabsTrigger
                          value={tab.value}
                          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white transition-all duration-300"
                        >
                          <tab.icon className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">{tab.label}</span>
                        </TabsTrigger>
                      </motion.div>
                    ))}
                  </TabsList>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6"
                    >
                      <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2 space-y-6">
                            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                              <Card className="bg-white/80 backdrop-blur-sm border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-t-lg">
                                  <CardTitle className="flex items-center">
                                    <CalendarIcon className="h-5 w-5 mr-2" />
                                    Upcoming Events
                                  </CardTitle>
                                  <CardDescription className="text-indigo-100">
                                    Your schedule for the next few days
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                  <InteractiveEvents />
                                </CardContent>
                              </Card>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                                <Card className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300">
                                  <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                                    <CardTitle className="flex items-center">
                                      <Utensils className="h-5 w-5 mr-2" />
                                      Today's Diet
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="p-6">
                                    <InteractiveDietPlan />
                                  </CardContent>
                                </Card>
                              </motion.div>

                              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                                <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
                                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
                                    <CardTitle className="flex items-center">
                                      <FileText className="h-5 w-5 mr-2" />
                                      Recent Notes
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="p-6">
                                    <InteractiveNotes />
                                  </CardContent>
                                </Card>
                              </motion.div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                              <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                                  <CardTitle>Smart Calendar</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                  <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">
                                      {currentTime.getDate()}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      {currentTime.toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="academics" className="space-y-6">
                        <InteractiveNotes />
                      </TabsContent>

                      <TabsContent value="events" className="space-y-6">
                        <InteractiveEvents />
                      </TabsContent>

                      <TabsContent value="diet" className="space-y-6">
                        <InteractiveDietPlan />
                      </TabsContent>

                      <TabsContent value="notes" className="space-y-6">
                        <InteractiveNotes />
                      </TabsContent>

                      <TabsContent value="social" className="space-y-6">
                        <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
                          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
                            <CardTitle>Social Features</CardTitle>
                            <CardDescription className="text-blue-100">
                              Connect with your campus community
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="text-center py-8">
                              <MessageSquare className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                              <h3 className="text-lg font-medium mb-2">Coming Soon!</h3>
                              <p className="text-muted-foreground">
                                Group chats, study groups, and social features are being developed.
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>

      <SiteFooter />
    </div>
  )
}
