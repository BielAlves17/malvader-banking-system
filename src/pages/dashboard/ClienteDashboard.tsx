
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Clock, PiggyBank, BarChart3, Eye } from 'lucide-react';

const ClienteDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Dados simulados das contas
  const contas = [
    {
      id: 1,
      tipo: 'CORRENTE',
      numero: '123456-7',
      saldo: 2500.75,
      limite: 1000,
    },
    {
      id: 2,
      tipo: 'POUPANCA',
      numero: '765432-1',
      saldo: 15000,
      rendimento: '0.3%',
    }
  ];

  // Dados simulados das transações recentes
  const transacoes = [
    {
      id: 1,
      descricao: 'Supermercado XYZ',
      tipo: 'SAQUE',
      valor: 150.75,
      data: '2025-05-08 14:32:15',
    },
    {
      id: 2,
      descricao: 'Transferência para João',
      tipo: 'TRANSFERENCIA',
      valor: 500,
      data: '2025-05-07 09:15:22',
    },
    {
      id: 3,
      descricao: 'Pagamento de Salário',
      tipo: 'DEPOSITO',
      valor: 3200,
      data: '2025-05-05 00:00:01',
    },
  ];

  return (
    <Layout title={`Olá, ${user?.nome || 'Cliente'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 17.500,75</div>
            <p className="text-xs text-muted-foreground">Atualizado em: 10/05/2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transações este mês</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">+5% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score de Crédito</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">780</div>
            <p className="text-xs text-muted-foreground">Bom</p>
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
              {contas.map((conta) => (
                <div key={conta.id} className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-malvader-600" />
                      <h3 className="font-semibold">{conta.tipo === 'CORRENTE' ? 'Conta Corrente' : 'Conta Poupança'}</h3>
                    </div>
                    <span className="text-xs bg-malvader-100 text-malvader-800 py-1 px-2 rounded-full">
                      {conta.numero}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Saldo Disponível</p>
                      <p className="text-xl font-bold">R$ {conta.saldo.toFixed(2)}</p>
                    </div>
                    {conta.tipo === 'CORRENTE' ? (
                      <div>
                        <p className="text-sm text-muted-foreground">Limite</p>
                        <p className="text-lg">R$ {conta.limite.toFixed(2)}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-muted-foreground">Rendimento</p>
                        <p className="text-lg">{conta.rendimento} a.m.</p>
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="ml-2">
                      <Eye className="h-4 w-4 mr-1" /> Detalhes
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex justify-center mt-4">
                <Button className="bg-malvader-600 hover:bg-malvader-700" onClick={() => navigate('/minhas-contas')}>
                  Ver Todas as Contas
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transacoes.map((transacao) => (
                <div key={transacao.id} className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center">
                    {transacao.tipo === 'DEPOSITO' ? (
                      <div className="mr-3 bg-green-100 p-2 rounded-full">
                        <ArrowDownLeft className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="mr-3 bg-red-100 p-2 rounded-full">
                        <ArrowUpRight className="h-5 w-5 text-red-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{transacao.descricao}</p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(transacao.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className={`text-right ${transacao.tipo === 'DEPOSITO' ? 'text-green-600' : 'text-red-600'}`}>
                    <p className="font-semibold">
                      {transacao.tipo === 'DEPOSITO' ? '+' : '-'} R$ {transacao.valor.toFixed(2)}
                    </p>
                    <p className="text-xs">{transacao.tipo}</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-center mt-4">
                <Button variant="outline" onClick={() => navigate('/extrato')}>
                  Ver Extrato Completo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="flex items-center justify-center p-6 bg-malvader-600 hover:bg-malvader-700">
          <ArrowUpRight className="h-5 w-5 mr-2" /> Nova Transferência
        </Button>
        <Button className="flex items-center justify-center p-6 bg-malvader-600 hover:bg-malvader-700">
          <ArrowDownLeft className="h-5 w-5 mr-2" /> Depósito
        </Button>
        <Button className="flex items-center justify-center p-6 bg-malvader-600 hover:bg-malvader-700">
          <Eye className="h-5 w-5 mr-2" /> Consultar Limite
        </Button>
      </div>
    </Layout>
  );
};

export default ClienteDashboard;
