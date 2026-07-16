import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const buyer = await prisma.buyer.findUnique({
    where: { name: "Abbott Blackstone International" }
  });

  if (!buyer) {
    console.log("Buyer not found");
    return;
  }

  await prisma.buyerDecisionMaker.create({
    data: {
      buyerId: buyer.id,
      fullName: "Emilie",
      designation: "Purchasing Manager",
      businessEmail: "info@abbottblackstone.eu"
    }
  });
  console.log("Added Emilie to Abbott Blackstone International");
}

main().catch(console.error).finally(() => prisma.$disconnect());
