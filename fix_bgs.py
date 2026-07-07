import os
import re

DIRECTORY = "/Users/isachinsingh/Desktop/PARADISE-OS/src"

REPLACEMENTS = {
    r'bg-\[\#0A0A0A\]': 'bg-white',
    r'bg-\[\#111111\]': 'bg-white',
    r'bg-\[\#1A1A1A\]': 'bg-[#F9F8F6]',
    r'border-\[\#2A2A2A\]': 'border-[#2D3142]/10'
}

for root, _, files in os.walk(DIRECTORY):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            
            original = content
            for pattern, replacement in REPLACEMENTS.items():
                content = re.sub(pattern, replacement, content)
                
            if content != original:
                with open(path, 'w') as f:
                    f.write(content)
                print(f"Updated {path}")
