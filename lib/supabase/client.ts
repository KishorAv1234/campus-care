"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/supabase/types"

// Singleton instance of Supabase client
let supabaseClient: ReturnType<typeof createClientComponentClient<Database>> | null = null

/**
 * Creates a new Supabase client for client components
 * Use this when you need a fresh client instance
 */
export function createClientSupabaseClient() {
  return createClientComponentClient<Database>()
}

/**
 * Gets or creates a singleton Supabase client instance
 * Use this for consistent client usage across components
 */
export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClientComponentClient<Database>()
  }
  return supabaseClient
}
