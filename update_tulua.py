import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/data/competitorIntel.ts"
with open(file_path, 'r') as f:
    content = f.read()

# Replace Contact Info
old_contact = """    "officialEmail": "Unknown",
    "officialPhone": "Unknown","""
new_contact = """    "officialEmail": "Hello@eattulua.com",
    "officialPhone": "+91 9082730822","""
content = content.replace(old_contact, new_contact)

# Replace Certifications (USDA & FSSAI Approved)
old_cert = """    "certifications": [],"""
new_cert = """    "certifications": ["USDA Organic", "FSSAI"],"""
content = content.replace(old_cert, new_cert)

# Replace Social Media
old_social = """    "socialMedia": {
      "instagram": "Not Publicly Available",
      "facebook": "Not Publicly Available",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },"""
new_social = """    "socialMedia": {
      "instagram": "https://instagram.com/eattulua",
      "facebook": "https://facebook.com/eattulua",
      "linkedin": "Not Publicly Available",
      "followers": "17.7K (IG), 2.6K (FB)"
    },"""
content = content.replace(old_social, new_social)

# Update core narrative to include Shark Tank India S4
old_narrative = """    "coreNarrative": "Single Origin Spice Range. Lakadong Turmeric Powder with exactly 9.3% Curcumin.","""
new_narrative = """    "coreNarrative": "Single Origin Spice Range. As seen on Shark Tank India S4. Specialty Spices & Ready-to-cook Pastes. Lakadong Turmeric Powder with exactly 9.3% Curcumin.","""
content = content.replace(old_narrative, new_narrative)

with open(file_path, 'w') as f:
    f.write(content)

print("Updated Tulua with additional details.")
