'use client';

import React, { useEffect } from 'react';
import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>⚠️</div>
        <h1 className={styles.title}>Something Went Wrong</h1>
        <p className={styles.description}>
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>
        {error.message && (
          <div className={styles.errorMessage}>
            <code>{error.message}</code>
          </div>
        )}
        <button onClick={reset} className={styles.retryBtn}>
          Try Again
        </button>
      </div>
    </div>
  );
}

