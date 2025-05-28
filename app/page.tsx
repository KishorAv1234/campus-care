import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Calendar, Utensils, FileText } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Your Complete Campus Companion</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-10">
              Access study materials, manage events, plan your diet, and connect with fellow students - all in one
              place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/marketplace">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Everything You Need</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Campus.Care provides all the tools and resources you need for a successful academic journey.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Study Materials</h3>
                <p className="text-muted-foreground mb-4">
                  Access a vast library of books, notes, and study resources for all your courses.
                </p>
                <Link
                  href="/marketplace"
                  className="text-sm font-medium text-primary hover:underline inline-flex items-center"
                >
                  Explore Materials
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Event Management</h3>
                <p className="text-muted-foreground mb-4">
                  Keep track of important dates, deadlines, and campus events all in one place.
                </p>
                <Link
                  href="/events"
                  className="text-sm font-medium text-primary hover:underline inline-flex items-center"
                >
                  View Events
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Diet Planning</h3>
                <p className="text-muted-foreground mb-4">
                  Create and follow healthy meal plans tailored to your dietary needs and preferences.
                </p>
                <Link
                  href="/diet-plans"
                  className="text-sm font-medium text-primary hover:underline inline-flex items-center"
                >
                  Explore Diet Plans
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Note Taking</h3>
                <p className="text-muted-foreground mb-4">
                  Create, organize, and share your notes with classmates for better collaboration.
                </p>
                <Link
                  href="/notes"
                  className="text-sm font-medium text-primary hover:underline inline-flex items-center"
                >
                  Start Taking Notes
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Get Started?</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Join thousands of students who are already using Campus.Care to enhance their academic experience.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Sign Up Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
