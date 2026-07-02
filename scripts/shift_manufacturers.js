const fs = require('fs');
const path = require('path');

// The B2B manufacturers from competitors-rich.ts
const manufacturersToShift = [
  {
    id: "comp_wacker",
    name: "WackerChemie AG",
    description: "Produces CAVACURMIN®, a highly bioavailable curcumin complex using proprietary gamma-cyclodextrin encapsulation.",
    intelligenceScore: 98,
    websites: [{ id: "w1", url: "https://www.wacker.com", title: "Official Website" }],
    contactInfo: { email: "info@wacker.com", phone: "+49 89 6279-0" }
  },
  {
    id: "comp_biomax",
    name: "BioMaxLifesciences Ltd.",
    description: "Indian manufacturer of high-potency herbal extracts, including Curcumin >95% and water-soluble curcumin granules.",
    intelligenceScore: 92,
    websites: [{ id: "w2", url: "https://www.biomaxls.com", title: "Official Website" }],
    contactInfo: { email: "info@biomaxls.com", phone: "+91-40-2337 4000" }
  },
  {
    id: "comp_synthite",
    name: "Synthite Industries Ltd.",
    description: "Major global manufacturer of spice and botanical extracts. Also operates the NatXtra consumer nutraceutical brand.",
    intelligenceScore: 95,
    websites: [{ id: "w3", url: "https://www.synthite.com", title: "Official Website" }],
    contactInfo: { email: "info@synthite.com", phone: "+91-484-2866600" }
  },
  {
    id: "comp_hindustan_mint",
    name: "Hindustan Mint & Agro Products Pvt. Ltd.",
    description: "Manufacturer of various herbal extracts, including Turmeric Dry Extract (50% and 95% Curcuminoids).",
    intelligenceScore: 88,
    websites: [{ id: "w4", url: "http://www.hindustanmint.com", title: "Official Website" }],
    contactInfo: { email: "hindustan@hindustanmint.in", phone: "+91-5921-250540" }
  },
  {
    id: "comp_arjuna",
    name: "Arjuna Natural Extracts Ltd.",
    description: "Creators of BCM-95® (Curcugreen®), a patented extract combining curcuminoids with turmeric essential oil (45% Ar-turmerone).",
    intelligenceScore: 99,
    websites: [{ id: "w5", url: "https://arjunanatural.com", title: "Official Website" }],
    contactInfo: { email: "info@arjunanatural.com", phone: "+91-484-4080400" }
  },
  {
    id: "comp_svagrofood",
    name: "SV Agrofood",
    description: "Manufacturer, exporter, and supplier of herbal extracts, including Curcumin 95% extracts, with facilities in India and the US.",
    intelligenceScore: 85,
    websites: [{ id: "w6", url: "http://svagrofood.com", title: "Official Website" }],
    contactInfo: { email: "vn@svagrofood.com", phone: "+91-9769880079" }
  },
  {
    id: "comp_starhi",
    name: "Star Hi Herbs Pvt. Ltd.",
    description: "Bangalore-based supplier of Curcumin 95% and other herbal extracts.",
    intelligenceScore: 82,
    websites: [{ id: "w7", url: "http://starhiherbs.com", title: "Official Website" }],
    contactInfo: { email: "starhi@starhiherbs.com", phone: "+91-9886422452" }
  },
  {
    id: "comp_herboveda",
    name: "Herboveda India Pvt. Ltd.",
    description: "Offers curcumin extract powder (95%) along with various API raw materials.",
    intelligenceScore: 80,
    websites: [{ id: "w8", url: "http://herbovedacare.in", title: "Official Website" }],
    contactInfo: { email: "herbovedaonline@gmail.com", phone: "+91-9717971852" }
  },
  {
    id: "comp_helmigs",
    name: "Helmigs Prima Sehejtera PT",
    description: "Indonesian manufacturer specializing in curcumin-based health drinks and supplements.",
    intelligenceScore: 89,
    websites: [{ id: "w9", url: "https://www.helmigs.com", title: "Official Website" }],
    contactInfo: { email: "mail@helmigs.com", phone: "+62 31 9920 4388" }
  },
  {
    id: "comp_javaplant",
    name: "Javaplant",
    description: "Indonesian-based manufacturer of botanical extracts including turmeric and curcumin.",
    intelligenceScore: 86,
    websites: [{ id: "w10", url: "https://www.javaplant.com", title: "Official Website" }],
    contactInfo: { email: "info@javaplant.com", phone: "Available via website" }
  },
  {
    id: "comp_konark",
    name: "Konark Herbals & Healthcare Pvt. Ltd.",
    description: "Mumbai-based company with dedicated production lines for Curcumin 95% extraction.",
    intelligenceScore: 87,
    websites: [{ id: "w11", url: "http://konarkherbals.com", title: "Official Website" }],
    contactInfo: { email: "herbalsales@konarkgroup.com", phone: "+91-22-6147-5383" }
  },
  {
    id: "comp_rosun",
    name: "Rosun Natural Products Pvt. Ltd.",
    description: "Supplier of various herbal extracts, nutraceutical, and food ingredients, with global marketing in Singapore.",
    intelligenceScore: 84,
    websites: [{ id: "w12", url: "http://www.rosuncoconutproducts.com", title: "Official Website" }],
    contactInfo: { email: "info@rosungroups.com", phone: "+91-90250-44607" }
  },
  {
    id: "comp_sabinsa",
    name: "Sabinsa Corporation",
    description: "Pioneers of Curcumin C3 Complex®, one of the most clinically studied curcumin ingredients in the world.",
    intelligenceScore: 99,
    websites: [{ id: "w13", url: "https://sabinsa.com", title: "Official Website" }],
    contactInfo: { email: "info@sabinsa.com", phone: "+1-732-777-1111" }
  }
];

const suppliersFile = path.join(__dirname, '../src/db/intelligence/suppliers/suppliers.json');
let suppliersData = JSON.parse(fs.readFileSync(suppliersFile, 'utf-8'));

// Format and add to suppliers
for (const m of manufacturersToShift) {
  const existing = suppliersData.find(s => s.name === m.name);
  if (!existing) {
    suppliersData.push({
      id: m.id.replace('comp_', 'supplier_'),
      name: m.name,
      country: m.description.includes('Indian') || m.description.includes('Bangalore') || m.description.includes('Mumbai') ? 'India' : (m.description.includes('Indonesian') ? 'Indonesia' : 'Global'),
      location: 'Unknown',
      contact: 'Unknown',
      primaryContact: {
        name: 'Unknown',
        title: 'Sales / Info',
        phone: m.contactInfo.phone,
        email: m.contactInfo.email
      },
      discoveryMethod: 'Competitor Shift',
      entityType: 'Manufacturer',
      marketTier: 'Premium Extract',
      curcuminContent: m.description.includes('95%') ? 95 : 'Unknown',
      qualitySpecs: m.description,
      certifications: [],
      heavyMetalsDyes: 'Unknown',
      source: 'Competitor DB',
      socialMedia: {
        website: m.websites[0] ? m.websites[0].url : 'Unknown'
      },
      intelligenceScore: m.intelligenceScore,
      labReports: [],
      shipments: [],
      importers: []
    });
  }
}

// 2. Also shift Fuchs Group from organizations.json
const orgsFile = path.join(__dirname, '../src/db/intelligence/brands/organizations.json');
let orgsData = JSON.parse(fs.readFileSync(orgsFile, 'utf-8'));
const fuchsIndex = orgsData.findIndex(o => o.name === 'Fuchs Group');
if (fuchsIndex !== -1) {
  const fuchs = orgsData[fuchsIndex];
  if (!suppliersData.find(s => s.name === fuchs.name)) {
    suppliersData.push({
      id: "supplier_fuchs",
      name: fuchs.name,
      country: "Global",
      location: "Unknown",
      contact: "Unknown",
      entityType: "Manufacturer",
      marketTier: "Industrial",
      curcuminContent: "Unknown",
      qualitySpecs: fuchs.notes || "Global culinary spice manufacturer.",
      source: fuchs.sourceUrl,
      socialMedia: { website: fuchs.sourceUrl },
      intelligenceScore: fuchs.intelligenceScore,
      discoveryMethod: 'Competitor Shift',
      labReports: [],
      shipments: [],
      importers: []
    });
  }
  // Remove from orgs
  orgsData.splice(fuchsIndex, 1);
  fs.writeFileSync(orgsFile, JSON.stringify(orgsData, null, 2));
}

// Write suppliers
fs.writeFileSync(suppliersFile, JSON.stringify(suppliersData, null, 2));

// 3. Empty out the competitors-rich.ts
const tsContent = `export const newCompetitors: any[] = [];\n`;
fs.writeFileSync(path.join(__dirname, '../src/db/intelligence/brands/competitors-rich.ts'), tsContent);

console.log("Successfully shifted B2B manufacturers/suppliers to the suppliers database and cleaned up competitors.");
