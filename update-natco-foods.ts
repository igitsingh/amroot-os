import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const natco = await prisma.buyer.findFirst({
    where: {
      name: {
        contains: 'natco',
        mode: 'insensitive'
      }
    }
  });

  if (!natco) {
    console.log("Could not find Natco Foods.");
    return;
  }

  console.log(`Found Natco Foods: ${natco.name} (${natco.id})`);

  // Update description with contact details and address
  const description = `**Address:** 9 Davy Rd, Clacton-on-Sea, Essex, CO15 4XD\n\n**Emails:**\n- General: info@natcofoods.com\n- Sales: sales@natcofoods.com\n- Technical: technical@ukblending.com\n\n**Phone Numbers:**\n- 01280 825430\n- +44 (0) 1255 225 002\n- +44 (0) 1255 225 003\n- +44 (0) 7912 297 765`;

  await prisma.buyer.update({
    where: { id: natco.id },
    data: {
      description,
      city: 'Clacton-on-Sea',
    }
  });

  // Ensure social links exist
  const socials = [
    { platform: 'Store', url: 'https://shop.natcofoods.com/' },
    { platform: 'Instagram', url: 'https://www.instagram.com/ukblending/' },
    { platform: 'Facebook', url: 'https://www.facebook.com/ukblendingltd/' }
  ];

  for (const social of socials) {
    const existing = await prisma.socialAccount.findFirst({
      where: {
        buyerId: natco.id,
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
          buyerId: natco.id
        }
      });
    }
  }

  console.log("Updated Natco Foods information successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
