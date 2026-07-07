import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/components/Sidebar.tsx"
with open(file_path, 'r') as f:
    content = f.read()

old_logo = """            <div className={`flex flex-col items-start leading-[0.85] ml-1 mt-0.5 ${outfit.className}`}>
              <span className="font-bold text-white tracking-tight text-[22px] lowercase">amroot</span>
              <span className="text-[#F16775] text-[9px] font-bold tracking-[0.35em] uppercase ml-0.5 mt-1">O S</span>
            </div>"""

new_logo = """            <div className={`flex items-baseline ml-1 ${outfit.className}`}>
              <span className="font-bold text-white tracking-tight text-[22px] lowercase">amroot</span>
              <span className="text-[#F16775] text-[12px] font-bold tracking-widest uppercase ml-1">OS</span>
            </div>"""

content = content.replace(old_logo, new_logo)

with open(file_path, 'w') as f:
    f.write(content)

print("Updated logo to be inline.")
