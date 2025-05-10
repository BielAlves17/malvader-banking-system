
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Usuário tentou acessar rota inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-malvader-50">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-malvader-700">404</h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-gray-800">Página não encontrada</h2>
          <p className="text-lg text-gray-600 max-w-lg">
            A página que você está procurando não existe ou foi removida.
          </p>
        </div>
        <div className="pt-6">
          <Link to="/">
            <Button className="bg-malvader-600 hover:bg-malvader-700">
              Voltar para a Página Inicial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
