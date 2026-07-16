import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const buyers = await prisma.buyer.findMany({
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
  console.log(`Successfully fetched ${buyers.length} buyers with all relations.`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
