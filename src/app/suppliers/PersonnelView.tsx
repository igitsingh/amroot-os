"use client";

import React, { useState } from "react";
import { Search, Mail, Phone, Building, MoreHorizontal, User, Filter, ChevronDown, CheckSquare } from 'lucide-react';

interface PersonnelViewProps {
  initialSuppliers: any[];
}

export default function PersonnelView({ initialSuppliers }: PersonnelViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Extract personnel from suppliers
  const personnel = initialSuppliers.flatMap(s => {
    const list = [];
    if (s.primaryContact) {
      list.push({ ...s.primaryContact, supplierName: s.name, role: 'Primary Contact' });
    }
    if (s.contact && !s.primaryContact) {
      list.push({ name: s.contact, supplierName: s.name, role: 'Contact', email: '', phone: '' });
    }
    return list;
  });

  const filteredPersonnel = personnel.filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (p.name || '').toLowerCase().includes(q) || 
           (p.supplierName || '').toLowerCase().includes(q) || 
           (p.email || '').toLowerCase().includes(q);
  });

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* LEFT FILTER SIDEBAR */}
      <div className="w-[280px] border-r border-[#2D3142]/10 flex flex-col bg-[#F4F1EA] shrink-0">
        <div className="p-3 border-b border-[#2D3142]/10 flex items-center justify-between bg-[#F4F1EA]">
          <span className="font-semibold text-[#2D3142]/90">Filters</span>
          <span className="text-xs text-[#F16775] hover:text-blue-300 cursor-pointer">Clear</span>
        </div>
        
        <div className="p-3 border-b border-[#2D3142]/5">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#2D3142]/30" />
            <input 
              type="text" 
              placeholder="Search Personnel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-[#2D3142]/10 rounded-md py-2 pl-9 pr-3 text-sm text-[#2D3142] placeholder:text-[#2D3142]/30 focus:outline-none focus:border-[#F16775]/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="border-b border-[#2D3142]/5">
            <button className="w-full flex items-center justify-between py-3 px-4 hover:bg-white/[0.02] transition-colors group">
              <span className="text-xs font-semibold text-[#2D3142]/70 tracking-wide">Role</span>
              <ChevronDown className="w-4 h-4 text-[#2D3142]/40 group-hover:text-[#2D3142]/70" />
            </button>
            <div className="px-4 pb-3 flex flex-col gap-2">
              {['Primary Contact', 'Contact'].map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer group/label">
                  <div className="w-3.5 h-3.5 rounded-sm border border-[#2D3142]/20 group-hover/label:border-[#F16775]/50 bg-white flex items-center justify-center transition-colors" />
                  <span className="text-xs text-[#2D3142]/60 group-hover/label:text-[#2D3142]/90 truncate">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-[#2D3142]/10 bg-[#F4F1EA]">
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#F16775] hover:bg-[#d95d6a] text-white rounded font-medium transition-colors">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2D3142]/10 bg-[#F4F1EA]">
          <h2 className="text-lg font-semibold text-[#2D3142]">Personnel Directory</h2>
          <div className="text-sm text-[#2D3142]/50">{filteredPersonnel.length} Contacts Found</div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPersonnel.map((p, i) => (
              <div key={i} className="border border-[#2D3142]/10 rounded-lg p-4 hover:shadow-md transition-shadow bg-white flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#F16775] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F4F1EA] flex items-center justify-center text-[#2D3142]/50 font-bold border border-[#2D3142]/10">
                    {p.name.charAt(0)}
                  </div>
                  <button className="text-[#2D3142]/30 hover:text-[#2D3142] transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="font-semibold text-[#2D3142] mb-1 truncate">{p.name}</h3>
                <div className="text-xs text-[#2D3142]/50 font-medium mb-4">{p.role}</div>

                <div className="flex flex-col gap-2 mt-auto text-sm text-[#2D3142]/70">
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 shrink-0 text-[#2D3142]/40" />
                    <span className="truncate">{p.supplierName}</span>
                  </div>
                  {p.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 shrink-0 text-[#2D3142]/40" />
                      <span className="truncate">{p.email}</span>
                    </div>
                  )}
                  {p.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 shrink-0 text-[#2D3142]/40" />
                      <span className="truncate">{p.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredPersonnel.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-[#2D3142]/40">
                <User className="w-12 h-12 mb-4 opacity-50" />
                <p>No personnel found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
