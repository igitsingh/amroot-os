import re

with open('src/data/competitorIntel.ts', 'r') as f:
    content = f.read()

mandya_new = """  "organicmandya": {
    "idKeys": ["brand_2t82dvd5g1oj4xqygrj96s", "org-organic-mandya"],
    "name": "Organic Mandya",
    "company": "Organic Mandya",
    "entityType": "retail brand",
    "location": "mandya, karnataka",
    "marketTier": "organic standard",
    "curcuminValue": 6.5,
    "websiteDisplay": "organicmandya.com",
    "websiteUrl": "https://organicmandya.com",
    "parentCompany": "Mandya Organic Farmers Cooperative Society",
    "legalEntity": "Organic Mandya",
    "founder": "Madhu Chandan",
    "foundingYear": "2014",
    "headquarters": "Mandya, Karnataka",
    "country": "India",
    "manufacturingLocations": "Karnataka, Meghalaya",
    "processingLocations": "India",
    "exportMarkets": "Unknown",
    "countriesSold": "India",
    "officialEmail": "info@organicmandya.com",
    "curcuminDisplay": "High Curcumin (6-9%)",
    "heavyMetalsTested": "Unknown",
    "organic": "Yes (Claimed)",
    "giTagged": "Unknown",
    "singleOrigin": "Yes",
    "portfolio": [
      { "name": "High Curcumin Lakadong Turmeric Powder", "variant": "Standard", "weight": "200g", "mrp": "₹210", "status": "Active" }
    ],
    "packaging": {
      "primaryMaterial": "Pouches / Standard Packets",
      "luxuryScore": "4.0 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "Unknown",
      "labelDesign": "Traditional",
      "brandColors": "Green, Yellow",
      "unboxingExperience": "Standard Retail"
    },
    "positioningTags": ["Farmer-owned", "Sustainable", "Chemical-free", "Community"],
    "coreNarrative": "A farmer-owned initiative promoting sustainable, chemical-free agriculture and fair pricing for farmers through a 'farm-to-plate' model.",
    "pricing": {
      "premiumPositioning": "Accessible Organic",
      "websitePrice": "₹210",
      "retailPrice": "₹210",
      "costPer100g": "₹105"
    },
    "socialMedia": {
      "instagram": "@organicmandya",
      "facebook": "Organic Mandya",
      "linkedin": "Organic Mandya",
      "followers": "Unknown"
    },
    "websiteIntel": {
      "traffic": "Medium",
      "ecommercePlatform": "Shopify",
      "uxScore": "High"
    },
    "certifications": ["FSSAI", "Organic (Claimed)"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "Verified",
      "flipkart": "Not Verified",
      "indiamart": "Verified"
    },
    "swot": {
      "strengths": ["Strong community narrative", "Accessible pricing", "Established retail presence"],
      "weaknesses": ["Standard packaging", "Less focus on ultra-premium quality metrics"],
      "opportunities": ["Expanding reach across India", "Premium product lines"],
      "threats": ["D2C brands with aggressive marketing", "Counterfeit organic products"]
    },
    "strategy": {
      "title": "How to beat Organic Mandya?",
      "content": "Organic Mandya wins on community trust and accessible pricing. AmrootOS should position itself as the 'Ultra-Premium' alternative. While they offer standard organic, we offer scientifically validated, lab-tested, and traceability-focused Lakadong. We don't compete on price; we compete on indisputable quality, higher curcumin guarantees, and premium packaging experience."
    }
  },"""

# Insert before the last closing brace of the competitorData object
pattern = r'  "tribalfactory": \{'
content = re.sub(pattern, mandya_new + '\n' + r'  "tribalfactory": {', content)

with open('src/data/competitorIntel.ts', 'w') as f:
    f.write(content)
