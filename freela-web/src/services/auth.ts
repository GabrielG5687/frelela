import api from './api';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../types';

export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      const { access_token, user } = response.data;
      
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('user_data', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      throw new Error('Falha no login. Verifique suas credenciais.');
    }
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      await api.post<User>('/users', userData);
      
      const loginResponse = await api.post<AuthResponse>('/auth/login', {
        email: userData.email!,
        senha: userData.senha
      });
      
      const { access_token, user } = loginResponse.data;
      
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('user_data', JSON.stringify(user));
      
      return loginResponse.data;
    } catch (error) {
      throw new Error('Falha no cadastro. Tente novamente.');
    }
  }

  static logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }

  static getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  static getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
