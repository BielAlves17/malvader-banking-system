
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { LogOut, Home, Users, CreditCard, PieChart, Settings, User, Briefcase } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { isAuthenticated, logout, user, profile } = useAuth();
  const navigate = useNavigate();

  const clientMenuItems = [
    { icon: <Home size={20} />, text: 'Início', path: '/dashboard/cliente' },
    { icon: <CreditCard size={20} />, text: 'Minhas Contas', path: '/minhas-contas' },
    { icon: <User size={20} />, text: 'Meu Perfil', path: '/perfil' },
  ];
  
  const employeeMenuItems = [
    { icon: <Home size={20} />, text: 'Início', path: '/dashboard/funcionario' },
    { icon: <Users size={20} />, text: 'Clientes', path: '/clientes' },
    { icon: <CreditCard size={20} />, text: 'Contas', path: '/contas' },
    { icon: <PieChart size={20} />, text: 'Relatórios', path: '/relatorios' },
    { icon: <Briefcase size={20} />, text: 'Funcionários', path: '/funcionarios' },
    { icon: <Settings size={20} />, text: 'Configurações', path: '/configuracoes' },
  ];

  const menuItems = profile?.role === 'funcionario' ? employeeMenuItems : clientMenuItems;


  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-banco-800 to-banco-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">BANCO MALVADER</h1>
          </div>
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <span className="hidden sm:inline">
                Olá, {profile?.full_name || user?.email}
              </span>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-banco-700"
                onClick={logout}
              >
                <LogOut size={18} className="mr-2" /> Sair
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar for authenticated users */}
        {isAuthenticated && profile && (
          <aside className="bg-gray-900 text-white w-64 p-4 hidden md:block">
            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <Button 
                  key={index} 
                  variant="ghost" 
                  className="w-full flex items-center justify-start text-white hover:bg-gray-800"
                  onClick={() => navigate(item.path)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.text}
                </Button>
              ))}
            </nav>
          </aside>
        )}

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50">
          {title && <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>}
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4 text-center">
        <div className="container mx-auto">
          <p>&copy; 2025 Banco Malvader - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
