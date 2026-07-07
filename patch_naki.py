import re

with open('src/data/competitorIntel.ts', 'r') as f:
    content = f.read()

naki_new = """  "naki": {
    "idKeys": ["brand-naki"],
    "name": "NAKI",
    "company": "naki store",
    "entityType": "d2c brand",
    "location": "jaintia hills, meghalaya",
    "marketTier": "premium",
    "curcuminValue": 8.0,
    "websiteDisplay": "nakistore.in",
    "websiteUrl": "https://nakistore.in",
    "parentCompany": "Naki Store",
    "legalEntity": "Naki",
    "founder": "Dawhoi Dhar",
    "foundingYear": "Unknown",
    "headquarters": "Jaintia Hills, Meghalaya",
    "country": "India",
    "manufacturingLocations": "Meghalaya",
    "processingLocations": "Meghalaya",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "Unknown",
    "curcuminDisplay": "8.0 - 12.0%",
    "heavyMetalsTested": "Unknown",
    "organic": "Natural",
    "giTagged": "Lakadong",
    "singleOrigin": "Yes",
    "portfolio": [
      { "name": "NAKI Premium Lakadong Turmeric", "variant": "Powder", "weight": "100g", "mrp": "₹250", "status": "Active" }
    ],
    "packaging": {
      "primaryMaterial": "Eco-friendly Pouches",
      "luxuryScore": "5.5 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "High",
      "labelDesign": "Minimalist Earthy",
      "brandColors": "Yellow & Kraft Brown",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Authentic", "Founder Led", "Regional Pride"],
    "coreNarrative": "Sharing the authentic flavors and essence of Meghalaya with a global audience.",
    "pricing": {
      "premiumPositioning": "Premium",
      "websitePrice": "₹250 (100g)",
      "retailPrice": "₹250",
      "costPer100g": "₹250"
    },
    "socialMedia": {
      "instagram": "@nakistore.in",
      "facebook": "NAKI Store",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "websiteIntel": {
      "traffic": "Low",
      "ecommercePlatform": "Shopify/WooCommerce",
      "uxScore": "Medium"
    },
    "certifications": ["FSSAI"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "Active",
      "flipkart": "Not Active",
      "indiamart": "Active"
    },
    "swot": {
      "strengths": ["Authentic Founder Story", "Direct Sourcing"],
      "weaknesses": ["Low Brand Awareness Outside Meghalaya", "Basic Packaging"],
      "opportunities": ["B2B Export", "Premium Retail Placement"],
      "threats": ["Larger heavily funded D2C brands"]
    },
    "strategy": {
      "title": "How to beat NAKI?",
      "content": "NAKI has a strong authentic founder story (Dawhoi Dhar) directly from the region. AmrootOS can beat them by out-branding them on luxury appeal, scientific formulation (piperine pairing), and clinical transparency, taking Lakadong from a 'regional specialty' to an 'elite bio-hacking supplement'."
    }
  },"""

pattern = r'  "naki": \{.*?\n  \},'
content = re.sub(pattern, naki_new, content, flags=re.DOTALL)

with open('src/data/competitorIntel.ts', 'w') as f:
    f.write(content)
