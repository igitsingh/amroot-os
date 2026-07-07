import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/app/competitors/CompetitorsView.tsx"
with open(file_path, 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    # Match something like "303: " or "  303: " at the start of the line and remove it
    cleaned_line = re.sub(r'^\s*\d+:\s', '', line)
    new_lines.append(cleaned_line)

with open(file_path, 'w') as f:
    f.writelines(new_lines)

print("Cleaned line numbers from file.")
