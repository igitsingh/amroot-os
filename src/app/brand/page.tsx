'use client';
import React, { useState } from 'react';
import { Outfit } from 'next/font/google';
import { Leaf, ArrowRight, Sparkles, MapPin, Award, CheckCircle2, AlertTriangle, Scale, ShieldAlert, FileText, CheckCircle, Info } from 'lucide-react';
import { trademarkConflicts } from '../../data/trademarks';
import { brandNameIdeas } from '../../data/brandNames';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

const similarLogos = [
  "fd53e863f191e403485588d49339d1ec.png",
  "22df18_4b94527e63b848f9b0320297dd25e4b3~mv2.png",
  "AMRUT_logo.png",
  "Amrut Logo PNG.png",
  "SetLogo.png",
  "amrood_1_2.png",
  "amrut-logo_red.jpg",
  "amrut-organics-dhrol-earthworm-distributors-w5b5gf8iyn-250.avif",
  "amrutayurvedalogo.png",
  "aof_logo.png",
  "images.png",
  "logo2.jpg",
  "logo4-e1775210501221.png",
  "original-299e15936ee0efb23ab396388e66d108 (1).png"
];

const INITIAL_BRAND_COLORS = {
  primary: '#034F46', // Deep Pine Green
  secondary: '#F4F1EA', // Soft Cream
  accent: '#F16775', // Coral Pink
  accentLight: 'rgba(241, 103, 117, 0.1)',
  primaryLight: 'rgba(3, 79, 70, 0.05)',
};

const TURMERIC_SKUS = [
  {
    name: 'Organic Turmeric',
    type: 'Standard',
    curcumin: '4.5% - 5.5%',
    origin: 'Meghalaya, India',
    description: 'Pure, organically grown turmeric with a bright golden hue and balanced flavor profile. Perfect for daily consumption and culinary use.',
    icon: <Leaf className="w-5 h-5" />,
    gradient: 'from-amber-200/50 to-orange-100/20'
  },
  {
    name: 'Premium Lakadong Turmeric',
    type: 'Premium',
    curcumin: '8.5% - 10.5%',
    origin: 'Lakadong, Jaintia Hills',
    description: 'One of the world’s finest turmeric varieties, prized for its exceptionally high curcumin content, intense color, and potent aroma.',
    icon: <Sparkles className="w-5 h-5 text-amber-500" />,
    gradient: 'from-amber-400/40 to-orange-300/10'
  }
];

const GINGER_SKUS = [
  {
    name: 'Organic Ginger',
    type: 'Standard',
    flavor: 'Earthy & Mild',
    origin: 'Meghalaya, India',
    description: 'Carefully cultivated organic ginger root offering a clean, zesty flavor profile. Hand-harvested and sun-dried for maximum retention of essential oils.',
    icon: <Leaf className="w-5 h-5" />,
    gradient: 'from-yellow-100/50 to-orange-50/20'
  },
  {
    name: 'Premium Jaintia Hills Ginger',
    type: 'Premium',
    flavor: 'Intense & Spicy',
    origin: 'Jaintia Hills, Meghalaya',
    description: 'A robust, highly pungent ginger variety sourced directly from the pristine hills of Meghalaya. Known for its strong aromatic compounds.',
    icon: <Award className="w-5 h-5 text-yellow-600" />,
    gradient: 'from-yellow-300/30 to-amber-200/10'
  }
];

export default function AmrootBrandPage() {
  const [hoveredSku, setHoveredSku] = useState<string | null>(null);

  // Finalisation states
  const [finalisedLogo, setFinalisedLogo] = useState<number | null>(null);
  const [finalisedColor, setFinalisedColor] = useState(false);
  const [finalisedTypography, setFinalisedTypography] = useState(false);
  const [finalisedVoice, setFinalisedVoice] = useState(false);
  const [finalisedAudit, setFinalisedAudit] = useState(false);

  // Editable content states
  const [brandColors, setBrandColors] = useState(INITIAL_BRAND_COLORS);
  
  const [typography, setTypography] = useState({
    name: 'Orbitron',
    desc: 'The exclusive typeface for Amroot Organics. Used across all headers, interfaces, and print materials.',
    primary: 'Orbitron Black (Primary Font)',
    secondary: 'Orbitron Normal (Secondary Font)'
  });
  const [isEditingTypography, setIsEditingTypography] = useState(false);

  const [voiceItems, setVoiceItems] = useState([
    'Authoritative & Scientific',
    'Premium & Refined',
    'Transparent & Traceable'
  ]);
  const [isEditingVoice, setIsEditingVoice] = useState(false);
  const [selectedBrandName, setSelectedBrandName] = useState('Amroot Organics');
  const [riskFilter, setRiskFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');

  const filteredBrandNames = brandNameIdeas.filter(idea => riskFilter === 'All' || idea.level === riskFilter);

  return (
    <div className={`min-h-screen bg-[#F9F8F6] flex flex-col ${outfit.className}`}>
      {/* Hero Section */}
      <div 
        className="relative pt-24 pb-16 px-12 overflow-hidden flex-shrink-0"
        style={{ backgroundColor: brandColors.primary }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium tracking-wide mb-6">
              <Sparkles className="w-4 h-4 text-[#F16775]" />
              Premium Organic Spices
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
              Rooted in Nature.<br />
              <span style={{ color: brandColors.accent }}>Refined for the World.</span>
            </h1>
            <p className="text-[#F4F1EA]/80 text-lg md:text-xl max-w-xl leading-relaxed">
              {selectedBrandName} brings the world's most potent, pure, and traceable spices directly from the pristine hills of Meghalaya.
            </p>
          </div>
          
          <div className="hidden md:flex w-72 h-72 rounded-full border border-white/10 items-center justify-center relative shadow-2xl backdrop-blur-sm bg-white/5">
            <div className="absolute inset-2 rounded-full border border-dashed border-white/20 animate-[spin_60s_linear_infinite]" />
            <div className="text-center">
              <div className="text-6xl font-black text-white tracking-tighter lowercase">{selectedBrandName.split(' ')[0]}</div>
              <div className="text-sm font-bold uppercase tracking-[0.3em]" style={{ color: brandColors.accent }}>{selectedBrandName.split(' ').slice(1).join(' ') || 'Organics'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand and Proprietary Name Selection */}
      <div id="name-selection" className="bg-white pt-16 pb-12 px-8 border-b border-[#2D3142]/10 shadow-sm relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-black text-[#2D3142] mb-4 font-[family-name:var(--font-orbitron)]">Brand & Proprietary Name Selection</h2>
              <p className="text-[#2D3142]/70 max-w-3xl leading-relaxed text-lg">
                Since we have canceled the domain <strong>amrootorganics.com</strong> and the name <strong>"Amroot"</strong> due to severe trademark risks, here is a curated list of 280+ highly distinct, non-trademarked names suitable for a Class 30 Turmeric/Ginger export brand.
              </p>
            </div>
            <div className="min-w-[300px] w-full md:w-auto bg-[#F4F1EA] p-4 rounded-xl border border-[#2D3142]/10">
              <label className="block text-xs font-bold text-[#F16775] uppercase tracking-wider mb-2">Select Active Brand Name</label>
              <select
                value={selectedBrandName}
                onChange={(e) => setSelectedBrandName(e.target.value)}
                className="w-full bg-white border border-[#2D3142]/20 text-[#034F46] font-bold px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#034F46] shadow-sm"
              >
                <option value="Amroot Organics">Amroot Organics (Deprecated)</option>
                {brandNameIdeas.map((idea, idx) => (
                  <option key={idx} value={idea.name}>
                    {idea.name} — {idea.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-6 bg-[#F4F1EA] p-2 rounded-xl inline-flex overflow-x-auto max-w-full">
             <button onClick={() => setRiskFilter('All')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${riskFilter === 'All' ? 'bg-white shadow-sm text-[#2D3142]' : 'text-[#2D3142]/60 hover:text-[#2D3142]'}`}>All Names ({brandNameIdeas.length})</button>
             <button onClick={() => setRiskFilter('Low')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${riskFilter === 'Low' ? 'bg-emerald-100 text-emerald-700 shadow-sm border border-emerald-200' : 'text-[#2D3142]/60 hover:text-[#2D3142]'}`}>Low Risk</button>
             <button onClick={() => setRiskFilter('Medium')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${riskFilter === 'Medium' ? 'bg-amber-100 text-amber-700 shadow-sm border border-amber-200' : 'text-[#2D3142]/60 hover:text-[#2D3142]'}`}>Medium Risk</button>
             <button onClick={() => setRiskFilter('High')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${riskFilter === 'High' ? 'bg-red-100 text-red-700 shadow-sm border border-red-200' : 'text-[#2D3142]/60 hover:text-[#2D3142]'}`}>High Risk</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            {filteredBrandNames.map((idea, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedBrandName(idea.name)}
                className={`border rounded-xl p-5 shadow-sm transition-all cursor-pointer flex flex-col justify-between ${selectedBrandName === idea.name ? 'bg-[#034F46]/5 border-[#034F46] shadow-md' : 'bg-white border-[#2D3142]/10 hover:shadow-md hover:border-[#034F46]/50'}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-[#034F46] text-lg leading-tight pr-2">{idea.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shrink-0 ${
                      idea.level === 'High' ? 'bg-red-100 text-red-700 border border-red-200' : 
                      idea.level === 'Medium' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 
                      'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}>
                      {idea.level} Risk
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#F16775] bg-[#F16775]/10 px-2 py-1 rounded-md uppercase tracking-wider inline-block mb-3">{idea.category}</span>
                </div>
                
                <div className="mt-2 pt-3 border-t border-[#2D3142]/10">
                  <p className="text-xs text-[#2D3142]/70 leading-relaxed font-medium">
                    <span className="font-bold text-[#2D3142]">IP Audit: </span> 
                    {idea.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1 overflow-auto bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-16">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold" style={{ color: brandColors.primary }}>Our Signature Lines</h2>
            <div className="w-24 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: brandColors.accent }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Turmeric Line */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: brandColors.primary }}>
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2D3142]">The Turmeric Line</h3>
                  <p className="text-[#2D3142]/60 font-medium text-sm mt-1">High Curcumin • Hand-Harvested</p>
                </div>
              </div>

              <div className="grid gap-6">
                {TURMERIC_SKUS.map((sku) => (
                  <div 
                    key={sku.name}
                    className={`relative overflow-hidden rounded-2xl bg-white border border-[#2D3142]/10 p-6 transition-all duration-300 cursor-pointer group ${hoveredSku === sku.name ? 'shadow-xl scale-[1.02] border-[#F16775]/50' : 'shadow-sm hover:shadow-md'}`}
                    onMouseEnter={() => setHoveredSku(sku.name)}
                    onMouseLeave={() => setHoveredSku(null)}
                  >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${sku.gradient} pointer-events-none`} />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          {sku.icon}
                          <span className="text-xs font-bold uppercase tracking-wider text-[#2D3142]/50 bg-[#2D3142]/5 px-2 py-1 rounded-md">{sku.type}</span>
                        </div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F4F1EA] group-hover:bg-[#F16775] text-[#2D3142] group-hover:text-white transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-bold text-[#2D3142] mb-2 group-hover:text-[#F16775] transition-colors">{sku.name}</h4>
                      <p className="text-sm text-[#2D3142]/70 leading-relaxed mb-6">{sku.description}</p>
                      
                      <div className="flex flex-col gap-2 mt-auto">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="font-semibold text-[#2D3142]">Curcumin:</span>
                          <span className="text-[#2D3142]/80">{sku.curcumin}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-[#F16775]" />
                          <span className="font-semibold text-[#2D3142]">Origin:</span>
                          <span className="text-[#2D3142]/80">{sku.origin}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ginger Line */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: brandColors.primary }}>
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2D3142]">The Ginger Line</h3>
                  <p className="text-[#2D3142]/60 font-medium text-sm mt-1">Potent • Aromatic • Pure</p>
                </div>
              </div>

              <div className="grid gap-6">
                {GINGER_SKUS.map((sku) => (
                  <div 
                    key={sku.name}
                    className={`relative overflow-hidden rounded-2xl bg-white border border-[#2D3142]/10 p-6 transition-all duration-300 cursor-pointer group ${hoveredSku === sku.name ? 'shadow-xl scale-[1.02] border-[#F16775]/50' : 'shadow-sm hover:shadow-md'}`}
                    onMouseEnter={() => setHoveredSku(sku.name)}
                    onMouseLeave={() => setHoveredSku(null)}
                  >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${sku.gradient} pointer-events-none`} />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          {sku.icon}
                          <span className="text-xs font-bold uppercase tracking-wider text-[#2D3142]/50 bg-[#2D3142]/5 px-2 py-1 rounded-md">{sku.type}</span>
                        </div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F4F1EA] group-hover:bg-[#F16775] text-[#2D3142] group-hover:text-white transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-bold text-[#2D3142] mb-2 group-hover:text-[#F16775] transition-colors">{sku.name}</h4>
                      <p className="text-sm text-[#2D3142]/70 leading-relaxed mb-6">{sku.description}</p>
                      
                      <div className="flex flex-col gap-2 mt-auto">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="font-semibold text-[#2D3142]">Profile:</span>
                          <span className="text-[#2D3142]/80">{sku.flavor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-[#F16775]" />
                          <span className="font-semibold text-[#2D3142]">Origin:</span>
                          <span className="text-[#2D3142]/80">{sku.origin}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Brand Bible Section */}
      <div className="flex-1 overflow-auto bg-white border-t border-[#2D3142]/10">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-20">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[#2D3142]">Brand Bible & Guidelines</h2>
            <div className="w-24 h-1 mt-4 rounded-full" style={{ backgroundColor: brandColors.accent }} />
            <p className="mt-6 text-lg text-[#2D3142]/70 max-w-2xl leading-relaxed">
              The Amroot Organics brand is defined by its deep connection to nature and a commitment to premium quality. 
              Our visual identity reflects this balance of organic roots and modern refinement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Logo Explorations */}
            <div className="lg:col-span-3">
              <h3 className="text-xl font-bold text-[#2D3142] mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#2D3142]/5 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#F16775]" />
                </div>
                Logo Explorations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div 
                  onClick={() => setFinalisedLogo(1)}
                  className={`rounded-2xl border ${finalisedLogo === 1 ? 'border-[#F16775] ring-2 ring-[#F16775]/50' : 'border-[#2D3142]/10'} p-10 flex flex-col items-center justify-center bg-black min-h-[300px] relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all`}
                >
                  <div className="absolute top-4 left-4 bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-bold tracking-wider">OPTION 1 (CURRENT)</div>
                  {finalisedLogo === 1 && (
                    <div className="absolute top-4 right-4 bg-[#F16775] text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5" /> FINALISED
                    </div>
                  )}
                  <div className="flex flex-col items-center mt-6">
                    <img src="/amroot-organics-logo.svg" alt="Amroot Organics Logo" className="w-[300px] h-auto pointer-events-none" />
                  </div>
                </div>

                <div 
                  onClick={() => setFinalisedLogo(2)}
                  className={`rounded-2xl border ${finalisedLogo === 2 ? 'border-[#F16775] ring-2 ring-[#F16775]/50' : 'border-[#2D3142]/10'} p-10 flex flex-col items-center justify-center bg-black min-h-[300px] relative overflow-hidden group cursor-pointer hover:shadow-xl hover:border-[#F16775]/50 transition-all`}
                >
                  <div className="absolute top-4 left-4 bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-bold tracking-wider">OPTION 2 (NEW CONCEPT)</div>
                  {finalisedLogo === 2 && (
                    <div className="absolute top-4 right-4 bg-[#F16775] text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5" /> FINALISED
                    </div>
                  )}
                  <div className="flex flex-col items-center mt-6">
                    <div className={`text-white text-7xl md:text-[5.5rem] font-bold tracking-tight lowercase leading-none ${outfit.className}`}>
                      amroot
                    </div>
                    <div className={`text-[#F16775] text-xl md:text-2xl font-normal tracking-[0.4em] uppercase mt-2 ${outfit.className}`}>
                      Organics
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setFinalisedLogo(3)}
                  className={`rounded-2xl border ${finalisedLogo === 3 ? 'border-[#F16775] ring-2 ring-[#F16775]/50' : 'border-[#2D3142]/10'} p-10 flex flex-col items-center justify-center bg-black min-h-[300px] relative overflow-hidden group cursor-pointer hover:shadow-xl hover:border-[#F16775]/50 transition-all`}
                >
                  <div className="absolute top-4 left-4 bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-bold tracking-wider">OPTION 3 (ALTERNATE)</div>
                  {finalisedLogo === 3 && (
                    <div className="absolute top-4 right-4 bg-[#F16775] text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5" /> FINALISED
                    </div>
                  )}
                  <div className="flex flex-col items-center mt-6">
                    <img src="/amroot-organics-logo_02.svg" alt="Amroot Organics Alternate Logo" className="w-[300px] h-auto pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-[#2D3142] mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#2D3142]/5 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#F16775]" />
                  </div>
                  Core Color Palette
                </div>
                <button 
                  onClick={() => setFinalisedColor(!finalisedColor)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${finalisedColor ? 'bg-[#034F46] text-white' : 'bg-[#034F46]/5 text-[#034F46] hover:bg-[#034F46]/10'}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {finalisedColor ? 'Finalised' : 'Mark Final'}
                </button>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                <div className="rounded-2xl overflow-hidden border border-[#2D3142]/10 shadow-sm">
                  <div className="h-32 w-full flex items-center justify-center text-white/50 text-sm font-medium relative" style={{ backgroundColor: brandColors.primary }}>
                    <input type="color" value={brandColors.primary} onChange={(e) => setBrandColors({...brandColors, primary: e.target.value})} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    #034F46
                  </div>
                  <div className="p-4 bg-white">
                    <div className="font-bold text-[#2D3142]">Deep Pine Green</div>
                    <div className="text-xs text-[#2D3142]/50 mt-1">Primary Brand Color. Represents our organic roots and trust.</div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#2D3142]/10 shadow-sm">
                  <div className="h-32 w-full flex items-center justify-center text-[#2D3142]/30 text-sm font-medium relative" style={{ backgroundColor: brandColors.secondary }}>
                    <input type="color" value={brandColors.secondary} onChange={(e) => setBrandColors({...brandColors, secondary: e.target.value})} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    #F4F1EA
                  </div>
                  <div className="p-4 bg-white">
                    <div className="font-bold text-[#2D3142]">Soft Cream</div>
                    <div className="text-xs text-[#2D3142]/50 mt-1">Backgrounds & Surfaces. Earthy, clean, and breathable.</div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#2D3142]/10 shadow-sm">
                  <div className="h-32 w-full flex items-center justify-center text-white/50 text-sm font-medium relative" style={{ backgroundColor: brandColors.accent }}>
                    <input type="color" value={brandColors.accent} onChange={(e) => setBrandColors({...brandColors, accent: e.target.value})} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    #F16775
                  </div>
                  <div className="p-4 bg-white">
                    <div className="font-bold text-[#2D3142]">Coral Pink</div>
                    <div className="text-xs text-[#2D3142]/50 mt-1">Accent & Highlights. Brings vibrancy and modern energy.</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Typography & Voice */}
            <div className="flex flex-col gap-10">
              
              <div>
                <h3 className="text-xl font-bold text-[#2D3142] mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#2D3142]/5 flex items-center justify-center">
                      <span className="font-bold text-lg text-[#F16775]">Aa</span>
                    </div>
                    Typography
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsEditingTypography(!isEditingTypography)}
                      className="text-xs font-bold uppercase tracking-wider text-[#2D3142]/50 hover:text-[#2D3142]"
                    >
                      {isEditingTypography ? 'Done' : 'Edit'}
                    </button>
                    <button 
                      onClick={() => setFinalisedTypography(!finalisedTypography)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${finalisedTypography ? 'bg-[#034F46] text-white' : 'bg-[#034F46]/5 text-[#034F46] hover:bg-[#034F46]/10'}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {finalisedTypography ? 'Finalised' : 'Mark Final'}
                    </button>
                  </div>
                </h3>
                <div className="p-6 rounded-2xl bg-[#F4F1EA] border border-[#2D3142]/5">
                  {isEditingTypography ? (
                    <div className="flex flex-col gap-4">
                      <input type="text" value={typography.name} onChange={e => setTypography({...typography, name: e.target.value})} className="w-full bg-transparent border-b border-[#2D3142]/20 text-4xl font-black text-[#2D3142] mb-2 font-[family-name:var(--font-orbitron)] focus:outline-none" />
                      <textarea value={typography.desc} onChange={e => setTypography({...typography, desc: e.target.value})} className="w-full bg-transparent border border-[#2D3142]/20 rounded-md p-2 text-sm text-[#2D3142]/60 focus:outline-none" rows={2} />
                      <input type="text" value={typography.primary} onChange={e => setTypography({...typography, primary: e.target.value})} className="w-full bg-transparent border-b border-[#2D3142]/20 text-2xl font-black text-[#2D3142] focus:outline-none" />
                      <input type="text" value={typography.secondary} onChange={e => setTypography({...typography, secondary: e.target.value})} className="w-full bg-transparent border-b border-[#2D3142]/20 text-sm font-normal text-[#2D3142] focus:outline-none" />
                    </div>
                  ) : (
                    <>
                      <div className="text-4xl font-black text-[#2D3142] mb-2 font-[family-name:var(--font-orbitron)]">{typography.name}</div>
                      <div className="text-sm text-[#2D3142]/60 leading-relaxed mb-4">{typography.desc}</div>
                      <div className="flex flex-col gap-2">
                        <div className="text-2xl font-black text-[#2D3142]">{typography.primary}</div>
                        <div className="text-sm font-normal text-[#2D3142]">{typography.secondary}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#2D3142] mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#2D3142]/5 flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-[#F16775]" />
                    </div>
                    Brand Voice
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsEditingVoice(!isEditingVoice)}
                      className="text-xs font-bold uppercase tracking-wider text-[#2D3142]/50 hover:text-[#2D3142]"
                    >
                      {isEditingVoice ? 'Done' : 'Edit'}
                    </button>
                    <button 
                      onClick={() => setFinalisedVoice(!finalisedVoice)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${finalisedVoice ? 'bg-[#034F46] text-white' : 'bg-[#034F46]/5 text-[#034F46] hover:bg-[#034F46]/10'}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {finalisedVoice ? 'Finalised' : 'Mark Final'}
                    </button>
                  </div>
                </h3>
                <div className="flex flex-col gap-3">
                  {voiceItems.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white border border-[#2D3142]/10 flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      {isEditingVoice ? (
                        <input 
                          type="text" 
                          value={item}
                          onChange={e => {
                            const newItems = [...voiceItems];
                            newItems[idx] = e.target.value;
                            setVoiceItems(newItems);
                          }}
                          className="w-full bg-transparent border-b border-[#2D3142]/20 font-medium text-[#2D3142] focus:outline-none"
                        />
                      ) : (
                        <span className="font-medium text-[#2D3142]">{item}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
