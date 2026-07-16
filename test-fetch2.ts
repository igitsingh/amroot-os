import 'dotenv/config';
import prisma from './src/lib/prisma';

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
  console.log(`Successfully fetched ${buyers.length} buyers with default Prisma Client.`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
