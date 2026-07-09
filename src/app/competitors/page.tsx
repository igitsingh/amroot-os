import React from 'react';
import { prisma } from '@database/client';
import fs from 'fs/promises';
import path from 'path';
import CompetitorsView from './CompetitorsView';
import { newCompetitors } from '../../db/intelligence/brands/competitors-rich';
import { competitorData } from '../../data/competitorIntel';

export default async function CompetitorsWorkspacePage() {
  let competitors: any[] = [];
  let isDatabaseConnected = false;

  try {
    const dbCompetitors = await prisma.competitor.findMany({
      include: {
        products: true,
        websites: true,
        socialAccounts: true,
        tradeShows: true,
      },
      orderBy: { name: 'asc' },
    });
    competitors = [...dbCompetitors];
    isDatabaseConnected = true;
  } catch (error) {
    console.warn("Database connection unavailable - falling back to local JSON data");
  }

  // Load from local JSON if DB is empty or failed
  if (competitors.length === 0 || !isDatabaseConnected) {
    try {
      const jsonPath = path.join(process.cwd(), 'src/db/intelligence/brands/organizations.json');
      const data = await fs.readFile(jsonPath, 'utf8');
      const organizations = JSON.parse(data);
      
      const uniqueBrands = new Map();
      organizations.forEach((org: any) => {
        if (!uniqueBrands.has(org.name)) {
          uniqueBrands.set(org.name, {
            id: org.id,
            name: org.name,
            description: org.marketPositioning || 'Premium',
            intelligenceScore: org.confidenceScore || 50,
            products: [],
            websites: [],
            socialAccounts: [],
            tradeShows: []
          });
        }
      });
      competitors = Array.from(uniqueBrands.values());
    } catch (e) {
      console.error("Failed to load local organizations JSON", e);
    }
  }

  // Append our deeply researched competitors unconditionally
  competitors = [...competitors, ...newCompetitors];

  const existingIds = new Set(competitors.map(c => c.id));
  const existingNames = new Set(competitors.map(c => c.name));
  
  Object.values(competitorData).forEach((intel: any) => {
    const intelId = intel.idKeys && intel.idKeys.length > 0 ? intel.idKeys[0] : intel.name;
    if (!existingIds.has(intelId) && !existingNames.has(intel.name)) {
      competitors.push({
        id: intelId,
        name: intel.name,
        description: intel.coreNarrative || 'Pending Review',
        intelligenceScore: 50,
        marketTier: intel.marketTier || 'Unknown',
        products: [],
        websites: [],
        socialAccounts: [],
        tradeShows: []
      });
      existingIds.add(intelId);
      existingNames.add(intel.name);
    }
  });

  // Sort alphabetically by name
  competitors.sort((a, b) => a.name.localeCompare(b.name));

  return <CompetitorsView initialCompetitors={competitors} />;
}
// Force cache invalidation 1
// Force cache invalidation Tue Jul  9 17:53:43 IST 2026
