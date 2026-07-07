import re

file_path = "src/data/competitorIntel.ts"
with open(file_path, "r") as f:
    content = f.read()

frontier_data = """  "frontier": {
    "idKeys": ["org-frontier-co-op", "brand-frontier"],
    "name": "Frontier Co-op",
    "company": "Frontier Co-op",
    "entityType": "Cooperatively Owned Wholesaler",
    "location": "Norway, Iowa, USA",
    "marketTier": "mass-premium",
    "curcuminValue": 5.0,
    "websiteDisplay": "frontiercoop.com",
    "websiteUrl": "https://www.frontiercoop.com",
    "instagramUrl": "https://instagram.com/frontiercoop",
    "instagramHandle": "@frontiercoop",
    "facebookUrl": "https://facebook.com/frontiercoop",
    "facebookHandle": "Frontier Co-op",
    "parentCompany": "Frontier Co-op",
    "legalEntity": "Frontier Co-op",
    "founder": "Rick Stewart",
    "foundingYear": "1976",
    "headquarters": "Norway, Iowa, USA",
    "country": "USA",
    "manufacturingLocations": "USA",
    "processingLocations": "USA",
    "exportMarkets": "Global",
    "countriesSold": "Global",
    "officialEmail": "customercare@frontiercoop.com",
    "officialPhone": "1-844-550-6200",
    "companyRegistration": "Cooperative",
    "gst": "Unknown",
    "fssai": "Unknown",
    "curcuminDisplay": "Minimum 5.0%",
    "heavyMetalsTested": "Unknown",
    "organic": "Yes",
    "giTagged": "No",
    "singleOrigin": "No",
    "packaging": {
      "primaryMaterial": "Resealable Bulk Bag",
      "luxuryScore": "4.0 / 10",
      "shelfImpact": "Low",
      "ecoScore": "7.0 / 10",
      "labelDesign": "Utilitarian",
      "brandColors": "Green, White",
      "unboxingExperience": "Basic"
    },
    "positioningTags": ["Organic", "Fair Trade", "Co-op"],
    "coreNarrative": "To nourish people and the planet through sustainable sourcing, fair trade practices, and social responsibility as a member-owned cooperative.",
    "pricing": {
      "premiumPositioning": "Mass-Premium",
      "websitePrice": "$20.74 (1 lb)",
      "retailPrice": "$20.74 (1 lb)",
      "costPer100g": "$4.57"
    },
    "strategy": {
      "title": "How to beat Frontier Co-op?",
      "content": "Frontier focuses on bulk, ethical, and organic supply for everyday use. AmrootOS can beat them in the luxury and clinical segments by offering vastly superior potency, premium glass packaging, and a highly refined consumer brand experience."
    },
    "portfolio": [
      {
        "name": "Organic Ground Turmeric Root",
        "variant": "Bulk Bag",
        "weight": "1 lb (453g)",
        "mrp": "$20.74",
        "status": "Active"
      }
    ],
    "socialMedia": {
      "instagram": "frontiercoop",
      "facebook": "frontiercoop",
      "linkedin": "Frontier Co-op",
      "followers": "Unknown"
    },
    "websiteIntel": {
      "traffic": "High",
      "ecommercePlatform": "Custom/Magento",
      "uxScore": "Good"
    },
    "certifications": ["Organic", "Fair Trade", "Regenerative Organic Certified"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "Active",
      "flipkart": "No",
      "indiamart": "No"
    },
    "swot": {
      "strengths": ["Massive scale", "Strong ethical reputation", "Wide distribution"],
      "weaknesses": ["Basic packaging", "Lower clinical potency (5%)"],
      "opportunities": ["Premium single-origin lines"],
      "threats": ["Boutique luxury spice brands"]
    }
  },
"""

content = content.replace('export const competitorData: Record<string, CompetitorIntel> = {\n', 'export const competitorData: Record<string, CompetitorIntel> = {\n' + frontier_data)

with open(file_path, "w") as f:
    f.write(content)

print("Added frontier to competitorIntel.ts")
