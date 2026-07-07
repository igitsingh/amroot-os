import json
import os
import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/data/competitorIntel.ts"
with open(file_path, 'r') as f:
    content = f.read()

new_competitor = """
  "livingroots": {
    "idKeys": ["org-livingroots", "brand-livingroots"],
    "name": "Living Roots USA",
    "company": "Living Roots",
    "entityType": "dtc brand / importer",
    "location": "Sacramento, California, USA",
    "marketTier": "premium",
    "curcuminValue": 7.61,
    "websiteDisplay": "livingrootsusa.com",
    "websiteUrl": "https://www.livingrootsusa.com",
    "instagramUrl": "https://instagram.com/livingrootsusa",
    "instagramHandle": "@livingrootsusa",
    "facebookUrl": "https://facebook.com/livingrootsUS",
    "facebookHandle": "Living Roots",
    "parentCompany": "Living Roots",
    "legalEntity": "Living Roots",
    "founder": "Unknown",
    "foundingYear": "Unknown",
    "headquarters": "Sacramento, California, USA",
    "country": "USA",
    "manufacturingLocations": "Unknown",
    "processingLocations": "India",
    "exportMarkets": "USA",
    "countriesSold": "USA",
    "officialEmail": "support@livingrootsusa.com",
    "curcuminDisplay": "7.61%",
    "heavyMetalsTested": "Unknown",
    "organic": "Unknown",
    "giTagged": "Lakadong",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Glass Jar / Tin Box",
      "luxuryScore": "8.0 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "8.0 / 10",
      "labelDesign": "Clean, Modern",
      "brandColors": "Green, Beige",
      "unboxingExperience": "Premium"
    },
    "positioningTags": ["Single-Origin", "Direct Trade", "Premium"],
    "coreNarrative": "Premium single-origin teas and spices sourced directly from small family farms.",
    "pricing": {
      "premiumPositioning": "Premium",
      "websitePrice": "$11.00",
      "retailPrice": "$11.00",
      "costPer100g": "$22.91"
    },
    "strategy": {
      "title": "How to beat Living Roots?",
      "content": "Living Roots has a solid 7.61% curcumin proposition and clean branding. AmrootOS can beat them by pushing clinical verification further, emphasizing 10%+ curcumin, and offering a significantly more luxurious unboxing/brand experience."
    },
    "portfolio": [
      {
        "name": "Lakadong Turmeric",
        "variant": "Jar",
        "weight": "48g",
        "mrp": "$11.00",
        "status": "Active"
      }
    ],
    "socialMedia": {
      "instagram": "https://instagram.com/livingrootsusa",
      "facebook": "https://facebook.com/livingrootsUS"
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
      "amazon": "No",
      "flipkart": "No",
      "indiamart": "No"
    },
    "swot": {
      "strengths": ["Clear 7.61% Curcumin messaging", "Clean packaging"],
      "weaknesses": ["Limited product range", "No visible COAs"],
      "opportunities": ["Clinical scaling"],
      "threats": ["Ultra-premium clinical brands like Amroot"]
    }
  }
"""

if '"livingroots": {' not in content:
    # Insert right before the last closing brace in competitorData object
    # Find the last closing brace of the competitorData object
    pattern = r'(export const competitorData[^=]+=[^{]*{)(.*)(};)'
    match = re.search(pattern, content, flags=re.DOTALL)
    if match:
        start, inner, end = match.groups()
        if inner.strip().endswith('}'):
            new_inner = inner + ',' + new_competitor
        else:
            new_inner = inner + ',' + new_competitor
        new_content = start + new_inner + end
        with open(file_path, 'w') as f:
            f.write(new_content)
        print("Successfully added livingroots to competitorIntel.ts")
    else:
        # Fallback
        parts = content.rsplit('};', 1)
        new_content = parts[0] + ',' + new_competitor + '\n};\n' + parts[1]
        with open(file_path, 'w') as f:
            f.write(new_content)
        print("Fallback added livingroots to competitorIntel.ts")
