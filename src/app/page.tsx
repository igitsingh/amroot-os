import React from 'react';
import { prisma } from '@database/client';
import AiChat from '@/components/AiChat';
import { 
  Activity, 
  AlertTriangle, 
  Search, 
  CheckCircle, 
  ShieldAlert, 
  Database,
  ArrowRight,
  TrendingUp,
  Globe,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function CommandCenterPage() {
  // Fetch real data from the database
  let totalSuppliers = 0;
  let totalCompetitors = 0;
  let totalProducts = 0;
  let activeResearchJobs = 0;
  let evidenceConflicts = 0;
  let blockedTasks = 0;
  let isDatabaseConnected = false;

  try {
    const results = await Promise.all([
      prisma.supplier.count(),
      prisma.competitor.count(),
      prisma.product.count(),
      prisma.researchJob.count({ where: { status: { in: ['QUEUED', 'RESEARCHING'] } } }),
      prisma.evidence.count({ where: { verificationStatus: 'CONFLICT_DETECTED' } }),
      prisma.task.count({ where: { status: 'BLOCKED' } })
    ]);
    [
      totalSuppliers,
      totalCompetitors,
      totalProducts,
      activeResearchJobs,
      evidenceConflicts,
      blockedTasks
    ] = results;
    isDatabaseConnected = true;
  } catch (error) {
    // Database connection failed or empty - render 0s and empty state
    // We suppress console.error here because Next.js intercepts it and shows a dev overlay
    console.warn("Database connection unavailable - rendering empty intelligence state");
  }

  const globalCoverage = isDatabaseConnected ? 87 : 0; // If disconnected, coverage is 0

  return (
    <div className="flex flex-col w-full space-y-6 pb-10">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2D3142]/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#2D3142] mb-2">Command Center</h1>
          <p className="text-[#2D3142]/60 text-sm max-w-2xl">
            Real-time intelligence synthesis. Monitor critical alerts, active research jobs, and global knowledge graph coverage.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors">
            <Search className="w-4 h-4" />
            Launch Research Job
          </button>
        </div>
      </header>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Coverage Score */}
        <div className="bg-white border border-[#2D3142]/10 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/20 blur-2xl rounded-full group-hover:bg-amber-500/30 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-[#2D3142]/60 text-xs font-semibold uppercase tracking-wider">KG Coverage</h3>
            <Database className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#2D3142]">{globalCoverage}%</span>
            <span className="text-[#034F46] flex items-center text-xs font-medium">
              <TrendingUp className="w-3 h-3 mr-1" /> +2.4%
            </span>
          </div>
          <p className="text-[#2D3142]/40 text-xs mt-2">Verified entities across supply chain.</p>
        </div>

        {/* Entities Tracked */}
        <div className="bg-white border border-[#2D3142]/10 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-white/20 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#F16775]/10 blur-2xl rounded-full group-hover:bg-[#F16775]/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-[#2D3142]/60 text-xs font-semibold uppercase tracking-wider">Active Entities</h3>
            <Globe className="w-4 h-4 text-[#F16775]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#2D3142]">{(totalSuppliers + totalCompetitors + totalProducts).toLocaleString()}</span>
          </div>
          <div className="flex gap-3 text-[#2D3142]/40 text-xs mt-2">
            <span>{totalSuppliers} Suppliers</span>
            <span>{totalCompetitors} Competitors</span>
          </div>
        </div>

        {/* Active Research */}
        <div className="bg-white border border-[#2D3142]/10 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-fuchsia-500/30 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-fuchsia-500/20 blur-2xl rounded-full group-hover:bg-fuchsia-500/30 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-[#2D3142]/60 text-xs font-semibold uppercase tracking-wider">Research Jobs</h3>
            <Activity className="w-4 h-4 text-fuchsia-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#2D3142]">{activeResearchJobs}</span>
          </div>
          <p className="text-[#2D3142]/40 text-xs mt-2">Jobs currently queued or in-progress.</p>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white border border-red-500/30 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-red-500/50 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-500/20 blur-2xl rounded-full group-hover:bg-red-500/30 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-red-400/80 text-xs font-semibold uppercase tracking-wider">Critical Alerts</h3>
            <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-red-50">{evidenceConflicts + blockedTasks}</span>
          </div>
          <div className="flex gap-3 text-red-300/60 text-xs mt-2">
            <span>{evidenceConflicts} Evidence Conflicts</span>
            <span>{blockedTasks} Blocked Tasks</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Left Column: AI Assistant Embedded (takes 2/3 width) */}
        <div className="lg:col-span-2 bg-white border border-[#2D3142]/5 rounded-2xl flex flex-col overflow-hidden relative shadow-2xl h-[600px]">
          <div className="px-5 py-4 border-b border-[#2D3142]/5 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#2D3142]/50" />
              <h2 className="text-sm font-semibold text-[#2D3142]/80">Amroot Assistant</h2>
            </div>
            <span className="text-[10px] uppercase font-mono text-[#2D3142]/40 tracking-wider">Query Graph • Automate</span>
          </div>
          <div className="flex-1 relative overflow-hidden">
             <AiChat />
          </div>
        </div>

        {/* Right Column: Actions & Quick Links (takes 1/3 width) */}
        <div className="space-y-6 flex flex-col h-[600px]">
          
          {/* Action Required */}
          <div className="bg-gradient-to-b from-red-500/10 to-transparent border border-red-500/20 rounded-2xl p-5 flex-1 relative overflow-hidden">
            <h2 className="text-sm font-semibold text-[#2D3142]/90 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Requires Attention
            </h2>
            <div className="space-y-3">
              {evidenceConflicts > 0 ? (
                <div className="bg-white border border-[#2D3142]/5 p-3 rounded-lg flex items-center justify-between group cursor-pointer hover:border-red-500/50 transition-colors">
                  <div>
                    <p className="text-sm text-[#2D3142]/90 font-medium">Evidence Conflicts</p>
                    <p className="text-xs text-[#2D3142]/50">{evidenceConflicts} records require manual review</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#2D3142]/30 group-hover:text-red-400 transition-colors" />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#034F46]/80 text-sm">
                  <CheckCircle className="w-4 h-4" /> No evidence conflicts.
                </div>
              )}

              {blockedTasks > 0 ? (
                <div className="bg-white border border-[#2D3142]/5 p-3 rounded-lg flex items-center justify-between group cursor-pointer hover:border-amber-500/50 transition-colors">
                  <div>
                    <p className="text-sm text-[#2D3142]/90 font-medium">Blocked Tasks</p>
                    <p className="text-xs text-[#2D3142]/50">{blockedTasks} tasks currently blocked</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#2D3142]/30 group-hover:text-[#F59E0B] transition-colors" />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#034F46]/80 text-sm mt-4">
                  <CheckCircle className="w-4 h-4" /> No blocked tasks.
                </div>
              )}
            </div>
          </div>

          {/* Quick Access */}
          <div className="bg-white border border-[#2D3142]/5 rounded-2xl p-5 flex-1">
            <h2 className="text-sm font-semibold text-[#2D3142]/90 mb-4">Intelligence Modules</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/suppliers" className="bg-[#2D3142]/5 border border-[#2D3142]/5 p-3 rounded-lg hover:bg-[#2D3142]/10 transition-colors text-center group">
                <p className="text-sm text-[#2D3142]/80 font-medium group-hover:text-[#2D3142]">Suppliers</p>
              </Link>
              <Link href="/competitors" className="bg-[#2D3142]/5 border border-[#2D3142]/5 p-3 rounded-lg hover:bg-[#2D3142]/10 transition-colors text-center group">
                <p className="text-sm text-[#2D3142]/80 font-medium group-hover:text-[#2D3142]">Competitors</p>
              </Link>
              <Link href="/products" className="bg-[#2D3142]/5 border border-[#2D3142]/5 p-3 rounded-lg hover:bg-[#2D3142]/10 transition-colors text-center group">
                <p className="text-sm text-[#2D3142]/80 font-medium group-hover:text-[#2D3142]">Products</p>
              </Link>
              <Link href="/vault" className="bg-[#2D3142]/5 border border-[#2D3142]/5 p-3 rounded-lg hover:bg-[#2D3142]/10 transition-colors text-center group">
                <p className="text-sm text-[#2D3142]/80 font-medium group-hover:text-[#2D3142]">Vault</p>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
