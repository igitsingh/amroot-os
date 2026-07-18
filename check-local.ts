import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const count = await prisma.buyer.count();
  console.log(`Local DB Buyer Count: ${count}`);
  
  const sample = await prisma.buyer.findFirst({
    where: { name: 'Langridge Organic Products' },
    include: { socialAccounts: true, websites: true }
  });
  console.log(JSON.stringify(sample, null, 2));
}

main().finally(() => prisma.$disconnect());
