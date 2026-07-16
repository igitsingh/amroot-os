import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function updateDissolved(buyerName: string) {
  const buyer = await prisma.buyer.findUnique({
    where: { name: buyerName }
  });

  if (!buyer) {
    console.error(`Buyer ${buyerName} not found.`);
    return;
  }

  await prisma.buyer.update({
    where: { id: buyer.id },
    data: {
      lifecycleStage: "ARCHIVED"
    }
  });

  console.log(`Updated ${buyerName} status to DISSOLVED`);
}

async function addDM(buyerName: string, fullName: string, designation: string, businessEmail: string) {
  const buyer = await prisma.buyer.findUnique({
    where: { name: buyerName }
  });

  if (!buyer) {
    console.error(`Buyer ${buyerName} not found.`);
    return;
  }

  const existing = await prisma.buyerDecisionMaker.findFirst({
    where: { buyerId: buyer.id, fullName }
  });

  if (existing) {
    console.log(`${fullName} already exists for ${buyerName}`);
    return;
  }

  await prisma.buyerDecisionMaker.create({
    data: {
      buyerId: buyer.id,
      fullName,
      designation,
      businessEmail
    }
  });

  console.log(`Added: ${fullName} to ${buyerName}`);
}

async function main() {
  await updateDissolved("BAK Global Trading Limited");
}

main().catch(console.error).finally(() => prisma.$disconnect());
