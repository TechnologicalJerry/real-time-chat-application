import { useState, useEffect, useCallback } from 'react';
import { productsService } from '../services/products.service';
import { Product, CreateProductData } from '@/types';
import { useToast } from './useToast';

/**
 * Custom hook for products management
 */
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const loadProducts = useCallback(async (page = 1, limit = 20) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productsService.getProducts(page, limit);
      setProducts(data);
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to load products';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const getProductById = useCallback(async (productId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const product = await productsService.getProductById(productId);
      return product;
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to load product';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const createProduct = useCallback(async (data: CreateProductData) => {
    setIsLoading(true);
    setError(null);
    try {
      const product = await productsService.createProduct(data);
      setProducts((prev) => [product, ...prev]);
      toast.success('Product created successfully');
      return product;
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to create product';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const updateProduct = useCallback(async (productId: string, data: Partial<CreateProductData>) => {
    setIsLoading(true);
    setError(null);
    try {
      const product = await productsService.updateProduct(productId, data);
      setProducts((prev) => prev.map((p) => (p._id === productId ? product : p)));
      toast.success('Product updated successfully');
      return product;
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to update product';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const deleteProduct = useCallback(async (productId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await productsService.deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      toast.success('Product deleted successfully');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to delete product';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const searchProducts = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productsService.searchProducts(query);
      setProducts(data);
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to search products';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    products,
    isLoading,
    error,
    loadProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
  };
};



