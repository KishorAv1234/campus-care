// Enhanced database with persistence and better error handling
import { v4 as uuidv4 } from "uuid"

export type User = {
  id: string
  name: string
  email: string
  password: string // In real app, this would be hashed
  profileImage?: string
  createdAt: Date
}

export type Event = {
  id: string
  userId: string
  title: string
  description: string
  date: Date
  location: string
  isCompleted: boolean
}

export type DietPlan = {
  id: string
  userId: string
  name: string
  breakfast: string
  lunch: string
  dinner: string
  snacks: string
  date: Date
}

export type Book = {
  id: string
  title: string
  author: string
  description: string
  price: number // In rupees
  coverImage?: string
  fileUrl?: string
  uploadedBy: string
  isFree: boolean
  category: string
  createdAt: Date
}

export type Note = {
  id: string
  userId: string
  title: string
  content: string
  subject: string
  createdAt: Date
}

export type CartItem = {
  id: string
  bookId: string
  title: string
  price: number
  quantity: number
}

export type Cart = {
  id: string
  userId: string
  items: CartItem[]
  total: number
}

export type Order = {
  id: string
  userId: string
  items: CartItem[]
  total: number
  paymentMethod: string
  status: "pending" | "completed" | "failed"
  createdAt: Date
}

// Simulate persistence with localStorage in browser and memory in server
class Database {
  users: User[] = []
  events: Event[] = []
  dietPlans: DietPlan[] = []
  books: Book[] = []
  notes: Note[] = []
  carts: Cart[] = []
  orders: Order[] = []

  constructor() {
    this.loadFromStorage()
    this.initializeSampleData()
  }

  // Load data from localStorage if available
  private loadFromStorage() {
    if (typeof window !== "undefined") {
      try {
        const data = localStorage.getItem("campusCareDB")
        if (data) {
          const parsedData = JSON.parse(data)
          this.users = parsedData.users || []
          this.events = parsedData.events || []
          this.dietPlans = parsedData.dietPlans || []
          this.books = parsedData.books || []
          this.notes = parsedData.notes || []
          this.carts = parsedData.carts || []
          this.orders = parsedData.orders || []

          // Convert string dates back to Date objects
          this.events = this.events.map((event) => ({
            ...event,
            date: new Date(event.date),
          }))
          this.dietPlans = this.dietPlans.map((plan) => ({
            ...plan,
            date: new Date(plan.date),
          }))
          this.books = this.books.map((book) => ({
            ...book,
            createdAt: new Date(book.createdAt),
          }))
          this.notes = this.notes.map((note) => ({
            ...note,
            createdAt: new Date(note.createdAt),
          }))
          this.orders = this.orders.map((order) => ({
            ...order,
            createdAt: new Date(order.createdAt),
          }))
          this.users = this.users.map((user) => ({
            ...user,
            createdAt: new Date(user.createdAt),
          }))
        }
      } catch (error) {
        console.error("Error loading data from storage:", error)
      }
    }
  }

  // Save data to localStorage
  private saveToStorage() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "campusCareDB",
          JSON.stringify({
            users: this.users,
            events: this.events,
            dietPlans: this.dietPlans,
            books: this.books,
            notes: this.notes,
            carts: this.carts,
            orders: this.orders,
          }),
        )
      } catch (error) {
        console.error("Error saving data to storage:", error)
      }
    }
  }

  // Initialize sample data if database is empty
  private initializeSampleData() {
    // Only add sample data if no books exist
    if (this.books.length === 0) {
      this.books = [
        {
          id: uuidv4(),
          title: "Introduction to Computer Science",
          author: "Dr. Rajesh Kumar",
          description: "A comprehensive introduction to computer science fundamentals.",
          price: 299, // ₹299
          coverImage: "/placeholder.svg?height=400&width=300",
          uploadedBy: "admin",
          isFree: false,
          category: "Computer Science",
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          title: "Fundamentals of Mathematics",
          author: "Prof. Sunita Sharma",
          description: "Essential mathematics concepts for undergraduate students.",
          price: 249, // ₹249
          coverImage: "/placeholder.svg?height=400&width=300",
          uploadedBy: "admin",
          isFree: false,
          category: "Mathematics",
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          title: "Basic Physics",
          author: "Dr. Amit Patel",
          description: "Learn the fundamentals of physics with practical examples.",
          price: 0, // Free
          coverImage: "/placeholder.svg?height=400&width=300",
          uploadedBy: "admin",
          isFree: true,
          category: "Physics",
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          title: "Organic Chemistry",
          author: "Dr. Priya Singh",
          description: "A detailed guide to organic chemistry reactions and mechanisms.",
          price: 349, // ₹349
          coverImage: "/placeholder.svg?height=400&width=300",
          uploadedBy: "admin",
          isFree: false,
          category: "Chemistry",
          createdAt: new Date(),
        },
        {
          id: uuidv4(),
          title: "Introduction to Economics",
          author: "Prof. Rahul Verma",
          description: "Basic principles of microeconomics and macroeconomics.",
          price: 0, // Free
          coverImage: "/placeholder.svg?height=400&width=300",
          uploadedBy: "admin",
          isFree: true,
          category: "Economics",
          createdAt: new Date(),
        },
      ]
      this.saveToStorage()
    }
  }

  // User methods
  findUserByEmail(email: string) {
    try {
      return this.users.find((user) => user.email === email)
    } catch (error) {
      console.error("Error finding user by email:", error)
      return null
    }
  }

  createUser(user: Omit<User, "id" | "createdAt">) {
    try {
      const newUser = {
        ...user,
        id: uuidv4(),
        createdAt: new Date(),
      }
      this.users.push(newUser)
      this.saveToStorage()
      return newUser
    } catch (error) {
      console.error("Error creating user:", error)
      throw new Error("Failed to create user")
    }
  }

  // Event methods
  getUserEvents(userId: string) {
    try {
      return this.events
        .filter((event) => event.userId === userId)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } catch (error) {
      console.error("Error getting user events:", error)
      return []
    }
  }

  createEvent(event: Omit<Event, "id">) {
    try {
      const newEvent = {
        ...event,
        id: uuidv4(),
      }
      this.events.push(newEvent)
      this.saveToStorage()
      return newEvent
    } catch (error) {
      console.error("Error creating event:", error)
      throw new Error("Failed to create event")
    }
  }

  updateEvent(eventId: string, updates: Partial<Event>) {
    try {
      const eventIndex = this.events.findIndex((e) => e.id === eventId)
      if (eventIndex === -1) {
        throw new Error("Event not found")
      }

      this.events[eventIndex] = {
        ...this.events[eventIndex],
        ...updates,
      }

      this.saveToStorage()
      return this.events[eventIndex]
    } catch (error) {
      console.error("Error updating event:", error)
      throw new Error("Failed to update event")
    }
  }

  deleteEvent(eventId: string) {
    try {
      const initialLength = this.events.length
      this.events = this.events.filter((e) => e.id !== eventId)

      if (this.events.length === initialLength) {
        throw new Error("Event not found")
      }

      this.saveToStorage()
      return true
    } catch (error) {
      console.error("Error deleting event:", error)
      throw new Error("Failed to delete event")
    }
  }

  // Diet plan methods
  getUserDietPlans(userId: string) {
    try {
      return this.dietPlans
        .filter((plan) => plan.userId === userId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch (error) {
      console.error("Error getting user diet plans:", error)
      return []
    }
  }

  createDietPlan(plan: Omit<DietPlan, "id">) {
    try {
      const newPlan = {
        ...plan,
        id: uuidv4(),
      }
      this.dietPlans.push(newPlan)
      this.saveToStorage()
      return newPlan
    } catch (error) {
      console.error("Error creating diet plan:", error)
      throw new Error("Failed to create diet plan")
    }
  }

  updateDietPlan(planId: string, updates: Partial<DietPlan>) {
    try {
      const planIndex = this.dietPlans.findIndex((p) => p.id === planId)
      if (planIndex === -1) {
        throw new Error("Diet plan not found")
      }

      this.dietPlans[planIndex] = {
        ...this.dietPlans[planIndex],
        ...updates,
      }

      this.saveToStorage()
      return this.dietPlans[planIndex]
    } catch (error) {
      console.error("Error updating diet plan:", error)
      throw new Error("Failed to update diet plan")
    }
  }

  deleteDietPlan(planId: string) {
    try {
      const initialLength = this.dietPlans.length
      this.dietPlans = this.dietPlans.filter((p) => p.id !== planId)

      if (this.dietPlans.length === initialLength) {
        throw new Error("Diet plan not found")
      }

      this.saveToStorage()
      return true
    } catch (error) {
      console.error("Error deleting diet plan:", error)
      throw new Error("Failed to delete diet plan")
    }
  }

  // Book methods
  getAllBooks() {
    try {
      return [...this.books].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } catch (error) {
      console.error("Error getting all books:", error)
      return []
    }
  }

  getFreeBooks() {
    try {
      return this.books
        .filter((book) => book.isFree)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } catch (error) {
      console.error("Error getting free books:", error)
      return []
    }
  }

  getBooksByCategory(category: string) {
    try {
      return this.books
        .filter((book) => book.category === category)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } catch (error) {
      console.error("Error getting books by category:", error)
      return []
    }
  }

  searchBooks(query: string) {
    try {
      const lowerQuery = query.toLowerCase()
      return this.books.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerQuery) ||
          book.author.toLowerCase().includes(lowerQuery) ||
          book.description.toLowerCase().includes(lowerQuery) ||
          book.category.toLowerCase().includes(lowerQuery),
      )
    } catch (error) {
      console.error("Error searching books:", error)
      return []
    }
  }

  getBookById(id: string) {
    try {
      return this.books.find((book) => book.id === id) || null
    } catch (error) {
      console.error("Error getting book by ID:", error)
      return null
    }
  }

  createBook(book: Omit<Book, "id" | "createdAt">) {
    try {
      const newBook = {
        ...book,
        id: uuidv4(),
        createdAt: new Date(),
      }
      this.books.push(newBook)
      this.saveToStorage()
      return newBook
    } catch (error) {
      console.error("Error creating book:", error)
      throw new Error("Failed to create book")
    }
  }

  // Cart methods
  getUserCart(userId: string) {
    try {
      return this.carts.find((cart) => cart.userId === userId) || null
    } catch (error) {
      console.error("Error getting user cart:", error)
      return null
    }
  }

  createCart(userId: string) {
    try {
      const newCart = {
        id: uuidv4(),
        userId,
        items: [],
        total: 0,
      }
      this.carts.push(newCart)
      this.saveToStorage()
      return newCart
    } catch (error) {
      console.error("Error creating cart:", error)
      throw new Error("Failed to create cart")
    }
  }

  addToCart(userId: string, bookId: string) {
    try {
      let cart = this.getUserCart(userId)
      if (!cart) {
        cart = this.createCart(userId)
      }

      const book = this.books.find((b) => b.id === bookId)
      if (!book) {
        throw new Error("Book not found")
      }

      const existingItem = cart.items.find((item) => item.bookId === bookId)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.items.push({
          id: uuidv4(),
          bookId,
          title: book.title,
          price: book.price,
          quantity: 1,
        })
      }

      // Recalculate total
      cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      this.saveToStorage()
      return cart
    } catch (error) {
      console.error("Error adding to cart:", error)
      throw new Error("Failed to add item to cart")
    }
  }

  removeFromCart(userId: string, itemId: string) {
    try {
      const cart = this.getUserCart(userId)
      if (!cart) {
        throw new Error("Cart not found")
      }

      const initialLength = cart.items.length
      cart.items = cart.items.filter((item) => item.id !== itemId)

      if (cart.items.length === initialLength) {
        throw new Error("Item not found in cart")
      }

      // Recalculate total
      cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      this.saveToStorage()
      return cart
    } catch (error) {
      console.error("Error removing from cart:", error)
      throw new Error("Failed to remove item from cart")
    }
  }

  updateCartItemQuantity(userId: string, itemId: string, quantity: number) {
    try {
      const cart = this.getUserCart(userId)
      if (!cart) {
        throw new Error("Cart not found")
      }

      const item = cart.items.find((item) => item.id === itemId)
      if (!item) {
        throw new Error("Item not found in cart")
      }

      if (quantity <= 0) {
        return this.removeFromCart(userId, itemId)
      }

      item.quantity = quantity

      // Recalculate total
      cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      this.saveToStorage()
      return cart
    } catch (error) {
      console.error("Error updating cart item quantity:", error)
      throw new Error("Failed to update cart item quantity")
    }
  }

  // Order methods
  createOrder(userId: string, paymentMethod: string) {
    try {
      const cart = this.getUserCart(userId)
      if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty")
      }

      const newOrder = {
        id: uuidv4(),
        userId,
        items: [...cart.items],
        total: cart.total,
        paymentMethod,
        status: "pending" as const,
        createdAt: new Date(),
      }

      this.orders.push(newOrder)

      // Clear cart after order
      cart.items = []
      cart.total = 0

      this.saveToStorage()
      return newOrder
    } catch (error) {
      console.error("Error creating order:", error)
      throw new Error("Failed to create order")
    }
  }

  getUserOrders(userId: string) {
    try {
      return this.orders
        .filter((order) => order.userId === userId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } catch (error) {
      console.error("Error getting user orders:", error)
      return []
    }
  }

  updateOrderStatus(orderId: string, status: "pending" | "completed" | "failed") {
    try {
      const orderIndex = this.orders.findIndex((o) => o.id === orderId)
      if (orderIndex === -1) {
        throw new Error("Order not found")
      }

      this.orders[orderIndex].status = status
      this.saveToStorage()
      return this.orders[orderIndex]
    } catch (error) {
      console.error("Error updating order status:", error)
      throw new Error("Failed to update order status")
    }
  }
}

// Export a singleton instance
export const db = new Database()
