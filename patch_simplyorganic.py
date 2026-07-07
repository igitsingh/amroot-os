import re

with open('src/data/competitorIntel.ts', 'r') as f:
    content = f.read()

simplyorganic_new = """  "simplyorganic": {
    "idKeys": ["brand_iuduruqnmkpnh6b1uv6jxg", "org-simply-organic"],
    "name": "Simply Organic",
    "company": "Frontier Co-op",
    "entityType": "retail spice brand",
    "location": "norway, iowa (usa)",
    "marketTier": "premium mass",
    "curcuminValue": 4.0,
    "websiteDisplay": "simplyorganic.com",
    "websiteUrl": "https://simplyorganic.com",
    "parentCompany": "Frontier Co-op",
    "legalEntity": "Frontier Co-op",
    "founder": "Frontier Co-op (cooperative)",
    "foundingYear": "2001",
    "headquarters": "Norway, Iowa, USA",
    "country": "USA",
    "manufacturingLocations": "Iowa, USA",
    "processingLocations": "USA",
    "exportMarkets": "Global",
    "countriesSold": "USA, Canada, Global",
    "officialEmail": "info@simplyorganic.com",
    "curcuminDisplay": "Approx 4.0%",
    "heavyMetalsTested": "Yes",
    "organic": "USDA Organic",
    "giTagged": "No",
    "singleOrigin": "No",
    "portfolio": [
      { "name": "Ground Turmeric Root", "variant": "Standard", "weight": "67g (2.38 oz)", "mrp": "$6.99", "status": "Active" }
    ],
    "packaging": {
      "primaryMaterial": "Glass Bottle with Metal Cap",
      "luxuryScore": "5.0 / 10",
      "shelfImpact": "High (mass market)",
      "ecoScore": "High",
      "labelDesign": "Clean / Green",
      "brandColors": "Green, White",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["USDA Organic", "Non-GMO", "Fair Trade"],
    "coreNarrative": "Providing 100% certified organic spices, seasonings, and flavors while giving back to organic agriculture.",
    "pricing": {
      "premiumPositioning": "Premium Mass Market",
      "websitePrice": "$6.99",
      "retailPrice": "$6.99",
      "costPer100g": "$10.43"
    },
    "socialMedia": {
      "instagram": "@simplyorganicfoods",
      "facebook": "Simply Organic",
      "linkedin": "Frontier Co-op",
      "followers": "Unknown"
    },
    "websiteIntel": {
      "traffic": "High",
      "ecommercePlatform": "Shopify/Magento",
      "uxScore": "High"
    },
    "certifications": ["USDA Organic", "Non-GMO Project Verified", "Kosher"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "Verified",
      "flipkart": "Not Verified",
      "indiamart": "Not Verified"
    },
    "swot": {
      "strengths": ["Massive retail distribution", "Strong brand trust in US", "USDA Organic backing"],
      "weaknesses": ["Generic sourcing", "Low curcumin compared to Lakadong", "Not single origin"],
      "opportunities": ["Expanding single-origin lines"],
      "threats": ["Niche D2C brands offering superior quality and transparency"]
    },
    "strategy": {
      "title": "How to beat Simply Organic?",
      "content": "Simply Organic is the 'safe, premium mass-market' choice in the US. They win on distribution, but lose on product quality (standard curcumin levels, blended sourcing). AmrootOS must attack their lack of traceability. By highlighting our single-origin, lab-tested, high-curcumin Lakadong, we position Simply Organic as 'supermarket grade' while establishing ourselves as the true clinical-grade, connoisseur choice."
    }
  },"""

# Insert before the last closing brace of the competitorData object
pattern = r'  "tribalfactory": \{'
content = re.sub(pattern, simplyorganic_new + '\n' + r'  "tribalfactory": {', content)

with open('src/data/competitorIntel.ts', 'w') as f:
    f.write(content)
