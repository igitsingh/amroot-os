import React from 'react';
import { prisma } from '@database/client';
import { 
  Search, 
  Network,
  Library,
  Microscope
} from 'lucide-react';
import RDView from './RDView';
import { extractionMethodsData, agritechTrialsData, marketTrendsData } from '../../db/intelligence/rd-data';
import fs from 'fs/promises';
import path from 'path';

export default async function RDHubPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  let activeResearchJobs = 0;
  let totalResearchPapers = 0;
  let totalTrials = 0;
  let tools = [];
  
  try {
    const jsonPath = path.join(process.cwd(), 'src/db/intelligence/tools/tools.json');
    const data = await fs.readFile(jsonPath, 'utf8');
    tools = JSON.parse(data);
  } catch (error) {
    console.error("Failed to load local tools JSON", error);
  }
  
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
    <div className="h-full flex flex-col bg-white overflow-hidden text-sm">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2D3142]/10 p-6 md:p-8 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#2D3142] mb-2">R&D Intelligence Hub</h1>
          <p className="text-[#2D3142]/60 text-sm max-w-2xl">
            Track extraction innovations, agritech tool trials, and macro market trends for the Turmeric supply chain.
          </p>
        </div>
      </header>
      
      {/* Table UI */}
      <div className="flex-1 overflow-hidden min-h-0">
        <RDView 
          extractionMethods={extractionMethodsData} 
          agritechTrials={agritechTrialsData} 
          marketTrends={marketTrendsData} 
          agritechTools={tools}
          initialTab={(searchParams?.tab as string) || 'trends'}
        />
      </div>
    </div>
  );
}
