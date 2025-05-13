"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  index: number
}

export function FeatureCard({ icon, title, description, href, index }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-2 transition-colors duration-300 hover:border-primary/50">
        <CardHeader className="pb-2">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className="mb-2 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10"
          >
            {icon}
          </motion.div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-base">{description}</CardDescription>
          <Link href={href}>
            <Button variant="ghost" className="p-0 h-auto font-medium text-primary group">
              Learn more
              <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.div>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
