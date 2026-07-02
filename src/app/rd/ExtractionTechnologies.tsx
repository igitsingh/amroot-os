'use client';

import React, { useState } from 'react';
import { TestTube, ChevronDown, ChevronUp } from 'lucide-react';
import { extractionMethodsData } from '@/db/intelligence/rd-data';

export default function ExtractionTechnologies() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 transition-colors text-left ${isOpen ? 'border-b border-white/10' : ''}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
            <TestTube className="w-5 h-5 text-emerald-400"/> 
          </div>
          <div>
            <h2 className="text-xl font-medium text-white/90">Extraction Technologies</h2>
            <p className="text-sm text-white/40">Purity tracking of curcumin yielding extraction methods.</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="text-white/40 shrink-0" /> : <ChevronDown className="text-white/40 shrink-0" />}
      </button>
      
      {isOpen && (
        <div className="divide-y divide-white/5">
          {extractionMethodsData.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-white/40 text-sm">No extraction methods tracked yet.</p>
            </div>
          ) : extractionMethodsData.map(method => (
            <div key={method.id} className="p-5 hover:bg-white/[0.02] transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-medium text-base">
                  {method.url ? <a href={method.url} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 hover:underline transition-colors">{method.name}</a> : method.name}
                </h3>
                <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-500/20">
                  {method.curcuminYieldPct}% Yield
                </span>
              </div>
              <p className="text-white/50 text-xs line-clamp-2 mb-4">{method.description}</p>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-white/30 text-[10px] uppercase mb-1">Purity</p>
                  <p className="text-white/80 text-sm">{method.purityPct}%</p>
                </div>
                <div>
                  <p className="text-white/30 text-[10px] uppercase mb-1">Scalability</p>
                  <p className="text-white/80 text-sm">{method.scalability}</p>
                </div>
                <div>
                  <p className="text-white/30 text-[10px] uppercase mb-1">Cost</p>
                  <p className="text-white/80 text-sm">{method.costIntensity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
