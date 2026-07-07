import json
import re

org_file = "/Users/isachinsingh/Desktop/PARADISE-OS/src/db/intelligence/brands/organizations.json"
with open(org_file, 'r') as f:
    orgs = json.load(f)

tulua = {
    "id": "brand-tulua",
    "name": "Tulua",
    "marketPositioning": "Premium",
    "source": "Tulua Official Website",
    "sourceUrl": "https://tulua.shop",
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
if not any(o["id"] == "brand-tulua" for o in orgs):
    orgs.append(tulua)
    with open(org_file, 'w') as f:
        json.dump(orgs, f, indent=2)

intel_file = "/Users/isachinsingh/Desktop/PARADISE-OS/src/data/competitorIntel.ts"
with open(intel_file, 'r') as f:
    content = f.read()

tulua_intel = """
  "tulua": {
    "idKeys": ["brand-tulua"],
    "name": "Tulua",
    "company": "Tulua",
    "entityType": "DTC Brand",
    "location": "India",
    "marketTier": "premium",
    "curcuminValue": 9.3,
    "websiteDisplay": "tulua.shop",
    "websiteUrl": "https://tulua.shop",
    "instagramUrl": "Not Publicly Available",
    "instagramHandle": "Not Publicly Available",
    "facebookUrl": "Not Publicly Available",
    "facebookHandle": "Not Publicly Available",
    "parentCompany": "Tulua",
    "legalEntity": "Tulua",
    "founder": "Unknown",
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
    "curcuminDisplay": "9.3%",
    "heavyMetalsTested": "Unknown",
    "organic": "Unknown",
    "giTagged": "Unknown",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Cardboard Box",
      "luxuryScore": "6.5 / 10",
      "shelfImpact": "High",
      "ecoScore": "7.0 / 10",
      "labelDesign": "Modern, Die-cut window",
      "brandColors": "Orange, White, Yellow",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Single Origin", "High Curcumin"],
    "coreNarrative": "Single Origin Spice Range. Lakadong Turmeric Powder with exactly 9.3% Curcumin.",
    "pricing": {
      "premiumPositioning": "Premium",
      "websitePrice": "₹152 (100g)",
      "retailPrice": "₹160",
      "costPer100g": "₹152"
    },
    "strategy": {
      "title": "How to beat Tulua?",
      "content": "Tulua has excellent shelf impact with its die-cut box and explicit 9.3% claim. AmrootOS needs to exceed this transparency by providing batch-wise clinical reports and utilizing heavier, more luxurious packaging like glass."
    },
    "portfolio": [
      {
        "name": "Lakadong Turmeric Powder",
        "variant": "Powder",
        "weight": "100g",
        "mrp": "₹160",
        "status": "Active"
      },
      {
        "name": "Lakadong Turmeric Powder",
        "variant": "Powder",
        "weight": "300g",
        "mrp": "Unknown",
        "status": "Active"
      },
      {
        "name": "Lakadong Turmeric Powder",
        "variant": "Powder",
        "weight": "500g",
        "mrp": "Unknown",
        "status": "Active"
      },
      {
        "name": "Lakadong Turmeric Powder",
        "variant": "Powder",
        "weight": "1kg",
        "mrp": "Unknown",
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
      "amazon": "Unknown",
      "flipkart": "Unknown",
      "indiamart": "Unknown",
      "blinkit": "Unknown"
    },
    "swot": {
      "strengths": ["Bold packaging with die-cut window", "Specific 9.3% curcumin claim", "Single origin"],
      "weaknesses": ["Cardboard box may not feel as premium as glass for long-term storage"],
      "opportunities": ["Gifting", "Premium retail"],
      "threats": ["Higher curcumin competitors"]
    }
  },
"""

if "brand-tulua" not in content:
    content = content.replace("export const competitorData: Record<string, CompetitorIntel> = {", "export const competitorData: Record<string, CompetitorIntel> = {\n" + tulua_intel)
    
    # Also we need to add the fallback into getCurcuminRange for brand-tulua if we want the filter to work immediately,
    # because getCurcuminRange has a fallback mapping. Wait, getCurcuminRange parses the string `curcuminDisplay` automatically using matchAll!
    # "9.3%" will parse correctly as [9.3] so min=9.3 max=9.3. No fallback needed!
    
    with open(intel_file, 'w') as f:
        f.write(content)

print("Added Tulua.")
