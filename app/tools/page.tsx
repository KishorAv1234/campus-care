import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Wrench, Code, FileText, Calculator, Search, ExternalLink, BookmarkPlus, Star } from "lucide-react"
import Link from "next/link"

export default function Tools() {
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
              <Link href="/learning" className="transition-colors hover:text-foreground/80">
                Learning
              </Link>
              <Link href="/tools" className="transition-colors hover:text-foreground/80 text-foreground">
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
            <h1 className="text-3xl font-bold tracking-tight">Resource Library</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <BookmarkPlus className="mr-2 h-4 w-4" />
                Suggest Resource
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search for tools and resources..." className="pl-10" />
            </div>
          </div>

          <Tabs defaultValue="coding" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="coding">Coding</TabsTrigger>
              <TabsTrigger value="writing">Writing</TabsTrigger>
              <TabsTrigger value="math">Math</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>

            <TabsContent value="coding" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ToolCard
                  title="GitHub Copilot"
                  description="AI-powered code completion tool that helps you write code faster."
                  url="https://github.com/features/copilot"
                  category="AI Coding"
                  icon={<Code className="h-6 w-6" />}
                  rating={4.9}
                />
                <ToolCard
                  title="Stack Overflow"
                  description="Community-driven Q&A platform for programmers to find solutions."
                  url="https://stackoverflow.com"
                  category="Community"
                  icon={<Code className="h-6 w-6" />}
                  rating={4.8}
                />
                <ToolCard
                  title="CodePen"
                  description="Online code editor for front-end developers to test and showcase HTML, CSS, and JavaScript."
                  url="https://codepen.io"
                  category="Web Dev"
                  icon={<Code className="h-6 w-6" />}
                  rating={4.7}
                />
                <ToolCard
                  title="LeetCode"
                  description="Platform to help you enhance your coding skills and prepare for technical interviews."
                  url="https://leetcode.com"
                  category="Practice"
                  icon={<Code className="h-6 w-6" />}
                  rating={4.6}
                />
                <ToolCard
                  title="W3Schools"
                  description="Educational website for learning web technologies including HTML, CSS, JavaScript, and more."
                  url="https://www.w3schools.com"
                  category="Learning"
                  icon={<Code className="h-6 w-6" />}
                  rating={4.5}
                />
                <ToolCard
                  title="GitHub"
                  description="Platform for version control and collaboration for software projects."
                  url="https://github.com"
                  category="Version Control"
                  icon={<Code className="h-6 w-6" />}
                  rating={4.9}
                />
              </div>
            </TabsContent>

            <TabsContent value="writing" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ToolCard
                  title="Grammarly"
                  description="AI-powered writing assistant that helps you write clear, mistake-free text."
                  url="https://www.grammarly.com"
                  category="Grammar"
                  icon={<FileText className="h-6 w-6" />}
                  rating={4.8}
                />
                <ToolCard
                  title="Hemingway Editor"
                  description="Makes your writing bold and clear by highlighting complex sentences and common errors."
                  url="https://hemingwayapp.com"
                  category="Editing"
                  icon={<FileText className="h-6 w-6" />}
                  rating={4.6}
                />
                <ToolCard
                  title="Quillbot"
                  description="AI-powered paraphrasing tool to rewrite and enhance any sentence, paragraph, or article."
                  url="https://quillbot.com"
                  category="Paraphrasing"
                  icon={<FileText className="h-6 w-6" />}
                  rating={4.7}
                />
                <ToolCard
                  title="Notion"
                  description="All-in-one workspace for notes, tasks, wikis, and databases."
                  url="https://www.notion.so"
                  category="Notes"
                  icon={<FileText className="h-6 w-6" />}
                  rating={4.9}
                />
                <ToolCard
                  title="Zotero"
                  description="Free, easy-to-use tool to help you collect, organize, and cite research."
                  url="https://www.zotero.org"
                  category="Citations"
                  icon={<FileText className="h-6 w-6" />}
                  rating={4.7}
                />
                <ToolCard
                  title="Turnitin"
                  description="Plagiarism detection service used by educational institutions."
                  url="https://www.turnitin.com"
                  category="Plagiarism"
                  icon={<FileText className="h-6 w-6" />}
                  rating={4.5}
                />
              </div>
            </TabsContent>

            <TabsContent value="math" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ToolCard
                  title="Wolfram Alpha"
                  description="Computational intelligence engine that answers factual queries by computing answers."
                  url="https://www.wolframalpha.com"
                  category="Computation"
                  icon={<Calculator className="h-6 w-6" />}
                  rating={4.9}
                />
                <ToolCard
                  title="Desmos"
                  description="Advanced graphing calculator implemented as a web application and mobile app."
                  url="https://www.desmos.com"
                  category="Graphing"
                  icon={<Calculator className="h-6 w-6" />}
                  rating={4.8}
                />
                <ToolCard
                  title="GeoGebra"
                  description="Dynamic mathematics software for all levels of education that brings together geometry, algebra, spreadsheets, graphing, statistics and calculus."
                  url="https://www.geogebra.org"
                  category="Interactive"
                  icon={<Calculator className="h-6 w-6" />}
                  rating={4.7}
                />
                <ToolCard
                  title="Symbolab"
                  description="Step-by-step calculator for various math topics including calculus, algebra, and trigonometry."
                  url="https://www.symbolab.com"
                  category="Step-by-Step"
                  icon={<Calculator className="h-6 w-6" />}
                  rating={4.6}
                />
                <ToolCard
                  title="Khan Academy"
                  description="Free educational platform with lessons and practice exercises in math, science, and more."
                  url="https://www.khanacademy.org"
                  category="Learning"
                  icon={<Calculator className="h-6 w-6" />}
                  rating={4.9}
                />
                <ToolCard
                  title="Mathway"
                  description="Problem-solving resource that can tackle everything from basic math to calculus."
                  url="https://www.mathway.com"
                  category="Problem Solving"
                  icon={<Calculator className="h-6 w-6" />}
                  rating={4.5}
                />
              </div>
            </TabsContent>

            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ToolCard
                  title="Google Scholar"
                  description="Search engine for scholarly literature across many disciplines and sources."
                  url="https://scholar.google.com"
                  category="Research"
                  icon={<Search className="h-6 w-6" />}
                  rating={4.9}
                />
                <ToolCard
                  title="Canva"
                  description="Graphic design platform used to create social media graphics, presentations, posters, and other visual content."
                  url="https://www.canva.com"
                  category="Design"
                  icon={<Wrench className="h-6 w-6" />}
                  rating={4.8}
                />
                <ToolCard
                  title="Trello"
                  description="Collaboration tool that organizes your projects into boards to help you stay organized."
                  url="https://trello.com"
                  category="Organization"
                  icon={<Wrench className="h-6 w-6" />}
                  rating={4.7}
                />
                <ToolCard
                  title="Evernote"
                  description="App designed for note taking, organizing, task management, and archiving."
                  url="https://evernote.com"
                  category="Notes"
                  icon={<FileText className="h-6 w-6" />}
                  rating={4.6}
                />
                <ToolCard
                  title="Mendeley"
                  description="Reference manager and academic social network that helps organize research."
                  url="https://www.mendeley.com"
                  category="Citations"
                  icon={<FileText className="h-6 w-6" />}
                  rating={4.5}
                />
                <ToolCard
                  title="Pomodoro Timer"
                  description="Time management method to break work into intervals, traditionally 25 minutes in length, separated by short breaks."
                  url="https://pomofocus.io"
                  category="Productivity"
                  icon={<Wrench className="h-6 w-6" />}
                  rating={4.7}
                />
              </div>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Resource Recommendations</CardTitle>
              <CardDescription>Based on your recent activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Code className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <p className="font-medium">freeCodeCamp</p>
                      <Badge variant="outline" className="ml-2">
                        Coding
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Free coding curriculum with certifications in web development, data science, and more.
                    </p>
                    <div className="flex items-center pt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 fill-current text-yellow-500" />
                        ))}
                      </div>
                      <a
                        href="https://www.freecodecamp.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-xs text-blue-500 hover:underline flex items-center"
                      >
                        Visit <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <p className="font-medium">Overleaf</p>
                      <Badge variant="outline" className="ml-2">
                        Writing
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Online LaTeX editor for academic papers, theses, and technical documents.
                    </p>
                    <div className="flex items-center pt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 fill-current text-yellow-500" />
                        ))}
                      </div>
                      <a
                        href="https://www.overleaf.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-xs text-blue-500 hover:underline flex items-center"
                      >
                        Visit <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <p className="font-medium">MIT OpenCourseWare</p>
                      <Badge variant="outline" className="ml-2">
                        Learning
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Free web-based publication of virtually all MIT course content.
                    </p>
                    <div className="flex items-center pt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 fill-current text-yellow-500" />
                        ))}
                      </div>
                      <a
                        href="https://ocw.mit.edu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-xs text-blue-500 hover:underline flex items-center"
                      >
                        Visit <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
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

function ToolCard({
  title,
  description,
  url,
  category,
  icon,
  rating,
}: {
  title: string
  description: string
  url: string
  category: string
  icon: React.ReactNode
  rating: number
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="rounded-full w-8 h-8 flex items-center justify-center bg-primary/10">{icon}</div>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          <Badge variant="outline">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-2 flex items-center">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${star <= Math.round(rating) ? "fill-current text-yellow-500" : "text-muted"}`}
              />
            ))}
          </div>
          <span className="text-xs ml-1">{rating.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <a href={url} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button variant="outline" size="sm" className="w-full">
            Visit Website
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}
