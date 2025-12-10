'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">ChatApp</h3>
            <p className="text-gray-400 text-sm">
              Real-time chat application for seamless communication.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={ROUTES.HOME}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.ABOUT}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.LOGIN}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.SIGNUP}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: support@chatapp.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} ChatApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
