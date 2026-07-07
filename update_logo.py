import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/components/Sidebar.tsx"
with open(file_path, 'r') as f:
    content = f.read()

# 1. Add Google Font import
import_regex = r"(import \{ Search.*\} from 'lucide-react';)"
new_import = """\\1\nimport { Outfit } from 'next/font/google';\n\nconst outfit = Outfit({ subsets: ['latin'], weight: ['600', '700'] });"""
content = re.sub(import_regex, new_import, content)

# 2. Update the logo span
logo_regex = r"(<span className=\"font-medium text-\[\#F9F8F6\] tracking-wide text-sm\">AmrootOS<\/span>)"
new_logo = """<div className={`flex flex-col items-start leading-[0.85] ml-1 mt-0.5 ${outfit.className}`}>
              <span className="font-bold text-white tracking-tight text-[22px] lowercase">amroot</span>
              <span className="text-[#F16775] text-[9px] font-bold tracking-[0.35em] uppercase ml-0.5 mt-1">O S</span>
            </div>"""
content = re.sub(logo_regex, new_logo, content)

with open(file_path, 'w') as f:
    f.write(content)

print("Updated logo")
