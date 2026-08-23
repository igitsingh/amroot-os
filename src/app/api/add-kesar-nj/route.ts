import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const buyer = await prisma.buyer.findFirst({ where: { name: 'Spicy Organic' } });
    if (!buyer) {
      return NextResponse.json({ success: false, error: 'Buyer not found' }, { status: 404 });
    }

    const existingWebsite = await prisma.website.findFirst({ where: { buyerId: buyer.id } });
    if (existingWebsite) {
      return NextResponse.json({ success: true, message: 'Website already linked', url: existingWebsite.url });
    }

    try {
      await prisma.website.create({
        data: { url: 'https://spicyorganic.com', buyerId: buyer.id }
      });
      return NextResponse.json({ success: true, message: 'Website link added for Spicy Organic' });
    } catch (e: any) {
      // Unique constraint?
      await prisma.website.create({
        data: { url: 'https://spicyorganic.com/nyc', buyerId: buyer.id }
      });
      return NextResponse.json({ success: true, message: 'Website link (nyc) added for Spicy Organic' });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
