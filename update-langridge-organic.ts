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
        contains: 'langridge',
        mode: 'insensitive'
      }
    }
  });

  if (!buyer) {
    console.log("Could not find Langridge Organic.");
    return;
  }

  console.log(`Found Langridge Organic: ${buyer.name} (${buyer.id})`);

  // Update description with contact details and address
  const description = `**Email:** sales@langridgeorganic.com\n\n**Phone:** 020 7622 7440\n\n**Fax:** 0845 643 0732\n\n**Address:** Feltham, West London, TW13 7DU\n\n**Office Opening Hours:**\n- Monday: 7.00 am to 2.00 pm\n- Tuesday: 7.00 am to 2.00 pm\n- Wednesday: 7.00 am to 2.00 pm\n- Thursday: 7.00 am to 2.00 pm\n- Friday: 7.00 am to 2.00 pm\n- Saturday: Closed\n- Sunday: Closed\n\n**Warehouse Opening Hours:**\n- Deliveries: Sunday - Friday From 10.00 pm until Midday.`;

  await prisma.buyer.update({
    where: { id: buyer.id },
    data: {
      description,
      address: 'Feltham, West London, TW13 7DU',
      city: 'London',
    }
  });

  console.log("Updated Langridge Organic information successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
