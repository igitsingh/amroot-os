import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import axios from 'axios';
import * as cheerio from 'cheerio';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeCompany(buyerId: string, url: string, name: string) {
  console.log(`[${name}] Scraping ${url}...`);
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': USER_AGENT },
      timeout: 10000,
    });
    
    const $ = cheerio.load(response.data);
    
    const links = new Set<string>();
    const emails = new Set<string>();
    const phones = new Set<string>();
    
    $('a').each((i, el) => {
      let href = $(el).attr('href');
      if (!href) return;
      href = href.trim();
      
      if (href.startsWith('mailto:')) {
        const email = href.replace('mailto:', '').split('?')[0].trim();
        if (email) emails.add(email);
      } else if (href.startsWith('tel:')) {
        const phone = href.replace('tel:', '').trim();
        if (phone) phones.add(phone);
      } else if (
        href.includes('facebook.com') ||
        href.includes('instagram.com') ||
        href.includes('linkedin.com') ||
        href.includes('youtube.com') ||
        href.includes('twitter.com')
      ) {
        links.add(href);
      }
    });
    
    const textContent = $('body').text();
    const addressRegex = /\\b(?:Straße|Str\\.|Weg|Platz|Allee|Ring)[\\s\\S]{1,100}?(?:Berlin|Hamburg|München|Köln|Frankfurt|Stuttgart|Düsseldorf|Leipzig|Dortmund|Essen|Bremen|Dresden|Hannover|Nürnberg|Duisburg|Bochum|Wuppertal|Bielefeld|Bonn|Münster|Karlsruhe|Mannheim|Augsburg|Wiesbaden|Gelsenkirchen|Mönchengladbach|Braunschweig|Chemnitz|Kiel|Aachen|Halle|Magdeburg|Freiburg|Krefeld|Lübeck|Oberhausen|Erfurt|Mainz|Rostock|Kassel|Hagen|Hamm|Saarbrücken|Mülheim|Potsdam|Ludwigshafen|Oldenburg|Leverkusen|Osnabrück|Solingen|Heidelberg|Herne|Neuss|Darmstadt|Paderborn|Regensburg|Ingolstadt|Würzburg|Fürth|Wolfsburg|Offenbach|Ulm|Heilbronn|Pforzheim|Göttingen|Bottrop|Trier|Recklinghausen|Reutlingen|Bremerhaven|Koblenz|Bergisch Gladbach|Jena|Remscheid|Erlangen|Moers|Siegen|Hildesheim|Salzgitter|Kaiserslautern|Germany|Deutschland)\\b/gi;
    const foundAddresses = [...textContent.matchAll(addressRegex)].map(m => m[0].replace(/\\s+/g, ' ').trim());
    
    const uniqueLinks = Array.from(links);
    const uniqueEmails = Array.from(emails);
    const uniquePhones = Array.from(phones);
    
    console.log(`[${name}] Found ${uniqueLinks.length} social links, ${uniqueEmails.length} emails, ${uniquePhones.length} phones.`);
    
    const updateData: any = {};
    const descriptionLines = [];
    
    if (uniqueEmails.length > 0) {
      descriptionLines.push(`**Emails Found:**\\n` + uniqueEmails.map(e => `- ${e}`).join('\\n'));
    }
    if (uniquePhones.length > 0) {
      descriptionLines.push(`**Phones Found:**\\n` + uniquePhones.map(p => `- ${p}`).join('\\n'));
    }
    if (foundAddresses.length > 0) {
      const bestAddress = foundAddresses[0];
      descriptionLines.push(`**Possible Address Found:**\\n${bestAddress}`);
      updateData.address = bestAddress;
    }
    
    if (descriptionLines.length > 0) {
      const existing = await prisma.buyer.findUnique({ where: { id: buyerId }});
      if (existing) {
        let newDesc = existing.description ? existing.description + '\\n\\n--- [Auto Extracted] ---\\n\\n' : '--- [Auto Extracted] ---\\n\\n';
        newDesc += descriptionLines.join('\\n\\n');
        updateData.description = newDesc;
        await prisma.buyer.update({
          where: { id: buyerId },
          data: updateData
        });
      }
    }
    
    for (const link of uniqueLinks) {
      let platform = 'Other';
      if (link.includes('facebook.com')) platform = 'Facebook';
      if (link.includes('instagram.com')) platform = 'Instagram';
      if (link.includes('linkedin.com')) platform = 'LinkedIn';
      if (link.includes('youtube.com')) platform = 'YouTube';
      if (link.includes('twitter.com')) platform = 'Twitter';
      
      const existingSocial = await prisma.socialAccount.findFirst({
        where: {
          buyerId: buyerId,
          url: link
        }
      });
      
      if (!existingSocial) {
        try {
          await prisma.socialAccount.create({
            data: {
              platform,
              url: link,
              buyerId: buyerId
            }
          });
        } catch (e) {
          console.log(`Failed to create social account ${link}`);
        }
      }
    }
    
  } catch (error: any) {
    console.log(`[${name}] Failed to scrape ${url}: ${error.message}`);
  }
}

async function main() {
  const germanyCountry = await prisma.country.findFirst({
    where: { name: 'Germany' }
  });
  
  if (!germanyCountry) {
    console.log("Could not find Germany country in db");
    return;
  }

  const buyers = await prisma.buyer.findMany({
    where: { countryId: germanyCountry.id },
    include: { websites: true }
  });

  console.log(`Processing ${buyers.length} Germany companies...`);
  
  for (const buyer of buyers) {
    if (buyer.websites.length > 0) {
      const url = buyer.websites[0].url;
      await scrapeCompany(buyer.id, url, buyer.name);
      await delay(1000); // polite delay
    } else {
      console.log(`[${buyer.name}] No website found in database.`);
    }
  }
  
  console.log("Finished scraping all Germany companies.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
