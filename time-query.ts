import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  console.time('findMany');
  const buyers = await prisma.buyer.findMany({
    include: {
      procurement: true,
      productIntelligence: true,
      decisionMakers: true,
      country: true,
      websites: true,
      socialAccounts: true,
      certifications: true,
    }
  });
  console.timeEnd('findMany');
  console.log('Buyers:', buyers.length);
  console.log('Payload size:', JSON.stringify(buyers).length / 1024 / 1024, 'MB');
}
main().then(() => prisma.$disconnect());
