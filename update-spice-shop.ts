import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const buyer = await prisma.buyer.findFirst({
    where: {
      name: {
        contains: 'spice shop',
        mode: 'insensitive'
      }
    }
  });

  if (!buyer) {
    console.log("Could not find The Spice Shop.");
    return;
  }

  console.log(`Found The Spice Shop: ${buyer.name} (${buyer.id})`);

  // Update description with contact details and address
  const description = `**Address:**\n1 Blenheim Crescent\nLondon\nW11 2EE\n\n**Email:** staff@thespiceshop.co.uk\n\n**Contact Number:** 0207 221 4448`;

  await prisma.buyer.update({
    where: { id: buyer.id },
    data: {
      description,
      address: '1 Blenheim Crescent, London, W11 2EE',
      city: 'London',
    }
  });

  // Ensure social links exist
  const socials = [
    { platform: 'Facebook', url: 'https://www.facebook.com/TheSpiceShop.UK/' },
    { platform: 'Instagram', url: 'https://www.instagram.com/the_spice_shop_brighton/' }
  ];

  for (const social of socials) {
    const existing = await prisma.socialAccount.findFirst({
      where: {
        buyerId: buyer.id,
        platform: social.platform
      }
    });

    if (existing) {
      await prisma.socialAccount.update({
        where: { id: existing.id },
        data: { url: social.url }
      });
    } else {
      await prisma.socialAccount.create({
        data: {
          platform: social.platform,
          url: social.url,
          buyerId: buyer.id
        }
      });
    }
  }

  console.log("Updated The Spice Shop information successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
