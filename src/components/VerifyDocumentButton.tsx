'use client';

import React, { useState } from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function VerifyDocumentButton({ documentId }: { documentId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/vault/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ documentId })
      });

      if (!res.ok) {
        throw new Error('Failed to verify document');
      }

      // Refresh the page to show the verified status
      router.refresh();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleVerify}
      disabled={loading}
      className="flex items-center gap-2 bg-[#034F46]/10 text-[#034F46] hover:bg-[#034F46]/20 hover:text-emerald-300 border border-[#034F46]/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
    >
      {loading ? (
        <>
          <div className="w-3 h-3 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Cpu className="w-3 h-3" />
          Run AI Verification
        </>
      )}
    </button>
  );
}
