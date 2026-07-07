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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white backdrop-blur-sm">
      <div className="bg-[#111] border border-[#2D3142]/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#2D3142]/40 hover:text-[#2D3142] bg-white hover:bg-[#2D3142]/10 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6 border-b border-[#2D3142]/10">
          <h2 className="text-xl font-semibold text-[#2D3142]">Ingest New Document</h2>
          <p className="text-sm text-[#2D3142]/50 mt-1">Upload files securely to the AmrootOS Vault</p>
        </div>

        <form onSubmit={handleUpload} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#2D3142]/70 mb-2">Document Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Q3 Lakadong Turmeric COA"
              className="w-full bg-white border border-[#2D3142]/10 rounded-xl px-4 py-3 text-[#2D3142] placeholder-white/20 focus:outline-none focus:border-[#034F46]/50 focus:ring-1 focus:ring-[#034F46]/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D3142]/70 mb-2">Document Type</label>
            <select 
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full bg-white border border-[#2D3142]/10 rounded-xl px-4 py-3 text-[#2D3142] focus:outline-none focus:border-[#034F46]/50 focus:ring-1 focus:ring-[#034F46]/50 transition-all"
            >
              <option value="COA">Certificate of Analysis (COA)</option>
              <option value="CERTIFICATION">Organic Certification</option>
              <option value="CONTRACT">Supplier Contract</option>
              <option value="NDA">NDA</option>
              <option value="OTHER">Other / Evidence</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2D3142]/70 mb-2">Upload File</label>
            <div className="border-2 border-dashed border-[#2D3142]/10 rounded-2xl p-8 text-center hover:bg-[#2D3142]/5 hover:border-[#034F46]/30 transition-all cursor-pointer relative">
              <input 
                type="file" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              />
              {file ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-[#034F46]/20 text-[#034F46] flex items-center justify-center mb-2">
                    <File className="w-6 h-6" />
                  </div>
                  <p className="text-[#034F46] font-medium text-sm">{file.name}</p>
                  <p className="text-[#2D3142]/40 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#2D3142]/40">
                  <UploadCloud className="w-8 h-8 mb-2" />
                  <p className="font-medium">Click or drag file to upload</p>
                  <p className="text-xs">Supports PDF, PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#2D3142]/70 hover:bg-[#2D3142]/10 hover:text-[#2D3142] transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading || !file || !title}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#034F46] text-black hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
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
