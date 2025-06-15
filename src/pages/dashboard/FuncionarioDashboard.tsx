
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, CreditCard, AlertCircle, FileText, Clock, Plus, FileDown } from 'lucide-react';

const FuncionarioDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Layout title={`Olá, ${user?.email || 'Funcionário'}`}>
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-malvader-800 to-malvader-900 text-white border-none">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">Resumo do Dia</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col">
                <span className="text-sm opacity-75">Total de Clientes</span>
                <span className="text-3xl font-bold">324</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm opacity-75">Contas Ativas</span>
                <span className="text-3xl font-bold">512</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm opacity-75">Transações Hoje</span>
                <span className="text-3xl font-bold">87</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm opacity-75">Clientes Inadimplentes</span>
                <span className="text-3xl font-bold">15</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operações Bancárias</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/abertura-conta')}>
              <Plus className="h-4 w-4 mr-2" /> Abertura de Conta
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/encerramento-conta')}>
              <AlertCircle className="h-4 w-4 mr-2" /> Encerramento de Conta
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/consulta-conta')}>
              <CreditCard className="h-4 w-4 mr-2" /> Consulta de Conta
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/alteracao-dados')}>
              <FileText className="h-4 w-4 mr-2" /> Alteração de Dados
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gerenciamento</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/cadastro-funcionario')}>
              <Plus className="h-4 w-4 mr-2" /> Cadastro de Funcionário
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/clientes')}>
              <Users className="h-4 w-4 mr-2" /> Consulta de Clientes
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/funcionarios')}>
              <Users className="h-4 w-4 mr-2" /> Consulta de Funcionários
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatórios</CardTitle>
            <FileDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/relatorio-movimentacoes')}>
              <FileDown className="h-4 w-4 mr-2" /> Relatório de Movimentações
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/relatorio-inadimplentes')}>
              <FileDown className="h-4 w-4 mr-2" /> Relatório de Inadimplentes
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/relatorio-desempenho')}>
              <FileDown className="h-4 w-4 mr-2" /> Desempenho de Funcionários
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Clientes Recém-Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 text-left">Nome</th>
                  <th className="p-2 text-left">CPF</th>
                  <th className="p-2 text-left">Data Cadastro</th>
                  <th className="p-2 text-left">Score</th>
                  <th className="p-2 text-left">Contas</th>
                  <th className="p-2 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, nome: 'Ana Silva', cpf: '123.456.789-00', data: '2025-05-08', score: 720, contas: 2 },
                  { id: 2, nome: 'Carlos Ferreira', cpf: '987.654.321-00', data: '2025-05-07', score: 650, contas: 1 },
                  { id: 3, nome: 'Teresa Mendes', cpf: '456.789.123-00', data: '2025-05-06', score: 810, contas: 3 },
                ].map((cliente) => (
                  <tr key={cliente.id} className="border-b">
                    <td className="p-2">{cliente.nome}</td>
                    <td className="p-2">{cliente.cpf}</td>
                    <td className="p-2">{new Date(cliente.data).toLocaleDateString('pt-BR')}</td>
                    <td className="p-2">{cliente.score}</td>
                    <td className="p-2">{cliente.contas}</td>
                    <td className="p-2">
                      <Button variant="ghost" size="sm">
                        Ver Detalhes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => navigate('/clientes')}>
              Ver Todos os Clientes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Tipo</th>
                  <th className="p-2 text-left">Valor</th>
                  <th className="p-2 text-left">Conta Origem</th>
                  <th className="p-2 text-left">Conta Destino</th>
                  <th className="p-2 text-left">Data/Hora</th>
                  <th className="p-2 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1001, tipo: 'DEPOSITO', valor: 1500.00, origem: '12345-6', destino: '-', data: '2025-05-10 14:25:30' },
                  { id: 1002, tipo: 'TRANSFERENCIA', valor: 750.50, origem: '12345-6', destino: '98765-4', data: '2025-05-10 13:45:22' },
                  { id: 1003, tipo: 'SAQUE', valor: 200.00, origem: '65432-1', destino: '-', data: '2025-05-10 11:32:15' },
                ].map((transacao) => (
                  <tr key={transacao.id} className="border-b">
                    <td className="p-2">{transacao.id}</td>
                    <td className="p-2">{transacao.tipo}</td>
                    <td className="p-2">R$ {transacao.valor.toFixed(2)}</td>
                    <td className="p-2">{transacao.origem}</td>
                    <td className="p-2">{transacao.destino}</td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{transacao.data}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <Button variant="ghost" size="sm">
                        Detalhes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => navigate('/transacoes')}>
              Ver Todas as Transações
            </Button>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default FuncionarioDashboard;
