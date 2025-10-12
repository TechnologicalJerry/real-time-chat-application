import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000',
  },

  // Image domains (if you plan to use external images)
  images: {
    domains: [],
  },

  // Webpack configuration (if needed)
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
