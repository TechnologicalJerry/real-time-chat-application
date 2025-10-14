'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/utils/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (path: string) => pathname === path;
  const isAdmin = user?.role === 'admin';

  return (
    <nav className={styles.navbar}>
      <div className={styles.navGroup}>
        <Link
          href={ROUTES.DASHBOARD}
          className={`${styles.navItem} ${isActive(ROUTES.DASHBOARD) ? styles.active : ''}`}
        >
          <span className={styles.icon}>📊</span>
          <span>Dashboard</span>
        </Link>

        <Link
          href={ROUTES.DASHBOARD_CHAT}
          className={`${styles.navItem} ${isActive(ROUTES.DASHBOARD_CHAT) ? styles.active : ''}`}
        >
          <span className={styles.icon}>💬</span>
          <span>Chat</span>
        </Link>

        <Link
          href={ROUTES.DASHBOARD_PROFILE}
          className={`${styles.navItem} ${isActive(ROUTES.DASHBOARD_PROFILE) ? styles.active : ''}`}
        >
          <span className={styles.icon}>👤</span>
          <span>Profile</span>
        </Link>

        {isAdmin && (
          <>
            <Link
              href={ROUTES.DASHBOARD_USERS}
              className={`${styles.navItem} ${isActive(ROUTES.DASHBOARD_USERS) ? styles.active : ''}`}
            >
              <span className={styles.icon}>👥</span>
              <span>Users</span>
            </Link>

            <Link
              href={ROUTES.DASHBOARD_PRODUCTS}
              className={`${styles.navItem} ${isActive(ROUTES.DASHBOARD_PRODUCTS) ? styles.active : ''}`}
            >
              <span className={styles.icon}>📦</span>
              <span>Products</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};


