import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const buyerName = "Abbott Blackstone International";
  const buyer = await prisma.buyer.findUnique({
    where: { name: buyerName }
  });

  if (!buyer) return;

  // Deduplicate Decision Makers (Emilie)
  const emilies = await prisma.buyerDecisionMaker.findMany({
    where: { buyerId: buyer.id, fullName: "Emilie" },
    orderBy: { updatedAt: 'desc' }
  });

  if (emilies.length > 1) {
    // Keep the first one (most recently updated with email), delete the rest
    const idsToDelete = emilies.slice(1).map(e => e.id);
    await prisma.buyerDecisionMaker.deleteMany({
      where: { id: { in: idsToDelete } }
    });
    console.log(`Deleted ${idsToDelete.length} duplicate Emilie records.`);
  }

  // Deduplicate Websites
  const websites = await prisma.website.findMany({
    where: { buyerId: buyer.id }
  });

  // Find duplicates that have the trailing slash if the non-slash version exists
  const urls = websites.map(w => w.url);
  for (const w of websites) {
    if (w.url.endsWith('/') && urls.includes(w.url.slice(0, -1))) {
      await prisma.website.delete({ where: { id: w.id } });
      console.log(`Deleted duplicate website ${w.url}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
