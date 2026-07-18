import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'fs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('neon.tech') ? true : false,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const data = JSON.parse(fs.readFileSync('uk-companies-list.json', 'utf8'));
  console.log(`Loaded ${data.length} companies from JSON.`);

  let ukCountry = await prisma.country.findFirst({
    where: { name: 'United Kingdom' }
  });

  if (!ukCountry) {
    ukCountry = await prisma.country.create({
      data: { name: 'United Kingdom', code: 'GBR' }
    });
  }

  let created = 0;
  for (const item of data) {
    const existing = await prisma.buyer.findUnique({
      where: { name: item.name }
    });
    
    if (!existing) {
      const buyer = await prisma.buyer.create({
        data: {
          id: item.id, // preserve the original ID
          name: item.name,
          countryId: ukCountry.id,
          websites: {
            create: [
              { url: item.website }
            ]
          }
        }
      });
      created++;
      console.log(`✅ Restored: ${buyer.name}`);
    } else {
      // make sure website exists
      const existingWeb = await prisma.website.findFirst({
        where: { buyerId: existing.id, url: item.website }
      });
      if (!existingWeb) {
        await prisma.website.create({
          data: {
            buyer: { connect: { id: existing.id } },
            url: item.website
          }
        });
      }
    }
  }

  console.log(`Finished restoring ${created} new buyers out of ${data.length} total.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
