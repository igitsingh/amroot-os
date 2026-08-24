import prisma from './src/lib/prisma';

const emiratesData = [
  {
    region: 'Umm Al-Quwain',
    buyers: [
      { name: 'Falik App (UAQ)', url: 'https://falik.com', type: 'Online Delivery App', focus: 'Local Supermarkets' },
      { name: 'Quoodo (UAQ)', url: 'https://quoodo.com?ref=uaq', type: 'Online Delivery Store', focus: 'Northern Emirates Groceries' },
      { name: 'elGrocer (UAQ)', url: 'https://elgrocer.com?ref=uaq', type: 'Online Delivery Aggregator', focus: 'Neighborhood Stores' },
      { name: 'Talabat (UAQ)', url: 'https://talabat.com/uae?ref=uaq', type: 'Online Delivery App', focus: 'Food & Groceries' }
    ]
  },
  {
    region: 'Ras Al Khaimah',
    buyers: [
      { name: 'Al Maya Supermarket (RAK)', url: 'https://almaya.ae', type: 'Online Grocery', focus: 'Supermarket Delivery' },
      { name: 'Spinneys (RAK)', url: 'https://spinneys.com?ref=rak', type: 'Premium Grocery', focus: 'Premium & Organic' },
      { name: 'Quoodo (RAK)', url: 'https://quoodo.com?ref=rak', type: 'Online Delivery Store', focus: 'Northern Emirates Groceries' },
      { name: 'Carrefour UAE (RAK)', url: 'https://carrefouruae.com?ref=rak', type: 'Hypermarket', focus: 'Mass Market & Organic Section' }
    ]
  },
  {
    region: 'Fujairah',
    buyers: [
      { name: 'LuLu Hypermarket (Fujairah)', url: 'https://luluhypermarket.com?ref=fujairah', type: 'Hypermarket', focus: 'Mass Market' },
      { name: 'InstaShop (Fujairah)', url: 'https://instashop.com?ref=fujairah', type: 'Online Delivery App', focus: 'Local Supermarkets' },
      { name: 'Quoodo (Fujairah)', url: 'https://quoodo.com?ref=fujairah', type: 'Online Delivery Store', focus: 'Northern Emirates Groceries' },
      { name: 'Carrefour UAE (Fujairah)', url: 'https://carrefouruae.com?ref=fujairah', type: 'Hypermarket', focus: 'Mass Market' }
    ]
  }
];

async function main() {
  console.log("Starting DB Injection for remaining UAE Emirates...");

  let uae = await prisma.country.findFirst({ where: { name: 'United Arab Emirates' } });
  if (!uae) {
    uae = await prisma.country.create({
      data: { name: 'United Arab Emirates', code: 'UAE' }
    });
  }

  for (const emirate of emiratesData) {
    let region = await prisma.targetRegion.findFirst({ where: { name: emirate.region, countryId: uae.id } });
    if (!region) {
      region = await prisma.targetRegion.create({
        data: { name: emirate.region, countryId: uae.id, status: 'RESEARCHING', priority: 'MEDIUM' }
      });
      console.log(`Created Region: ${emirate.region}`);
    }

    for (const b of emirate.buyers) {
      const existing = await prisma.buyer.findFirst({ where: { name: b.name } });
      if (!existing) {
        const buyer = await prisma.buyer.create({
          data: {
            name: b.name,
            companyType: b.type,
            marketFocus: b.focus,
            city: emirate.region,
            countryId: uae.id,
            targetRegionId: region.id,
            relationshipStatus: 'NOT_CONTACTED',
            intelligenceScore: 80,
            procurement: {
              create: {
                organic: b.focus.toLowerCase().includes('organic'),
                importOrigins: ['Asia', 'Europe', 'Middle East']
              }
            },
            productIntelligence: {
              create: {
                buysOrganicTurmeric: false,
                buysOrganicGinger: false,
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

        console.log(`Inserted Buyer: ${b.name} in ${emirate.region}`);
      } else {
        console.log(`Skipped (already exists): ${b.name}`);
      }
    }
  }

  console.log("DB Injection Complete.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
