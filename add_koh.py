import json
import re

org_file = "/Users/isachinsingh/Desktop/PARADISE-OS/src/db/intelligence/brands/organizations.json"
with open(org_file, 'r') as f:
    orgs = json.load(f)

koh = {
    "id": "brand-koh-foods",
    "name": "koh! foods",
    "marketPositioning": "Premium",
    "source": "koh! foods Official Website",
    "sourceUrl": "https://kohfoods.in",
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
if not any(o["id"] == "brand-koh-foods" for o in orgs):
    orgs.append(koh)
    with open(org_file, 'w') as f:
        json.dump(orgs, f, indent=2)

intel_file = "/Users/isachinsingh/Desktop/PARADISE-OS/src/data/competitorIntel.ts"
with open(intel_file, 'r') as f:
    content = f.read()

koh_intel = """
  "koh-foods": {
    "idKeys": ["brand-koh-foods"],
    "name": "koh! foods",
    "company": "koh! foods",
    "entityType": "DTC Brand",
    "location": "India",
    "marketTier": "premium",
    "curcuminValue": 0,
    "websiteDisplay": "kohfoods.in",
    "websiteUrl": "https://kohfoods.in",
    "instagramUrl": "https://instagram.com/kohfoods.in",
    "instagramHandle": "@kohfoods.in",
    "facebookUrl": "Not Publicly Available",
    "facebookHandle": "Not Publicly Available",
    "parentCompany": "koh! foods",
    "legalEntity": "koh! foods",
    "founder": "BITS Pilani & IIM Alumni",
    "founderSocialUrl": "Unknown",
    "foundingYear": "Unknown",
    "headquarters": "India",
    "country": "India",
    "manufacturingLocations": "India",
    "processingLocations": "India",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "Unknown",
    "officialPhone": "Unknown",
    "companyRegistration": "Unknown",
    "gst": "Unknown",
    "fssai": "Unknown",
    "curcuminDisplay": "Unknown",
    "heavyMetalsTested": "Unknown",
    "organic": "Unknown",
    "giTagged": "Unknown",
    "singleOrigin": "Unknown",
    "packaging": {
      "primaryMaterial": "PET Jar",
      "luxuryScore": "6.0 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "4.0 / 10",
      "labelDesign": "Playful, Clean",
      "brandColors": "Purple, White",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Clean Food", "Alumni Founded", "Superfoods"],
    "coreNarrative": "A clean food venture by BITS Pilani & IIM Alumni. Making mealtimes joyful for the child in you. We create delicious, clean superfood vegetable powders that nourish your body.",
    "pricing": {
      "premiumPositioning": "Premium",
      "websitePrice": "₹199 (100g)",
      "retailPrice": "₹199",
      "costPer100g": "₹199"
    },
    "strategy": {
      "title": "How to beat koh! foods?",
      "content": "koh! focuses on joyful, clean eating and lifestyle marketing. AmrootOS can beat them by pivoting hard into clinical efficacy, high curcumin extraction, and superior eco-friendly luxury packaging rather than plastic jars."
    },
    "portfolio": [
      {
        "name": "koh! Turmeric Powder",
        "variant": "Powder",
        "weight": "100g",
        "mrp": "₹199",
        "status": "Active"
      }
    ],
    "socialMedia": {
      "instagram": "https://instagram.com/kohfoods.in",
      "facebook": "Not Publicly Available",
      "linkedin": "Not Publicly Available",
      "youtube": "https://youtube.com/@Kohfoods",
      "followers": "37.7K (IG), 1.94K (YT)"
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
      "amazon": "Unknown",
      "flipkart": "Unknown",
      "indiamart": "Unknown",
      "blinkit": "Unknown"
    },
    "swot": {
      "strengths": ["Strong alumni network backing", "High Instagram following (37k+)", "Playful brand identity"],
      "weaknesses": ["Plastic PET jars", "No specific curcumin claims on front label"],
      "opportunities": ["Strong D2C marketing"],
      "threats": ["Established organic spice brands"]
    }
  },
"""

if "brand-koh-foods" not in content:
    content = content.replace("export const competitorData: Record<string, CompetitorIntel> = {", "export const competitorData: Record<string, CompetitorIntel> = {\n" + koh_intel)
    with open(intel_file, 'w') as f:
        f.write(content)

print("Added koh! foods.")
