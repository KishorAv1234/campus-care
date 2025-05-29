"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteFooter } from "@/components/site-footer";
import { StarIcon, Share2Icon, BookmarkIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Sample book data with proper string formatting
const book = {
  id: "1",
  title: "Introduction to Computer Science",
  author: "John Smith",
  price: 499,
  coverImage: "/placeholder.svg?height=600&width=400",
  category: "Computer Science",
  rating: 4.5,
  description:
    "A comprehensive introduction to the field of computer science, covering algorithms, data structures, and programming fundamentals.",
  pages: 450,
  language: "English",
  publisher: "Tech Publications",
  publishDate: "2022-05-15",
  isbn: "978-1234567890",
  reviews: [
    {
      id: "r1",
      user: "Alice Johnson",
      rating: 5,
      comment:
        "Excellent book for beginners. The concepts are explained in a very clear manner.",
      date: "2023-01-15",
    },
    {
      id: "r2",
      user: "Bob Smith",
      rating: 4,
      comment:
        "Good content but some chapters could be more detailed. Overall a good resource.",
      date: "2023-02-20",
    },
  ],
  previewPages: [
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
    "/placeholder.svg?height=800&width=600",
  ],
};

export default function BookDetailPage({
  params,
}: {
  params: { bookId: string };
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            <div>
              <div className="aspect-[3/4] relative">
                <img
                  src={book.coverImage || "/placeholder.svg"}
                  alt={book.title}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <div className="mt-4 space-y-3">
                <Button className="w-full">Add to Cart</Button>
                <Button variant="outline" className="w-full">
                  Buy Now
                </Button>
                <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="w-full">
                      Preview Book
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl h-[80vh]">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Book Preview</h2>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPreviewOpen(false)}
                        >
                          Close
                        </Button>
                      </div>
                      <div className="flex-1 overflow-auto">
                        <img
                          src={book.previewPages[currentPage] || "/placeholder.svg"}
                          alt={`Preview page ${currentPage + 1}`}
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <Button
                          variant="outline"
                          disabled={currentPage === 0}
                          onClick={() => setCurrentPage(currentPage - 1)}
                        >
                          Previous
                        </Button>
                        <span>
                          Page {currentPage + 1} of {book.previewPages.length}
                        </span>
                        <Button
                          variant="outline"
                          disabled={
                            currentPage === book.previewPages.length - 1
                          }
                          onClick={() => setCurrentPage(currentPage + 1)}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">{book.title}</h1>
                  <p className="text-lg text-muted-foreground">
                    by {book.author}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button size="icon" variant="ghost">
                    <Share2Icon className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <BookmarkIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(book.rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-muted-foreground">
                  {book.rating} ({book.reviews.length} reviews)
                </span>
              </div>

              <div className="mt-4">
                <Badge variant="outline">{book.category}</Badge>
              </div>

              <div className="mt-6">
                <p className="text-2xl font-bold">Rs. {book.price}</p>
              </div>

              <Tabs defaultValue="description" className="mt-8">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <p>{book.description}</p>
                </TabsContent>
                <TabsContent value="details" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium">Pages</h3>
                      <p className="text-muted-foreground">{book.pages}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Language</h3>
                      <p className="text-muted-foreground">{book.language}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Publisher</h3>
                      <p className="text-muted-foreground">{book.publisher}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Publish Date</h3>
                      <p className="text-muted-foreground">
                        {new Date(book.publishDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">ISBN</h3>
                      <p className="text-muted-foreground">{book.isbn}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                  <div className="space-y-6">
                    {book.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{review.user}</h3>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                        <p className="mt-2">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
