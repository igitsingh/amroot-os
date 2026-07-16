import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import puppeteer from 'puppeteer';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function extractFinancials(snippet: string) {
  // Basic Regex to extract Employee Count (e.g. "50 employees", "200-500 employees")
  const employeeMatch = snippet.match(/(\d+)(?:\s*(?:-|to)\s*\d+)?\s*(?:employees|staff|people)/i);
  let employeeCount = null;
  if (employeeMatch) {
    employeeCount = parseInt(employeeMatch[1].replace(/,/g, ''), 10);
  }

  // Basic Regex to extract Revenue (e.g. "$5M", "£10 million", "€2.5m")
  const revMatch = snippet.match(/(?:[$£€])\s*(\d+(?:\.\d+)?)\s*(?:m|million|b|billion)/i);
  let revenue = null;
  if (revMatch) {
    const amount = parseFloat(revMatch[1]);
    const isBillion = snippet.toLowerCase().includes('b') || snippet.toLowerCase().includes('billion');
    revenue = isBillion ? amount * 1_000_000_000 : amount * 1_000_000;
  }

  return { employeeCount, revenue };
}

async function main() {
  console.log("==================================================");
  console.log(`🔍 Starting Financial Research Agent`);
  console.log("==================================================");

  const buyers = await prisma.buyer.findMany({
    where: {
      OR: [
        { employeeCount: null },
        { businessSize: null }
      ]
    },
    take: 254 // Process all unclassified companies
  });

  console.log(`[Status] Initializing Headless Browser to bypass bot protection...`);
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

  let updatedCount = 0;

  for (const buyer of buyers) {
    console.log(`\n[Research] Investigating: ${buyer.name}`);
    
    try {
      const query = `"${buyer.name}" revenue employee count zoominfo rocketreach`;
      await page.goto(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, { waitUntil: 'networkidle2' });
      
      const snippets = await page.evaluate(() => {
        const elements = document.querySelectorAll('.result__snippet');
        return Array.from(elements).map(el => el.textContent || '').join(' | ');
      });

      if (!snippets) {
        console.log(`[Result] No data snippets found.`);
        await delay(3000);
        continue;
      }

      const { employeeCount, revenue } = await extractFinancials(snippets);

      if (employeeCount || revenue) {
        console.log(`[Found] Employees: ${employeeCount || 'Unknown'}, Revenue: ${revenue ? `$${revenue}` : 'Unknown'}`);
        
        await prisma.buyer.update({
          where: { id: buyer.id },
          data: {
            employeeCount: employeeCount || undefined,
            financialHistory: revenue ? { currentYearRevenue: revenue } : undefined
          }
        });
        
        updatedCount++;
      } else {
        console.log(`[Result] Snippets found, but no exact numbers could be extracted safely.`);
      }

    } catch (err: any) {
      console.log(`[Error] Failed to research ${buyer.name}: ${err.message}`);
    }
    
    await delay(3000); // Polite rate-limiting
  }

  console.log("\n==================================================");
  console.log(`✅ Financial Research Agent Finished`);
  console.log(`Successfully extracted data for ${updatedCount} companies.`);
  console.log("NOTE: Accurate private financial data often requires paid API keys (ZoomInfo).");
  console.log("==================================================");

  await browser.close();
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
