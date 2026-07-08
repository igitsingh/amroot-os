'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { setAuthCookieAction } from './actions';
import Image from 'next/image';
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { Outfit, Orbitron } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });
const orbitron = Orbitron({ subsets: ['latin'], weight: ['600'] });

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      await setAuthCookieAction();
      // We wait for the cookie to be set, then transition
      router.push('/checklist');
    } catch (err: any) {
      console.error("Firebase Login Error: ", err);
      setError(err.message || 'Invalid email or password. Please try again.');
      setLoading(false); 
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden bg-[#F9F8F6] ${outfit.className}`}>
      {/* Background Decor - Amroot Organics Style */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#034F46]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#034F46]/10 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/4" />
      
      <div className="z-10 w-full max-w-md p-8 relative">
        <div className="bg-[#1A1A1A] border border-[#333333] rounded-3xl shadow-2xl overflow-hidden p-8">
          
          <div className="flex flex-col items-center mb-10">
            {/* Amroot Organics Logo */}
            <div className="mb-6 flex justify-center">
              <Image 
                src="/amroot-organics-logo.svg" 
                alt="Amroot Organics Logo" 
                width={200} 
                height={60} 
                className="w-48 h-auto object-contain"
                priority
              />
            </div>
            
            <p className="text-gray-400 text-sm text-center font-medium uppercase tracking-widest">
              Admin Panel
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-start text-left">
              <div className="mr-2 mt-0.5 font-bold">•</div>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Email ID</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111111] border border-[#333333] rounded-xl py-3.5 pl-12 pr-4 text-white font-medium focus:outline-none focus:bg-[#151515] focus:border-[#034F46] focus:ring-1 focus:ring-[#034F46] transition-all"
                  placeholder="deepanshu@amrootorganics.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">Passkey</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111111] border border-[#333333] rounded-xl py-3.5 pl-12 pr-12 text-white font-medium focus:outline-none focus:bg-[#151515] focus:border-[#034F46] focus:ring-1 focus:ring-[#034F46] transition-all"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full mt-6 bg-[#034F46] hover:bg-[#023a33] text-white font-medium py-3.5 px-4 rounded-xl shadow-lg shadow-[#034F46]/20 transition-all duration-300 flex justify-center items-center group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="flex space-x-1.5 items-center">
                  <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              ) : (
                <>
                  <span className="font-semibold tracking-wide">Authenticate Session</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
