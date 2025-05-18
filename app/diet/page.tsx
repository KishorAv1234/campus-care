"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChefHat, Utensils, Apple, Carrot, Fish, Beef, Egg, Save } from "lucide-react"
import { motion } from "framer-motion"
import { getUserDietPlans, createDietPlan } from "@/app/actions/diet"
import { useToast } from "@/hooks/use-toast"

type DietPlan = {
  id: string
  name: string
  breakfast: string
  lunch: string
  dinner: string
  snacks: string
  date: Date
}

export default function DietPlanner() {
  const { user } = useUser()
  const { toast } = useToast()
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Form states
  const [name, setName] = useState("")
  const [breakfast, setBreakfast] = useState("")
  const [lunch, setLunch] = useState("")
  const [dinner, setDinner] = useState("")
  const [snacks, setSnacks] = useState("")
  const [date, setDate] = useState("")

  // Auto-suggestion states
  const [dietType, setDietType] = useState("balanced")
  const [allergies, setAllergies] = useState("none")
  const [budget, setBudget] = useState("medium")
  const [cookingTime, setCookingTime] = useState("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPlans, setGeneratedPlans] = useState<any[]>([])

  // Fetch diet plans
  useEffect(() => {
    const fetchDietPlans = async () => {
      if (user) {
        try {
          const plans = await getUserDietPlans()
          setDietPlans(plans)
        } catch (error) {
          console.error("Error fetching diet plans:", error)
          toast({
            title: "Error",
            description: "Failed to load your diet plans. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    fetchDietPlans()
  }, [user, toast])

  const handleCreateDietPlan = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to create a diet plan.",
        variant: "destructive",
      })
      return
    }

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("breakfast", breakfast)
      formData.append("lunch", lunch)
      formData.append("dinner", dinner)
      formData.append("snacks", snacks)
      formData.append("date", date || new Date().toISOString())

      const result = await createDietPlan(formData)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else if (result.success) {
        toast({
          title: "Success",
          description: "Diet plan created successfully!",
        })

        // Add the new plan to the state
        setDietPlans([...dietPlans, result.plan])

        // Reset form
        setName("")
        setBreakfast("")
        setLunch("")
        setDinner("")
        setSnacks("")
        setDate("")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create diet plan. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleGenerateMealPlan = () => {
    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      // Generate sample meal plans based on selected options
      const plans = [
        {
          title: "Vegetarian Plan",
          icon: <Carrot className="h-6 w-6" />,
          breakfast: "Oatmeal with fruits and nuts",
          lunch: "Quinoa salad with roasted vegetables",
          dinner: "Lentil soup with whole grain bread",
          snacks: "Greek yogurt with honey, Mixed nuts",
        },
        {
          title: "High Protein Plan",
          icon: <Egg className="h-6 w-6" />,
          breakfast: "Scrambled eggs with spinach",
          lunch: "Grilled chicken salad",
          dinner: "Salmon with steamed broccoli",
          snacks: "Protein shake, Cottage cheese",
        },
        {
          title: "Budget Friendly",
          icon: <Apple className="h-6 w-6" />,
          breakfast: "Peanut butter toast",
          lunch: "Rice and beans bowl",
          dinner: "Pasta with vegetables",
          snacks: "Banana, Popcorn",
        },
      ]

      setGeneratedPlans(plans)
      setIsGenerating(false)

      toast({
        title: "Meal Plans Generated",
        description: "Check out your personalized meal suggestions!",
      })
    }, 2000)
  }

  const handleUsePlan = (plan: any) => {
    setName(`${plan.title} - ${new Date().toLocaleDateString()}`)
    setBreakfast(plan.breakfast)
    setLunch(plan.lunch)
    setDinner(plan.dinner)
    setSnacks(plan.snacks)

    toast({
      title: "Plan Selected",
      description: "The meal plan has been added to your form. You can now save it!",
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6 pt-20">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Diet Planner</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChefHat className="mr-2 h-4 w-4" />
                Customize
              </Button>
            </div>
          </div>

          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="manual">Manual Planner</TabsTrigger>
              <TabsTrigger value="suggestions">Auto Suggestions</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <form onSubmit={handleCreateDietPlan}>
                    <CardHeader>
                      <CardTitle>Create Meal Plan</CardTitle>
                      <CardDescription>Enter your meals for today</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="plan-name">Plan Name</Label>
                        <Input
                          id="plan-name"
                          placeholder="e.g., Monday's Meals"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="breakfast">Breakfast</Label>
                        <Input
                          id="breakfast"
                          placeholder="e.g., Oatmeal with fruits"
                          value={breakfast}
                          onChange={(e) => setBreakfast(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lunch">Lunch</Label>
                        <Input
                          id="lunch"
                          placeholder="e.g., Chicken salad sandwich"
                          value={lunch}
                          onChange={(e) => setLunch(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dinner">Dinner</Label>
                        <Input
                          id="dinner"
                          placeholder="e.g., Grilled salmon with vegetables"
                          value={dinner}
                          onChange={(e) => setDinner(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="snacks">Snacks</Label>
                        <Input
                          id="snacks"
                          placeholder="e.g., Greek yogurt, almonds"
                          value={snacks}
                          onChange={(e) => setSnacks(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Date (Optional)</Label>
                        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full">
                        <Save className="mr-2 h-4 w-4" />
                        Save Meal Plan
                      </Button>
                    </CardFooter>
                  </form>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Meal History</CardTitle>
                    <CardDescription>Your recent meal plans</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : dietPlans.length > 0 ? (
                      <div className="space-y-4">
                        {dietPlans.slice(0, 3).map((plan, index) => (
                          <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="border rounded-md p-4"
                          >
                            <div className="font-medium">{plan.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(plan.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-muted-foreground mt-2">
                              <div className="flex items-center">
                                <Utensils className="h-4 w-4 mr-2" />
                                <span>Breakfast: {plan.breakfast}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <Utensils className="h-4 w-4 mr-2" />
                                <span>Lunch: {plan.lunch}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <Utensils className="h-4 w-4 mr-2" />
                                <span>Dinner: {plan.dinner}</span>
                              </div>
                              {plan.snacks && (
                                <div className="flex items-center mt-1">
                                  <Utensils className="h-4 w-4 mr-2" />
                                  <span>Snacks: {plan.snacks}</span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                        {dietPlans.length > 3 && (
                          <Button variant="outline" className="w-full">
                            View All Plans
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <ChefHat className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No meal plans yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Create your first meal plan to start tracking your nutrition
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Meal Suggestions</CardTitle>
                  <CardDescription>Get personalized meal recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="diet-type">Diet Type</Label>
                      <Select defaultValue="balanced" value={dietType} onValueChange={setDietType}>
                        <SelectTrigger id="diet-type">
                          <SelectValue placeholder="Select diet type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="balanced">Balanced</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                          <SelectItem value="high-protein">High Protein</SelectItem>
                          <SelectItem value="low-carb">Low Carb</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Select defaultValue="none" value={allergies} onValueChange={setAllergies}>
                        <SelectTrigger id="allergies">
                          <SelectValue placeholder="Select allergies" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="gluten">Gluten</SelectItem>
                          <SelectItem value="dairy">Dairy</SelectItem>
                          <SelectItem value="nuts">Nuts</SelectItem>
                          <SelectItem value="shellfish">Shellfish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget</Label>
                      <Select defaultValue="medium" value={budget} onValueChange={setBudget}>
                        <SelectTrigger id="budget">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (₹)</SelectItem>
                          <SelectItem value="medium">Medium (₹₹)</SelectItem>
                          <SelectItem value="high">High (₹₹₹)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cooking-time">Cooking Time</Label>
                      <Select defaultValue="medium" value={cookingTime} onValueChange={setCookingTime}>
                        <SelectTrigger id="cooking-time">
                          <SelectValue placeholder="Select cooking time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quick">Quick (&lt; 15 min)</SelectItem>
                          <SelectItem value="medium">Medium (15-30 min)</SelectItem>
                          <SelectItem value="long">Long (&gt; 30 min)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleGenerateMealPlan} disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      "Generate Meal Plan"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {generatedPlans.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {generatedPlans.map((plan, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center space-x-2">
                            <div className="rounded-full w-8 h-8 flex items-center justify-center bg-primary/10">
                              {plan.icon}
                            </div>
                            <CardTitle>{plan.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium">Breakfast</p>
                              <p className="text-xs text-muted-foreground">{plan.breakfast}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Lunch</p>
                              <p className="text-xs text-muted-foreground">{plan.lunch}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Dinner</p>
                              <p className="text-xs text-muted-foreground">{plan.dinner}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Snacks</p>
                              <p className="text-xs text-muted-foreground">{plan.snacks}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm" className="w-full" onClick={() => handleUsePlan(plan)}>
                            Use This Plan
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Nutrition Tips</CardTitle>
              <CardDescription>Healthy eating habits for students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Apple className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Stay Hydrated</p>
                    <p className="text-sm text-muted-foreground">
                      Drink at least 8 glasses of water daily, especially during study sessions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Fish className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Brain Foods</p>
                    <p className="text-sm text-muted-foreground">
                      Include fatty fish, blueberries, and nuts in your diet to boost brain function.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Beef className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Protein for Focus</p>
                    <p className="text-sm text-muted-foreground">
                      Consume adequate protein to maintain focus and energy throughout the day.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
