'use client';

import React, { useState } from 'react';
import { TrendingUp, Globe2, Pill, Activity, BarChart3, Building2, TableProperties, Map, ChevronDown, ChevronUp, LineChart } from 'lucide-react';
import { marketTrendsData } from '@/db/intelligence/rd-data';

const DonutChart = ({ percentage, color, label, icon: Icon }: { percentage: number, color: string, label: string, icon: any }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white/[0.02] rounded-xl border border-[#2D3142]/5 relative group">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="transparent" stroke="currentColor" strokeWidth="8" className="text-[#2D3142]/10" />
          <circle cx="50" cy="50" r={radius} fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className={`transition-all duration-1000 ease-out ${color}`} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className={`w-5 h-5 mb-1 ${color}`} />
          <span className="text-sm font-bold text-[#2D3142]">{percentage}%</span>
        </div>
      </div>
      <p className="mt-3 text-xs font-medium text-[#2D3142]/70 text-center uppercase tracking-wider">{label}</p>
    </div>
  );
};

export default function MarketIntelligenceDashboard() {
  const [isOpen, setIsOpen] = useState(true);

  const keyCompanies = [
    "WackerChemie AG", "BioMaxLifesciences Ltd.", "Synthite Industries Ltd.", 
    "Hindustan Mint & Agro Products Pvt. Ltd.", "Arjuna Natural Extracts Ltd.", 
    "SV Agrofood", "Star Hi Herbs Pvt. Ltd.", "Herboveda India Pvt. Ltd.", 
    "Helmigs Prima Sehejtera PT", "Javaplant", "Konark Herbals & Healthcare Pvt. Ltd.", 
    "Rosun Natural Products Pvt. Ltd.", "Sabinsa Corporation"
  ];

  const historicalGrowth = [
    { year: 2017, val: 42.1, height: '22%' },
    { year: 2018, val: 47.5, height: '25%' },
    { year: 2019, val: 52.8, height: '28%' },
    { year: 2020, val: 58.2, height: '30%' },
    { year: 2021, val: 65.4, height: '34%' },
    { year: 2022, val: 74.2, height: '39%' },
    { year: 2023, val: 84.5, height: '44%' },
    { year: 2024, val: 98.9, height: '51%' },
    { year: 2025, val: 113.8, height: '59%' },
    { year: 2026, val: 135.2, height: '70%' },
    { year: 2027, val: 162.5, height: '85%' },
    { year: 2028, val: 191.9, height: '100%' }
  ];

  return (
    <div className="bg-[#2D3142]/5 border border-[#2D3142]/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-6 bg-[#2D3142]/5 hover:bg-[#2D3142]/10 transition-colors text-left ${isOpen ? 'border-b border-[#2D3142]/10' : ''}`}
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shrink-0">
            <BarChart3 className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-medium text-[#2D3142]/90">Curcumin Market Size & Trends Analysis</h2>
            <p className="text-sm text-[#2D3142]/40">Grand View Research 2025-2030 Report</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end w-full md:w-auto gap-4">
          <div className="flex flex-wrap gap-2 mr-4">
            <div className="px-3 py-1 bg-[#2D3142]/5 border border-[#2D3142]/10 rounded-full flex items-center gap-1.5">
              <span className="text-xs text-[#2D3142]/50">2025 Est:</span>
              <span className="text-xs font-bold text-[#2D3142]">$113.8M</span>
            </div>
            <div className="px-3 py-1 bg-[#2D3142]/5 border border-[#2D3142]/10 rounded-full flex items-center gap-1.5">
              <span className="text-xs text-[#2D3142]/50">2030 Proj:</span>
              <span className="text-xs font-bold text-[#2D3142]">$199.7M</span>
            </div>
            <div className="px-3 py-1 bg-[#034F46]/10 border border-[#034F46]/20 rounded-full flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#034F46]" />
              <span className="text-xs font-bold text-[#034F46]">11.9% CAGR</span>
            </div>
          </div>
          {isOpen ? <ChevronUp className="text-[#2D3142]/40 shrink-0" /> : <ChevronDown className="text-[#2D3142]/40 shrink-0" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-6 flex flex-col gap-8">
          
          {/* Top Section: Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Side: Historical Market Size Bar Chart */}
            <div className="flex flex-col justify-center bg-white/[0.01] border border-[#2D3142]/5 p-5 rounded-xl">
              <h3 className="text-sm font-medium text-[#2D3142]/80 mb-6 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#2D3142]/50" /> Market Size (USD Billion), 2017 - 2028
              </h3>
              
              <div className="flex items-end justify-between gap-1 h-48 px-1">
                {historicalGrowth.map((data: any) => (
                  <div key={data.year} className="flex flex-col items-center justify-end h-full w-full group">
                    <span className="text-[8px] sm:text-[9px] font-mono text-[#034F46]/80 mb-2 transition-colors group-hover:text-emerald-300 opacity-0 group-hover:opacity-100 absolute -top-6">
                      ${data.val}M
                    </span>
                    <div 
                      className={`w-full max-w-[28px] rounded-t-sm transition-all duration-500 ease-in-out relative ${data.year >= 2025 ? 'bg-[#034F46]/80 group-hover:bg-emerald-400' : 'bg-[#2D3142]/10 group-hover:bg-white/20'}`} 
                      style={{ height: data.height }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-t-sm"></div>
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-bold text-[#2D3142]/50 mt-2">{data.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Market Dominance Donuts */}
            <div className="flex flex-col justify-center bg-white/[0.01] border border-[#2D3142]/5 p-5 rounded-xl">
              <h3 className="text-sm font-medium text-[#2D3142]/80 mb-6 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#2D3142]/50" /> 2024 Market Segments & Regional Share
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <DonutChart percentage={50.5} color="text-[#F16775]" label="North America" icon={Map} />
                <DonutChart percentage={52.2} color="text-purple-400" label="Pharmaceuticals" icon={Pill} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Key Companies */}
            <div>
              <h3 className="text-sm font-medium text-[#2D3142]/80 mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#2D3142]/50" /> Key Curcumin Companies
              </h3>
              <p className="text-xs text-[#2D3142]/40 mb-4">Leading companies dictating market trends and holding the largest market share.</p>
              <div className="flex flex-wrap gap-2">
                {keyCompanies.map((company: any, i: number) => (
                  <span key={i} className="text-[10px] px-2.5 py-1 bg-[#2D3142]/5 text-[#2D3142]/70 border border-[#2D3142]/10 rounded-md hover:bg-[#2D3142]/10 hover:text-[#2D3142] transition-colors cursor-default">
                    {company}
                  </span>
                ))}
              </div>
            </div>

            {/* Report Scope Table */}
            <div>
              <h3 className="text-sm font-medium text-[#2D3142]/80 mb-4 flex items-center gap-2">
                <TableProperties className="w-4 h-4 text-[#2D3142]/50" /> Report Scope
              </h3>
              <div className="overflow-hidden border border-[#2D3142]/5 rounded-lg text-xs">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-white/5">
                    <tr className="bg-white/[0.02]">
                      <td className="p-3 text-[#2D3142]/50 font-medium">Market size value in 2025</td>
                      <td className="p-3 text-[#2D3142]/90">USD 113.8 million</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-[#2D3142]/50 font-medium">Revenue forecast in 2030</td>
                      <td className="p-3 text-[#2D3142]/90">USD 199.7 million</td>
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="p-3 text-[#2D3142]/50 font-medium">Growth rate</td>
                      <td className="p-3 text-[#2D3142]/90">CAGR of 11.9% (2025-2030)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-[#2D3142]/50 font-medium">Base year</td>
                      <td className="p-3 text-[#2D3142]/90">2024</td>
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="p-3 text-[#2D3142]/50 font-medium">Historical data</td>
                      <td className="p-3 text-[#2D3142]/90">2018 - 2023</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-[#2D3142]/50 font-medium">Segments covered</td>
                      <td className="p-3 text-[#2D3142]/90">Application, region</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Market Intelligence Trends List */}
          <div className="pt-8 border-t border-[#2D3142]/5 mt-4">
            <h3 className="text-sm font-medium text-[#2D3142]/80 mb-6 flex items-center gap-2">
              <LineChart className="w-4 h-4 text-purple-400" /> Market Intelligence & Industry Shifts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketTrendsData.map(trend => (
                <div key={trend.id} className="p-4 bg-white/[0.02] border border-[#2D3142]/10 rounded-xl hover:bg-white/[0.04] transition-colors flex flex-col">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h4 className="text-[#2D3142] font-medium text-sm leading-tight">
                      {trend.url ? <a href={trend.url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 hover:underline transition-colors">{trend.title}</a> : trend.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono border whitespace-nowrap ${
                      trend.impactLevel === 'HIGH' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      trend.impactLevel === 'CRITICAL' ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20' :
                      'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    }`}>
                      {trend.impactLevel} IMPACT
                    </span>
                  </div>
                  <p className="text-[#2D3142]/50 text-xs mb-4 flex-1">{trend.summary}</p>
                  <p className="text-[#2D3142]/30 text-[10px] mt-auto">Source: {trend.source}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
