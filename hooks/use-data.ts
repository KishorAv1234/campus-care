"use client"

import { useState, useEffect } from "react"

// Simple data fetching hook without external dependencies
export function useData<T>(key: string, fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await fetchFn()
      setData(result)
    } catch (err) {
      console.error(`Error fetching data for ${key}:`, err)
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [key])

  const mutate = () => {
    fetchData()
  }

  return { data, isLoading, error, mutate }
}
