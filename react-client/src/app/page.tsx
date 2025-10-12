'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { ROUTES } from '@/lib/utils/constants';
import styles from './page.module.css';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Real-Time Chat Application
          </h1>
          <p className={styles.subtitle}>
            Connect with people instantly. Experience seamless communication with our modern, feature-rich chat platform.
          </p>
          <div className={styles.actions}>
            {isAuthenticated ? (
              <Link href={ROUTES.DASHBOARD} className={styles.primaryBtn}>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link href={ROUTES.SIGNUP} className={styles.primaryBtn}>
                  Get Started
                </Link>
                <Link href={ROUTES.LOGIN} className={styles.secondaryBtn}>
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>💬</div>
            <h3>Real-Time Messaging</h3>
            <p>Send and receive messages instantly with WebSocket technology</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>Secure Authentication</h3>
            <p>Your data is protected with industry-standard security practices</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>👥</div>
            <h3>User Management</h3>
            <p>Manage users and conversations with an intuitive interface</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>📱</div>
            <h3>Responsive Design</h3>
            <p>Works seamlessly across all devices and screen sizes</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Fast & Reliable</h3>
            <p>Built with modern technologies for optimal performance</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>🎨</div>
            <h3>Modern UI</h3>
            <p>Beautiful and intuitive user interface for the best experience</p>
          </div>
        </div>
      </section>
    </div>
  );
}
