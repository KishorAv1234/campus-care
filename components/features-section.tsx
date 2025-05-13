"use client"

import { motion } from "framer-motion"
import { FeatureCard } from "@/components/feature-card"
import {
  BookOpen,
  Calendar,
  ChefHat,
  ShoppingBag,
  Gamepad2,
  FileQuestion,
  Wrench,
  Bot,
  HeartPulse,
  Users,
  Award,
  FileText,
} from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Personal Dashboard",
      description: "Track daily goals with progress bars and streak systems to stay motivated.",
      href: "/dashboard",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Calendar Integration",
      description: "Auto-reminders for events and deadlines to never miss important dates.",
      href: "/calendar",
    },
    {
      icon: <ChefHat className="h-6 w-6" />,
      title: "Healthy Diet Plans",
      description: "Customizable meal planner based on preferences, allergies, and budget.",
      href: "/diet",
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Dropshipping Marketplace",
      description: "Buy and sell handwritten notes, past papers, and books with other students.",
      href: "/marketplace",
    },
    {
      icon: <Gamepad2 className="h-6 w-6" />,
      title: "Gamified Learning",
      description: "Typing games, flashcard quizzes, and adventure-style Q&A with XP system.",
      href: "/learning",
    },
    {
      icon: <FileQuestion className="h-6 w-6" />,
      title: "Quiz Generator",
      description: "Upload notes and auto-generate quizzes using AI for effective studying.",
      href: "/quiz",
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Library of Tools",
      description: "Curated links for coding help, file converters, plagiarism checkers, and more.",
      href: "/tools",
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI-Powered Study Assistant",
      description: "ChatGPT integration for doubt solving, note summarization, and project help.",
      href: "/ai-assistant",
    },
    {
      icon: <HeartPulse className="h-6 w-6" />,
      title: "Mood Tracker",
      description: "Daily check-ins, mindfulness exercises, and campus counseling links.",
      href: "/mood",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaboration Space",
      description: "Team planner for group projects with shared notes and chatrooms.",
      href: "/collaboration",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Volunteer & Event Board",
      description: "Campus events, volunteering opportunities, and workshop listings.",
      href: "/events",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Resume Builder",
      description: "Auto CV generator and internship/job recommendations for students.",
      href: "/resume",
    },
  ]

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to succeed in your academic journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              href={feature.href}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
