import prisma from './src/lib/prisma';

// ============================================================
// ABU DHABI - UAE
// ============================================================
const abuDhabiBuyers = [
  { name: 'Organic Foods & Café', url: 'https://organicfoodsandcafe.com', type: 'Online Delivery Store', focus: 'Organic, Vegan, Gluten-Free, Wellness' },
  { name: 'Organic & Real', url: 'https://organicandreal.com', type: 'Online Delivery Store', focus: 'Certified Organic, Natural, Healthy Foods' },
  { name: 'InstaShop', url: 'https://instashop.com', type: 'Aggregator/Delivery App', focus: 'Multi-Store Grocery Aggregator' },
  { name: 'Talabat Mart', url: 'https://talabat.com', type: 'Quick Commerce/Delivery App', focus: 'Ultra-Fast Grocery Delivery' },
  { name: 'Noon Daily', url: 'https://noon.com', type: 'Online Delivery Store', focus: 'General Grocery, Fresh Produce' },
  { name: 'Carrefour UAE', url: 'https://carrefouruae.com', type: 'Hypermarket/Online Grocery', focus: 'Mass Market, Organic Section' },
  { name: 'LuLu Hypermarket', url: 'https://luluhypermarket.com', type: 'Hypermarket/Online Grocery', focus: 'Mass Market, Indian Products Section' },
];

// ============================================================
// LONDON - UK
// ============================================================
const londonBuyers = [
  { name: 'Planet Organic', url: 'https://planetorganic.com', type: 'Online Delivery Store', focus: 'Certified Organic Supermarket' },
  { name: 'Organic Delivery Company', url: 'https://organicdeliverycompany.co.uk', type: 'Online Delivery Store', focus: 'London Organic Delivery, Herbs & Spices' },
  { name: 'Buy Whole Foods Online', url: 'https://buywholefoodsonline.co.uk', type: 'Online Delivery Store', focus: 'Bulk Organic Spices, Turmeric' },
  { name: 'Riverford Organic Farmers', url: 'https://riverford.co.uk', type: 'Online Delivery Store', focus: 'Farm-to-Door Organic Boxes' },
  { name: 'Abel & Cole', url: 'https://abelandcole.co.uk', type: 'Online Delivery Store', focus: 'Organic Produce Boxes, Spices' },
  { name: 'Natoora', url: 'https://natoora.com', type: 'Online Delivery Store', focus: 'Premium Seasonal Produce' },
  { name: 'London Grocery', url: 'https://londongrocery.net', type: 'Online Delivery Store', focus: 'Asian Organic Produce Delivery' },
  { name: 'Quality Foods Online UK', url: 'https://qualityfoodsonline.com', type: 'Online Delivery Store', focus: 'Indian Groceries & Spices UK-Wide' },
  { name: 'Lakshmi Stores UK', url: 'https://lakshmistores.com', type: 'Online Delivery Store', focus: 'Indian Spices, Fresh Produce' },
];

// ============================================================
// BIRMINGHAM - UK
// ============================================================
const birminghamBuyers = [
  { name: 'Steenbergs', url: 'https://steenbergs.co.uk', type: 'Online Delivery Store', focus: 'Organic Spices, Ethical Sourcing' },
  { name: 'Daylesford Organic', url: 'https://daylesford.com', type: 'Online Delivery Store', focus: 'Premium Organic Farm Shop' },
  { name: 'Forest Whole Foods', url: 'https://forestwholefoods.co.uk', type: 'Online Delivery Store', focus: 'Organic Pantry Staples, Indian Spices' },
  { name: 'Real Foods', url: 'https://realfoods.co.uk', type: 'Online Delivery Store', focus: 'Organic Fresh Turmeric, Pantry' },
  { name: 'Spices on the Web', url: 'https://spicesontheweb.com', type: 'Online Delivery Store', focus: 'Organic Turmeric, Wide Spice Selection' },
  { name: 'Bakkali', url: 'https://bakkali.app', type: 'Delivery App', focus: 'Middle Eastern & Asian Groceries' },
];

// ============================================================
// NEW YORK CITY - USA
// ============================================================
const nycBuyers = [
  { name: 'FreshDirect', url: 'https://freshdirect.com', type: 'Online Grocery', focus: 'NYC Grocery Delivery, Fresh Turmeric' },
  { name: 'Kalustyan\'s', url: 'https://kalustyans.com', type: 'Specialty Store/Online', focus: 'Premium Spices, International Foods' },
  { name: 'NY Spice Shop', url: 'https://nyspiceshop.com', type: 'Online Delivery Store', focus: 'Turmeric Powder, Whole Spices' },
  { name: 'Kesar Grocery', url: 'https://kesargrocery.com', type: 'Online Delivery Store', focus: 'Indian Groceries, Fresh Turmeric' },
  { name: 'Duals Natural', url: 'https://dualsnatural.com', type: 'Specialty Herb Shop', focus: 'Herbs, Spices, Brooklyn & Manhattan' },
  { name: 'Quicklly', url: 'https://quicklly.com', type: 'Online Marketplace', focus: 'Indian Organic Groceries, NYC/NJ Delivery' },
  { name: 'Spicy Organic', url: 'https://spicyorganic.com', type: 'Online Delivery Store', focus: 'USDA Certified Organic Spices' },
  { name: 'Banyan Botanicals', url: 'https://banyanbotanicals.com', type: 'Online Delivery Store', focus: 'Organic Ayurvedic Turmeric, Fair-Trade' },
  { name: 'Pure Indian Foods', url: 'https://pureindianfoods.com', type: 'Online Delivery Store', focus: 'High-Curcumin Organic Turmeric' },
];

// ============================================================
// NEW JERSEY - USA
// ============================================================
const njBuyers = [
  { name: 'VrajFresh', url: 'https://vrajfresh.com', type: 'Online Delivery Store', focus: 'Same-Day Indian Grocery, NJ/NY' },
  { name: 'Patel Brothers', url: 'https://patelbros.com', type: 'Grocery Chain/Online', focus: 'Indian Groceries, Nationwide Chain' },
  { name: 'Apna Bazar NJ', url: 'https://apnabazarnj.com', type: 'Grocery Store/Online', focus: 'Indian Groceries, Multiple NJ Locations' },
];

// ============================================================
// HELPER: Ensure Country + Region exist
// ============================================================
async function ensureCountryAndRegion(countryName: string, countryCode: string, regionName: string) {
  let country = await prisma.country.findFirst({ where: { name: countryName } });
  if (!country) {
    country = await prisma.country.create({ data: { name: countryName, code: countryCode } });
    console.log(`  Created country: ${countryName}`);
  }

  let region = await prisma.targetRegion.findFirst({ where: { name: regionName, countryId: country.id } });
  if (!region) {
    region = await prisma.targetRegion.create({
      data: { name: regionName, countryId: country.id, status: 'RESEARCHING', priority: 'HIGH' }
    });
    console.log(`  Created region: ${regionName}`);
  }

  return { country, region };
}

// ============================================================
// HELPER: Insert buyers for a region
// ============================================================
async function insertBuyers(buyers: { name: string; url: string; type: string; focus: string }[], countryId: string, regionId: string, cityName: string) {
  let inserted = 0;
  let skipped = 0;

  for (const b of buyers) {
    const existing = await prisma.buyer.findFirst({ where: { name: b.name } });
    if (!existing) {
      const buyer = await prisma.buyer.create({
        data: {
          name: b.name,
          companyType: b.type,
          marketFocus: b.focus,
          city: cityName,
          countryId,
          targetRegionId: regionId,
          relationshipStatus: 'NOT_CONTACTED',
          intelligenceScore: 0,
        }
      });

      try {
        await prisma.website.create({
          data: { url: b.url, buyerId: buyer.id }
        });
      } catch (e: any) {
        // URL already exists, skip
      }

      inserted++;
    } else {
      // Link existing buyer to this region if not already linked
      if (!existing.targetRegionId) {
        await prisma.buyer.update({
          where: { id: existing.id },
          data: { targetRegionId: regionId }
        });
      }
      skipped++;
    }
  }

  console.log(`  ${cityName}: ${inserted} inserted, ${skipped} skipped (already exist).`);
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log("=== AMROOT-OS: Area-Wise Expansion Database Injection ===\n");

  // --- ABU DHABI ---
  console.log("[UAE] Abu Dhabi...");
  const { country: uae, region: abuDhabiRegion } = await ensureCountryAndRegion('United Arab Emirates', 'UAE', 'Abu Dhabi');
  await insertBuyers(abuDhabiBuyers, uae.id, abuDhabiRegion.id, 'Abu Dhabi');

  // --- LONDON ---
  console.log("[UK] London...");
  const { country: uk, region: londonRegion } = await ensureCountryAndRegion('United Kingdom', 'GBR', 'London');
  await insertBuyers(londonBuyers, uk.id, londonRegion.id, 'London');

  // --- BIRMINGHAM ---
  console.log("[UK] Birmingham...");
  const { region: birminghamRegion } = await ensureCountryAndRegion('United Kingdom', 'GBR', 'Birmingham');
  await insertBuyers(birminghamBuyers, uk.id, birminghamRegion.id, 'Birmingham');

  // --- NEW YORK CITY ---
  console.log("[USA] New York City...");
  const { country: usa, region: nycRegion } = await ensureCountryAndRegion('United States', 'USA', 'New York City');
  await insertBuyers(nycBuyers, usa.id, nycRegion.id, 'New York City');

  // --- NEW JERSEY ---
  console.log("[USA] New Jersey...");
  const { region: njRegion } = await ensureCountryAndRegion('United States', 'USA', 'New Jersey');
  await insertBuyers(njBuyers, usa.id, njRegion.id, 'New Jersey');

  console.log("\n=== INJECTION COMPLETE ===");
}

main().catch(console.error).finally(() => prisma.$disconnect());
