import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/components/Sidebar.tsx"
with open(file_path, 'r') as f:
    content = f.read()

new_content = """'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Sparkles, Calendar, Database, Anchor, FlaskConical, FileText, Settings, PanelLeftClose, PanelLeftOpen, Cpu, BookOpen } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname === path || pathname.startsWith(path + '/');
  };

  const getLinkClasses = (path: string) => {
    const active = isActive(path);
    return `flex items-center gap-3 px-3 py-2 text-sm rounded-xl transition-all ${isCollapsed ? 'justify-center' : ''} group border border-transparent ${active ? 'bg-white/10 text-white font-medium' : 'text-[#F9F8F6]/70 hover:bg-white/5 hover:text-white hover:border-white/10'}`;
  };

  const getIconClasses = (path: string) => {
    const active = isActive(path);
    return `shrink-0 transition-colors ${active ? 'text-white' : 'text-[#F9F8F6]/50 group-hover:text-white'}`;
  };

  return (
    <div className={`${isCollapsed ? 'w-20 items-center' : 'w-60'} transition-all duration-300 bg-[#034F46] h-screen flex flex-col px-4 py-6 flex-shrink-0 relative z-50`}>
      
      {/* Header with Logo and Toggle */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-8 px-2`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            {/* Golden Glowing Circle Logo */}
            <button onClick={() => setIsCollapsed(true)} className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_3px_rgba(251,191,36,0.6)] animate-pulse" />
            <span className="font-medium text-[#F9F8F6] tracking-wide text-sm">AmrootOS</span>
          </div>
        )}
        {isCollapsed && (
           <button onClick={() => setIsCollapsed(false)} className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_3px_rgba(251,191,36,0.6)] animate-pulse mb-4 mt-2" />
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`text-[#F9F8F6]/50 hover:text-[#F9F8F6] transition-colors ${isCollapsed ? 'absolute bottom-8' : ''}`}
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <div className="flex flex-col space-y-1 flex-1 mt-4">
        
        <Link href="/" className={getLinkClasses('/')}>
          <Sparkles size={16} className={getIconClasses('/')} />
          {!isCollapsed && <span>Command Center</span>}
        </Link>

        <div className="h-6" /> {/* Spacer */}
        {!isCollapsed && <div className="px-3 mb-2 text-[10px] uppercase font-mono text-[#F9F8F6]/50 tracking-wider">Knowledge</div>}

        <Link href="/competitors" className={getLinkClasses('/competitors')}>
          <Database size={16} className={getIconClasses('/competitors')} />
          {!isCollapsed && <span>Competitors</span>}
        </Link>

        <Link href="/suppliers" className={getLinkClasses('/suppliers')}>
          <Database size={16} className={getIconClasses('/suppliers')} />
          {!isCollapsed && <span>Suppliers</span>}
        </Link>
        
        <Link href="/operations" className={getLinkClasses('/operations')}>
          <Anchor size={16} className={getIconClasses('/operations')} />
          {!isCollapsed && <span>Operations</span>}
        </Link>
        
        <Link href="/rd" className={getLinkClasses('/rd')}>
          <FlaskConical size={16} className={getIconClasses('/rd')} />
          {!isCollapsed && <span>Research</span>}
        </Link>

        <Link href="/requirements" className={getLinkClasses('/requirements')}>
          <BookOpen size={16} className={getIconClasses('/requirements')} />
          {!isCollapsed && <span>Requirements</span>}
        </Link>

        <Link href="/tools" className={getLinkClasses('/tools')}>
          <Cpu size={16} className={getIconClasses('/tools')} />
          {!isCollapsed && <span>Agritech Tools</span>}
        </Link>

        <Link href="/vault" className={getLinkClasses('/vault')}>
          <FileText size={16} className={getIconClasses('/vault')} />
          {!isCollapsed && <span>Documents</span>}
        </Link>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10">
        <Link href="/settings" className={getLinkClasses('/settings')}>
          <Settings size={16} className={getIconClasses('/settings')} />
          {!isCollapsed && <span>Settings</span>}
        </Link>
      </div>
      
    </div>
  );
}
"""

with open(file_path, 'w') as f:
    f.write(new_content)

print("Updated Sidebar navigation")
