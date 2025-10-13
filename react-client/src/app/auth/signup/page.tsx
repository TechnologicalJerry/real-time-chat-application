'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { useToast } from '@/lib/hooks/useToast';
import { ROUTES } from '@/lib/utils/constants';
import { isValidEmail, isValidPassword, isValidUsername, passwordsMatch, isRequired } from '@/lib/utils/validators';
import styles from './page.module.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const toast = useToast();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!isRequired(formData.username)) {
      newErrors.username = 'Username is required';
    } else if (!isValidUsername(formData.username)) {
      newErrors.username = 'Username must be 3-20 alphanumeric characters';
    }

    if (!isRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!isRequired(formData.password)) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isRequired(formData.confirmPassword)) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (!passwordsMatch(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Create Account</h1>
          <p>Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              placeholder="Choose a username"
              disabled={isLoading}
            />
            {errors.username && <span className={styles.error}>{errors.username}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder="Create a password"
              disabled={isLoading}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Already have an account?{' '}
            <Link href={ROUTES.LOGIN} className={styles.link}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


