import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/data/competitorIntel.ts"
with open(file_path, 'r') as f:
    lines = f.readlines()

# The error starts at line 2726 (which is index 2725).
# Line 2720-2725 is:
# export const getCompetitorIntel = (id: string): CompetitorIntel | null => {
#   for (const key in competitorData) {
#     if (competitorData[key].idKeys.includes(id)) return competitorData[key];
#   }
#   return null;
# }

# Let's extract the livingroots block which starts from line 2726:
livingroots_block = "".join(lines[2726:2812]) # Everything from 2726 up to the second to last line

# Let's strip the comma at the start of livingroots_block if it's there
livingroots_block = livingroots_block.strip()
if livingroots_block.startswith(','):
    livingroots_block = livingroots_block[1:]

# Now reconstruct the file properly
# Up to line 2719:
proper_content = "".join(lines[:2718])
proper_content += ",\n" + livingroots_block + "\n};\n\n"

# Add the getCompetitorIntel function back
proper_content += "export const getCompetitorIntel = (id: string): CompetitorIntel | null => {\n"
proper_content += "  for (const key in competitorData) {\n"
proper_content += "    if (competitorData[key].idKeys.includes(id)) return competitorData[key];\n"
proper_content += "  }\n"
proper_content += "  return null;\n"
proper_content += "};\n"

with open(file_path, 'w') as f:
    f.write(proper_content)
print("Syntax fixed")
