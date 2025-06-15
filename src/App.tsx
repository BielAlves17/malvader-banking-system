
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { supabaseError } from "./lib/supabase";

import Index from "./pages/Index";
import Login from "./pages/Login";
import ClienteDashboard from "./pages/dashboard/ClienteDashboard";
import FuncionarioDashboard from "./pages/dashboard/FuncionarioDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  if (supabaseError) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50 text-red-900">
        <div className="max-w-md p-6 m-4 text-center bg-white border border-red-200 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-700">Erro de Configuração do Supabase</h1>
          <p className="mt-2">{supabaseError}</p>
          <p className="mt-4 text-sm text-gray-600">
            Se o problema persistir, tente desconectar e reconectar a integração do Supabase nas configurações do projeto.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard/cliente" element={<ClienteDashboard />} />
              <Route path="/dashboard/funcionario" element={<FuncionarioDashboard />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
