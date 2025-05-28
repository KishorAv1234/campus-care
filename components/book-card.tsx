import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StarIcon } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  category: string;
  rating: number;
  isFree: boolean;
}

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/marketplace/${book.id}`}>
        <div className="aspect-[3/4] relative">
          <img
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            className="object-cover w-full h-full"
          />
          {book.isFree && (
            <Badge className="absolute top-2 right-2 bg-green-600">Free</Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/marketplace/${book.id}`}>
          <h3 className="font-semibold text-lg line-clamp-1 hover:underline">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(book.rating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs ml-1 text-muted-foreground">
            {book.rating}
          </span>
        </div>
        <div className="mt-2">
          <Badge variant="outline">{book.category}</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="font-bold">
          {book.isFree ? "Free" : `Rs. ${book.price}`}
        </div>
        <Button size="sm">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
