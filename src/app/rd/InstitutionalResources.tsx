'use client';

import React, { useState } from 'react';
import { ExternalLink, Landmark, BookOpen, Building, MapPin, Award, ChevronDown, ChevronUp } from 'lucide-react';
import resources from '../../db/intelligence/resources.json';

export default function InstitutionalResources() {
  const [isOpen, setIsOpen] = useState(true);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Training': return <BookOpen className="w-4 h-4 text-[#F16775]" />;
      case 'Sourcing': return <Building className="w-4 h-4 text-[#034F46]" />;
      case 'Updates': return <MapPin className="w-4 h-4 text-[#F59E0B]" />;
      case 'Funding': return <Landmark className="w-4 h-4 text-[#F16775]" />;
      case 'Certification': return <Award className="w-4 h-4 text-violet-400" />;
      default: return <Landmark className="w-4 h-4 text-[#2D3142]" />;
    }
  };

  return (
    <div className="bg-[#2D3142]/5 border border-[#2D3142]/10 rounded-2xl overflow-hidden shadow-2xl col-span-1 lg:col-span-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-6 bg-[#2D3142]/5 hover:bg-[#2D3142]/10 transition-colors text-left ${isOpen ? 'border-b border-[#2D3142]/10' : ''}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F16775]/10 flex items-center justify-center border border-[#F16775]/20 shrink-0">
             <Landmark className="w-5 h-5 text-[#F16775]" />
          </div>
          <div>
            <h2 className="text-xl font-medium text-[#2D3142]/90">Institutional & Government Resources</h2>
            <p className="text-sm text-[#2D3142]/40">Public Intelligence</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="text-[#2D3142]/40 shrink-0" /> : <ChevronDown className="text-[#2D3142]/40 shrink-0" />}
      </button>

      {isOpen && (
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res: any) => (
            <div key={res.id} className="bg-white/[0.02] border border-[#2D3142]/10 rounded-xl p-4 hover:bg-white/[0.04] transition-colors flex flex-col h-full group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-[#2D3142]/40 hover:text-[#2D3142] transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="flex items-center gap-2 mb-3">
                {getIcon(res.category)}
                <span className="text-[10px] uppercase font-mono text-[#2D3142]/50 tracking-wider bg-[#2D3142]/5 px-2 py-0.5 rounded-full border border-[#2D3142]/10">
                  {res.category}
                </span>
              </div>
              <h3 className="text-[#2D3142] font-medium text-sm mb-2 pr-6 leading-tight">{res.name}</h3>
              <p className="text-[#2D3142]/50 text-xs mb-4 line-clamp-2">{res.description}</p>
              <div className="mt-auto pt-3 border-t border-[#2D3142]/10">
                <p className="text-indigo-300 text-[10px] uppercase font-semibold tracking-wider mb-1">Business Value</p>
                <p className="text-[#2D3142]/70 text-xs italic">"{res.businessValue}"</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
