import re

file_path = "/Users/isachinsingh/Desktop/AMROOT-OS/src/data/competitorIntel.ts"
with open(file_path, 'r') as f:
    content = f.read()

content = content.replace("export const getCompetitorIntel = (id: string): CompetitorIntel | null => {", "export const getCompetitorIntel = (id: string): any | null => {")

with open(file_path, 'w') as f:
    f.write(content)

