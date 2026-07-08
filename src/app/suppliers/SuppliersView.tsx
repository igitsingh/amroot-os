"use client";

import React, { useState } from "react";
import SupplierDossier from './SupplierDossier';
import PersonnelView from './PersonnelView';
import SupplierListsView from './SupplierListsView';
import { 
  Search, ChevronDown, ChevronRight, Filter, Download, 
  Plus, Mail, Users, Building, MapPin, CheckSquare, 
  Square, Globe, LayoutGrid, ArrowUp, ArrowDown, ArrowUpDown, Eye, X, Send, Check
} from 'lucide-react';

interface SuppliersViewProps {
  initialSuppliers: any[];
}

export default function SuppliersView({ initialSuppliers }: SuppliersViewProps) {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'total' | 'net_new' | 'saved'>('total');
  const [mainTab, setMainTab] = useState<'suppliers' | 'personnel' | 'lists'>('suppliers');
  
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    location: true,
    marketTier: true,
    certifications: true,
    curcuminContent: true,
  });
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  
  // Dynamic columns
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    name: true, quickActions: true, company: true, entityType: true, discovery: true, location: true, marketTier: true, curcumin: true, price: true
  });
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);

  // Modals & Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [selectedSaveLists, setSelectedSaveLists] = useState<number[]>([]);
  const [newListName, setNewListName] = useState('');
  const [customLists, setCustomLists] = useState<{id: number, name: string, count: number, region: string, updated: string, color: string, supplierIds: string[]}[]>([]);

  const toggleRowSelection = (id: string) => {
    setSelectedRowIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAllRows = () => {
    if (selectedRowIds.length === sortedSuppliers.length && sortedSuppliers.length > 0) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(sortedSuppliers.map(s => s.id));
    }
  };

  const handleFilterToggle = (category: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(value) 
        ? current.filter(v => v !== value)
        : [...current, value];
      
      if (updated.length === 0) {
        const next = { ...prev };
        delete next[category];
        return next;
      }
      return { ...prev, [category]: updated };
    });
  };

  const getUniqueValues = (key: string, isArray: boolean = false) => {
    const allVals = initialSuppliers.flatMap(s => {
      if (isArray) return s[key] || [];
      return s[key] ? [String(s[key])] : [];
    });
    return Array.from(new Set(allVals)).filter(Boolean).sort();
  };

  const filteredSuppliers = initialSuppliers.filter(supp => {
    if (activeTab === 'saved' && !selectedRowIds.includes(supp.id)) return false;
    if (activeTab === 'net_new') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = (supp.name || '').toLowerCase().includes(q) || 
                    (supp.location || '').toLowerCase().includes(q) || 
                    (supp.entityType || '').toLowerCase().includes(q);
      if (!match) return false;
    }

    return Object.entries(selectedFilters).every(([key, selectedValues]) => {
      if (!selectedValues || selectedValues.length === 0) return true;
      if (key === 'certifications') {
        const certs = supp.certifications || [];
        return selectedValues.some(v => certs.includes(v));
      }
      const val = String(supp[key as keyof typeof supp] || '');
      return selectedValues.includes(val);
    });
  });

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

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

  const renderSortHeader = (field: string, label: string, className: string = "") => {
    if (!visibleColumns[field]) return null;
    const isName = field === 'name';
    return (
    <th 
      className={`px-4 py-3 cursor-pointer select-none hover:bg-[#2D3142]/5 transition-colors group ${className}`}
      onClick={() => handleSort(field)}
    >
      <div className={`flex items-center gap-2 ${isName ? 'justify-start' : 'justify-center'} text-center`}>
        <span className="font-semibold text-[#2D3142]/50 group-hover:text-[#2D3142]/70 transition-colors whitespace-pre-line">{label}</span>
        <div className="flex flex-col">
          <ArrowUp className={`w-2.5 h-2.5 -mb-1 ${sortField === field && sortDirection === 'asc' ? 'text-[#F16775]' : 'text-[#2D3142]/20'}`} />
          <ArrowDown className={`w-2.5 h-2.5 ${sortField === field && sortDirection === 'desc' ? 'text-[#F16775]' : 'text-[#2D3142]/20'}`} />
        </div>
      </div>
    </th>
    );
  };

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportCSV = () => {
    const dataToExport = selectedRowIds.length > 0 
      ? sortedSuppliers.filter(s => selectedRowIds.includes(s.id))
      : sortedSuppliers;
      
    if (dataToExport.length === 0) {
      showToast("No suppliers to export");
      return;
    }

    const headers = ['Name', 'Entity Type', 'Location', 'Market Tier', 'Curcumin %', 'Price/kg'];
    const csvContent = [
      headers.join(','),
      ...dataToExport.map(s => [
        `"${s.name || ''}"`,
        `"${s.entityType || ''}"`,
        `"${s.location || ''}"`,
        `"${s.marketTier || ''}"`,
        `"${s.curcuminContent || ''}"`,
        `"${s.pricePerKg || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'suppliers_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${dataToExport.length} suppliers`);
  };

  const DynamicFilterSection = ({ title, id, isArray = false }: { title: string, id: string, isArray?: boolean }) => {
    const options = getUniqueValues(id, isArray);
    if (options.length === 0) return null;

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
          <div className="px-4 pb-3 flex flex-col gap-2">
            {options.map(opt => {
              const isChecked = (selectedFilters[id] || []).includes(opt);
              return (
                <label key={opt} className="flex items-center gap-2 cursor-pointer group/label" onClick={(e) => { e.preventDefault(); handleFilterToggle(id, opt); }}>
                  <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors ${isChecked ? 'bg-[#F16775] border-[#F16775]' : 'border-[#2D3142]/20 group-hover/label:border-[#F16775]/50 bg-white'}`}>
                    {isChecked && <CheckSquare className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-xs text-[#2D3142]/60 group-hover/label:text-[#2D3142]/90 truncate">{opt}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
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
              <div className="text-sm text-[#2D3142]/70 mb-2">Select the lists you want to save {selectedRowIds.length} suppliers to:</div>
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
                      count: selectedRowIds.length,
                      region: 'Custom',
                      updated: 'Just now',
                      color: 'bg-emerald-500/20 text-emerald-600',
                      supplierIds: [...selectedRowIds]
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
                      const newIds = Array.from(new Set([...(list.supplierIds || []), ...selectedRowIds]));
                      return { ...list, count: newIds.length, supplierIds: newIds, updated: 'Just now' };
                    }
                    return list;
                  }));

                  showToast(`Successfully saved ${selectedRowIds.length} suppliers to ${selectedSaveLists.length} list(s)!`);
                  setIsSaveModalOpen(false);
                  setSelectedSaveLists([]);
                }}
                className="px-6 py-2 rounded-md font-medium bg-[#F16775] text-white hover:bg-[#E05663] transition-colors shadow-sm"
              >
                Save Suppliers
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
                Draft Email to Suppliers
              </h3>
              <button onClick={() => setIsEmailModalOpen(false)} className="text-[#2D3142]/40 hover:text-[#2D3142] transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4 bg-white flex-1">
              <div>
                <label className="text-xs font-semibold text-[#2D3142]/60 uppercase tracking-wide mb-1.5 block">Recipients</label>
                <div className="text-sm text-[#2D3142] p-3 rounded-md bg-[#2D3142]/5 border border-[#2D3142]/10">
                  {selectedRowIds.length} Suppliers Selected
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
                className="px-6 py-2 rounded-md font-medium bg-[#F16775] text-white hover:bg-[#d95d6a] transition-colors flex items-center gap-2 shadow-sm"
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
              onClick={() => setMainTab('suppliers')}
              className={`flex items-center gap-2 font-medium text-sm pb-2 -mb-[9px] transition-colors ${mainTab === 'suppliers' ? 'text-[#F16775] border-b-2 border-[#F16775]' : 'text-[#2D3142]/60 hover:text-[#2D3142] border-b-2 border-transparent'}`}
            >
              <Building className="w-4 h-4" /> Suppliers
            </button>
            <button 
              onClick={() => setMainTab('personnel')}
              className={`flex items-center gap-2 font-medium text-sm pb-2 -mb-[9px] transition-colors ${mainTab === 'personnel' ? 'text-[#F16775] border-b-2 border-[#F16775]' : 'text-[#2D3142]/60 hover:text-[#2D3142] border-b-2 border-transparent'}`}
            >
              <Users className="w-4 h-4" /> Personnel
            </button>
            <button 
              onClick={() => setMainTab('lists')}
              className={`flex items-center gap-2 font-medium text-sm pb-2 -mb-[9px] transition-colors ${mainTab === 'lists' ? 'text-[#F16775] border-b-2 border-[#F16775]' : 'text-[#2D3142]/60 hover:text-[#2D3142] border-b-2 border-transparent'}`}
            >
              <LayoutGrid className="w-4 h-4" /> Supplier Lists
            </button>
          </div>
        </div>
      </div>

      {mainTab === 'personnel' && <PersonnelView initialSuppliers={initialSuppliers} />}
      {mainTab === 'lists' && <SupplierListsView initialSuppliers={initialSuppliers} customLists={customLists} onOpenList={(list) => {
        setSelectedRowIds(list.supplierIds || []);
        setMainTab('suppliers');
        setActiveTab('saved');
      }} />}

      {mainTab === 'suppliers' && (
        <div className="flex flex-1 overflow-hidden">
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
                  placeholder="Search Suppliers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.03] border border-[#2D3142]/10 rounded-md py-2 pl-9 pr-3 text-sm text-[#2D3142] placeholder:text-[#2D3142]/30 focus:outline-none focus:border-[#F16775]/50"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <DynamicFilterSection title="Location" id="location" />
              <DynamicFilterSection title="Market Tier" id="marketTier" />
              <DynamicFilterSection title="Certifications" id="certifications" isArray={true} />
              <DynamicFilterSection title="Curcumin %" id="curcuminContent" />
            </div>

            <div className="p-3 border-t border-[#2D3142]/10 bg-[#F4F1EA]">
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#F16775] hover:bg-[#d95d6a] text-white rounded font-medium transition-colors">
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
                    Total ({filteredSuppliers.length})
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
                    Saved ({filteredSuppliers.length})
                  </button>
                </div>
              </div>
              
              <div className="px-4 py-2 bg-[#F4F1EA] border-t border-[#2D3142]/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => {
                      if (selectedRowIds.length === 0) showToast("Select suppliers to save");
                      else setIsSaveModalOpen(true);
                    }} 
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#2D3142]/5 hover:bg-[#2D3142]/10 text-[#2D3142]/80 border border-[#2D3142]/10 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Save
                  </button>
                  <button onClick={() => {
                      if (selectedRowIds.length === 0) showToast("Select suppliers to email");
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
                        name: 'Supplier Name',
                        quickActions: 'Quick Actions',
                        company: 'Company',
                        entityType: 'Entity Type',
                        discovery: 'Discovery',
                        location: 'Location',
                        marketTier: 'Market Tier',
                        curcumin: 'Curcumin %',
                        price: 'Price / kg'
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

            {/* Table Container */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left">
                <thead className="sticky top-0 z-10 bg-[#F9F8F6] border-b border-[#2D3142]/10 text-[11px] uppercase tracking-wider text-[#2D3142]/40 font-semibold shadow-sm">
                  <tr>
                    <th className="px-4 py-3 w-10 text-center">
                      <input 
                        type="checkbox" 
                        className="cursor-pointer accent-[#F16775]"
                        checked={selectedRowIds.length === sortedSuppliers.length && sortedSuppliers.length > 0}
                        onChange={toggleAllRows}
                      />
                    </th>
                    {renderSortHeader("name", "Supplier Name", "min-w-[200px]")}
                    {visibleColumns.quickActions && <th className="px-4 py-3 text-center">Quick Actions</th>}
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
                      <tr key={supp.id} className={`hover:bg-white/[0.02] group transition-colors ${selectedRowIds.includes(supp.id) ? 'bg-[#F16775]/5' : ''}`}>
                        <td className="px-4 py-3 w-10 text-center">
                          <input 
                            type="checkbox" 
                            className="cursor-pointer accent-[#F16775]"
                            checked={selectedRowIds.includes(supp.id)}
                            onChange={(e) => toggleRowSelection(supp.id)}
                          />
                        </td>
                        {visibleColumns.name && (
                        <td className="px-4 py-3">
                          <button 
                            onClick={() => setSelectedId(supp.id)}
                            className="text-[#F16775] hover:text-blue-300 font-medium transition-colors text-sm block w-full text-left"
                          >
                            {supp.name}
                          </button>
                        </td>
                        )}
                        {visibleColumns.quickActions && (
                        <td className="px-4 py-3">
                          <button 
                            onClick={() => setSelectedId(supp.id)}
                            className="p-1.5 rounded text-[#F16775] hover:bg-[#F16775]/10 hover:text-blue-300 transition-colors flex items-center justify-center"
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
                              {supp.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-[#2D3142]/90 text-sm font-medium">{supp.name}</div>
                              {supp.primaryContact ? (
                                <div className="text-[11px] text-[#2D3142]/50 mt-0.5 flex flex-col gap-0.5">
                                  <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3 shrink-0" />
                                    <span className="truncate">{supp.primaryContact.name}</span>
                                  </div>
                                  <div className="text-[#2D3142]/40 ml-4 truncate">
                                    {supp.primaryContact.email}
                                  </div>
                                  <div className="text-[#2D3142]/40 ml-4 truncate">
                                    {supp.primaryContact.phone}
                                  </div>
                                </div>
                              ) : supp.contact ? (
                                <div className="text-[11px] text-[#2D3142]/50 mt-0.5 flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {supp.contact}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </td>
                        )}
                        {visibleColumns.entityType && (
                        <td className="px-4 py-3 text-sm text-[#2D3142]/70 font-medium">
                          {supp.entityType || 'Unknown'}
                        </td>
                        )}
                        {visibleColumns.discovery && (
                        <td className="px-4 py-3">
                          {supp.discoveryMethod ? (
                            <span className="inline-block whitespace-normal text-center leading-tight max-w-[110px] px-2 py-1 bg-[#2D3142]/5 border border-[#2D3142]/10 rounded-md text-[10px] text-[#2D3142]/70 font-medium tracking-wide">
                              {supp.discoveryMethod}
                            </span>
                          ) : (
                            <span className="text-[#2D3142]/20 text-[10px] italic">Not Tracked</span>
                          )}
                        </td>
                        )}
                        {visibleColumns.location && (
                        <td className="px-4 py-3 text-sm text-[#2D3142]/70 whitespace-normal min-w-[200px] leading-snug">
                          {supp.location || 'Unknown'}
                        </td>
                        )}
                        {visibleColumns.marketTier && (
                        <td className="px-4 py-3 text-sm text-[#2D3142]/70 capitalize">
                          {supp.marketTier || 'Unknown'}
                        </td>
                        )}
                        {visibleColumns.curcumin && (
                        <td className="px-4 py-3 text-sm text-[#2D3142]/70 font-mono">
                          {supp.curcuminContent ? `${supp.curcuminContent}%` : 'Unknown'}
                        </td>
                        )}
                        {visibleColumns.price && (
                        <td className="px-4 py-3 text-right">
                          <span className="font-mono text-xs text-[#2D3142]/70">
                            {supp.pricePerKg ? `₹${supp.pricePerKg}` : 'TBD'}
                          </span>
                        </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-[#2D3142]/10 bg-[#F4F1EA] flex items-center justify-between text-xs text-[#2D3142]/50">
              <span>1 - {filteredSuppliers.length} of {initialSuppliers.length}</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-[#2D3142]/10 rounded hover:bg-[#2D3142]/5">Previous</button>
                <button className="px-3 py-1 border border-[#2D3142]/10 rounded hover:bg-[#2D3142]/5 bg-white/[0.02]">1</button>
                <button className="px-3 py-1 border border-[#2D3142]/10 rounded hover:bg-[#2D3142]/5">Next</button>
              </div>
            </div>

          </div>

        </div>
      )}

      {selectedId && selectedSupplier && (
        <SupplierDossier 
          supplier={selectedSupplier} 
          onClose={() => setSelectedId(null)} 
        />
      )}
    </div>
  );
}
