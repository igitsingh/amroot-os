const fs = require('fs');
const path = require('path');

const orgsFile = path.join(__dirname, '../src/db/intelligence/brands/organizations.json');
let orgsData = JSON.parse(fs.readFileSync(orgsFile, 'utf-8'));

const suppliersFile = path.join(__dirname, '../src/db/intelligence/suppliers/suppliers.json');
let suppliersData = JSON.parse(fs.readFileSync(suppliersFile, 'utf-8'));

// 1. Move Jaintia Gold, Frontier Co-op, Fuchs Group from orgs to suppliers
const toMoveNames = ["Jaintia Gold", "Frontier Co-op", "Fuchs Group", "Fuchs Gruppe"];

for (const name of toMoveNames) {
  const index = orgsData.findIndex(o => o.name.toLowerCase().includes(name.toLowerCase()));
  if (index !== -1) {
    const org = orgsData[index];
    if (!suppliersData.find(s => s.name === org.name)) {
      suppliersData.push({
        id: `supplier-${org.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: org.name,
        country: "Unknown",
        location: name === "Jaintia Gold" ? "Jaintia Hills, Meghalaya" : (name.includes("Fuchs") ? "Dissen, Germany" : "Norway, Iowa, USA"),
        contact: "Unknown",
        primaryContact: {
          name: "Unknown",
          title: "Sales / Info",
          phone: "Unknown",
          email: "Unknown"
        },
        entityType: name === "Jaintia Gold" ? "Wholesale / B2B Brand" : (name.includes("Fuchs") ? "Global Spice Conglomerate" : "Cooperatively Owned Wholesaler"),
        marketTier: "Premium",
        curcuminContent: name === "Jaintia Gold" ? "7.0 - 12.0" : (name.includes("Fuchs") ? "2.0 - 3.5" : "Minimum 5.0"),
        qualitySpecs: org.notes || "",
        source: org.sourceUrl || "",
        socialMedia: { website: org.sourceUrl || "" },
        intelligenceScore: org.intelligenceScore || 85,
        discoveryMethod: 'Competitor Shift',
        labReports: [],
        shipments: [],
        importers: []
      });
    }
    orgsData.splice(index, 1);
  }
}
fs.writeFileSync(orgsFile, JSON.stringify(orgsData, null, 2));

// 2. Fix the missing information for the 13 manufacturers previously moved
const shiftedIds = [
  "supplier_wacker", "supplier_biomax", "supplier_synthite", "supplier_hindustan_mint",
  "supplier_arjuna", "supplier_svagrofood", "supplier_starhi", "supplier_herboveda",
  "supplier_helmigs", "supplier_javaplant", "supplier_konark", "supplier_rosun", "supplier_sabinsa"
];

for (const supp of suppliersData) {
  if (shiftedIds.includes(supp.id)) {
    // Improve location
    if (supp.name === "WackerChemie AG") supp.location = "Munich, Germany";
    if (supp.name === "BioMaxLifesciences Ltd.") supp.location = "Hyderabad, India";
    if (supp.name === "Synthite Industries Ltd.") supp.location = "Kochi, Kerala, India";
    if (supp.name === "Hindustan Mint & Agro Products Pvt. Ltd.") supp.location = "Chandausi, UP, India";
    if (supp.name === "Arjuna Natural Extracts Ltd.") supp.location = "Kerala, India";
    if (supp.name === "SV Agrofood") supp.location = "Mumbai, India / USA";
    if (supp.name === "Star Hi Herbs Pvt. Ltd.") supp.location = "Bangalore, India";
    if (supp.name === "Herboveda India Pvt. Ltd.") supp.location = "Delhi, India";
    if (supp.name === "Helmigs Prima Sehejtera PT") supp.location = "Surabaya, Indonesia";
    if (supp.name === "Javaplant") supp.location = "Jakarta, Indonesia";
    if (supp.name === "Konark Herbals & Healthcare Pvt. Ltd.") supp.location = "Mumbai, India";
    if (supp.name === "Rosun Natural Products Pvt. Ltd.") supp.location = "Chennai, India / Singapore";
    if (supp.name === "Sabinsa Corporation") supp.location = "East Windsor, NJ, USA / India";

    // Improve Curcumin %
    if (supp.name === "WackerChemie AG") supp.curcuminContent = "Highly Bioavailable Complex";
    if (supp.name === "Synthite Industries Ltd.") supp.curcuminContent = "Standardized Oleoresins";
    if (supp.name === "Arjuna Natural Extracts Ltd.") supp.curcuminContent = "BCM-95 Complex";
    if (supp.name === "Helmigs Prima Sehejtera PT") supp.curcuminContent = "Water-soluble Beverage Extract";
    if (supp.name === "Javaplant") supp.curcuminContent = "Botanical Extract";
    if (supp.name === "Rosun Natural Products Pvt. Ltd.") supp.curcuminContent = "Standardized Extract";
    if (supp.name === "Sabinsa Corporation") supp.curcuminContent = "95% (C3 Complex)";
  }
}

fs.writeFileSync(suppliersFile, JSON.stringify(suppliersData, null, 2));
console.log("Successfully shifted the remaining organizations and enriched the manufacturer data.");
