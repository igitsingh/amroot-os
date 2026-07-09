'use client';

import React, { useState } from 'react';
import { X, UploadCloud, File, AlertCircle } from 'lucide-react';

interface IngestDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function IngestDocumentModal({ isOpen, onClose, onSuccess }: IngestDocumentModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [documentType, setDocumentType] = useState('COA');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      setError('Please provide a title and select a file.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('documentType', documentType);

    try {
      const res = await fetch('/api/vault/ingest', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setFile(null);
      setTitle('');
      setDocumentType('COA');
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white border border-[#2D3142]/10 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-[#2D3142]/40 hover:text-[#2D3142] bg-[#F9F8F6] hover:bg-[#F4F1EA] p-2 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Decorative Top Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-[#034F46] to-[#F16775]" />

        <div className="px-8 pt-8 pb-4 border-b border-[#2D3142]/5">
          <h2 className="text-2xl font-bold text-[#2D3142] flex items-center gap-2">
            <UploadCloud className="w-6 h-6 text-[#034F46]" />
            Ingest Document
          </h2>
          <p className="text-sm text-[#2D3142]/60 mt-2 font-medium">Securely upload certificates, lab reports, and evidence to the AmrootOS Vault.</p>
        </div>

        <form onSubmit={handleUpload} className="p-8 space-y-6 bg-[#F9F8F6]/50">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-red-600 text-sm font-medium shadow-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
              <p>{error}</p>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#034F46] mb-2">Document Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Q3 Lakadong Turmeric COA"
              className="w-full bg-white border border-[#2D3142]/10 rounded-xl px-4 py-3.5 text-[#2D3142] font-medium placeholder-[#2D3142]/30 focus:outline-none focus:border-[#034F46]/50 focus:ring-2 focus:ring-[#034F46]/20 transition-all shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#034F46] mb-2">Document Type</label>
            <select 
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full bg-white border border-[#2D3142]/10 rounded-xl px-4 py-3.5 text-[#2D3142] font-medium focus:outline-none focus:border-[#034F46]/50 focus:ring-2 focus:ring-[#034F46]/20 transition-all shadow-sm cursor-pointer"
            >
              <option value="PRODUCT_LINE">Product Line PDF</option>
              <option value="MARKETING">Marketing Material</option>
              <option value="COA">Certificate of Analysis (COA)</option>
              <option value="CERTIFICATION">Organic Certification</option>
              <option value="CONTRACT">Supplier Contract</option>
              <option value="LEGAL">Legal Document</option>
              <option value="FINANCIAL">Financial Report</option>
              <option value="NDA">NDA</option>
              <option value="OTHER">Other / Evidence</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#034F46] mb-2">Upload File</label>
            <div className="border-2 border-dashed border-[#034F46]/20 bg-white rounded-2xl p-8 text-center hover:bg-[#034F46]/5 hover:border-[#034F46]/40 transition-all cursor-pointer relative group shadow-sm">
              <input 
                type="file" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              />
              {file ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-[#034F46]/10 text-[#034F46] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <File className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[#2D3142] font-bold text-sm bg-[#F4F1EA] px-3 py-1 rounded-lg inline-block border border-[#2D3142]/10">{file.name}</p>
                    <p className="text-[#2D3142]/50 text-xs font-medium mt-2">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-[#2D3142]/50">
                  <div className="w-14 h-14 rounded-full bg-[#F4F1EA] flex items-center justify-center group-hover:bg-[#034F46] group-hover:text-white transition-all duration-300">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2D3142]">Click or drag file to upload</p>
                    <p className="text-xs font-medium mt-1">Supports PDF, PNG, JPG up to 10MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 mt-2 border-t border-[#2D3142]/10 flex justify-end gap-4">
            <button 
              type="button" 
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 rounded-xl text-sm font-bold text-[#2D3142]/60 hover:bg-[#2D3142]/5 hover:text-[#2D3142] transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading || !file || !title}
              className="px-6 py-3 rounded-xl text-sm font-bold bg-[#034F46] text-white hover:bg-[#046C60] hover:shadow-lg hover:shadow-[#034F46]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Encrypting...
                </>
              ) : (
                'Secure & Ingest'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
