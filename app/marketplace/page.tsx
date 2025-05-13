import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingBag, Search, BookOpen, FileText, BookMarked, Star, Filter } from "lucide-react"
import Link from "next/link"

export default function Marketplace() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">Campus Care</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
              <Link href="/diet" className="transition-colors hover:text-foreground/80">
                Diet
              </Link>
              <Link href="/marketplace" className="transition-colors hover:text-foreground/80 text-foreground">
                Marketplace
              </Link>
              <Link href="/learning" className="transition-colors hover:text-foreground/80">
                Learning
              </Link>
              <Link href="/tools" className="transition-colors hover:text-foreground/80">
                Tools
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" size="sm">
              <span className="sr-only">Profile</span>
              <span className="rounded-full bg-muted h-8 w-8 flex items-center justify-center">JS</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Student Marketplace</h1>
            <div className="flex items-center gap-2">
              <Button>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Sell Item
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search for notes, books, etc." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="notes">Notes</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="papers">Past Papers</SelectItem>
                  <SelectItem value="guides">Study Guides</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="papers">Papers</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MarketplaceItem
                  title="Calculus Complete Notes"
                  description="Handwritten notes covering the entire semester with examples and practice problems."
                  price="15.00"
                  seller="MathWhiz"
                  rating={4.8}
                  category="Notes"
                  icon={<FileText className="h-6 w-6" />}
                />
                <MarketplaceItem
                  title="Physics Textbook (2023)"
                  description="Like new condition, all chapters intact. Includes online access code (unused)."
                  price="45.00"
                  seller="PhysicsGuru"
                  rating={4.5}
                  category="Books"
                  icon={<BookOpen className="h-6 w-6" />}
                />
                <MarketplaceItem
                  title="Programming Cheat Sheets"
                  description="Quick reference guides for Python, Java, and C++. Perfect for exams."
                  price="8.00"
                  seller="CodeMaster"
                  rating={4.9}
                  category="Notes"
                  icon={<FileText className="h-6 w-6" />}
                />
                <MarketplaceItem
                  title="Chemistry Lab Reports"
                  description="Complete set of lab reports with detailed analysis and conclusions."
                  price="12.00"
                  seller="ChemStudent"
                  rating={4.2}
                  category="Notes"
                  icon={<FileText className="h-6 w-6" />}
                />
                <MarketplaceItem
                  title="Economics Past Exams"
                  description="Last 5 years of Economics exams with solutions and explanations."
                  price="10.00"
                  seller="EconPro"
                  rating={4.7}
                  category="Papers"
                  icon={<BookMarked className="h-6 w-6" />}
                />
                <MarketplaceItem
                  title="Literature Anthology"
                  description="Required reading for English Literature 101. Minimal highlighting."
                  price="20.00"
                  seller="BookLover"
                  rating={4.4}
                  category="Books"
                  icon={<BookOpen className="h-6 w-6" />}
                />
              </div>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MarketplaceItem
                  title="Calculus Complete Notes"
                  description="Handwritten notes covering the entire semester with examples and practice problems."
                  price="15.00"
                  seller="MathWhiz"
                  rating={4.8}
                  category="Notes"
                  icon={<FileText className="h-6 w-6" />}
                />
                <MarketplaceItem
                  title="Programming Cheat Sheets"
                  description="Quick reference guides for Python, Java, and C++. Perfect for exams."
                  price="8.00"
                  seller="CodeMaster"
                  rating={4.9}
                  category="Notes"
                  icon={<FileText className="h-6 w-6" />}
                />
                <MarketplaceItem
                  title="Chemistry Lab Reports"
                  description="Complete set of lab reports with detailed analysis and conclusions."
                  price="12.00"
                  seller="ChemStudent"
                  rating={4.2}
                  category="Notes"
                  icon={<FileText className="h-6 w-6" />}
                />
              </div>
            </TabsContent>

            <TabsContent value="books" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MarketplaceItem
                  title="Physics Textbook (2023)"
                  description="Like new condition, all chapters intact. Includes online access code (unused)."
                  price="45.00"
                  seller="PhysicsGuru"
                  rating={4.5}
                  category="Books"
                  icon={<BookOpen className="h-6 w-6" />}
                />
                <MarketplaceItem
                  title="Literature Anthology"
                  description="Required reading for English Literature 101. Minimal highlighting."
                  price="20.00"
                  seller="BookLover"
                  rating={4.4}
                  category="Books"
                  icon={<BookOpen className="h-6 w-6" />}
                />
              </div>
            </TabsContent>

            <TabsContent value="papers" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MarketplaceItem
                  title="Economics Past Exams"
                  description="Last 5 years of Economics exams with solutions and explanations."
                  price="10.00"
                  seller="EconPro"
                  rating={4.7}
                  category="Papers"
                  icon={<BookMarked className="h-6 w-6" />}
                />
              </div>
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
                    <p className="font-medium">Quality Photos</p>
                    <p className="text-sm text-muted-foreground">
                      Take clear photos of your items, especially for books and notes.
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
                      Set reasonable prices based on condition and original cost.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function MarketplaceItem({
  title,
  description,
  price,
  seller,
  rating,
  category,
  icon,
}: {
  title: string
  description: string
  price: string
  seller: string
  rating: number
  category: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="rounded-full w-8 h-8 flex items-center justify-center bg-primary/10">{icon}</div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <div className="flex items-center space-x-1 mt-1">
                <Star className="h-3 w-3 fill-current text-yellow-500" />
                <span className="text-xs">{rating}</span>
                <span className="text-xs text-muted-foreground">• {seller}</span>
              </div>
            </div>
          </div>
          <Badge variant="outline">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-2 font-bold text-lg">${price}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        <Button size="sm">Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}
