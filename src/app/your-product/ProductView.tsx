'use client';

import React, { useState } from 'react';
import { Leaf, Droplet, Thermometer, ShieldAlert, BookOpen, Search, FlaskConical, Beaker, CheckCircle2, Factory, Settings, Package, Clock } from 'lucide-react';
import { premiumTurmericData, organicTurmericData, premiumGingerData, organicGingerData } from '@/db/intelligence/rd-data';

export default function ProductView() {
  const [activeProduct, setActiveProduct] = useState<'premium_turmeric' | 'organic_turmeric' | 'premium_ginger' | 'organic_ginger'>('premium_turmeric');

  const getProductData = () => {
    switch (activeProduct) {
      case 'premium_turmeric': return premiumTurmericData;
      case 'organic_turmeric': return organicTurmericData;
      case 'premium_ginger': return premiumGingerData;
      case 'organic_ginger': return organicGingerData;
    }
  };

  const data = getProductData();

  return (
    <div className="h-full bg-white overflow-y-auto p-6 md:p-8">
      {/* Product Selection Toggle */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-[#2D3142]/10 pb-6">
        <button
          onClick={() => setActiveProduct('premium_turmeric')}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
            activeProduct === 'premium_turmeric' 
              ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30' 
              : 'bg-[#2D3142]/5 text-[#2D3142]/60 hover:bg-[#2D3142]/10 border border-transparent'
          }`}
        >
          <Leaf className="w-5 h-5" />
          Premium Lakadong Turmeric
        </button>
        <button
          onClick={() => setActiveProduct('organic_turmeric')}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
            activeProduct === 'organic_turmeric' 
              ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30' 
              : 'bg-[#2D3142]/5 text-[#2D3142]/60 hover:bg-[#2D3142]/10 border border-transparent'
          }`}
        >
          <Leaf className="w-5 h-5" />
          Organic Turmeric
        </button>
        <button
          onClick={() => setActiveProduct('premium_ginger')}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
            activeProduct === 'premium_ginger' 
              ? 'bg-amber-700/10 text-amber-800 border border-amber-700/30' 
              : 'bg-[#2D3142]/5 text-[#2D3142]/60 hover:bg-[#2D3142]/10 border border-transparent'
          }`}
        >
          <Leaf className="w-5 h-5" />
          Premium Jaintia Hills Ginger
        </button>
        <button
          onClick={() => setActiveProduct('organic_ginger')}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
            activeProduct === 'organic_ginger' 
              ? 'bg-amber-700/10 text-amber-800 border border-amber-700/30' 
              : 'bg-[#2D3142]/5 text-[#2D3142]/60 hover:bg-[#2D3142]/10 border border-transparent'
          }`}
        >
          <Leaf className="w-5 h-5" />
          Organic Ginger
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-[#2D3142]">{data.name}</h1>
        <p className="text-[#2D3142]/60 mt-1 flex items-center gap-2">
          <span className="italic">{data.botanicalIdentity.species}</span> • {data.botanicalIdentity.family} • {data.botanicalIdentity.origin}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Comprehensive Composition */}
        <div className="bg-white border border-fuchsia-500/20 rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-fuchsia-500/10 flex items-center justify-center shrink-0">
              <FlaskConical className="w-4 h-4 text-fuchsia-600" />
            </div>
            <h2 className="font-bold text-[#2D3142]">Comprehensive Composition</h2>
          </div>
          
          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1" style={{ maxHeight: '350px' }}>
            <div>
              <h3 className="text-xs font-semibold text-[#2D3142]/50 uppercase tracking-wider mb-2">Key Bioactives</h3>
              <div className="space-y-3">
                {data.keyBioactives.map((bio, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#2D3142]/80 font-medium">{bio.name}</span>
                      <span className="text-fuchsia-600 font-semibold">{bio.percentage}</span>
                    </div>
                    <div className="w-full bg-[#2D3142]/5 rounded-full h-1">
                      <div className="bg-fuchsia-500 h-1 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#2D3142]/5">
              <h3 className="text-xs font-semibold text-[#2D3142]/50 uppercase tracking-wider mb-2">Macronutrients (per 100g)</h3>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {data.nutritionalProfile.macronutrients.map((macro, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-[#2D3142]/70">{macro.name}</span>
                    <span className="font-medium text-[#2D3142]">{macro.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#2D3142]/5">
              <h3 className="text-xs font-semibold text-[#2D3142]/50 uppercase tracking-wider mb-2">Minerals</h3>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {data.nutritionalProfile.minerals.map((mineral, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-[#2D3142]/70">{mineral.name}</span>
                    <span className="font-medium text-[#2D3142]">{mineral.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#2D3142]/5">
              <h3 className="text-xs font-semibold text-[#2D3142]/50 uppercase tracking-wider mb-2">Vitamins</h3>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {data.nutritionalProfile.vitamins.map((vitamin, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-[#2D3142]/70">{vitamin.name}</span>
                    <span className="font-medium text-[#2D3142]">{vitamin.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Physical Properties */}
        <div className="bg-white border border-cyan-500/20 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Droplet className="w-4 h-4 text-cyan-600" />
            </div>
            <h2 className="font-bold text-[#2D3142]">Physical & Chemical</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex flex-col">
              <span className="text-[#2D3142]/50 text-xs uppercase tracking-wider mb-0.5">Appearance</span>
              <span className="text-[#2D3142]/90 font-medium">{data.properties.appearance}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#2D3142]/50 text-xs uppercase tracking-wider mb-0.5">Solubility</span>
              <span className="text-[#2D3142]/90 font-medium">{data.properties.solubility}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#2D3142]/50 text-xs uppercase tracking-wider mb-0.5">Moisture</span>
              <span className="text-[#2D3142]/90 font-medium">{data.properties.moistureContent}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#2D3142]/50 text-xs uppercase tracking-wider mb-0.5">Particle Size</span>
              <span className="text-[#2D3142]/90 font-medium">{data.properties.particleSize}</span>
            </div>
          </div>
        </div>

        {/* Sensory */}
        <div className="bg-white border border-amber-500/20 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
            </div>
            <h2 className="font-bold text-[#2D3142]">Sensory Profile</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex flex-col">
              <span className="text-[#2D3142]/50 text-xs uppercase tracking-wider mb-0.5">Color</span>
              <span className="text-[#2D3142]/90 font-medium">{data.sensory.color}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#2D3142]/50 text-xs uppercase tracking-wider mb-0.5">Aroma</span>
              <span className="text-[#2D3142]/90 font-medium">{data.sensory.aroma}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#2D3142]/50 text-xs uppercase tracking-wider mb-0.5">Taste</span>
              <span className="text-[#2D3142]/90 font-medium">{data.sensory.taste}</span>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Safety & Compliance */}
        <div className="bg-white border border-red-500/20 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-red-600" />
            </div>
            <h2 className="font-bold text-[#2D3142]">Safety & Compliance Thresholds</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold text-[#2D3142]/60 uppercase tracking-wider mb-3">Heavy Metals</h3>
              <ul className="space-y-2 text-sm">
                {Object.entries(data.safety.heavyMetals).map(([key, value]) => (
                  <li key={key} className="flex justify-between items-center border-b border-[#2D3142]/5 pb-1">
                    <span className="capitalize text-[#2D3142]/80">{key}</span>
                    <span className="font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded text-xs">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#2D3142]/60 uppercase tracking-wider mb-3">Microbial Limits</h3>
              <ul className="space-y-2 text-sm">
                {Object.entries(data.safety.microbial).map(([key, value]) => (
                  <li key={key} className="flex justify-between items-center border-b border-[#2D3142]/5 pb-1">
                    <span className="capitalize text-[#2D3142]/80">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded text-xs">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-red-500/10">
            <h3 className="text-xs font-semibold text-[#2D3142]/60 uppercase tracking-wider mb-3">Common Adulterants to Test For</h3>
            <div className="flex flex-wrap gap-2">
              {data.adulterants.map((item, i) => (
                <span key={i} className="bg-red-50 text-red-600 text-xs px-2.5 py-1 rounded-md border border-red-100">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Formulation Best Practices */}
        <div className="bg-gradient-to-br from-[#2D3142] to-[#1a1c26] rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Beaker className="w-4 h-4 text-indigo-300" />
            </div>
            <h2 className="font-bold">Formulation Playbook</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">Synergistic Pairings</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {data.formulation.synergies}
              </p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">Stability & Storage</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {data.formulation.stability}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Post-Harvest & Packaging (Full Width) */}
      <div className="mt-6 bg-white border border-[#2D3142]/10 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6 border-b border-[#2D3142]/10 pb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Factory className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="font-bold text-[#2D3142]">Post-Harvest & Packaging Standards</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Curing & Drying */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-[#2D3142]/40" />
              <h3 className="text-xs font-semibold text-[#2D3142]/60 uppercase tracking-wider">Curing & Drying</h3>
            </div>
            <p className="text-sm text-[#2D3142]/80 leading-relaxed bg-[#F4F1EA]/30 p-4 rounded-xl flex-1">
              {data.processingAndPackaging.curingAndDrying}
            </p>
          </div>

          {/* Milling */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-[#2D3142]/40" />
              <h3 className="text-xs font-semibold text-[#2D3142]/60 uppercase tracking-wider">Milling Process</h3>
            </div>
            <p className="text-sm text-[#2D3142]/80 leading-relaxed bg-[#F4F1EA]/30 p-4 rounded-xl flex-1">
              {data.processingAndPackaging.milling}
            </p>
          </div>

          {/* Packaging */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-[#2D3142]/40" />
              <h3 className="text-xs font-semibold text-[#2D3142]/60 uppercase tracking-wider">Packaging Format</h3>
            </div>
            <p className="text-sm text-[#2D3142]/80 leading-relaxed bg-[#F4F1EA]/30 p-4 rounded-xl flex-1">
              {data.processingAndPackaging.packaging}
            </p>
          </div>

          {/* Shelf Life */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#2D3142]/40" />
              <h3 className="text-xs font-semibold text-[#2D3142]/60 uppercase tracking-wider">Shelf Life & Storage</h3>
            </div>
            <p className="text-sm text-[#2D3142]/80 leading-relaxed bg-[#F4F1EA]/30 p-4 rounded-xl flex-1">
              {data.processingAndPackaging.shelfLife}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
