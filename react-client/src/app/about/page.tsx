'use client';

import React from 'react';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>About ChatApp</h1>
        
        <section className={styles.section}>
          <h2>Our Mission</h2>
          <p>
            ChatApp is a modern real-time chat application designed to bring people together through seamless communication. 
            We believe in creating tools that make connecting with others simple, secure, and enjoyable.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Features</h2>
          <ul className={styles.list}>
            <li>Real-time messaging with WebSocket technology</li>
            <li>Secure authentication and authorization</li>
            <li>User and product management</li>
            <li>Modern, responsive design</li>
            <li>Built with cutting-edge technologies</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Technology Stack</h2>
          <div className={styles.techGrid}>
            <div className={styles.techCard}>
              <h3>Frontend</h3>
              <ul>
                <li>React with Next.js</li>
                <li>TypeScript</li>
                <li>CSS Modules</li>
                <li>Socket.io Client</li>
              </ul>
            </div>
            <div className={styles.techCard}>
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express/NestJS</li>
                <li>Socket.io</li>
                <li>MongoDB</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Get Started</h2>
          <p>
            Ready to start chatting? Sign up for a free account and experience real-time communication at its best. 
            Join thousands of users who are already connected through ChatApp.
          </p>
        </section>
      </div>
    </div>
  );
}


