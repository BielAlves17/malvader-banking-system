
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useAccounts } from '@/hooks/useAccounts';
import { useTransactions } from '@/hooks/useTransactions';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Clock, PiggyBank, BarChart3, Eye } from 'lucide-react';

const ClienteDashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { data: accounts = [], isLoading: accountsLoading } = useAccounts();
  const { data: transactions = [], isLoading: transactionsLoading } = useTransactions(5);

  // Calculate total balance from all accounts
  const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance), 0);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Format transaction type for display
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'DEPOSITO':
        return <ArrowDownLeft className="h-5 w-5 text-green-600" />;
      case 'SAQUE':
        return <ArrowUpRight className="h-5 w-5 text-red-600" />;
      case 'TRANSFERENCIA':
        return <ArrowUpRight className="h-5 w-5 text-blue-600" />;
      default:
        return <ArrowUpRight className="h-5 w-5 text-gray-600" />;
    }
  };

  if (accountsLoading || transactionsLoading) {
    return (
      <Layout title="Carregando...">
        <div className="flex items-center justify-center p-8">
          <p>Carregando dados...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Olá, ${profile?.full_name || user?.email || 'Cliente'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
            <p className="text-xs text-muted-foreground">
              Atualizado em: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transações este mês</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
            <p className="text-xs text-muted-foreground">Transações recentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas Ativas</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.length}</div>
            <p className="text-xs text-muted-foreground">Contas bancárias</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Minhas Contas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accounts.length === 0 ? (
                <div className="text-center p-4">
                  <p className="text-muted-foreground">Nenhuma conta encontrada</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Entre em contato com um funcionário para criar sua primeira conta
                  </p>
                </div>
              ) : (
                accounts.map((account) => (
                  <div key={account.id} className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-banco-600" />
                        <h3 className="font-semibold">
                          {account.account_type === 'CORRENTE' ? 'Conta Corrente' : 'Conta Poupança'}
                        </h3>
                      </div>
                      <span className="text-xs bg-banco-100 text-banco-800 py-1 px-2 rounded-full">
                        {account.account_number}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Saldo Disponível</p>
                        <p className="text-xl font-bold">{formatCurrency(Number(account.balance))}</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-2">
                        <Eye className="h-4 w-4 mr-1" /> Detalhes
                      </Button>
                    </div>
                  </div>
                ))
              )}
              {accounts.length > 0 && (
                <div className="flex justify-center mt-4">
                  <Button className="bg-banco-600 hover:bg-banco-700" onClick={() => navigate('/minhas-contas')}>
                    Ver Todas as Contas
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.length === 0 ? (
                <div className="text-center p-4">
                  <p className="text-muted-foreground">Nenhuma transação encontrada</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Suas transações aparecerão aqui
                  </p>
                </div>
              ) : (
                transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border-b">
                    <div className="flex items-center">
                      <div className="mr-3 bg-gray-100 p-2 rounded-full">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description || 'Transação'}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(transaction.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className={`text-right ${transaction.type === 'DEPOSITO' ? 'text-green-600' : 'text-red-600'}`}>
                      <p className="font-semibold">
                        {transaction.type === 'DEPOSITO' ? '+' : '-'} {formatCurrency(Number(transaction.amount))}
                      </p>
                      <p className="text-xs">{transaction.type}</p>
                    </div>
                  </div>
                ))
              )}
              {transactions.length > 0 && (
                <div className="flex justify-center mt-4">
                  <Button variant="outline" onClick={() => navigate('/extrato')}>
                    Ver Extrato Completo
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="flex items-center justify-center p-6 bg-banco-600 hover:bg-banco-700">
          <ArrowUpRight className="h-5 w-5 mr-2" /> Nova Transferência
        </Button>
        <Button className="flex items-center justify-center p-6 bg-banco-600 hover:bg-banco-700">
          <ArrowDownLeft className="h-5 w-5 mr-2" /> Depósito
        </Button>
        <Button className="flex items-center justify-center p-6 bg-banco-600 hover:bg-banco-700">
          <Eye className="h-5 w-5 mr-2" /> Consultar Limite
        </Button>
      </div>
    </Layout>
  );
};

export default ClienteDashboard;
