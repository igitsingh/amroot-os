import re

with open('src/data/competitorIntel.ts', 'r') as f:
    content = f.read()

pr_new = """  "prexportsltd": {
    "idKeys": ["brand_qai8yjncj1ppyipggjd819", "org-pr-exports-ltd-"],
    "name": "PR Exports Ltd.",
    "company": "pr exports ltd",
    "entityType": "b2b supplier / exporter",
    "location": "kolkata, west bengal",
    "marketTier": "bulk commodity",
    "curcuminValue": 8.0,
    "websiteDisplay": "prel.in",
    "websiteUrl": "http://prel.in",
    "parentCompany": "PR Exports Ltd",
    "legalEntity": "PR Exports Ltd.",
    "founder": "Sudarshan Kumar Agrawal",
    "foundingYear": "1981",
    "headquarters": "Kolkata, West Bengal",
    "country": "India",
    "manufacturingLocations": "Nadia, West Bengal",
    "processingLocations": "Kalyani Industrial Estate, Nadia",
    "exportMarkets": "Global",
    "countriesSold": "Multiple",
    "officialEmail": "info@prel.in",
    "curcuminDisplay": "7.0 - 9.0%",
    "heavyMetalsTested": "Yes",
    "organic": "Unknown",
    "giTagged": "Unknown",
    "singleOrigin": "Yes (Lakadong)",
    "portfolio": [
      { "name": "Bulk Lakadong Turmeric", "variant": "Wholesale", "weight": "25kg / 10kg", "mrp": "B2B Pricing", "status": "Active" }
    ],
    "packaging": {
      "primaryMaterial": "PP Bags / Bulk Packets",
      "luxuryScore": "1.0 / 10",
      "shelfImpact": "Low",
      "ecoScore": "Low",
      "labelDesign": "Industrial",
      "brandColors": "White / Industrial",
      "unboxingExperience": "None"
    },
    "positioningTags": ["B2B Export", "Bulk Spice", "Manufacturer"],
    "coreNarrative": "A long-standing industrial bulk manufacturer and exporter of Indian spices with automated processing capabilities.",
    "pricing": {
      "premiumPositioning": "Commodity / Bulk",
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
      "ecommercePlatform": "None (Corporate Site)",
      "uxScore": "Low"
    },
    "certifications": ["FSSAI", "ISO 22000"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "Not Verified",
      "flipkart": "Not Verified",
      "indiamart": "Verified"
    },
    "swot": {
      "strengths": ["Large scale processing capability", "Established export networks", "Decades of industry experience"],
      "weaknesses": ["No retail brand presence", "Industrial commodity positioning", "Zero social media/D2C presence"],
      "opportunities": ["Private label manufacturing", "Supplying to global D2C brands"],
      "threats": ["D2C brands capturing higher margins", "Specialized boutique processors"]
    },
    "strategy": {
      "title": "How to beat PR Exports?",
      "content": "PR Exports is a bulk B2B player, not a direct D2C competitor. However, their existence proves that large-scale institutional buyers want Lakadong turmeric. AmrootOS can bypass them by offering full farm-to-door traceability and premium storytelling that industrial processors cannot match, thereby capturing the high-margin segment that PR Exports ignores."
    }
  },"""

# Insert before the last closing brace of the competitorData object
pattern = r'  "tribalfactory": \{'
content = re.sub(pattern, pr_new + '\n' + r'  "tribalfactory": {', content)

with open('src/data/competitorIntel.ts', 'w') as f:
    f.write(content)
