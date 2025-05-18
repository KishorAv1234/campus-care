"use server"

import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function getUserEvents() {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      redirect("/login")
    }

    return db.getUserEvents(userId)
  } catch (error) {
    console.error("Get user events error:", error)
    return []
  }
}

export async function createEvent(formData: FormData) {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      return { error: "You must be logged in to create an event" }
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const dateString = formData.get("date") as string
    const location = formData.get("location") as string

    if (!title || !dateString) {
      return { error: "Title and date are required" }
    }

    const date = new Date(dateString)

    const event = db.createEvent({
      userId,
      title,
      description,
      date,
      location,
      isCompleted: false,
    })

    revalidatePath("/dashboard")
    return { success: true, event }
  } catch (error) {
    console.error("Create event error:", error)
    return { error: "Failed to create event. Please try again." }
  }
}

export async function updateEvent(
  eventId: string,
  updates: {
    title?: string
    description?: string
    date?: Date
    location?: string
    isCompleted?: boolean
  },
) {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      return { error: "You must be logged in" }
    }

    // Verify the event belongs to the user
    const event = db.events.find((e) => e.id === eventId)
    if (!event || event.userId !== userId) {
      return { error: "Event not found" }
    }

    const updatedEvent = db.updateEvent(eventId, updates)
    revalidatePath("/dashboard")
    return { success: true, event: updatedEvent }
  } catch (error) {
    console.error("Update event error:", error)
    return { error: "Failed to update event. Please try again." }
  }
}

export async function toggleEventCompletion(eventId: string) {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      return { error: "You must be logged in" }
    }

    const event = db.events.find((e) => e.id === eventId && e.userId === userId)
    if (!event) {
      return { error: "Event not found" }
    }

    const updatedEvent = db.updateEvent(eventId, { isCompleted: !event.isCompleted })
    revalidatePath("/dashboard")
    return { success: true, event: updatedEvent }
  } catch (error) {
    console.error("Toggle event completion error:", error)
    return { error: "Failed to update event. Please try again." }
  }
}

export async function deleteEvent(eventId: string) {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      return { error: "You must be logged in" }
    }

    // Verify the event belongs to the user
    const event = db.events.find((e) => e.id === eventId)
    if (!event || event.userId !== userId) {
      return { error: "Event not found" }
    }

    db.deleteEvent(eventId)
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Delete event error:", error)
    return { error: "Failed to delete event. Please try again." }
  }
}
