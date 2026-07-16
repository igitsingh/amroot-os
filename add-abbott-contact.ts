import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const buyer = await prisma.buyer.findUnique({ where: { name: "Abbott Blackstone International" }});
  if (!buyer) return;

  // Update Emilie
  const dm = await prisma.buyerDecisionMaker.findFirst({
    where: { buyerId: buyer.id, fullName: { contains: "Emilie" } }
  });

  if (dm) {
    await prisma.buyerDecisionMaker.update({
      where: { id: dm.id },
      data: {
        businessPhone: "+49-89-5484-6100",
        businessEmail: "info@abbottblackstone.eu"
      }
    });
    console.log("Updated Emilie's contact info.");
  } else {
    // If no DM found, create a general one
    await prisma.buyerDecisionMaker.create({
      data: {
        buyerId: buyer.id,
        fullName: "General Contact",
        designation: "Sales / Info",
        businessEmail: "info@abbottblackstone.eu",
        businessPhone: "+49-89-5484-6100"
      }
    });
    console.log("Created general contact.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
