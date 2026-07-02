'use client';

import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, Activity, Info, Download, Cpu } from 'lucide-react';
import Link from 'next/link';
import { agritechTrialsData } from '@/db/intelligence/rd-data';

export default function GreenCollarResources() {
  const [activeTab, setActiveTab] = useState<'testing' | 'resources' | 'trials'>('testing');
  const [isGreenCollarOpen, setIsGreenCollarOpen] = useState(true);

  const resources = [
    {
      title: "The Green Collar Tech Series 1",
      description: "Applications of Artificial Intelligence and Machine Learning in Agriculture.",
      author: "Padmini Sampath",
      fileUrl: "/resources/Green_Collar_Tech_Series_1.pdf",
    },
    {
      title: "The Green Collar Tech Series 2",
      description: "Key aspects of agri commodity quality testing.",
      author: "Padmini Sampath",
      fileUrl: "/resources/Green_Collar_Tech_Series_2.pdf",
    },
    {
      title: "The NIR Spectroscopy Series 1",
      description: "Basics of Near Infra-Red Spectroscopy in agriculture and its advantages.",
      author: "Padmini Sampath",
      fileUrl: "/resources/NIR_Spectroscopy_Series_1.pdf",
    }
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      <button 
        onClick={() => setIsGreenCollarOpen(!isGreenCollarOpen)}
        className={`w-full flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 transition-colors text-left ${isGreenCollarOpen ? 'border-b border-white/10' : ''}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0">
             <span className="font-bold text-cyan-400 text-sm">GC</span>
          </div>
          <div>
            <h2 className="text-xl font-medium text-white/90">Green Collar Global</h2>
            <p className="text-sm text-white/40">Hardware, AI solutions, and instant testing tech for agriculture.</p>
          </div>
        </div>
        {isGreenCollarOpen ? <ChevronUp className="text-white/40 shrink-0" /> : <ChevronDown className="text-white/40 shrink-0" />}
      </button>

      {isGreenCollarOpen && (
        <div className="p-6 border-t border-white/10">
          <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
            <button 
              onClick={() => setActiveTab('testing')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'testing' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              <Activity size={16} /> Quality Testing Parameters
            </button>
            <button 
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'resources' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              <FileText size={16} /> Technical Resources
            </button>
            <button 
              onClick={() => setActiveTab('trials')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'trials' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              <Cpu size={16} /> Agritech Pilot Trials
            </button>
          </div>

          {activeTab === 'testing' && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <h2 className="text-xl font-medium text-white/90 mb-6 flex items-center gap-2">
                  Demo Report: Turmeric Quality Analysis (TARAM)
                </h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  
                  {/* Report Mockup */}
                  <div className="bg-black/50 border border-white/10 rounded-xl p-6 font-mono text-xs text-white/70">
                    <div className="border-b border-white/10 pb-4 mb-4 text-center">
                      <h3 className="text-white font-bold text-sm mb-1">GREEN COLLAR AGRITECH SOLUTIONS</h3>
                      <p className="text-white/40">Test Report</p>
                    </div>
                    
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-y border-white/10 text-white/50">
                          <th className="py-2 px-2 border-r border-white/10">S.No</th>
                          <th className="py-2 px-2 border-r border-white/10">Test Parameter</th>
                          <th className="py-2 px-2 border-r border-white/10">Estimation Standard</th>
                          <th className="py-2 px-2 text-right">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-2 border-r border-white/5 text-center">1</td>
                          <td className="py-3 px-2 border-r border-white/5 text-amber-400 font-bold">Turmeric Curcumin</td>
                          <td className="py-3 px-2 border-r border-white/5">ASTA 18.0</td>
                          <td className="py-3 px-2 text-right text-white">3.23%</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-2 border-r border-white/5 text-center">2</td>
                          <td className="py-3 px-2 border-r border-white/5 text-blue-400">Turmeric Moisture</td>
                          <td className="py-3 px-2 border-r border-white/5">FSSAI Manual</td>
                          <td className="py-3 px-2 text-right text-white">5.97%</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-2 border-r border-white/5 text-center">3</td>
                          <td className="py-3 px-2 border-r border-white/5 text-rose-400">Turmeric Oleoresin</td>
                          <td className="py-3 px-2 border-r border-white/5">Acetone Reduction</td>
                          <td className="py-3 px-2 text-right text-white">10.89%</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-2 border-r border-white/5 text-center">4</td>
                          <td className="py-3 px-2 border-r border-white/5 text-emerald-400">Turmeric Starch</td>
                          <td className="py-3 px-2 border-r border-white/5">FSSAI Manual</td>
                          <td className="py-3 px-2 text-right text-white">49.12%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Explanations */}
                  <div className="space-y-4">
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                      <h4 className="text-amber-400 font-medium flex items-center gap-2 mb-2"><Info size={16} /> Curcumin</h4>
                      <p className="text-sm text-white/60 leading-relaxed">The primary bioactive compound in turmeric responsible for its color and health benefits. Standard commercial turmeric is 2-3%. Our premium Lakadong turmeric must test between 7% and 12%.</p>
                    </div>

                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                      <h4 className="text-blue-400 font-medium flex items-center gap-2 mb-2"><Info size={16} /> Moisture</h4>
                      <p className="text-sm text-white/60 leading-relaxed">The water content in dried rhizomes. Values above 10-12% risk fungal growth and aflatoxins. Values around 5-6% (like the report) are excellent for long-term storage and export.</p>
                    </div>

                    <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-4">
                      <h4 className="text-rose-400 font-medium flex items-center gap-2 mb-2"><Info size={16} /> Oleoresin</h4>
                      <p className="text-sm text-white/60 leading-relaxed">The natural essential oils and resins containing flavor, aroma, and curcuminoids. Crucial for extraction companies making food coloring or pharmaceutical concentrates.</p>
                    </div>

                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                      <h4 className="text-emerald-400 font-medium flex items-center gap-2 mb-2"><Info size={16} /> Starch</h4>
                      <p className="text-sm text-white/60 leading-relaxed">Measured primarily as an anti-adulteration metric. Natural turmeric contains ~40-50% starch. If tests show massive spikes, it indicates adulteration with cheap fillers (cassava, rice flour).</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="mb-4">
                <h2 className="text-xl font-medium text-white/90">Green Collar Global Resources</h2>
                <p className="text-white/40 text-sm mt-1">Official deep-tech educational material covering AI, ML, and Spectroscopy in agriculture.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((res, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all group flex flex-col h-full">
                    <div className="flex-1">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                        <FileText className="w-5 h-5 text-indigo-400" />
                      </div>
                      <h3 className="text-lg font-medium text-white/90 mb-2">{res.title}</h3>
                      <p className="text-sm text-white/60 mb-4 line-clamp-3">{res.description}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                      <span className="text-xs text-white/40">By {res.author}</span>
                      <Link href={res.fileUrl} target="_blank" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
                        <Download size={14} /> Download PDF
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'trials' && (
            <div className="space-y-6">
              <div className="mb-4">
                <h2 className="text-xl font-medium text-white/90">Agritech Pilot Trials</h2>
                <p className="text-white/40 text-sm mt-1">Live tracking of hardware & software deployments across our supply chain.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agritechTrialsData.map(trial => (
                  <div key={trial.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors flex flex-col">
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <h3 className="text-white font-medium text-base">
                        {trial.url ? <a href={trial.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 hover:underline transition-colors">{trial.title}</a> : trial.title}
                      </h3>
                      <span className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded text-[10px] font-mono border border-cyan-500/20 shrink-0">
                        {trial.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      <p className="text-white/40 text-xs">Partner: <span className="text-white/70">{trial.partnerName}</span></p>
                      <p className="text-white/40 text-xs">Hardware: <span className="text-white/70">{trial.hardwareUsed}</span></p>
                    </div>
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5 mt-auto">
                      <p className="text-white/70 text-sm italic">"{trial.resultsSummary}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
