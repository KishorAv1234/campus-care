import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, Calendar, Users, Heart, Target } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              🎓 Welcome to Campus Care
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Complete Student Life Platform
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Manage your academics, health, social connections, and productivity all in one place. Built specifically
              for modern students.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link href="/marketplace">Explore Marketplace</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Everything You Need</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive tools designed to enhance every aspect of your student experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Academic Management */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Academic Excellence</CardTitle>
                <CardDescription>
                  Track assignments, manage study schedules, and access course materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Assignment tracking</li>
                  <li>• Study planner</li>
                  <li>• Grade monitoring</li>
                  <li>• Course resources</li>
                </ul>
              </CardContent>
            </Card>

            {/* Health & Wellness */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Health & Wellness</CardTitle>
                <CardDescription>Monitor your physical and mental health with personalized plans</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Diet planning</li>
                  <li>• Exercise tracking</li>
                  <li>• Mental health resources</li>
                  <li>• Sleep monitoring</li>
                </ul>
              </CardContent>
            </Card>

            {/* Social Connections */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Social Hub</CardTitle>
                <CardDescription>Connect with peers, join study groups, and build lasting friendships</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Study groups</li>
                  <li>• Event planning</li>
                  <li>• Peer connections</li>
                  <li>• Community forums</li>
                </ul>
              </CardContent>
            </Card>

            {/* Productivity Tools */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Productivity Boost</CardTitle>
                <CardDescription>Advanced tools to maximize your efficiency and achieve your goals</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Pomodoro timer</li>
                  <li>• Goal tracking</li>
                  <li>• Time management</li>
                  <li>• Progress analytics</li>
                </ul>
              </CardContent>
            </Card>

            {/* Marketplace */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <CardTitle>Book Marketplace</CardTitle>
                <CardDescription>Buy, sell, and exchange textbooks with fellow students</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Buy/sell textbooks</li>
                  <li>• Free book access</li>
                  <li>• Price comparison</li>
                  <li>• Secure payments</li>
                </ul>
              </CardContent>
            </Card>

            {/* Calendar & Events */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle>Smart Calendar</CardTitle>
                <CardDescription>Never miss important dates with intelligent scheduling</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Event management</li>
                  <li>• Deadline tracking</li>
                  <li>• Smart reminders</li>
                  <li>• Calendar sync</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-green-600">50K+</div>
              <div className="text-gray-600 dark:text-gray-400">Books Exchanged</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-purple-600">95%</div>
              <div className="text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Student Life?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join thousands of students who are already using Campus Care to excel in their academic journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <Link href="/register">Start Free Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
