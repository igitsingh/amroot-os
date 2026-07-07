import sys

new_content = """"use client";

import React, { useState } from "react";
import { X, Search, Crosshair, HelpCircle, Shield, ShieldAlert, ArrowRight, Activity, MapPin, Building, Target, Globe, Box, CheckCircle } from 'lucide-react';
import { getCompetitorIntel } from "@/data/competitorIntel";

const SECTIONS = [
  "1. Company Profile",
  "2. Product Portfolio",
  "3. Curcumin Information",
  "4. Packaging Intelligence",
  "5. Pricing Intelligence",
  "6. Brand Positioning",
  "7. Marketing Claims",
  "8. Social Media",
  "9. Website Intelligence",
  "10. Certifications",
  "11. Lab Reports",
  "12. Marketplace Presence",
  "13. Customer Intel",
  "14. Export Intel",
  "15. SWOT",
  "16. Amroot Strategy"
];

const Field = ({ label, value, verified = false }: { label: string, value: string | React.ReactNode | null, verified?: boolean }) => (
  <div className="flex flex-col mb-4">
    <div className="flex items-center gap-1.5 mb-1">
      <span className="text-[10px] uppercase font-mono text-white/40 tracking-widest">{label}</span>
      {verified && <Shield className="w-3 h-3 text-emerald-500/70" />}
      {!verified && value && <HelpCircle className="w-3 h-3 text-white/20 cursor-help" title="Pending Verification" />}
    </div>
    {value ? (
      <div className="text-sm font-medium text-white/90 font-mono tracking-tight">{value}</div>
    ) : (
      <div className="text-sm font-medium text-white/20 font-mono italic">[ Not Yet Verified ]</div>
    )}
  </div>
);

export default function CompetitorDossier({ competitor, onClose }: { competitor: any, onClose: () => void }) {
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);

  if (!competitor) return null;
  const intel = getCompetitorIntel(competitor.id);
  const hasData = !!intel;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-[1200px] bg-[#0A0A0A] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0 bg-[#0F0F0F]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded border border-white/10 bg-black flex items-center justify-center shrink-0">
            <Crosshair className="w-6 h-6 text-white/50" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white tracking-tight">{intel?.name || competitor.name}</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{hasData ? 'Verified Entity' : 'Pending Review'}</span>
            </div>
            <div className="text-xs font-mono text-white/40 mt-1 flex items-center gap-4">
              <span>ID: {competitor.id}</span>
              <span>SCORE: {competitor.intelligenceScore?.toFixed(1) || '0.0'}%</span>
              <span>UPDATED: {new Date().toISOString().split('T')[0]}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-md bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-64 border-r border-white/10 bg-[#0F0F0F] flex flex-col overflow-y-auto scrollbar-hide py-4">
          <div className="px-4 mb-4">
            <span className="text-[10px] font-mono uppercase text-white/30 tracking-widest">Intelligence Domains</span>
          </div>
          <div className="flex flex-col">
            {SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2.5 text-left text-xs font-mono transition-colors ${
                  activeSection === section 
                    ? 'bg-blue-500/10 text-blue-400 border-r-2 border-blue-500' 
                    : 'text-white/50 hover:bg-white/[0.02] hover:text-white'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#0A0A0A] p-8">
          
          <div className="max-w-4xl mx-auto">
            {/* DOMAIN 1: COMPANY PROFILE */}
            {activeSection.includes("Company Profile") && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                <Field label="Brand Name" value={intel?.name || competitor.name} verified={hasData} />
                <Field label="Parent Company" value={intel?.parentCompany || null} />
                <Field label="Legal Entity" value={intel?.legalEntity || null} />
                <Field label="Founder" value={intel?.founder || null} verified={!!intel?.founder} />
                <Field label="Founding Year" value={intel?.foundingYear || null} verified={!!intel?.foundingYear} />
                <Field label="Headquarters" value={intel?.headquarters || null} verified={!!intel?.headquarters} />
                <Field label="Country" value={intel?.country || null} verified={!!intel?.country} />
                <Field label="Manufacturing Locations" value={intel?.manufacturingLocations || null} />
                <Field label="Processing Locations" value={intel?.processingLocations || null} />
                <Field label="Export Markets" value={intel?.exportMarkets || null} />
                <Field label="Countries Sold" value={intel?.countriesSold || null} />
                <Field label="Official Website" value={intel?.websiteDisplay || null} verified={!!intel?.websiteDisplay} />
                <Field label="Official Email" value={intel?.officialEmail || null} />
                <Field label="Official Phone" value={null} />
                <Field label="Company Registration" value={null} />
                <Field label="GST / Tax ID" value={null} />
                <Field label="FSSAI" value={null} />
              </div>
            )}

            {/* DOMAIN 2: PRODUCT PORTFOLIO */}
            {activeSection.includes("Product Portfolio") && (
              <div>
                {intel?.portfolio && intel.portfolio.length > 0 ? (
                  <div className="border border-white/10 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-sm font-mono text-white/70">
                      <thead className="bg-[#0F0F0F] text-[10px] uppercase text-white/40 tracking-widest">
                        <tr>
                          <th className="px-4 py-3 font-medium">Product Name</th>
                          <th className="px-4 py-3 font-medium">Variant</th>
                          <th className="px-4 py-3 font-medium">Weight/Size</th>
                          <th className="px-4 py-3 font-medium">MRP</th>
                          <th className="px-4 py-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {intel.portfolio.map((prod, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02]">
                            <td className="px-4 py-3 text-white/90">{prod.name}</td>
                            <td className="px-4 py-3">{prod.variant}</td>
                            <td className="px-4 py-3">{prod.weight}</td>
                            <td className="px-4 py-3 text-emerald-400">{prod.mrp}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{prod.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-12 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
                    <Box className="w-8 h-8 text-white/20 mb-3" />
                    <div className="text-white/60 font-mono text-sm">Portfolio mapping required</div>
                    <div className="text-white/30 font-mono text-xs mt-1">Run data acquisition script to populate</div>
                  </div>
                )}
              </div>
            )}

            {/* DOMAIN 3: Curcumin Info */}
            {activeSection.includes("Curcumin Information") && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <Field label="Curcumin %" value={intel?.curcuminDisplay || null} verified={!!intel?.curcuminDisplay} />
                <Field label="Testing Method" value={null} />
                <Field label="Lab Name" value={null} />
                <Field label="Certificate Available?" value={hasData ? "No" : null} />
                <Field label="COA Published?" value={hasData ? "No" : null} />
                <Field label="Heavy Metals Tested?" value={intel?.heavyMetalsTested || null} />
                <Field label="Microbiology Tested?" value={null} />
                <Field label="Moisture" value={null} />
                <Field label="Lead" value={null} />
                <Field label="Arsenic" value={null} />
                <Field label="Cadmium" value={null} />
                <Field label="Mercury" value={null} />
                <Field label="Steam Sterilized?" value={null} />
                <Field label="Cryogenic?" value={null} />
                <Field label="Organic?" value={intel?.organic || null} verified={!!intel?.organic} />
                <Field label="GI Tagged?" value={intel?.giTagged || null} />
                <Field label="Single Origin?" value={intel?.singleOrigin || null} verified={!!intel?.singleOrigin} />
              </div>
            )}

            {/* DOMAIN 4: Packaging Intelligence */}
            {activeSection.includes("Packaging Intelligence") && (
              <div>
                {intel?.packaging ? (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <Field label="Primary Material" value={intel.packaging.primaryMaterial} verified />
                    <Field label="Luxury Score" value={intel.packaging.luxuryScore} verified />
                    <Field label="Shelf Impact" value={intel.packaging.shelfImpact} verified />
                    <Field label="Eco Score" value={intel.packaging.ecoScore} />
                    <Field label="Label Design" value={intel.packaging.labelDesign} />
                    <Field label="Brand Colors" value={intel.packaging.brandColors} verified />
                    <Field label="Unboxing Experience" value={intel.packaging.unboxingExperience} />
                  </div>
                ) : (
                  <div className="p-12 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
                    <Box className="w-8 h-8 text-white/20 mb-3" />
                    <div className="text-white/60 font-mono text-sm">Packaging analysis pending</div>
                  </div>
                )}
              </div>
            )}

            {/* DOMAIN 5: Pricing Intelligence */}
            {activeSection.includes("Pricing Intelligence") && (
              <div>
                {intel?.pricing ? (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <Field label="Premium Positioning" value={intel.pricing.premiumPositioning} verified />
                    <Field label="Website Price" value={intel.pricing.websitePrice} verified />
                    <Field label="Retail Price" value={intel.pricing.retailPrice} />
                    <Field label="Cost Per 100g" value={intel.pricing.costPer100g} />
                  </div>
                ) : (
                  <div className="p-12 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
                    <Box className="w-8 h-8 text-white/20 mb-3" />
                    <div className="text-white/60 font-mono text-sm">Pricing data pending</div>
                  </div>
                )}
              </div>
            )}

            {/* DOMAIN 6: Brand Positioning */}
            {activeSection.includes("Brand Positioning") && (
              <div>
                {intel?.positioningTags && intel.positioningTags.length > 0 ? (
                  <div className="mb-6">
                    <div className="text-[10px] uppercase font-mono text-white/40 tracking-widest mb-3">Core Identity Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {intel.positioningTags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80 font-mono">{tag}</span>
                      ))}
                    </div>
                  </div>
                ) : null}
                
                {intel?.coreNarrative ? (
                  <div className="mb-6">
                    <div className="text-[10px] uppercase font-mono text-white/40 tracking-widest mb-3">Core Narrative / Hero Message</div>
                    <div className="p-4 border border-white/10 bg-white/[0.02] rounded-lg text-sm text-white/80 leading-relaxed italic">
                      "{intel.coreNarrative}"
                    </div>
                  </div>
                ) : (
                  <div className="p-12 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
                    <Target className="w-8 h-8 text-white/20 mb-3" />
                    <div className="text-white/60 font-mono text-sm">Positioning analysis pending</div>
                  </div>
                )}
              </div>
            )}

            {/* DOMAIN 16: Strategy */}
            {activeSection.includes("Amroot Strategy") && (
              <div>
                {intel?.strategy ? (
                  <div className="border border-blue-500/30 bg-blue-500/5 rounded-lg p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                      <Target className="w-24 h-24 text-blue-500/10" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <Crosshair className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-bold text-white font-mono tracking-tight">{intel.strategy.title}</h3>
                      </div>
                      <div className="text-sm text-white/80 leading-relaxed font-mono">
                        {intel.strategy.content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
                    <ShieldAlert className="w-8 h-8 text-white/20 mb-3" />
                    <div className="text-white/60 font-mono text-sm">Strategic analysis required</div>
                    <div className="text-white/30 font-mono text-xs mt-1">Assign analyst agent to generate competitive takedown</div>
                  </div>
                )}
              </div>
            )}

            {/* Empty States for other sections */}
            {[
              "Marketing Claims", "Social Media", "Website Intelligence", 
              "Certifications", "Lab Reports", "Marketplace Presence", 
              "Customer Intel", "Export Intel", "SWOT"
            ].some(s => activeSection.includes(s)) && (
              <div className="p-12 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
                <Search className="w-8 h-8 text-white/20 mb-3" />
                <div className="text-white/60 font-mono text-sm">Data extraction pending</div>
                <div className="text-white/30 font-mono text-xs mt-1">Run OS scraper to populate this domain</div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
"""

with open("src/app/competitors/CompetitorDossier.tsx", "w") as f:
    f.write(new_content)
