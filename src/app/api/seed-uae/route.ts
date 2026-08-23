import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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

export async function GET() {
  try {
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
            intelligenceScore: 85,
            procurement: {
              create: {
                organic: true,
                importOrigins: ['Asia', 'Europe']
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
      } else {
        await prisma.buyer.update({
          where: { id: existing.id },
          data: { targetRegionId: dubai.id }
        });
      }
    }

    return NextResponse.json({ success: true, message: 'UAE DB Injection Complete' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
