"use client";

import React, { useState, useMemo, useDeferredValue } from "react";
import BuyerDossier from './BuyerDossier';
import { 
  Search, ChevronDown, ChevronRight, Filter, Download, X, 
  Plus, Mail, Users, Building, MapPin, CheckSquare, 
  Square, Globe, LayoutGrid, ArrowUp, ArrowDown, ArrowUpDown, Eye, Send, Check, ShieldAlert
} from 'lucide-react';

const BuyerPersonnelView = ({ initialBuyers }: { initialBuyers: any[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  
  const personnel: any[] = initialBuyers.flatMap(buyer => 
    (buyer.decisionMakers || []).map((dm: any) => ({
      ...dm,
      supplierName: buyer.name,
      country: buyer.country?.name || 'Unknown'
    }))
  );

  const filteredPersonnel = personnel.filter(p => {
    if (!deferredSearchQuery) return true;
    const q = deferredSearchQuery.toLowerCase();
    return (p.fullName || '').toLowerCase().includes(q) || 
           (p.supplierName || '').toLowerCase().includes(q) || 
           (p.businessEmail || '').toLowerCase().includes(q);
  });

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="w-[280px] border-r border-[#2D3142]/10 flex flex-col bg-[#F4F1EA] shrink-0">
        <div className="p-3 border-b border-[#2D3142]/10 flex items-center justify-between bg-[#F4F1EA]">
          <span className="font-semibold text-[#2D3142]/90">Filters</span>
          <span className="text-xs text-[#F16775] hover:text-[#E05663] cursor-pointer" onClick={() => setSearchQuery('')}>Clear</span>
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

        <div className="p-3 mt-auto border-t border-[#2D3142]/10 bg-[#F4F1EA]">
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
          {filteredPersonnel.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-[#F4F1EA] flex items-center justify-center mb-4">
                <ShieldAlert className="w-8 h-8 text-[#2D3142]/20" />
              </div>
              <h3 className="text-lg font-semibold text-[#2D3142] mb-2">No Verified Personnel Found</h3>
              <p className="text-sm text-[#2D3142]/50 max-w-sm">
                The Amroot OS constitution strictly prohibits placeholder data. Buyer personnel records will appear here only after verified discovery.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredPersonnel.map((p, idx) => (
                <div key={idx} className="border border-[#2D3142]/10 rounded-xl p-5 hover:shadow-lg transition-all bg-white flex flex-col group cursor-pointer hover:border-[#F16775]/30">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#F4F1EA] flex items-center justify-center text-[#2D3142]/50 font-bold text-lg">
                      {p.fullName ? p.fullName.charAt(0).toUpperCase() : '?'}
                    </div>
                  </div>
                  <h3 className="font-bold text-[#2D3142] mb-1 group-hover:text-[#F16775] transition-colors">{p.fullName}</h3>
                  <div className="text-xs text-[#2D3142]/50 font-medium mb-4">{p.designation || 'Key Decision Maker'}</div>
                  <div className="mt-auto pt-4 border-t border-[#2D3142]/5 text-sm space-y-2">
                    <div className="flex items-center gap-2 text-[#2D3142]/70">
                      <Building className="w-4 h-4 text-[#2D3142]/40" />
                      <span className="truncate">{p.supplierName}</span>
                    </div>
                    {p.businessEmail && (
                      <div className="flex items-center gap-2 text-[#2D3142]/70">
                        <Mail className="w-4 h-4 text-[#2D3142]/40" />
                        <span className="truncate">{p.businessEmail}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BuyerListsView = ({ initialBuyers, customLists, onOpenList }: { initialBuyers: any[], customLists: any[], onOpenList: (list: any) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const filteredLists = customLists.filter(list => {
    if (!deferredSearchQuery) return true;
    const q = deferredSearchQuery.toLowerCase();
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
          <h2 className="text-lg font-semibold text-[#2D3142]">Custom Buyer Lists</h2>
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
                <p>No lists created yet. Select buyers and click Save to create one.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface BuyersViewProps {
  initialBuyers: any[];
  initialCustomLists?: any[];
}

export default function BuyersView({ initialBuyers, initialCustomLists = [] }: BuyersViewProps) {
  const [buyers, setBuyers] = useState(initialBuyers);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'total' | 'net_new' | 'saved'>('total');
  const [mainTab, setMainTab] = useState<'organizations' | 'personnel' | 'lists'>('organizations');
  
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    name: true,
    country: true,
    companyType: true,
    marketFocus: true,
  });

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [globalSearch, setGlobalSearch] = useState('');
  const deferredGlobalSearch = useDeferredValue(globalSearch);
  const [nameSearch, setNameSearch] = useState('');
  const deferredNameSearch = useDeferredValue(nameSearch);
  
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState<string[]>([]);
  const [selectedMarketFocus, setSelectedMarketFocus] = useState<string[]>([]);

  // Modals & Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailDraft, setEmailDraft] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [selectedSaveLists, setSelectedSaveLists] = useState<string[]>([]);
  const [newListName, setNewListName] = useState('');
  const [customLists, setCustomLists] = useState<any[]>(initialCustomLists);
  
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('buyersVisibleColumns');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse visibleColumns from localStorage", e);
        }
      }
    }
    return { name: true, quickActions: true, company: true, entityType: true, location: true, marketFocus: true, score: true };
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('buyersVisibleColumns', JSON.stringify(visibleColumns));
    }
  }, [visibleColumns]);

  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);

  const filterOptions = useMemo(() => {
    const countries = new Set<string>();
    const companyTypes = new Set<string>();
    const marketFocus = new Set<string>();

    initialBuyers.forEach(buyer => {
      if (buyer.country?.name) countries.add(buyer.country.name);
      if (buyer.companyType) companyTypes.add(buyer.companyType);
      if (buyer.marketFocus) marketFocus.add(buyer.marketFocus);
    });

    // Pin priority markets at the top, rest alphabetically
    const PRIORITY_COUNTRIES = ['United Kingdom', 'United Arab Emirates', 'Europe', 'Germany'];
    const allCountries = Array.from(countries);
    const pinned = PRIORITY_COUNTRIES.filter(c => allCountries.includes(c) || c === 'Europe');
    const rest = allCountries.filter(c => !PRIORITY_COUNTRIES.includes(c)).sort();

    return {
      countries: [...pinned, ...rest],
      companyTypes: Array.from(companyTypes).sort(),
      marketFocus: Array.from(marketFocus).sort()
    };
  }, [initialBuyers]);

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
    if (e.target.checked) setSelectedIds(filteredBuyers.map(c => c.id));
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
      ? sortedBuyers.filter(s => selectedIds.includes(s.id))
      : sortedBuyers;
      
    if (dataToExport.length === 0) {
      showToast("No buyers to export");
      return;
    }

    const headers = ['Buyer Name', 'Entity Type', 'Location', 'Market Focus', 'Score'];
    const csvContent = [
      headers.join(','),
      ...dataToExport.map(buyer => {
        return [
          `"${buyer.name || ''}"`,
          `"${buyer.companyType || 'Unknown'}"`,
          `"${buyer.country?.name || buyer.city || 'Unknown'}"`,
          `"${buyer.marketFocus || 'Unknown'}"`,
          `"${buyer.intelligenceScore || 0}"`
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'buyers_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${dataToExport.length} buyers`);
  };

  // Filter logic
  let filteredBuyers = buyers.filter(buyer => {
    if (activeTab === 'saved') {
      const inAnyList = customLists.some(list => list.buyerIds?.includes(buyer.id));
      if (!inAnyList) return false;
    }
    if (activeTab === 'net_new') {
      if (!buyer.createdAt) return false;
      const createdDate = new Date(buyer.createdAt);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      if (createdDate < sevenDaysAgo) return false;
    }
    
    if (deferredGlobalSearch) {
      const term = deferredGlobalSearch.toLowerCase();
      const matchName = (buyer.name || '').toLowerCase().includes(term);
      const matchLocation = (buyer.country?.name || '').toLowerCase().includes(term) || (buyer.city || '').toLowerCase().includes(term);
      if (!matchName && !matchLocation) return false;
    }
    
    if (deferredNameSearch && !(buyer.name || '').toLowerCase().includes(deferredNameSearch.toLowerCase())) return false;
    
    if (selectedCountries.length > 0) {
      const EUROPEAN_COUNTRIES = [
        'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 
        'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 
        'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 
        'Spain', 'Sweden', 'United Kingdom', 'Switzerland', 'Norway', 'Iceland', 'Serbia', 'Montenegro',
        'Bosnia and Herzegovina', 'North Macedonia', 'Albania', 'Ukraine', 'Moldova'
      ];
      const isEuropeSelected = selectedCountries.includes('Europe');
      const countryMatches = buyer.country?.name && selectedCountries.includes(buyer.country.name);
      const isEuropean = buyer.country?.name && EUROPEAN_COUNTRIES.includes(buyer.country.name);
      
      if (!countryMatches && !(isEuropeSelected && isEuropean)) return false;
    }
    if (selectedCompanyTypes.length > 0) {
      if (!buyer.companyType || !selectedCompanyTypes.includes(buyer.companyType)) return false;
    }
    if (selectedMarketFocus.length > 0) {
      if (!buyer.marketFocus || !selectedMarketFocus.includes(buyer.marketFocus)) return false;
    }

    return true;
  });

  const sortedBuyers = [...filteredBuyers].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;
    
    const getVal = (buyer: any, field: string) => {
      switch(field) {
        case 'name': return (buyer.name || '').toLowerCase();
        case 'company': return (buyer.name || '').toLowerCase(); // Fallback for company sort
        case 'entityType': return (buyer.companyType || '').toLowerCase();
        case 'location': return (buyer.country?.name || buyer.city || '').toLowerCase();
        case 'marketFocus': return (buyer.marketFocus || '').toLowerCase();
        case 'score': return buyer.intelligenceScore || 0;
        default: return '';
      }
    };
    
    const aVal = getVal(a, sortField);
    const bVal = getVal(b, sortField);
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const selectedBuyer = buyers.find(c => c.id === selectedId) || null;
  const isAllSelected = sortedBuyers.length > 0 && selectedIds.length === sortedBuyers.length;

  const clearFilters = () => {
    setGlobalSearch('');
    setNameSearch('');
    setSelectedCountries([]);
    setSelectedCompanyTypes([]);
    setSelectedMarketFocus([]);
  };

  const PRIORITY_COUNTRIES = ['United Kingdom', 'United Arab Emirates', 'Europe', 'Germany'];

  const renderFilterSection = ({ 
    title, id, options, selectedOptions, setter, isTextSearch
  }: { 
    title: string, id: string, options?: string[], selectedOptions?: string[], setter?: React.Dispatch<React.SetStateAction<string[]>>, isTextSearch?: boolean
  }) => {
    const isPriority = (opt: string) => id === 'country' && PRIORITY_COUNTRIES.includes(opt);
    const firstNonPriority = options?.find(opt => !isPriority(opt));

    return (
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
            <div className="flex flex-col gap-1.5 max-h-[260px] overflow-y-auto scrollbar-hide pr-2">
              {options && options.map(opt => (
                <div key={opt}>
                  {/* Separator between pinned and rest */}
                  {id === 'country' && opt === firstNonPriority && PRIORITY_COUNTRIES.some(p => options.includes(p)) && (
                    <div className="flex items-center gap-1.5 my-1.5">
                      <div className="flex-1 h-px bg-[#2D3142]/10" />
                      <span className="text-[9px] text-[#2D3142]/30 tracking-wider font-medium uppercase">All Countries</span>
                      <div className="flex-1 h-px bg-[#2D3142]/10" />
                    </div>
                  )}
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors ${selectedOptions?.includes(opt) ? 'bg-[#F16775] border-[#F16775]' : 'border-[#2D3142]/20 group-hover:border-[#F16775]/50 bg-white'}`}>
                      {selectedOptions?.includes(opt) && <CheckSquare className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <span className={`text-xs flex-1 ${selectedOptions?.includes(opt) ? 'text-[#2D3142] font-medium' : 'text-[#2D3142]/60 group-hover:text-[#2D3142]/80'}`}>
                      {opt}
                    </span>
                    {isPriority(opt) && (
                      <span className="text-[8px] font-semibold text-[#F16775] bg-[#F16775]/10 px-1 py-0.5 rounded tracking-wider">KEY</span>
                    )}
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={selectedOptions?.includes(opt)}
                      onChange={() => {
                        if (setter) toggleCheckboxFilter(opt, setter);
                      }}
                    />
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
  };


  const renderSortHeader = ({ field, label, className = "" }: { field: string, label: string, className?: string }) => {
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
              <div className="text-sm text-[#2D3142]/70 mb-2">Select the lists you want to save {selectedIds.length} buyers to:</div>
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
                  <button onClick={async () => {
                    if (!newListName.trim()) return showToast("Enter a list name");
                    try {
                      const response = await fetch('/api/custom-lists', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ action: 'create', name: newListName, buyerIds: selectedIds })
                      });
                      if (response.ok) {
                        const newList = await response.json();
                        setCustomLists([...customLists, newList]);
                        setNewListName('');
                        showToast(`Saved to new list "${newListName}"`);
                        setIsSaveModalOpen(false);
                      } else {
                        showToast("Failed to create list");
                      }
                    } catch (e) {
                      showToast("Error creating list");
                    }
                  }} className="px-4 py-2 bg-[#F4F1EA] hover:bg-[#2D3142]/5 text-[#2D3142] rounded-lg text-sm font-medium transition-colors border border-[#2D3142]/10">Create & Save</button>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#2D3142]/10 bg-[#F4F1EA] flex justify-end gap-3">
              <button onClick={() => setIsSaveModalOpen(false)} className="px-4 py-2 rounded-md font-medium text-[#2D3142]/60 hover:bg-[#2D3142]/5 transition-colors">
                Cancel
              </button>
              <button 
                onClick={async () => {
                  if (selectedSaveLists.length === 0) {
                    showToast("Please select at least one list!");
                    return;
                  }
                  
                  try {
                    const promises = selectedSaveLists.map(listId => 
                      fetch('/api/custom-lists', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ action: 'update', listId, buyerIds: selectedIds })
                      }).then(res => res.json())
                    );
                    const updatedLists = await Promise.all(promises);
                    
                    setCustomLists(prev => prev.map(list => {
                      const updated = updatedLists.find(u => u.id === list.id);
                      return updated ? updated : list;
                    }));
                    
                    showToast(`Successfully saved ${selectedIds.length} buyers to ${selectedSaveLists.length} list(s)!`);
                    setIsSaveModalOpen(false);
                    setSelectedSaveLists([]);
                  } catch (e) {
                    showToast("Error updating lists");
                  }
                }}
                className="px-6 py-2 rounded-md font-medium bg-[#F16775] text-white hover:bg-[#E05663] transition-colors shadow-sm"
              >
                Save Buyers
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
                Draft Email to Buyers
              </h3>
              <button onClick={() => setIsEmailModalOpen(false)} className="text-[#2D3142]/40 hover:text-[#2D3142] transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4 bg-white flex-1">
              <div>
                <label className="text-xs font-semibold text-[#2D3142]/60 uppercase tracking-wide mb-1.5 block">Recipients (To)</label>
                <div className="text-sm text-[#2D3142] p-3 rounded-md bg-[#2D3142]/5 border border-[#2D3142]/10">
                  {selectedIds.length > 0 ? selectedIds.map(id => initialBuyers.find(b => b.id === id)?.name).filter(Boolean).join(', ') : 'No recipients selected'}
                </div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <label className="text-xs font-semibold text-[#2D3142]/60 uppercase tracking-wide mb-1.5 block">Subject</label>
                <input 
                  type="text"
                  value={emailSubject}
                  onChange={e => setEmailSubject(e.target.value)}
                  className="w-full border border-[#2D3142]/10 rounded-md p-3 text-sm text-[#2D3142] focus:outline-none focus:border-[#F16775]/50 bg-white mb-4"
                  placeholder="Enter email subject..."
                />
                
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
              <button onClick={() => setIsEmailModalOpen(false)} className="px-4 py-2 rounded-md font-medium text-[#2D3142]/60 hover:bg-[#2D3142]/5 transition-colors" disabled={isSendingEmail}>
                Cancel
              </button>
              <button 
                disabled={isSendingEmail}
                onClick={async () => {
                  if (selectedIds.length === 0) {
                    showToast("No recipients selected!");
                    return;
                  }
                  if (!emailSubject || !emailDraft) {
                    showToast("Subject and message are required.");
                    return;
                  }
                  
                  setIsSendingEmail(true);
                  try {
                    const selectedBuyers = initialBuyers.filter(b => selectedIds.includes(b.id));
                    let emails = selectedBuyers.flatMap(b => (b.decisionMakers || []).map((dm: any) => dm.businessEmail)).filter(Boolean);
                    
                    if (emails.length === 0) {
                      // Fallback to test address if no real emails found, as requested in implementation plan
                      emails = ["singhsachin.work@gmail.com"];
                    }

                    const response = await fetch('/api/email', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        to: emails.join(', '), 
                        subject: emailSubject,
                        text: emailDraft
                      })
                    });
                    
                    const result = await response.json();
                    
                    if (response.ok) {
                      showToast(`Email successfully sent via Nodemailer!`);
                      setIsEmailModalOpen(false);
                      setEmailDraft('');
                      setEmailSubject('');
                    } else {
                      showToast(`Error: ${result.error}`);
                    }
                  } catch (error) {
                    showToast("Failed to send email. Check console.");
                  } finally {
                    setIsSendingEmail(false);
                  }
                }}
                className={`px-6 py-2 rounded-md font-medium text-white transition-colors flex items-center gap-2 shadow-sm ${isSendingEmail ? 'bg-[#F16775]/50 cursor-not-allowed' : 'bg-[#F16775] hover:bg-[#E05663]'}`}
              >
                {isSendingEmail ? (
                  <span className="flex items-center gap-2"><Send className="w-4 h-4 opacity-50" /> Sending...</span>
                ) : (
                  <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Email</span>
                )}
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
              onClick={() => setMainTab('organizations')}
              className={`flex items-center gap-2 font-medium text-sm pb-2 -mb-[9px] transition-colors ${mainTab === 'organizations' ? 'text-[#F16775] border-b-2 border-[#F16775]' : 'text-[#2D3142]/60 hover:text-[#2D3142] border-b-2 border-transparent'}`}
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

      {mainTab === 'personnel' && <BuyerPersonnelView initialBuyers={initialBuyers} />}
      {mainTab === 'lists' && <BuyerListsView initialBuyers={initialBuyers} customLists={customLists} onOpenList={(list) => {
        setSelectedIds(list.buyerIds || []);
        setMainTab('organizations');
        setActiveTab('saved');
      }} />}

      {mainTab === 'organizations' && (
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
              {renderFilterSection({ title: "Company Name", id: "name", isTextSearch: true })}
              {renderFilterSection({ title: "Location (Country)", id: "country", options: filterOptions.countries, selectedOptions: selectedCountries, setter: setSelectedCountries })}
              {renderFilterSection({ title: "Company Type", id: "companyType", options: filterOptions.companyTypes, selectedOptions: selectedCompanyTypes, setter: setSelectedCompanyTypes })}
              {renderFilterSection({ title: "Market Focus", id: "marketFocus", options: filterOptions.marketFocus, selectedOptions: selectedMarketFocus, setter: setSelectedMarketFocus })}
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
                    Total ({buyers.length})
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
                      if (selectedIds.length === 0) showToast("Select buyers to save");
                      else setIsSaveModalOpen(true);
                    }} 
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#2D3142]/5 hover:bg-[#2D3142]/10 text-[#2D3142]/80 border border-[#2D3142]/10 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Save
                  </button>
                  <button onClick={() => {
                      if (selectedIds.length === 0) showToast("Select buyers to email");
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
                        name: 'Buyer Name',
                        quickActions: 'Quick Actions',
                        company: 'Company',
                        entityType: 'Entity Type',
                        location: 'Location',
                        marketFocus: 'Market Focus',
                        score: 'Intelligence Score'
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
                    {renderSortHeader({ field: "name", label: "Buyer Name", className: "min-w-[200px]" })}
                    {visibleColumns.quickActions && <th className="px-4 py-3 text-center">Quick Actions</th>}
                    {renderSortHeader({ field: "company", label: "Company", className: "min-w-[150px]" })}
                    {renderSortHeader({ field: "entityType", label: "Entity Type" })}
                    {renderSortHeader({ field: "location", label: "Location" })}
                    {renderSortHeader({ field: "marketFocus", label: "Market Focus" })}
                    {renderSortHeader({ field: "score", label: "Score" })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2D3142]/5">
                  {sortedBuyers.length === 0 ? (
                    <tr>
                      <td colSpan={8}>
                        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                          <div className="w-16 h-16 rounded-full bg-[#F4F1EA] flex items-center justify-center mb-4">
                            <ShieldAlert className="w-8 h-8 text-[#2D3142]/20" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#2D3142] mb-2">No Verified Buyers Found</h3>
                          <p className="text-sm text-[#2D3142]/50 max-w-sm">
                            The Amroot OS constitution strictly prohibits placeholder data. Buyer intelligence records will appear here only after verified discovery.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                  sortedBuyers.map((buyer) => {
                    const company = (buyer.name || 'UNKNOWN').toUpperCase();
                    const entityType = (buyer.companyType || 'Unknown').replace(/ \w/g, (l: string) => l.toUpperCase());
                    const location = (buyer.country?.name || buyer.city || 'Unknown').replace(/ \w/g, (l: string) => l.toUpperCase());
                    const marketFocus = (buyer.marketFocus || 'Unknown').replace(/ \w/g, (l: string) => l.toUpperCase());
                    const actualWebsiteUrl = buyer.websites?.[0]?.url;
                    const websiteDisplay = actualWebsiteUrl ? actualWebsiteUrl.replace(/^https?:\/\/(www\.)?/, '') : 'website.com';
                    const websiteUrl = actualWebsiteUrl || '#';
                    const isSelected = selectedIds.includes(buyer.id);
                    
                    return (
                      <tr key={buyer.id} className={`hover:bg-white/[0.02] group transition-colors ${isSelected ? 'bg-[#F16775]/5' : ''}`}>
                        <td className="px-4 py-3 w-10 text-center">
                          <input 
                            type="checkbox" 
                            className="cursor-pointer accent-[#F16775]"
                            checked={isSelected}
                            onChange={(e) => handleSelectRow(buyer.id, e.target.checked)}
                          />
                        </td>
                        {visibleColumns.name && (
                        <td className="px-4 py-3">
                          <button 
                            onClick={() => setSelectedId(buyer.id)}
                            className="text-[#F16775] hover:text-[#E05663] font-medium transition-colors text-sm block w-full text-left"
                          >
                            {buyer.name}
                          </button>
                        </td>
                        )}
                        {visibleColumns.quickActions && (
                        <td className="px-4 py-3 text-center">
                          <button 
                            onClick={() => setSelectedId(buyer.id)}
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
                              {(buyer.name || 'B').charAt(0)}
                            </div>
                            <div>
                              <div className="text-[#2D3142]/90 text-sm font-medium">{company}</div>
                              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className={`text-[11px] ${websiteDisplay !== 'website.com' ? 'text-[#F16775]/80 hover:text-[#F16775]' : 'text-[#2D3142]/30 cursor-not-allowed pointer-events-none'} flex items-center gap-1`} onClick={(e) => { e.stopPropagation(); if (websiteDisplay === 'website.com') e.preventDefault(); }}>
                                  <Globe className="w-3 h-3" /> 
                                  {websiteDisplay}
                                </a>
                                {buyer.socialAccounts?.map((social: any) => {
                                  const platform = social.platform.toLowerCase();
                                  return (
                                    <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="text-[#F16775]/80 hover:text-[#F16775] transition-colors" onClick={(e) => e.stopPropagation()} title={social.platform}>
                                      {platform === 'instagram' && <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>}
                                      {platform === 'facebook' && <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>}
                                      {platform === 'youtube' && <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>}
                                      {platform === 'linkedin' && <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>}
                                      {platform === 'twitter' && <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" stroke="none" className="w-3 h-3"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>}
                                      {platform === 'amazon' && <svg viewBox="0 0 448 512" width="12" height="12" fill="currentColor" stroke="none" className="w-3 h-3"><path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5c0 109.5 138.3 114 183.5 43.2c6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32C140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5c40.7-.1 35.5 29.8 35.5 69.1m0 86.8c0 80-84.2 68-84.2 17.2c0-47.2 50.5-56.7 84.2-57.8zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12m39.8 2.2c-6.5 15.8-16 26.8-21.2 31c-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2c-10.8 1-13 2-14-.3c-2.3-5.7 21.7-15.5 37.5-17.5c15.7-1.8 41-.8 46 5.7c3.7 5.1 0 27.1-6.5 43.1"></path></svg>}
                                      {!['instagram', 'facebook', 'youtube', 'linkedin', 'twitter', 'amazon'].includes(platform) && <span className="text-[11px] flex items-center gap-1">{social.platform}</span>}
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </td>
                        )}
                        {visibleColumns.entityType && (
                          <td className="px-4 py-3 text-sm text-[#2D3142]/70 font-medium">
                            <div className="flex flex-col items-start gap-1.5">
                              <span>{entityType}</span>
                              {buyer.businessSize && (
                                <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                                  buyer.businessSize.toLowerCase() === 'sme' || buyer.businessSize.toLowerCase() === 'small' ? 'bg-[#E5F5E9] text-[#14833D] border border-[#14833D]/20' :
                                  buyer.businessSize.toLowerCase() === 'mid-market' || buyer.businessSize.toLowerCase() === 'medium' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                  buyer.businessSize.toLowerCase() === 'large' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                  buyer.businessSize.toLowerCase() === 'enterprise' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                  'bg-gray-50 text-gray-600 border border-gray-100'
                                }`}>
                                  {buyer.businessSize}
                                </span>
                              )}
                            </div>
                          </td>
                        )}
                        {visibleColumns.location && <td className="px-4 py-3 text-sm text-[#2D3142]/50">{location}</td>}
                        {visibleColumns.marketFocus && (
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded text-xs font-medium border border-[#F16775]/20 bg-[#F16775]/10 text-[#F16775] whitespace-nowrap">
                            {marketFocus}
                          </span>
                        </td>
                        )}
                        {visibleColumns.score && <td className="px-4 py-3 text-sm font-mono text-[#034F46] font-semibold">{buyer.intelligenceScore || 0}%</td>}
                      </tr>
                    );
                  })
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-[#2D3142]/10 bg-[#F4F1EA] flex items-center justify-between text-xs text-[#2D3142]/50">
              <span>{sortedBuyers.length > 0 ? '1' : '0'} - {sortedBuyers.length} of {sortedBuyers.length}</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-[#2D3142]/10 rounded hover:bg-[#2D3142]/5 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 border border-[#2D3142]/10 rounded hover:bg-[#2D3142]/5 bg-white/[0.02]">1</button>
                <button className="px-3 py-1 border border-[#2D3142]/10 rounded hover:bg-[#2D3142]/5 disabled:opacity-50" disabled>Next</button>
              </div>
            </div>

          </div>

        </div>
      )}

      {selectedId && selectedBuyer && (
        <>
          <div 
            className="fixed inset-0 bg-[#2D3142]/20 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setSelectedId(null)}
          />
          <BuyerDossier 
            buyer={selectedBuyer} 
            onClose={() => setSelectedId(null)} 
          />
        </>
      )}
    </div>
  );
}
