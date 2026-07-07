import re

with open('src/data/competitorIntel.ts', 'r') as f:
    content = f.read()

tatvahills_new = """  "tatvahills": {
    "idKeys": ["brand_07zpldbrwnb8geu3woul7vp", "org-tatvahills-superfoods"],
    "name": "TatvaHills Superfoods",
    "company": "Tatva Hills Agro",
    "entityType": "d2c brand",
    "location": "uttarakhand, india",
    "marketTier": "premium",
    "curcuminValue": 7.0,
    "websiteDisplay": "tatvahills-superfoods.com",
    "websiteUrl": "https://tatvahills-superfoods.com",
    "parentCompany": "Tatva Hills Agro",
    "legalEntity": "Tatva Hills Agro",
    "founder": "Ranjan Chopra",
    "foundingYear": "Unknown",
    "headquarters": "Almora, Uttarakhand",
    "country": "India",
    "manufacturingLocations": "Uttarakhand, India",
    "processingLocations": "Uttarakhand, India",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "info@tatvahillsagro.com",
    "curcuminDisplay": "Up to 7.0%",
    "heavyMetalsTested": "Unknown",
    "organic": "Sustainable / Natural",
    "giTagged": "Unknown",
    "singleOrigin": "Yes (Lakadong blended with Tellicherry)",
    "portfolio": [
      { "name": "Lakadong Turmeric and Tellicherry Pepper Powder", "variant": "Powder", "weight": "Unknown", "mrp": "Unknown", "status": "Active" }
    ],
    "packaging": {
      "primaryMaterial": "Glass",
      "luxuryScore": "6.0 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "High",
      "labelDesign": "Sustainable",
      "brandColors": "Natural",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Sustainable Farming", "Eco-friendly", "Direct to Consumer"],
    "coreNarrative": "A sustainable farming venture supporting local farmers in Almora, Uttarakhand with a focus on eco-conscious glass packaging.",
    "pricing": {
      "premiumPositioning": "Premium",
      "websitePrice": "N/A",
      "retailPrice": "N/A",
      "costPer100g": "N/A"
    },
    "socialMedia": {
      "instagram": "Not Publicly Available",
      "facebook": "Not Publicly Available",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "websiteIntel": {
      "traffic": "Low",
      "ecommercePlatform": "Shopify",
      "uxScore": "Medium"
    },
    "certifications": ["FSSAI"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "Not Verified",
      "flipkart": "Not Verified",
      "indiamart": "Not Verified"
    },
    "swot": {
      "strengths": ["Strong sustainability angle", "Use of glass packaging", "Founder's technical background"],
      "weaknesses": ["Limited digital presence", "No verifiable social media", "Pre-mixed formulation limits culinary use"],
      "opportunities": ["Expanding eco-friendly product lines"],
      "threats": ["Brands with clinical backing and transparent lab reports"]
    },
    "strategy": {
      "title": "How to beat TatvaHills?",
      "content": "TatvaHills competes on sustainability and pre-mixed formulations (turmeric + pepper). AmrootOS can surpass them by offering pure, unblended Lakadong with explicit lab reports and a much stronger digital community presence, appealing to consumers who want absolute purity and control over their supplementation."
    }
  },"""

# Insert before the last closing brace of the competitorData object
pattern = r'  "tribalfactory": \{'
content = re.sub(pattern, tatvahills_new + '\n' + r'  "tribalfactory": {', content)

with open('src/data/competitorIntel.ts', 'w') as f:
    f.write(content)
