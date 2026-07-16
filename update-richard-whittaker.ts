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
        contains: 'richard whittaker',
        mode: 'insensitive'
      }
    }
  });

  if (!buyer) {
    console.log("Could not find Richard Whittaker.");
    return;
  }

  console.log(`Found Richard Whittaker: ${buyer.name} (${buyer.id})`);

  // Update description with contact details and address
  const description = `**Registered Company No:** 00731811\n\n**Email:** info@richard-whittaker.co.uk\n\n**Contact Number:** 01706 341700\n\n**Head Office & Warehouse:**\nRichard Whittaker Ltd\nThe Mayfield Centre\nMayfield Street\nRochdale\nOL16 2UZ\n\n**Office Hours:**\n- Monday | 9am - 5:00pm\n- Tuesday | 9am - 5:00pm\n- Wednesday | 9am - 5:00pm\n- Thursday | 9am - 5:00pm\n- Friday | 9am - 2:30pm`;

  await prisma.buyer.update({
    where: { id: buyer.id },
    data: {
      description,
      address: 'The Mayfield Centre, Mayfield Street, Rochdale, OL16 2UZ',
      city: 'Rochdale',
    }
  });

  // Ensure social links exist
  const socials = [
    { platform: 'Google Maps', url: 'https://www.google.com/maps?cid=13622342209769850154&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en-GB&source=embed' }
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

  console.log("Updated Richard Whittaker information successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
