import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const total = await prisma.buyer.count();
  console.log(`Total buyers: ${total}`);
  let allBuyers: any[] = [];
  const batchSize = 50;
  for (let i = 0; i < total; i += batchSize) {
    const batch = await prisma.buyer.findMany({
      skip: i,
      take: batchSize,
      include: {
        procurement: true,
        productIntelligence: true,
        decisionMakers: true,
        country: true,
        websites: true,
        socialAccounts: true,
        tradeShows: true,
        meetings: true,
        certifications: true,
      }
    });
    allBuyers = allBuyers.concat(batch);
    console.log(`Fetched batch ${i/batchSize + 1}, total fetched so far: ${allBuyers.length}`);
  }
  console.log(`Successfully fetched ${allBuyers.length} buyers in batches.`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
