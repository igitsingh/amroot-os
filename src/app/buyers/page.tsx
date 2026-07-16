import prisma from '@/lib/prisma';
import BuyersView from './BuyersView';

export const metadata = {
  title: 'Global Buyers Intelligence | Amroot OS',
  description: 'Enterprise Buyer Intelligence Platform for Amroot Organics',
};

export default async function BuyersPage() {
  // Fetch buyers from DB (will be empty initially)
  // Catching DB errors during build in case the db isn't fully seeded/pushed yet
  let buyers: any[] = [];
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
  } catch (err) {
    console.error("Error fetching buyers, table might not exist yet:", err);
  }

  return <BuyersView initialBuyers={buyers} />;
}
