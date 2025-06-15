
import { createClient } from '@supabase/supabase-js'

// The Supabase URL and Anon Key are expected to be available as environment variables.
// The Lovable platform injects these automatically when you connect a Supabase project.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase credentials are not configured. Please ensure your project is correctly connected to Supabase in the project settings.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

