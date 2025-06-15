
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface Account {
  id: string;
  account_number: string;
  account_type: 'CORRENTE' | 'POUPANCA';
  balance: number;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export const useAccounts = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['accounts', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      console.log('Fetching accounts for user:', user.id);
      
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching accounts:', error);
        throw error;
      }

      console.log('Accounts fetched:', data);
      return data as Account[];
    },
    enabled: !!user,
  });
};
