import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('neon.tech') ? true : false,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const SERPER_API_KEY = process.env.SERPER_API_KEY;

async function searchTradeIntelligence(companyName: string) {
  if (!SERPER_API_KEY) {
    throw new Error("Missing SERPER_API_KEY in environment variables.");
  }

  const query = `"${companyName}" AND (import OR shipment OR "bill of lading") AND (turmeric OR ginger OR spices) site:zauba.com OR site:volza.com OR site:trademo.com`;
  
  const response = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: {
      'X-API-KEY': SERPER_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ q: query, num: 5 })
  });

  const data = await response.json();
  return data.organic || [];
}

async function analyzeTradeIntent(companyName: string, searchResults: any[]) {
  if (!searchResults || searchResults.length === 0) {
    return {
      intelligenceScore: 0,
      descriptionAddon: "No recent public trade or shipment records found on major trade intelligence platforms.",
      isImportingFromIndia: false,
      importsTurmeric: false,
      importsGinger: false
    };
  }

  // Combine snippets
  const snippets = searchResults.map(r => `Title: ${r.title}\nSnippet: ${r.snippet}`).join("\n\n");

  const { object } = await generateObject({
    model: google('gemini-2.5-flash'),
    schema: z.object({
      intelligenceScore: z.number().describe('A score from 1-100 indicating how strong the buying intent is based on recent shipments.'),
      descriptionAddon: z.string().describe('A single concise sentence summarizing their trade activity (e.g., "Actively imports bulk raw turmeric and spices from India based on recent bill of lading records.").'),
      isImportingFromIndia: z.boolean().describe('True if the snippets indicate they import from India.'),
      importsTurmeric: z.boolean().describe('True if snippets specifically mention turmeric shipments.'),
      importsGinger: z.boolean().describe('True if snippets specifically mention ginger shipments.')
    }),
    prompt: `You are an expert trade intelligence analyst. Analyze the following Google Search snippets for the company "${companyName}". 
    These snippets are from global trade databases like Zauba and Volza.
    Determine their buying intent for spices (specifically turmeric and ginger) and if they source from India.
    
    Snippets:
    ${snippets}`
  });

  return object;
}

async function main() {
  console.log("Starting Trade Intelligence Enrichment via Google Dorking...");
  
  if (!SERPER_API_KEY) {
    console.error("❌ ERROR: SERPER_API_KEY is missing from .env file!");
    console.error("Please create a free account at https://serper.dev, get an API key, and add it to your .env file.");
    process.exit(1);
  }

  // Find the UAE country ID
  const uae = await prisma.country.findFirst({
    where: { name: { contains: "United Arab Emirates", mode: 'insensitive' } }
  });

  if (!uae) {
    console.error("Could not find United Arab Emirates in DB.");
    return;
  }

  // Fetch all UAE buyers, limit to 3 for testing first if testing flag is passed
  // To run all, just remove the take limit.
  const isTesting = process.argv.includes('--test');
  
  const buyers = await prisma.buyer.findMany({
    where: { countryId: uae.id },
    include: { procurement: true },
    take: isTesting ? 3 : undefined
  });

  console.log(`Found ${buyers.length} buyers in the UAE. Proceeding...`);

  let updatedCount = 0;

  for (const buyer of buyers) {
    console.log(`\n🔍 Searching trade data for: ${buyer.name}`);
    try {
      const searchResults = await searchTradeIntelligence(buyer.name);
      console.log(`   Found ${searchResults.length} search results.`);

      const intentAnalysis = await analyzeTradeIntent(buyer.name, searchResults);
      console.log(`   🧠 AI Analysis: ${intentAnalysis.descriptionAddon}`);
      console.log(`   Score: ${intentAnalysis.intelligenceScore} | India: ${intentAnalysis.isImportingFromIndia} | Turmeric: ${intentAnalysis.importsTurmeric}`);

      // Update database
      const newScore = Math.max(buyer.intelligenceScore || 0, intentAnalysis.intelligenceScore);
      let newDescription = buyer.description || "";
      if (intentAnalysis.descriptionAddon && !newDescription.includes(intentAnalysis.descriptionAddon)) {
        newDescription = newDescription ? `${newDescription}\n\nTrade Intelligence: ${intentAnalysis.descriptionAddon}` : `Trade Intelligence: ${intentAnalysis.descriptionAddon}`;
      }

      const existingOrigins = buyer.procurement?.importOrigins || [];
      const newOrigins = intentAnalysis.isImportingFromIndia && !existingOrigins.includes("India") 
        ? [...existingOrigins, "India"] 
        : existingOrigins;

      await prisma.buyer.update({
        where: { id: buyer.id },
        data: {
          intelligenceScore: newScore,
          description: newDescription,
          procurement: {
            upsert: {
              create: {
                importsTurmeric: intentAnalysis.importsTurmeric,
                importsGinger: intentAnalysis.importsGinger,
                importOrigins: newOrigins
              },
              update: {
                importsTurmeric: buyer.procurement?.importsTurmeric || intentAnalysis.importsTurmeric,
                importsGinger: buyer.procurement?.importsGinger || intentAnalysis.importsGinger,
                importOrigins: newOrigins
              }
            }
          }
        }
      });
      
      console.log(`   ✅ Successfully updated ${buyer.name}`);
      updatedCount++;

    } catch (e: any) {
      console.error(`   ❌ Failed to process ${buyer.name}: ${e.message}`);
    }
    
    // Rate limiting pause
    await new Promise(res => setTimeout(res, 1500));
  }

  console.log(`\n🎉 Enrichment complete! Updated ${updatedCount} out of ${buyers.length} UAE buyers.`);
}

main().finally(() => {
  prisma.$disconnect();
});
