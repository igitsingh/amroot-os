'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Outfit } from 'next/font/google';
import { Search, Sparkles, Calendar, Database, Anchor, FlaskConical, FileText, Settings, PanelLeftClose, PanelLeftOpen, Cpu, BookOpen, ExternalLink, ShoppingBag, ListTodo, LogOut } from 'lucide-react';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });
import { logoutAction } from '@/app/login/actions';

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (pathname === '/login') return null;

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname === path || pathname.startsWith(path + '/');
  };

  const getLinkClasses = (path: string) => {
    const active = isActive(path);
    return `flex items-center justify-between px-3 py-2 text-sm rounded-xl transition-all ${isCollapsed ? 'justify-center' : ''} group border border-transparent font-bold tracking-wide ${active ? 'bg-white/10 text-white' : 'text-[#F9F8F6]/70 hover:bg-white/5 hover:text-white hover:border-white/10'}`;
  };

  const getIconClasses = (path: string) => {
    const active = isActive(path);
    return `shrink-0 transition-colors ${active ? 'text-white' : 'text-[#F9F8F6]/50 group-hover:text-white'}`;
  };

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-60'} transition-all duration-300 bg-[#034F46] h-screen flex flex-col px-4 py-6 flex-shrink-0 relative z-50 ${outfit.className}`}>
      
      {/* Header with Logo and Toggle */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-6'} mb-8 -mx-4 -mt-6 py-6 w-[calc(100%+2rem)] bg-[#1A1A1A] shadow-inner border-b border-[#333333]`}>
        {!isCollapsed && (
          <Link href="/competitors" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <Image 
              src="/amroot-organics-logo.svg" 
              alt="Amroot Organics Logo" 
              width={160} 
              height={50} 
              className="w-32 h-auto"
              priority
            />
          </Link>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-12 h-6 rounded-full bg-[#034F46] hover:bg-[#046C60] border border-transparent text-white transition-all shadow-md group"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen size={16} className="group-hover:scale-110 transition-transform" />
          ) : (
            <PanelLeftClose size={16} className="group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

      <div className="flex flex-col space-y-1 flex-1 mt-4">
        
        <div className={`flex items-center justify-between px-3 py-2 text-sm rounded-xl border border-transparent text-[#F9F8F6]/40 cursor-not-allowed font-bold tracking-wide ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <Sparkles size={16} className="shrink-0 text-[#F9F8F6]/30" />
            {!isCollapsed && <span>Command Center</span>}
          </div>
          {!isCollapsed && (
            <span className="text-[9px] uppercase font-bold tracking-wider bg-[#2D3142]/30 text-[#F9F8F6]/50 px-1.5 py-0.5 rounded">Soon</span>
          )}
        </div>

        <div className="h-6" /> {/* Spacer */}
        {!isCollapsed && <div className="px-3 mb-2 text-[10px] uppercase font-mono text-[#F9F8F6]/50 tracking-wider">Business</div>}
        
        <Link href="/brand" className={getLinkClasses('/brand')}>
          <div className="flex items-center gap-3">
            <ShoppingBag size={16} className={getIconClasses('/brand')} />
            {!isCollapsed && <span>Amroot Organics</span>}
          </div>
        </Link>
        
        <Link href="/checklist" className={getLinkClasses('/checklist')}>
          <div className="flex items-center gap-3">
            <ListTodo size={16} className={getIconClasses('/checklist')} />
            {!isCollapsed && <span>Launch Checklist</span>}
          </div>
        </Link>

        <div className="h-6" /> {/* Spacer */}
        {!isCollapsed && <div className="px-3 mb-2 text-[10px] uppercase font-mono text-[#F9F8F6]/50 tracking-wider">Knowledge</div>}

        <Link href="/competitors" className={getLinkClasses('/competitors')}>
          <div className="flex items-center gap-3">
            <Database size={16} className={getIconClasses('/competitors')} />
            {!isCollapsed && <span>Competitors</span>}
          </div>
          {!isCollapsed && <span className="text-[9px] uppercase font-bold tracking-wider bg-[#F16775]/20 text-[#F16775] px-1.5 py-0.5 rounded">Beta</span>}
        </Link>

        <Link href="/suppliers" className={getLinkClasses('/suppliers')}>
          <div className="flex items-center gap-3">
            <Database size={16} className={getIconClasses('/suppliers')} />
            {!isCollapsed && <span>Suppliers</span>}
          </div>
          {!isCollapsed && <span className="text-[9px] uppercase font-bold tracking-wider bg-[#F16775]/20 text-[#F16775] px-1.5 py-0.5 rounded">Beta</span>}
        </Link>
        
        <div className={`flex items-center justify-between px-3 py-2 text-sm rounded-xl border border-transparent text-[#F9F8F6]/40 cursor-not-allowed font-black tracking-wide ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <Anchor size={16} className="shrink-0 text-[#F9F8F6]/30" />
            {!isCollapsed && <span>Operations</span>}
          </div>
          {!isCollapsed && (
            <span className="text-[9px] uppercase font-bold tracking-wider bg-[#2D3142]/30 text-[#F9F8F6]/50 px-1.5 py-0.5 rounded">Soon</span>
          )}
        </div>
        
        <Link href="/rd" className={getLinkClasses('/rd')}>
          <div className="flex items-center gap-3">
            <FlaskConical size={16} className={getIconClasses('/rd')} />
            {!isCollapsed && <span>Research</span>}
          </div>
          {!isCollapsed && <span className="text-[9px] uppercase font-bold tracking-wider bg-[#F16775]/20 text-[#F16775] px-1.5 py-0.5 rounded">Beta</span>}
        </Link>

        <Link href="/requirements" className={getLinkClasses('/requirements')}>
          <div className="flex items-center gap-3">
            <BookOpen size={16} className={getIconClasses('/requirements')} />
            {!isCollapsed && <span>Requirements</span>}
          </div>
          {!isCollapsed && <span className="text-[9px] uppercase font-bold tracking-wider bg-[#F16775]/20 text-[#F16775] px-1.5 py-0.5 rounded">Beta</span>}
        </Link>

        <Link href="/tools" className={getLinkClasses('/tools')}>
          <div className="flex items-center gap-3">
            <Cpu size={16} className={getIconClasses('/tools')} />
            {!isCollapsed && <span>Agritech Tools</span>}
          </div>
          {!isCollapsed && <span className="text-[9px] uppercase font-bold tracking-wider bg-[#F16775]/20 text-[#F16775] px-1.5 py-0.5 rounded">Beta</span>}
        </Link>

        <div className={`flex items-center justify-between px-3 py-2 text-sm rounded-xl border border-transparent text-[#F9F8F6]/40 cursor-not-allowed font-black tracking-wide ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <FileText size={16} className="shrink-0 text-[#F9F8F6]/30" />
            {!isCollapsed && <span>Documents</span>}
          </div>
          {!isCollapsed && (
            <span className="text-[9px] uppercase font-bold tracking-wider bg-[#2D3142]/30 text-[#F9F8F6]/50 px-1.5 py-0.5 rounded">Soon</span>
          )}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-1">
        <a href="https://amrootorganics.com" target="_blank" rel="noopener noreferrer" className={getLinkClasses('/external-store')}>
          <div className="flex items-center gap-3">
            <ExternalLink size={16} className={getIconClasses('/external-store')} />
            {!isCollapsed && <span>Live Store</span>}
          </div>
        </a>
        <Link href="/settings" className={getLinkClasses('/settings')}>
          <div className="flex items-center gap-3">
            <Settings size={16} className={getIconClasses('/settings')} />
            {!isCollapsed && <span>Settings</span>}
          </div>
        </Link>
        <form action={logoutAction}>
          <button type="submit" className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-xl transition-all border border-transparent text-[#F9F8F6]/50 hover:bg-white/5 hover:text-white group ${isCollapsed ? 'justify-center' : ''}`}>
            <LogOut size={16} className="shrink-0 text-[#F9F8F6]/30 group-hover:text-white transition-colors" />
            {!isCollapsed && <span>Secure Logout</span>}
          </button>
        </form>
      </div>
      
    </div>
  );
}
