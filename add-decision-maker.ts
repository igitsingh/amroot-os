import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const buyer = await prisma.buyer.findUnique({
    where: { name: "NOW Organic International B.V." }
  });

  if (!buyer) {
    console.error("Buyer not found.");
    return;
  }

  const dm = await prisma.buyerDecisionMaker.create({
    data: {
      buyerId: buyer.id,
      fullName: "Hans Versteegh",
      designation: "Co-founder (Logistics & Sales)",
      businessEmail: "hans@noworganic.com",
      linkedinUrl: "https://www.noworganic.eu" // using website as fallback
    }
  });

  console.log("Decision Maker added successfully:", dm);
}

main().catch(console.error).finally(() => prisma.$disconnect());
