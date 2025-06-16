
export interface Profile {
  id: string;
  full_name: string;
  role: string; // Changed from 'cliente' | 'funcionario' to string to match database
  created_at?: string;
  updated_at?: string;
}
