"use server"

import { db } from "@/lib/db"
import { cookies } from "next/headers"
import { hash, compare } from "@/lib/auth"

export async function login(email: string, password: string) {
  try {
    // In a real app, you would fetch the user from the database
    // and verify the password
    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      return { success: false, error: "Invalid email or password" }
    }

    // Set a cookie or session
    cookies().set("auth", "authenticated", { httpOnly: true, secure: process.env.NODE_ENV === "production" })

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function register(name: string, email: string, password: string) {
  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { success: false, error: "Email already in use" }
    }

    // Hash the password
    const hashedPassword = await hash(password)

    // Create the user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    // Set a cookie or session
    cookies().set("auth", "authenticated", { httpOnly: true, secure: process.env.NODE_ENV === "production" })

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function logout() {
  try {
    cookies().delete("auth")
    return { success: true }
  } catch (error) {
    console.error("Logout error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function updateUserProfile(userData: { name: string; email: string; phone?: string }) {
  try {
    // In a real app, you would update the user in the database
    // For now, we'll just return success
    return { success: true }
  } catch (error) {
    console.error("Update profile error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function changePassword(passwordData: { currentPassword: string; newPassword: string }) {
  try {
    // In a real app, you would verify the current password and update with the new one
    // For now, we'll just return success
    return { success: true }
  } catch (error) {
    console.error("Change password error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getUserProfile() {
  try {
    // In a real app, you would fetch the user profile from the database
    // For now, we'll return mock data
    return {
      success: true,
      user: {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        phone: "+91 9876543210",
      },
    }
  } catch (error) {
    console.error("Get profile error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
