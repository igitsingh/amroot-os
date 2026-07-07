import re
import os

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. (prod, idx)
    content = content.replace("intel.portfolio.map((prod, idx) => (", "intel.portfolio.map((prod: any, idx: number) => (")
    # 2. (tag, idx)
    content = content.replace("intel.positioningTags.map((tag, idx) => (", "intel.positioningTags.map((tag: string, idx: number) => (")
    # 3. SECTIONS.map((section) => (
    content = content.replace("SECTIONS.map((section) => (", "SECTIONS.map((section: any) => (")
    # 4. MarketIntelligenceDashboard
    content = content.replace("historicalGrowth.map((data) => (", "historicalGrowth.map((data: any) => (")
    content = content.replace("keyCompanies.map((company, i) => (", "keyCompanies.map((company: any, i: number) => (")
    # 5. InstitutionalResources
    content = content.replace("resources.map((res) => (", "resources.map((res: any) => (")
    # 6. ToolsView
    content = content.replace("initialTools.map((tool) => (", "initialTools.map((tool: any) => (")
    # 7. RequirementsView
    content = content.replace("certifications.map((region) => (", "certifications.map((region: any) => (")
    content = content.replace("region.tests.map((test, i) => (", "region.tests.map((test: any, i: number) => (")
    content = content.replace("registrations.map((reg) => (", "registrations.map((reg: any) => (")
    # 8. SupplierDossier
    content = content.replace("Object.entries(supplier.socialMedia).map(([platform, link]) => (", "Object.entries(supplier.socialMedia).map(([platform, link]: [string, any]) => (")
    content = content.replace("Object.entries(supplier.marketplace).map(([platform, link]) => (", "Object.entries(supplier.marketplace).map(([platform, link]: [string, any]) => (")
    # 9. GreenCollarResources
    content = content.replace("resources.map((res, i) => (", "resources.map((res: any, i: number) => (")

    with open(filepath, 'w') as f:
        f.write(content)

src_dir = "/Users/isachinsingh/Desktop/AMROOT-OS/src"
for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.tsx'):
            fix_file(os.path.join(root, file))

