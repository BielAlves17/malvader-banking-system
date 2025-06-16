
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import type { Profile } from '@/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  isAuthenticated: false,
  logout: () => {},
  login: async () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      console.log('Checking for existing session...');
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session found:', session);
      
      setSession(session);
      const currentUser = session?.user;
      setUser(currentUser ?? null);

      if (currentUser) {
        console.log('Fetching profile for user:', currentUser.id);
        const { data: userProfile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();
        
        if (error) {
          console.log("Profile not found, creating default profile for presentation mode:", error);
          // Criar um perfil padrão para modo apresentação
          const defaultProfile: Profile = {
            id: currentUser.id,
            full_name: currentUser.email?.split('@')[0] || 'Usuário',
            role: 'cliente',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          setProfile(defaultProfile);
        } else {
          console.log('Profile found:', userProfile);
          setProfile(userProfile as Profile);
        }
      }
      setLoading(false);
    };

    fetchSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (event === 'SIGNED_IN' && currentUser) {
          setLoading(true);
          console.log('User signed in, fetching profile...');
          
          // Defer profile fetching to prevent deadlocks
          setTimeout(async () => {
            const { data: userProfile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', currentUser.id)
              .single();

            if (error) {
              console.log('Profile not found, creating default profile for presentation mode:', error);
              // Criar um perfil padrão sem desconectar o usuário
              const defaultProfile: Profile = {
                id: currentUser.id,
                full_name: currentUser.email?.split('@')[0] || 'Usuário',
                role: 'cliente',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              };
              setProfile(defaultProfile);
              toast.success('Perfil criado para modo apresentação');
              navigate('/dashboard/cliente');
            } else {
              console.log('Profile loaded after sign in:', userProfile);
              setProfile(userProfile as Profile);
              if (userProfile.role === 'funcionario') {
                navigate('/dashboard/funcionario');
              } else {
                navigate('/dashboard/cliente');
              }
            }
            setLoading(false);
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setProfile(null);
          navigate('/');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const login = async (email: string, password: string) => {
    console.log('Attempting login for:', email);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Falha na autenticação');
      throw error;
    }
    
    console.log('Login successful');
    // Toast success is removed, redirection handles user feedback
  };

  const logout = async () => {
    console.log('Attempting logout...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      toast.error('Erro ao fazer logout.');
    } else {
      console.log('Logout successful');
      toast.success('Logout realizado com sucesso');
    }
  };

  if (loading && !session) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, session, profile, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
