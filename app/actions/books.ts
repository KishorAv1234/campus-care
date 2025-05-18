"use server"

import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function getAllBooks() {
  try {
    return db.getAllBooks()
  } catch (error) {
    console.error("Get all books error:", error)
    return []
  }
}

export async function getFreeBooks() {
  try {
    return db.getFreeBooks()
  } catch (error) {
    console.error("Get free books error:", error)
    return []
  }
}

export async function getBooksByCategory(category: string) {
  try {
    return db.getBooksByCategory(category)
  } catch (error) {
    console.error("Get books by category error:", error)
    return []
  }
}

export async function searchBooks(query: string) {
  try {
    return db.searchBooks(query)
  } catch (error) {
    console.error("Search books error:", error)
    return []
  }
}

export async function getBookById(id: string) {
  try {
    return db.getBookById(id)
  } catch (error) {
    console.error("Get book by ID error:", error)
    return null
  }
}

export async function uploadBook(formData: FormData) {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      return { error: "You must be logged in to upload a book" }
    }

    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const description = formData.get("description") as string
    const priceString = formData.get("price") as string
    const category = formData.get("category") as string
    const isFreeString = formData.get("isFree") as string

    if (!title || !author || !description || !category) {
      return { error: "Title, author, description, and category are required" }
    }

    const isFree = isFreeString === "true"
    const price = isFree ? 0 : Number.parseInt(priceString, 10) || 0

    if (!isFree && price <= 0) {
      return { error: "Price must be greater than 0 for paid books" }
    }

    // In a real app, you would handle file uploads here
    const coverImage = "/placeholder.svg?height=400&width=300"

    const book = db.createBook({
      title,
      author,
      description,
      price,
      coverImage,
      uploadedBy: userId,
      isFree,
      category,
    })

    revalidatePath("/marketplace")
    return { success: true, book }
  } catch (error) {
    console.error("Upload book error:", error)
    return { error: "Failed to upload book. Please try again." }
  }
}

export async function addToCart(bookId: string) {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      return { error: "You must be logged in to add items to cart" }
    }

    const book = db.getBookById(bookId)
    if (!book) {
      return { error: "Book not found" }
    }

    if (book.isFree) {
      return { error: "Free books cannot be added to cart" }
    }

    const cart = db.addToCart(userId, bookId)
    revalidatePath("/cart")
    return { success: true, cart }
  } catch (error) {
    console.error("Add to cart error:", error)
    return { error: "Failed to add to cart. Please try again." }
  }
}

export async function getUserCart() {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      return null
    }

    return db.getUserCart(userId)
  } catch (error) {
    console.error("Get user cart error:", error)
    return null
  }
}

export async function removeFromCart(itemId: string) {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      return { error: "You must be logged in" }
    }

    const cart = db.removeFromCart(userId, itemId)
    revalidatePath("/cart")
    return { success: true, cart }
  } catch (error) {
    console.error("Remove from cart error:", error)
    return { error: "Failed to remove item from cart. Please try again." }
  }
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      return { error: "You must be logged in" }
    }

    if (quantity <= 0) {
      return removeFromCart(itemId)
    }

    const cart = db.updateCartItemQuantity(userId, itemId, quantity)
    revalidatePath("/cart")
    return { success: true, cart }
  } catch (error) {
    console.error("Update cart item quantity error:", error)
    return { error: "Failed to update quantity. Please try again." }
  }
}

export async function createOrder(paymentMethod: string) {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      return { error: "You must be logged in to place an order" }
    }

    const cart = db.getUserCart(userId)
    if (!cart || cart.items.length === 0) {
      return { error: "Your cart is empty" }
    }

    const order = db.createOrder(userId, paymentMethod)
    revalidatePath("/cart")
    revalidatePath("/orders")
    return { success: true, order }
  } catch (error) {
    console.error("Create order error:", error)
    return { error: "Failed to create order. Please try again." }
  }
}

export async function getUserOrders() {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      return []
    }

    return db.getUserOrders(userId)
  } catch (error) {
    console.error("Get user orders error:", error)
    return []
  }
}
