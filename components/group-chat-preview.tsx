"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Send } from "lucide-react"
import { motion } from "framer-motion"

export function GroupChatPreview() {
  const [newMessage, setNewMessage] = useState("")

  const messages = [
    {
      id: 1,
      user: "Rahul",
      message: "Has anyone started the CS101 project yet?",
      time: "10:30 AM",
      avatar: "R",
    },
    {
      id: 2,
      user: "Priya",
      message: "I'm working on the algorithm part. Need help with the UI.",
      time: "10:32 AM",
      avatar: "P",
    },
    {
      id: 3,
      user: "Amit",
      message: "I can help with the frontend! Let's meet in the library.",
      time: "10:35 AM",
      avatar: "A",
    },
    {
      id: 4,
      user: "You",
      message: "Great! I'll bring my laptop. See you at 2 PM?",
      time: "10:37 AM",
      avatar: "Y",
      isOwn: true,
    },
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      setNewMessage("")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <MessageSquare className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h4 className="font-medium text-sm">CS101 Study Group</h4>
          <p className="text-xs text-muted-foreground">15 members • 3 online</p>
        </div>
      </div>

      <div className="space-y-3 max-h-48 overflow-y-auto">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex gap-2 ${message.isOwn ? "flex-row-reverse" : ""}`}
          >
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">{message.avatar}</AvatarFallback>
            </Avatar>
            <div className={`flex-1 ${message.isOwn ? "text-right" : ""}`}>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xs font-medium">{message.user}</span>
                <span className="text-xs text-muted-foreground">{message.time}</span>
              </div>
              <div
                className={`text-xs p-2 rounded-lg max-w-[80%] ${
                  message.isOwn ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                }`}
              >
                {message.message}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 text-xs px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button size="sm" onClick={handleSendMessage} className="h-8 w-8 p-0">
          <Send className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
