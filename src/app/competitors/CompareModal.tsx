import React from 'react';
import { X, CheckCircle2, XCircle, ArrowRightLeft } from 'lucide-react';
import { getCompetitorIntel } from '../../data/competitorIntel';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIds: string[];
  competitors: any[];
}

export default function CompareModal({ isOpen, onClose, selectedIds, competitors }: CompareModalProps) {
  if (!isOpen) return null;

  const selectedCompetitors = competitors.filter(c => selectedIds.includes(c.id));
  
  const amrootData: any = {
    name: "Amroot Organics",
    isBrand: true,
    
    // Company Profile
    entityType: "Elite Nutraceutical Brand",
    location: "Meghalaya, India",
    marketTier: "Clinical Luxury",
    websiteDisplay: "amrootorganics.com",
    founder: "Amroot Founders",
    foundingYear: "2024",
    headquarters: "India",
    
    // Product & Sourcing
    origin: "Meghalaya, India",
    curcumin: "7% - 12% (Premium Lakadong)",
    organic: "100% Certified Organic",
    giTagged: true,
    singleOrigin: "Yes (Lakadong)",
    heavyMetalsTested: "Zero Tolerance (Lab Verified)",
    certifications: ["Organic", "ISO 22000", "GMP", "HACCP", "Halal", "Kosher"],
    supplyChain: "100% Direct Farm (Zero Middlemen)",
    traceability: "Full Farm-to-Table Traceability",
    
    // Pricing & MOQ
    moq: "1 kg",
    premiumPositioning: "Clinical Luxury",
    retailPrice: "Premium (Value-driven)",
    costPer100g: "Competitive for Clinical Grade",
    exportMarkets: "Global (USA, EU, Middle East focus)",

    // Packaging
    primaryMaterial: "Biophotonic Glass / Premium Minimalist",
    luxuryScore: "10 / 10",
    shelfImpact: "High (Clinical, Ethereal)",
    ecoScore: "10 / 10 (Fully Recyclable)",
    unboxingExperience: "Exceptional",

    // Brand Strategy
    positioningTags: ["Clinical Efficacy", "Uncompromised Purity", "Luxury Nutraceuticals"],
    coreNarrative: "Elevating traditional botanicals into clinical-grade luxury nutraceuticals with unmatched transparency and potency.",
    strategyTitle: "Our Edge",
    strategyContent: "We don't compete on price or quaint farm aesthetics. We own the premium segment by offering pharmaceutical-grade purity, radical transparency, and clinical efficacy in a luxury package.",
  };

  const competitorsData = selectedCompetitors.map(c => {
    const intel = getCompetitorIntel(c.id);
    return {
      name: intel?.company || c.name,
      isBrand: false,
      
      // Company Profile
      entityType: intel?.entityType || c.entityType || "Unknown",
      location: c.location || intel?.headquarters || "Unknown",
      marketTier: intel?.marketTier || c.marketTier || "Unknown",
      websiteDisplay: intel?.websiteDisplay || "N/A",
      founder: intel?.founder || "Unknown",
      foundingYear: intel?.foundingYear || "Unknown",
      headquarters: intel?.headquarters || "Unknown",
      
      // Product & Sourcing
      origin: intel?.singleOrigin || intel?.giTagged || "Multiple/Unknown",
      curcumin: intel?.curcuminDisplay || "2% - 5% (Standard)",
      organic: intel?.organic || "Standard",
      giTagged: intel?.giTagged ? true : false,
      singleOrigin: intel?.singleOrigin || "No",
      heavyMetalsTested: intel?.heavyMetalsTested || "Unknown",
      certifications: intel?.certifications || ["Standard"],
      supplyChain: intel?.positioningTags?.includes("Regenerative") ? "Direct sourcing claimed" : "Aggregator / Middlemen",
      traceability: intel?.traceability || "Limited or None",
      
      // Pricing & MOQ
      moq: intel?.moq || "Typically 50kg - 1000kg",
      premiumPositioning: intel?.pricing?.premiumPositioning || "Standard",
      retailPrice: intel?.pricing?.retailPrice || (intel?.averagePriceKg ? `₹${intel.averagePriceKg}/kg` : "Market Rate"),
      costPer100g: intel?.pricing?.costPer100g || "N/A",
      exportMarkets: intel?.exportMarkets || "Unknown",

      // Packaging
      primaryMaterial: intel?.packaging?.primaryMaterial || "Standard",
      luxuryScore: intel?.packaging?.luxuryScore || "N/A",
      shelfImpact: intel?.packaging?.shelfImpact || "N/A",
      ecoScore: intel?.packaging?.ecoScore || "N/A",
      unboxingExperience: intel?.packaging?.unboxingExperience || "N/A",

      // Brand Strategy
      positioningTags: intel?.positioningTags || [],
      coreNarrative: intel?.coreNarrative || "N/A",
      strategyTitle: intel?.strategy?.title || "N/A",
      strategyContent: intel?.strategy?.content || "N/A",
    };
  });

  const allColumns = [amrootData, ...competitorsData];

  const sections = [
    {
      title: "Company Profile",
      rows: [
        { label: "Entity Type", key: "entityType" },
        { label: "Market Tier", key: "marketTier" },
        { label: "Location", key: "location" },
        { label: "Website", key: "websiteDisplay" },
        { label: "Founder(s)", key: "founder" },
        { label: "Founding Year", key: "foundingYear" },
      ]
    },
    {
      title: "Product & Sourcing",
      rows: [
        { label: "Curcumin Content", key: "curcumin" },
        { label: "Origin / Terroir", key: "origin" },
        { label: "Organic Status", key: "organic" },
        { label: "GI Tagged", key: "giTagged", type: "boolean" },
        { label: "Single Origin", key: "singleOrigin" },
        { label: "Heavy Metals Testing", key: "heavyMetalsTested" },
        { label: "Certifications", key: "certifications", type: "array" },
        { label: "Supply Chain", key: "supplyChain" },
        { label: "Traceability", key: "traceability" },
      ]
    },
    {
      title: "Pricing & MOQ",
      rows: [
        { label: "Minimum Order (MOQ)", key: "moq" },
        { label: "Retail Pricing", key: "retailPrice" },
        { label: "Cost Per 100g", key: "costPer100g" },
        { label: "Premium Positioning", key: "premiumPositioning" },
        { label: "Export Markets", key: "exportMarkets" },
      ]
    },
    {
      title: "Packaging Intelligence",
      rows: [
        { label: "Primary Material", key: "primaryMaterial" },
        { label: "Luxury Score", key: "luxuryScore" },
        { label: "Shelf Impact", key: "shelfImpact" },
        { label: "Eco Score", key: "ecoScore" },
        { label: "Unboxing Experience", key: "unboxingExperience" },
      ]
    },
    {
      title: "Brand Strategy & Positioning",
      rows: [
        { label: "Positioning Tags", key: "positioningTags", type: "arrayTags" },
        { label: "Core Narrative", key: "coreNarrative", type: "longText" },
        { label: "Amroot Counter-Strategy", key: "strategyContent", type: "longTextSpecial" },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2D3142]/80 p-4 sm:p-6 backdrop-blur-md transition-opacity">
      <div className="bg-[#F4F1EA] w-full max-w-7xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#2D3142]/10 relative animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2D3142]/10 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F16775]/10 flex items-center justify-center text-[#F16775]">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#2D3142]">Compare Your Brand</h2>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#F16775] text-white uppercase tracking-wider shadow-sm">Comprehensive Mode</span>
              </div>
              <p className="text-sm text-[#2D3142]/60 mt-0.5">Benchmarking Amroot Organics against selected competitors across all intelligence domains</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#2D3142]/50 hover:bg-[#2D3142]/5 hover:text-[#2D3142] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="min-w-[1000px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="w-64 p-5 border-b-2 border-[#2D3142]/10 text-xs font-bold text-[#2D3142]/60 uppercase tracking-wider bg-white sticky top-0 z-20 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                    Intelligence Domain
                  </th>
                  {allColumns.map((col, idx) => (
                    <th key={idx} className={`p-5 border-b-2 ${col.isBrand ? 'border-[#F16775] bg-white' : 'border-[#2D3142]/10 bg-white'} sticky top-0 z-20 shadow-[0_4px_12px_rgba(0,0,0,0.02)] min-w-[280px]`}>
                      <div className="flex flex-col gap-1.5">
                        {col.isBrand && (
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#F16775] bg-[#F16775]/10 px-2.5 py-1 rounded-full w-fit">Your Brand</span>
                        )}
                        <span className={`text-lg font-bold ${col.isBrand ? 'text-[#F16775]' : 'text-[#2D3142]'}`}>
                          {col.name}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D3142]/5">
                
                {sections.map((section, sIdx) => (
                  <React.Fragment key={sIdx}>
                    {/* Section Header */}
                    <tr className="bg-[#F4F1EA]/60">
                      <td colSpan={allColumns.length + 1} className="px-5 py-3 text-xs font-bold text-[#2D3142] uppercase tracking-wider border-t border-[#2D3142]/10 border-b border-[#2D3142]/5 sticky top-[88px] z-10 backdrop-blur-md bg-[#F4F1EA]/90">
                        {section.title}
                      </td>
                    </tr>
                    
                    {/* Section Rows */}
                    {section.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[#2D3142]/[0.02] transition-colors group">
                        <td className="p-5 text-sm font-medium text-[#2D3142]/70 bg-white group-hover:bg-[#F4F1EA]/20 align-top">
                          {row.label}
                        </td>
                        
                        {allColumns.map((col, cIdx) => {
                          const val = col[row.key];
                          
                          let displayContent = null;
                          
                          let isHighCurcumin = false;
                          if (row.key === 'curcumin' && val) {
                            const match = String(val).match(/(\d+(\.\d+)?)/);
                            if (match) {
                              const num = parseFloat(match[1]);
                              if (num >= 7) {
                                isHighCurcumin = true;
                              }
                            }
                          }

                          if (row.type === 'boolean') {
                            displayContent = val ? (
                              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                                <CheckCircle2 className="w-4 h-4" /> Yes
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-[#2D3142]/40">
                                <XCircle className="w-4 h-4" /> No
                              </div>
                            );
                          } else if (row.type === 'array') {
                            displayContent = (
                              <div className="flex flex-wrap gap-1.5">
                                {(val || []).map((item: string, i: number) => (
                                  <span key={i} className="px-2 py-1 rounded text-[11px] font-medium whitespace-nowrap bg-emerald-500/10 text-emerald-700">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            );
                          } else if (row.type === 'arrayTags') {
                            displayContent = (
                              <div className="flex flex-wrap gap-1.5">
                                {(val || []).map((item: string, i: number) => (
                                  <span key={i} className={`px-2 py-1 rounded-full border text-[11px] font-medium ${col.isBrand ? 'border-[#F16775]/20 text-[#F16775] bg-[#F16775]/5' : 'border-[#2D3142]/10 text-[#2D3142]/60 bg-white'}`}>
                                    {item}
                                  </span>
                                ))}
                              </div>
                            );
                          } else if (row.type === 'longText') {
                            displayContent = <p className="text-sm leading-relaxed text-[#2D3142]/80">{val}</p>;
                          } else if (row.type === 'longTextSpecial') {
                            displayContent = (
                              <div className={`p-3 rounded-lg text-sm leading-relaxed border ${col.isBrand ? 'bg-[#F16775]/5 border-[#F16775]/20 text-[#F16775]' : 'bg-[#2D3142]/5 border-transparent text-[#2D3142]/80'}`}>
                                {val}
                              </div>
                            );
                          } else {
                            displayContent = (
                              <div className="flex items-center gap-2">
                                {(col.isBrand || isHighCurcumin) && row.key === 'curcumin' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                                <span className={`${row.key === 'curcumin' && (col.isBrand || isHighCurcumin) ? 'font-bold text-amber-600' : ''}`}>{val}</span>
                              </div>
                            );
                          }

                          return (
                            <td key={cIdx} className={`p-5 text-sm align-top ${col.isBrand ? 'bg-white border-x border-[#F16775]/10 text-[#2D3142]' : 'text-[#2D3142]/80 border-r border-[#2D3142]/5'}`}>
                              {displayContent}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
