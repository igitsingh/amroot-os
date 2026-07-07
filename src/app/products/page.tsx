import React from 'react';
import { prisma } from '@database/client';
import { 
  Package, 
  Search, 
  Tag, 
  Award, 
  TrendingUp,
  FileText,
  ArrowRight,
  BarChart2
} from 'lucide-react';

export default async function ProductsWorkspacePage() {
  let products: any[] = [];
  let isDatabaseConnected = false;

  try {
    products = await prisma.product.findMany({
      include: {
        skus: {
          include: { priceRecords: true }
        },
        certifications: true,
        researchPapers: true,
        competitor: true,
      },
      orderBy: { intelligenceScore: 'desc' },
    });
    isDatabaseConnected = true;
  } catch (error) {
    console.warn("Database connection unavailable - rendering empty intelligence state");
  }

  const totalProducts = products.length;
  const certifiedProducts = products.filter(p => p.certifications.length > 0).length;

  return (
    <div className="flex flex-col w-full space-y-6 pb-10">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2D3142]/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#2D3142] mb-2">Products Intelligence</h1>
          <p className="text-[#2D3142]/60 text-sm max-w-2xl">
            Monitor SKU performance, pricing trends, and compliance across product lines.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-[#2D3142]/10 text-[#2D3142] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#2D3142]/10 transition-colors">
            <Search className="w-4 h-4" />
            Queue Intelligence Refresh
          </button>
        </div>
      </header>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Compliance Health */}
        <div className="bg-white border border-[#034F46]/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-[#034F46]/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#034F46]/10 blur-2xl rounded-full group-hover:bg-[#034F46]/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-[#034F46] text-xs font-semibold uppercase tracking-wider">Compliance Health</h3>
            <Award className="w-4 h-4 text-[#034F46]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#2D3142]">{certifiedProducts}</span>
            <span className="text-[#2D3142]/40 text-sm">/ {totalProducts}</span>
          </div>
          <p className="text-[#2D3142]/40 text-xs mt-2">Products with verified active certifications.</p>
        </div>

        {/* Total SKUs */}
        <div className="bg-white border border-[#F16775]/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-[#F16775]/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#F16775]/10 blur-2xl rounded-full group-hover:bg-[#F16775]/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-[#F16775] text-xs font-semibold uppercase tracking-wider">Active SKUs</h3>
            <Tag className="w-4 h-4 text-[#F16775]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#2D3142]">
              {products.reduce((acc, p) => acc + p.skus.length, 0)}
            </span>
          </div>
          <p className="text-[#2D3142]/40 text-xs mt-2">Tracked individual items across lines.</p>
        </div>

        {/* Evidence Backed */}
        <div className="bg-white border border-amber-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-amber-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/10 blur-2xl rounded-full group-hover:bg-amber-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-[#F59E0B] text-xs font-semibold uppercase tracking-wider">Evidence Backed</h3>
            <FileText className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#2D3142]">
              {products.filter(p => p.researchPapers.length > 0).length}
            </span>
          </div>
          <p className="text-[#2D3142]/40 text-xs mt-2">Products linked to scientific research.</p>
        </div>
      </div>

      {/* Product List - Strategic View */}
      <div className="bg-white border border-[#2D3142]/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-[#2D3142]/5 bg-white/[0.02] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#2D3142]/90">Product Intelligence</h2>
          <span className="text-[10px] uppercase font-mono text-[#2D3142]/40 tracking-wider">Ranked by Intelligence</span>
        </div>
        
        <div className="divide-y divide-white/5">
          {products.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="w-8 h-8 text-[#2D3142]/20 mx-auto mb-3" />
              <p className="text-[#2D3142]/60 text-sm">No product intelligence data available.</p>
            </div>
          ) : products.map(product => {
            const isCertified = product.certifications.length > 0;
            
            return (
              <div key={product.id} className="p-5 hover:bg-white/[0.02] transition-colors group">
                <div className="flex flex-col lg:flex-row gap-6 justify-between">
                  
                  {/* Primary Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[#2D3142] font-medium text-lg">{product.name}</h3>
                      {isCertified && (
                        <span className="bg-[#034F46]/10 text-[#034F46] px-2 py-0.5 rounded text-[10px] font-mono uppercase border border-[#034F46]/20 flex items-center gap-1">
                          <Award className="w-3 h-3" /> Certified
                        </span>
                      )}
                    </div>
                    {product.competitor && (
                      <p className="text-[#2D3142]/40 text-xs">Competitor: {product.competitor.name}</p>
                    )}
                  </div>

                  {/* Relationship Metrics */}
                  <div className="flex-1 grid grid-cols-3 gap-4 items-center">
                    <div className="flex flex-col">
                      <span className="text-[#2D3142]/30 text-[10px] font-mono uppercase mb-1 flex items-center gap-1">
                        <Tag className="w-3 h-3" /> SKUs
                      </span>
                      <span className="text-[#2D3142]/80 text-sm">{product.skus.length}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#2D3142]/30 text-[10px] font-mono uppercase mb-1 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Evidence
                      </span>
                      <span className="text-[#2D3142]/80 text-sm">{product.researchPapers.length} papers</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#2D3142]/30 text-[10px] font-mono uppercase mb-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Price Vol.
                      </span>
                      <span className="text-[#2D3142]/80 text-sm">Monitor</span>
                    </div>
                  </div>

                  {/* Actions & Score */}
                  <div className="flex items-center gap-6 justify-end">
                    <div className="flex flex-col items-end">
                      <span className="text-[#2D3142]/30 text-[10px] font-mono uppercase mb-1">Intelligence Score</span>
                      <span className={`text-xl font-bold ${product.intelligenceScore >= 80 ? 'text-[#034F46]' : 'text-[#2D3142]/80'}`}>
                        {product.intelligenceScore.toFixed(0)}%
                      </span>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-[#2D3142]/5 text-[#2D3142]/50 flex items-center justify-center hover:bg-[#2D3142]/10 hover:text-[#2D3142] transition-all">
                      <ArrowRight className="w-4 h-4 -rotate-45" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
