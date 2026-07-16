import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  console.log(`Successfully fetched ${buyers.length} buyers without adapter.`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
