"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type User = {
  id: string
  name: string
  email: string
}

type UserContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (formData: FormData) => Promise<void>
  register: (formData: FormData) => Promise<void>
  logout: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check if user is logged in on mount and route changes
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check if user is logged in by looking for userName cookie
        const userName = document.cookie
          .split("; ")
          .find((row) => row.startsWith("userName="))
          ?.split("=")[1]

        if (userName) {
          setUser({
            id: "unknown", // We don't expose the ID in the cookie for security
            name: decodeURIComponent(userName),
            email: "unknown", // We don't expose the email in the cookie
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname])

  const handleLogin = async (formData: FormData) => {
    setIsLoading(true)
    try {
      // For demo purposes, let's simulate a successful login
      // In a real app, you would call an API endpoint
      const email = formData.get("email") as string
      const password = formData.get("password") as string

      // Simple validation
      if (!email || !password) {
        toast({
          title: "Login Failed",
          description: "Email and password are required",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Set a cookie to simulate login
      document.cookie = `userName=${encodeURIComponent("Demo User")};path=/;max-age=86400`

      setUser({
        id: "1",
        name: "Demo User",
        email: email,
      })

      toast({
        title: "Login Successful",
        description: `Welcome back, Demo User!`,
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (formData: FormData) => {
    setIsLoading(true)
    try {
      // For demo purposes, let's simulate a successful registration
      const name = formData.get("name") as string
      const email = formData.get("email") as string
      const password = formData.get("password") as string

      // Simple validation
      if (!name || !email || !password) {
        toast({
          title: "Registration Failed",
          description: "All fields are required",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Set a cookie to simulate registration
      document.cookie = `userName=${encodeURIComponent(name)};path=/;max-age=86400`

      setUser({
        id: "1",
        name: name,
        email: email,
      })

      toast({
        title: "Registration Successful",
        description: `Welcome to campus.care, ${name}!`,
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      // Clear the cookie
      document.cookie = "userName=;path=/;max-age=0"

      setUser(null)

      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      })

      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Logout Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
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
