import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const count = await prisma.buyer.count();
    return NextResponse.json({ count });
  } catch (error: any) {
    return NextResponse.json({ count: 0, error: error.message }, { status: 500 });
  }
}
