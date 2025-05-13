import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/supabase/types"

/**
 * Creates a new Supabase client for server components
 */
export function createServerSupabaseClient() {
  return createServerComponentClient<Database>({ cookies })
}
