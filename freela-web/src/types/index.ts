export interface User {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  endereco: string;
}

export interface Job {
  id: string;
  titulo: string;
  descricao: string;
  valorSugerido: string;
  usuarioId: string;
  dataPublicacao: string;
  usuario: {
    id: string;
    nome: string;
    telefone: string;
    email: string;
  };
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  telefone: string;
  senha: string;
  endereco: string;
  email?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface CreateJobRequest {
  titulo: string;
  descricao: string;
  valorSugerido: number;
}

export interface UpdateJobRequest {
  titulo?: string;
  descricao?: string;
  valorSugerido?: number;
}

export interface UpdateUserRequest {
  nome?: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  senha?: string;
}
