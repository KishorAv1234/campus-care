import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, BookOpen, FileQuestion, Brain, Lightbulb } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Chat } from "./chat"

export default function Assistant() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">AI Study Assistant</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common assistant tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Summarize Notes
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileQuestion className="mr-2 h-4 w-4" />
                    Generate Quiz
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Brain className="mr-2 h-4 w-4" />
                    Explain Concept
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    Explain Concept
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Study Plan
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                      <span>Calculus Integration</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                      <span>Python Programming</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                      <span>Essay Structure</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                      <span>Chemistry Formulas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3">
              <Card className="h-[calc(100vh-12rem)]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="mr-2 h-5 w-5" />
                    Chat with AI Assistant
                  </CardTitle>
                  <CardDescription>Ask questions about your coursework or get help with assignments</CardDescription>
                </CardHeader>
                <CardContent className="p-0 h-[calc(100vh-20rem)]">
                  <Chat />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
