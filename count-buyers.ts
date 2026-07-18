import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('neon.tech') ? true : false,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const count = await prisma.buyer.count();
  const socialCount = await prisma.socialAccount.count();
  console.log(`Total buyers: ${count}`);
  console.log(`Total social accounts: ${socialCount}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
