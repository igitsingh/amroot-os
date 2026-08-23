import prisma from './src/lib/prisma';

const uaeBuyers = [
  { name: 'Emirates Bio Farm', url: 'https://emiratesbiofarm.com', type: 'Farm/Online Delivery Store', focus: 'Certified Organic, Farm-to-Table' },
  { name: 'Greenheart Organic Farms', url: 'https://greenheartuae.com', type: 'Online Delivery Store', focus: 'Premium Organic Local & Imported' },
  { name: 'Ripe Organic', url: 'https://ripeme.com', type: 'Online Delivery Store', focus: 'Organic, Wellness' },
  { name: "Let's Organic", url: 'https://letsorganic.com', type: 'Online Delivery Store', focus: 'Certified Organic Groceries' },
  { name: 'Biorganic', url: 'https://biorganicstore.com', type: 'Online Delivery Store', focus: 'Organic Produce, Supplements' },
  { name: 'Rootz Organics', url: 'https://rootzorganics.com', type: 'Online Delivery Store', focus: 'Organic Food & Groceries' },
  { name: 'Kibsons', url: 'https://kibsons.com', type: 'Importer/Online Grocery', focus: 'Mid-Market, Premium Organic Section' },
  { name: 'Barakat Fresh', url: 'https://barakatfresh.ae', type: 'Online Grocery', focus: 'Fresh Produce, Organic Section' },
  { name: 'QualityFood', url: 'https://qualityfood.ae', type: 'Online Delivery Store', focus: 'Premium Groceries' }
];

async function main() {
  console.log("Starting UAE Database Injection...");

  let uae = await prisma.country.findFirst({ where: { name: 'United Arab Emirates' } });
  if (!uae) {
    uae = await prisma.country.create({
      data: { name: 'United Arab Emirates', code: 'UAE' }
    });
  }

  let dubai = await prisma.targetRegion.findFirst({ where: { name: 'Dubai' } });
  if (!dubai) {
    dubai = await prisma.targetRegion.create({
      data: { name: 'Dubai', countryId: uae.id, status: 'RESEARCHING', priority: 'HIGH' }
    });
  }

  let abuDhabi = await prisma.targetRegion.findFirst({ where: { name: 'Abu Dhabi' } });
  if (!abuDhabi) {
    abuDhabi = await prisma.targetRegion.create({
      data: { name: 'Abu Dhabi', countryId: uae.id, status: 'RESEARCHING', priority: 'HIGH' }
    });
  }

  for (const b of uaeBuyers) {
    const existing = await prisma.buyer.findFirst({ where: { name: b.name } });
    if (!existing) {
      const buyer = await prisma.buyer.create({
        data: {
          name: b.name,
          companyType: b.type,
          marketFocus: b.focus,
          city: 'Dubai',
          countryId: uae.id,
          targetRegionId: dubai.id,
          relationshipStatus: 'NOT_CONTACTED',
          intelligenceScore: 85, // Pre-calculated high baseline
          procurement: {
            create: {
              organic: true,
              importOrigins: ['Asia', 'Europe'] // Generic starting point
            }
          },
          productIntelligence: {
            create: {
              buysOrganicTurmeric: true,
              buysOrganicGinger: true,
              buysSpices: true
            }
          }
        }
      });
      
      await prisma.website.create({
        data: {
          url: b.url,
          buyerId: buyer.id
        }
      });

      console.log(`Inserted: ${b.name}`);
    } else {
      console.log(`Skipped (already exists): ${b.name}`);
      // Ensure targetRegionId is set
      await prisma.buyer.update({
        where: { id: existing.id },
        data: { targetRegionId: dubai.id }
      });
    }
  }

  console.log("UAE DB Injection Complete.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
