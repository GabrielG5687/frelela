import api from './api';
import { User, UpdateUserRequest } from '../types';

export class UserService {
  static async getCurrentUserProfile(): Promise<User> {
    try {
      // First get the current user ID from AsyncStorage or decode from token
      const response = await api.get<User>('/users/me'); // Assuming there's a /me endpoint
      return response.data;
    } catch (error) {
      throw new Error('Erro ao carregar perfil do usuário.');
    }
  }

  static async getUserById(userId: string): Promise<User> {
    try {
      const response = await api.get<User>(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao carregar dados do usuário.');
    }
  }

  static async updateUser(userId: string, userData: UpdateUserRequest): Promise<User> {
    try {
      const response = await api.patch<User>(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao atualizar dados do usuário.');
    }
  }
}