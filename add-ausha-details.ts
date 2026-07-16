import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const buyerName = "Ausha";
  const buyer = await prisma.buyer.findUnique({
    where: { name: buyerName }
  });

  if (!buyer) {
    console.error(`Buyer ${buyerName} not found.`);
    return;
  }

  // Update address
  await prisma.buyer.update({
    where: { id: buyer.id },
    data: {
      address: "Ausha Limited Unit 126,14 Chertsey Road, Woking,Surrey ,GU21 5AH"
    }
  });
  console.log("Updated address for Ausha");

  // Upsert Amazon store website
  const amazonUrl = "https://www.amazon.co.uk/stores/ausha/page/7659DBBA-83CB-4C91-BE8E-7603873486E4?lp_asin=B09CQ1JZZJ&ref_=ast_bln&store_ref=bl_ast_dp_brandlogo_sto&bl_grd_status=override";
  await prisma.website.upsert({
    where: { url: amazonUrl },
    update: { buyerId: buyer.id },
    create: {
      url: amazonUrl,
      buyerId: buyer.id
    }
  });
  console.log("Added Amazon store link");

  // Upsert Instagram
  const igUrl = "https://www.instagram.com/aushafoods/";
  await prisma.socialAccount.upsert({
    where: { url: igUrl },
    update: { buyerId: buyer.id },
    create: {
      platform: "Instagram",
      url: igUrl,
      handle: "@aushafoods",
      buyerId: buyer.id
    }
  });
  console.log("Added Instagram");

  // Upsert YouTube
  const ytUrl = "https://www.youtube.com/@ausha_foods";
  await prisma.socialAccount.upsert({
    where: { url: ytUrl },
    update: { buyerId: buyer.id },
    create: {
      platform: "YouTube",
      url: ytUrl,
      handle: "@ausha_foods",
      buyerId: buyer.id
    }
  });
  console.log("Added YouTube");

  // We already added decision makers for Ausha. We'll update the Founding Team with the email and phone.
  await prisma.buyerDecisionMaker.updateMany({
    where: { buyerId: buyer.id, fullName: "Founding Team" },
    data: {
      businessEmail: "info@ausha.co.uk",
      businessPhone: "+44 7854 953724"
    }
  });
  console.log("Updated Decision Maker contacts for Ausha");

}

main().catch(console.error).finally(() => prisma.$disconnect());
