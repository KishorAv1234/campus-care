"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useUser } from "@/contexts/user-context"
import { motion, AnimatePresence } from "framer-motion"

type Notification = {
  id: string
  type: "order" | "system" | "promotion"
  title: string
  message: string
  read: boolean
  createdAt: Date
}

export function NotificationsPopover() {
  const { user } = useUser()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [activeTab, setActiveTab] = useState("all")

  // Mock notifications data
  useEffect(() => {
    if (user) {
      const mockNotifications: Notification[] = [
        {
          id: "1",
          type: "order",
          title: "Order Confirmed",
          message: "Your order #12345 has been confirmed and is being processed.",
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
        {
          id: "2",
          type: "system",
          title: "Welcome to Campus Care",
          message: "Thank you for joining Campus Care. Start exploring our features!",
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        },
        {
          id: "3",
          type: "promotion",
          title: "Special Offer",
          message: "Get 20% off on all books this week. Use code CAMPUS20.",
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        },
        {
          id: "4",
          type: "order",
          title: "Order Shipped",
          message: "Your order #12345 has been shipped and will arrive in 2-3 days.",
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        },
        {
          id: "5",
          type: "system",
          title: "Profile Updated",
          message: "Your profile information has been updated successfully.",
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
        },
      ]

      setNotifications(mockNotifications)
      setUnreadCount(mockNotifications.filter((n) => !n.read).length)
    }
  }, [user])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => {
        if (notification.id === id && !notification.read) {
          setUnreadCount((count) => count - 1)
          return { ...notification, read: true }
        }
        return notification
      }),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }

  const getFilteredNotifications = () => {
    if (activeTab === "all") return notifications
    return notifications.filter((notification) => notification.type === activeTab)
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    return date.toLocaleDateString()
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="order">Orders</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[300px]">
            <TabsContent value={activeTab} className="m-0">
              <AnimatePresence>
                {getFilteredNotifications().length > 0 ? (
                  <div className="divide-y">
                    {getFilteredNotifications().map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`p-4 cursor-pointer hover:bg-muted ${!notification.read ? "bg-muted/50" : ""}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">{formatTime(notification.createdAt)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Bell className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No notifications</p>
                  </div>
                )}
              </AnimatePresence>
            </TabsContent>
          </ScrollArea>
        </Tabs>
        <div className="p-2 border-t text-center">
          <Button variant="ghost" size="sm" className="w-full">
            View All Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
