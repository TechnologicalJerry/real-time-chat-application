import { useState, useCallback } from 'react';
import { userService } from '../services/user.service';
import { User, UpdateUserData } from '@/types';
import { useToast } from './useToast';

/**
 * Custom hook for users management
 */
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const loadUsers = useCallback(async (page = 1, limit = 20) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await userService.getUsers(page, limit);
      setUsers(data);
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to load users';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const getUserById = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await userService.getUserById(userId);
      return user;
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to load user';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const updateProfile = useCallback(async (data: UpdateUserData) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await userService.updateProfile(data);
      toast.success('Profile updated successfully');
      return user;
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to update profile';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const deleteUser = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await userService.deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success('User deleted successfully');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to delete user';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const searchUsers = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await userService.searchUsers(query);
      setUsers(data);
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to search users';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const getOnlineUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await userService.getOnlineUsers();
      return data;
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to load online users';
      setError(errorMessage);
      toast.error(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    users,
    isLoading,
    error,
    loadUsers,
    getUserById,
    updateProfile,
    deleteUser,
    searchUsers,
    getOnlineUsers,
  };
};


