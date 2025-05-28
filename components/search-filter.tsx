"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Search, SlidersHorizontal } from "lucide-react"

interface SearchFilterProps {
  onSearch: (query: string) => void
  onFilter: (filters: any) => void
  categories: string[]
}

export function SearchFilter({ onSearch, onFilter, categories }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("relevance")
  const [freeOnly, setFreeOnly] = useState(false)

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  const handleFilter = () => {
    onFilter({
      priceRange,
      categories: selectedCategories,
      sortBy,
      freeOnly,
    })
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategories([])
    setSortBy("relevance")
    setFreeOnly(false)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
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
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Books</SheetTitle>
              <SheetDescription>Refine your search with these filters</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex items-center justify-between">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="free-only" checked={freeOnly} onCheckedChange={(checked) => setFreeOnly(!!checked)} />
                  <Label htmlFor="free-only">Show only free books</Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <Label htmlFor={`category-${category}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Format</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="format-pdf" />
                    <Label htmlFor="format-pdf">PDF</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="format-epub" />
                    <Label htmlFor="format-epub">EPUB</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="format-docx" />
                    <Label htmlFor="format-docx">DOCX</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="format-ppt" />
                    <Label htmlFor="format-ppt">PPT</Label>
                  </div>
                </div>
              </div>
            </div>
            <SheetFooter className="flex-row justify-between sm:justify-between">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
              <SheetClose asChild>
                <Button onClick={handleFilter}>Apply Filters</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Button onClick={handleSearch}>
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
