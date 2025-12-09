'use client';

import React from 'react';
import { useToast } from '@/lib/hooks/useToast';
import styles from './Toaster.module.css';

export const Toaster: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          onClick={() => removeToast(toast.id)}
        >
          <div className={styles.toastIcon}>{getIcon(toast.type)}</div>
          <div className={styles.toastMessage}>{toast.message}</div>
          <button
            className={styles.closeBtn}
            onClick={(e) => {
              e.stopPropagation();
              removeToast(toast.id);
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};



