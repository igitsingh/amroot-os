import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const countNoWebsite = await prisma.buyer.count({ where: { websites: { none: {} } } });
  console.log(`Buyers with no website: ${countNoWebsite}`);
  
  const evidence = await prisma.evidence.findFirst({
    where: { entityType: 'Buyer', fieldName: 'name' }
  });
  console.log(evidence);
}
main().catch(console.error).finally(() => prisma.$disconnect());
