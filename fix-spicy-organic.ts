import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const buyer = await prisma.buyer.findFirst({ where: { name: 'Spicy Organic' } });
    
    if (!buyer) {
      console.log('Spicy Organic buyer not found');
      return;
    }

    console.log('Found buyer:', buyer.name, 'in city:', buyer.city);

    // Check if they already have a website
    const existingWebsite = await prisma.website.findFirst({ where: { buyerId: buyer.id } });
    
    if (existingWebsite) {
      console.log('Website already exists for this buyer:', existingWebsite.url);
      return;
    }

    // Try to add the website. The URL is likely spicyorganic.com
    await prisma.website.create({
      data: { url: 'https://spicyorganic.com', buyerId: buyer.id }
    });

    console.log('Successfully added website link for Spicy Organic');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
