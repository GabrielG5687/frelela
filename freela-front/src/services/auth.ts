import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../types';

export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      const { access_token, user } = response.data;
      
      await AsyncStorage.setItem('auth_token', access_token);
      await AsyncStorage.setItem('user_data', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      throw new Error('Falha no login. Verifique suas credenciais.');
    }
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      // First create the user
      const createResponse = await api.post<User>('/users', userData);
      
      // Then login with the created user credentials
      const loginResponse = await api.post<AuthResponse>('/auth/login', {
        email: userData.email!,
        senha: userData.senha
      });
      
      const { access_token, user } = loginResponse.data;
      
      await AsyncStorage.setItem('auth_token', access_token);
      await AsyncStorage.setItem('user_data', JSON.stringify(user));
      
      return loginResponse.data;
    } catch (error) {
      throw new Error('Falha no cadastro. Tente novamente.');
    }
  }

  static async logout(): Promise<void> {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user_data');
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  static async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('auth_token');
  }

  static async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }
}