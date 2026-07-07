import json
import re

def update_neetacha():
    path = 'src/data/competitorIntel.ts'
    with open(path, 'r') as f:
        content = f.read()

    # We need to insert the missing fields into "neetacha"
    # Find where "neetacha" ends (line 731)
    
    # We will just replace the strategy block with the strategy block + new fields
    target_str = """    "strategy": {
      "title": "How to beat Neetacha Spices?",
      "content": "Neetacha wins on processing tech (cryogenic grinding). AmrootOS can counter this by emphasizing the actual raw material superiority (Lakadong GI vs generic Himalayan) and matching their processing claims, while offering a vastly superior luxury brand experience."
    }"""
    
    replacement_str = """    "strategy": {
      "title": "How to beat Neetacha Spices?",
      "content": "Neetacha wins on processing tech (cryogenic grinding). AmrootOS can counter this by emphasizing the actual raw material superiority (Lakadong GI vs generic Himalayan) and matching their processing claims, while offering a vastly superior luxury brand experience."
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
    "certifications": ["Not Publicly Available"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "Yes",
      "flipkart": "Yes",
      "indiamart": "No"
    },
    "swot": {
      "strengths": ["Cryogenic Grinding Tech", "High Potency Claims"],
      "weaknesses": ["Generic Source Material", "Standard Packaging"],
      "opportunities": ["B2B bulk sales"],
      "threats": ["Premium Single-Origin brands"]
    },
    "companyRegistration": "Not Publicly Available",
    "gst": "Not Publicly Available",
    "fssai": "Not Publicly Available",
    "officialPhone": "Not Publicly Available\""""
    
    # We also need to fix their founder, founding year etc if known, but my web search said Atul and Charu!
    
    if target_str in content:
        content = content.replace(target_str, replacement_str)
        content = content.replace('"founder": "Unknown",\n    "foundingYear": "Unknown",', '"founder": "Atul & Charu",\n    "foundingYear": "2020",')
        with open(path, 'w') as f:
            f.write(content)
        print("Successfully updated Neetacha Spices")
    else:
        print("Failed to find target string")

if __name__ == "__main__":
    update_neetacha()
