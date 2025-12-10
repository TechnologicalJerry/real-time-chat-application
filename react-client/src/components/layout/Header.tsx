'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            ChatApp
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href={ROUTES.HOME}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href={ROUTES.ABOUT}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href={ROUTES.LOGIN}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href={ROUTES.SIGNUP}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 hover:text-blue-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
