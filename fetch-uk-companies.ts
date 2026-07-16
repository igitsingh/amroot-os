import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'fs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const ukCountry = await prisma.country.findFirst({
    where: { name: 'United Kingdom' }
  });
  
  if (!ukCountry) {
    console.log("No UK country found.");
    return;
  }

  const buyers = await prisma.buyer.findMany({
    where: {
      countryId: ukCountry.id
    },
    include: {
      websites: true,
      socialAccounts: true
    }
  });

  console.log(`Found ${buyers.length} UK companies.`);
  
  const formatted = buyers.map(b => {
    return {
      id: b.id,
      name: b.name,
      website: b.websites[0]?.url || 'N/A'
    }
  });
  
  fs.writeFileSync('uk-companies-list.json', JSON.stringify(formatted, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
