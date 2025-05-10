
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  userType: 'FUNCIONARIO' | 'CLIENTE' | null;
  login: (email: string, password: string, otp: string, userType: 'FUNCIONARIO' | 'CLIENTE') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  userType: null,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'FUNCIONARIO' | 'CLIENTE' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se há usuário na sessão
    const storedUser = sessionStorage.getItem('user');
    const storedUserType = sessionStorage.getItem('userType');
    
    if (storedUser && storedUserType) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      setUserType(storedUserType as 'FUNCIONARIO' | 'CLIENTE');
    }
  }, []);

  // Na implementação real, esta função se comunicaria com a API para validar credenciais
  const login = async (cpf: string, password: string, otp: string, userType: 'FUNCIONARIO' | 'CLIENTE') => {
    try {
      // Simulação de verificação de credenciais
      // Em uma implementação real, isto seria uma chamada à API
      if (cpf && password && otp) {
        // Dados simulados para testes
        const mockUser = {
          id_usuario: 1,
          nome: userType === 'FUNCIONARIO' ? 'João Gerente' : 'Maria Cliente',
          cpf,
          data_nascimento: '1990-01-01',
          telefone: '(11) 99999-9999',
          tipo_usuario: userType,
        };

        setUser(mockUser);
        setIsAuthenticated(true);
        setUserType(userType);
        
        // Guardar na sessão
        sessionStorage.setItem('user', JSON.stringify(mockUser));
        sessionStorage.setItem('userType', userType);
        
        // Redirecionar para a página correta
        navigate(userType === 'FUNCIONARIO' ? '/dashboard/funcionario' : '/dashboard/cliente');
        toast.success(`Login realizado com sucesso como ${userType === 'FUNCIONARIO' ? 'Funcionário' : 'Cliente'}`);
      } else {
        throw new Error('Todos os campos são obrigatórios');
      }
    } catch (error: any) {
      toast.error(error.message || 'Falha na autenticação');
      console.error('Erro de login:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUserType(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userType');
    navigate('/');
    toast.success('Logout realizado com sucesso');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
