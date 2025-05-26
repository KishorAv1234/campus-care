"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"
import { login as loginAction, logout as logoutAction, register as registerAction } from "@/app/actions/auth"
import Cookies from "js-cookie"

type User = {
  id: string
  name: string
  email: string
  phone?: string
}

type UserContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  updateUser: (userData: Partial<User>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check for user in cookie
    const userCookie = Cookies.get("user")
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie)
        setUser(userData)
      } catch (error) {
        console.error("Error parsing user cookie:", error)
        Cookies.remove("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const result = await loginAction(email, password)
      if (result.success && result.user) {
        setUser(result.user)
        // Store user in cookie
        Cookies.set("user", JSON.stringify(result.user), { expires: 7 })
        return { success: true }
      }
      return { success: false, error: result.error || "Login failed" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  const logout = async () => {
    try {
      await logoutAction()
      setUser(null)
      Cookies.remove("user")
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const result = await registerAction(name, email, password)
      if (result.success && result.user) {
        setUser(result.user)
        // Store user in cookie
        Cookies.set("user", JSON.stringify(result.user), { expires: 7 })
        return { success: true }
      }
      return { success: false, error: result.error || "Registration failed" }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: "An unexpected error occurred" }
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      Cookies.set("user", JSON.stringify(updatedUser), { expires: 7 })
    }
  }

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout, register, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
