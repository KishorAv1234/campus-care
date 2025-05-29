"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function SearchFilterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Literature",
    "Economics",
    "Psychology",
  ];

  const formats = ["Paperback", "Hardcover", "E-Book", "PDF"];

  useEffect(() => {
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice && maxPrice) {
      setPriceRange([parseInt(minPrice), parseInt(maxPrice)]);
    }
  }, [searchParams]);

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePriceChange = (newRange: number[]) => {
    setPriceRange(newRange);
    updateSearchParams('minPrice', newRange[0].toString());
    updateSearchParams('maxPrice', newRange[1].toString());
  };

  return (
    <div className="bg-muted/50 p-4 rounded-lg space-y-6">
      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <Slider
          defaultValue={[0, 1000]}
          max={2000}
          step={50}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm">
          <span>Rs. {priceRange[0]}</span>
          <span>Rs. {priceRange[1]}</span>
        </div>
      </div>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`}
                    checked={searchParams.get('category') === category}
                    onCheckedChange={(checked) => {
                      updateSearchParams('category', checked ? category : '');
                    }}
                  />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="format">
          <AccordionTrigger>Format</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {formats.map((format) => (
                <div key={format} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`format-${format}`}
                    checked={searchParams.get('format') === format}
                    onCheckedChange={(checked) => {
                      updateSearchParams('format', checked ? format : '');
                    }}
                  />
                  <Label htmlFor={`format-${format}`}>{format}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="free-books"
                  checked={searchParams.get('free') === 'true'}
                  onCheckedChange={(checked) => {
                    updateSearchParams('free', checked ? 'true' : '');
                  }}
                />
                <Label htmlFor="free-books">Free Books Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="in-stock"
                  checked={searchParams.get('inStock') === 'true'}
                  onCheckedChange={(checked) => {
                    updateSearchParams('inStock', checked ? 'true' : '');
                  }}
                />
                <Label htmlFor="in-stock">In Stock</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`rating-${rating}`}
                    checked={searchParams.get('rating') === rating.toString()}
                    onCheckedChange={(checked) => {
                      updateSearchParams('rating', checked ? rating.toString() : '');
                    }}
                  />
                  <Label htmlFor={`rating-${rating}`}>
                    {rating}+ Stars & Above
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function SearchFilter() {
  return <SearchFilterContent />;
}
