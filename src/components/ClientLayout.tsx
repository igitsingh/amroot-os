'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <AuthProvider>
      <div className="flex flex-1 overflow-hidden relative z-10 w-full h-full">
        {!isLoginPage && <Sidebar />}
        <main className={`flex-1 overflow-y-auto relative ${isLoginPage ? 'bg-[#F9F8F6]' : 'bg-transparent'}`}>
          <div className="h-full w-full">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
