import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const neonUrl = "postgresql://neondb_owner:npg_EkrjM4a3xyGS@ep-jolly-salad-a1krdwcu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const pool = new Pool({ connectionString: neonUrl, ssl: true });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const buyer = await prisma.buyer.findFirst({
    where: {
      name: {
        contains: 'Shop',
        mode: 'insensitive'
      },
      websites: {
        some: {
          url: {
            contains: 'thespiceworks',
            mode: 'insensitive'
          }
        }
      }
    },
    include: {
      websites: true
    }
  });

  if (!buyer) {
    console.log("Could not find The Spiceworks buyer.");
    // Fallback: Just search by website if name 'Shop' wasn't accurate enough
    const buyerFallback = await prisma.buyer.findFirst({
      where: {
        websites: {
          some: {
            url: {
              contains: 'thespiceworks',
              mode: 'insensitive'
            }
          }
        }
      },
      include: {
        websites: true
      }
    });

    if (!buyerFallback) {
        console.log("Still could not find it. Aborting.");
        return;
    } else {
        console.log("Found using fallback.");
        await updateBuyer(buyerFallback);
    }
  } else {
      await updateBuyer(buyer);
  }
}

async function updateBuyer(buyer: any) {
  console.log(`Found The Spiceworks: ${buyer.name} (${buyer.id})`);

  let newDescription = buyer.description || '';
  if (!newDescription.includes('INFO@thespiceworks.co.uk')) {
      newDescription = `**Email:** INFO@thespiceworks.co.uk\n\n` + newDescription;
  }

  await prisma.buyer.update({
    where: { id: buyer.id },
    data: {
      name: 'THE SPICEWORKS',
      description: newDescription
    }
  });

  const socials = [
    { platform: 'Twitter', url: 'https://x.com/thespiceworks' },
    { platform: 'Facebook', url: 'https://www.facebook.com/thespiceworksonline/' },
    { platform: 'Instagram', url: 'https://www.instagram.com/the_spiceworks_/' }
  ];

  for (const social of socials) {
    const existing = await prisma.socialAccount.findFirst({
      where: {
        buyerId: buyer.id,
        platform: {
          contains: social.platform,
          mode: 'insensitive'
        }
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

  console.log("Updated The Spiceworks information successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
