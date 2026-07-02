'use client';

import React, { useState } from 'react';
import { ExternalLink, Landmark, BookOpen, Building, MapPin, Award, ChevronDown, ChevronUp } from 'lucide-react';
import resources from '../../db/intelligence/resources.json';

export default function InstitutionalResources() {
  const [isOpen, setIsOpen] = useState(true);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Training': return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'Sourcing': return <Building className="w-4 h-4 text-emerald-400" />;
      case 'Updates': return <MapPin className="w-4 h-4 text-amber-400" />;
      case 'Funding': return <Landmark className="w-4 h-4 text-indigo-400" />;
      case 'Certification': return <Award className="w-4 h-4 text-violet-400" />;
      default: return <Landmark className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl col-span-1 lg:col-span-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 transition-colors text-left ${isOpen ? 'border-b border-white/10' : ''}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
             <Landmark className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-medium text-white/90">Institutional & Government Resources</h2>
            <p className="text-sm text-white/40">Public Intelligence</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="text-white/40 shrink-0" /> : <ChevronDown className="text-white/40 shrink-0" />}
      </button>

      {isOpen && (
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res) => (
            <div key={res.id} className="bg-white/[0.02] border border-white/10 rounded-xl p-4 hover:bg-white/[0.04] transition-colors flex flex-col h-full group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="flex items-center gap-2 mb-3">
                {getIcon(res.category)}
                <span className="text-[10px] uppercase font-mono text-white/50 tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                  {res.category}
                </span>
              </div>
              <h3 className="text-white font-medium text-sm mb-2 pr-6 leading-tight">{res.name}</h3>
              <p className="text-white/50 text-xs mb-4 line-clamp-2">{res.description}</p>
              <div className="mt-auto pt-3 border-t border-white/10">
                <p className="text-indigo-300 text-[10px] uppercase font-semibold tracking-wider mb-1">Business Value</p>
                <p className="text-white/70 text-xs italic">"{res.businessValue}"</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
