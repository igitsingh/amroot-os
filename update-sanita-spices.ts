import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const sanita = await prisma.buyer.findFirst({
    where: {
      name: {
        contains: 'sanita',
        mode: 'insensitive'
      }
    }
  });

  if (!sanita) {
    console.log("Could not find Sanita Spices.");
    return;
  }

  console.log(`Found Sanita Spices: ${sanita.name} (${sanita.id})`);

  // Update description with contact details
  const description = `**Address:**\nUnit 7 Theobalds Park Road\nEN2 9BQ Enfield, London\n\n**Email:** info@sanitaspices.co.uk\n\n**Contact Numbers:**\n- +44 7570 067878\n- +44 20 8064 2627\n- WhatsApp: tel:+44 7570 067878`;

  await prisma.buyer.update({
    where: { id: sanita.id },
    data: {
      description,
      address: 'Unit 7 Theobalds Park Road, EN2 9BQ Enfield, London',
      city: 'Enfield, London',
    }
  });

  // Ensure social links exist
  const socials = [
    { platform: 'Instagram', url: 'https://www.instagram.com/sanita_uk_london/' },
    { platform: 'Facebook', url: 'https://www.facebook.com/SanitaSpicesUK' },
    { platform: 'YouTube', url: 'https://www.youtube.com/watch?v=p9jD63Bq2kw' }
  ];

  for (const social of socials) {
    const existing = await prisma.socialAccount.findFirst({
      where: {
        buyerId: sanita.id,
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
          buyerId: sanita.id
        }
      });
    }
  }

  console.log("Updated Sanita Spices information successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
