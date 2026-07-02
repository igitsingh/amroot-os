const fs = require('fs');
const path = require('path');

const SUPPLIERS_FILE = path.join(__dirname, '../src/db/intelligence/suppliers/suppliers.json');
const suppliersData = JSON.parse(fs.readFileSync(SUPPLIERS_FILE, 'utf-8'));

const nahar = {
  id: "supplier-nahar-organics",
  name: "Nahar Organics",
  country: "India",
  location: "Guwahati, Assam",
  contact: "Suraj Baruah",
  primaryContact: {
    name: "Suraj Baruah",
    title: "Business Development Associate",
    phone: "+91-9287501662 / +91-8840243048",
    email: "bassociate45@gmail.com / info@naharorganics.com"
  },
  discoveryMethod: "Inbound WhatsApp",
  entityType: "Supplier",
  marketTier: "Premium",
  curcuminContent: "Unknown",
  qualitySpecs: "Premium range of spices & herbs, NPOP/NOP products",
  certifications: ["GST", "NPOP/NOP"],
  heavyMetalsDyes: "Unknown",
  source: "WhatsApp Lead & GST Certificate",
  socialMedia: {
    website: "https://www.naharorganics.com"
  },
  intelligenceScore: 85,
  labReports: [],
  shipments: [],
  importers: [],
  pricing: {
    premiumPositioning: "Wholesale",
    "Lakadong Turmeric Slice": "340/kg (ex factory)",
    "Lakadong Turmeric Powder": "480/kg (ex factory)"
  }
};

// Check if exists
if (!suppliersData.find(s => s.name === nahar.name)) {
  suppliersData.push(nahar);
  fs.writeFileSync(SUPPLIERS_FILE, JSON.stringify(suppliersData, null, 2));
  console.log("Successfully added Nahar Organics to suppliers.json");
} else {
  console.log("Nahar Organics already exists.");
}
