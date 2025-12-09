import { api } from '../utils/api-client';
import { API_ENDPOINTS } from '../utils/constants';
import { Product, CreateProductData, UpdateProductData, ApiResponse } from '@/types';

/**
 * Products Service
 * Handles all product related API calls
 */
class ProductsService {
  /**
   * Get all products
   */
  async getProducts(page = 1, limit = 20): Promise<Product[]> {
    const response = await api.get<ApiResponse<Product[]>>(
      `${API_ENDPOINTS.PRODUCTS}?page=${page}&limit=${limit}`
    );
    return response.data.data || [];
  }

  /**
   * Get product by ID
   */
  async getProductById(productId: string): Promise<Product> {
    const response = await api.get<ApiResponse<Product>>(API_ENDPOINTS.PRODUCT_BY_ID(productId));
    return response.data.data as Product;
  }

  /**
   * Create new product
   */
  async createProduct(data: CreateProductData): Promise<Product> {
    const response = await api.post<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS, data);
    return response.data.data as Product;
  }

  /**
   * Update product
   */
  async updateProduct(productId: string, data: Partial<CreateProductData>): Promise<Product> {
    const response = await api.put<ApiResponse<Product>>(
      API_ENDPOINTS.PRODUCT_BY_ID(productId),
      data
    );
    return response.data.data as Product;
  }

  /**
   * Delete product
   */
  async deleteProduct(productId: string): Promise<void> {
    await api.delete(API_ENDPOINTS.PRODUCT_BY_ID(productId));
  }

  /**
   * Search products
   */
  async searchProducts(query: string): Promise<Product[]> {
    const response = await api.get<ApiResponse<Product[]>>(
      `${API_ENDPOINTS.PRODUCTS}/search?q=${encodeURIComponent(query)}`
    );
    return response.data.data || [];
  }
}

export const productsService = new ProductsService();



