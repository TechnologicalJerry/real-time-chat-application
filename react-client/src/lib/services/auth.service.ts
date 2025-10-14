import { api } from '../utils/api-client';
import { API_ENDPOINTS } from '../utils/constants';
import { setToken, setRefreshToken, removeToken } from '../utils/token';
import { LoginCredentials, SignupData, AuthResponse, User } from '@/types';

/**
 * Authentication Service
 * Handles all authentication related API calls
 */
class AuthService {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.LOGIN, credentials);
    
    const { user, token, refreshToken } = response.data.data;
    
    // Store tokens
    setToken(token);
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
    
    // Store user data
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
    
    return { user, token };
  }

  /**
   * Signup new user
   */
  async signup(data: SignupData): Promise<{ user: User; token: string }> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.SIGNUP, data);
    
    const { user, token, refreshToken } = response.data.data;
    
    // Store tokens
    setToken(token);
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
    
    // Store user data
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
    
    return { user, token };
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await api.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens and user data regardless of API response
      removeToken();
    }
  }

  /**
   * Verify token validity
   */
  async verifyToken(): Promise<User | null> {
    try {
      const response = await api.get<AuthResponse>(API_ENDPOINTS.VERIFY_TOKEN);
      return response.data.data.user;
    } catch (error) {
      removeToken();
      return null;
    }
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): User | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        return JSON.parse(userData);
      }
    }
    return null;
  }
}

export const authService = new AuthService();


