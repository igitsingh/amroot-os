const fs = require('fs');
const path = require('path');

const orgsFile = path.join(__dirname, '../src/db/intelligence/brands/organizations.json');
let orgsData = JSON.parse(fs.readFileSync(orgsFile, 'utf-8'));

const suppliersFile = path.join(__dirname, '../src/db/intelligence/suppliers/suppliers.json');
let suppliersData = JSON.parse(fs.readFileSync(suppliersFile, 'utf-8'));

// 1. Remove all instances of Lee's Mumi from organizations.json
orgsData = orgsData.filter(o => !o.name.includes("Lee's Mumi Botanical Extracts"));
fs.writeFileSync(orgsFile, JSON.stringify(orgsData, null, 2));

// 2. Add Lee's Mumi to suppliers.json
if (!suppliersData.find(s => s.name.includes("Lee's Mumi"))) {
  suppliersData.push({
    id: "supplier_lees_mumi",
    name: "Lee's Mumi Botanical Extracts",
    country: "China",
    location: "Shanghai, China",
    contact: "Unknown",
    primaryContact: {
      name: "Unknown",
      title: "Sales / Info",
      phone: "Unknown",
      email: "Unknown"
    },
    entityType: "Botanical Extracts Supplier",
    marketTier: "B2B / Industrial",
    curcuminContent: "N/A",
    qualitySpecs: "LEE'S MUM (SHANGHAI) INDUSTRY DEVELOPMENT CO., LTD.",
    source: "https://leesmum.com",
    socialMedia: { website: "https://leesmum.com" },
    intelligenceScore: 85,
    discoveryMethod: 'Competitor Shift',
    labReports: [],
    shipments: [],
    importers: []
  });
  
  fs.writeFileSync(suppliersFile, JSON.stringify(suppliersData, null, 2));
  console.log("Successfully shifted Lee's Mumi to Suppliers.");
} else {
  console.log("Lee's Mumi already exists in Suppliers.");
}
