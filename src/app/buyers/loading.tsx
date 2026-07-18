import React from 'react';
import { ShieldAlert, Loader2 } from 'lucide-react';

export default function BuyersLoading() {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden w-full h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#2D3142]/10 bg-[#F4F1EA]">
        <h2 className="text-lg font-semibold text-[#2D3142]">Global Buyers Intelligence</h2>
        <div className="text-sm text-[#2D3142]/50">Loading Intelligence...</div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-full">
        <Loader2 className="w-12 h-12 text-[#F16775] animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-[#2D3142] mb-2">Decrypting Buyer Intel...</h3>
        <p className="text-sm text-[#2D3142]/60 max-w-md mx-auto">
          Securely fetching hundreds of global buyers, decision makers, and procurement history from the Amroot database. This usually takes a few seconds.
        </p>
      </div>
    </div>
  );
}
