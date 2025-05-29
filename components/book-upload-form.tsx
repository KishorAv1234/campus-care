"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UploadIcon } from 'lucide-react';

export function BookUploadForm() {
  const [isFree, setIsFree] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfPreview(file.name);
    }
  };

  return (
    <div className="bg-muted/50 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Upload a Book</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Book Title</Label>
              <Input id="title" placeholder="Enter book title" />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input id="author" placeholder="Enter author name" />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">
                    Computer Science
                  </SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter book description"
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="free"
                checked={isFree}
                onCheckedChange={setIsFree}
              />
              <Label htmlFor="free">Make this book free</Label>
            </div>
            {!isFree && (
              <div>
                <Label htmlFor="price">Price (Rs.)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  min="0"
                />
              </div>
            )}
          </div>
          <div className="space-y-6">
            <div>
              <Label className="block mb-2">Cover Image</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {coverPreview ? (
                  <div className="relative aspect-[3/4] max-w-[200px] mx-auto">
                    <img
                      src={coverPreview || "/placeholder.svg"}
                      alt="Cover preview"
                      className="object-cover w-full h-full"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0"
                      onClick={() => setCoverPreview(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or JPEG (max 5MB)
                    </p>
                    <Input
                      id="cover"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCoverChange}
                    />
                    <Button
                      variant="ghost"
                      className="mt-2"
                      onClick={() =>
                        document.getElementById("cover")?.click()
                      }
                    >
                      Select File
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label className="block mb-2">PDF File</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {pdfPreview ? (
                  <div className="text-center">
                    <p className="font-medium">{pdfPreview}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={() => setPdfPreview(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF file (max 50MB)
                    </p>
                    <Input
                      id="pdf"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handlePdfChange}
                    />
                    <Button
                      variant="ghost"
                      className="mt-2"
                      onClick={() => document.getElementById("pdf")?.click()}
                    >
                      Select File
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Upload Book</Button>
        </div>
      </form>
    </div>
  );
}
