"use client";

import { Shield, ArrowRight, Database, FileText, Globe } from 'lucide-react';

interface EvidenceLineageProps {
  isOpen: boolean;
  onClose: () => void;
  evidence: {
    sourceTier: number;
    sourceName: string;
    sourceUrl?: string;
    value: string;
    fieldName: string;
    dateCollected: string;
    confidenceScore: number;
    entityName: string;
    entityType: string;
  };
}

export function EvidenceLineageModal({ isOpen, onClose, evidence }: EvidenceLineageProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#F4F1EA]/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-[#30363D] rounded-xl w-full max-w-3xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#30363D] flex justify-between items-center bg-white">
          <h2 className="text-[#2D3142] font-mono text-sm uppercase flex items-center gap-2">
            <Shield size={16} className="text-[#034F46]" />
            Evidence Provenance Trace
          </h2>
          <button onClick={onClose} className="text-[#8B949E] hover:text-[#2D3142] transition-colors">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex flex-col items-center gap-4">
            
            {/* Step 1: Raw Source */}
            <div className="w-full bg-white border border-[#30363D] rounded-lg p-4 flex flex-col items-center">
              <div className="bg-[#F16775]/10 text-[#F16775] p-3 rounded-full mb-2">
                {evidence.sourceUrl ? <Globe size={24} /> : <FileText size={24} />}
              </div>
              <span className="text-[#8B949E] text-[10px] uppercase font-mono mb-1">Origin Source</span>
              <span className="text-[#2D3142] font-medium">{evidence.sourceName}</span>
              {evidence.sourceUrl && (
                <a href={evidence.sourceUrl} target="_blank" rel="noreferrer" className="text-[#F16775] text-xs mt-1 hover:underline">
                  View External Source
                </a>
              )}
              <div className="mt-3 flex gap-2">
                <span className="bg-[#30363D] px-2 py-0.5 rounded text-[10px] text-[#2D3142] font-mono">Tier {evidence.sourceTier}</span>
                <span className="bg-[#30363D] px-2 py-0.5 rounded text-[10px] text-[#2D3142] font-mono">{new Date(evidence.dateCollected).toLocaleDateString()}</span>
              </div>
            </div>

            <ArrowRight size={20} className="text-[#8B949E] rotate-90 my-2" />

            {/* Step 2: Extracted Claim */}
            <div className="w-full bg-white border border-[#034F46]/20 rounded-lg p-4 flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#034F46]" />
              <span className="text-[#034F46] text-[10px] uppercase font-mono mb-2">Extracted Claim (PKAE)</span>
              <div className="bg-[#30363D]/50 border border-[#30363D] p-3 rounded w-full text-center">
                <span className="text-[#8B949E] text-xs block mb-1">{evidence.fieldName}</span>
                <span className="text-[#2D3142] font-mono">{evidence.value}</span>
              </div>
              <div className="mt-3 text-[10px] text-[#8B949E] font-mono">
                Confidence Score: <span className="text-[#2D3142]">{evidence.confidenceScore.toFixed(1)}%</span>
              </div>
            </div>

            <ArrowRight size={20} className="text-[#8B949E] rotate-90 my-2" />

            {/* Step 3: Knowledge Graph */}
            <div className="w-full bg-white border border-[#30363D] rounded-lg p-4 flex flex-col items-center">
              <div className="bg-purple-500/10 text-purple-500 p-3 rounded-full mb-2">
                <Database size={24} />
              </div>
              <span className="text-[#8B949E] text-[10px] uppercase font-mono mb-1">Knowledge Graph Node</span>
              <span className="text-[#2D3142] font-medium">{evidence.entityName}</span>
              <span className="text-purple-400 text-xs mt-1 uppercase tracking-wider font-mono">{evidence.entityType}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
