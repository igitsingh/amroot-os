import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function check() {
  const c = await prisma.country.findFirst({where:{name:'United Arab Emirates'}});
  if (!c) return console.log('Country not found');
  const buyers = await prisma.buyer.findMany({where:{countryId: c.id}});
  const extracted = buyers.filter(b => b.description && b.description.includes('Auto Extracted'));
  console.log(`Total UAE companies: ${buyers.length}`);
  console.log(`Companies with Auto Extracted data: ${extracted.length}`);
}

check().finally(() => prisma.$disconnect());
