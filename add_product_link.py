import json

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/db/intelligence/products/product-links.json"
with open(file_path, 'r') as f:
    data = json.load(f)

# check if living roots product exists
exists = any(prod.get("brandId") == "org-livingroots" for prod in data)

if not exists:
    new_product = {
        "id": "prod-livingroots-lakadong-48g",
        "brandId": "org-livingroots",
        "productName": "Lakadong High Curcumin Turmeric",
        "productType": "Single-Origin Spice",
        "variant": "Glass Jar",
        "claimedCurcuminPercent": "7.61%",
        "originRegion": "Jaintia Hills, Meghalaya",
        "weightOptions": ["48g"],
        "pricing": {
            "websitePrice": "$11.00",
            "amazonPrice": "Not Available",
            "flipkartPrice": "Not Available",
            "bigBasketPrice": "Not Available",
            "dateCollected": "2026-07-07T00:00:00.000Z"
        },
        "certifications": ["Single-Origin", "Direct Trade"],
        "links": {
            "officialWebsite": "https://www.livingrootsusa.com/products/lakadong-high-curcumin-turmeric"
        },
        "sourceUrl": "https://www.livingrootsusa.com",
        "confidenceScore": 95,
        "verificationStatus": "Verified",
        "dateLastVerified": "2026-07-07T00:00:00.000Z"
    }
    data.append(new_product)
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)
    print("Added product to product-links.json")
else:
    print("Product already exists")
