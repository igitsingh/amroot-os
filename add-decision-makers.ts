import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function addDM(buyerName: string, fullName: string, designation: string, businessEmail: string) {
  const buyer = await prisma.buyer.findUnique({
    where: { name: buyerName }
  });

  if (!buyer) {
    console.error(`Buyer ${buyerName} not found.`);
    return;
  }

  // Check if exists
  const existing = await prisma.buyerDecisionMaker.findFirst({
    where: { buyerId: buyer.id, fullName }
  });

  if (existing) {
    console.log(`${fullName} already exists for ${buyerName}`);
    return;
  }

  const dm = await prisma.buyerDecisionMaker.create({
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
  await addDM("NOW Organic International B.V.", "Hans Versteegh", "Co-founder (Logistics & Sales)", "hans@noworganic.com");
  await addDM("Abbott Blackstone", "Emilie", "Purchasing Manager", "info@abbottblackstone.eu");
  await addDM("Husarich GmbH", "Stephan Schulenburg", "Purchase Logistics", "einkauf@husarich.com");
  await addDM("Husarich GmbH", "Jan Kahlweiß", "Managing Director", "info@husarich.com");
}

main().catch(console.error).finally(() => prisma.$disconnect());
