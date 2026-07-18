import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Local DB
const poolLocal = new Pool({ connectionString: process.env.DATABASE_URL });
const adapterLocal = new PrismaPg(poolLocal);
const prismaLocal = new PrismaClient({ adapter: adapterLocal });

// Neon DB
const neonUrl = "postgresql://neondb_owner:npg_EkrjM4a3xyGS@ep-jolly-salad-a1krdwcu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const poolNeon = new Pool({ connectionString: neonUrl, ssl: true });
const adapterNeon = new PrismaPg(poolNeon);
const prismaNeon = new PrismaClient({ adapter: adapterNeon });

async function main() {
  console.log("Fetching countries...");
  const localCountries = await prismaLocal.country.findMany();
  const neonCountries = await prismaNeon.country.findMany();
  
  const countryIdMap = new Map<string, string>();
  for (const lc of localCountries) {
    const nc = neonCountries.find(c => c.name === lc.name);
    if (nc) {
      countryIdMap.set(lc.id, nc.id);
    }
  }

  console.log("Fetching buyers from local DB...");
  const localBuyers = await prismaLocal.buyer.findMany({
    include: {
      websites: true,
      socialAccounts: true
    }
  });
  console.log(`Found ${localBuyers.length} buyers in local DB.`);

  let created = 0;
  let updated = 0;

  for (const buyer of localBuyers) {
    const existing = await prismaNeon.buyer.findUnique({
      where: { name: buyer.name }
    });

    if (!existing) {
      // Create new buyer in Neon
      const { id, createdAt, updatedAt, websites, socialAccounts, countryId, ...buyerData } = buyer;
      
      const neonCountryId = countryId ? countryIdMap.get(countryId) : null;
      if (!neonCountryId) {
        console.log(`Skipped ${buyer.name}: Country not found in Neon DB`);
        continue;
      }

      try {
        const newBuyer = await prismaNeon.buyer.create({
          data: {
            ...(buyerData as any),
            countryId: neonCountryId,
            websites: {
              connectOrCreate: websites.map(w => ({ where: { url: w.url }, create: { url: w.url } }))
            },
            socialAccounts: {
              connectOrCreate: socialAccounts.map(s => ({ where: { url: s.url }, create: { platform: s.platform, url: s.url } }))
            }
          }
        });
        created++;
        console.log(`✅ Inserted: ${newBuyer.name}`);
      } catch (e: any) {
        console.log(`Error inserting ${buyer.name}: ${e.message}`);
      }
    } else {
      updated++;
    }
  }

  console.log(`Migration complete! Created: ${created}, Updated existing: ${updated}`);
}

main().finally(() => {
  prismaLocal.$disconnect();
  prismaNeon.$disconnect();
});
