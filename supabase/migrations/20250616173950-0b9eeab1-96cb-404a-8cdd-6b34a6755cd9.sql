
-- Primeiro, vamos inserir os perfis dos usuários de teste
-- Nota: Os IDs dos usuários serão gerados automaticamente pelo Supabase Auth quando eles se registrarem
-- Por isso, vamos criar uma estrutura que permita associar os perfis aos usuários quando eles fizerem login

-- Criar uma função para inserir perfil automaticamente quando um usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  -- Inserir perfil baseado no email do usuário
  IF NEW.email = 'cliente@teste.com' THEN
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (NEW.id, 'Cliente Teste', 'cliente');
  ELSIF NEW.email = 'funcionario@teste.com' THEN
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (NEW.id, 'Funcionário Teste', 'funcionario');
  ELSE
    -- Para outros usuários, criar perfil padrão como cliente
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)), 'cliente');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger para executar a função quando um novo usuário for criado
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Se os usuários já existirem, vamos atualizar seus perfis
-- (Esta parte só funcionará se os usuários já estiverem registrados no sistema)
DO $$
DECLARE
    cliente_id uuid;
    funcionario_id uuid;
BEGIN
    -- Tentar encontrar o ID do usuário cliente
    SELECT id INTO cliente_id FROM auth.users WHERE email = 'cliente@teste.com';
    
    -- Se encontrado, inserir ou atualizar o perfil
    IF cliente_id IS NOT NULL THEN
        INSERT INTO public.profiles (id, full_name, role)
        VALUES (cliente_id, 'Cliente Teste', 'cliente')
        ON CONFLICT (id) 
        DO UPDATE SET 
            full_name = 'Cliente Teste',
            role = 'cliente',
            updated_at = now();
    END IF;

    -- Tentar encontrar o ID do usuário funcionário
    SELECT id INTO funcionario_id FROM auth.users WHERE email = 'funcionario@teste.com';
    
    -- Se encontrado, inserir ou atualizar o perfil
    IF funcionario_id IS NOT NULL THEN
        INSERT INTO public.profiles (id, full_name, role)
        VALUES (funcionario_id, 'Funcionário Teste', 'funcionario')
        ON CONFLICT (id) 
        DO UPDATE SET 
            full_name = 'Funcionário Teste',
            role = 'funcionario',
            updated_at = now();
    END IF;
END $$;
