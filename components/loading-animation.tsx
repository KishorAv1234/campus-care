"use client"

import { motion } from "framer-motion"

export function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative h-16 w-16">
        <motion.div
          className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute top-2 left-2 h-12 w-12 rounded-full border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute top-4 left-4 h-8 w-8 rounded-full border-4 border-t-transparent border-r-transparent border-b-primary border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    </div>
  )
}
