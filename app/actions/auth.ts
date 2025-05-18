"use server"

import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { createSession, destroySession, getCurrentUserId } from "@/lib/auth"

export async function login(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return { error: "Email and password are required" }
    }

    const user = db.findUserByEmail(email)

    if (!user) {
      return { error: "Invalid email or password" }
    }

    // In a real app, we would verify the hashed password
    // For now, we'll just compare directly since we're storing plaintext
    // const passwordMatch = await verifyPassword(password, user.password);
    const passwordMatch = password === user.password

    if (!passwordMatch) {
      return { error: "Invalid email or password" }
    }

    await createSession(user.id)

    return { success: true, user: { id: user.id, name: user.name, email: user.email } }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function register(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (!name || !email || !password) {
      return { error: "All fields are required" }
    }

    if (password !== confirmPassword) {
      return { error: "Passwords do not match" }
    }

    const existingUser = db.findUserByEmail(email)
    if (existingUser) {
      return { error: "Email already in use" }
    }

    // In a real app, we would hash the password
    // const hashedPassword = await hashPassword(password);
    // const user = db.createUser({ name, email, password: hashedPassword });
    const user = db.createUser({ name, email, password })

    await createSession(user.id)

    return { success: true, user: { id: user.id, name: user.name, email: user.email } }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function logout() {
  try {
    destroySession()
    redirect("/")
  } catch (error) {
    console.error("Logout error:", error)
    redirect("/")
  }
}

export async function getCurrentUser() {
  try {
    const userId = getCurrentUserId()
    if (!userId) return null

    const user = db.users.find((u) => u.id === userId)
    if (!user) return null

    return { id: user.id, name: user.name, email: user.email }
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  return user
}
