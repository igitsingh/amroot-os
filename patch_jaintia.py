import re

with open('src/data/competitorIntel.ts', 'r') as f:
    content = f.read()

jaintia_new = """  "jaintiagold": {
    "idKeys": ["brand-jaintiagold"],
    "name": "Jaintia Gold",
    "company": "jaintia gold (cooperative/brand)",
    "entityType": "wholesale / b2b brand",
    "location": "jaintia hills, meghalaya",
    "marketTier": "premium regional",
    "curcuminValue": 7.5,
    "websiteDisplay": "unknown",
    "websiteUrl": "#",
    "parentCompany": "Unknown",
    "legalEntity": "Unknown",
    "founder": "Unknown",
    "foundingYear": "Unknown",
    "headquarters": "Jaintia Hills, Meghalaya",
    "country": "India",
    "manufacturingLocations": "Meghalaya",
    "processingLocations": "Meghalaya",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "Unknown",
    "curcuminDisplay": "7.0 - 12.0%",
    "heavyMetalsTested": "Unknown",
    "organic": "Pending Verification",
    "giTagged": "Lakadong",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Bulk / Wholesale Sacks",
      "luxuryScore": "2.0 / 10",
      "shelfImpact": "Low",
      "ecoScore": "Unknown",
      "labelDesign": "Basic Wholesale",
      "brandColors": "Yellow",
      "unboxingExperience": "None"
    },
    "positioningTags": ["Authentic", "GI Tagged", "Regional", "Wholesale"],
    "coreNarrative": "Authentic Lakadong turmeric sourced directly from the GI-tagged Jaintia Hills region.",
    "pricing": {
      "premiumPositioning": "Wholesale Premium",
      "websitePrice": "N/A",
      "retailPrice": "₹150 - ₹300 (per 100g via third-party)",
      "costPer100g": "₹150"
    },
    "socialMedia": {
      "instagram": "Not Publicly Available",
      "facebook": "Not Publicly Available",
      "linkedin": "Not Publicly Available",
      "followers": "0"
    },
    "websiteIntel": {
      "traffic": "N/A",
      "ecommercePlatform": "Third-Party (IndiaMART / Amazon)",
      "uxScore": "N/A"
    },
    "certifications": ["Geographical Indication (GI) - Claimed"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "Active via Resellers",
      "flipkart": "Active via Resellers",
      "indiamart": "Active (Wholesale)"
    },
    "swot": {
      "strengths": ["Geographic Authenticity", "High Curcumin Content"],
      "weaknesses": ["No DTC Brand Equity", "No Quality Control Transparency", "Poor Packaging"],
      "opportunities": ["B2B Supply", "White-labeling"],
      "threats": ["Adulteration by resellers", "Rise of premium DTC brands"]
    },
    "strategy": {
      "title": "How to beat Jaintia Gold?",
      "content": "Jaintia Gold acts more as a regional identifier/cooperative brand for Lakadong. They have immense authenticity but lack national D2C brand equity and modern premium packaging. AmrootOS can leverage the same geographic authenticity but wrap it in an ultra-premium, trusted, clinically-tested brand."
    }
  },"""

# Replace the old jaintiagold object
pattern = r'  "jaintiagold": \{.*?\n  \},'
content = re.sub(pattern, jaintia_new, content, flags=re.DOTALL)

with open('src/data/competitorIntel.ts', 'w') as f:
    f.write(content)
