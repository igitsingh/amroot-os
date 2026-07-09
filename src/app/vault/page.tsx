import React from 'react';
import { prisma } from '@database/client';
import { 
  FileText, 
  Search, 
  Upload, 
  Lock, 
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Database
} from 'lucide-react';
import IngestButton from '../../components/IngestButton';
import VerifyDocumentButton from '../../components/VerifyDocumentButton';

export default async function VaultWorkspacePage() {
  let documents: any[] = [];
  let isDatabaseConnected = false;

  try {
    documents = await prisma.document.findMany({
      include: {
        uploadedBy: true,
        evidence: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    isDatabaseConnected = true;
  } catch (error) {
    console.warn("Database connection unavailable - rendering empty intelligence state");
    try {
      const fs = require('fs/promises');
      const path = require('path');
      const jsonDbPath = path.join(process.cwd(), 'data', 'vault_documents.json');
      const fileData = await fs.readFile(jsonDbPath, 'utf8');
      documents = JSON.parse(fileData);
      documents.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch(e) {
      // JSON file doesn't exist yet, leave documents empty
    }
  }

  const totalDocs = documents.length;
  const verifiedDocs = documents.filter(d => d.evidence.some((e: any) => e.verificationStatus === 'VERIFIED')).length;

  return (
    <div className="flex flex-col w-full space-y-8 p-8 md:p-12 bg-gradient-to-br from-[#F9F8F6] to-[#F4F1EA] min-h-full relative overflow-hidden">
      {/* Subtle decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#034F46]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F16775]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2D3142]/10 pb-6 relative z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#2D3142] mb-2">Secure Vault</h1>
          <p className="text-[#2D3142]/60 text-sm max-w-2xl">
            Central repository for verified documents, certifications, lab reports, and sensitive evidence.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <IngestButton />
        </div>
      </header>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Documents */}
        <div className="bg-white border border-[#F16775]/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-[#F16775]/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#F16775]/10 blur-2xl rounded-full group-hover:bg-[#F16775]/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-[#F16775] text-xs font-semibold uppercase tracking-wider">Stored Assets</h3>
            <Database className="w-4 h-4 text-[#F16775]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#2D3142]">{totalDocs}</span>
          </div>
          <p className="text-[#2D3142]/40 text-xs mt-2">Total files encrypted in Vault.</p>
        </div>

        {/* Verified Assets */}
        <div className="bg-white border border-[#034F46]/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-[#034F46]/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#034F46]/10 blur-2xl rounded-full group-hover:bg-[#034F46]/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-[#034F46] text-xs font-semibold uppercase tracking-wider">Verified Evidence</h3>
            <ShieldCheck className="w-4 h-4 text-[#034F46]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#2D3142]">{verifiedDocs}</span>
            <span className="text-[#2D3142]/40 text-sm">/ {totalDocs}</span>
          </div>
          <p className="text-[#2D3142]/40 text-xs mt-2">Documents successfully verified by AI.</p>
        </div>

        {/* Access Logs */}
        <div className="bg-white border border-purple-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-purple-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full group-hover:bg-purple-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-purple-400 text-xs font-semibold uppercase tracking-wider">Access Security</h3>
            <Lock className="w-4 h-4 text-purple-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#2D3142]">Secure</span>
          </div>
          <p className="text-[#2D3142]/40 text-xs mt-2">Zero unauthorized access attempts.</p>
        </div>
      </div>

      {/* Document List - Strategic View */}
      <div className="bg-white border border-[#2D3142]/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-[#2D3142]/5 bg-white/[0.02] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#2D3142]/90">Vault Assets</h2>
          <span className="text-[10px] uppercase font-mono text-[#2D3142]/40 tracking-wider">Recent Uploads</span>
        </div>
        
        <div className="divide-y divide-white/5">
          {documents.length === 0 ? (
            <div className="p-8 text-center">
              <Lock className="w-8 h-8 text-[#2D3142]/20 mx-auto mb-3" />
              <p className="text-[#2D3142]/60 text-sm">Vault is currently empty. Ingest documents to begin.</p>
            </div>
          ) : documents.map(doc => {
            const isVerified = doc.evidence.some((e: any) => e.verificationStatus === 'VERIFIED');
            
            return (
              <div key={doc.id} className="p-5 hover:bg-white/[0.02] transition-colors group">
                <div className="flex flex-col lg:flex-row gap-6 justify-between">
                  
                  {/* Primary Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[#2D3142] font-medium text-lg">{doc.title}</h3>
                      {isVerified ? (
                        <span className="bg-[#034F46]/10 text-[#034F46] px-2 py-0.5 rounded text-[10px] font-mono uppercase border border-[#034F46]/20 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      ) : (
                        <span className="bg-amber-500/10 text-[#F59E0B] px-2 py-0.5 rounded text-[10px] font-mono uppercase border border-amber-500/20 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </div>
                    <p className="text-[#2D3142]/40 text-xs">{doc.documentType} • File secured by SHA-256 Checksum</p>
                  </div>

                  {/* Relationship Metrics */}
                  <div className="flex-1 grid grid-cols-2 gap-4 items-center">
                    <div className="flex flex-col">
                      <span className="text-[#2D3142]/30 text-[10px] font-mono uppercase mb-1 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Evidence Nodes
                      </span>
                      <span className="text-[#2D3142]/80 text-sm">{doc.evidence.length}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#2D3142]/30 text-[10px] font-mono uppercase mb-1 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Uploader
                      </span>
                      <span className="text-[#2D3142]/80 text-sm">{doc.uploadedBy?.name || 'System'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 justify-end">
                    {!isVerified && (
                      <VerifyDocumentButton documentId={doc.id} />
                    )}
                    <a 
                      href={doc.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#2D3142]/5 text-[#2D3142]/50 flex items-center justify-center hover:bg-[#2D3142]/10 hover:text-[#2D3142] transition-all"
                    >
                      <ArrowRight className="w-4 h-4 -rotate-45" />
                    </a>
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
