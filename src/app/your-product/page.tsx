import React from 'react';
import ProductView from './ProductView';

export default function YourProductPage() {
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden text-sm">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2D3142]/10 p-6 md:p-8 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#2D3142] mb-2">Your Products</h1>
          <p className="text-[#2D3142]/60 text-sm max-w-2xl">
            Product specifications, formulation playbooks, and compliance thresholds.
          </p>
        </div>
      </header>
      
      {/* View */}
      <div className="flex-1 overflow-hidden min-h-0">
        <ProductView />
      </div>
    </div>
  );
}
