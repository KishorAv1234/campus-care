"use server"

// Mock data storage (in a real app, this would be a database)
const books: any[] = []
const carts: any[] = []
const orders: any[] = []

export async function getAllBooks() {
  // Return mock books data
  return [
    {
      id: "1",
      title: "Introduction to Computer Science",
      author: "John Smith",
      description:
        "A comprehensive guide to computer science fundamentals covering algorithms, data structures, and programming concepts.",
      price: 299,
      coverImage: "/placeholder.svg?height=400&width=300",
      fileUrl: "/uploads/books/intro-cs.pdf",
      uploadedBy: "user1",
      isFree: false,
      category: "Computer Science",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "Advanced Mathematics",
      author: "Jane Doe",
      description:
        "Advanced mathematical concepts for engineering students including calculus, linear algebra, and differential equations.",
      price: 0,
      coverImage: "/placeholder.svg?height=400&width=300",
      fileUrl: "/uploads/books/advanced-math.pdf",
      uploadedBy: "user2",
      isFree: true,
      category: "Mathematics",
      createdAt: new Date("2024-01-20"),
    },
    {
      id: "3",
      title: "Physics notes for cse stream",
      author: "DR.VINAYAK HEGDE",
      description:
        "Complete physics laboratory manual with experiments and theoretical background for undergraduate students.",
      price: 0,
      coverImage: "C:\Users\kisha\Desktop\1676968476phpiYsWjU.jpeg height=400&width=300",
      fileUrl: "C:\Users\kisha\Desktop\Notes all.pdf",
      uploadedBy: "user3",
      isFree: true,
      category: "Physics",
      createdAt: new Date("2024-01-25"),
    },
  ]
}

export async function getFreeBooks() {
  const allBooks = await getAllBooks()
  return allBooks.filter((book) => book.isFree)
}

export async function getBooksByCategory(category: string) {
  const allBooks = await getAllBooks()
  return allBooks.filter((book) => book.category === category)
}

export async function searchBooks(query: string) {
  const allBooks = await getAllBooks()
  const lowercaseQuery = query.toLowerCase()

  return allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.description.toLowerCase().includes(lowercaseQuery) ||
      book.category.toLowerCase().includes(lowercaseQuery),
  )
}

export async function getBookById(id: string) {
  const allBooks = await getAllBooks()
  return allBooks.find((book) => book.id === id)
}

export async function addToCart(bookId: string) {
  try {
    const book = await getBookById(bookId)

    if (!book) {
      return { error: "Book not found" }
    }

    if (book.isFree) {
      return { error: "Free books cannot be added to cart" }
    }

    // Find or create user cart
    let userCart = carts.find((cart) => cart.userId === "current-user")

    if (!userCart) {
      userCart = {
        id: Date.now().toString(),
        userId: "current-user",
        items: [],
        total: 0,
      }
      carts.push(userCart)
    }

    // Check if item already exists in cart
    const existingItem = userCart.items.find((item: any) => item.bookId === bookId)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      userCart.items.push({
        id: Date.now().toString(),
        bookId: book.id,
        title: book.title,
        price: book.price,
        quantity: 1,
      })
    }

    // Recalculate total
    userCart.total = userCart.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

    return { success: true, cart: userCart }
  } catch (error) {
    console.error("Add to cart error:", error)
    return { error: "Failed to add item to cart" }
  }
}

export async function getUserCart() {
  let userCart = carts.find((cart) => cart.userId === "current-user")

  if (!userCart) {
    userCart = {
      id: Date.now().toString(),
      userId: "current-user",
      items: [],
      total: 0,
    }
    carts.push(userCart)
  }

  return userCart
}

export async function removeFromCart(itemId: string) {
  try {
    const userCart = await getUserCart()

    userCart.items = userCart.items.filter((item: any) => item.id !== itemId)

    // Recalculate total
    userCart.total = userCart.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

    return { success: true, cart: userCart }
  } catch (error) {
    console.error("Remove from cart error:", error)
    return { error: "Failed to remove item from cart" }
  }
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  try {
    if (quantity < 1) {
      return await removeFromCart(itemId)
    }

    const userCart = await getUserCart()
    const item = userCart.items.find((item: any) => item.id === itemId)

    if (!item) {
      return { error: "Item not found in cart" }
    }

    item.quantity = quantity

    // Recalculate total
    userCart.total = userCart.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

    return { success: true, cart: userCart }
  } catch (error) {
    console.error("Update quantity error:", error)
    return { error: "Failed to update item quantity" }
  }
}

export async function createOrder(paymentMethod: string) {
  try {
    const userCart = await getUserCart()

    if (!userCart.items.length) {
      return { error: "Cart is empty" }
    }

    const order = {
      id: Date.now().toString(),
      userId: "current-user",
      items: [...userCart.items],
      total: userCart.total,
      paymentMethod,
      status: "completed",
      createdAt: new Date(),
    }

    orders.push(order)

    // Clear cart
    userCart.items = []
    userCart.total = 0

    return { success: true, order }
  } catch (error) {
    console.error("Create order error:", error)
    return { error: "Failed to create order" }
  }
}

export async function getUserOrders() {
  try {
    // Get orders for current user
    const userOrders = orders.filter((order) => order.userId === "current-user")

    // Sort by creation date (newest first)
    userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return userOrders
  } catch (error) {
    console.error("Get user orders error:", error)
    return []
  }
}

export async function uploadBook(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const author = formData.get("author") as string
    const description = formData.get("description") as string
    const price = formData.get("price") as string
    const category = formData.get("category") as string
    const isFree = formData.get("isFree") === "true"
    const file = formData.get("file") as File
    const cover = formData.get("cover") as File

    // Validate required fields
    if (!title || !author || !description || !category || !file) {
      return { error: "Missing required fields" }
    }

    // Validate file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      return { error: "File size must be less than 50MB" }
    }

    // Validate cover image size (5MB limit)
    if (cover && cover.size > 5 * 1024 * 1024) {
      return { error: "Cover image must be less than 5MB" }
    }

    // In a real app, you would upload files to a storage service like AWS S3, Cloudinary, etc.
    // For now, we'll simulate the upload and create URLs
    const fileUrl = `/uploads/books/${Date.now()}-${file.name}`
    const coverUrl = cover ? `/uploads/covers/${Date.now()}-${cover.name}` : undefined

    // Create the book object
    const book = {
      id: Date.now().toString(),
      title,
      author,
      description,
      price: isFree ? 0 : Number.parseFloat(price),
      coverImage: coverUrl,
      fileUrl,
      uploadedBy: "current-user", // In real app, get from session
      isFree,
      category,
      createdAt: new Date(),
    }

    // Add to books array
    books.push(book)

    return { success: true, book }
  } catch (error) {
    console.error("Upload error:", error)
    return { error: "Failed to upload book" }
  }
}
