
export interface User {
  id_usuario: number;
  nome: string;
  cpf: string;
  data_nascimento: string;
  telefone: string;
  tipo_usuario: 'FUNCIONARIO' | 'CLIENTE';
  senha_hash: string;
  otp_ativo?: string;
  otp_expiracao?: string;
}

export interface Employee {
  id_funcionario: number;
  id_usuario: number;
  codigo_funcionario: string;
  cargo: 'ESTAGIARIO' | 'ATENDENTE' | 'GERENTE';
  id_supervisor?: number;
}

export interface Client {
  id_cliente: number;
  id_usuario: number;
  score_credito: number;
}

export interface Address {
  id_endereco: number;
  id_usuario: number;
  cep: string;
  local: string;
  numero_casa: number;
  bairro: string;
  cidade: string;
  estado: string;
  complemento?: string;
}

export interface Agency {
  id_agencia: number;
  nome: string;
  codigo_agencia: string;
  endereco_id: number;
}

export interface Account {
  id_conta: number;
  numero_conta: string;
  id_agencia: number;
  saldo: number;
  tipo_conta: 'POUPANCA' | 'CORRENTE' | 'INVESTIMENTO';
  id_cliente: number;
  data_abertura: string;
  status: 'ATIVA' | 'ENCERRADA' | 'BLOQUEADA';
}

export interface SavingsAccount {
  id_conta_poupanca: number;
  id_conta: number;
  taxa_rendimento: number;
  ultimo_rendimento?: string;
}

export interface CheckingAccount {
  id_conta_corrente: number;
  id_conta: number;
  limite: number;
  data_vencimento: string;
  taxa_manutencao: number;
}

export interface InvestmentAccount {
  id_conta_investimento: number;
  id_conta: number;
  perfil_risco: 'BAIXO' | 'MEDIO' | 'ALTO';
  valor_minimo: number;
  taxa_rendimento_base: number;
}

export interface Transaction {
  id_transacao: number;
  id_conta_origem: number;
  id_conta_destino?: number;
  tipo_transacao: 'DEPOSITO' | 'SAQUE' | 'TRANSFERENCIA' | 'TAXA' | 'RENDIMENTO';
  valor: number;
  data_hora: string;
  descricao?: string;
}

export interface Audit {
  id_auditoria: number;
  id_usuario: number;
  acao: string;
  data_hora: string;
  detalhes?: string;
}

export interface Report {
  id_relatorio: number;
  id_funcionario: number;
  tipo_relatorio: string;
  data_geracao: string;
  conteudo: string;
}
