"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/contexts/user-context"
import { getBookById, addToCart } from "@/app/actions/books"
import { BookOpen, Download, ShoppingCart, Heart, Share2, ArrowLeft, Star, Eye, BookMarked } from "lucide-react"

export default function BookDetails() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useUser()
  const [book, setBook] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchBook = async () => {
      if (params.bookId) {
        try {
          const bookData = await getBookById(params.bookId as string)
          if (bookData) {
            setBook(bookData)
          } else {
            toast({
              title: "Error",
              description: "Book not found",
              variant: "destructive",
            })
            router.push("/marketplace")
          }
        } catch (error) {
          console.error("Error fetching book:", error)
          toast({
            title: "Error",
            description: "Failed to load book details",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchBook()
  }, [params.bookId, router, toast])

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      })
      return
    }

    setIsAddingToCart(true)
    try {
      const result = await addToCart(book.id)
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Book added to cart!",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add book to cart",
        variant: "destructive",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Book removed from your favorites" : "Book added to your favorites",
    })
  }

  const shareBook = () => {
    if (navigator.share) {
      navigator
        .share({
          title: book?.title,
          text: `Check out this book: ${book?.title} by ${book?.author}`,
          url: window.location.href,
        })
        .then(() => {
          toast({
            title: "Shared",
            description: "Book shared successfully!",
          })
        })
        .catch((error) => {
          console.error("Error sharing:", error)
        })
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Book link copied to clipboard!",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container py-6 pt-20">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Skeleton className="h-8 w-64" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Skeleton className="aspect-[3/4] w-full rounded-lg" />
            </div>
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex space-x-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container py-6 pt-20 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Book Not Found</h2>
            <p className="text-muted-foreground mb-6">The book you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => router.push("/marketplace")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6 pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">{book.title}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-24"
              >
                <div className="aspect-[3/4] w-full bg-muted rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={book.coverImage || "/placeholder.svg?height=600&width=400"}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" size="sm" onClick={toggleFavorite}>
                    <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                    {isFavorite ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={shareBook}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>

                {!book.isFree && (
                  <Card className="mt-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">₹{book.price}</CardTitle>
                      <CardDescription>{book.isFree ? "Free Download" : "One-time purchase"}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-col space-y-2">
                      {book.isFree ? (
                        <Button className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download Now
                        </Button>
                      ) : (
                        <>
                          <Button className="w-full" onClick={handleAddToCart} disabled={isAddingToCart}>
                            {isAddingToCart ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Adding...
                              </div>
                            ) : (
                              <>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add to Cart
                              </>
                            )}
                          </Button>
                          <Button variant="outline" className="w-full" onClick={() => setIsPreviewOpen(true)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </Button>
                        </>
                      )}
                    </CardFooter>
                  </Card>
                )}
              </motion.div>
            </div>

            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{book.category}</Badge>
                  {book.isFree && <Badge>Free</Badge>}
                  <Badge variant="outline" className="bg-primary/10">
                    <BookMarked className="h-3 w-3 mr-1" />
                    {book.isFree ? "Study Material" : "Textbook"}
                  </Badge>
                </div>

                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
                  <p className="text-muted-foreground">by {book.author}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= 4 ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm ml-2">4.0 (12 reviews)</span>
                  </div>
                </div>

                <Tabs defaultValue="details" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="author">Author</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground">{book.description}</p>

                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">Publication Date</h4>
                          <p className="text-muted-foreground">
                            {new Date(book.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Language</h4>
                          <p className="text-muted-foreground">English</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Pages</h4>
                          <p className="text-muted-foreground">320</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Format</h4>
                          <p className="text-muted-foreground">PDF</p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mt-8 mb-2">Table of Contents</h3>
                      <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                        <li>Introduction</li>
                        <li>Chapter 1: Fundamentals</li>
                        <li>Chapter 2: Core Concepts</li>
                        <li>Chapter 3: Advanced Topics</li>
                        <li>Chapter 4: Practical Applications</li>
                        <li>Chapter 5: Case Studies</li>
                        <li>Conclusion</li>
                        <li>References</li>
                      </ol>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-4 mt-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Reviews (12)</h3>
                      <Button size="sm">Write a Review</Button>
                    </div>

                    <div className="space-y-4">
                      {[1, 2, 3].map((review) => (
                        <Card key={review}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <div>
                                <CardTitle className="text-base">Great resource for students</CardTitle>
                                <div className="flex mt-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-3 w-3 ${
                                        star <= 4 ? "fill-yellow-500 text-yellow-500" : "text-muted"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <CardDescription>
                                {new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString()}
                              </CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              This book has been incredibly helpful for my studies. The content is well-organized and
                              easy to understand. Highly recommended for anyone studying this subject.
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex justify-center mt-4">
                      <Button variant="outline">Load More Reviews</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="author" className="space-y-4 mt-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-16 w-16 rounded-full bg-muted overflow-hidden">
                        <img
                          src="/placeholder.svg?height=64&width=64"
                          alt={book.author}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{book.author}</h3>
                        <p className="text-muted-foreground">Professor at Delhi University</p>
                      </div>
                    </div>

                    <div className="prose max-w-none">
                      <p className="text-muted-foreground">
                        {book.author} is a renowned expert in the field of {book.category} with over 15 years of
                        teaching experience. They have published numerous books and research papers on the subject and
                        are highly respected in academic circles.
                      </p>
                      <p className="text-muted-foreground mt-4">
                        Their teaching philosophy focuses on making complex concepts accessible to students of all
                        levels, which is reflected in their clear and concise writing style.
                      </p>
                    </div>

                    <h4 className="font-semibold mt-6">Other Books by {book.author}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((otherBook) => (
                        <div key={otherBook} className="flex items-center space-x-2">
                          <div className="h-12 w-8 bg-muted rounded">
                            <BookOpen className="h-8 w-8 p-1" />
                          </div>
                          <div className="text-sm">
                            <p className="font-medium">Advanced {book.category}</p>
                            <p className="text-xs text-muted-foreground">₹{299 + otherBook * 50}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {book.isFree && (
                  <div className="mt-8">
                    <Button size="lg" className="w-full md:w-auto">
                      <Download className="mr-2 h-5 w-5" />
                      Download Now
                    </Button>
                  </div>
                )}

                {/* Related Books Section */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-4">Related Books</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((relatedBook) => (
                      <Card key={relatedBook} className="overflow-hidden">
                        <div className="aspect-[3/4] w-full bg-muted">
                          <img
                            src={`/placeholder.svg?height=300&width=200&text=Book+${relatedBook}`}
                            alt={`Related Book ${relatedBook}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-3">
                          <h4 className="font-medium text-sm truncate">
                            {book.category} Fundamentals Vol. {relatedBook}
                          </h4>
                          <p className="text-xs text-muted-foreground">by Another Author</p>
                          <div className="flex justify-between items-center mt-2">
                            <Badge variant="outline" className="text-xs">
                              ₹{199 + relatedBook * 50}
                            </Badge>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Book Preview Modal */}
        {isPreviewOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-card rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold">Preview: {book.title}</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsPreviewOpen(false)}>
                  ✕
                </Button>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <div className="prose max-w-none">
                  <h1>{book.title}</h1>
                  <h2>by {book.author}</h2>
                  <p className="text-muted-foreground italic">This is a preview of the book.</p>

                  <h3>Chapter 1: Introduction</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam
                    ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget
                    aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                  </p>
                  <p>
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>

                  <div className="my-4 p-4 bg-muted rounded-md text-center">
                    <p className="font-medium">Preview ends here</p>
                    <p className="text-sm text-muted-foreground">Purchase the book to continue reading</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t flex justify-between">
                <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                  Close Preview
                </Button>
                <Button onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
