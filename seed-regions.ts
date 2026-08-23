import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const usa = await prisma.country.findUnique({ where: { code: 'USA' } });
  
  if (!usa) {
    console.log("USA country not found in DB.");
    return;
  }

  // Create NYC
  await prisma.targetRegion.create({
    data: {
      countryId: usa.id,
      name: 'New York City',
      status: 'RESEARCHING',
      priority: 'HIGH'
    }
  });

  // Create NJ
  await prisma.targetRegion.create({
    data: {
      countryId: usa.id,
      name: 'New Jersey',
      status: 'RESEARCHING',
      priority: 'HIGH'
    }
  });

  console.log("Added target regions for USA.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
