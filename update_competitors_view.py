import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/app/competitors/CompetitorsView.tsx"

with open(file_path, 'r') as f:
    content = f.read()

# We need to add state for selections and search
# Find `const [expandedFilters...`
# We'll inject our new state right after `const [sortDirection...`

new_state_logic = """
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [globalSearch, setGlobalSearch] = useState('');
  const [filterTexts, setFilterTexts] = useState<Record<string, string>>({});

  const handleActionClick = (action: string) => {
    alert(`${action} action triggered!\\nSelected items: ${selectedIds.length}`);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredCompetitors.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(item => item !== id));
    }
  };

  const updateFilterText = (id: string, val: string) => {
    setFilterTexts(prev => ({...prev, [id]: val}));
  };
"""

# Let's completely rewrite the component logic for clarity, since there are a few moving pieces.
# It's easier to provide the full file content.

new_file_content = """
"use client";

import React, { useState } from "react";
import { getCompetitorIntel } from '../../data/competitorIntel';
import { Competitor } from '@prisma/client';
import CompetitorDossier from './CompetitorDossier';
import { 
  Search, ChevronDown, ChevronRight, Filter, Download, 
  Plus, Mail, Users, Building, MapPin, CheckSquare, 
  Square, Globe, LayoutGrid, ArrowUp, ArrowDown, ArrowUpDown, Eye
} from 'lucide-react';

interface CompetitorsViewProps {
  initialCompetitors: any[];
}

export default function CompetitorsView({ initialCompetitors }: CompetitorsViewProps) {
  const [competitors, setCompetitors] = useState(initialCompetitors);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'total' | 'net_new' | 'saved'>('total');
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    lists: true,
    name: true,
    location: true,
    positioning: true,
  });

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [globalSearch, setGlobalSearch] = useState('');
  const [filterTexts, setFilterTexts] = useState<Record<string, string>>({});

  const toggleFilter = (key: string) => {
    setExpandedFilters(prev => ({ ...prev, [key]: !prev[key] }));
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

  const handleActionClick = (action: string) => {
    alert(`${action} action triggered!\\nSelected items: ${selectedIds.length}`);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredCompetitors.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(item => item !== id));
    }
  };

  const updateFilterText = (id: string, val: string) => {
    setFilterTexts(prev => ({...prev, [id]: val}));
  };

  // Filter logic
  let filteredCompetitors = competitors.filter(comp => {
    const intel = getCompetitorIntel(comp.id);
    
    // Tab filtering
    if (activeTab === 'saved' && !selectedIds.includes(comp.id)) return false;
    if (activeTab === 'net_new') return false; // mock logic: no net new for now

    // Global Search
    if (globalSearch) {
      const term = globalSearch.toLowerCase();
      const matchName = comp.name.toLowerCase().includes(term);
      const matchCompany = (intel?.company || '').toLowerCase().includes(term);
      const matchLocation = (intel?.location || '').toLowerCase().includes(term);
      if (!matchName && !matchCompany && !matchLocation) return false;
    }

    // Sidebar Filters
    for (const key of Object.keys(filterTexts)) {
      if (!filterTexts[key]) continue;
      const term = filterTexts[key].toLowerCase();
      
      if (key === 'name' && !comp.name.toLowerCase().includes(term)) return false;
      if (key === 'location' && !(intel?.location || '').toLowerCase().includes(term)) return false;
      if (key === 'positioning' && !(intel?.positioningTags || []).join(' ').toLowerCase().includes(term)) return false;
      if (key === 'curcumin' && !(intel?.curcuminDisplay || '').toLowerCase().includes(term)) return false;
      if (key === 'certifications' && !(intel?.certifications || []).join(' ').toLowerCase().includes(term)) return false;
      if (key === 'export' && !(intel?.exportMarkets || '').toLowerCase().includes(term)) return false;
    }

    return true;
  });

  const sortedCompetitors = [...filteredCompetitors].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;
    
    const getVal = (comp: any, field: string) => {
      const isDiaspora = comp.id === 'brand-diaspora';
      const isPahadi = comp.name === 'My Pahadi Dukan';
      const isNiraam = comp.name === 'Niraam Superfoods' || comp.id === 'brand-niraam';
      const isMaatru = comp.name === 'Maatru Rasah' || comp.id === 'org-maatru-rasah';
      const isTwoBrothers = comp.name === 'Two Brothers Organic Farms' || comp.id === 'brand_vbix0z7r13x968q5j9p2' || comp.id === 'org-tbo-farms';
      const isTrinay = comp.name === 'Trinay Ayurveda' || comp.id === 'brand_ubgq8665djjkxzqbjp2k' || comp.id === 'org-trinay-ayurveda';
      switch(field) {
        case 'name': return comp.name.toLowerCase();
        case 'company': return isTrinay ? 'trinay ayurveda' : isTwoBrothers ? 'two brothers organic farms' : isMaatru ? 'prof impetus llp' : isNiraam ? 'navitrade overseas pvt. ltd.' : (isPahadi ? 'himkart india private limited' : (isDiaspora ? 'diaspora co. llc' : comp.name.toLowerCase()));
        case 'entityType': return isTrinay ? 'ayurvedic wellness brand' : isTwoBrothers ? 'regenerative dtc brand' : isMaatru ? 'artisanal dtc brand' : isNiraam ? 'dtc brand' : (isPahadi ? 'd2c marketplace' : (isDiaspora ? 'dtc brand / importer' : 'unknown'));
        case 'location': return isTrinay ? 'hyderabad, telangana' : isTwoBrothers ? 'pune, maharashtra' : isMaatru ? 'prayagraj, uttar pradesh' : isNiraam ? 'kolkata, west bengal' : (isPahadi ? 'roorkee, uttarakhand' : (isDiaspora ? 'oakland, california' : 'unknown'));
        case 'marketTier': return isTrinay ? 'unknown' : isTwoBrothers ? 'premium mass' : isMaatru ? 'premium artisanal' : isNiraam ? 'premium' : (isPahadi ? 'premium' : (isDiaspora ? 'ultra premium' : (comp.marketTier || 'unknown').toLowerCase()));
        case 'curcumin': return isTrinay ? 0 : isTwoBrothers ? 10.43 : isMaatru ? 9.5 : isNiraam ? 7.0 : (isPahadi ? 8.0 : (isDiaspora ? 4.7 : 0));
        default: return '';
      }
    };

    const aVal = getVal(a, sortField);
    const bVal = getVal(b, sortField);

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const selectedCompetitor = competitors.find(c => c.id === selectedId) || null;
  const isAllSelected = sortedCompetitors.length > 0 && selectedIds.length === sortedCompetitors.length;

  const clearFilters = () => {
    setGlobalSearch('');
    setFilterTexts({});
  };

  const FilterSection = ({ title, id }: { title: string, id: string }) => (
    <div className="border-b border-[#2D3142]/5">
      <button 
        onClick={() => toggleFilter(id)}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-white/[0.02] transition-colors group"
      >
        <span className="text-xs font-semibold text-[#2D3142]/70 tracking-wide">{title}</span>
        {expandedFilters[id] ? (
          <ChevronDown className="w-4 h-4 text-[#2D3142]/40 group-hover:text-[#2D3142]/70" />
        ) : (
          <ChevronRight className="w-4 h-4 text-[#2D3142]/40 group-hover:text-[#2D3142]/70" />
        )}
      </button>
      {expandedFilters[id] && (
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2 w-3 h-3 text-[#2D3142]/30" />
            <input 
              type="text" 
              placeholder={`Search ${title}...`}
              value={filterTexts[id] || ''}
              onChange={(e) => updateFilterText(id, e.target.value)}
              className="w-full bg-white/[0.03] border border-[#2D3142]/10 rounded py-1.5 pl-7 pr-2 text-xs text-[#2D3142] placeholder:text-[#2D3142]/30 focus:outline-none focus:border-[#F16775]/50"
            />
          </div>
        </div>
      )}
    </div>
  );

  const SortHeader = ({ field, label, className = "" }: { field: string, label: string, className?: string }) => (
    <th 
      className={`px-4 py-3 cursor-pointer select-none hover:bg-[#2D3142]/5 transition-colors group ${className}`}
      onClick={() => handleSort(field)}
    >
      <div className={`flex items-center gap-1.5 ${field === 'name' ? 'justify-start' : 'justify-center'} text-center`}>
        <span className="whitespace-pre-line">{label}</span>
        {sortField === field ? (
          sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 text-[#F16775]" /> : <ArrowDown className="w-3 h-3 text-[#F16775]" />
        ) : (
          <ArrowUpDown className="w-3 h-3 text-[#2D3142]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </th>
  );

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden text-sm">
      
      {/* APOLLO TOP BAR */}
      <div className="flex flex-col border-b border-[#2D3142]/10 bg-[#F4F1EA] shrink-0">
        <div className="flex items-center px-4 py-2 border-b border-[#2D3142]/5">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-[#F16775] font-medium text-sm border-b-2 border-[#F16775] pb-2 -mb-[9px]">
              <Building className="w-4 h-4" /> Organizations
            </button>
            <button className="flex items-center gap-2 text-[#2D3142]/60 hover:text-[#2D3142] font-medium text-sm pb-2 -mb-[9px] transition-colors">
              <Users className="w-4 h-4" /> Key Personnel
            </button>
            <button className="flex items-center gap-2 text-[#2D3142]/60 hover:text-[#2D3142] font-medium text-sm pb-2 -mb-[9px] transition-colors">
              <LayoutGrid className="w-4 h-4" /> Custom Lists
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT FILTER SIDEBAR */}
        <div className="w-[280px] border-r border-[#2D3142]/10 flex flex-col bg-[#F4F1EA] shrink-0">
          <div className="p-3 border-b border-[#2D3142]/10 flex items-center justify-between bg-[#F4F1EA]">
            <span className="font-semibold text-[#2D3142]/90">Filters</span>
            <span onClick={clearFilters} className="text-xs text-[#F16775] hover:text-[#2D3142] transition-colors cursor-pointer">Clear</span>
          </div>
          
          <div className="p-3 border-b border-[#2D3142]/5">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#2D3142]/30" />
              <input 
                type="text" 
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search Companies..."
                className="w-full bg-white/[0.03] border border-[#2D3142]/10 rounded-md py-2 pl-9 pr-3 text-sm text-[#2D3142] placeholder:text-[#2D3142]/30 focus:outline-none focus:border-[#F16775]/50"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <FilterSection title="Lists" id="lists" />
            <FilterSection title="Company Name" id="name" />
            <FilterSection title="Location" id="location" />
            <FilterSection title="Brand Positioning" id="positioning" />
            <FilterSection title="Certifications" id="certifications" />
            <FilterSection title="Curcumin %" id="curcumin" />
            <FilterSection title="Export Markets" id="export" />
          </div>

          <div className="p-3 border-t border-[#2D3142]/10 bg-[#F4F1EA]">
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#F16775] hover:bg-[#E05663] text-white rounded font-medium transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* MAIN DATA TABLE AREA */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          
          {/* Top Actions & Tabs */}
          <div className="flex flex-col border-b border-[#2D3142]/10 shrink-0 bg-[#F4F1EA]">
            <div className="flex items-center px-6 pt-3">
              <div className="flex gap-6">
                <button 
                  onClick={() => setActiveTab('total')}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'total' ? 'border-[#F16775] text-[#F16775]' : 'border-transparent text-[#2D3142]/50 hover:text-[#2D3142]'}`}
                >
                  Total ({competitors.length})
                </button>
                <button 
                  onClick={() => setActiveTab('net_new')}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'net_new' ? 'border-[#F16775] text-[#F16775]' : 'border-transparent text-[#2D3142]/50 hover:text-[#2D3142]'}`}
                >
                  Net New (0)
                </button>
                <button 
                  onClick={() => setActiveTab('saved')}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'saved' ? 'border-[#F16775] text-[#F16775]' : 'border-transparent text-[#2D3142]/50 hover:text-[#2D3142]'}`}
                >
                  Saved ({selectedIds.length})
                </button>
              </div>
            </div>
            
            <div className="px-4 py-2 bg-[#F4F1EA] border-t border-[#2D3142]/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={() => handleActionClick('Save')} className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#2D3142]/5 hover:bg-[#2D3142]/10 text-[#2D3142]/80 border border-[#2D3142]/10 transition-colors">
                  <Plus className="w-4 h-4" /> Save
                </button>
                <button onClick={() => handleActionClick('Email')} className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#2D3142]/5 hover:bg-[#2D3142]/10 text-[#2D3142]/80 border border-[#2D3142]/10 transition-colors">
                  <Mail className="w-4 h-4" /> Email
                </button>
                <button onClick={() => handleActionClick('Export')} className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#2D3142]/5 hover:bg-[#2D3142]/10 text-[#2D3142]/80 border border-[#2D3142]/10 transition-colors">
                  <Download className="w-4 h-4" /> Export
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded text-[#2D3142]/50 hover:text-[#2D3142] border border-transparent hover:border-[#2D3142]/10 transition-colors">
                  Edit Columns
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
              <thead className="sticky top-0 z-10 bg-[#F9F8F6] border-b border-[#2D3142]/10 text-[11px] uppercase tracking-wider text-[#2D3142]/40 font-semibold shadow-sm">
                <tr>
                  <th className="px-4 py-3 w-10 text-center">
                    <input 
                      type="checkbox" 
                      className="cursor-pointer accent-[#F16775]"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <SortHeader field="name" label="Competitor Name" className="min-w-[200px]" />
                  <th className="px-4 py-3 text-center">Quick Actions</th>
                  <SortHeader field="company" label="Company" className="min-w-[150px]" />
                  <SortHeader field="entityType" label="Entity Type" />
                  <SortHeader field="location" label="Location" />
                  <SortHeader field="marketTier" label="Market Tier" />
                  <SortHeader field="curcumin" label="Curcumin %" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D3142]/5">
                {sortedCompetitors.map((comp) => {
                  const intel = getCompetitorIntel(comp.id);
                  const company = intel?.company?.toUpperCase() || 'UNKNOWN';
                  const entityType = intel?.entityType?.replace(/ \w/g, l => l.toUpperCase()) || 'Unknown';
                  const location = intel?.location?.replace(/ \w/g, l => l.toUpperCase()) || 'Unknown';
                  const marketTier = intel?.marketTier?.replace(/ \w/g, l => l.toUpperCase()) || 'Unknown';
                  const curcuminDisplay = intel?.curcuminDisplay || 'Unknown';
                  const websiteDisplay = intel?.websiteDisplay && intel.websiteDisplay !== "unknown" ? intel.websiteDisplay : 'website.com';
                  const websiteUrl = intel?.websiteUrl && intel.websiteUrl !== "#" ? intel.websiteUrl : 'https://website.com';
                  const isSelected = selectedIds.includes(comp.id);
                  
                  return (
                    <tr key={comp.id} className={`hover:bg-white/[0.02] group transition-colors ${isSelected ? 'bg-[#F16775]/5' : ''}`}>
                      <td className="px-4 py-3 w-10 text-center">
                        <input 
                          type="checkbox" 
                          className="cursor-pointer accent-[#F16775]"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(comp.id, e.target.checked)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => setSelectedId(comp.id)}
                          className="text-[#F16775] hover:text-blue-300 font-medium transition-colors text-sm block w-full text-left"
                        >
                          {comp.name}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button 
                          onClick={() => setSelectedId(comp.id)}
                          className="p-1.5 rounded text-[#F16775] hover:bg-[#F16775]/10 hover:text-blue-300 transition-colors group relative"
                          title="View Dossier"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded border border-[#2D3142]/10 bg-[#F4F1EA] flex items-center justify-center font-bold text-[#2D3142]/50 text-xs shrink-0">
                            {comp.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-[#2D3142]/90 text-sm font-medium">{company}</div>
                            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className={`text-[11px] ${websiteDisplay !== 'website.com' ? 'text-[#F16775]/80 hover:text-[#F16775]' : 'text-[#2D3142]/30 cursor-not-allowed pointer-events-none'} flex items-center gap-1 mt-0.5`} onClick={(e) => { e.stopPropagation(); if (websiteDisplay === 'website.com') e.preventDefault(); }}>
                              <Globe className="w-3 h-3" /> 
                              {websiteDisplay}
                            </a>
                            
                            {(() => {
                              const hasNewSocial = intel?.socialMedia && (
                                (intel.socialMedia?.instagram && intel.socialMedia?.instagram !== 'Not Publicly Available') || 
                                (intel.socialMedia?.facebook && intel.socialMedia?.facebook !== 'Not Publicly Available') || 
                                (intel.socialMedia?.linkedin && intel.socialMedia?.linkedin !== 'Not Publicly Available')
                              );
                              const hasOldSocial = intel?.instagramHandle || intel?.facebookHandle || ((intel as any)?.linkedin);
                              
                              if (hasNewSocial) {
                                return (
                                  <div className="flex flex-col gap-1 mt-2 text-[10px] text-[#2D3142]/50 font-mono">
                                    {intel.socialMedia?.instagram && intel.socialMedia?.instagram !== 'Not Publicly Available' && (
                                      <a href={intel.instagramUrl || (intel.socialMedia?.instagram.startsWith('http') ? intel.socialMedia.instagram : `https://instagram.com/${intel.socialMedia?.instagram.replace('@', '')}`)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#F16775] transition-colors" onClick={(e) => e.stopPropagation()}>
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
303:                                         {intel.socialMedia?.instagram.replace('https://instagram.com/', '').replace('https://www.instagram.com/', '')}
304:                                       </a>
305:                                     )}
306:                                     {intel.socialMedia?.facebook && intel.socialMedia?.facebook !== 'Not Publicly Available' && (
307:                                       <a href={intel.facebookUrl || (intel.socialMedia?.facebook.startsWith('http') ? intel.socialMedia.facebook : `https://facebook.com/${intel.socialMedia?.facebook.replace(' ', '')}`)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#F16775] transition-colors" onClick={(e) => e.stopPropagation()}>
308:                                         <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
309:                                         {intel.socialMedia?.facebook.replace('https://facebook.com/', '').replace('https://www.facebook.com/', '')}
310:                                       </a>
311:                                     )}
312:                                   </div>
313:                                 );
314:                               } else if (hasOldSocial) {
315:                                 return (
316:                                   <div className="flex flex-col gap-1 mt-2 text-[10px] text-[#2D3142]/50 font-mono">
317:                                     {intel?.instagramHandle && (
318:                                       <a href={intel?.instagramUrl || (intel?.instagramHandle?.startsWith('http') ? intel.instagramHandle : `https://instagram.com/${intel?.instagramHandle?.replace('@', '')}`)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#F16775] transition-colors" onClick={(e) => e.stopPropagation()}>
319:                                         <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
320:                                         {intel?.instagramHandle?.replace('https://instagram.com/', '').replace('https://www.instagram.com/', '')}
321:                                       </a>
322:                                     )}
323:                                     {intel?.facebookHandle && (
324:                                       <a href={intel?.facebookUrl || (intel?.facebookHandle?.startsWith('http') ? intel.facebookHandle : `https://facebook.com/${intel?.facebookHandle?.replace(' ', '')}`)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#F16775] transition-colors" onClick={(e) => e.stopPropagation()}>
325:                                         <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
326:                                         {intel?.facebookHandle?.replace('https://facebook.com/', '').replace('https://www.facebook.com/', '')}
327:                                       </a>
328:                                     )}
329:                                   </div>
330:                                 );
331:                               }
332:                               
333:                               return (
334:                                 <div className="flex flex-col gap-1 mt-2 text-[10px] text-[#2D3142]/20 italic font-mono">
335:                                   [ No social links verified ]
336:                                 </div>
337:                               );
338:                             })()}
339:                           </div>
340:                         </div>
341:                       </td>
342:                       <td className="px-4 py-3 text-sm text-[#2D3142]/70 font-medium">{entityType}</td>
343:                       <td className="px-4 py-3 text-sm text-[#2D3142]/50">{location}</td>
344:                       <td className="px-4 py-3">
345:                         <span className="px-2 py-1 rounded text-xs font-medium border border-[#F16775]/20 bg-[#F16775]/10 text-[#F16775] whitespace-nowrap">
346:                           {marketTier}
347:                         </span>
348:                       </td>
349:                       <td className="px-4 py-3 text-sm font-mono text-[#034F46]">
350:                         {curcuminDisplay}
351:                       </td>
352:                     </tr>
353:                   );
354:                 })}
355: 
356: 
357: 
358:               </tbody>
359:             </table>
360:           </div>
361: 
362:           <div className="p-4 border-t border-[#2D3142]/10 bg-[#F4F1EA] flex items-center justify-between text-xs text-[#2D3142]/50">
363:             <span>1 - {sortedCompetitors.length} of {sortedCompetitors.length}</span>
364:             <div className="flex gap-2">
365:               <button className="px-3 py-1 border border-[#2D3142]/10 rounded hover:bg-[#2D3142]/5">Previous</button>
366:               <button className="px-3 py-1 border border-[#2D3142]/10 rounded hover:bg-[#2D3142]/5 bg-white/[0.02]">1</button>
367:               <button className="px-3 py-1 border border-[#2D3142]/10 rounded hover:bg-[#2D3142]/5">Next</button>
368:             </div>
369:           </div>
370: 
371:         </div>
372: 
373:       </div>
374: 
375:       {selectedId && selectedCompetitor && (
376:         <CompetitorDossier 
377:           competitor={selectedCompetitor} 
378:           onClose={() => setSelectedId(null)} 
379:         />
380:       )}
381:     </div>
382:   );
}
"""

with open(file_path, 'w') as f:
    f.write(new_file_content)

print("Updated CompetitorsView.tsx")
