import prisma from '@/lib/prisma';
import BuyersView from './BuyersView';

export const metadata = {
  title: 'Global Buyers Intelligence | Amroot OS',
  description: 'Enterprise Buyer Intelligence Platform for Amroot Organics',
};

export const dynamic = 'force-dynamic';

export default async function BuyersPage() {
  // Fetch buyers from DB (will be empty initially)
  // Catching DB errors during build in case the db isn't fully seeded/pushed yet
  let buyers: any[] = [];
  let customLists: any[] = [];
  let targetRegions: any[] = [];
  try {
    buyers = await prisma.buyer.findMany({
      include: {
        procurement: true,
        productIntelligence: true,
        decisionMakers: true,
        country: true,
        websites: true,
        socialAccounts: true,
        certifications: true,
      }
    });

    const dbLists = await prisma.customList.findMany({
      include: {
        buyers: { select: { id: true } }
      },
      orderBy: { updatedAt: 'desc' }
    });

    customLists = dbLists.map(list => ({
      id: list.id,
      name: list.name,
      region: list.region || 'Global',
      color: list.color || 'bg-[#F16775]/20 text-[#F16775]',
      count: list.count,
      buyerIds: list.buyers.map(b => b.id),
      updated: list.updatedAt.toISOString(),
    }));

    targetRegions = await prisma.targetRegion.findMany({
      include: {
        country: true,
        buyers: {
          include: {
            websites: true,
            signals: true,
          }
        },
      }
    });
  } catch (err) {
    console.error("Error fetching buyers, table might not exist yet:", err);
  }

  return <BuyersView initialBuyers={buyers} initialCustomLists={customLists} initialTargetRegions={targetRegions} />;
}
