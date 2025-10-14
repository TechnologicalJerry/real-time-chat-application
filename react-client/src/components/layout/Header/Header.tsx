'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { ROUTES } from '@/lib/utils/constants';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href={ROUTES.HOME} className={styles.logo}>
          <h1>ChatApp</h1>
        </Link>

        <nav className={styles.nav}>
          <Link href={ROUTES.HOME} className={styles.navLink}>
            Home
          </Link>
          <Link href={ROUTES.ABOUT} className={styles.navLink}>
            About
          </Link>

          {isAuthenticated ? (
            <>
              <Link href={ROUTES.DASHBOARD} className={styles.navLink}>
                Dashboard
              </Link>
              <div className={styles.userInfo}>
                <span className={styles.username}>{user?.username}</span>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href={ROUTES.LOGIN} className={styles.navLink}>
                Login
              </Link>
              <Link href={ROUTES.SIGNUP} className={styles.navLinkBtn}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};


