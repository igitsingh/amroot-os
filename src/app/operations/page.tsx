import React from 'react';
import { prisma } from '@database/client';
import { 
  Ship, 
  Search, 
  MapPin,
  AlertTriangle,
  ArrowRight,
  Route,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';

export default async function OperationsWorkspacePage() {
  let shipments: any[] = [];
  let isDatabaseConnected = false;

  try {
    shipments = await prisma.shipment.findMany({
      include: {
        supplier: true,
        importer: true,
        qualityCheckpoints: { orderBy: { dateTested: 'desc' } },
        risks: { where: { isActive: true } }
      },
      orderBy: { arrivalDate: 'desc' },
      take: 20,
    });
    isDatabaseConnected = true;
  } catch (error) {
    console.warn("Database connection unavailable - rendering empty intelligence state");
  }

  const activeShipments = shipments.filter(s => s.status === 'IN_TRANSIT' || s.status === 'AT_ORIGIN' || s.status === 'CUSTOMS_HOLD').length;
  const flaggedShipments = shipments.filter(s => s.risks && s.risks.length > 0).length;

  return (
    <div className="flex flex-col w-full space-y-6 pb-10">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2D3142]/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#2D3142] mb-2">Operations & Logistics</h1>
          <p className="text-[#2D3142]/60 text-sm max-w-2xl">
            Global supply chain tracking, quality assurance checkpoints, and logistical risk assessment.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 text-[#F16775] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-500/30 transition-colors">
            <Search className="w-4 h-4" />
            Track Global Shipment
          </button>
        </div>
      </header>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Active Shipments */}
        <div className="bg-white border border-indigo-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-indigo-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#F16775]/10 blur-2xl rounded-full group-hover:bg-indigo-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-[#F16775] text-xs font-semibold uppercase tracking-wider">Active Shipments</h3>
            <Ship className="w-4 h-4 text-[#F16775]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#2D3142]">{activeShipments}</span>
          </div>
          <p className="text-[#2D3142]/40 text-xs mt-2">Shipments currently in transit or processing.</p>
        </div>

        {/* Flagged Delays / Risks */}
        <div className="bg-white border border-amber-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-amber-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/10 blur-2xl rounded-full group-hover:bg-amber-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-[#F59E0B] text-xs font-semibold uppercase tracking-wider">Flagged Risks</h3>
            <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#2D3142]">{flaggedShipments}</span>
          </div>
          <p className="text-[#2D3142]/40 text-xs mt-2">Shipments with active logistical or customs risks.</p>
        </div>

        {/* Global Network Map Placeholder */}
        <div className="bg-white border border-[#034F46]/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-[#034F46]/40 transition-colors flex flex-col items-center justify-center">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#034F46]/10 blur-2xl rounded-full group-hover:bg-[#034F46]/20 transition-colors" />
          <Route className="w-8 h-8 text-[#034F46]/50 mb-2" />
          <span className="text-[#034F46] font-semibold text-sm">View Global Logistics Map</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Shipment Tracker */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-[#2D3142]/90 flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#2D3142]/50" /> Active Shipments Feed
          </h2>
          
          {shipments.length === 0 ? (
            <div className="bg-white border border-[#2D3142]/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
              <Ship className="w-8 h-8 text-[#2D3142]/20 mb-3" />
              <p className="text-[#2D3142]/60 text-sm">No shipments currently tracked.</p>
            </div>
          ) : shipments.map(shipment => (
            <div key={shipment.id} className="bg-white border border-[#2D3142]/5 rounded-xl overflow-hidden shadow-2xl transition-all hover:border-[#2D3142]/10">
              
              {/* Shipment Header */}
              <div className="px-5 py-4 border-b border-[#2D3142]/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[#2D3142] font-medium text-lg font-mono">{shipment.billOfLading}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                    shipment.status === 'DELIVERED' ? 'bg-[#034F46]/10 text-[#034F46] border-[#034F46]/20' : 
                    shipment.status === 'CUSTOMS_HOLD' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                    'bg-[#F16775]/10 text-[#F16775] border-indigo-500/20'
                  }`}>
                    {shipment.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[#2D3142]/40 text-[10px] uppercase block mb-0.5">ETA</span>
                  <span className="text-[#2D3142]/80 text-sm font-medium">{shipment.arrivalDate ? shipment.arrivalDate.toLocaleDateString() : 'TBD'}</span>
                </div>
              </div>
              
              {/* Route & Cargo Info */}
              <div className="p-5 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-[#2D3142]/30 text-[10px] font-mono uppercase mb-1">Origin</span>
                      <span className="text-[#2D3142]/80 text-sm">{shipment.originPort || 'Unknown'}</span>
                    </div>
                    <div className="flex-1 px-4 flex items-center">
                      <div className="h-px bg-white/20 flex-1 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#2D3142]/50" />
                        <Ship className="w-4 h-4 text-[#2D3142]/50 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-0.5" />
                      </div>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[#2D3142]/30 text-[10px] font-mono uppercase mb-1">Destination</span>
                      <span className="text-[#2D3142]/80 text-sm">{shipment.destinationPort || 'Unknown'}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/[0.02] rounded-lg border border-[#2D3142]/5">
                      <span className="text-[#2D3142]/40 text-[10px] uppercase block mb-1">Cargo</span>
                      <span className="text-[#2D3142]/80 text-xs font-mono">{shipment.weightKg?.toLocaleString()} KG • HS: {shipment.hsCode}</span>
                    </div>
                    <div className="p-3 bg-white/[0.02] rounded-lg border border-[#2D3142]/5">
                      <span className="text-[#2D3142]/40 text-[10px] uppercase block mb-1">Carrier</span>
                      <span className="text-[#2D3142]/80 text-xs font-medium">{shipment.carrierName || 'Unknown'}</span>
                    </div>
                  </div>
                </div>

                {/* Risks / Alerts Section */}
                {shipment.risks && shipment.risks.length > 0 && (
                  <div className="md:w-1/3 p-3 bg-red-500/5 rounded-lg border border-red-500/10">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-red-400 text-xs font-semibold">Active Risk Detected</span>
                    </div>
                    <div className="space-y-2">
                      {shipment.risks.map((risk: any) => (
                        <div key={risk.id}>
                          <p className="text-[#2D3142]/90 text-sm">{risk.title}</p>
                          <p className="text-[#2D3142]/50 text-xs mt-1">{risk.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quality Assurance Checkpoints Sidebar */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-[#2D3142]/90 flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#034F46]" /> Recent QA Checkpoints
          </h2>
          
          <div className="bg-white border border-[#2D3142]/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="divide-y divide-white/5">
              {shipments.flatMap(s => (s.qualityCheckpoints || []).map((qc: any) => ({ ...qc, billOfLading: s.billOfLading }))).length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-[#2D3142]/40 text-sm">No quality checkpoints logged.</p>
                </div>
              ) : shipments.flatMap(s => (s.qualityCheckpoints || []).map((qc: any) => ({ ...qc, billOfLading: s.billOfLading })))
                  .sort((a, b) => new Date(b.dateTested).getTime() - new Date(a.dateTested).getTime())
                  .slice(0, 10)
                  .map((qc: any) => (
                <div key={qc.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {qc.status === 'PASSED' ? (
                        <CheckCircle2 className="w-4 h-4 text-[#034F46]" />
                      ) : qc.status === 'FAILED' ? (
                        <XCircle className="w-4 h-4 text-red-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-[#F59E0B]" />
                      )}
                      <h3 className="text-[#2D3142] font-medium text-sm">{qc.inspectionType}</h3>
                    </div>
                    <span className="text-[#2D3142]/30 text-[10px]">{qc.dateTested ? new Date(qc.dateTested).toLocaleDateString() : ''}</span>
                  </div>
                  <div className="pl-6">
                    <p className="text-[#2D3142]/70 text-xs mb-2">Shipment: <span className="font-mono text-[#2D3142]/50">{qc.billOfLading}</span></p>
                    <div className="p-2 bg-[#2D3142]/5 rounded border border-[#2D3142]/10">
                      <p className="text-[#2D3142]/60 text-xs italic">"{qc.notes}"</p>
                      <p className="text-[#2D3142]/40 text-[10px] mt-1">- {qc.inspectorName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
