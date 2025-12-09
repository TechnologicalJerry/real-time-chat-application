'use client';

import React from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants';
import styles from './page.module.css';

export default function DashboardPage() {
  const { user } = useAuth();

  const cards = [
    {
      title: 'Chat',
      description: 'Send and receive messages in real-time',
      icon: '💬',
      link: ROUTES.DASHBOARD_CHAT,
      color: '#3b82f6',
    },
    {
      title: 'Profile',
      description: 'Manage your account settings and information',
      icon: '👤',
      link: ROUTES.DASHBOARD_PROFILE,
      color: '#8b5cf6',
    },
    ...(user?.role === 'admin'
      ? [
          {
            title: 'Users',
            description: 'Manage users and permissions',
            icon: '👥',
            link: ROUTES.DASHBOARD_USERS,
            color: '#10b981',
          },
          {
            title: 'Products',
            description: 'Manage products and inventory',
            icon: '📦',
            link: ROUTES.DASHBOARD_PRODUCTS,
            color: '#f59e0b',
          },
        ]
      : []),
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Welcome back, {user?.username}!</h1>
        <p>Here's what you can do on your dashboard</p>
      </div>

      <div className={styles.grid}>
        {cards.map((card) => (
          <Link key={card.title} href={card.link} className={styles.card}>
            <div className={styles.cardIcon} style={{ color: card.color }}>
              {card.icon}
            </div>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <div className={styles.arrow}>→</div>
          </Link>
        ))}
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Account Status</span>
            <span className={styles.statValue}>Active</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🔒</div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Role</span>
            <span className={styles.statValue}>{user?.role}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📅</div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Member Since</span>
            <span className={styles.statValue}>
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })
                : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}



