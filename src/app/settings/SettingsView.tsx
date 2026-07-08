"use client";

import React, { useState, useEffect } from 'react';
import { 
  User, Bell, Lock, Key, Globe, Shield, CreditCard, 
  Database, Monitor, Smartphone, Check, HelpCircle, AlertCircle
} from 'lucide-react';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'api', label: 'API & Integrations', icon: Key },
    { id: 'team', label: 'Team Management', icon: Globe },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
  ];

  const [profiles, setProfiles] = useState([
    {
      id: 'p1',
      firstName: 'Deepanshu',
      lastName: 'Singh',
      email: 'deepanshu@amrootos.com',
      initials: 'DS',
      role: 'Admin User'
    }
  ]);
  const [currentProfile, setCurrentProfile] = useState(profiles[0]);
  const [theme, setTheme] = useState('Light');
  const [compactMode, setCompactMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('amroot_settings_deepanshu');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentProfile) setCurrentProfile(parsed.currentProfile);
        if (parsed.theme) setTheme(parsed.theme);
        if (typeof parsed.compactMode === 'boolean') setCompactMode(parsed.compactMode);
      }
    } catch (e) {}
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      localStorage.setItem('amroot_settings_deepanshu', JSON.stringify({
        currentProfile,
        theme,
        compactMode
      }));
    } catch (e) {}

    setTimeout(() => {
      setIsSaving(false);
      showToast("Settings saved successfully!");
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F1EA]">
      {toast && (
        <div className="absolute top-6 right-6 z-50 bg-[#2D3142] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <Check className="w-4 h-4 text-[#F16775]" />
          <span className="font-medium text-sm">{toast}</span>
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col justify-center px-8 py-8 border-b border-[#2D3142]/10 bg-white shrink-0">
        <h1 className="text-3xl font-bold tracking-tight text-[#2D3142]">Settings</h1>
        <p className="text-[#2D3142]/60 text-sm mt-1">Manage your account preferences, integrations, and workspace settings.</p>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Nav */}
        <div className="w-64 border-r border-[#2D3142]/10 bg-white/50 shrink-0 p-4 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    isActive 
                      ? 'bg-[#F16775]/10 text-[#F16775]' 
                      : 'text-[#2D3142]/60 hover:bg-white hover:text-[#2D3142] hover:shadow-sm'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F16775]' : 'text-[#2D3142]/40'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            {activeTab === 'profile' && (
              <form onSubmit={handleSave} className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                
                {/* Profile Header section */}
                <div className="flex items-center gap-6 pb-8 border-b border-[#2D3142]/10">
                  <div className="relative group cursor-pointer" onClick={() => showToast("Avatar upload feature coming soon!")}>
                    <div className="w-24 h-24 rounded-full bg-[#2D3142] flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden border-4 border-white">
                      {currentProfile.initials}
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-medium">Edit</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2D3142]">{currentProfile.firstName} {currentProfile.lastName}</h3>
                    <p className="text-[#2D3142]/50 text-sm">{currentProfile.role} • {currentProfile.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#2D3142]/70 uppercase tracking-wider">First Name</label>
                    <input 
                      type="text" 
                      value={currentProfile.firstName} 
                      onChange={(e) => setCurrentProfile({...currentProfile, firstName: e.target.value})}
                      className="w-full bg-white border border-[#2D3142]/10 rounded-lg py-2.5 px-4 text-sm text-[#2D3142] focus:outline-none focus:border-[#F16775]/50 shadow-sm transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#2D3142]/70 uppercase tracking-wider">Last Name</label>
                    <input 
                      type="text" 
                      value={currentProfile.lastName} 
                      onChange={(e) => setCurrentProfile({...currentProfile, lastName: e.target.value})}
                      className="w-full bg-white border border-[#2D3142]/10 rounded-lg py-2.5 px-4 text-sm text-[#2D3142] focus:outline-none focus:border-[#F16775]/50 shadow-sm transition-colors" 
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-semibold text-[#2D3142]/70 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      value={currentProfile.email} 
                      className="w-full bg-[#2D3142]/5 border border-[#2D3142]/10 rounded-lg py-2.5 px-4 text-sm text-[#2D3142]/50 cursor-not-allowed shadow-sm" 
                      disabled 
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-[#2D3142]/10">
                  <h3 className="text-lg font-semibold text-[#2D3142]">Preferences</h3>
                  
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#2D3142]/10 shadow-sm">
                    <div>
                      <h4 className="font-medium text-[#2D3142] text-sm">Theme Preference</h4>
                      <p className="text-xs text-[#2D3142]/50 mt-1">Adjust the appearance of your workspace</p>
                    </div>
                    <div className="flex bg-[#F4F1EA] rounded-lg p-1">
                      {['Light', 'Dark', 'System'].map((t) => (
                        <button 
                          key={t}
                          type="button" 
                          onClick={() => setTheme(t)}
                          className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                            theme === t 
                              ? 'bg-white shadow-sm text-[#2D3142]' 
                              : 'text-[#2D3142]/60 hover:text-[#2D3142]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#2D3142]/10 shadow-sm">
                    <div>
                      <h4 className="font-medium text-[#2D3142] text-sm">Compact Mode</h4>
                      <p className="text-xs text-[#2D3142]/50 mt-1">Show more data on the screen by reducing padding</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={compactMode} onChange={() => setCompactMode(!compactMode)} />
                      <div className="w-11 h-6 bg-[#2D3142]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F16775]"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button type="submit" disabled={isSaving} className="px-6 py-2.5 rounded-lg font-semibold bg-[#F16775] text-white hover:bg-[#E05663] transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-xl font-semibold text-[#2D3142] mb-4">Notification Preferences</h2>
                
                {[
                  { title: "Weekly Digests", desc: "Receive a weekly summary of new intelligence gathered." },
                  { title: "Competitor Updates", desc: "Get notified when a tracked competitor launches a new product." },
                  { title: "Supplier Alerts", desc: "Critical alerts regarding supplier certifications or compliance." },
                  { title: "Research Job Completion", desc: "Alerts when your autonomous AI research jobs finish." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 bg-white rounded-xl border border-[#2D3142]/10 shadow-sm">
                    <div className="pr-8">
                      <h4 className="font-medium text-[#2D3142] text-sm">{item.title}</h4>
                      <p className="text-xs text-[#2D3142]/60 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input type="checkbox" className="sr-only peer" defaultChecked={idx !== 0} />
                      <div className="w-11 h-6 bg-[#2D3142]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F16775]"></div>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-start gap-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-900">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Developer API Keys</p>
                    <p className="opacity-80">These keys grant programmatic access to your Amroot OS workspace. Keep them secure and never expose them in public repositories.</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#2D3142] mb-4">Active API Keys</h3>
                  <div className="bg-white rounded-xl border border-[#2D3142]/10 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#F4F1EA] border-b border-[#2D3142]/5 text-[#2D3142]/50 font-medium">
                        <tr>
                          <th className="px-6 py-3">Key Name</th>
                          <th className="px-6 py-3">Token</th>
                          <th className="px-6 py-3">Created</th>
                          <th className="px-6 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2D3142]/5">
                        <tr className="hover:bg-black/[0.02]">
                          <td className="px-6 py-4 font-medium text-[#2D3142]">Production API</td>
                          <td className="px-6 py-4 font-mono text-xs text-[#2D3142]/50">amroot_live_****************</td>
                          <td className="px-6 py-4 text-[#2D3142]/60">Oct 12, 2025</td>
                          <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 rounded text-xs font-semibold">Active</span></td>
                        </tr>
                        <tr className="hover:bg-black/[0.02]">
                          <td className="px-6 py-4 font-medium text-[#2D3142]">Staging Testing</td>
                          <td className="px-6 py-4 font-mono text-xs text-[#2D3142]/50">amroot_test_****************</td>
                          <td className="px-6 py-4 text-[#2D3142]/60">Jan 04, 2026</td>
                          <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 rounded text-xs font-semibold">Active</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <button className="mt-4 px-4 py-2 text-sm font-semibold border border-[#2D3142]/20 rounded-lg hover:border-[#F16775] hover:text-[#F16775] transition-colors">
                    + Generate New Key
                  </button>
                </div>
              </div>
            )}

            {/* Other tabs placeholder */}
            {['security', 'team', 'billing'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-16 h-16 bg-[#2D3142]/5 rounded-2xl flex items-center justify-center mb-4">
                  <Monitor className="w-8 h-8 text-[#2D3142]/20" />
                </div>
                <h3 className="text-xl font-semibold text-[#2D3142] mb-2">Module Under Construction</h3>
                <p className="text-[#2D3142]/50 text-sm max-w-sm">This section of the settings panel is currently being upgraded. Check back soon for new features.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
