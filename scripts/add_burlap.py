import re
import os

file_path = "src/data/competitorIntel.ts"
with open(file_path, "r") as f:
    content = f.read()

burlap_data = """  "burlap": {
    "idKeys": ["brand-burlap", "org-burlap-barrel"],
    "name": "Burlap & Barrel",
    "company": "Burlap & Barrel",
    "entityType": "Public Benefit Corporation",
    "location": "New York, USA",
    "marketTier": "premium",
    "curcuminValue": 4.0,
    "websiteDisplay": "burlapandbarrel.com",
    "websiteUrl": "https://www.burlapandbarrel.com",
    "instagramUrl": "https://instagram.com/burlapandbarrel",
    "instagramHandle": "@burlapandbarrel",
    "facebookUrl": "https://facebook.com/burlapandbarrel",
    "facebookHandle": "Burlap & Barrel",
    "parentCompany": "Burlap & Barrel",
    "legalEntity": "Burlap & Barrel",
    "founder": "Ethan Frisch and Ori Zohar",
    "foundingYear": "2016",
    "headquarters": "New York, USA",
    "country": "USA",
    "manufacturingLocations": "USA",
    "processingLocations": "USA",
    "exportMarkets": "Global",
    "countriesSold": "Global",
    "officialEmail": "care@burlapandbarrel.com",
    "officialPhone": "Not Publicly Available",
    "companyRegistration": "Public Benefit Corporation",
    "gst": "Unknown",
    "fssai": "Unknown",
    "curcuminDisplay": "3.34% - 4.0%",
    "heavyMetalsTested": "Unknown",
    "organic": "Unknown",
    "giTagged": "No",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Glass Jar",
      "luxuryScore": "7.5 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "8.5 / 10",
      "labelDesign": "Clean, Modern, Simple",
      "brandColors": "White, Black, Spice colors",
      "unboxingExperience": "Standard Premium"
    },
    "positioningTags": ["Single-Origin", "Direct Trade", "Public Benefit"],
    "coreNarrative": "Building equitable, transparent, and traceable supply chains by sourcing spices directly from smallholder farmers globally.",
    "pricing": {
      "premiumPositioning": "Premium",
      "websitePrice": "$9.99 (1.9 oz)",
      "retailPrice": "$9.99",
      "costPer100g": "$18.50"
    },
    "strategy": {
      "title": "How to beat Burlap & Barrel?",
      "content": "Burlap & Barrel excels at the ethical sourcing and single-origin narrative. AmrootOS can beat them by demonstrating superior product potency (10%+ curcumin vs their 4%) and positioning as a clinical-grade luxury product rather than just an ethical culinary ingredient."
    },
    "portfolio": [
      {
        "name": "New Harvest Turmeric",
        "variant": "Glass Jar",
        "weight": "1.9 oz (54g)",
        "mrp": "$9.99",
        "status": "Active"
      }
    ],
    "socialMedia": {
      "instagram": "burlapandbarrel",
      "facebook": "burlapandbarrel",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "websiteIntel": {
      "traffic": "High",
      "ecommercePlatform": "Shopify",
      "uxScore": "Good"
    },
    "certifications": ["Public Benefit Corporation"],
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
      "strengths": ["Strong ethical narrative", "Direct farmer relationships"],
      "weaknesses": ["Low curcumin content (culinary grade)"],
      "opportunities": ["Expansion into clinical wellness"],
      "threats": ["High-potency clinical turmeric brands"]
    }
  },
"""

content = content.replace('export const competitorData: Record<string, CompetitorIntel> = {\n', 'export const competitorData: Record<string, CompetitorIntel> = {\n' + burlap_data)

with open(file_path, "w") as f:
    f.write(content)

print("Added burlap to competitorIntel.ts")
