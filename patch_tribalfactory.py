import re

with open('src/data/competitorIntel.ts', 'r') as f:
    content = f.read()

tribalfactory_new = """  "tribalfactory": {
    "idKeys": ["brand-tribalfactory", "org-tribalfactory"],
    "name": "Tribal Factory",
    "company": "trifac agro private limited",
    "entityType": "social enterprise / d2c",
    "location": "india",
    "marketTier": "premium",
    "curcuminValue": 9.5,
    "websiteDisplay": "tribalfactory.in",
    "websiteUrl": "https://tribalfactory.in",
    "parentCompany": "Trifac Agro Private Limited",
    "legalEntity": "Trifac Agro Private Limited",
    "founder": "K. Das",
    "foundingYear": "Unknown",
    "headquarters": "Barkhopa, Nalbari, Assam",
    "country": "India",
    "manufacturingLocations": "Assam, India",
    "processingLocations": "Meghalaya / Assam",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "Unknown",
    "curcuminDisplay": "7.0 - 12.0%",
    "heavyMetalsTested": "Unknown",
    "organic": "Natural",
    "giTagged": "Lakadong",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Pouch",
      "luxuryScore": "6.0 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "Unknown",
      "labelDesign": "Earthy",
      "brandColors": "Unknown",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Direct to Farmer", "Tribal Empowerment", "Sustainable"],
    "coreNarrative": "Sourcing indigenous agricultural products directly from tribal communities to promote sustainable agriculture and high-quality indigenous spices.",
    "pricing": {
      "premiumPositioning": "Premium Mass",
      "websitePrice": "Unknown",
      "retailPrice": "Unknown",
      "costPer100g": "Unknown"
    },
    "socialMedia": {
      "instagram": "Not Publicly Available",
      "facebook": "Not Publicly Available",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "strategy": {
      "title": "How to beat Tribal Factory?",
      "content": "Tribal Factory has a phenomenal social impact story. AmrootOS cannot simply 'beat' them on ethics; Amroot must differentiate on *target audience*. Tribal Factory targets the conscious, ethical consumer. AmrootOS targets the bio-hacker, the luxury health fanatic, and the clinical purist, offering an elite product that happens to be ethically sourced."
    }
  }
};"""

pattern = r'  "tribalfactory": \{[\s\S]*^\}\;$'
content = re.sub(pattern, tribalfactory_new, content, flags=re.MULTILINE)

with open('src/data/competitorIntel.ts', 'w') as f:
    f.write(content)
