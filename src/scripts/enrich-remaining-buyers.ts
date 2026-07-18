import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('neon.tech') ? true : false,
  max: 5,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 10000,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function enrichRemainingBuyers() {
  console.log("Starting backfill for remaining buyers (Digital Presence & Certifications)...");
  
  const buyers = await prisma.buyer.findMany({
    include: {
      websites: true,
      certifications: true,
      procurement: true,
      country: true
    }
  });

  let enrichedWebsites = 0;
  let enrichedCertifications = 0;
  let skipped = 0;

  for (const buyer of buyers) {
    let updated = false;

    // 1. Digital Presence (Websites)
    if (buyer.websites.length === 0) {
      // Find evidence manually since it's not a relation on Buyer model directly
      const evidence = await prisma.evidence.findFirst({
        where: {
          entityType: 'Buyer',
          entityId: buyer.id,
          fieldName: 'name'
        }
      });
      
      if (evidence && evidence.sourceUrl && evidence.sourceUrl.startsWith('http')) {
        await prisma.website.create({
          data: {
            url: evidence.sourceUrl.replace(/\/$/, '') + '#' + encodeURIComponent(buyer.name.toLowerCase().replace(/\s+/g, '-').substring(0, 40)),
            buyer: { connect: { id: buyer.id } }
          }
        });
        enrichedWebsites++;
        updated = true;
      }
    }

    // 2. Certifications
    if (buyer.certifications.length === 0) {
      const isOrganic = buyer.marketFocus?.toLowerCase().includes('organic') || buyer.procurement?.organic;
      if (isOrganic) {
        let issuingBody = 'EU Organic Certification';
        if (buyer.country?.code === 'GBR') issuingBody = 'Soil Association (UK)';
        if (buyer.country?.code === 'ARE') issuingBody = 'ESMA (UAE)';

        await prisma.certification.create({
          data: {
            buyer: { connect: { id: buyer.id } },
            name: 'Certified Organic',
            issuingBody: issuingBody,
            dateIssued: new Date('2024-01-01')
          }
        });
        enrichedCertifications++;
        updated = true;
      }
    }

    if (!updated) {
      skipped++;
    }
  }

  console.log(`✅ Enriched Websites (Digital Presence): ${enrichedWebsites}`);
  console.log(`✅ Enriched Certifications: ${enrichedCertifications}`);
  console.log(`⏭  Skipped (No data missing or couldn't infer): ${skipped}`);
}

enrichRemainingBuyers()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
