import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AmrootOS',
  description: 'Operating System for Amroot Organics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F9F8F6] text-[#2D3142] flex flex-col h-screen overflow-hidden relative`}>
        
        {/* Global Ambient Glow */}
        <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-center mt-7">
          <div className="w-[800px] h-[800px] bg-[#034F46]/10 rounded-full blur-[150px] absolute top-[-20%] right-[-10%]" />
          <div className="w-[600px] h-[600px] bg-[#F16775]/10 rounded-full blur-[150px] absolute bottom-[-20%] left-[-10%]" />
        </div>

        <div className="flex flex-1 overflow-hidden relative z-10 w-full">
          <Sidebar />
          <main className="flex-1 overflow-y-auto relative bg-transparent">
            <div className="h-full w-full">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
