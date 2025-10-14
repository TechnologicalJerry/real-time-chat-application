import { api } from '../utils/api-client';
import { API_ENDPOINTS } from '../utils/constants';
import { User, UpdateUserData, ApiResponse } from '@/types';

/**
 * User Service
 * Handles all user related API calls
 */
class UserService {
  /**
   * Get all users
   */
  async getUsers(page = 1, limit = 20): Promise<User[]> {
    const response = await api.get<ApiResponse<User[]>>(
      `${API_ENDPOINTS.USERS}?page=${page}&limit=${limit}`
    );
    return response.data.data || [];
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User> {
    const response = await api.get<ApiResponse<User>>(API_ENDPOINTS.USER_BY_ID(userId));
    return response.data.data as User;
  }

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateUserData): Promise<User> {
    const response = await api.put<ApiResponse<User>>(API_ENDPOINTS.UPDATE_PROFILE, data);
    
    // Update stored user data
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_data', JSON.stringify(response.data.data));
    }
    
    return response.data.data as User;
  }

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<void> {
    await api.delete(API_ENDPOINTS.USER_BY_ID(userId));
  }

  /**
   * Search users
   */
  async searchUsers(query: string): Promise<User[]> {
    const response = await api.get<ApiResponse<User[]>>(
      `${API_ENDPOINTS.USERS}/search?q=${encodeURIComponent(query)}`
    );
    return response.data.data || [];
  }

  /**
   * Get online users
   */
  async getOnlineUsers(): Promise<User[]> {
    const response = await api.get<ApiResponse<User[]>>(`${API_ENDPOINTS.USERS}/online`);
    return response.data.data || [];
  }
}

export const userService = new UserService();


