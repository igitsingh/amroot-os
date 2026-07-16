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

  if (!buyer) {
    console.error(`Buyer ${buyerName} not found.`);
    return;
  }

  const existingDesc = buyer.description || "";
  const infoToAdd = `\n\nContact Numbers:\nGeneral: +44 (0)114 3499 899\nHQ: +44 (0)1909 807173\n\nOpening Hours:\nMon-Fri: 8:30am - 17:00pm\nSat-Sun: Closed`;

  await prisma.buyer.update({
    where: { id: buyer.id },
    data: {
      address: "Unit 1, Campbell Way, Business Park, Campbell Way, Dinnington, Sheffield S25 3SF, United Kingdom",
      city: "Sheffield",
      description: existingDesc + infoToAdd
    }
  });

  console.log(`Updated information for ${buyerName}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
