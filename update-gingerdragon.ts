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
        contains: 'Ginger Dragon',
        mode: 'insensitive'
      }
    }
  });

  if (!buyer) {
    console.log("Could not find Ginger Dragon Ltd buyer.");
    return;
  }
  
  console.log(`Found Ginger Dragon Ltd: ${buyer.name} (${buyer.id})`);

  let newDescription = buyer.description || '';
  const contactDetails = `**Telephone:** 01825 830 007\n**Fax:** 05603 149 773\n**Hours:** Monday – Friday, 9am to 5pm\n\n`;
  if (!newDescription.includes('01825 830 007')) {
      newDescription = contactDetails + newDescription;
  }

  await prisma.buyer.update({
    where: { id: buyer.id },
    data: {
      address: 'Ginger Dragon Ltd, Huckworthy Lodge, Sampford Spiney, Yelverton, Devon PL20 6LP',
      city: 'Yelverton',
      description: newDescription
    }
  });

  console.log("Updated Ginger Dragon Ltd information successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
