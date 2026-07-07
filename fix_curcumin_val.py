import re

file_path = "/Users/isachinsingh/Desktop/AMROOT-OS/src/app/competitors/CompetitorsView.tsx"
with open(file_path, 'r') as f:
    content = f.read()

content = content.replace("case 'curcumin': return getCurcuminVal(comp, intel);", "case 'curcumin': return getCurcuminRange(comp, intel).min;")

with open(file_path, 'w') as f:
    f.write(content)

