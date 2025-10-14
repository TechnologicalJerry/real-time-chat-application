import { api } from '../utils/api-client';
import { ApiResponse } from '@/types';

/**
 * Base API Service
 * Generic service for common API operations
 */
class ApiService {
  /**
   * Generic GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    const response = await api.get<ApiResponse<T>>(endpoint);
    return response.data.data as T;
  }

  /**
   * Generic POST request
   */
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await api.post<ApiResponse<T>>(endpoint, data);
    return response.data.data as T;
  }

  /**
   * Generic PUT request
   */
  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await api.put<ApiResponse<T>>(endpoint, data);
    return response.data.data as T;
  }

  /**
   * Generic PATCH request
   */
  async patch<T>(endpoint: string, data: any): Promise<T> {
    const response = await api.patch<ApiResponse<T>>(endpoint, data);
    return response.data.data as T;
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    const response = await api.delete<ApiResponse<T>>(endpoint);
    return response.data.data as T;
  }
}

export const apiService = new ApiService();


