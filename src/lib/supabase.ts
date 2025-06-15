
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase: SupabaseClient;
let supabaseError: string | null = null;

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = "Credenciais do Supabase não configuradas. Por favor, reconecte seu projeto ao Supabase nas configurações para injetar as chaves de API.";
  console.error(errorMessage);
  supabaseError = errorMessage;
  // Cria um cliente dummy para evitar que a aplicação quebre.
  // Todas as operações do Supabase falharão, o que é esperado.
  supabase = createClient('https://dummy.url', 'dummy.key', {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase, supabaseError }
