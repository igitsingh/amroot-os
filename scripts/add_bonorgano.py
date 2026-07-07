import re
import os

file_path = "src/data/competitorIntel.ts"
with open(file_path, "r") as f:
    content = f.read()

bonorgano_data = """  "bonorgano": {
    "idKeys": ["brand_faso5hqvlq7psg0m7zppa", "org-bon-organo"],
    "name": "Bon Organo",
    "company": "Bon Organo International",
    "entityType": "d2c brand",
    "location": "Ghaziabad, Uttar Pradesh",
    "marketTier": "premium",
    "curcuminValue": 11.0,
    "websiteDisplay": "bonorgano.com",
    "websiteUrl": "https://bonorgano.com",
    "instagramUrl": "https://instagram.com/bonorgano",
    "instagramHandle": "@bonorgano",
    "facebookUrl": "https://facebook.com/bonorgano",
    "facebookHandle": "Bon Organo",
    "parentCompany": "Bon Organo International",
    "legalEntity": "Bon Organo International",
    "founder": "Unknown",
    "foundingYear": "Unknown",
    "headquarters": "Ghaziabad, Uttar Pradesh",
    "country": "India",
    "manufacturingLocations": "India",
    "processingLocations": "India",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "info.bonorgano@gmail.com",
    "officialPhone": "7982125545",
    "companyRegistration": "Unknown",
    "gst": "Unknown",
    "fssai": "Unknown",
    "curcuminDisplay": "10 - 12%",
    "heavyMetalsTested": "Unknown",
    "organic": "100% Pure, Raw, Unprocessed",
    "giTagged": "Lakadong",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Glass Jar / Pouch",
      "luxuryScore": "7.5 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "8.0 / 10",
      "labelDesign": "Clean, Natural",
      "brandColors": "Green, Yellow",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Natural", "Unprocessed", "Farm-Sourced"],
    "coreNarrative": "100% pure, raw, unprocessed, and unpasteurized food products sourced directly from farmers. Free from artificial essences, additives, and preservatives.",
    "pricing": {
      "premiumPositioning": "Premium",
      "websitePrice": "₹500 (approx)",
      "retailPrice": "₹500 (approx)",
      "costPer100g": "₹200 (approx)"
    },
    "strategy": {
      "title": "How to beat Bon Organo?",
      "content": "Bon Organo relies on the 'raw and unprocessed' narrative. AmrootOS can beat them by elevating the product to a clinical luxury standard, offering transparency through blockchain verifiable lab reports and superior unboxing experiences."
    },
    "portfolio": [
      {
        "name": "Lakadong Meghalaya Turmeric",
        "variant": "Powder",
        "weight": "Various",
        "mrp": "Unknown",
        "status": "Active"
      }
    ],
    "socialMedia": {
      "instagram": "bonorgano",
      "facebook": "bonorgano",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "websiteIntel": {
      "traffic": "Medium",
      "ecommercePlatform": "Shopify/WooCommerce",
      "uxScore": "Good"
    },
    "certifications": ["100% Pure & Natural"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "Active",
      "flipkart": "Active",
      "indiamart": "Active"
    },
    "swot": {
      "strengths": ["Strong 'Natural' positioning", "Diverse product line"],
      "weaknesses": ["Generic branding", "Lack of clinical validation"],
      "opportunities": ["Expansion into premium retail"],
      "threats": ["Rise of highly clinical D2C brands"]
    }
  },
"""

content = content.replace('export const competitorData: Record<string, CompetitorIntel> = {\n', 'export const competitorData: Record<string, CompetitorIntel> = {\n' + bonorgano_data)

with open(file_path, "w") as f:
    f.write(content)

print("Added bonorgano to competitorIntel.ts")
