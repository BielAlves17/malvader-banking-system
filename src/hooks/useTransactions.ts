
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface Transaction {
  id: string;
  amount: number;
  type: 'DEPOSITO' | 'SAQUE' | 'TRANSFERENCIA';
  description: string | null;
  from_account_id: string | null;
  to_account_id: string | null;
  created_by: string;
  created_at: string;
}

export const useTransactions = (limit?: number) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['transactions', user?.id, limit],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      console.log('Fetching transactions for user:', user.id);
      
      let query = supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching transactions:', error);
        throw error;
      }

      console.log('Transactions fetched:', data);
      return data as Transaction[];
    },
    enabled: !!user,
  });
};
