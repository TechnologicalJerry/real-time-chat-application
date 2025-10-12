import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/context/AuthContext';
import { ToastProvider } from '@/lib/context/ToastContext';
import { ChatProvider } from '@/lib/context/ChatContext';
import { SocketProvider } from '@/lib/context/SocketContext';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { Toaster } from '@/components/ui/Toaster/Toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'ChatApp - Real-Time Communication',
  description: 'A modern real-time chat application built with Next.js and Socket.io',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <AuthProvider>
            <ChatProvider>
              <SocketProvider>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Header />
                  <main style={{ flex: 1 }}>{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </SocketProvider>
            </ChatProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
