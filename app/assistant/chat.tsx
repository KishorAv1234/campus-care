"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, FileUp, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello! I'm your AI study assistant. How can I help you today? You can ask me to explain concepts, summarize notes, create study plans, or generate practice questions.",
    sender: "bot",
    timestamp: new Date(),
  },
]

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("photosynthesis")) {
        response =
          "Photosynthesis is the process plants use to convert light energy into chemical energy. Here's a simple breakdown:\n\n1. Plants capture sunlight using chlorophyll in their leaves\n2. They take in carbon dioxide (CO₂) from the air through tiny pores called stomata\n3. They absorb water (H₂O) through their roots\n4. Using the energy from sunlight, plants convert CO₂ and H₂O into glucose (sugar) and oxygen\n5. The glucose is used as food for the plant, and oxygen is released into the air\n\nThe basic equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ (glucose) + 6O₂\n\nWould you like me to explain any specific part of this process in more detail?"
      } else if (input.toLowerCase().includes("quiz") || input.toLowerCase().includes("test")) {
        response =
          "I'd be happy to help you prepare for your quiz! Here are some options:\n\n1. I can generate practice questions based on your notes\n2. I can create a study plan to help you prepare\n3. I can quiz you on specific topics\n\nWhat subject is your quiz on, and how would you like me to help?"
      } else if (input.toLowerCase().includes("math") || input.toLowerCase().includes("calculus")) {
        response =
          "Mathematics is a broad field! I can help with various topics including:\n\n- Algebra\n- Calculus (derivatives, integrals)\n- Statistics\n- Geometry\n- Trigonometry\n\nWhat specific math concept would you like me to explain?"
      } else {
        response =
          "I'd be happy to help with that! Could you provide more details about what you're looking for? I can explain concepts, summarize information, create study plans, or generate practice questions on various academic subjects."
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 ${message.sender === "user" ? "justify-end" : ""}`}
            >
              {message.sender === "bot" && (
                <div className="rounded-full bg-primary/10 p-2">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`rounded-lg p-3 ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
              {message.sender === "user" && (
                <div className="rounded-full bg-background border p-2">
                  <User className="h-4 w-4" />
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <div className="rounded-full bg-primary/10 p-2">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="flex space-x-1">
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4">
        <form
          className="flex w-full items-center space-x-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
        >
          <Button type="button" variant="outline" size="icon" className="shrink-0">
            <FileUp className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            className="flex-1"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" size="icon" className="shrink-0" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
