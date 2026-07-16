import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const buyerName = "GO Superfoods";
  const buyer = await prisma.buyer.findUnique({
    where: { name: buyerName }
  });

  if (!buyer) return;

  await prisma.buyerDecisionMaker.create({
    data: {
      buyerId: buyer.id,
      fullName: "General Office / HQ",
      designation: "Contact Numbers",
      businessPhone: "+44 (0)114 3499 899",
      businessEmail: "HQ: +44 (0)1909 807173"
    }
  });

  console.log("Added general contact for GO Superfoods");
}

main().catch(console.error).finally(() => prisma.$disconnect());
