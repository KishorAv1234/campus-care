import { cookies } from "next/headers"
import { db } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"

// In a real app, you would use a proper session store
// This is a simplified version for demonstration
const SESSIONS: Record<string, { userId: string; expires: Date }> = {}

// Clean up expired sessions periodically
if (typeof window !== "undefined") {
  setInterval(() => {
    const now = new Date()
    Object.keys(SESSIONS).forEach((sessionId) => {
      if (SESSIONS[sessionId].expires < now) {
        delete SESSIONS[sessionId]
      }
    })
  }, 60000) // Check every minute
}

export async function createSession(userId: string) {
  const sessionId = uuidv4()
  const expires = new Date()
  expires.setDate(expires.getDate() + 7) // 1 week

  SESSIONS[sessionId] = {
    userId,
    expires,
  }

  cookies().set("sessionId", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  const user = db.users.find((u) => u.id === userId)
  if (user) {
    cookies().set("userName", user.name, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })
  }

  return sessionId
}

export function getSession() {
  const sessionId = cookies().get("sessionId")?.value
  if (!sessionId) return null

  const session = SESSIONS[sessionId]
  if (!session) return null

  if (session.expires < new Date()) {
    delete SESSIONS[sessionId]
    return null
  }

  return session
}

export function getCurrentUserId(): string | null {
  const session = getSession()
  return session?.userId || null
}

export function destroySession() {
  const sessionId = cookies().get("sessionId")?.value
  if (sessionId) {
    delete SESSIONS[sessionId]
  }

  cookies().delete("sessionId")
  cookies().delete("userName")
}
