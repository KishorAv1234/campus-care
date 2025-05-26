"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Star, MoreHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NotesListProps {
  limit?: number
}

export function NotesList({ limit }: NotesListProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    note1: true,
    note4: true,
  })

  // Sample notes data
  const notes = [
    {
      id: "note1",
      title: "CS101 Lecture Notes - Data Structures",
      category: "Computer Science",
      date: "May 15, 2025",
      preview: "Introduction to arrays, linked lists, stacks, and queues...",
    },
    {
      id: "note2",
      title: "MATH201 - Calculus Formulas",
      category: "Mathematics",
      date: "May 12, 2025",
      preview: "Differentiation rules, integration techniques, and series expansions...",
    },
    {
      id: "note3",
      title: "PHY102 - Mechanics Problem Set Solutions",
      category: "Physics",
      date: "May 10, 2025",
      preview: "Solutions to problems involving Newton's laws, momentum, and energy...",
    },
    {
      id: "note4",
      title: "ENG105 - Essay Structure Guidelines",
      category: "English",
      date: "May 8, 2025",
      preview: "Introduction, body paragraphs, conclusion, and citation formats...",
    },
    {
      id: "note5",
      title: "CHEM103 - Organic Chemistry Reactions",
      category: "Chemistry",
      date: "May 5, 2025",
      preview: "SN1, SN2, E1, and E2 reaction mechanisms and examples...",
    },
    {
      id: "note6",
      title: "BIO101 - Cell Structure and Function",
      category: "Biology",
      date: "May 3, 2025",
      preview: "Organelles, membrane transport, and cellular processes...",
    },
    {
      id: "note7",
      title: "HIST202 - World War II Timeline",
      category: "History",
      date: "May 1, 2025",
      preview: "Key events, battles, and political developments from 1939-1945...",
    },
    {
      id: "note8",
      title: "ECON101 - Supply and Demand Principles",
      category: "Economics",
      date: "April 28, 2025",
      preview: "Market equilibrium, elasticity, and price controls...",
    },
  ]

  const displayNotes = limit ? notes.slice(0, limit) : notes

  const toggleFavorite = (noteId: string) => {
    setFavorites((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }))
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {displayNotes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-1">{note.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="text-xs px-2 py-0.5 rounded-full bg-muted">{note.category}</div>
                    <p className="text-xs text-muted-foreground">{note.date}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{note.preview}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(note.id)
                  }}
                >
                  <Star
                    className={`h-4 w-4 ${favorites[note.id] ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                  />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Note</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
