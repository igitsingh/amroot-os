"use client";

import React, { useState } from "react";
import { Search, LayoutGrid, Plus, Folder, MoreVertical, Users, MapPin } from 'lucide-react';

interface SupplierListsViewProps {
  initialSuppliers: any[];
  customLists: any[];
  onOpenList: (list: any) => void;
}

export default function SupplierListsView({ initialSuppliers, customLists, onOpenList }: SupplierListsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLists = customLists.filter(list => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return list.name.toLowerCase().includes(q) || list.region.toLowerCase().includes(q);
  });

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* LEFT FILTER SIDEBAR */}
      <div className="w-[280px] border-r border-[#2D3142]/10 flex flex-col bg-[#F4F1EA] shrink-0">
        <div className="p-3 border-b border-[#2D3142]/10 flex items-center justify-between bg-[#F4F1EA]">
          <span className="font-semibold text-[#2D3142]/90">List Filters</span>
        </div>
        
        <div className="p-3 border-b border-[#2D3142]/5">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#2D3142]/30" />
            <input 
              type="text" 
              placeholder="Search Lists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-[#2D3142]/10 rounded-md py-2 pl-9 pr-3 text-sm text-[#2D3142] placeholder:text-[#2D3142]/30 focus:outline-none focus:border-[#F16775]/50"
            />
          </div>
        </div>

        <div className="p-3 mt-auto border-t border-[#2D3142]/10 bg-[#F4F1EA]">
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#F16775] hover:bg-[#d95d6a] text-white rounded font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Create New List
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2D3142]/10 bg-[#F4F1EA]">
          <h2 className="text-lg font-semibold text-[#2D3142]">Saved Supplier Lists</h2>
          <div className="text-sm text-[#2D3142]/50">{filteredLists.length} Lists Found</div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLists.map((list) => (
              <div key={list.id} onClick={() => onOpenList(list)} className="border border-[#2D3142]/10 rounded-xl p-5 hover:shadow-lg transition-all bg-white flex flex-col group cursor-pointer hover:border-[#F16775]/30">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${list.color}`}>
                    <Folder className="w-6 h-6" />
                  </div>
                  <button className="text-[#2D3142]/30 hover:text-[#2D3142] transition-colors p-1" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="font-bold text-[#2D3142] mb-1 group-hover:text-[#F16775] transition-colors">{list.name}</h3>
                <div className="text-xs text-[#2D3142]/50 font-medium mb-6">Updated {list.updated}</div>

                <div className="flex items-center gap-4 mt-auto text-sm text-[#2D3142]/70 border-t border-[#2D3142]/5 pt-4">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#2D3142]/40" />
                    <span className="font-semibold text-[#2D3142]/90">{list.count}</span> Suppliers
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-4 h-4 text-[#2D3142]/40" />
                    <span className="truncate">{list.region}</span>
                  </div>
                </div>
              </div>
            ))}

            {filteredLists.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-[#2D3142]/40">
                <LayoutGrid className="w-12 h-12 mb-4 opacity-50" />
                <p>No lists created yet. Select suppliers and click Save to create one.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
