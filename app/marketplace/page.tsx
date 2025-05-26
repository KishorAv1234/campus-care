"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, FileText, Star, Upload, Download, ShoppingCart, BookMarked } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { SearchFilter } from "@/components/search-filter"
import { getAllBooks, getFreeBooks, getBooksByCategory, searchBooks, uploadBook, addToCart } from "@/app/actions/books"
import Link from "next/link"

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
  const [isLoading, setIsLoading] = useState(true)

  // Form states
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [isFree, setIsFree] = useState(false)

  // Add these state variables at the top of the component
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedCover, setSelectedCover] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string>("")
  const [coverPreview, setCoverPreview] = useState<string>("")

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true)
      try {
        const allBooks = await getAllBooks()
        setBooks(allBooks)
        setFilteredBooks(allBooks)
      } catch (error) {
        console.error("Error fetching books:", error)
        toast({
          title: "Error",
          description: "Failed to load books. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [toast])

  // Handle search
  const handleSearch = async (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
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

    setIsLoading(true)
    try {
      const results = await searchBooks(query)
      setFilteredBooks(results)
    } catch (error) {
      console.error("Error searching books:", error)
      toast({
        title: "Error",
        description: "Failed to search books. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle filter
  const handleFilter = async (filters: any) => {
    setIsLoading(true)
    try {
      let filtered = [...books]

      // Filter by price range
      if (filters.priceRange) {
        filtered = filtered.filter((book) => book.price >= filters.priceRange[0] && book.price <= filters.priceRange[1])
      }

      // Filter by categories
      if (filters.categories && filters.categories.length > 0) {
        filtered = filtered.filter((book) => filters.categories.includes(book.category))
      }

      // Filter free only
      if (filters.freeOnly) {
        filtered = filtered.filter((book) => book.isFree)
      }

      // Sort
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "price-low":
            filtered.sort((a, b) => a.price - b.price)
            break
          case "price-high":
            filtered.sort((a, b) => b.price - a.price)
            break
          case "newest":
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            break
          // Add more sorting options as needed
        }
      }

      setFilteredBooks(filtered)

      toast({
        title: "Filters Applied",
        description: `Showing ${filtered.length} results`,
      })
    } catch (error) {
      console.error("Error applying filters:", error)
      toast({
        title: "Error",
        description: "Failed to apply filters. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle category change
  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category)
    setIsLoading(true)

    try {
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
    } catch (error) {
      console.error("Error changing category:", error)
      toast({
        title: "Error",
        description: "Failed to filter by category. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle tab change
  const handleTabChange = async (tab: string) => {
    setActiveTab(tab)
    setIsLoading(true)

    try {
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
    } catch (error) {
      console.error("Error changing tab:", error)
      toast({
        title: "Error",
        description: "Failed to filter books. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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

      // Get file inputs
      const fileInput = document.getElementById("file") as HTMLInputElement
      const coverInput = document.getElementById("cover") as HTMLInputElement

      if (fileInput?.files?.[0]) {
        formData.append("file", fileInput.files[0])
      } else {
        toast({
          title: "Error",
          description: "Please select a file to upload",
          variant: "destructive",
        })
        setIsUploading(false)
        return
      }

      if (coverInput?.files?.[0]) {
        formData.append("cover", coverInput.files[0])
      }

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
        resetForm()
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

    try {
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
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Add these handler functions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setFilePreview(file.name)
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedCover(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Update the resetForm function to include file resets
  const resetForm = () => {
    setTitle("")
    setAuthor("")
    setDescription("")
    setPrice("")
    setCategory("")
    setIsFree(false)
    setSelectedFile(null)
    setSelectedCover(null)
    setFilePreview("")
    setCoverPreview("")

    // Reset file inputs
    const fileInput = document.getElementById("file") as HTMLInputElement
    const coverInput = document.getElementById("cover") as HTMLInputElement
    if (fileInput) fileInput.value = ""
    if (coverInput) coverInput.value = ""
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 md:gap-8"
        >
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
                        <Label htmlFor="file">Upload File *</Label>
                        <Input
                          id="file"
                          type="file"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          required
                          onChange={handleFileChange}
                        />
                        {selectedFile && (
                          <div className="text-sm text-green-600 flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Supported formats: PDF, DOC, DOCX, PPT, PPTX (Max 50MB)
                        </p>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="cover">Cover Image (Optional)</Label>
                        <Input id="cover" type="file" accept="image/*" onChange={handleCoverChange} />
                        {coverPreview && (
                          <div className="mt-2">
                            <img
                              src={coverPreview || "/placeholder.svg"}
                              alt="Cover preview"
                              className="w-20 h-24 object-cover rounded border"
                            />
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isUploading}>
                        {isUploading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Uploading...
                          </div>
                        ) : (
                          "Upload Book"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <SearchFilter onSearch={handleSearch} onFilter={handleFilter} categories={categories} />

          <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="all">All Books</TabsTrigger>
              <TabsTrigger value="free">Free Books</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="aspect-[3/4] w-full">
                        <Skeleton className="h-full w-full" />
                      </div>
                      <CardContent className="p-4">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2 mb-4" />
                        <Skeleton className="h-3 w-full mb-2" />
                        <Skeleton className="h-3 w-full mb-2" />
                        <Skeleton className="h-3 w-2/3" />
                      </CardContent>
                      <CardFooter className="flex justify-between p-4">
                        <Skeleton className="h-9 w-20" />
                        <Skeleton className="h-9 w-24" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {filteredBooks.map((book, index) => (
                      <BookCard key={book.id} book={book} index={index} onAddToCart={handleAddToCart} />
                    ))}
                  </AnimatePresence>
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
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="aspect-[3/4] w-full">
                        <Skeleton className="h-full w-full" />
                      </div>
                      <CardContent className="p-4">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2 mb-4" />
                        <Skeleton className="h-3 w-full mb-2" />
                        <Skeleton className="h-3 w-full mb-2" />
                        <Skeleton className="h-3 w-2/3" />
                      </CardContent>
                      <CardFooter className="flex justify-between p-4">
                        <Skeleton className="h-9 w-20" />
                        <Skeleton className="h-9 w-24" />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {filteredBooks.map((book, index) => (
                      <BookCard key={book.id} book={book} index={index} onAddToCart={handleAddToCart} />
                    ))}
                  </AnimatePresence>
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
        </motion.div>
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
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link href={`/marketplace/${book.id}`} className="h-full block">
        <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="relative">
            <div className="aspect-[3/4] w-full bg-muted overflow-hidden">
              <img
                src={book.coverImage || "/placeholder.svg?height=400&width=300"}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <Badge variant={book.isFree ? "secondary" : "outline"} className="absolute top-2 right-2">
              {book.isFree ? "Free" : `₹${book.price}`}
            </Badge>
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-base line-clamp-1">{book.title}</CardTitle>
                <div className="text-xs text-muted-foreground mt-1">by {book.author}</div>
              </div>
              <div className="rounded-full w-8 h-8 flex items-center justify-center bg-primary/10">
                {book.isFree ? <Download className="h-4 w-4" /> : <BookMarked className="h-4 w-4" />}
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground line-clamp-3">{book.description}</p>
            <div className="flex items-center mt-2">
              <Badge variant="outline" className="mr-2">
                {book.category}
              </Badge>
              <span className="text-xs text-muted-foreground">{new Date(book.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <span>View Details</span>
            </Button>
            {book.isFree ? (
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onAddToCart(book.id)
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            )}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
