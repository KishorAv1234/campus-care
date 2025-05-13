import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Gamepad2, FileQuestion, Brain, Trophy, Upload, Clock, Zap, BookOpen } from "lucide-react"
import Link from "next/link"

export default function Learning() {
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
              <Link href="/diet" className="transition-colors hover:text-foreground/80">
                Diet
              </Link>
              <Link href="/marketplace" className="transition-colors hover:text-foreground/80">
                Marketplace
              </Link>
              <Link href="/learning" className="transition-colors hover:text-foreground/80 text-foreground">
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
            <h1 className="text-3xl font-bold tracking-tight">Learning Center</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Trophy className="mr-2 h-4 w-4" />
                Leaderboard
              </Button>
            </div>
          </div>

          <Tabs defaultValue="games" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="games">Gamified Learning</TabsTrigger>
              <TabsTrigger value="quizzes">Quiz Generator</TabsTrigger>
            </TabsList>

            <TabsContent value="games" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary/10">
                        <Gamepad2 className="h-5 w-5" />
                      </div>
                      <CardTitle>Typing Master</CardTitle>
                    </div>
                    <CardDescription>Improve your typing speed and accuracy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Current WPM</span>
                        <span className="font-medium">65</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Accuracy</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">High Score</span>
                        <span className="font-medium">78 WPM</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Play Now</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary/10">
                        <Brain className="h-5 w-5" />
                      </div>
                      <CardTitle>Flashcard Challenge</CardTitle>
                    </div>
                    <CardDescription>Test your knowledge with flashcards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Available Decks</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Cards Mastered</span>
                        <span className="font-medium">156</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Streak</span>
                        <span className="font-medium">5 days</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start Practice</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary/10">
                        <Zap className="h-5 w-5" />
                      </div>
                      <CardTitle>Knowledge Quest</CardTitle>
                    </div>
                    <CardDescription>Adventure-style learning game</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Current Level</span>
                        <span className="font-medium">7</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">XP Points</span>
                        <span className="font-medium">1,250</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Achievements</span>
                        <span className="font-medium">8/15</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Continue Quest</Button>
                  </CardFooter>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Your Learning Stats</CardTitle>
                  <CardDescription>Track your progress across all games</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Total XP</p>
                        <p className="text-2xl font-bold">3,750</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Weekly Streak</p>
                        <p className="text-2xl font-bold">12 days</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Badges Earned</p>
                        <p className="text-2xl font-bold">15</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Rank</p>
                        <p className="text-2xl font-bold">Gold</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Recent Achievements</p>
                      <div className="flex space-x-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Trophy className="h-5 w-5" />
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Brain className="h-5 w-5" />
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Zap className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI Quiz Generator</CardTitle>
                  <CardDescription>Upload your notes and generate quizzes automatically</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <label htmlFor="notes-upload" className="text-sm font-medium">
                        Upload Notes
                      </label>
                      <div className="flex items-center gap-2">
                        <Input id="notes-upload" type="file" />
                        <Button size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX, TXT (Max 10MB)</p>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="notes-text" className="text-sm font-medium">
                        Or paste your notes here
                      </label>
                      <Textarea
                        id="notes-text"
                        placeholder="Paste your study notes here..."
                        className="min-h-[150px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quiz Options</label>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                          Multiple Choice
                        </Button>
                        <Button variant="outline" size="sm">
                          True/False
                        </Button>
                        <Button variant="outline" size="sm">
                          Fill in the Blank
                        </Button>
                        <Button variant="outline" size="sm">
                          Short Answer
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Difficulty Level</label>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Easy
                        </Button>
                        <Button variant="outline" size="sm">
                          Medium
                        </Button>
                        <Button variant="outline" size="sm">
                          Hard
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full">Generate Quiz</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary/10">
                        <FileQuestion className="h-5 w-5" />
                      </div>
                      <CardTitle>Recent Quizzes</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2">
                        <div className="space-y-1">
                          <p className="font-medium">Biology Chapter 5</p>
                          <p className="text-xs text-muted-foreground">15 questions • Created 2 days ago</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <div className="space-y-1">
                          <p className="font-medium">History Midterm Review</p>
                          <p className="text-xs text-muted-foreground">25 questions • Created 5 days ago</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">Math Formulas</p>
                          <p className="text-xs text-muted-foreground">10 questions • Created 1 week ago</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary/10">
                        <Clock className="h-5 w-5" />
                      </div>
                      <CardTitle>Practice Mode</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Practice with your generated quizzes or try our pre-made quiz sets.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Study Mode</p>
                          <Button variant="outline" size="sm">
                            Start
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Review questions with answers and explanations</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Timed Quiz</p>
                          <Button variant="outline" size="sm">
                            Start
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Test yourself with time constraints</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Exam Simulation</p>
                          <Button variant="outline" size="sm">
                            Start
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Full exam experience with mixed question types</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Study Tips</CardTitle>
                  <CardDescription>Maximize your learning efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Spaced Repetition</p>
                        <p className="text-sm text-muted-foreground">
                          Review material at increasing intervals to improve long-term retention.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                        <Brain className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Active Recall</p>
                        <p className="text-sm text-muted-foreground">
                          Test yourself frequently rather than passively reviewing notes.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Pomodoro Technique</p>
                        <p className="text-sm text-muted-foreground">
                          Study in focused 25-minute intervals with short breaks in between.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
