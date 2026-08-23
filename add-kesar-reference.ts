import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const buyer = await prisma.buyer.findFirst({
      where: { name: 'Kesar Grocery (Jersey City)' }
    });

    if (!buyer) {
      console.log('Buyer not found');
      return;
    }

    await prisma.buyerSignal.create({
      data: {
        buyerId: buyer.id,
        signalType: 'DISCOVERY_SOURCE',
        description: 'Store discovered and added via YouTube video reference. Video: "Finally!! Ghar Final Kar Liya" (https://www.youtube.com/watch?v=AUKSXSjfsO8). Mentions Kesar Grocery from timestamps 9:30 to 10:20.',
      }
    });

    console.log('Successfully added discovery signal reference for Kesar Grocery');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
