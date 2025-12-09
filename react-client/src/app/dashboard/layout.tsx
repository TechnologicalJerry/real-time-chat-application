'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import styles from './layout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}



