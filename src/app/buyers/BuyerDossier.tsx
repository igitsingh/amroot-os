import React, { useState } from 'react';
import { 
  X, CheckCircle2, AlertTriangle, FileText, Download, 
  MapPin, Globe, Award, ShieldAlert, BookOpen, Clock, BarChart4, Users
} from 'lucide-react';

interface BuyerDossierProps {
  buyer: any;
  onClose: () => void;
}

export default function BuyerDossier({ buyer, onClose }: BuyerDossierProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="fixed inset-y-0 right-0 w-[800px] bg-white border-l border-[#2D3142]/10 shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
      
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

        {/* Intelligence Score */}
        <div className="mt-6 flex items-center justify-between p-4 rounded-lg border border-[#2D3142]/5 bg-white/[0.02]">
          <div>
            <div className="text-xs font-mono uppercase text-[#2D3142]/40 mb-1">Intelligence Score</div>
            <div className="text-2xl font-bold text-[#2D3142] flex items-baseline gap-1">
              {buyer.intelligenceScore || 0}% 
              <span className="text-xs font-normal text-[#2D3142]/40">Confidence</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="text-xs font-mono uppercase text-[#2D3142]/40 mb-1">Status</div>
              <div className="flex items-center gap-1.5 text-[#034F46] font-medium">
                {buyer.lifecycleStage === 'VERIFICATION_PENDING' ? (
                  <><AlertTriangle className="w-4 h-4 text-amber-500" /> Pending</>
                ) : (
                  <><CheckCircle2 className="w-4 h-4" /> Verified</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex px-6 border-b border-[#2D3142]/10 bg-[#F4F1EA] shrink-0 overflow-x-auto scrollbar-hide">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'products', label: 'Products Purchased' },
          { id: 'decision_makers', label: 'Decision Makers' },
          { id: 'import_intel', label: 'Import Intelligence' },
          { id: 'certifications', label: 'Certifications' },
          { id: 'digital', label: 'Digital Presence' },
          { id: 'evidence', label: 'Evidence' }
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
                <Award className="w-4 h-4 text-[#F16775]" /> Key Intelligence
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded border border-[#2D3142]/5 bg-white/[0.02]">
                  <div className="text-xs text-[#2D3142]/40 mb-1">Market Focus</div>
                  <div className="text-sm text-[#2D3142]">{buyer.marketFocus || 'Unknown'}</div>
                </div>
                <div className="p-4 rounded border border-[#2D3142]/5 bg-white/[0.02]">
                  <div className="text-xs text-[#2D3142]/40 mb-1">Business Size</div>
                  <div className="text-sm text-[#2D3142]">{buyer.businessSize || 'Unknown'}</div>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="text-sm font-semibold text-[#2D3142]/90 mb-4 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#F16775]" /> Company Description
              </h3>
              <div className="p-4 rounded border border-[#2D3142]/5 bg-white/[0.02] text-sm text-[#2D3142]/70 leading-relaxed">
                {buyer.description || 'No description available for this buyer.'}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-[#2D3142]/90 mb-4 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#F16775]" /> Products Purchased
            </h3>
            {buyer.productIntelligence ? (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(buyer.productIntelligence).map(([key, value]) => {
                  if (typeof value !== 'boolean' || !value) return null;
                  const label = key.replace('buys', '').replace(/([A-Z])/g, ' $1').trim();
                  return (
                    <div key={key} className="p-3 rounded border border-[#2D3142]/10 bg-[#F4F1EA] flex items-center gap-2 text-sm text-[#2D3142]">
                      <CheckCircle2 className="w-4 h-4 text-[#F16775]" /> {label}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-[#2D3142]/20 rounded-lg text-[#2D3142]/50 text-sm">
                No product intelligence recorded.
              </div>
            )}
          </div>
        )}

        {activeTab === 'decision_makers' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-[#2D3142]/90 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-[#F16775]" /> Key Contacts
            </h3>
            {buyer.decisionMakers && buyer.decisionMakers.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {buyer.decisionMakers.map((dm: any) => (
                  <div key={dm.id} className="p-4 rounded border border-[#2D3142]/10 bg-white shadow-sm flex flex-col gap-2">
                    <div className="font-semibold text-[#2D3142]">{dm.fullName}</div>
                    <div className="text-sm text-[#2D3142]/60">{dm.designation || 'Unknown Designation'}</div>
                    {(dm.businessEmail || dm.linkedinUrl) && (
                      <div className="pt-2 mt-2 border-t border-[#2D3142]/5 flex gap-4 text-xs">
                        {dm.businessEmail && <span className="text-[#F16775]">{dm.businessEmail}</span>}
                        {dm.linkedinUrl && <a href={dm.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-[#2D3142]/20 rounded-lg text-[#2D3142]/50 text-sm">
                No decision makers recorded.
              </div>
            )}
          </div>
        )}

        {activeTab === 'import_intel' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-[#2D3142]/90 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#F16775]" /> Procurement Data
            </h3>
            {buyer.procurement ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded border border-[#2D3142]/5 bg-white/[0.02]">
                    <div className="text-xs text-[#2D3142]/40 mb-1">Minimum Order Quantity (MOQ)</div>
                    <div className="text-sm text-[#2D3142]">{buyer.procurement.moq || 'Not specified'}</div>
                  </div>
                  <div className="p-4 rounded border border-[#2D3142]/5 bg-white/[0.02]">
                    <div className="text-xs text-[#2D3142]/40 mb-1">Sourcing Categories</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {buyer.procurement.bulk && <span className="px-2 py-1 bg-[#2D3142]/5 rounded text-xs">Bulk</span>}
                      {buyer.procurement.organic && <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Organic</span>}
                      {buyer.procurement.conventional && <span className="px-2 py-1 bg-[#2D3142]/5 rounded text-xs">Conventional</span>}
                      {buyer.procurement.privateLabel && <span className="px-2 py-1 bg-[#2D3142]/5 rounded text-xs">Private Label</span>}
                    </div>
                  </div>
                </div>
                
                {buyer.procurement.importOrigins && buyer.procurement.importOrigins.length > 0 && (
                  <div className="p-4 rounded border border-[#2D3142]/5 bg-white/[0.02]">
                    <div className="text-xs text-[#2D3142]/40 mb-2">Import Origins</div>
                    <div className="flex flex-wrap gap-2">
                      {buyer.procurement.importOrigins.map((origin: string) => (
                        <span key={origin} className="px-2 py-1 border border-[#2D3142]/10 bg-white rounded text-xs shadow-sm">
                          {origin}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-[#2D3142]/20 rounded-lg text-[#2D3142]/50 text-sm">
                No procurement intelligence recorded.
              </div>
            )}
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-[#2D3142]/90 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-[#F16775]" /> Certifications & Approvals
            </h3>
            {buyer.certifications && buyer.certifications.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {buyer.certifications.map((cert: any) => (
                  <div key={cert.id} className="p-4 rounded border border-[#2D3142]/10 bg-white shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-[#F4F1EA] flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-[#2D3142]/40" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#2D3142]">{cert.name}</div>
                      <div className="text-sm text-[#2D3142]/60">Issued by: {cert.issuingBody}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-[#2D3142]/20 rounded-lg text-[#2D3142]/50 text-sm">
                No certifications recorded.
              </div>
            )}
          </div>
        )}

        {activeTab === 'digital' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-[#2D3142]/90 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#F16775]" /> Digital Presence
            </h3>
            {((buyer.websites && buyer.websites.length > 0) || (buyer.socialAccounts && buyer.socialAccounts.length > 0)) ? (
              <div className="grid grid-cols-1 gap-4">
                {buyer.websites?.map((web: any) => (
                  <a key={web.id} href={web.url} target="_blank" rel="noreferrer" className="p-4 rounded border border-[#2D3142]/10 bg-white shadow-sm flex flex-col gap-1 hover:border-[#F16775]/50 transition-colors">
                    <div className="font-semibold text-[#F16775]">{web.url}</div>
                    {web.title && <div className="text-sm text-[#2D3142]/80">{web.title}</div>}
                  </a>
                ))}
                {buyer.socialAccounts?.map((social: any) => (
                  <a key={social.id} href={social.url} target="_blank" rel="noreferrer" className="p-4 rounded border border-[#2D3142]/10 bg-white shadow-sm flex flex-col gap-1 hover:border-[#F16775]/50 transition-colors">
                    <div className="font-semibold text-[#F16775] flex items-center gap-2">
                      <span>{social.platform}</span>
                    </div>
                    <div className="text-sm text-[#2D3142]/80">{social.url}</div>
                    {social.handle && <div className="text-sm text-[#2D3142]/60">{social.handle}</div>}
                  </a>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-[#2D3142]/20 rounded-lg text-[#2D3142]/50 text-sm">
                No digital presence recorded.
              </div>
            )}
          </div>
        )}

        {/* Empty States for unbuilt tabs */}
        {['evidence'].includes(activeTab) && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-full bg-[#F4F1EA] flex items-center justify-center mb-4">
              <ShieldAlert className="w-8 h-8 text-[#2D3142]/20" />
            </div>
            <h3 className="text-lg font-semibold text-[#2D3142] mb-2">No Data Available</h3>
            <p className="text-sm text-[#2D3142]/50 max-w-sm">
              We have not yet collected enough evidence for this section. Amroot OS requires strict provenance for all data points before they are displayed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
