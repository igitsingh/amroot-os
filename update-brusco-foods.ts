import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const brusco = await prisma.buyer.findFirst({
    where: {
      name: {
        contains: 'brusco',
        mode: 'insensitive'
      }
    }
  });

  if (!brusco) {
    console.log("Could not find Brusco Foods.");
    return;
  }

  console.log(`Found Brusco Foods: ${brusco.name} (${brusco.id})`);

  // Update description with contact details
  const description = `**Email:** info@brusco.co.uk\n\n**Contact Number:** +44 (0) 1386 761555`;

  await prisma.buyer.update({
    where: { id: brusco.id },
    data: {
      description,
    }
  });

  // Ensure social links exist
  const socials = [
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/bruscofoodgroup' },
    { platform: 'Instagram', url: 'https://www.instagram.com/bruscofoodgroup/' },
    { platform: 'Facebook', url: 'https://www.facebook.com/BruscoFoodGroup' }
  ];

  for (const social of socials) {
    const existing = await prisma.socialAccount.findFirst({
      where: {
        buyerId: brusco.id,
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
          buyerId: brusco.id
        }
      });
    }
  }

  console.log("Updated Brusco Foods information successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
