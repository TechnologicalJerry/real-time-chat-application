'use client';

import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href={ROUTES.HOME} className={styles.homeBtn}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}


