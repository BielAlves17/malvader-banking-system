
import { createClient } from '@supabase/supabase-js'

// The Supabase URL and Anon Key are expected to be available as environment variables.
// The Lovable platform injects these automatically when you connect a Supabase project.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
