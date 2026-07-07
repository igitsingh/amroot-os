import json
import re

org_file = "/Users/isachinsingh/Desktop/PARADISE-OS/src/db/intelligence/brands/organizations.json"
with open(org_file, 'r') as f:
    orgs = json.load(f)

nira = {
    "id": "brand-nira-kitchen",
    "name": "Nira Kitchen",
    "marketPositioning": "Premium",
    "source": "Nira Kitchen Official Website",
    "sourceUrl": "https://nirabalance.com",
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
if not any(o["id"] == "brand-nira-kitchen" for o in orgs):
    orgs.append(nira)
    with open(org_file, 'w') as f:
        json.dump(orgs, f, indent=2)

intel_file = "/Users/isachinsingh/Desktop/PARADISE-OS/src/data/competitorIntel.ts"
with open(intel_file, 'r') as f:
    content = f.read()

nira_intel = """
  "nira-kitchen": {
    "idKeys": ["brand-nira-kitchen"],
    "name": "Nira Kitchen",
    "company": "Breathe Again India Pvt. Ltd.",
    "entityType": "DTC Brand",
    "location": "Kolkata, India",
    "marketTier": "premium",
    "curcuminValue": 7.5,
    "websiteDisplay": "nirabalance.com",
    "websiteUrl": "https://nirabalance.com",
    "instagramUrl": "Not Publicly Available",
    "instagramHandle": "Not Publicly Available",
    "facebookUrl": "Not Publicly Available",
    "facebookHandle": "Not Publicly Available",
    "parentCompany": "Breathe Again India Pvt. Ltd.",
    "legalEntity": "Breathe Again India Pvt. Ltd.",
    "founder": "Unknown",
    "founderSocialUrl": "Unknown",
    "foundingYear": "Unknown",
    "headquarters": "Kolkata, India",
    "country": "India",
    "manufacturingLocations": "India",
    "processingLocations": "India",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "Unknown",
    "officialPhone": "Not Publicly Available",
    "companyRegistration": "Unknown",
    "gst": "19AAHCB4948E1ZI",
    "fssai": "12821013001243",
    "curcuminDisplay": "7.5%",
    "heavyMetalsTested": "Unknown",
    "organic": "Unknown",
    "giTagged": "Unknown",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Glass Jar",
      "luxuryScore": "8.0 / 10",
      "shelfImpact": "High",
      "ecoScore": "8.0 / 10",
      "labelDesign": "Premium, Elegant, Minimalist",
      "brandColors": "Black, Gold, Yellow",
      "unboxingExperience": "Premium"
    },
    "positioningTags": ["Single-Origin", "Small-Batch", "Lab-Tested"],
    "coreNarrative": "A pantry built by hand, from single-origin provenance, at our Kolkata atelier. Premium Turmeric · 7.5% Curcumin Lakadong from Meghalaya.",
    "pricing": {
      "premiumPositioning": "Premium",
      "websitePrice": "Unknown (150g)",
      "retailPrice": "Unknown",
      "costPer100g": "Unknown"
    },
    "strategy": {
      "title": "How to beat Nira Kitchen?",
      "content": "Nira Kitchen focuses on aesthetics and a premium 'atelier' narrative. AmrootOS can beat them by matching the glass packaging luxury while dominating on clinical transparency, lab reports, and higher curcumin yields."
    },
    "portfolio": [
      {
        "name": "Premium Turmeric 7.5% Curcumin",
        "variant": "Powder",
        "weight": "150g",
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
      "traffic": "Low",
      "ecommercePlatform": "Shopify",
      "uxScore": "Excellent"
    },
    "certifications": ["Vegan", "Gluten-Free", "Dairy-Free"],
    "labReports": {
      "available": true,
      "source": "Website claim (Lab-tested 7.5%+)"
    },
    "marketplace": {
      "amazon": "Unknown",
      "flipkart": "Unknown",
      "indiamart": "Unknown",
      "blinkit": "Unknown"
    },
    "swot": {
      "strengths": ["Premium glass jar packaging", "Atelier narrative", "Lab-tested claim"],
      "weaknesses": ["Small product size (150g)", "Less brand recognition"],
      "opportunities": ["Niche luxury gifting"],
      "threats": ["Established premium brands like Diaspora"]
    }
  },
"""

if "brand-nira-kitchen" not in content:
    content = content.replace("export const competitorData: Record<string, CompetitorIntel> = {", "export const competitorData: Record<string, CompetitorIntel> = {\n" + nira_intel)
    with open(intel_file, 'w') as f:
        f.write(content)

print("Added Nira Kitchen.")
