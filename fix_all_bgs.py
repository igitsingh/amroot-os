import os
import re

DIRECTORY = "/Users/isachinsingh/Desktop/PARADISE-OS/src"

REPLACEMENTS = {
    r'bg-\[\#0F0F0F\]': 'bg-[#F4F1EA]',
    r'bg-\[\#141414\]': 'bg-[#F4F1EA]',
    r'bg-\[\#1A1A1A\]': 'bg-[#F4F1EA]',
    r'bg-\[\#111111\]': 'bg-[#F4F1EA]',
    r'bg-\[\#0A0A0A\]': 'bg-[#F4F1EA]',
    r'bg-\[\#050505\]': 'bg-[#F4F1EA]',
    r'bg-\[\#1C2128\]': 'bg-[#F4F1EA]',
    r'bg-black': 'bg-[#F4F1EA]',
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
