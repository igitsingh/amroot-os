import React from 'react';
import { prisma } from '@database/client';
import { 
  FlaskRound, 
  Search, 
  Microscope, 
  Library,
  Network,
  ArrowRight,
  TestTube,
  Activity,
  LineChart
} from 'lucide-react';
import InstitutionalResources from './InstitutionalResources';
import MarketIntelligenceDashboard from './MarketIntelligenceDashboard';
import GreenCollarResources from './GreenCollarResources';
import ExtractionTechnologies from './ExtractionTechnologies';

export default async function RDHubPage() {
  let activeResearchJobs = 0;
  let totalResearchPapers = 0;
  let totalTrials = 0;
  
  let agritechTrials: any[] = [];
  let extractionMethods: any[] = [];
  let marketTrends: any[] = [];

  try {
    const results = await Promise.all([
      prisma.researchJob.count({ where: { status: { in: ['QUEUED', 'RESEARCHING'] } } }),
      prisma.researchPaper.count(),
      Promise.resolve(0), // No ClinicalTrial in schema yet
    ]);
    [
      activeResearchJobs,
      totalResearchPapers,
      totalTrials
    ] = results;
  } catch (error) {
    console.warn("Database connection unavailable - rendering empty intelligence state");
  }

  return (
    <div className="flex flex-col w-full space-y-6 pb-10">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">R&D Intelligence Hub</h1>
          <p className="text-white/60 text-sm max-w-2xl">
            Track extraction innovations, agritech tool trials, and macro market trends for the Turmeric supply chain.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-500/30 transition-colors">
            <Search className="w-4 h-4" />
            Launch AI Synthesizer Job
          </button>
        </div>
      </header>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Active Research Jobs */}
        <div className="bg-black/40 border border-indigo-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-indigo-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full group-hover:bg-indigo-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-indigo-400 text-xs font-semibold uppercase tracking-wider">Active Agent Jobs</h3>
            <Network className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{activeResearchJobs}</span>
          </div>
          <p className="text-white/40 text-xs mt-2">Autonomous AI researchers currently active.</p>
        </div>

        {/* Literature Base */}
        <div className="bg-black/40 border border-cyan-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full group-hover:bg-cyan-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">Scientific Literature</h3>
            <Library className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{totalResearchPapers}</span>
          </div>
          <p className="text-white/40 text-xs mt-2">Ingested peer-reviewed papers.</p>
        </div>

        {/* Clinical Trials */}
        <div className="bg-black/40 border border-violet-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-violet-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-violet-500/10 blur-2xl rounded-full group-hover:bg-violet-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-violet-400 text-xs font-semibold uppercase tracking-wider">Clinical Trials</h3>
            <Microscope className="w-4 h-4 text-violet-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{totalTrials}</span>
          </div>
          <p className="text-white/40 text-xs mt-2">Monitored human and preclinical trials.</p>
        </div>
      </div>
      
      {/* Grand View Research Market Intelligence */}
      <MarketIntelligenceDashboard />

      <ExtractionTechnologies />
      <GreenCollarResources />
      <InstitutionalResources />
    </div>
  );
}
