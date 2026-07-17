import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const lists = await prisma.customList.findMany({
      include: {
        buyers: {
          select: { id: true }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    // Format for the client
    const formattedLists = lists.map(list => ({
      id: list.id,
      name: list.name,
      region: list.region || 'Global',
      color: list.color || 'bg-[#F16775]/20 text-[#F16775]',
      count: list.count,
      buyerIds: list.buyers.map(b => b.id),
      updated: list.updatedAt.toISOString(),
    }));

    return NextResponse.json(formattedLists);
  } catch (error) {
    console.error('Error fetching custom lists:', error);
    return NextResponse.json({ error: 'Failed to fetch lists' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, listId, name, buyerIds } = body;

    if (action === 'create') {
      if (!name || !buyerIds || !Array.isArray(buyerIds)) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }

      const newList = await prisma.customList.create({
        data: {
          name,
          count: buyerIds.length,
          buyers: {
            connect: buyerIds.map((id: string) => ({ id }))
          }
        },
        include: {
          buyers: {
            select: { id: true }
          }
        }
      });

      return NextResponse.json({
        id: newList.id,
        name: newList.name,
        region: newList.region || 'Global',
        color: newList.color || 'bg-[#F16775]/20 text-[#F16775]',
        count: newList.count,
        buyerIds: newList.buyers.map(b => b.id),
        updated: newList.updatedAt.toISOString(),
      });
    } else if (action === 'update') {
      if (!listId || !buyerIds || !Array.isArray(buyerIds)) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }

      // We need to fetch the existing list first to append, or we can just connect the new ones
      const existingList = await prisma.customList.findUnique({
        where: { id: listId },
        include: { buyers: { select: { id: true } } }
      });

      if (!existingList) {
        return NextResponse.json({ error: 'List not found' }, { status: 404 });
      }

      const existingBuyerIds = existingList.buyers.map(b => b.id);
      const allIds = Array.from(new Set([...existingBuyerIds, ...buyerIds]));

      const updatedList = await prisma.customList.update({
        where: { id: listId },
        data: {
          count: allIds.length,
          buyers: {
            connect: allIds.map(id => ({ id }))
          }
        },
        include: {
          buyers: {
            select: { id: true }
          }
        }
      });

      return NextResponse.json({
        id: updatedList.id,
        name: updatedList.name,
        region: updatedList.region || 'Global',
        color: updatedList.color || 'bg-[#F16775]/20 text-[#F16775]',
        count: updatedList.count,
        buyerIds: updatedList.buyers.map(b => b.id),
        updated: updatedList.updatedAt.toISOString(),
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error modifying custom list:', error);
    return NextResponse.json({ error: 'Failed to modify list' }, { status: 500 });
  }
}
