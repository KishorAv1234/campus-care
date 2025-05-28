"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Check, ChevronDown, Plus, Utensils, Droplets, Target, Trash2, Save } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface FoodItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  completed: boolean
}

interface Meal {
  id: string
  type: string
  time: string
  items: FoodItem[]
}

export function InteractiveDietPlan() {
  const { toast } = useToast()
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: "breakfast",
      type: "Breakfast",
      time: "7:00 AM - 8:00 AM",
      items: [
        { id: "b1", name: "Oatmeal with Fruits", calories: 250, protein: 8, carbs: 45, fat: 5, completed: true },
        { id: "b2", name: "Greek Yogurt", calories: 150, protein: 15, carbs: 8, fat: 5, completed: true },
      ],
    },
    {
      id: "lunch",
      type: "Lunch",
      time: "12:30 PM - 1:30 PM",
      items: [
        { id: "l1", name: "Grilled Chicken Salad", calories: 350, protein: 30, carbs: 15, fat: 12, completed: true },
        { id: "l2", name: "Whole Grain Bread", calories: 120, protein: 4, carbs: 22, fat: 2, completed: false },
      ],
    },
    {
      id: "dinner",
      type: "Dinner",
      time: "7:30 PM - 8:30 PM",
      items: [
        { id: "d1", name: "Grilled Salmon", calories: 300, protein: 25, carbs: 0, fat: 15, completed: false },
        { id: "d2", name: "Steamed Vegetables", calories: 100, protein: 3, carbs: 20, fat: 1, completed: false },
      ],
    },
  ])

  const [waterIntake, setWaterIntake] = useState(1.5)
  const [waterGoal, setWaterGoal] = useState(3)
  const [calorieGoal, setCalorieGoal] = useState(2400)
  const [isAddingFood, setIsAddingFood] = useState(false)
  const [selectedMealId, setSelectedMealId] = useState("")
  const [newFood, setNewFood] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  })

  // Calculate totals
  const totalCalories = meals.reduce(
    (total, meal) =>
      total + meal.items.filter((item) => item.completed).reduce((mealTotal, item) => mealTotal + item.calories, 0),
    0,
  )
  const totalProtein = meals.reduce(
    (total, meal) =>
      total + meal.items.filter((item) => item.completed).reduce((mealTotal, item) => mealTotal + item.protein, 0),
    0,
  )
  const totalCarbs = meals.reduce(
    (total, meal) =>
      total + meal.items.filter((item) => item.completed).reduce((mealTotal, item) => mealTotal + item.carbs, 0),
    0,
  )
  const totalFat = meals.reduce(
    (total, meal) =>
      total + meal.items.filter((item) => item.completed).reduce((mealTotal, item) => mealTotal + item.fat, 0),
    0,
  )

  const totalItems = meals.reduce((total, meal) => total + meal.items.length, 0)
  const completedItems = meals.reduce((total, meal) => total + meal.items.filter((item) => item.completed).length, 0)
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  const toggleFoodCompletion = (mealId: string, foodId: string) => {
    setMeals(
      meals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              items: meal.items.map((item) => (item.id === foodId ? { ...item, completed: !item.completed } : item)),
            }
          : meal,
      ),
    )

    const meal = meals.find((m) => m.id === mealId)
    const food = meal?.items.find((i) => i.id === foodId)
    if (food) {
      toast({
        title: food.completed ? "Item Unchecked" : "Item Completed!",
        description: `${food.name} ${food.completed ? "removed from" : "added to"} your daily intake`,
      })
    }
  }

  const addWater = (amount: number) => {
    const newIntake = Math.min(waterIntake + amount, waterGoal + 2)
    setWaterIntake(newIntake)
    toast({
      title: "Water Added!",
      description: `Added ${amount}L of water. Total: ${newIntake}L`,
    })
  }

  const handleAddFood = () => {
    if (!newFood.name || !newFood.calories || !selectedMealId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const foodItem: FoodItem = {
      id: Date.now().toString(),
      name: newFood.name,
      calories: Number.parseInt(newFood.calories),
      protein: Number.parseInt(newFood.protein) || 0,
      carbs: Number.parseInt(newFood.carbs) || 0,
      fat: Number.parseInt(newFood.fat) || 0,
      completed: false,
    }

    setMeals(meals.map((meal) => (meal.id === selectedMealId ? { ...meal, items: [...meal.items, foodItem] } : meal)))

    setNewFood({ name: "", calories: "", protein: "", carbs: "", fat: "" })
    setIsAddingFood(false)
    setSelectedMealId("")

    toast({
      title: "Food Added!",
      description: `${foodItem.name} has been added to your meal plan`,
    })
  }

  const removeFoodItem = (mealId: string, foodId: string) => {
    setMeals(
      meals.map((meal) =>
        meal.id === mealId ? { ...meal, items: meal.items.filter((item) => item.id !== foodId) } : meal,
      ),
    )

    toast({
      title: "Food Removed",
      description: "Food item has been removed from your meal plan",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Diet Plan Tracker</h2>
        <Dialog open={isAddingFood} onOpenChange={setIsAddingFood}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Food
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Food Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Select Meal</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedMealId}
                  onChange={(e) => setSelectedMealId(e.target.value)}
                >
                  <option value="">Choose a meal...</option>
                  {meals.map((meal) => (
                    <option key={meal.id} value={meal.id}>
                      {meal.type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Food Name *</Label>
                <Input
                  value={newFood.name}
                  onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                  placeholder="e.g., Grilled Chicken"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Calories *</Label>
                  <Input
                    type="number"
                    value={newFood.calories}
                    onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
                    placeholder="250"
                  />
                </div>
                <div>
                  <Label>Protein (g)</Label>
                  <Input
                    type="number"
                    value={newFood.protein}
                    onChange={(e) => setNewFood({ ...newFood, protein: e.target.value })}
                    placeholder="25"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Carbs (g)</Label>
                  <Input
                    type="number"
                    value={newFood.carbs}
                    onChange={(e) => setNewFood({ ...newFood, carbs: e.target.value })}
                    placeholder="30"
                  />
                </div>
                <div>
                  <Label>Fat (g)</Label>
                  <Input
                    type="number"
                    value={newFood.fat}
                    onChange={(e) => setNewFood({ ...newFood, fat: e.target.value })}
                    placeholder="10"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingFood(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddFood}>
                  <Save className="h-4 w-4 mr-2" />
                  Add Food
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div className="p-4 border rounded-lg text-center" whileHover={{ scale: 1.02 }}>
          <div className="text-2xl font-bold text-blue-600">{completionPercentage}%</div>
          <div className="text-sm text-muted-foreground">Completion</div>
          <Progress value={completionPercentage} className="mt-2" />
        </motion.div>

        <motion.div className="p-4 border rounded-lg text-center" whileHover={{ scale: 1.02 }}>
          <div className="text-2xl font-bold text-green-600">{totalCalories}</div>
          <div className="text-sm text-muted-foreground">Calories / {calorieGoal}</div>
          <Progress value={(totalCalories / calorieGoal) * 100} className="mt-2" />
        </motion.div>

        <motion.div className="p-4 border rounded-lg text-center" whileHover={{ scale: 1.02 }}>
          <div className="text-2xl font-bold text-purple-600">{totalProtein}g</div>
          <div className="text-sm text-muted-foreground">Protein</div>
        </motion.div>

        <motion.div className="p-4 border rounded-lg text-center" whileHover={{ scale: 1.02 }}>
          <div className="text-2xl font-bold text-cyan-600">{waterIntake}L</div>
          <div className="text-sm text-muted-foreground">Water / {waterGoal}L</div>
          <Progress value={(waterIntake / waterGoal) * 100} className="mt-2" />
        </motion.div>
      </div>

      {/* Water Intake Tracker */}
      <motion.div className="p-4 border rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <h3 className="font-medium">Water Intake</h3>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => addWater(0.25)}>
              +250ml
            </Button>
            <Button size="sm" variant="outline" onClick={() => addWater(0.5)}>
              +500ml
            </Button>
            <Button size="sm" onClick={() => addWater(1)}>
              +1L
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Progress value={(waterIntake / waterGoal) * 100} className="flex-1" />
          <span className="text-sm font-medium">
            {waterIntake}L / {waterGoal}L
          </span>
        </div>
      </motion.div>

      {/* Meals */}
      <div className="space-y-4">
        <AnimatePresence>
          {meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Collapsible defaultOpen={index === 0}>
                <div className="border rounded-lg overflow-hidden">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Utensils className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{meal.type}</h4>
                        <p className="text-sm text-muted-foreground">{meal.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm px-2 py-1 rounded-full bg-muted">
                        {meal.items.filter((item) => item.completed).length}/{meal.items.length} completed
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 space-y-2">
                      <AnimatePresence>
                        {meal.items.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            whileHover={{ scale: 1.01 }}
                            className={`flex items-center justify-between p-3 rounded-md transition-all ${
                              item.completed
                                ? "bg-green-50 border border-green-200"
                                : "bg-background hover:bg-muted/50 border"
                            }`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className={`font-medium ${item.completed ? "line-through opacity-70" : ""}`}>
                                  {item.name}
                                </p>
                                {item.completed && (
                                  <div className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                                    ✓ Completed
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                                <span>{item.calories} cal</span>
                                <span>{item.protein}g protein</span>
                                <span>{item.carbs}g carbs</span>
                                <span>{item.fat}g fat</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant={item.completed ? "default" : "outline"}
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => toggleFoodCompletion(meal.id, item.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                onClick={() => removeFoodItem(meal.id, item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => {
                          setSelectedMealId(meal.id)
                          setIsAddingFood(true)
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Food to {meal.type}
                      </Button>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Goals Section */}
      <motion.div className="p-4 border rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-orange-500" />
          <h3 className="font-medium">Daily Goals</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Calorie Goal</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={calorieGoal}
                onChange={(e) => setCalorieGoal(Number.parseInt(e.target.value) || 2400)}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground self-center">calories</span>
            </div>
          </div>
          <div>
            <Label>Water Goal</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                step="0.1"
                value={waterGoal}
                onChange={(e) => setWaterGoal(Number.parseFloat(e.target.value) || 3)}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground self-center">liters</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
