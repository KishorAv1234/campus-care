"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Star, Plus, Edit, Trash2, Search, Save, X, BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface Note {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  favorite: boolean
  createdAt: Date
  updatedAt: Date
}

export function InteractiveNotes() {
  const { toast } = useToast()
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "CS101 Lecture Notes - Data Structures",
      content:
        "Introduction to arrays, linked lists, stacks, and queues. Arrays provide constant-time access but fixed size. Linked lists offer dynamic size but sequential access...",
      category: "Computer Science",
      tags: ["data-structures", "algorithms", "cs101"],
      favorite: true,
      createdAt: new Date("2025-05-15"),
      updatedAt: new Date("2025-05-15"),
    },
    {
      id: "2",
      title: "MATH201 - Calculus Formulas",
      content:
        "Differentiation rules: d/dx(x^n) = nx^(n-1), Product rule: (uv)' = u'v + uv', Chain rule: (f(g(x)))' = f'(g(x))g'(x)...",
      category: "Mathematics",
      tags: ["calculus", "formulas", "derivatives"],
      favorite: false,
      createdAt: new Date("2025-05-12"),
      updatedAt: new Date("2025-05-12"),
    },
    {
      id: "3",
      title: "PHY102 - Mechanics Problem Solutions",
      content:
        "Newton's laws applications: F = ma, Conservation of momentum: p = mv, Energy conservation: KE + PE = constant...",
      category: "Physics",
      tags: ["mechanics", "newton", "energy"],
      favorite: true,
      createdAt: new Date("2025-05-10"),
      updatedAt: new Date("2025-05-10"),
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  })

  const categories = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Economics",
  ]

  const resetForm = () => {
    setFormData({ title: "", content: "", category: "", tags: "" })
    setEditingNote(null)
  }

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || note.category === selectedCategory
    const matchesFavorites = !showFavoritesOnly || note.favorite

    return matchesSearch && matchesCategory && matchesFavorites
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in title and content",
        variant: "destructive",
      })
      return
    }

    const noteData: Note = {
      id: editingNote?.id || Date.now().toString(),
      title: formData.title,
      content: formData.content,
      category: formData.category || "General",
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      favorite: editingNote?.favorite || false,
      createdAt: editingNote?.createdAt || new Date(),
      updatedAt: new Date(),
    }

    if (editingNote) {
      setNotes(notes.map((note) => (note.id === editingNote.id ? noteData : note)))
      toast({
        title: "Success",
        description: "Note updated successfully!",
      })
    } else {
      setNotes([noteData, ...notes])
      toast({
        title: "Success",
        description: "Note created successfully!",
      })
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (note: Note) => {
    setEditingNote(note)
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category,
      tags: note.tags.join(", "),
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId))
    toast({
      title: "Success",
      description: "Note deleted successfully!",
    })
  }

  const toggleFavorite = (noteId: string) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, favorite: !note.favorite } : note)))
    const note = notes.find((n) => n.id === noteId)
    toast({
      title: note?.favorite ? "Removed from Favorites" : "Added to Favorites",
      description: note?.favorite ? "Note removed from favorites" : "Note added to favorites",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Study Notes</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Create Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingNote ? "Edit Note" : "Create New Note"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter note title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="e.g., algorithms, study, important"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your note content here..."
                  rows={8}
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingNote ? "Update Note" : "Create Note"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes, content, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            <Star className="h-4 w-4 mr-2" />
            Favorites
          </Button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  {note.favorite && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                </div>
                <div className="flex items-center gap-1">
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
                      className={`h-4 w-4 ${note.favorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEdit(note)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(note.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{note.title}</h3>

              <div className="flex items-center gap-2 mb-3">
                <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{note.category}</div>
                <div className="text-xs text-muted-foreground">{note.updatedAt.toLocaleDateString()}</div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{note.content}</p>

              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {note.tags.slice(0, 3).map((tag, tagIndex) => (
                    <div key={tagIndex} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      #{tag}
                    </div>
                  ))}
                  {note.tags.length > 3 && (
                    <div className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      +{note.tags.length - 3} more
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Created {note.createdAt.toLocaleDateString()}</span>
                <span>{note.content.length} characters</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredNotes.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            {searchQuery || selectedCategory !== "all" || showFavoritesOnly ? "No notes found" : "No notes yet"}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || selectedCategory !== "all" || showFavoritesOnly
              ? "Try adjusting your search or filters"
              : "Create your first note to get started"}
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Note
          </Button>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div className="p-4 border rounded-lg text-center" whileHover={{ scale: 1.02 }}>
          <div className="text-2xl font-bold text-blue-600">{notes.length}</div>
          <div className="text-sm text-muted-foreground">Total Notes</div>
        </motion.div>
        <motion.div className="p-4 border rounded-lg text-center" whileHover={{ scale: 1.02 }}>
          <div className="text-2xl font-bold text-yellow-600">{notes.filter((n) => n.favorite).length}</div>
          <div className="text-sm text-muted-foreground">Favorites</div>
        </motion.div>
        <motion.div className="p-4 border rounded-lg text-center" whileHover={{ scale: 1.02 }}>
          <div className="text-2xl font-bold text-green-600">{new Set(notes.map((n) => n.category)).size}</div>
          <div className="text-sm text-muted-foreground">Categories</div>
        </motion.div>
        <motion.div className="p-4 border rounded-lg text-center" whileHover={{ scale: 1.02 }}>
          <div className="text-2xl font-bold text-purple-600">
            {notes.reduce((acc, note) => acc + note.tags.length, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Tags</div>
        </motion.div>
      </div>
    </div>
  )
}
