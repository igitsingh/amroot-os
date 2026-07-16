import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const b1 = await prisma.buyer.findUnique({ where: { name: "Abbott Blackstone International" }});
  const b2 = await prisma.buyer.findUnique({ where: { name: "Abbott Blackstone" }});

  console.log("b1:", b1?.id, b1?.name);
  console.log("b2:", b2?.id, b2?.name);

  if (b1 && b2) {
    // move decision makers from b2 to b1
    await prisma.buyerDecisionMaker.updateMany({
      where: { buyerId: b2.id },
      data: { buyerId: b1.id }
    });
    
    // delete child records first
    await prisma.buyerProcurement.deleteMany({ where: { buyerId: b2.id }});
    await prisma.buyerProductIntelligence.deleteMany({ where: { buyerId: b2.id }});

    // delete b2
    await prisma.buyer.delete({
      where: { id: b2.id }
    });
    console.log("Merged Abbott Blackstone into Abbott Blackstone International");
  }

  const targetBuyer = b1 || b2;
  if (!targetBuyer) return;

  // Add website
  await prisma.website.upsert({
    where: { url: "https://abbottblackstone.eu" },
    update: { buyerId: targetBuyer.id },
    create: { url: "https://abbottblackstone.eu", buyerId: targetBuyer.id }
  });

  // Add SocialAccount (LinkedIn)
  await prisma.socialAccount.upsert({
    where: { url: "https://www.linkedin.com/company/abbott-blackstone-international/" },
    update: { buyerId: targetBuyer.id },
    create: {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/company/abbott-blackstone-international/",
      buyerId: targetBuyer.id
    }
  });

  // Since Buyer model has no phone/email directly, maybe we can put it in description or if there's a general contact decision maker? Or just print. Wait, where did I put emails for companies before?
  // I will check if Buyer has a general contact decision maker, or create one.
}

main().catch(console.error).finally(() => prisma.$disconnect());
