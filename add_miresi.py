import json
import re

org_file = "/Users/isachinsingh/Desktop/PARADISE-OS/src/db/intelligence/brands/organizations.json"
with open(org_file, 'r') as f:
    orgs = json.load(f)

miresi = {
    "id": "brand-miresi",
    "name": "Miresi",
    "marketPositioning": "Mass-Premium",
    "source": "Miresi Official Website",
    "sourceUrl": "https://miresi.in",
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
if not any(o["id"] == "brand-miresi" for o in orgs):
    orgs.append(miresi)
    with open(org_file, 'w') as f:
        json.dump(orgs, f, indent=2)

intel_file = "/Users/isachinsingh/Desktop/PARADISE-OS/src/data/competitorIntel.ts"
with open(intel_file, 'r') as f:
    content = f.read()

miresi_intel = """
  "miresi": {
    "idKeys": ["brand-miresi"],
    "name": "Miresi",
    "company": "Yana Industries LLP",
    "entityType": "DTC Brand",
    "location": "Bangalore, Karnataka",
    "marketTier": "mass-premium",
    "curcuminValue": 7.0,
    "websiteDisplay": "miresi.in",
    "websiteUrl": "https://miresi.in",
    "instagramUrl": "Not Publicly Available",
    "instagramHandle": "Not Publicly Available",
    "facebookUrl": "Not Publicly Available",
    "facebookHandle": "Not Publicly Available",
    "parentCompany": "Yana Industries LLP",
    "legalEntity": "Yana Industries LLP",
    "founder": "Unknown",
    "founderSocialUrl": "Unknown",
    "foundingYear": "Unknown",
    "headquarters": "Bangalore, India",
    "country": "India",
    "manufacturingLocations": "India",
    "processingLocations": "India",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "care@yanaindustries.com",
    "officialPhone": "+91 76196 28378",
    "companyRegistration": "LLP",
    "gst": "Unknown",
    "fssai": "Unknown",
    "curcuminDisplay": "Lakadong (High)",
    "heavyMetalsTested": "Unknown",
    "organic": "Unknown",
    "giTagged": "Unknown",
    "singleOrigin": "Unknown",
    "packaging": {
      "primaryMaterial": "Resealable Pouch",
      "luxuryScore": "4.5 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "5.0 / 10",
      "labelDesign": "Clean, Modern",
      "brandColors": "White, Green",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Plant-based", "Women Farmers", "Convenience"],
    "coreNarrative": "At Miresi, we believe that being healthy shouldn't be difficult. That's why we bring you plant-based superfoods in the most convenient, easy-to-use forms. Carefully cultivated by women farmers.",
    "pricing": {
      "premiumPositioning": "Mass-Premium",
      "websitePrice": "₹410 (450g)",
      "retailPrice": "₹455",
      "costPer100g": "₹91"
    },
    "strategy": {
      "title": "How to beat Miresi?",
      "content": "Miresi competes heavily on price (₹410 for 450g is quite affordable for Lakadong). AmrootOS should not compete on price but rather position itself as the undisputed luxury and clinical-grade leader, focusing on extreme transparency and superior packaging."
    },
    "portfolio": [
      {
        "name": "Lakadong Turmeric Powder",
        "variant": "Powder",
        "weight": "450g",
        "mrp": "₹410",
        "status": "Active"
      },
      {
        "name": "Lakadong Turmeric Powder",
        "variant": "Powder",
        "weight": "200g (100g x 2)",
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
      "strengths": ["Highly competitive pricing", "Women farmer social angle"],
      "weaknesses": ["Pouch packaging lacks premium feel", "No explicit curcumin % or lab reports visible upfront"],
      "opportunities": ["Mass market penetration"],
      "threats": ["Price wars with other mass Lakadong sellers"]
    }
  },
"""

if "brand-miresi" not in content:
    content = content.replace("export const competitorData: Record<string, CompetitorIntel> = {", "export const competitorData: Record<string, CompetitorIntel> = {\n" + miresi_intel)
    with open(intel_file, 'w') as f:
        f.write(content)

print("Added Miresi.")
