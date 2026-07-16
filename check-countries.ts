import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function check() {
  const buyers = await prisma.buyer.findMany({ include: { country: true } });
  const countries = Array.from(new Set(buyers.map(b => b.country?.name)));
  console.log(countries);
}

check().finally(() => prisma.$disconnect());
