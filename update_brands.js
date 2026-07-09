const fs = require('fs');

const updates = {
  "zizira": {
    "websiteUrl": "https://www.zizira.com",
    "curcuminDisplay": "Unknown",
    "positioningTags": "[]",
    "company": "Zizira"
  },
  "pahari-roots": {
    "websiteUrl": "https://pahariroots.co.in",
    "instagramUrl": "https://www.instagram.com/pahariroots.in",
    "facebookUrl": "https://www.facebook.com/pahariroots39",
    "curcuminDisplay": "Unknown",
    "positioningTags": "[]",
    "company": "Pahari Roots"
  },
  "veda360": {
    "websiteUrl": "Not Found",
    "curcuminDisplay": "Not Found / Not Sold",
    "positioningTags": "[\"Verification Failed\"]",
    "company": "Veda360"
  },
  "ecotyl": {
    "websiteUrl": "https://ecotyl.in",
    "curcuminDisplay": "7 - 9%",
    "positioningTags": "[]",
    "company": "Ecotyl"
  },
  "asavi": {
    "websiteUrl": "https://asavifarms.com",
    "curcuminDisplay": "7 - 10%",
    "positioningTags": "[]",
    "company": "ASAVI Farms"
  },
  "daily-farmer": {
    "websiteUrl": "https://www.dailyfarmer.in",
    "curcuminDisplay": "9 - 12%",
    "positioningTags": "[]",
    "company": "Daily Farmer"
  },
  "sarva-foods": {
    "websiteUrl": "https://www.sarvafoods.in",
    "curcuminDisplay": "Up to 8%",
    "positioningTags": "[]",
    "company": "Sarva Foods"
  },
  "honey-spice": {
    "websiteUrl": "https://honeyandspice.in",
    "curcuminDisplay": "7 - 12%",
    "positioningTags": "[]",
    "company": "Honey & Spice"
  },
  "farmers-pride": {
    "websiteUrl": "https://farmerspride.in",
    "curcuminDisplay": "7 - 12%",
    "positioningTags": "[]",
    "company": "Farmers Pride"
  },
  "aamrai-organic": {
    "websiteUrl": "https://aamrai.com",
    "curcuminDisplay": "7 - 12%",
    "positioningTags": "[]",
    "company": "Aamrai Organic"
  }
};

let content = fs.readFileSync('src/data/competitorIntel.ts', 'utf8');

for (const [id, data] of Object.entries(updates)) {
  const regex = new RegExp(`"${id}":\\s*{[^}]*?company":\\s*"[^"]*"[^}]*?websiteUrl":\\s*"[^"]*"[^}]*?curcuminDisplay":\\s*"[^"]*"[^}]*?positioningTags":\\s*\\[.*?\\]`, 'g');
  
  // Actually, since it's a huge nested object, regex might fail. Let's do string replacement per field for that specific block.
  // We'll find the block for the ID, then replace within that block.
  
  const blockStartIdx = content.indexOf(`"${id}": {`);
  if (blockStartIdx === -1) continue;
  
  let nextBlockIdx = content.indexOf('},', blockStartIdx);
  if (nextBlockIdx === -1) nextBlockIdx = content.length; // rough boundary
  // wait, there are nested objects like packaging, pricing. 
  // Let's just do global replace but only within a slice.
  
  let block = content.slice(blockStartIdx, blockStartIdx + 3000); // assume brand block is < 3000 chars
  
  if (data.websiteUrl) block = block.replace(/"websiteUrl":\s*"[^"]*"/, `"websiteUrl": "${data.websiteUrl}"`);
  if (data.instagramUrl) block = block.replace(/"instagramUrl":\s*"[^"]*"/, `"instagramUrl": "${data.instagramUrl}"`);
  if (data.facebookUrl) block = block.replace(/"facebookUrl":\s*"[^"]*"/, `"facebookUrl": "${data.facebookUrl}"`);
  if (data.curcuminDisplay) block = block.replace(/"curcuminDisplay":\s*"[^"]*"/, `"curcuminDisplay": "${data.curcuminDisplay}"`);
  if (data.positioningTags) block = block.replace(/"positioningTags":\s*\[.*?\]/, `"positioningTags": ${data.positioningTags}`);
  if (data.company) block = block.replace(/"company":\s*"[^"]*"/, `"company": "${data.company}"`);
  
  content = content.slice(0, blockStartIdx) + block + content.slice(blockStartIdx + 3000);
}

fs.writeFileSync('src/data/competitorIntel.ts', content);
console.log("Updated!");
