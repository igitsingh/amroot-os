"use client";

import React, { useState, useMemo } from "react";
import { getCompetitorIntel } from '../../data/competitorIntel';
import { Competitor } from '@prisma/client';
import CompetitorDossier from './CompetitorDossier';
import { Search, ChevronDown, ChevronRight, Filter, Download, X, 
  Plus, Mail, Users, Building, MapPin, CheckSquare, 
  Square, Globe, LayoutGrid, ArrowUp, ArrowDown, ArrowUpDown, Eye, Send, Check
} from 'lucide-react';

const CompetitorPersonnelView = ({ initialCompetitors }: { initialCompetitors: any[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Create mock personnel for competitors based on company names
  const personnel = initialCompetitors.map((c, i) => {
    const intel = getCompetitorIntel(c.id);
    const company = intel?.company || c.name;
    const names = ['John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Davis', 'Robert Taylor'];
    return {
      name: names[i % names.length] + (i > 4 ? ` ${i}` : ''),
      supplierName: company,
      role: i % 2 === 0 ? 'Founder / CEO' : 'Head of Procurement',
      email: `contact${i}@${company.toLowerCase().replace(/[^a-z]/g, '')}.com`,
      phone: '+1 555-01' + String(i).padStart(2, '0')
    };
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
      <div className="w-[280px] border-r border-[#2D3142]/10 flex flex-col bg-[#F4F1EA] shrink-0">
        <div className="p-3 border-b border-[#2D3142]/10 flex items-center justify-between bg-[#F4F1EA]">
          <span className="font-semibold text-[#2D3142]/90">Filters</span>
          <span className="text-xs text-[#F16775] hover:text-[#E05663] cursor-pointer">Clear</span>
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
              {['Founder / CEO', 'Head of Procurement'].map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer group/label">
                  <div className="w-3.5 h-3.5 rounded-sm border border-[#2D3142]/20 group-hover/label:border-[#F16775]/50 bg-white flex items-center justify-center transition-colors" />
                  <span className="text-xs text-[#2D3142]/60 group-hover/label:text-[#2D3142]/90 truncate">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-[#2D3142]/10 bg-[#F4F1EA]">
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#F16775] hover:bg-[#E05663] text-white rounded font-medium transition-colors">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2D3142]/10 bg-[#F4F1EA]">
          <h2 className="text-lg font-semibold text-[#2D3142]">Key Personnel Directory</h2>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CompetitorListsView = ({ initialCompetitors, customLists, onOpenList }: { initialCompetitors: any[], customLists: any[], onOpenList: (list: any) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLists = customLists.filter(list => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return list.name.toLowerCase().includes(q) || list.region.toLowerCase().includes(q);
  });

  return (
    <div className="flex-1 flex overflow-hidden">
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
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#F16775] hover:bg-[#E05663] text-white rounded font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Create New List
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2D3142]/10 bg-[#F4F1EA]">
          <h2 className="text-lg font-semibold text-[#2D3142]">Custom Competitor Lists</h2>
          <div className="text-sm text-[#2D3142]/50">{filteredLists.length} Lists Found</div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLists.map((list) => (
              <div key={list.id} onClick={() => onOpenList(list)} className="border border-[#2D3142]/10 rounded-xl p-5 hover:shadow-lg transition-all bg-white flex flex-col group cursor-pointer hover:border-[#F16775]/30">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${list.color}`}>
                    <LayoutGrid className="w-6 h-6" />
                  </div>
                </div>
                
                <h3 className="font-bold text-[#2D3142] mb-1 group-hover:text-[#F16775] transition-colors">{list.name}</h3>
                <div className="text-xs text-[#2D3142]/50 font-medium mb-6">Updated {list.updated}</div>

                <div className="flex items-center gap-4 mt-auto text-sm text-[#2D3142]/70 border-t border-[#2D3142]/5 pt-4">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-[#2D3142]/40" />
                    <span className="font-semibold text-[#2D3142]/90">{list.count}</span> Organizations
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
                <p>No lists created yet. Select competitors and click Save to create one.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CompetitorsViewProps {
  initialCompetitors: any[];
}

export default function CompetitorsView({ initialCompetitors }: CompetitorsViewProps) {
  const [competitors, setCompetitors] = useState(initialCompetitors);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'total' | 'net_new' | 'saved'>('total');
  const [mainTab, setMainTab] = useState<'competitors' | 'personnel' | 'lists'>('competitors');
  
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    name: true,
    location: true,
    positioning: true,
    curcumin: true,
    certifications: true,
    export: true
  });

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [globalSearch, setGlobalSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  
  const [selectedCurcuminFilters, setSelectedCurcuminFilters] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPositioning, setSelectedPositioning] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [selectedExport, setSelectedExport] = useState<string[]>([]);
  const [showMoreFiltersModal, setShowMoreFiltersModal] = useState(false);

  // Modals & Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');
  
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [selectedSaveLists, setSelectedSaveLists] = useState<number[]>([]);
  const [newListName, setNewListName] = useState('');
  const [customLists, setCustomLists] = useState<{id: number, name: string, count: number, region: string, updated: string, color: string, competitorIds: string[]}[]>([]);
  
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    name: true, quickActions: true, company: true, entityType: true, location: true, marketTier: true, curcumin: true
  });
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);

  const curcuminOptions = [
    'Less than 1%', '1%', '2%', '3%', '4%', '5%', '6%', 
    '7%', '8%', '9%', '10%', '11%', '12%', '13%'
  ];

  const filterOptions = useMemo(() => {
    const locations = new Set<string>();
    const positioning = new Set<string>();
    const certifications = new Set<string>();
    const exports = new Set<string>();

    initialCompetitors.forEach(comp => {
      const intel = getCompetitorIntel(comp.id);
      if (intel) {
        if (intel.country && intel.country !== 'Unknown') locations.add(intel.country);
        if (intel.positioningTags) intel.positioningTags.forEach((tag: string) => positioning.add(tag));
        if (intel.certifications) intel.certifications.forEach((cert: string) => certifications.add(cert));
        if (intel.exportMarkets && intel.exportMarkets !== 'Unknown') {
          const parts = intel.exportMarkets.split(',').map((p: string) => p.trim()).filter((p: string) => p);
          parts.forEach((p: string) => exports.add(p));
        }
      }
    });

    return {
      locations: Array.from(locations).sort(),
      positioning: Array.from(positioning).sort(),
      certifications: Array.from(certifications).sort(),
      exports: Array.from(exports).sort()
    };
  }, [initialCompetitors]);

  const toggleFilter = (key: string) => setExpandedFilters(prev => ({ ...prev, [key]: !prev[key] }));

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

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(filteredCompetitors.map(c => c.id));
    else setSelectedIds([]);
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) setSelectedIds(prev => [...prev, id]);
    else setSelectedIds(prev => prev.filter(item => item !== id));
  };

  const toggleCheckboxFilter = (val: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportCSV = () => {
    const dataToExport = selectedIds.length > 0 
      ? sortedCompetitors.filter(s => selectedIds.includes(s.id))
      : sortedCompetitors;
      
    if (dataToExport.length === 0) {
      showToast("No competitors to export");
      return;
    }

    const headers = ['Competitor Name', 'Company', 'Entity Type', 'Location', 'Market Tier', 'Curcumin %'];
    const csvContent = [
      headers.join(','),
      ...dataToExport.map(comp => {
        const intel = getCompetitorIntel(comp.id);
        const company = intel?.company || 'UNKNOWN';
        const entityType = intel?.entityType || 'Unknown';
        const location = intel?.location || 'Unknown';
        const marketTier = intel?.marketTier || comp.marketTier || 'Unknown';
        const curcuminDisplay = intel?.curcuminDisplay || 'Unknown';
        
        return [
          `"${comp.name || ''}"`,
          `"${company}"`,
          `"${entityType}"`,
          `"${location}"`,
          `"${marketTier}"`,
          `"${curcuminDisplay}"`
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'competitors_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${dataToExport.length} competitors`);
  };

  const getCurcuminRange = (comp: any, intel: any) => {
    let min = 0, max = 0;
    if (intel && intel.curcuminDisplay) {
      const matches = [...intel.curcuminDisplay.matchAll(/(\d+(\.\d+)?)/g)];
      if (matches.length > 0) {
         const nums = matches.map(m => parseFloat(m[1]));
         min = Math.min(...nums);
         max = Math.max(...nums);
         return { min, max };
      }
    }
    const isTwoBrothers = comp.name === 'Two Brothers Organic Farms';
    const isMaatru = comp.name === 'Maatru Rasah';
    const isNiraam = comp.name === 'Niraam Superfoods' || comp.id === 'brand-niraam';
    const isPahadi = comp.name === 'My Pahadi Dukan';
    const isDiaspora = comp.id === 'brand-diaspora';
    const isAmyra = comp.id === 'brand-amyra-farms';
    const isNiraKitchen = comp.id === 'brand-nira-kitchen';
    
    if (isAmyra) return { min: 7, max: 12 };
    if (isTwoBrothers) return { min: 10.43, max: 10.43 };
    if (isMaatru) return { min: 9.5, max: 9.5 };
    if (isNiraam || isNiraKitchen) return { min: 7.5, max: 7.5 };
    if (isPahadi) return { min: 8.0, max: 8.0 };
    if (isDiaspora) return { min: 4.7, max: 4.7 };
    return { min: 0, max: 0 };
  };

  const getCurcuminVal = (comp: any, intel: any) => {
    return getCurcuminRange(comp, intel).min;
  };

  // Filter logic
  let filteredCompetitors = competitors.filter(comp => {
    const intel = getCompetitorIntel(comp.id);
    if (activeTab === 'saved' && !selectedIds.includes(comp.id)) return false;
    if (activeTab === 'net_new') return false; 
    if (globalSearch) {
      const term = globalSearch.toLowerCase();
      const matchName = comp.name.toLowerCase().includes(term);
      const matchCompany = (intel?.company || '').toLowerCase().includes(term);
      const matchLocation = (intel?.location || '').toLowerCase().includes(term);
      if (!matchName && !matchCompany && !matchLocation) return false;
    }
    if (nameSearch && !comp.name.toLowerCase().includes(nameSearch.toLowerCase())) return false;
    const hasIntersection = (arr1: string[], arr2: string[]) => {
      if (!arr1 || arr1.length === 0) return false;
      if (!arr2 || arr2.length === 0) return false;
      return arr1.some(val => arr2.includes(val));
    };
    if (selectedLocations.length > 0) {
      if (!intel?.country || !selectedLocations.includes(intel.country)) return false;
    }
    if (selectedPositioning.length > 0) {
      if (!hasIntersection(selectedPositioning, intel?.positioningTags || [])) return false;
    }
    if (selectedCertifications.length > 0) {
      if (!hasIntersection(selectedCertifications, intel?.certifications || [])) return false;
    }
    if (selectedExport.length > 0) {
      const exp = intel?.exportMarkets ? intel.exportMarkets.split(',').map((p:string) => p.trim()) : [];
      if (!hasIntersection(selectedExport, exp)) return false;
    }
    if (selectedCurcuminFilters.length > 0) {
      const { min, max } = getCurcuminRange(comp, intel);
      const matches = selectedCurcuminFilters.some(filterLabel => {
        if (filterLabel === 'Less than 1%') return min < 1;
        const num = parseInt(filterLabel);
        return max >= num && min < num + 1;
      });
      if (!matches) return false;
    }
    return true;
  });

  const sortedCompetitors = [...filteredCompetitors].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;
    const getVal = (comp: any, field: string) => {
      const intel = getCompetitorIntel(comp.id);
      const isDiaspora = comp.id === 'brand-diaspora';
      const isPahadi = comp.name === 'My Pahadi Dukan';
      const isNiraam = comp.name === 'Niraam Superfoods' || comp.id === 'brand-niraam';
      const isMaatru = comp.name === 'Maatru Rasah' || comp.id === 'org-maatru-rasah';
      const isTwoBrothers = comp.name === 'Two Brothers Organic Farms' || comp.id === 'brand_vbix0z7r13x968q5j9p2' || comp.id === 'org-tbo-farms';
      const isTrinay = comp.name === 'Trinay Ayurveda' || comp.id === 'brand_ubgq8665djjkxzqbjp2k' || comp.id === 'org-trinay-ayurveda';
      
      switch(field) {
        case 'name': return comp.name.toLowerCase();
        case 'company': return intel?.company ? intel.company.toLowerCase() : (isTrinay ? 'trinay ayurveda' : isTwoBrothers ? 'two brothers organic farms' : isMaatru ? 'prof impetus llp' : isNiraam ? 'navitrade overseas pvt. ltd.' : (isPahadi ? 'himkart india private limited' : (isDiaspora ? 'diaspora co. llc' : comp.name.toLowerCase())));
        case 'entityType': return intel?.entityType ? intel.entityType.toLowerCase() : (isTrinay ? 'ayurvedic wellness brand' : isTwoBrothers ? 'regenerative dtc brand' : isMaatru ? 'artisanal dtc brand' : isNiraam ? 'dtc brand' : (isPahadi ? 'd2c marketplace' : (isDiaspora ? 'dtc brand / importer' : 'unknown')));
        case 'location': return intel?.location ? intel.location.toLowerCase() : (isTrinay ? 'hyderabad, telangana' : isTwoBrothers ? 'pune, maharashtra' : isMaatru ? 'prayagraj, uttar pradesh' : isNiraam ? 'kolkata, west bengal' : (isPahadi ? 'roorkee, uttarakhand' : (isDiaspora ? 'oakland, california' : 'unknown')));
        case 'marketTier': return intel?.marketTier ? intel.marketTier.toLowerCase() : (isTrinay ? 'unknown' : isTwoBrothers ? 'premium mass' : isMaatru ? 'premium artisanal' : isNiraam ? 'premium' : (isPahadi ? 'premium' : (isDiaspora ? 'ultra premium' : (comp.marketTier || 'unknown').toLowerCase())));
        case 'curcumin': return getCurcuminVal(comp, intel);
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
    setNameSearch('');
    setSelectedCurcuminFilters([]);
    setSelectedLocations([]);
    setSelectedPositioning([]);
    setSelectedCertifications([]);
    setSelectedExport([]);
  };

  const FilterSection = ({ 
    title, id, options, selectedOptions, setter, isTextSearch
  }: { 
    title: string, id: string, options?: string[], selectedOptions?: string[], setter?: React.Dispatch<React.SetStateAction<string[]>>, isTextSearch?: boolean
  }) => (
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
          {isTextSearch ? (
            <div className="relative">
              <Search className="absolute left-2.5 top-2 w-3 h-3 text-[#2D3142]/30" />
              <input 
                type="text" 
                placeholder={`Search ${title}...`}
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                className="w-full bg-white/[0.03] border border-[#2D3142]/10 rounded py-1.5 pl-7 pr-2 text-xs text-[#2D3142] placeholder:text-[#2D3142]/30 focus:outline-none focus:border-[#F16775]/50"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-1.5 max-h-[200px] overflow-y-auto scrollbar-hide pr-2">
              {options && options.map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors ${selectedOptions?.includes(opt) ? 'bg-[#F16775] border-[#F16775]' : 'border-[#2D3142]/20 group-hover:border-[#F16775]/50 bg-white'}`}>
                    {selectedOptions?.includes(opt) && <CheckSquare className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text-xs ${selectedOptions?.includes(opt) ? 'text-[#2D3142] font-medium' : 'text-[#2D3142]/60 group-hover:text-[#2D3142]/80'}`}>
                    {opt}
                  </span>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedOptions?.includes(opt)}
                    onChange={() => {
                      if (setter) toggleCheckboxFilter(opt, setter);
                    }}
                  />
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const SortHeader = ({ field, label, className = "" }: { field: string, label: string, className?: string }) => {
    if (!visibleColumns[field]) return null;
    return (
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
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden text-sm relative">
      
      {toastMessage && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#2D3142] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {isSaveModalOpen && (
        <div className="absolute inset-0 z-50 bg-[#2D3142]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-[#2D3142]/10 flex items-center justify-between bg-[#F4F1EA]">
              <h3 className="font-semibold text-[#2D3142] text-lg flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#F16775]" />
                Save to Custom List
              </h3>
              <button onClick={() => setIsSaveModalOpen(false)} className="text-[#2D3142]/40 hover:text-[#2D3142] transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4 bg-white max-h-[400px] overflow-y-auto">
              <div className="text-sm text-[#2D3142]/70 mb-2">Select the lists you want to save {selectedIds.length} competitors to:</div>
              {customLists.map(list => (
                <label key={list.id} className="flex items-center gap-3 p-3 rounded-lg border border-[#2D3142]/10 hover:border-[#F16775]/30 hover:bg-[#F16775]/5 cursor-pointer transition-colors group">
                  <input 
                    type="checkbox" 
                    className="accent-[#F16775] w-4 h-4 cursor-pointer"
                    checked={selectedSaveLists.includes(list.id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedSaveLists(prev => [...prev, list.id]);
                      else setSelectedSaveLists(prev => prev.filter(id => id !== list.id));
                    }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-[#2D3142] group-hover:text-[#F16775] transition-colors">{list.name}</div>
                    <div className="text-xs text-[#2D3142]/50 mt-0.5">{list.count} Organizations • {list.region}</div>
                  </div>
                </label>
              ))}
              <div className="mt-2 pt-4 border-t border-[#2D3142]/10">
                <label className="text-xs font-semibold text-[#2D3142]/70 mb-2 block">Create New List</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter list name..." value={newListName} onChange={(e) => setNewListName(e.target.value)} className="flex-1 border border-[#2D3142]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F16775]" />
                  <button onClick={() => {
                    if (!newListName.trim()) return showToast("Enter a list name");
                    const newList = {
                      id: Date.now(),
                      name: newListName,
                      count: selectedIds.length,
                      region: 'Custom',
                      updated: 'Just now',
                      color: 'bg-[#F16775]/20 text-[#F16775]',
                      competitorIds: [...selectedIds]
                    };
                    setCustomLists([...customLists, newList]);
                    setNewListName('');
                    showToast(`Saved to new list "${newListName}"`);
                    setIsSaveModalOpen(false);
                  }} className="px-4 py-2 bg-[#F4F1EA] hover:bg-[#2D3142]/5 text-[#2D3142] rounded-lg text-sm font-medium transition-colors border border-[#2D3142]/10">Create & Save</button>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#2D3142]/10 bg-[#F4F1EA] flex justify-end gap-3">
              <button onClick={() => setIsSaveModalOpen(false)} className="px-4 py-2 rounded-md font-medium text-[#2D3142]/60 hover:bg-[#2D3142]/5 transition-colors">
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (selectedSaveLists.length === 0) {
                    showToast("Please select at least one list!");
                    return;
                  }
                  
                  // Update existing lists with new IDs
                  setCustomLists(prev => prev.map(list => {
                    if (selectedSaveLists.includes(list.id)) {
                      const newIds = Array.from(new Set([...(list.competitorIds || []), ...selectedIds]));
                      return { ...list, count: newIds.length, competitorIds: newIds, updated: 'Just now' };
                    }
                    return list;
                  }));
                  
                  showToast(`Successfully saved ${selectedIds.length} competitors to ${selectedSaveLists.length} list(s)!`);
                  setIsSaveModalOpen(false);
                  setSelectedSaveLists([]);
                }}
                className="px-6 py-2 rounded-md font-medium bg-[#F16775] text-white hover:bg-[#E05663] transition-colors shadow-sm"
              >
                Save Competitors
              </button>
            </div>
          </div>
        </div>
      )}

      {isEmailModalOpen && (
        <div className="absolute inset-0 z-50 bg-[#2D3142]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-[#2D3142]/10 flex items-center justify-between bg-[#F4F1EA]">
              <h3 className="font-semibold text-[#2D3142] text-lg flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#F16775]" />
                Draft Email to Competitors
              </h3>
              <button onClick={() => setIsEmailModalOpen(false)} className="text-[#2D3142]/40 hover:text-[#2D3142] transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4 bg-white flex-1">
              <div>
                <label className="text-xs font-semibold text-[#2D3142]/60 uppercase tracking-wide mb-1.5 block">Recipients</label>
                <div className="text-sm text-[#2D3142] p-3 rounded-md bg-[#2D3142]/5 border border-[#2D3142]/10">
                  {selectedIds.length} Competitors Selected
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <label className="text-xs font-semibold text-[#2D3142]/60 uppercase tracking-wide mb-1.5 block">Message</label>
                <textarea 
                  value={emailDraft}
                  onChange={e => setEmailDraft(e.target.value)}
                  className="w-full flex-1 min-h-[200px] border border-[#2D3142]/10 rounded-md p-4 text-sm text-[#2D3142] focus:outline-none focus:border-[#F16775]/50 resize-none bg-white"
                  placeholder="Type your message here..."
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#2D3142]/10 bg-[#F4F1EA] flex justify-end gap-3">
              <button onClick={() => setIsEmailModalOpen(false)} className="px-4 py-2 rounded-md font-medium text-[#2D3142]/60 hover:bg-[#2D3142]/5 transition-colors">
                Cancel
              </button>
              <button 
                onClick={() => {
                  showToast("Email successfully sent to queue.");
                  setIsEmailModalOpen(false);
                  setEmailDraft('');
                }}
                className="px-6 py-2 rounded-md font-medium bg-[#F16775] text-white hover:bg-[#E05663] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" /> Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* APOLLO TOP BAR */}
      <div className="flex flex-col border-b border-[#2D3142]/10 bg-[#F4F1EA] shrink-0">
        <div className="flex items-center px-4 py-2 border-b border-[#2D3142]/5">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setMainTab('competitors')}
              className={`flex items-center gap-2 font-medium text-sm pb-2 -mb-[9px] transition-colors ${mainTab === 'competitors' ? 'text-[#F16775] border-b-2 border-[#F16775]' : 'text-[#2D3142]/60 hover:text-[#2D3142] border-b-2 border-transparent'}`}
            >
              <Building className="w-4 h-4" /> Organizations
            </button>
            <button 
              onClick={() => setMainTab('personnel')}
              className={`flex items-center gap-2 font-medium text-sm pb-2 -mb-[9px] transition-colors ${mainTab === 'personnel' ? 'text-[#F16775] border-b-2 border-[#F16775]' : 'text-[#2D3142]/60 hover:text-[#2D3142] border-b-2 border-transparent'}`}
            >
              <Users className="w-4 h-4" /> Key Personnel
            </button>
            <button 
              onClick={() => setMainTab('lists')}
              className={`flex items-center gap-2 font-medium text-sm pb-2 -mb-[9px] transition-colors ${mainTab === 'lists' ? 'text-[#F16775] border-b-2 border-[#F16775]' : 'text-[#2D3142]/60 hover:text-[#2D3142] border-b-2 border-transparent'}`}
            >
              <LayoutGrid className="w-4 h-4" /> Custom Lists
            </button>
          </div>
        </div>
      </div>

      {mainTab === 'personnel' && <CompetitorPersonnelView initialCompetitors={initialCompetitors} />}
      {mainTab === 'lists' && <CompetitorListsView initialCompetitors={initialCompetitors} customLists={customLists} onOpenList={(list) => {
        setSelectedIds(list.competitorIds || []);
        setMainTab('competitors');
        setActiveTab('saved');
      }} />}

      {mainTab === 'competitors' && (
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

            <div className="flex-1 overflow-y-auto scrollbar-hide pb-10">
              <FilterSection title="Curcumin %" id="curcumin" options={curcuminOptions} selectedOptions={selectedCurcuminFilters} setter={setSelectedCurcuminFilters} />
              <FilterSection title="Company Name" id="name" isTextSearch={true} />
              <FilterSection title="Location (Country)" id="location" options={filterOptions.locations} selectedOptions={selectedLocations} setter={setSelectedLocations} />
              <FilterSection title="Brand Positioning" id="positioning" options={filterOptions.positioning} selectedOptions={selectedPositioning} setter={setSelectedPositioning} />
              <FilterSection title="Certifications" id="certifications" options={filterOptions.certifications} selectedOptions={selectedCertifications} setter={setSelectedCertifications} />
              <FilterSection title="Export Markets" id="export" options={filterOptions.exports} selectedOptions={selectedExport} setter={setSelectedExport} />
            </div>
          </div>

          {/* MAIN DATA TABLE AREA */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
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
                  <button onClick={() => {
                      if (selectedIds.length === 0) showToast("Select competitors to save");
                      else setIsSaveModalOpen(true);
                    }} 
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#2D3142]/5 hover:bg-[#2D3142]/10 text-[#2D3142]/80 border border-[#2D3142]/10 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Save
                  </button>
                  <button onClick={() => {
                      if (selectedIds.length === 0) showToast("Select competitors to email");
                      else setIsEmailModalOpen(true);
                    }} 
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#2D3142]/5 hover:bg-[#2D3142]/10 text-[#2D3142]/80 border border-[#2D3142]/10 transition-colors"
                  >
                    <Mail className="w-4 h-4" /> Email
                  </button>
                  <button onClick={handleExportCSV} className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#2D3142]/5 hover:bg-[#2D3142]/10 text-[#2D3142]/80 border border-[#2D3142]/10 transition-colors">
                    <Download className="w-4 h-4" /> Export
                  </button>
                </div>
                <div className="flex items-center gap-2 relative">
                  <button 
                    onClick={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)}
                    className={`px-3 py-1.5 rounded text-[#2D3142]/50 hover:text-[#2D3142] border transition-colors ${isColumnDropdownOpen ? 'bg-white border-[#2D3142]/20 shadow-sm text-[#2D3142]' : 'border-transparent hover:border-[#2D3142]/10'}`}
                  >
                    Edit Columns
                  </button>
                  {isColumnDropdownOpen && (
                    <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-[#2D3142]/10 z-50 p-2 flex flex-col gap-1">
                      <div className="px-2 py-1.5 text-xs font-semibold text-[#2D3142]/50 uppercase tracking-wide border-b border-[#2D3142]/5 mb-1">Toggle Columns</div>
                      {Object.entries({
                        name: 'Competitor Name',
                        quickActions: 'Quick Actions',
                        company: 'Company',
                        entityType: 'Entity Type',
                        location: 'Location',
                        marketTier: 'Market Tier',
                        curcumin: 'Curcumin %'
                      }).map(([key, label]) => (
                        <label key={key} className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#F4F1EA] rounded cursor-pointer group">
                          <input 
                            type="checkbox" 
                            className="accent-[#F16775]"
                            checked={visibleColumns[key]}
                            onChange={() => setVisibleColumns(prev => ({...prev, [key]: !prev[key]}))}
                          />
                          <span className="text-sm text-[#2D3142]/80 group-hover:text-[#2D3142]">{label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

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
                    {visibleColumns.quickActions && <th className="px-4 py-3 text-center">Quick Actions</th>}
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
                        {visibleColumns.name && (
                        <td className="px-4 py-3">
                          <button 
                            onClick={() => setSelectedId(comp.id)}
                            className="text-[#F16775] hover:text-[#E05663] font-medium transition-colors text-sm block w-full text-left"
                          >
                            {comp.name}
                          </button>
                        </td>
                        )}
                        {visibleColumns.quickActions && (
                        <td className="px-4 py-3 text-center">
                          <button 
                            onClick={() => setSelectedId(comp.id)}
                            className="p-1.5 rounded text-[#F16775] hover:bg-[#F16775]/10 hover:text-[#E05663] transition-colors group relative"
                            title="View Dossier"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                        )}
                        {visibleColumns.company && (
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
                            </div>
                          </div>
                        </td>
                        )}
                        {visibleColumns.entityType && <td className="px-4 py-3 text-sm text-[#2D3142]/70 font-medium">{entityType}</td>}
                        {visibleColumns.location && <td className="px-4 py-3 text-sm text-[#2D3142]/50">{location}</td>}
                        {visibleColumns.marketTier && (
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded text-xs font-medium border border-[#F16775]/20 bg-[#F16775]/10 text-[#F16775] whitespace-nowrap">
                            {marketTier}
                          </span>
                        </td>
                        )}
                        {visibleColumns.curcumin && <td className="px-4 py-3 text-sm font-mono text-[#034F46]">{curcuminDisplay}</td>}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-[#2D3142]/10 bg-[#F4F1EA] flex items-center justify-between text-xs text-[#2D3142]/50">
              <span>1 - {sortedCompetitors.length} of {sortedCompetitors.length}</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-[#2D3142]/10 rounded hover:bg-[#2D3142]/5">Previous</button>
                <button className="px-3 py-1 border border-[#2D3142]/10 rounded hover:bg-[#2D3142]/5 bg-white/[0.02]">1</button>
                <button className="px-3 py-1 border border-[#2D3142]/10 rounded hover:bg-[#2D3142]/5">Next</button>
              </div>
            </div>

          </div>

        </div>
      )}

      {selectedId && selectedCompetitor && (
        <CompetitorDossier 
          competitor={selectedCompetitor} 
          onClose={() => setSelectedId(null)} 
        />
      )}
    </div>
  );
}
