"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown, Filter, LayoutGrid, FlaskConical, Sprout, TrendingUp, BookOpen, ExternalLink, Activity, Rss, Loader2, Cpu, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ToolsView from '../tools/ToolsView';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  contentSnippet: string;
}

interface RDViewProps {
  extractionMethods: any[];
  agritechTrials: any[];
  marketTrends: any[];
  agritechTools: any[];
  initialTab?: string;
}

export default function RDView({ extractionMethods, agritechTrials, marketTrends, agritechTools, initialTab = 'trends' }: RDViewProps) {
  const [activeTab, setActiveTab] = useState<'extraction' | 'agritech' | 'trends' | 'tools'>(initialTab as any);
  const [globalSearch, setGlobalSearch] = useState('');
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/curcumin-news');
        if (res.ok) {
          const data = await res.json();
          setArticles(data.articles || []);
        } else {
          console.error('Failed to fetch news: Status', res.status);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoadingNews(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    setSelectedFilters([]);
    setGlobalSearch('');
  }, [activeTab]);

  const getFilterOptions = () => {
    switch (activeTab) {
      case 'tools': return Array.from(new Set(agritechTools.map(t => t.category)));
      case 'trends': return Array.from(new Set([...marketTrends.map(t => t.category), 'LIVE_NEWS']));
      case 'extraction': return Array.from(new Set(extractionMethods.map(t => t.scalability)));
      case 'agritech': return Array.from(new Set(agritechTrials.map(t => t.status)));
      default: return [];
    }
  };

  const renderSidebar = () => {

    
    const options = getFilterOptions();
    
    const toggleFilter = (opt: string) => {
      setSelectedFilters(prev => prev.includes(opt) ? prev.filter(f => f !== opt) : [...prev, opt]);
    };
    return (
      <div className="w-64 flex-shrink-0 border-r border-[#2D3142]/10 bg-[#F9F8F6] flex flex-col h-full overflow-y-auto hidden md:flex">
        <div className="p-4 border-b border-[#2D3142]/10 flex justify-between items-center">
          <h2 className="font-semibold text-[#2D3142]">Filters</h2>
          <button 
            className="text-xs text-fuchsia-500 hover:text-fuchsia-600"
            onClick={() => setSelectedFilters([])}
          >
            Clear all
          </button>
        </div>
        
        <div className="p-4 border-b border-[#2D3142]/5">
          <div className="flex items-center gap-2 bg-white border border-[#2D3142]/10 rounded-lg px-3 py-2 focus-within:border-fuchsia-500 focus-within:ring-1 focus-within:ring-fuchsia-500 transition-all">
            <Search className="w-4 h-4 text-[#2D3142]/40" />
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full bg-transparent border-none focus:outline-none text-sm text-[#2D3142]"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
          </div>
        </div>

        {options.length > 0 && (
          <div className="p-4 border-b border-[#2D3142]/5">
            <button className="flex items-center justify-between w-full text-sm font-semibold text-[#2D3142]">
              <span>Filter By</span>
              <ChevronDown className="w-4 h-4 text-[#2D3142]/40" />
            </button>
            <div className="mt-3 space-y-2">
              {options.map(opt => (
                <label key={opt} className="flex items-center gap-2 text-sm text-[#2D3142]/70 hover:text-[#2D3142] cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="accent-fuchsia-500" 
                    checked={selectedFilters.includes(opt)}
                    onChange={() => toggleFilter(opt)}
                  />
                  <span className="truncate">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTabs = () => {
    const tabs = [

      { id: 'trends', label: 'Live Market Intelligence', icon: Rss, count: articles.length || marketTrends.length },
      { id: 'tools', label: 'Agritech Tools', icon: Cpu, count: agritechTools.length },
      { id: 'extraction', label: 'Extraction Methods', icon: FlaskConical, count: extractionMethods.length },
      { id: 'agritech', label: 'Agritech Trials', icon: Sprout, count: agritechTrials.length },
    ] as const;

    return (
      <div className="flex border-b border-[#2D3142]/10 bg-white px-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 text-sm font-semibold transition-colors ${
              activeTab === tab.id 
                ? 'border-fuchsia-500 text-fuchsia-500 bg-fuchsia-50/50' 
                : 'border-transparent text-[#2D3142]/50 hover:text-[#2D3142] hover:bg-[#2D3142]/5'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-fuchsia-500/10 text-fuchsia-600' : 'bg-[#2D3142]/5 text-[#2D3142]/40'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    );
  };

  const renderExtractionTable = () => {
    const filtered = extractionMethods.filter(em => {
      const matchesSearch = em.name.toLowerCase().includes(globalSearch.toLowerCase());
      const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(em.scalability);
      return matchesSearch && matchesFilter;
    });
    
    return (
      <div className="overflow-auto h-full bg-white">
        <table className="w-full text-left border-collapse min-w-max">
          <thead>
            <tr className="border-b border-[#2D3142]/10 text-xs uppercase tracking-wider text-[#2D3142]/50 bg-[#F4F1EA]/50">
              <th className="p-4 font-semibold w-1/3">Method Name</th>
              <th className="p-4 font-semibold">Yield / Purity</th>
              <th className="p-4 font-semibold">Solvent</th>
              <th className="p-4 font-semibold">Scalability</th>
              <th className="p-4 font-semibold">Cost Intensity</th>
              <th className="p-4 font-semibold">Sustainability</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(em => (
              <tr key={em.id} className="border-b border-[#2D3142]/5 hover:bg-[#2D3142]/5 transition-colors group">
                <td className="p-4">
                  <div className="font-semibold text-[#2D3142]">{em.name}</div>
                  <div className="text-xs text-[#2D3142]/60 mt-1 line-clamp-2">{em.description}</div>
                  {em.url && (
                     <Link href={em.url} target="_blank" className="inline-flex items-center gap-1 text-xs text-fuchsia-500 hover:underline mt-2">
                       Source <ExternalLink className="w-3 h-3" />
                     </Link>
                  )}
                </td>
                <td className="p-4">
                  <div className="text-sm"><span className="text-[#2D3142]/50">Yield:</span> {em.curcuminYieldPct}%</div>
                  <div className="text-sm mt-1"><span className="text-[#2D3142]/50">Purity:</span> {em.purityPct}%</div>
                </td>
                <td className="p-4 text-sm">{em.solventUsed}</td>
                <td className="p-4">
                   <span className="px-2 py-1 bg-[#2D3142]/5 text-[#2D3142]/70 text-xs rounded-md">{em.scalability}</span>
                </td>
                <td className="p-4">
                   <span className="px-2 py-1 bg-amber-500/10 text-amber-600 text-xs rounded-md">{em.costIntensity}</span>
                </td>
                <td className="p-4">
                   <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 text-xs rounded-md">{em.sustainability}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderAgritechTable = () => {
    const filtered = agritechTrials.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(globalSearch.toLowerCase());
      const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(t.status);
      return matchesSearch && matchesFilter;
    });
    
    return (
      <div className="overflow-auto h-full bg-white">
        <table className="w-full text-left border-collapse min-w-max">
          <thead>
            <tr className="border-b border-[#2D3142]/10 text-xs uppercase tracking-wider text-[#2D3142]/50 bg-[#F4F1EA]/50">
              <th className="p-4 font-semibold w-1/3">Trial Title</th>
              <th className="p-4 font-semibold">Partner</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Tech Stack</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(trial => (
              <tr key={trial.id} className="border-b border-[#2D3142]/5 hover:bg-[#2D3142]/5 transition-colors group">
                <td className="p-4">
                  <div className="font-semibold text-[#2D3142]">{trial.title}</div>
                  <div className="text-xs text-[#2D3142]/60 mt-1 line-clamp-2">{trial.resultsSummary}</div>
                  {trial.url && (
                     <Link href={trial.url} target="_blank" className="inline-flex items-center gap-1 text-xs text-fuchsia-500 hover:underline mt-2">
                       Source <ExternalLink className="w-3 h-3" />
                     </Link>
                  )}
                </td>
                <td className="p-4 text-sm">{trial.partnerName}</td>
                <td className="p-4 text-sm text-[#2D3142]/70">{trial.location}</td>
                <td className="p-4">
                  <div className="text-xs text-[#2D3142]/70 border border-[#2D3142]/10 bg-[#2D3142]/5 rounded px-2 py-1 mb-1 truncate max-w-[150px]" title={trial.hardwareUsed}>
                    HW: {trial.hardwareUsed}
                  </div>
                  <div className="text-xs text-[#2D3142]/70 border border-[#2D3142]/10 bg-[#2D3142]/5 rounded px-2 py-1 truncate max-w-[150px]" title={trial.softwareUsed}>
                    SW: {trial.softwareUsed}
                  </div>
                </td>
                <td className="p-4">
                   <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-semibold rounded-md flex items-center gap-1 w-max">
                     <Activity className="w-3 h-3" /> {trial.status}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTrendsTable = () => {
    const combinedData = [
      ...articles.map(a => ({ id: a.link, title: a.title, summary: a.contentSnippet, source: a.source, url: a.link, category: 'LIVE_NEWS', impactLevel: 'HIGH' })),
      ...marketTrends
    ].filter(m => {
      const matchesSearch = m.title.toLowerCase().includes(globalSearch.toLowerCase());
      const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(m.category);
      return matchesSearch && matchesFilter;
    });

    if (loadingNews) {
      return (
        <div className="flex items-center justify-center h-full bg-white">
          <Loader2 className="w-8 h-8 text-fuchsia-500 animate-spin" />
        </div>
      );
    }
    
    return (
      <div className="overflow-auto h-full bg-white">
        <table className="w-full text-left border-collapse min-w-max">
          <thead>
            <tr className="border-b border-[#2D3142]/10 text-xs uppercase tracking-wider text-[#2D3142]/50 bg-[#F4F1EA]/50">
              <th className="p-4 font-semibold w-1/3">Trend / News</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Impact</th>
              <th className="p-4 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody>
            {combinedData.map(trend => (
              <tr key={trend.id} className="border-b border-[#2D3142]/5 hover:bg-[#2D3142]/5 transition-colors group">
                <td className="p-4">
                  <div className="font-semibold text-[#2D3142]">{trend.title}</div>
                  <div className="text-xs text-[#2D3142]/60 mt-1 line-clamp-2">{trend.summary}</div>
                  <div className="text-xs font-medium text-fuchsia-600 mt-2 flex items-center gap-1">
                    Source: 
                    {trend.url ? (
                      <Link href={trend.url} target="_blank" className="text-[#2D3142]/70 font-normal hover:text-fuchsia-600 hover:underline flex items-center gap-1">
                        {trend.source} <ExternalLink className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span className="text-[#2D3142]/70 font-normal">{trend.source}</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                   <span className="px-2 py-1 bg-[#2D3142]/5 text-[#2D3142]/70 text-xs rounded-md">{trend.category}</span>
                </td>
                <td className="p-4">
                   <span className={`px-2 py-1 text-xs font-semibold rounded-md ${
                     trend.impactLevel === 'CRITICAL' ? 'bg-red-500/10 text-red-600' :
                     trend.impactLevel === 'HIGH' ? 'bg-amber-500/10 text-amber-600' :
                     'bg-emerald-500/10 text-emerald-600'
                   }`}>{trend.impactLevel}</span>
                </td>
                <td className="p-4 text-sm">
                   {trend.source}
                   {trend.url && (
                     <Link href={trend.url} target="_blank" className="block text-xs text-fuchsia-500 hover:underline mt-1">
                       View Report <ExternalLink className="w-3 h-3 inline" />
                     </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden text-sm relative">
      <div className="flex flex-1 overflow-hidden h-full">
        {renderSidebar()}
        
        <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
          {renderTabs()}
          
          <div className="flex-1 min-w-0 bg-[#F9F8F6] overflow-y-auto">

            {activeTab === 'trends' && renderTrendsTable()}
            {activeTab === 'tools' && (
              <ToolsView initialTools={agritechTools.filter(t => {
                const matchesSearch = t.name.toLowerCase().includes(globalSearch.toLowerCase());
                const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(t.category);
                return matchesSearch && matchesFilter;
              })} />
            )}
            {activeTab === 'extraction' && renderExtractionTable()}
            {activeTab === 'agritech' && renderAgritechTable()}
          </div>
        </div>
      </div>
    </div>
  );
}
