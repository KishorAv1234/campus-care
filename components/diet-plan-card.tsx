"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Check, ChevronDown, Plus, Utensils } from "lucide-react"
import { motion } from "framer-motion"

interface DietPlanCardProps {
  compact?: boolean
}

export function DietPlanCard({ compact = false }: DietPlanCardProps) {
  const [completedMeals, setCompletedMeals] = useState<Record<string, boolean>>({
    "breakfast-1": true,
    "breakfast-2": true,
    "lunch-1": true,
    "snack-1": false,
    "dinner-1": false,
    "dinner-2": false,
  })

  const toggleMealCompletion = (mealId: string) => {
    setCompletedMeals((prev) => ({
      ...prev,
      [mealId]: !prev[mealId],
    }))
  }

  // Sample diet plan data
  const dietPlan = {
    date: "May 22, 2025",
    progress: 50,
    caloriesConsumed: 1200,
    caloriesGoal: 2400,
    waterConsumed: 1.5,
    waterGoal: 3,
    meals: [
      {
        type: "Breakfast",
        time: "7:00 AM - 8:00 AM",
        items: [
          { id: "breakfast-1", name: "Oatmeal with Fruits", calories: 250, protein: 8, carbs: 45, fat: 5 },
          { id: "breakfast-2", name: "Greek Yogurt", calories: 150, protein: 15, carbs: 8, fat: 5 },
        ],
      },
      {
        type: "Lunch",
        time: "12:30 PM - 1:30 PM",
        items: [
          { id: "lunch-1", name: "Grilled Chicken Salad", calories: 350, protein: 30, carbs: 15, fat: 12 },
          { id: "lunch-2", name: "Whole Grain Bread", calories: 120, protein: 4, carbs: 22, fat: 2 },
        ],
      },
      {
        type: "Snack",
        time: "4:00 PM - 5:00 PM",
        items: [{ id: "snack-1", name: "Mixed Nuts (30g)", calories: 180, protein: 6, carbs: 5, fat: 16 }],
      },
      {
        type: "Dinner",
        time: "7:30 PM - 8:30 PM",
        items: [
          { id: "dinner-1", name: "Grilled Salmon", calories: 300, protein: 25, carbs: 0, fat: 15 },
          { id: "dinner-2", name: "Steamed Vegetables", calories: 100, protein: 3, carbs: 20, fat: 1 },
          { id: "dinner-3", name: "Brown Rice (1/2 cup)", calories: 150, protein: 3, carbs: 32, fat: 1 },
        ],
      },
    ],
  }

  // Calculate completion percentage
  const totalItems = Object.keys(completedMeals).length
  const completedItems = Object.values(completedMeals).filter(Boolean).length
  const completionPercentage = Math.round((completedItems / totalItems) * 100)

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium">Today's Progress</h3>
            <p className="text-xs text-muted-foreground">
              {completedItems} of {totalItems} items completed
            </p>
          </div>
          <div className="text-2xl font-bold">{completionPercentage}%</div>
        </div>

        <Progress value={completionPercentage} className="h-2" />

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-2 border rounded-md">
            <p className="text-xs text-muted-foreground">Calories</p>
            <p className="text-sm font-medium">
              {dietPlan.caloriesConsumed} / {dietPlan.caloriesGoal}
            </p>
          </div>
          <div className="p-2 border rounded-md">
            <p className="text-xs text-muted-foreground">Water</p>
            <p className="text-sm font-medium">
              {dietPlan.waterConsumed}L / {dietPlan.waterGoal}L
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Next Meal</h3>
          {dietPlan.meals.some((meal) => meal.items.some((item) => !completedMeals[item.id])) ? (
            dietPlan.meals
              .find((meal) => meal.items.some((item) => !completedMeals[item.id]))
              ?.items.filter((item) => !completedMeals[item.id])
              .slice(0, 1)
              .map((item) => (
                <motion.div
                  key={item.id}
                  className="flex items-center justify-between p-2 border rounded-md"
                  whileHover={{ scale: 1.02 }}
                >
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.calories} calories</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => toggleMealCompletion(item.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))
          ) : (
            <p className="text-sm text-muted-foreground">All meals completed for today!</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium">Today's Diet Plan</h3>
          <p className="text-sm text-muted-foreground">{dietPlan.date}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Completion</p>
            <p className="text-lg font-bold">{completionPercentage}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Calories</p>
            <p className="text-lg font-bold">
              {dietPlan.caloriesConsumed} / {dietPlan.caloriesGoal}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Water</p>
            <p className="text-lg font-bold">
              {dietPlan.waterConsumed}L / {dietPlan.waterGoal}L
            </p>
          </div>
        </div>
      </div>

      <Progress value={completionPercentage} className="h-2" />

      <div className="space-y-4">
        {dietPlan.meals.map((meal, index) => (
          <Collapsible key={index} defaultOpen={index === 0}>
            <div className="border rounded-lg overflow-hidden">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Utensils className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{meal.type}</h4>
                    <p className="text-xs text-muted-foreground">{meal.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs px-2 py-0.5 rounded-full bg-muted">{meal.items.length} items</div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4 pt-0 space-y-2">
                  {meal.items.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.01 }}
                      className={`flex items-center justify-between p-2 rounded-md transition-colors cursor-pointer ${
                        completedMeals[item.id] ? "bg-primary/5" : "bg-background hover:bg-muted/50"
                      }`}
                    >
                      <div>
                        <div className="flex items-center">
                          <p
                            className={`text-sm font-medium ${completedMeals[item.id] ? "line-through opacity-70" : ""}`}
                          >
                            {item.name}
                          </p>
                          {completedMeals[item.id] && (
                            <div className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-800">
                              Completed
                            </div>
                          )}
                        </div>
                        <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                          <span>{item.calories} cal</span>
                          <span>{item.protein}g protein</span>
                          <span>{item.carbs}g carbs</span>
                          <span>{item.fat}g fat</span>
                        </div>
                      </div>
                      <Button
                        variant={completedMeals[item.id] ? "default" : "outline"}
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleMealCompletion(item.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Food Item
                  </Button>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    </motion.div>
  )
}
