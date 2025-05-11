
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout title="">
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-banco-600 to-banco-800 text-transparent bg-clip-text">
            BANCO MALVADER
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Seu futuro financeiro em boas mãos. Soluções bancárias personalizadas para clientes e instituições.
          </p>
        </div>

        <Card className="w-full max-w-4xl shadow-lg border-banco-200">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="bg-banco-50 p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Bem-vindo ao sistema bancário</h2>
                <p className="mb-6 text-gray-600">
                  Entre agora para gerenciar suas finanças, realizar transações e acessar 
                  todos os serviços que o Banco Malvader tem a oferecer.
                </p>
                <div className="mt-4">
                  <Button 
                    onClick={() => navigate('/login')}
                    className="bg-banco-600 hover:bg-banco-700 text-white px-8 py-6 text-lg"
                  >
                    Acessar Sistema
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-banco-600 to-banco-900 text-white p-8">
                <h3 className="text-2xl font-semibold mb-4">Recursos do Sistema</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1">✓</div>
                    <span>Gerenciamento de contas bancárias</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1">✓</div>
                    <span>Transferências entre contas</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1">✓</div>
                    <span>Consulta de saldo e extratos</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1">✓</div>
                    <span>Relatórios financeiros</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1">✓</div>
                    <span>Gestão de clientes e funcionários</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
