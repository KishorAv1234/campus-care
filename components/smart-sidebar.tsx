"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  User,
  Settings,
  BookOpen,
  Calendar,
  Utensils,
  FileText,
  MessageSquare,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react"

interface SmartSidebarProps {
  collapsed: boolean
  onToggle: () => void
  onNavigate: (path: string) => void
  user: any
}

export function SmartSidebar({ collapsed, onToggle, onNavigate, user }: SmartSidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      color: "from-indigo-500 to-purple-500",
      notifications: 0,
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      path: "/profile",
      color: "from-blue-500 to-cyan-500",
      notifications: 2,
    },
    {
      id: "marketplace",
      label: "Marketplace",
      icon: BookOpen,
      path: "/marketplace",
      color: "from-green-500 to-emerald-500",
      notifications: 5,
    },
    {
      id: "events",
      label: "Events",
      icon: Calendar,
      path: "/events",
      color: "from-orange-500 to-red-500",
      notifications: 3,
    },
    {
      id: "diet",
      label: "Diet Plans",
      icon: Utensils,
      path: "/diet-plans",
      color: "from-pink-500 to-rose-500",
      notifications: 0,
    },
    {
      id: "notes",
      label: "Notes",
      icon: FileText,
      path: "/notes",
      color: "from-violet-500 to-purple-500",
      notifications: 1,
    },
    {
      id: "social",
      label: "Social",
      icon: MessageSquare,
      path: "/social",
      color: "from-cyan-500 to-blue-500",
      notifications: 7,
    },
  ]

  const quickStats = [
    { label: "Tasks Today", value: "8/12", icon: Target, color: "text-green-600" },
    { label: "Study Streak", value: "5 days", icon: TrendingUp, color: "text-orange-600" },
    { label: "Goals", value: "3/5", icon: Sparkles, color: "text-purple-600" },
  ]

  return (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/95 backdrop-blur-md border-r border-indigo-100 shadow-xl z-40"
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="p-4 border-b border-indigo-100">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="w-full justify-center hover:bg-indigo-50 transition-colors duration-200"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </motion.div>
        </div>

        {/* User Profile Section */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 border-b border-indigo-100"
            >
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                  <Avatar className="h-12 w-12 ring-2 ring-indigo-200">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt={user?.name || "User"} />
                    <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.name || "Student"}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || "student@campus.edu"}</p>
                  <div className="flex items-center mt-1">
                    <div className="h-2 w-2 bg-green-400 rounded-full mr-1"></div>
                    <span className="text-xs text-green-600">Online</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-4 space-y-2">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center">
                      <stat.icon className={`h-3 w-3 mr-2 ${stat.color}`} />
                      <span className="text-gray-600">{stat.label}</span>
                    </div>
                    <span className="font-medium text-gray-900">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Button
                  variant="ghost"
                  onClick={() => onNavigate(item.path)}
                  className={`w-full ${
                    collapsed ? "justify-center px-2" : "justify-start px-3"
                  } h-12 relative group hover:bg-gradient-to-r hover:${item.color} hover:text-white transition-all duration-300`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center w-full"
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="ml-3 text-sm font-medium truncate"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {!collapsed && item.notifications > 0 && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                        <Badge
                          variant="secondary"
                          className="bg-red-500 text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center"
                        >
                          {item.notifications}
                        </Badge>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Tooltip for collapsed state */}
                  <AnimatePresence>
                    {collapsed && hoveredItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-50"
                      >
                        {item.label}
                        {item.notifications > 0 && (
                          <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1">
                            {item.notifications}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-indigo-100 space-y-2">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              onClick={() => onNavigate("/settings")}
              className={`w-full ${
                collapsed ? "justify-center px-2" : "justify-start px-3"
              } h-10 hover:bg-indigo-50 transition-colors duration-200`}
            >
              <Settings className="h-4 w-4" />
              {!collapsed && <span className="ml-3 text-sm">Settings</span>}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              onClick={() => onNavigate("/notifications")}
              className={`w-full ${
                collapsed ? "justify-center px-2" : "justify-start px-3"
              } h-10 hover:bg-orange-50 transition-colors duration-200 relative`}
            >
              <Bell className="h-4 w-4" />
              {!collapsed && <span className="ml-3 text-sm">Notifications</span>}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"
              />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              onClick={() => onNavigate("/logout")}
              className={`w-full ${
                collapsed ? "justify-center px-2" : "justify-start px-3"
              } h-10 hover:bg-red-50 hover:text-red-600 transition-colors duration-200`}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="ml-3 text-sm">Logout</span>}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
