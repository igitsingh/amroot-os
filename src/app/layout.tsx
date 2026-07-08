import type { Metadata } from 'next';
import { Orbitron, Outfit } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

const orbitron = Orbitron({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron'
});

const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit'
});

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
      <body className={`${outfit.className} ${outfit.variable} ${orbitron.variable} bg-[#F9F8F6] text-[#2D3142] flex flex-col h-screen overflow-hidden relative`}>
        
        {/* Global Ambient Glow */}
        <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-center mt-7">
          <div className="w-[800px] h-[800px] bg-[#034F46]/10 rounded-full blur-[150px] absolute top-[-20%] right-[-10%]" />
          <div className="w-[600px] h-[600px] bg-[#F16775]/10 rounded-full blur-[150px] absolute bottom-[-20%] left-[-10%]" />
        </div>

        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
