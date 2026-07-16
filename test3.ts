import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const buyer = await prisma.buyer.findUnique({
    where: { name: "NOW Organic International B.V." },
    include: { websites: true, procurement: true, productIntelligence: true, certifications: true, decisionMakers: true }
  });
  console.log(JSON.stringify(buyer, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
