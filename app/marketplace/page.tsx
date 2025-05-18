"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, BookOpen, FileText, Star, Upload, Download, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { getAllBooks, getFreeBooks, getBooksByCategory, searchBooks, uploadBook, addToCart } from "@/app/actions/books"

type Book = {
  id: string
  title: string
  author: string
  description: string
  price: number
  coverImage?: string
  fileUrl?: string
  uploadedBy: string
  isFree: boolean
  category: string
  createdAt: Date
}

export default function Marketplace() {
  const { user } = useUser()
  const { toast } = useToast()
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [isUploading, setIsUploading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Form states
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [isFree, setIsFree] = useState(false)

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      const allBooks = await getAllBooks()
      setBooks(allBooks)
      setFilteredBooks(allBooks)
    }

    fetchBooks()
  }, [])

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // If search is empty, reset to all books or current category/tab
      if (activeTab === "free") {
        const freeBooks = await getFreeBooks()
        setFilteredBooks(freeBooks)
      } else if (selectedCategory !== "all") {
        const categoryBooks = await getBooksByCategory(selectedCategory)
        setFilteredBooks(categoryBooks)
      } else {
        setFilteredBooks(books)
      }
      return
    }

    const results = await searchBooks(searchQuery)
    setFilteredBooks(results)
  }

  // Handle category change
  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category)

    if (category === "all") {
      if (activeTab === "free") {
        const freeBooks = await getFreeBooks()
        setFilteredBooks(freeBooks)
      } else {
        setFilteredBooks(books)
      }
    } else {
      const categoryBooks = await getBooksByCategory(category)

      if (activeTab === "free") {
        setFilteredBooks(categoryBooks.filter((book) => book.isFree))
      } else {
        setFilteredBooks(categoryBooks)
      }
    }
  }

  // Handle tab change
  const handleTabChange = async (tab: string) => {
    setActiveTab(tab)

    if (tab === "free") {
      const freeBooks = await getFreeBooks()

      if (selectedCategory !== "all") {
        setFilteredBooks(freeBooks.filter((book) => book.category === selectedCategory))
      } else {
        setFilteredBooks(freeBooks)
      }
    } else {
      if (selectedCategory !== "all") {
        const categoryBooks = await getBooksByCategory(selectedCategory)
        setFilteredBooks(categoryBooks)
      } else {
        setFilteredBooks(books)
      }
    }
  }

  // Handle book upload
  const handleUploadBook = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("author", author)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("isFree", isFree.toString())

      const result = await uploadBook(formData)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else if (result.success) {
        toast({
          title: "Success",
          description: "Book uploaded successfully!",
        })

        // Add the new book to the state
        setBooks([...books, result.book])

        // Update filtered books if needed
        if (
          (activeTab === "all" && (selectedCategory === "all" || selectedCategory === result.book.category)) ||
          (activeTab === "free" &&
            result.book.isFree &&
            (selectedCategory === "all" || selectedCategory === result.book.category))
        ) {
          setFilteredBooks([...filteredBooks, result.book])
        }

        // Reset form
        setTitle("")
        setAuthor("")
        setDescription("")
        setPrice("")
        setCategory("")
        setIsFree(false)
        setIsDialogOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload book. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Handle add to cart
  const handleAddToCart = async (bookId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart.",
        variant: "destructive",
      })
      return
    }

    const result = await addToCart(bookId)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else if (result.success) {
      toast({
        title: "Success",
        description: "Item added to cart!",
      })
    }
  }

  const categories = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Engineering",
    "Literature",
    "History",
    "Economics",
    "Business",
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6 pt-20">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Student Marketplace</h1>
            <div className="flex items-center gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Book
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Upload Book</DialogTitle>
                    <DialogDescription>
                      Share your books, notes, or study materials with other students.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleUploadBook}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g., Introduction to Computer Science"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          placeholder="e.g., John Doe"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Provide a brief description of the book"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="category">Category</Label>
                          <Select value={category} onValueChange={setCategory} required>
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="price">Price (₹)</Label>
                          <Input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="e.g., 299"
                            disabled={isFree}
                            required={!isFree}
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="free"
                          checked={isFree}
                          onCheckedChange={(checked) => {
                            setIsFree(!!checked)
                            if (checked) setPrice("")
                          }}
                        />
                        <label
                          htmlFor="free"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Offer this book for free
                        </label>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="file">Upload File</Label>
                        <Input id="file" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" required />
                        <p className="text-xs text-muted-foreground">
                          Supported formats: PDF, DOC, DOCX, PPT, PPTX (Max 50MB)
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cover">Cover Image (Optional)</Label>
                        <Input id="cover" type="file" accept="image/*" />
                        <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isUploading}>
                        {isUploading ? "Uploading..." : "Upload Book"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for books, notes, etc."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={handleSearch}>
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="all">All Books</TabsTrigger>
              <TabsTrigger value="free">Free Books</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBooks.map((book, index) => (
                    <BookCard key={book.id} book={book} index={index} onAddToCart={handleAddToCart} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No books found</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-4">
                    {searchQuery
                      ? `No books matching "${searchQuery}" were found. Try a different search term.`
                      : "No books available in this category. Be the first to upload one!"}
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload a Book
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="free" className="space-y-4">
              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBooks.map((book, index) => (
                    <BookCard key={book.id} book={book} index={index} onAddToCart={handleAddToCart} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No free books found</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-4">
                    {searchQuery
                      ? `No free books matching "${searchQuery}" were found. Try a different search term.`
                      : "No free books available in this category. Be the first to share one!"}
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Share a Free Book
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Selling Tips</CardTitle>
              <CardDescription>How to make the most of the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Quality Content</p>
                    <p className="text-sm text-muted-foreground">
                      Ensure your materials are well-organized, error-free, and provide real value to buyers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Detailed Descriptions</p>
                    <p className="text-sm text-muted-foreground">
                      Include course code, professor name, and semester for academic materials.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Star className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Fair Pricing</p>
                    <p className="text-sm text-muted-foreground">
                      Set reasonable prices based on content quality and original cost.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function BookCard({
  book,
  index,
  onAddToCart,
}: {
  book: Book
  index: number
  onAddToCart: (bookId: string) => Promise<void>
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <div className="rounded-full w-8 h-8 flex items-center justify-center bg-primary/10">
                {book.isFree ? <Download className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
              </div>
              <div>
                <CardTitle className="text-base">{book.title}</CardTitle>
                <div className="text-xs text-muted-foreground mt-1">by {book.author}</div>
              </div>
            </div>
            <Badge variant={book.isFree ? "secondary" : "outline"}>{book.isFree ? "Free" : `₹${book.price}`}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="aspect-[3/4] w-full bg-muted rounded-md mb-3 overflow-hidden">
            <img
              src={book.coverImage || "/placeholder.svg?height=400&width=300"}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">{book.description}</p>
          <div className="flex items-center mt-2">
            <Badge variant="outline" className="mr-2">
              {book.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{new Date(book.createdAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          {book.isFree ? (
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          ) : (
            <Button size="sm" onClick={() => onAddToCart(book.id)}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
