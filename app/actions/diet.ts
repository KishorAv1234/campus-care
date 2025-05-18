"use server"

import { db } from "@/lib/db"
import { getCurrentUserId } from "@/lib/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function getUserDietPlans() {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      redirect("/login")
    }

    return db.getUserDietPlans(userId)
  } catch (error) {
    console.error("Get user diet plans error:", error)
    return []
  }
}

export async function createDietPlan(formData: FormData) {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      return { error: "You must be logged in to create a diet plan" }
    }

    const name = formData.get("name") as string
    const breakfast = formData.get("breakfast") as string
    const lunch = formData.get("lunch") as string
    const dinner = formData.get("dinner") as string
    const snacks = formData.get("snacks") as string
    const dateString = formData.get("date") as string

    if (!name || !breakfast || !lunch || !dinner) {
      return { error: "Name, breakfast, lunch, and dinner are required" }
    }

    const date = dateString ? new Date(dateString) : new Date()

    const plan = db.createDietPlan({
      userId,
      name,
      breakfast,
      lunch,
      dinner,
      snacks,
      date,
    })

    revalidatePath("/diet")
    revalidatePath("/dashboard")
    return { success: true, plan }
  } catch (error) {
    console.error("Create diet plan error:", error)
    return { error: "Failed to create diet plan. Please try again." }
  }
}

export async function updateDietPlan(
  planId: string,
  updates: {
    name?: string
    breakfast?: string
    lunch?: string
    dinner?: string
    snacks?: string
    date?: Date
  },
) {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      return { error: "You must be logged in" }
    }

    // Verify the plan belongs to the user
    const plan = db.dietPlans.find((p) => p.id === planId)
    if (!plan || plan.userId !== userId) {
      return { error: "Diet plan not found" }
    }

    const updatedPlan = db.updateDietPlan(planId, updates)
    revalidatePath("/diet")
    revalidatePath("/dashboard")
    return { success: true, plan: updatedPlan }
  } catch (error) {
    console.error("Update diet plan error:", error)
    return { error: "Failed to update diet plan. Please try again." }
  }
}

export async function deleteDietPlan(planId: string) {
  try {
    const userId = getCurrentUserId()
    if (!userId) {
      return { error: "You must be logged in" }
    }

    // Verify the plan belongs to the user
    const plan = db.dietPlans.find((p) => p.id === planId)
    if (!plan || plan.userId !== userId) {
      return { error: "Diet plan not found" }
    }

    db.deleteDietPlan(planId)
    revalidatePath("/diet")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Delete diet plan error:", error)
    return { error: "Failed to delete diet plan. Please try again." }
  }
}
