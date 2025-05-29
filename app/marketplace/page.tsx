import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookCard } from "@/components/book-card";
import { SearchFilter } from "@/components/search-filter";
import { SiteFooter } from "@/components/site-footer";
import { BookUploadForm } from "@/components/book-upload-form";
import { PaymentMethods } from "@/components/payment-methods";
import { Skeleton } from "@/components/ui/skeleton";

// Sample book data with proper string formatting
const books = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    author: "John Smith",
    price: 499,
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "Computer Science",
    rating: 4.5,
    isFree: false,
  },
  {
    id: "2",
    title: "Advanced Mathematics",
    author: "Jane Doe",
    price: 599,
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "Mathematics",
    rating: 4.2,
    isFree: false,
  },
  {
    id: "3",
    title: "Introduction to Physics",
    author: "Robert Johnson",
    price: 0,
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "Physics",
    rating: 4.8,
    isFree: true,
  },
  {
    id: "4",
    title: "Organic Chemistry",
    author: "Emily Williams",
    price: 649,
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "Chemistry",
    rating: 4.0,
    isFree: false,
  },
  {
    id: "5",
    title: "World History",
    author: "Michael Brown",
    price: 0,
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "History",
    rating: 4.6,
    isFree: true,
  },
  {
    id: "6",
    title: "English Literature",
    author: "Sarah Johnson",
    price: 549,
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "Literature",
    rating: 4.3,
    isFree: false,
  },
];

function MarketplaceContent() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">
            Browse and purchase books or upload your own
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input
            placeholder="Search books..."
            className="w-full md:w-[300px]"
          />
          <Button>Search</Button>
        </div>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="browse">Browse Books</TabsTrigger>
          <TabsTrigger value="upload">Upload Book</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>
        <TabsContent value="browse" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
            <Suspense fallback={<FilterSkeleton />}>
              <SearchFilter />
            </Suspense>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="upload">
          <BookUploadForm />
        </TabsContent>
        <TabsContent value="orders">
          <div className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            <div className="space-y-4">
              <div className="bg-background rounded-lg p-4 border">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Order #12345</h3>
                    <p className="text-sm text-muted-foreground">
                      2 books • May 15, 2023
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Rs. 1,048</p>
                    <p className="text-sm text-green-600">Delivered</p>
                  </div>
                </div>
              </div>
              <div className="bg-background rounded-lg p-4 border">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Order #12346</h3>
                    <p className="text-sm text-muted-foreground">
                      1 book • May 10, 2023
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Rs. 599</p>
                    <p className="text-sm text-amber-600">Processing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="payment">
          <PaymentMethods />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FilterSkeleton() {
  return (
    <div className="bg-muted/50 p-4 rounded-lg space-y-6">
      <div>
        <Skeleton className="h-5 w-24 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <Skeleton className="h-5 w-20 mb-2" />
            <div className="space-y-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Suspense fallback={<div>Loading marketplace...</div>}>
          <MarketplaceContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
