"use client";

import React, { useState } from "react";
import SupplierDossier from './SupplierDossier';
import { 
  Search, ChevronDown, ChevronRight, Filter, Download, 
  Plus, Mail, Users, Building, MapPin, CheckSquare, 
  Square, Globe, LayoutGrid, ArrowUp, ArrowDown, ArrowUpDown, Eye
} from 'lucide-react';

interface SuppliersViewProps {
  initialSuppliers: any[];
}

export default function SuppliersView({ initialSuppliers }: SuppliersViewProps) {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'total' | 'net_new' | 'saved'>('total');
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    lists: true,
    name: true,
    location: true,
    curcumin: true,
  });

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  const toggleFilter = (key: string) => {
    setExpandedFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderSortHeader = (field: string, label: string, className: string = "") => {
    const isName = field === 'name';
    return (
    <th 
      className={`px-4 py-3 cursor-pointer select-none hover:bg-white/5 transition-colors group ${className}`}
      onClick={() => handleSort(field)}
    >
      <div className={`flex items-center gap-2 ${isName ? 'justify-start' : 'justify-center'} text-center`}>
        <span className="font-semibold text-white/50 group-hover:text-white/70 transition-colors whitespace-pre-line">{label}</span>
        <div className="flex flex-col">
          <ArrowUp className={`w-2.5 h-2.5 -mb-1 ${sortField === field && sortDirection === 'asc' ? 'text-blue-400' : 'text-white/20'}`} />
          <ArrowDown className={`w-2.5 h-2.5 ${sortField === field && sortDirection === 'desc' ? 'text-blue-400' : 'text-white/20'}`} />
        </div>
      </div>
    </th>
    );
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;
    
    const getVal = (supp: any, field: string) => {
      switch(field) {
        case 'name': return (supp.name || '').toLowerCase();
        case 'company': return (supp.name || '').toLowerCase();
        case 'entityType': return (supp.entityType || '').toLowerCase();
        case 'discovery': return (supp.discoveryMethod || '').toLowerCase();
        case 'location': return (supp.location || '').toLowerCase();
        case 'marketTier': return (supp.marketTier || '').toLowerCase();
        case 'curcumin': return supp.curcuminContent || 0;
        case 'price': return supp.pricePerKg || 0;
        default: return '';
      }
    };

    const aVal = getVal(a, sortField);
    const bVal = getVal(b, sortField);

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const selectedSupplier = suppliers.find(s => s.id === selectedId) || null;

  const FilterSection = ({ title, id }: { title: string, id: string }) => (
    <div className="border-b border-white/5">
      <button 
        onClick={() => toggleFilter(id)}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-white/[0.02] transition-colors group"
      >
        <span className="text-xs font-semibold text-white/70 tracking-wide">{title}</span>
        {expandedFilters[id] ? (
          <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white/70" />
        ) : (
          <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/70" />
        )}
      </button>
      {expandedFilters[id] && (
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2 w-3 h-3 text-white/30" />
            <input 
              type="text" 
              placeholder={`Search ${title}...`}
              className="w-full bg-white/[0.03] border border-white/10 rounded py-1.5 pl-7 pr-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>
      )}
    </div>
  );



  return (
    <div className="h-full flex flex-col bg-[#0A0A0A] overflow-hidden text-sm">
      
      {/* APOLLO TOP BAR */}
      <div className="flex flex-col border-b border-white/10 bg-[#0F0F0F] shrink-0">
        <div className="flex items-center px-4 py-2 border-b border-white/5">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-blue-400 font-medium text-sm border-b-2 border-blue-500 pb-2 -mb-[9px]">
              <Building className="w-4 h-4" /> Suppliers
            </button>
            <button className="flex items-center gap-2 text-white/60 hover:text-white font-medium text-sm pb-2 -mb-[9px] transition-colors">
              <Users className="w-4 h-4" /> Personnel
            </button>
            <button className="flex items-center gap-2 text-white/60 hover:text-white font-medium text-sm pb-2 -mb-[9px] transition-colors">
              <LayoutGrid className="w-4 h-4" /> Supplier Lists
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT FILTER SIDEBAR */}
        <div className="w-[280px] border-r border-white/10 flex flex-col bg-[#0F0F0F] shrink-0">
          <div className="p-3 border-b border-white/10 flex items-center justify-between bg-[#141414]">
            <span className="font-semibold text-white/90">Filters</span>
            <span className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">Clear</span>
          </div>
          
          <div className="p-3 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search Suppliers..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-md py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <FilterSection title="Lists" id="lists" />
            <FilterSection title="Supplier Name" id="name" />
            <FilterSection title="Location" id="location" />
            <FilterSection title="Market Tier" id="tier" />
            <FilterSection title="Certifications" id="certifications" />
            <FilterSection title="Curcumin %" id="curcumin" />
          </div>

          <div className="p-3 border-t border-white/10 bg-[#141414]">
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition-colors">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* MAIN DATA TABLE AREA */}
        <div className="flex-1 flex flex-col bg-[#0A0A0A] overflow-hidden">
          
          {/* Top Actions & Tabs */}
          <div className="flex flex-col border-b border-white/10 shrink-0 bg-[#0F0F0F]">
            <div className="flex items-center px-6 pt-3">
              <div className="flex gap-6">
                <button 
                  onClick={() => setActiveTab('total')}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'total' ? 'border-blue-500 text-blue-400' : 'border-transparent text-white/50 hover:text-white'}`}
                >
                  Total ({suppliers.length})
                </button>
                <button 
                  onClick={() => setActiveTab('net_new')}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'net_new' ? 'border-blue-500 text-blue-400' : 'border-transparent text-white/50 hover:text-white'}`}
                >
                  Net New (0)
                </button>
                <button 
                  onClick={() => setActiveTab('saved')}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'saved' ? 'border-blue-500 text-blue-400' : 'border-transparent text-white/50 hover:text-white'}`}
                >
                  Saved ({suppliers.length})
                </button>
              </div>
            </div>
            
            <div className="px-4 py-2 bg-[#141414] border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-colors">
                  <Plus className="w-4 h-4" /> Save
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-colors">
                  <Mail className="w-4 h-4" /> Email
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-colors">
                  <Download className="w-4 h-4" /> Export
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded text-white/50 hover:text-white border border-transparent hover:border-white/10 transition-colors">
                  Edit Columns
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
              <thead className="sticky top-0 z-10 bg-[#1A1A1A] border-b border-white/10 text-[11px] uppercase tracking-wider text-white/40 font-semibold shadow-sm">
                <tr>
                  <th className="px-4 py-3 w-10 text-center"><Square className="w-4 h-4 mx-auto" /></th>
                  {renderSortHeader("name", "Supplier Name", "min-w-[200px]")}
                  <th className="px-4 py-3 text-center">Quick Actions</th>
                  {renderSortHeader("company", "Company", "min-w-[150px]")}
                  {renderSortHeader("entityType", "Entity Type")}
                  {renderSortHeader("discovery", "Discovery")}
                  {renderSortHeader("location", "Location")}
                  {renderSortHeader("marketTier", "Market Tier")}
                  {renderSortHeader("curcumin", "Curcumin %")}
                  {renderSortHeader("price", "Price / kg")}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sortedSuppliers.map((supp) => {
                  return (
                    <tr key={supp.id} className="hover:bg-white/[0.02] group transition-colors">
                      <td className="px-4 py-3 w-10 text-center text-white/20 group-hover:text-white/40">
                        <Square className="w-4 h-4 mx-auto cursor-pointer" />
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => setSelectedId(supp.id)}
                          className="text-blue-400 hover:text-blue-300 font-medium transition-colors text-sm block w-full text-left"
                        >
                          {supp.name}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => setSelectedId(supp.id)}
                          className="p-1.5 rounded text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 transition-colors flex items-center justify-center"
                          title="View Dossier"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded border border-white/10 bg-black flex items-center justify-center font-bold text-white/50 text-xs shrink-0">
                            {supp.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-white/90 text-sm font-medium">{supp.name}</div>
                            {supp.primaryContact ? (
                              <div className="text-[11px] text-white/50 mt-0.5 flex flex-col gap-0.5">
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3 shrink-0" />
                                  <span className="truncate">{supp.primaryContact.name}</span>
                                </div>
                                <div className="text-white/40 ml-4 truncate">
                                  {supp.primaryContact.email}
                                </div>
                                <div className="text-white/40 ml-4 truncate">
                                  {supp.primaryContact.phone}
                                </div>
                              </div>
                            ) : supp.contact ? (
                              <div className="text-[11px] text-white/50 mt-0.5 flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {supp.contact}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-white/70 font-medium">
                        {supp.entityType || 'Unknown'}
                      </td>
                      <td className="px-4 py-3">
                        {supp.discoveryMethod ? (
                          <span className="inline-block whitespace-normal text-center leading-tight max-w-[110px] px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-white/70 font-medium tracking-wide">
                            {supp.discoveryMethod}
                          </span>
                        ) : (
                          <span className="text-white/20 text-[10px] italic">Not Tracked</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-white/70 whitespace-normal min-w-[200px] leading-snug">
                        {supp.location || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-sm text-white/70 capitalize">
                        {supp.marketTier || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-sm text-white/70 font-mono">
                        {supp.curcuminContent ? `${supp.curcuminContent}%` : 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="font-mono text-xs text-white/70">
                          {supp.pricePerKg ? `₹${supp.pricePerKg}` : 'TBD'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-white/10 bg-[#0F0F0F] flex items-center justify-between text-xs text-white/50">
            <span>1 - {suppliers.length} of {suppliers.length}</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5">Previous</button>
              <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 bg-white/[0.02]">1</button>
              <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5">Next</button>
            </div>
          </div>

        </div>

      </div>

      {selectedId && selectedSupplier && (
        <SupplierDossier 
          supplier={selectedSupplier} 
          onClose={() => setSelectedId(null)} 
        />
      )}
    </div>
  );
}
