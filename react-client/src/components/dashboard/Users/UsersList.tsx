'use client';

import React, { useEffect, useState } from 'react';
import { useUsers } from '@/lib/hooks/useUsers';
import { User } from '@/types';
import styles from './UsersList.module.css';

export const UsersList: React.FC = () => {
  const { users, isLoading, loadUsers, deleteUser } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDelete = async (userId: string, username: string) => {
    if (window.confirm(`Are you sure you want to delete user "${username}"?`)) {
      try {
        await deleteUser(userId);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Users Management</h1>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading users...</div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.col1}>User</div>
            <div className={styles.col2}>Email</div>
            <div className={styles.col3}>Role</div>
            <div className={styles.col4}>Joined</div>
            <div className={styles.col5}>Actions</div>
          </div>

          <div className={styles.tableBody}>
            {filteredUsers.length === 0 ? (
              <div className={styles.empty}>
                <p>No users found</p>
              </div>
            ) : (
              filteredUsers.map((user: User) => (
                <div key={user._id} className={styles.tableRow}>
                  <div className={styles.col1}>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <span className={styles.username}>{user.username}</span>
                    </div>
                  </div>
                  <div className={styles.col2}>{user.email}</div>
                  <div className={styles.col3}>
                    <span className={`${styles.badge} ${styles[user.role]}`}>
                      {user.role}
                    </span>
                  </div>
                  <div className={styles.col4}>
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <div className={styles.col5}>
                    <button
                      onClick={() => handleDelete(user._id, user.username)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};


