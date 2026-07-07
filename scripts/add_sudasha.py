import json
import os
import uuid
from datetime import datetime

base_dir = "/Users/isachinsingh/Desktop/AMROOTOS/src/db/intelligence"
suppliers_file = os.path.join(base_dir, "suppliers/suppliers.json")
products_file = os.path.join(base_dir, "products/products.json")

def generate_id(prefix):
    return f"{prefix}-{uuid.uuid4().hex[:8]}"

now = datetime.utcnow().isoformat() + "Z"

# 1. Add Supplier
with open(suppliers_file, "r") as f:
    suppliers = json.load(f)

# check if already exists
if not any(s.get("name") == "Sudasha Foods Pvt Ltd" for s in suppliers):
    new_supplier = {
        "id": "supplier-sudasha-foods",
        "name": "Sudasha Foods Pvt Ltd",
        "country": "India",
        "location": "Shillong, Meghalaya",
        "contact": "Priyam Chauhan | admin@sudashafoods.com | 9089408509",
        "entityType": "Supplier",
        "marketTier": "Premium",
        "curcuminContent": 8.8,
        "qualitySpecs": "100% Natural Products | North-East Spices. Offering Lakadong Turmeric, Ginger powder, Cinnamon, Sichuan pepper, Bhut jolokia.",
        "certifications": [],
        "heavyMetalsDyes": "Unknown",
        "source": "Supplier Catalogue and Lab Report",
        "intelligenceScore": 85,
        "labReports": [
            {
                "id": generate_id("lab"),
                "labName": "EREC India Research Laboratory",
                "date": "2026-02-19",
                "curcuminPercentage": 8.2,
                "moisture": None,
                "heavyMetalsPassed": None,
                "pesticidesPassed": None
            },
            {
                "id": generate_id("lab"),
                "labName": "EREC India Research Laboratory",
                "date": "2026-02-19",
                "curcuminPercentage": 8.8,
                "moisture": None,
                "heavyMetalsPassed": None,
                "pesticidesPassed": None
            }
        ],
        "shipments": [],
        "importers": []
    }
    suppliers.append(new_supplier)
    
    with open(suppliers_file, "w") as f:
        json.dump(suppliers, f, indent=2)
    print("Added supplier Sudasha Foods Pvt Ltd")

# 2. Add Product
with open(products_file, "r") as f:
    products = json.load(f)

if not any(p.get("name") == "Sudasha Lakadong Turmeric Powder" for p in products):
    new_product = {
        "id": generate_id("prod"),
        "brandId": "supplier-sudasha-foods",
        "name": "Sudasha Lakadong Turmeric Powder",
        "spiceType": "Lakadong Turmeric",
        "originRegion": "Jaintia Hills, Meghalaya",
        "claimedCurcuminPercent": "7-9% (Lab tested up to 8.8%)",
        "notes": "Price: Rs. 340/- kg (Retail/Catalog Rs 360/kg). Wholesale (50-100 kgs): Rs. 320/- kg + GST 5% + shipping.",
        "source": "Supplier Catalogue",
        "sourceUrl": "www.sudashafoods.com",
        "sourceType": "Official",
        "dateCollected": now,
        "dateLastVerified": now,
        "confidenceScore": 95,
        "verificationStatus": "Verified"
    }
    products.append(new_product)
    
    with open(products_file, "w") as f:
        json.dump(products, f, indent=2)
    print("Added product Sudasha Lakadong Turmeric Powder")
