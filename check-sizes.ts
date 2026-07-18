import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_EkrjM4a3xyGS@ep-jolly-salad-a1krdwcu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  ssl: true
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const sizes = await prisma.buyer.groupBy({
    by: ['businessSize'],
    _count: true
  });
  console.log(sizes);
}
main().finally(() => prisma.$disconnect());
