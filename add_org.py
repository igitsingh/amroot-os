import json
import os

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/db/intelligence/brands/organizations.json"
with open(file_path, 'r') as f:
    data = json.load(f)

# check if living roots exists
exists = any(org.get("id") == "org-livingroots" for org in data)

if not exists:
    new_org = {
        "id": "org-livingroots",
        "name": "Living Roots USA",
        "legalName": "Living Roots",
        "foundingYear": 0,
        "headquarters": "Sacramento, California, USA",
        "country": "USA",
        "websiteUrl": "https://www.livingrootsusa.com",
        "marketPositioning": "Premium",
        "confidenceScore": 85,
        "verificationStatus": "Verified",
        "notes": "Premium single-origin teas and spices sourced directly from small family farms. 7.61% curcumin content."
    }
    data.append(new_org)
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)
    print("Added living roots to organizations.json")
else:
    print("Already exists")
