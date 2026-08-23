import React, { useState } from 'react';
import { 
  X, CheckCircle2, AlertTriangle, FileText, Download, 
  MapPin, Globe, Award, ShieldAlert, BookOpen, Clock, BarChart4, Users,
  Target, Zap, ShoppingCart, TrendingUp, Link as LinkIcon, Mail
} from 'lucide-react';

interface BuyerDossierProps {
  buyer: any;
  onClose: () => void;
}

export default function BuyerDossier({ buyer, onClose }: BuyerDossierProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const pIntel = buyer.productIntelligence || {};
  const proc = buyer.procurement || {};

  // Match Analysis Logic
  const matchPoints = [];
  if (pIntel.buysTurmeric) matchPoints.push("Already sells turmeric");
  if (proc.importOrigins?.includes('India')) matchPoints.push("Already imports from India");
  if (proc.organic) matchPoints.push("Organic-focused catalogue");
  if (buyer.marketFocus?.toLowerCase().includes('premium')) matchPoints.push("Premium customer base");
  if (pIntel.buysGinger) matchPoints.push("Already sells ginger");
  if (cType(buyer.companyType, 'distributor')) matchPoints.push("Has distribution network");
  
  const missingProducts = [];
  if (pIntel.buysTurmeric && !pIntel.buysLakadong) missingProducts.push("Lakadong Turmeric");
  if (pIntel.buysTurmeric && !pIntel.buysCurcumin) missingProducts.push("Curcumin Extract");
  if (pIntel.buysGinger && !pIntel.buysOrganicGinger) missingProducts.push("Organic Jaintia Hills Ginger");
  if (!pIntel.buysFunctional) missingProducts.push("Golden Milk Blend");

  const existingProducts = [];
  if (pIntel.buysTurmeric) existingProducts.push("Standard Turmeric");
  if (pIntel.buysGinger) existingProducts.push("Standard Ginger");
  if (pIntel.buysSpices) existingProducts.push("General Spices");
  
  function cType(str: string, match: string) {
    return (str || '').toLowerCase().includes(match);
  }

  // Group Personnel
  const personnel = buyer.decisionMakers || [];
  const decisionMakers = personnel.filter((p: any) => cType(p.designation, 'ceo') || cType(p.designation, 'founder') || cType(p.designation, 'director'));
  const procurementTeam = personnel.filter((p: any) => cType(p.designation, 'buyer') || cType(p.designation, 'sourc') || cType(p.designation, 'procure') || cType(p.designation, 'purchas'));
  const otherTeam = personnel.filter((p: any) => !decisionMakers.includes(p) && !procurementTeam.includes(p));

  return (
    <div className="fixed inset-y-0 right-0 w-[900px] bg-white border-l border-[#2D3142]/10 shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="shrink-0 border-b border-[#2D3142]/10 bg-[#F4F1EA] p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#2D3142]/5 transition-colors"
        >
          <X className="w-5 h-5 text-[#2D3142]/50" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-[#F4F1EA] border border-[#2D3142]/10 flex items-center justify-center text-2xl font-bold text-[#2D3142]/50">
            {buyer.name ? buyer.name.charAt(0) : '?'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2D3142] tracking-tight">{buyer.name || 'Unknown Buyer'}</h2>
            <div className="flex items-center gap-3 mt-2 text-sm text-[#2D3142]/60">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {buyer.city || 'Unknown City'}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> {buyer.country?.name || 'Unknown Country'}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-[#F16775]/10 text-[#F16775] border border-[#F16775]/20 text-xs">
                {buyer.companyType || 'Uncategorized'}
              </span>
            </div>
          </div>
        </div>

        {/* Intelligence Score & Revenue */}
        <div className="mt-6 flex items-center justify-between p-4 rounded-lg border border-[#2D3142]/5 bg-white/[0.02]">
          <div className="flex gap-12">
            <div>
              <div className="text-xs font-mono uppercase text-[#2D3142]/40 mb-1">Amroot Opportunity Score</div>
              <div className="text-2xl font-bold text-[#034F46] flex items-baseline gap-1">
                {buyer.intelligenceScore || 0}% 
                <span className="text-xs font-normal text-[#2D3142]/40 ml-2">Match</span>
              </div>
            </div>
            {buyer.revenueMin && (
              <div>
                <div className="text-xs font-mono uppercase text-[#2D3142]/40 mb-1">Potential Annual Revenue</div>
                <div className="text-xl font-bold text-[#2D3142] flex items-baseline gap-1">
                  ${(buyer.revenueMin / 1000).toFixed(0)}k - ${(buyer.revenueMax / 1000).toFixed(0)}k
                  <span className="text-xs font-normal text-green-600 ml-2">({buyer.revenueConfidenceScore || 0}% Conf)</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="text-xs font-mono uppercase text-[#2D3142]/40 mb-1">Pipeline Status</div>
              <div className="flex items-center gap-1.5 text-blue-600 font-bold uppercase tracking-wider text-sm bg-blue-50 px-3 py-1 rounded">
                {buyer.relationshipStatus?.replace(/_/g, ' ') || 'NOT CONTACTED'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex px-6 border-b border-[#2D3142]/10 bg-[#F4F1EA] shrink-0 overflow-x-auto scrollbar-hide">
        {[
          { id: 'overview', label: 'Match Analysis' },
          { id: 'gap_analysis', label: 'Product Gaps' },
          { id: 'procurement', label: 'Procurement Intel' },
          { id: 'decision_makers', label: 'Contact Hierarchy' },
          { id: 'playbook', label: 'Sales Playbook' },
          { id: 'market_data', label: 'Competitors & Listings' },
          { id: 'signals', label: 'Buying Signals' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-[#F16775] text-[#F16775]' 
                : 'border-transparent text-[#2D3142]/50 hover:text-[#2D3142] hover:bg-white/[0.02]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide bg-white">
        
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-semibold text-[#2D3142]/90 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-[#F16775]" /> Why This Buyer Matters
              </h3>
              <div className="p-6 rounded-xl border border-green-200 bg-green-50 shadow-sm">
                <div className="space-y-3 mb-6">
                  {matchPoints.length > 0 ? matchPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-3 text-green-900 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      {point}
                    </div>
                  )) : (
                    <div className="text-sm text-gray-500">Not enough data to calculate match points.</div>
                  )}
                </div>
                
                <div className="pt-4 border-t border-green-200">
                  <h4 className="text-xs uppercase font-bold text-green-800 tracking-wider mb-2">Primary Opportunity</h4>
                  <p className="text-green-900 font-semibold text-lg">
                    {missingProducts.length > 0 
                      ? `Potential insertion of ${missingProducts[0]} to capture premium margin.`
                      : 'Expand existing product volume and transition to bulk supply.'}
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="text-sm font-semibold text-[#2D3142]/90 mb-4 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#F16775]" /> Company Profile
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded border border-[#2D3142]/5 bg-white/[0.02]">
                  <div className="text-xs text-[#2D3142]/40 mb-1">Market Focus</div>
                  <div className="text-sm text-[#2D3142]">{buyer.marketFocus || 'Unknown'}</div>
                </div>
                <div className="p-4 rounded border border-[#2D3142]/5 bg-white/[0.02]">
                  <div className="text-xs text-[#2D3142]/40 mb-1">Business Size</div>
                  <div className="text-sm text-[#2D3142]">{buyer.businessSize || 'Unknown'}</div>
                </div>
              </div>
              <div className="p-4 rounded border border-[#2D3142]/5 bg-white/[0.02] text-sm text-[#2D3142]/70 leading-relaxed">
                {buyer.description || 'No description available for this buyer.'}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'gap_analysis' && (
          <div className="space-y-8">
            <h3 className="text-sm font-semibold text-[#2D3142]/90 mb-4 uppercase tracking-wider flex items-center gap-2">
              <BarChart4 className="w-4 h-4 text-[#F16775]" /> Product Gap Intelligence
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Existing */}
              <div className="border border-[#2D3142]/10 rounded-xl overflow-hidden">
                <div className="bg-[#F4F1EA] px-4 py-3 border-b border-[#2D3142]/10 font-semibold text-[#2D3142]">
                  Existing Products
                </div>
                <div className="p-4 space-y-3">
                  {existingProducts.length > 0 ? existingProducts.map(p => (
                    <div key={p} className="flex items-center gap-2 text-sm text-[#2D3142]/70">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div> {p}
                    </div>
                  )) : (
                    <div className="text-sm text-gray-400">No specific products identified.</div>
                  )}
                </div>
              </div>

              {/* Missing */}
              <div className="border border-orange-200 rounded-xl overflow-hidden bg-orange-50/30">
                <div className="bg-orange-100 px-4 py-3 border-b border-orange-200 font-semibold text-orange-900 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Missing Amroot SKUs
                </div>
                <div className="p-4 space-y-3">
                  {missingProducts.length > 0 ? missingProducts.map(p => (
                    <div key={p} className="flex items-center gap-2 text-sm font-bold text-orange-700">
                      <PlusIcon className="w-4 h-4" /> {p}
                    </div>
                  )) : (
                    <div className="text-sm text-green-600 font-medium">Full portfolio currently stocked!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'decision_makers' && (
          <div className="space-y-8">
            <h3 className="text-sm font-semibold text-[#2D3142]/90 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-[#F16775]" /> Contact Hierarchy
            </h3>
            
            <div className="space-y-6">
              <ContactGroup title="Decision Makers (C-Level & Founders)" contacts={decisionMakers} />
              <ContactGroup title="Procurement & Sourcing Team" contacts={procurementTeam} />
              <ContactGroup title="Commercial & Other Team" contacts={otherTeam} />
            </div>
          </div>
        )}

        {activeTab === 'procurement' && (
          <div className="space-y-8">
            <h3 className="text-sm font-semibold text-[#2D3142]/90 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#F16775]" /> Procurement Profile
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-5 rounded-xl border border-[#2D3142]/10 bg-white shadow-sm">
                  <div className="text-xs uppercase tracking-wider text-[#2D3142]/50 mb-3 font-semibold">Import Origins</div>
                  <div className="flex flex-wrap gap-2">
                    {proc.importOrigins?.length > 0 ? proc.importOrigins.map((origin: string) => (
                      <span key={origin} className="px-3 py-1.5 border border-[#2D3142]/10 bg-[#F4F1EA] rounded text-sm font-medium">
                        {origin}
                      </span>
                    )) : <span className="text-sm text-gray-400">Unknown</span>}
                  </div>
                </div>
                
                <div className="p-5 rounded-xl border border-[#2D3142]/10 bg-white shadow-sm">
                  <div className="text-xs uppercase tracking-wider text-[#2D3142]/50 mb-3 font-semibold">Procurement Readiness</div>
                  <div className="text-xl font-bold text-[#034F46]">
                    {proc.importOrigins?.includes('India') ? 'Very High' : 'Medium'}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-xl border border-[#2D3142]/10 bg-white shadow-sm">
                  <div className="text-xs uppercase tracking-wider text-[#2D3142]/50 mb-1 font-semibold">Estimated MOQ</div>
                  <div className="text-lg font-medium text-[#2D3142]">{proc.moq || 'Unknown'}</div>
                </div>

                <div className="p-5 rounded-xl border border-[#2D3142]/10 bg-white shadow-sm">
                  <div className="text-xs uppercase tracking-wider text-[#2D3142]/50 mb-3 font-semibold">Sourcing Categories</div>
                  <div className="flex flex-wrap gap-2">
                    {proc.bulk && <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">Bulk Ingredients</span>}
                    {proc.organic && <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Certified Organic</span>}
                    {proc.conventional && <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">Conventional</span>}
                    {proc.privateLabel && <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">Private Label</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'playbook' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-[#2D3142]/90 mb-4 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#F16775]" /> Sales Playbook
            </h3>
            
            <div className="p-6 rounded-xl bg-gray-900 text-white shadow-xl space-y-6">
              <div>
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-2 font-bold">Recommended Pitch</div>
                <div className="text-lg font-medium leading-relaxed">
                  "Highlight Amroot's 100% traceable, high-curcumin Lakadong Turmeric directly from Jaintia Hills. Emphasize that switching to our origin reduces middlemen and guarantees organic purity for their premium catalog."
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-gray-700 pt-6">
                <div>
                  <div className="text-gray-400 text-xs uppercase tracking-wider mb-1 font-bold">Suggested Entry Product</div>
                  <div className="text-green-400 font-bold">{missingProducts[0] || 'Bulk Turmeric'}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs uppercase tracking-wider mb-1 font-bold">Suggested Contact</div>
                  <div className="text-blue-400 font-bold">{procurementTeam[0]?.fullName || decisionMakers[0]?.fullName || 'Search for Import Manager'}</div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <div className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-bold">Outreach Sequence</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm border border-blue-800">1. LinkedIn Invite</span>
                  <span className="text-gray-600">→</span>
                  <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm border border-gray-700">2. Value Email (Gap Analysis)</span>
                  <span className="text-gray-600">→</span>
                  <span className="px-3 py-1 rounded-full bg-orange-900/50 text-orange-300 text-sm border border-orange-800">3. Sample Offer</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'market_data' && (
          <div className="space-y-8">
            <h3 className="text-sm font-semibold text-[#2D3142]/90 mb-4 uppercase tracking-wider flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#F16775]" /> Competitors & Product Listings
            </h3>
            
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-[#2D3142]/60">Products Currently Sold (SKUs)</h4>
              {buyer.productListings && buyer.productListings.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {buyer.productListings.map((listing: any) => (
                    <div key={listing.id} className="p-4 border border-[#2D3142]/10 rounded-lg flex justify-between items-center bg-white shadow-sm">
                      <div>
                        <div className="font-bold text-[#2D3142]">{listing.name}</div>
                        <div className="text-xs text-[#2D3142]/60 mt-1">Platform: {listing.platform} | Packaging: {listing.packaging}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-green-700 font-bold">${listing.price}</div>
                        <a href={listing.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs flex items-center justify-end gap-1 mt-1">
                          View <LinkIcon className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center border border-dashed border-[#2D3142]/20 rounded-lg text-[#2D3142]/50 text-sm">
                  No specific SKU listings tracked yet.
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-[#2D3142]/60">Stocked Competitors</h4>
              {buyer.competitorStocks && buyer.competitorStocks.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {buyer.competitorStocks.map((comp: any) => (
                    <div key={comp.id} className="p-4 border border-red-200 bg-red-50/30 rounded-lg flex justify-between items-center">
                      <div>
                        <div className="font-bold text-red-900">{comp.brandName}</div>
                        <div className="text-xs text-red-700/80 mt-1">Risk: {comp.competitiveRisk} | Product: {comp.productName}</div>
                      </div>
                      <div className="text-sm font-medium text-red-800 max-w-xs text-right italic">
                        "{comp.opportunity}"
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center border border-dashed border-[#2D3142]/20 rounded-lg text-[#2D3142]/50 text-sm">
                  No specific competitor presence tracked yet.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'signals' && (
          <div className="space-y-8">
            <h3 className="text-sm font-semibold text-[#2D3142]/90 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#F16775]" /> Buying Signals & Trade Shows
            </h3>
            
            <div className="border-l-2 border-[#2D3142]/10 ml-3 pl-4 space-y-6">
              {buyer.signals && buyer.signals.length > 0 ? (
                buyer.signals.map((sig: any) => (
                  <div key={sig.id} className="relative">
                    <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-[#F16775] ring-4 ring-white"></div>
                    <div className="text-xs font-bold text-[#F16775] mb-1">{new Date(sig.dateDetected).toLocaleDateString()} • {sig.signalType}</div>
                    <div className="text-sm font-medium text-[#2D3142] bg-[#F4F1EA] p-3 rounded-lg border border-[#2D3142]/5">
                      {sig.description}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 py-4">No recent signals detected.</div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function ContactGroup({ title, contacts }: { title: string, contacts: any[] }) {
  if (!contacts || contacts.length === 0) return null;
  return (
    <div className="mb-6">
      <h4 className="text-xs font-bold uppercase text-[#2D3142]/50 mb-3 border-b border-[#2D3142]/10 pb-2">{title}</h4>
      <div className="grid grid-cols-1 gap-3">
        {contacts.map((dm: any) => (
          <div key={dm.id} className="p-4 rounded-lg border border-[#2D3142]/10 bg-white shadow-sm flex flex-col gap-1 hover:border-[#F16775]/30 transition-colors">
            <div className="flex justify-between items-start">
              <div className="font-bold text-[#2D3142]">{dm.fullName}</div>
              {dm.confidenceScore && <div className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{dm.confidenceScore}% Conf</div>}
            </div>
            <div className="text-sm font-medium text-[#2D3142]/60">{dm.designation || 'Unknown Designation'}</div>
            {(dm.businessEmail || dm.linkedinUrl || dm.sourceLink) && (
              <div className="pt-3 mt-2 border-t border-[#2D3142]/5 flex gap-4 text-xs font-medium">
                {dm.businessEmail && <span className="text-[#F16775] flex items-center gap-1"><Mail className="w-3 h-3"/> {dm.businessEmail}</span>}
                {dm.linkedinUrl && <a href={dm.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>}
                {dm.sourceLink && <a href={dm.sourceLink} target="_blank" rel="noreferrer" className="text-gray-500 hover:underline">Source</a>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const PlusIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
