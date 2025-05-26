"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Volume2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const { toast } = useToast()

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()

    if (lowerCommand.includes("profile") || lowerCommand.includes("account")) {
      setResponse("Opening your profile page...")
      setTimeout(() => (window.location.href = "/profile"), 1000)
    } else if (lowerCommand.includes("settings")) {
      setResponse("Taking you to settings...")
      setTimeout(() => (window.location.href = "/settings"), 1000)
    } else if (lowerCommand.includes("marketplace") || lowerCommand.includes("books")) {
      setResponse("Opening the marketplace...")
      setTimeout(() => (window.location.href = "/marketplace"), 1000)
    } else if (lowerCommand.includes("events") || lowerCommand.includes("calendar")) {
      setResponse("Showing your events...")
      setTimeout(() => (window.location.href = "/events"), 1000)
    } else if (lowerCommand.includes("notes")) {
      setResponse("Opening your notes...")
      setTimeout(() => (window.location.href = "/notes"), 1000)
    } else if (lowerCommand.includes("diet") || lowerCommand.includes("food")) {
      setResponse("Showing your diet plan...")
      setTimeout(() => (window.location.href = "/diet-plans"), 1000)
    } else {
      setResponse("I didn't understand that command. Try saying 'open profile' or 'show events'.")
    }
  }

  const startListening = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
        setTranscript("")
        setResponse("")
      }

      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript
        setTranscript(command)
        handleVoiceCommand(command)
      }

      recognition.onerror = () => {
        setIsListening(false)
        toast({
          title: "Voice Recognition Error",
          description: "Please try again or check your microphone permissions.",
          variant: "destructive",
        })
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      })
    }
  }

  const stopListening = () => {
    setIsListening(false)
  }

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
        >
          <Mic className="h-4 w-4 mr-2" />
          Voice Assistant
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="bg-white/95 backdrop-blur-md border-purple-200 shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Voice Assistant
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-center space-y-6">
                    {/* Microphone Button */}
                    <motion.div
                      animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 1, repeat: isListening ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      <Button
                        size="lg"
                        onClick={isListening ? stopListening : startListening}
                        className={`h-20 w-20 rounded-full ${
                          isListening
                            ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        } text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                      </Button>
                    </motion.div>

                    {/* Status */}
                    <div className="space-y-2">
                      {isListening ? (
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          className="text-red-600 font-medium"
                        >
                          🎤 Listening...
                        </motion.div>
                      ) : (
                        <div className="text-gray-600">Click the microphone to start</div>
                      )}
                    </div>

                    {/* Transcript */}
                    <AnimatePresence>
                      {transcript && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="p-3 bg-purple-50 rounded-lg border border-purple-200"
                        >
                          <p className="text-sm text-purple-800">
                            <strong>You said:</strong> "{transcript}"
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Response */}
                    <AnimatePresence>
                      {response && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="p-3 bg-green-50 rounded-lg border border-green-200"
                        >
                          <div className="flex items-center justify-center mb-2">
                            <Volume2 className="h-4 w-4 text-green-600 mr-2" />
                            <span className="text-sm font-medium text-green-800">Assistant:</span>
                          </div>
                          <p className="text-sm text-green-700">{response}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Commands Help */}
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>
                        <strong>Try saying:</strong>
                      </p>
                      <p>"Open profile" • "Show events" • "Go to settings"</p>
                      <p>"Open marketplace" • "Show notes" • "Diet plans"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
