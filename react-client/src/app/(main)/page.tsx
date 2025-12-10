'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to ChatApp
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with friends and colleagues in real-time. Experience seamless
            communication with our modern chat application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ROUTES.SIGNUP}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg"
            >
              Get Started
            </Link>
            <Link
              href={ROUTES.ABOUT}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg border-2 border-blue-600"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-blue-600 text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Real-Time Messaging
            </h3>
            <p className="text-gray-600">
              Send and receive messages instantly with our real-time chat
              technology.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-blue-600 text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Group Chats
            </h3>
            <p className="text-gray-600">
              Create and join group conversations with multiple participants.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-blue-600 text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600">
              Your conversations are encrypted and secure. Privacy is our priority.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-blue-600 rounded-lg p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6 text-blue-100">
            Join thousands of users already using ChatApp
          </p>
          <Link
            href={ROUTES.SIGNUP}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
}
