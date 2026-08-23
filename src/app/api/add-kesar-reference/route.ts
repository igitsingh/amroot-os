import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const buyer = await prisma.buyer.findFirst({
      where: { name: 'Kesar Grocery (Jersey City)' }
    });

    if (!buyer) {
      return NextResponse.json({ success: false, error: 'Buyer not found' }, { status: 404 });
    }

    await prisma.buyerSignal.create({
      data: {
        buyerId: buyer.id,
        signalType: 'DISCOVERY_SOURCE',
        description: 'Store discovered and added via YouTube video reference. Video: "Finally!! Ghar Final Kar Liya" (https://www.youtube.com/watch?v=AUKSXSjfsO8). Mentions Kesar Grocery from timestamps 9:30 to 10:20.',
      }
    });

    return NextResponse.json({ success: true, message: 'Successfully added discovery signal reference for Kesar Grocery' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
