import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const sharjahBuyers = [
  { name: 'Desi Mart (Sharjah)', url: 'https://desimart.ae/sharjah', type: 'Online Delivery Store', focus: 'Fresh Flours, Spices, Snacks' },
  { name: 'Meena Stores (Sharjah)', url: 'https://meenastores.com/sharjah', type: 'Online Supermarket', focus: 'South Indian Groceries' },
  { name: 'Lulu Hypermarket (Sharjah)', url: 'https://luluhypermarket.com/sharjah', type: 'Hypermarket Chain', focus: 'Comprehensive Indian Groceries Section' },
  { name: 'Nesto Hypermarket (Sharjah)', url: 'https://nestohub.com/sharjah', type: 'Hypermarket Chain', focus: 'South Asian Groceries & Bulk' },
  { name: 'Masakn Mart (Sharjah)', url: 'https://magicpin.ae/sharjah', type: 'Grocery Delivery', focus: 'Local Indian Essentials' }
];

const ajmanBuyers = [
  { name: 'Sandhai (Ajman)', url: 'https://sandhai.ae/ajman', type: 'Online Delivery Store', focus: 'Premium Rice, Lentils, Spices' },
  { name: 'Al Adil Trading (Ajman)', url: 'https://adilstore.com/ajman', type: 'Supermarket Chain/Online', focus: 'Indian Staples & Specialty Spices' },
  { name: 'Lulu Hypermarket (Ajman)', url: 'https://luluhypermarket.com/ajman', type: 'Hypermarket Chain', focus: 'Comprehensive Indian Groceries Section' },
  { name: 'Nesto Hypermarket (Ajman)', url: 'https://nestohub.com/ajman', type: 'Hypermarket Chain', focus: 'South Asian Groceries & Bulk' },
  { name: 'Viva Supermarket (Ajman)', url: 'https://myviva.com/ajman', type: 'Discount Supermarket', focus: 'Affordable Spices & Dry Goods' },
  { name: 'Choithrams (Ajman)', url: 'https://choithrams.com/ajman', type: 'Supermarket Chain', focus: 'Premium Quality Foods, Spices' }
];

export async function GET() {
  try {
    let uae = await prisma.country.findFirst({ where: { name: 'United Arab Emirates' } });
    let sharjah = await prisma.targetRegion.findFirst({ where: { name: 'Sharjah' } });
    let ajman = await prisma.targetRegion.findFirst({ where: { name: 'Ajman' } });

    if (!uae || !sharjah || !ajman) {
      return NextResponse.json({ success: false, error: 'Regions not initialized' }, { status: 400 });
    }

    // Insert Sharjah Buyers
    for (const b of sharjahBuyers) {
      let existing = await prisma.buyer.findFirst({ where: { name: b.name } });
      if (!existing) {
        const buyer = await prisma.buyer.create({
          data: {
            name: b.name,
            companyType: b.type,
            marketFocus: b.focus,
            city: 'Sharjah',
            countryId: uae.id,
            targetRegionId: sharjah.id,
            relationshipStatus: 'NOT_CONTACTED',
            intelligenceScore: 82,
            procurement: {
              create: { organic: true, importOrigins: ['India', 'Asia'] }
            },
            productIntelligence: {
              create: { buysOrganicTurmeric: true, buysSpices: true }
            }
          }
        });
        
        try {
          await prisma.website.create({
            data: { url: b.url, buyerId: buyer.id }
          });
        } catch (e) {
          console.log('Website might exist:', b.url);
        }
      }
    }

    // Insert Ajman Buyers
    for (const b of ajmanBuyers) {
      let existing = await prisma.buyer.findFirst({ where: { name: b.name } });
      if (!existing) {
        const buyer = await prisma.buyer.create({
          data: {
            name: b.name,
            companyType: b.type,
            marketFocus: b.focus,
            city: 'Ajman',
            countryId: uae.id,
            targetRegionId: ajman.id,
            relationshipStatus: 'NOT_CONTACTED',
            intelligenceScore: 82,
            procurement: {
              create: { organic: true, importOrigins: ['India'] }
            },
            productIntelligence: {
              create: { buysOrganicTurmeric: true, buysSpices: true }
            }
          }
        });
        
        try {
          await prisma.website.create({
            data: { url: b.url, buyerId: buyer.id }
          });
        } catch (e) {
          console.log('Website might exist:', b.url);
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Sharjah and Ajman Injection Complete' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
