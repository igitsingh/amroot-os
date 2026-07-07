import json
import re

org_file = "/Users/isachinsingh/Desktop/PARADISE-OS/src/db/intelligence/brands/organizations.json"
with open(org_file, 'r') as f:
    orgs = json.load(f)

amyra = {
    "id": "brand-amyra-farms",
    "name": "Amyra Farms",
    "marketPositioning": "Premium",
    "source": "Amyra Farms Official Website",
    "sourceUrl": "https://amyrafarms.in",
    "sourceType": "Official",
    "dateCollected": "2026-07-07T00:00:00Z",
    "dateLastVerified": "2026-07-07T00:00:00Z",
    "confidenceScore": 100,
    "verificationStatus": "Verified",
    "roles": [
        "Competitor Brand"
    ]
}

# check if already exists
if not any(o["id"] == "brand-amyra-farms" for o in orgs):
    orgs.append(amyra)
    with open(org_file, 'w') as f:
        json.dump(orgs, f, indent=2)

intel_file = "/Users/isachinsingh/Desktop/PARADISE-OS/src/data/competitorIntel.ts"
with open(intel_file, 'r') as f:
    content = f.read()

amyra_intel = """
  "amyra": {
    "idKeys": ["brand-amyra-farms"],
    "name": "Amyra Farms",
    "company": "Amyra Farms",
    "entityType": "DTC Brand",
    "location": "India",
    "marketTier": "premium",
    "curcuminValue": 7.0,
    "websiteDisplay": "amyrafarms.in",
    "websiteUrl": "https://amyrafarms.in",
    "instagramUrl": "Not Publicly Available",
    "instagramHandle": "Not Publicly Available",
    "facebookUrl": "Not Publicly Available",
    "facebookHandle": "Not Publicly Available",
    "parentCompany": "Amyra Farms",
    "legalEntity": "Amyra Farms",
    "founder": "Unknown",
    "founderSocialUrl": "Unknown",
    "foundingYear": "Unknown",
    "headquarters": "India",
    "country": "India",
    "manufacturingLocations": "India",
    "processingLocations": "India",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "farm@amyrafarms.com",
    "officialPhone": "Not Publicly Available",
    "companyRegistration": "Unknown",
    "gst": "Unknown",
    "fssai": "Unknown",
    "curcuminDisplay": "7-12%",
    "heavyMetalsTested": "Unknown",
    "organic": "Unknown",
    "giTagged": "Unknown",
    "singleOrigin": "Unknown",
    "packaging": {
      "primaryMaterial": "Pouch",
      "luxuryScore": "6.0 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "5.0 / 10",
      "labelDesign": "Modern, Illustration",
      "brandColors": "Purple, Yellow, Green",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Direct from Estates", "High Curcumin"],
    "coreNarrative": "Lakadong turmeric from the Jaintia hills — one of the world's highest curcumin varietals at 7-12%. Deep orange, peppery, real.",
    "pricing": {
      "premiumPositioning": "Premium",
      "websitePrice": "₹350 (250g)",
      "retailPrice": "₹350",
      "costPer100g": "₹140"
    },
    "strategy": {
      "title": "How to beat Amyra Farms?",
      "content": "Amyra Farms emphasizes high curcumin and quick delivery through platforms like Blinkit and Amazon. AmrootOS can position higher in luxury appeal, detailed clinical transparency, and superior packaging."
    },
    "portfolio": [
      {
        "name": "Lakadong Turmeric",
        "variant": "Powder",
        "weight": "250g",
        "mrp": "₹350",
        "status": "Active"
      },
      {
        "name": "Lakadong Turmeric",
        "variant": "Powder",
        "weight": "500g",
        "mrp": "₹600",
        "status": "Active"
      },
      {
        "name": "Lakadong Turmeric Pantry Pack",
        "variant": "Powder",
        "weight": "1kg (500g x 2)",
        "mrp": "₹1,200",
        "status": "Active"
      }
    ],
    "socialMedia": {
      "instagram": "Not Publicly Available",
      "facebook": "Not Publicly Available",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "websiteIntel": {
      "traffic": "Medium",
      "ecommercePlatform": "Shopify",
      "uxScore": "Good"
    },
    "certifications": [],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "Yes",
      "flipkart": "Unknown",
      "indiamart": "Unknown",
      "blinkit": "Yes"
    },
    "swot": {
      "strengths": ["High Curcumin Claim (7-12%)", "Quick commerce presence (Blinkit 10-min)", "Amazon Next-Day"],
      "weaknesses": ["Pouch packaging lacks luxury feel", "Little transparency on exact farm location"],
      "opportunities": ["B2B Wholesale / White-label"],
      "threats": ["Premium brands with glass packaging"]
    }
  },
"""

if "brand-amyra-farms" not in content:
    content = content.replace("export const competitorData: Record<string, CompetitorIntel> = {", "export const competitorData: Record<string, CompetitorIntel> = {\n" + amyra_intel)
    with open(intel_file, 'w') as f:
        f.write(content)

print("Added Amyra Farms.")
