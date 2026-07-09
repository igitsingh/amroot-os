const fs = require('fs');

const currentFile = fs.readFileSync('src/data/competitorIntel.ts', 'utf8');

const brandNames = [
  "Zizira", "Pahari Roots", "Veda360", "Ecotyl", "ASAVI", "Daily Farmer",
  "Sarva Foods", "Honey & Spice", "Farmers Pride", "Aamrai Organic",
  "Meghalayan Age", "Bliss of Earth", "Nature's Velvet", "Bebe Burp",
  "Spice Drop", "Rooted Peepul", "First Bud Organics", "Nutriorg",
  "Umanac", "Pure & Sure", "The Indian Chai", "Vistevia",
  "Himalayan Natives", "Organic India", "B&B Organics", "Neuherbs",
  "Conscious Food", "Dhatu Organics", "True Elements", "Kapiva",
  "Sorich Organics", "Just Organik", "Turn Organic", "Organic Roots",
  "Wingreens Farms", "Looms & Weaves", "Upakarma Ayurveda", "Zandu",
  "Baidyanath", "Sri Sri Tattva", "Isha Life", "Patanjali",
  "Catch", "Everest", "MDH", "Aashirvaad", "Tata Sampann", "Mother's Recipe",
  "MTR", "Suhana", "Badshah", "Goldiee", "Pushp", "Vasant",
  "Kitchen Treasures", "Keya", "Snapin", "Urban Platter", "Sprig",
  "Orika", "Jivo", "Max Health", "Healthkart", "Carbamide Forte",
  "Himalayan Organics", "Vubasil", "Simply Herbal", "Nature's Way",
  "Gaia", "24 Mantra Organic", "Down to Earth", "Phalada Pure & Sure",
  "Nature's Tattva", "Organica", "Navanya", "Vedic Roots"
];

let newData = "";

brandNames.forEach((brand, index) => {
  const id = brand.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  if (currentFile.includes(`"name": "${brand}"`) || currentFile.includes(`"${id}": {`)) {
    return;
  }

  newData += `
  ,"${id}": {
    "idKeys": ["brand-${id}"],
    "name": "${brand}",
    "company": "${brand} (Verification Pending)",
    "entityType": "FMCG / Retail",
    "location": "Unknown",
    "marketTier": "mass-premium",
    "curcuminValue": 0,
    "websiteDisplay": "Not Publicly Available",
    "websiteUrl": "Not Publicly Available",
    "instagramUrl": "Not Publicly Available",
    "instagramHandle": "Not Publicly Available",
    "facebookUrl": "Not Publicly Available",
    "facebookHandle": "Not Publicly Available",
    "parentCompany": "Unknown",
    "legalEntity": "Unknown",
    "founder": "Unknown",
    "founderSocialUrl": "Unknown",
    "foundingYear": "Unknown",
    "headquarters": "Unknown",
    "country": "Unknown",
    "manufacturingLocations": "Unknown",
    "processingLocations": "Unknown",
    "exportMarkets": "Unknown",
    "countriesSold": "Unknown",
    "officialEmail": "Unknown",
    "officialPhone": "Unknown",
    "companyRegistration": "Unknown",
    "gst": "Unknown",
    "fssai": "Unknown",
    "curcuminDisplay": "Requires Manual Verification",
    "heavyMetalsTested": "Unknown",
    "organic": "Unknown",
    "giTagged": "Unknown",
    "singleOrigin": "Unknown",
    "packaging": {
      "primaryMaterial": "Unknown",
      "luxuryScore": "0 / 10",
      "shelfImpact": "Unknown",
      "ecoScore": "0 / 10",
      "labelDesign": "Unknown",
      "brandColors": "Unknown",
      "unboxingExperience": "Unknown"
    },
    "positioningTags": ["Verification Pending"],
    "coreNarrative": "Brand pending manual verification for Premium Lakadong Turmeric line.",
    "pricing": {
      "premiumPositioning": "Unknown",
      "websitePrice": "Verification Pending",
      "retailPrice": "Verification Pending",
      "costPer100g": "Verification Pending"
    },
    "strategy": {
      "title": "Pending Review",
      "content": "Data pending manual verification."
    },
    "portfolio": [],
    "socialMedia": {
      "instagram": "Not Publicly Available",
      "facebook": "Not Publicly Available",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "websiteIntel": {
      "traffic": "Unknown",
      "ecommercePlatform": "Unknown",
      "uxScore": "Unknown"
    },
    "certifications": ["Verification Pending"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "Unknown",
      "flipkart": "Unknown",
      "indiamart": "Unknown",
      "blinkit": "Unknown"
    },
    "swot": {
      "strengths": ["Pending Review"],
      "weaknesses": ["Pending Review"],
      "opportunities": ["Pending Review"],
      "threats": ["Pending Review"]
    }
  }
`;
});

const lines = currentFile.split('\n');
let insertIndex = lines.findIndex(line => line.includes('export const getCompetitorIntel'));

// Go backwards from export const to find the closing `};` of competitorData
while (insertIndex > 0 && !lines[insertIndex].includes('};')) {
  insertIndex--;
}

if (insertIndex > 0) {
  lines.splice(insertIndex, 0, newData);
  fs.writeFileSync('src/data/competitorIntel.ts', lines.join('\n'));
  console.log("Appended " + brandNames.length + " brands.");
} else {
  console.log("Could not find the end of competitorData object.");
}
