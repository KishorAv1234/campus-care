"use client"

import { useState } from "react"

type ToastType = "default" | "success" | "error" | "warning" | "destructive"

type Toast = {
  id: string
  title: string
  description?: string
  variant?: ToastType
}

type ToastOptions = {
  title: string
  description?: string
  variant?: ToastType
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant || "default",
    }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 5000)

    return id
  }

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return { toast, dismiss, toasts }
}
