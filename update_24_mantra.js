const fs = require('fs');
let content = fs.readFileSync('src/data/competitorIntel.ts', 'utf8');

const id = "24-mantra-organic";
const blockStartIdx = content.indexOf(`"${id}": {`);
let block = content.slice(blockStartIdx, blockStartIdx + 3000);

block = block.replace(/"websiteDisplay":\s*"[^"]*"/, `"websiteDisplay": "24mantraorganic.com"`);
block = block.replace(/"websiteUrl":\s*"[^"]*"/, `"websiteUrl": "https://24mantraorganic.com"`);

block = block.replace(/"instagramUrl":\s*"[^"]*"/, `"instagramUrl": "https://www.instagram.com/24mantraorganic"`);
block = block.replace(/"instagramHandle":\s*"[^"]*"/, `"instagramHandle": "@24mantraorganic"`);
block = block.replace(/"facebookUrl":\s*"[^"]*"/, `"facebookUrl": "https://www.facebook.com/24MantraOrganic"`);
block = block.replace(/"facebookHandle":\s*"[^"]*"/, `"facebookHandle": "@24MantraOrganic"`);

// Add twitter and youtube if they exist, else just add them before parentCompany
if (!block.includes('"twitterUrl"')) {
    block = block.replace(/"parentCompany":/, `"twitterUrl": "https://x.com/24MantraOrganic",\n    "twitterHandle": "@24MantraOrganic",\n    "youtubeUrl": "https://www.youtube.com/channel/UCtK5SRxA4Y0C0JSWYKGfc7Q",\n    "parentCompany":`);
}

// update portfolio
block = block.replace(/portfolio:\s*\[\s*\],/, `portfolio: [\n      {\n        name: "24 Mantra Organic Turmeric Powder",\n        link: "https://24mantraorganic.com",\n        mrp: "Check website"\n      }\n    ],`);

content = content.slice(0, blockStartIdx) + block + content.slice(blockStartIdx + 3000);
fs.writeFileSync('src/data/competitorIntel.ts', content);
