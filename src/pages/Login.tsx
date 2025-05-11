
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CLIENTE' | 'FUNCIONARIO'>('CLIENTE');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const { login } = useAuth();

  const handleRequestOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpf || !password) {
      toast.error('Por favor, preencha o CPF e a senha.');
      return;
    }
    
    // Em uma aplicação real, aqui seria feita uma chamada à API para solicitar o OTP
    toast.success('Código OTP enviado com sucesso! (Simulação)');
    setOtpSent(true);
    // Simulação de OTP gerado - em produção, isso viria do backend
    setOtp('123456');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpf || !password || !otp) {
      toast.error('Todos os campos são obrigatórios');
      return;
    }
    
    try {
      await login(cpf, password, otp, activeTab);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <Layout title="">
      <div className="flex items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">Autenticação</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
 
          <CardFooter className="flex flex-col space-y-2">
            <p className="text-sm text-center text-muted-foreground">
              Ao acessar o sistema, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
