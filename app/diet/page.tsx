import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChefHat, Utensils, Apple, Carrot, Fish, Beef, Egg } from "lucide-react"
import Link from "next/link"

export default function DietPlanner() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">Campus Care</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
              <Link href="/diet" className="transition-colors hover:text-foreground/80 text-foreground">
                Diet
              </Link>
              <Link href="/marketplace" className="transition-colors hover:text-foreground/80">
                Marketplace
              </Link>
              <Link href="/learning" className="transition-colors hover:text-foreground/80">
                Learning
              </Link>
              <Link href="/tools" className="transition-colors hover:text-foreground/80">
                Tools
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" size="sm">
              <span className="sr-only">Profile</span>
              <span className="rounded-full bg-muted h-8 w-8 flex items-center justify-center">JS</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
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
              <Card>
                <CardHeader>
                  <CardTitle>Today's Meal Plan</CardTitle>
                  <CardDescription>Enter your meals for today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="breakfast">Breakfast</Label>
                    <Input id="breakfast" placeholder="e.g., Oatmeal with fruits" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lunch">Lunch</Label>
                    <Input id="lunch" placeholder="e.g., Chicken salad sandwich" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dinner">Dinner</Label>
                    <Input id="dinner" placeholder="e.g., Grilled salmon with vegetables" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="snacks">Snacks</Label>
                    <Input id="snacks" placeholder="e.g., Greek yogurt, almonds" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Meal Plan</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Meal History</CardTitle>
                  <CardDescription>Your recent meal plans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="font-medium">May 12, 2025</div>
                      <div className="text-sm text-muted-foreground mt-2">
                        <div className="flex items-center">
                          <Utensils className="h-4 w-4 mr-2" />
                          <span>Breakfast: Avocado toast with eggs</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Utensils className="h-4 w-4 mr-2" />
                          <span>Lunch: Quinoa bowl with vegetables</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Utensils className="h-4 w-4 mr-2" />
                          <span>Dinner: Pasta with tomato sauce</span>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="font-medium">May 11, 2025</div>
                      <div className="text-sm text-muted-foreground mt-2">
                        <div className="flex items-center">
                          <Utensils className="h-4 w-4 mr-2" />
                          <span>Breakfast: Smoothie bowl</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Utensils className="h-4 w-4 mr-2" />
                          <span>Lunch: Chicken wrap</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Utensils className="h-4 w-4 mr-2" />
                          <span>Dinner: Stir-fry vegetables with tofu</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                      <Select defaultValue="balanced">
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
                      <Select defaultValue="none">
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
                      <Select defaultValue="medium">
                        <SelectTrigger id="budget">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low ($)</SelectItem>
                          <SelectItem value="medium">Medium ($$)</SelectItem>
                          <SelectItem value="high">High ($$$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cooking-time">Cooking Time</Label>
                      <Select defaultValue="medium">
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
                  <Button className="w-full">Generate Meal Plan</Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MealCard
                  title="Vegetarian Plan"
                  icon={<Carrot className="h-6 w-6" />}
                  breakfast="Oatmeal with fruits and nuts"
                  lunch="Quinoa salad with roasted vegetables"
                  dinner="Lentil soup with whole grain bread"
                  snacks="Greek yogurt with honey, Mixed nuts"
                />
                <MealCard
                  title="High Protein Plan"
                  icon={<Egg className="h-6 w-6" />}
                  breakfast="Scrambled eggs with spinach"
                  lunch="Grilled chicken salad"
                  dinner="Salmon with steamed broccoli"
                  snacks="Protein shake, Cottage cheese"
                />
                <MealCard
                  title="Budget Friendly"
                  icon={<Apple className="h-6 w-6" />}
                  breakfast="Peanut butter toast"
                  lunch="Rice and beans bowl"
                  dinner="Pasta with vegetables"
                  snacks="Banana, Popcorn"
                />
              </div>
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
    </div>
  )
}

function MealCard({
  title,
  icon,
  breakfast,
  lunch,
  dinner,
  snacks,
}: {
  title: string
  icon: React.ReactNode
  breakfast: string
  lunch: string
  dinner: string
  snacks: string
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <div className="rounded-full w-8 h-8 flex items-center justify-center bg-primary/10">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium">Breakfast</p>
            <p className="text-xs text-muted-foreground">{breakfast}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Lunch</p>
            <p className="text-xs text-muted-foreground">{lunch}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Dinner</p>
            <p className="text-xs text-muted-foreground">{dinner}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Snacks</p>
            <p className="text-xs text-muted-foreground">{snacks}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Use This Plan
        </Button>
      </CardFooter>
    </Card>
  )
}
