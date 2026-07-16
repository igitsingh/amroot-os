import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const infinity = await prisma.buyer.findFirst({
    where: {
      name: {
        contains: 'infinity',
        mode: 'insensitive'
      }
    }
  });

  if (!infinity) {
    console.log("Could not find Infinity Foods Wholesale.");
    return;
  }

  console.log(`Found Infinity Foods: ${infinity.name} (${infinity.id})`);

  // Update description with contact details
  const description = `**Address:**\n46 Dolphin Road\nShoreham-by-Sea\nWest Sussex\nBN43 6PB\nUK\n\n**Contact Number:** +44 (0)1273 456376`;

  await prisma.buyer.update({
    where: { id: infinity.id },
    data: {
      description,
      address: '46 Dolphin Road, Shoreham-by-Sea, West Sussex, BN43 6PB, UK',
      city: 'Shoreham-by-Sea',
    }
  });

  // Ensure social links exist
  const socials = [
    { platform: 'Facebook', url: 'https://www.facebook.com/Infinityfoodswholesale/?locale=en_GB' },
    { platform: 'Instagram', url: 'https://www.instagram.com/infinityfoodswholesale/?hl=en' }
  ];

  for (const social of socials) {
    const existing = await prisma.socialAccount.findFirst({
      where: {
        buyerId: infinity.id,
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
          buyerId: infinity.id
        }
      });
    }
  }

  console.log("Updated Infinity Foods information successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
